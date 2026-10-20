import { useRef, type ReactNode } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { useMovimento } from '../../hooks/useMovimento'
import { useCenaAtiva } from '../../hooks/useCenaAtiva'

const COPIAS = 4
const envolver = (min: number, max: number, v: number) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

/** Faixa infinita que acelera e inverte o sentido conforme a rolagem. */
export function Faixa({ children, velocidade = -3, className = '' }: { children: ReactNode; velocidade?: number; className?: string }) {
  const { reduzido } = useMovimento()
  const ref = useRef<HTMLDivElement>(null)
  const ativa = useCenaAtiva(ref, 0)
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const fator = useTransform(vel, [0, 1000], [0, 4], { clamp: false })
  const inclina = useTransform(vel, [-2400, 0, 2400], [6, 0, -6])
  const x = useTransform(base, v => `${envolver(-100 / COPIAS, 0, v)}%`)
  const sentido = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduzido || !ativa) return
    let passo = sentido.current * velocidade * (Math.min(delta, 50) / 1000)
    const f = fator.get()
    if (f < 0) sentido.current = -1
    else if (f > 0) sentido.current = 1
    passo += sentido.current * passo * f
    base.set(base.get() + passo)
  })

  return <div ref={ref} className={`faixa ${className}`} aria-hidden="true">
    <motion.div className="faixa-trilho" style={reduzido ? undefined : { x, skewX: inclina }}>
      {Array.from({ length: COPIAS }, (_, i) => <span key={i} className="faixa-grupo">{children}</span>)}
    </motion.div>
  </div>
}
