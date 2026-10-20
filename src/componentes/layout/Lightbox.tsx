import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import type { Foto } from '../../conteudo/fotos'
import { galeria } from '../../conteudo/textos'
import { linkConversa, mensagens } from '../../conteudo/site'
import { pausarRolagem } from '../../hooks/useRolagem'
import { ease } from '../../lib/ease'

/** Foto grande: setas, teclado, arrastar para os lados, Esc para fechar e miniaturas. */
export default function Lightbox({ fotos, inicial, fechar }: { fotos: Foto[]; inicial: number; fechar: () => void }) {
  const [i, setI] = useState(inicial)
  const [dir, setDir] = useState(0)
  const caixa = useRef<HTMLDivElement>(null)
  const toque = useRef<{ x: number; id: number } | null>(null)
  const anterior = useRef<Element | null>(null)
  const f = fotos[i]
  const ir = (d: number) => { setDir(d); setI(v => (v + d + fotos.length) % fotos.length) }

  useEffect(() => {
    anterior.current = document.activeElement
    document.body.classList.add('travado')
    pausarRolagem(true)
    caixa.current?.querySelector<HTMLElement>('.lb-fechar')?.focus()
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar()
      else if (e.key === 'ArrowRight') ir(1)
      else if (e.key === 'ArrowLeft') ir(-1)
      else if (e.key === 'Tab') {
        const focos = caixa.current?.querySelectorAll<HTMLElement>('button, a[href]')
        if (!focos?.length) return
        const p = focos[0], u = focos[focos.length - 1]
        if (e.shiftKey && document.activeElement === p) { e.preventDefault(); u.focus() }
        else if (!e.shiftKey && document.activeElement === u) { e.preventDefault(); p.focus() }
      }
    }
    document.addEventListener('keydown', tecla)
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.classList.remove('travado')
      pausarRolagem(false)
      ;(anterior.current as HTMLElement | null)?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    caixa.current?.querySelector('.lb-miniaturas .is-ativa')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [i])

  const inicio = (e: PointerEvent) => { toque.current = { x: e.clientX, id: e.pointerId } }
  const fim = (e: PointerEvent) => {
    const t = toque.current
    toque.current = null
    if (!t || t.id !== e.pointerId) return
    const dx = e.clientX - t.x
    if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1)
  }

  return <motion.div ref={caixa} className="lb" role="dialog" aria-modal="true" aria-label={`Inspiração: ${f.titulo}`}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} data-lenis-prevent>
    <button type="button" className="lb-fundo" aria-label="Fechar" tabIndex={-1} onClick={fechar} />
    <div className="lb-topo">
      <span className="lb-contador">{String(i + 1).padStart(2, '0')} <i>/</i> {String(fotos.length).padStart(2, '0')}</span>
      <button type="button" className="lb-fechar" onClick={fechar} aria-label="Fechar"><X aria-hidden="true" /></button>
    </div>
    <div className="lb-palco" onPointerDown={inicio} onPointerUp={fim} onPointerCancel={() => { toque.current = null }}>
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.figure key={f.id} className="lb-figura" custom={dir}
          initial={{ opacity: 0, x: dir * 80, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: dir * -80, scale: .96 }}
          transition={{ duration: .6, ease: ease.expo }}>
          <img src={f.src} alt={f.alt} width={f.w} height={f.h} draggable={false} />
        </motion.figure>
      </AnimatePresence>
      <button type="button" className="lb-seta lb-ant" onClick={() => ir(-1)} aria-label="Foto anterior"><ArrowLeft aria-hidden="true" /></button>
      <button type="button" className="lb-seta lb-prox" onClick={() => ir(1)} aria-label="Próxima foto"><ArrowRight aria-hidden="true" /></button>
    </div>
    <div className="lb-base">
      <div className="lb-legenda" aria-live="polite">
        <small>{f.categoria}</small>
        <strong>{f.titulo}</strong>
      </div>
      <a className="botao laca" href={linkConversa(mensagens.inspiracao(f.titulo))} target="_blank" rel="noopener noreferrer">
        <span>{galeria.pedir}</span><span className="botao-icone" aria-hidden="true"><ArrowUpRight /></span>
      </a>
    </div>
    <div className="lb-miniaturas" aria-hidden="true">
      {fotos.map((m, k) => <button key={m.id} type="button" tabIndex={-1} className={k === i ? 'is-ativa' : ''} onClick={() => { setDir(k > i ? 1 : -1); setI(k) }}>
        <img src={m.src} alt="" loading="lazy" />
      </button>)}
    </div>
  </motion.div>
}
