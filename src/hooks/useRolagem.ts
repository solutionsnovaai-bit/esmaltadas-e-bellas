import { useEffect } from 'react'
import type Lenis from 'lenis'

let lenis: Lenis | undefined

/** Rola até uma âncora usando o Lenis quando ativo (mouse) e o navegador nos demais casos. */
export function rolarPara(alvo: string | HTMLElement, reduzido = false) {
  const el = typeof alvo === 'string' ? document.querySelector<HTMLElement>(alvo) : alvo
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -8, duration: reduzido ? 0 : 1.25 })
  else el.scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth', block: 'start' })
}

export const pausarRolagem = (pausar: boolean) => { if (pausar) lenis?.stop(); else lenis?.start() }

/** Rolagem com inércia só no desktop com mouse; toque e teclado continuam nativos. */
export function useRolagem(ativo: boolean) {
  useEffect(() => {
    const fino = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!ativo || !fino.matches) return
    let descartado = false
    let quadro = 0
    const tick = (t: number) => { lenis?.raf(t); quadro = requestAnimationFrame(tick) }
    const visibilidade = () => {
      if (document.hidden) { cancelAnimationFrame(quadro); quadro = 0 }
      else if (!quadro) quadro = requestAnimationFrame(tick)
    }
    void import('lenis').then(({ default: Rolagem }) => {
      if (descartado) return
      lenis = new Rolagem({
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        prevent: n => n.closest('[data-lenis-prevent]') !== null,
      })
      quadro = requestAnimationFrame(tick)
      document.addEventListener('visibilitychange', visibilidade)
    }).catch(() => { /* sem inércia: rolagem nativa */ })
    return () => {
      descartado = true
      cancelAnimationFrame(quadro)
      lenis?.destroy()
      lenis = undefined
      document.removeEventListener('visibilitychange', visibilidade)
    }
  }, [ativo])
}
