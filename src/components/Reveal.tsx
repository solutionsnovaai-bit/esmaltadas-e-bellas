import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { reduced } = useMotionPreferences()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 44 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }}
    transition={{ duration: .85, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}
