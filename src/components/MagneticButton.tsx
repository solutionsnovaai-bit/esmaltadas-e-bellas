import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export default function MagneticButton({ children, href, className = '', external = false }: { children: ReactNode; href: string; className?: string; external?: boolean }) {
  const { reduced } = useMotionPreferences()
  const x = useMotionValue(0), y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18 }), springY = useSpring(y, { stiffness: 250, damping: 18 })
  return <motion.a href={href} className={`button ${className}`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
    style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
    onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse') return
      const rect = event.currentTarget.getBoundingClientRect()
      x.set((event.clientX - rect.left - rect.width / 2) * .12)
      y.set((event.clientY - rect.top - rect.height / 2) * .18)
    }} onPointerLeave={() => { x.set(0); y.set(0) }}>{children}</motion.a>
}
