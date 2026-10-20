import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { molas } from '../../lib/ease'
import { usePonteiroFino } from '../../hooks/useMidia'
import { useMovimento } from '../../hooks/useMovimento'

const ROTULOS: Record<string, string> = { ver: 'Ver', arraste: 'Arraste' }

/** Cursor da casa: ponto laca + anel que cresce sobre links e vira "Ver"/"Arraste" nas fotos. */
export function Cursor() {
  const fino = usePonteiroFino()
  const { reduzido } = useMovimento()
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const ax = useSpring(x, molas.cursor), ay = useSpring(y, { stiffness: 260, damping: 30, mass: .6 })
  const [estado, setEstado] = useState('')
  const [oculto, setOculto] = useState(true)
  const atual = useRef('')

  useEffect(() => {
    if (!fino || reduzido) return
    document.documentElement.dataset.cursor = 'ativo'
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX); y.set(e.clientY)
      setOculto(false)
      const alvo = e.target as Element | null
      const marcado = alvo?.closest?.('[data-cursor]')?.getAttribute('data-cursor')
      const novo = marcado ?? (alvo?.closest?.('a, button, label, input, select, textarea, [role="button"]') ? 'link' : '')
      if (novo !== atual.current) { atual.current = novo; setEstado(novo) }
    }
    const sair = () => setOculto(true)
    window.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', sair)
    return () => {
      delete document.documentElement.dataset.cursor
      window.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', sair)
    }
  }, [fino, reduzido, x, y])

  if (!fino || reduzido) return null
  return <div className="cursor" data-estado={estado} data-oculto={oculto ? 'sim' : 'nao'} aria-hidden="true">
    <motion.div className="cursor-ponto" style={{ x, y }} />
    <motion.div className="cursor-anel" style={{ x: ax, y: ay }}><span>{ROTULOS[estado] ?? ''}</span></motion.div>
  </div>
}
