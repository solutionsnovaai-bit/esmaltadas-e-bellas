import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { imageById } from '../assets'

export default function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const { reduced } = useMotionPreferences()
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const cover = new Image()
    cover.src = imageById(25).src
    const timeout = window.setTimeout(onComplete, reduced ? 80 : 2100)
    return () => { clearTimeout(timeout); document.body.style.overflow = original }
  }, [onComplete, reduced])
  return <motion.div className="brand-intro" role="status" aria-label="Bem-vinda à Esmaltadas e Bellas"
    exit={reduced ? { opacity: 0 } : { y: '-105%' }} transition={{ duration: reduced ? .1 : .85, ease: [.76, 0, .24, 1] }}>
    <div className="intro-orbit" aria-hidden="true" />
    <motion.span className="intro-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>UM MOMENTO PARA VOCÊ</motion.span>
    <div className="intro-title" aria-hidden="true">
      <span className="line-mask"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }}>Esmaltadas</motion.span></span>
      <span className="line-mask"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .15, ease: [.22, 1, .36, 1] }}><i>&</i> Bellas<span className="intro-spark">✳</span></motion.span></span>
    </div>
    <div className="intro-line"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.9, ease: 'easeInOut' }} /></div>
    <button className="intro-skip" onClick={onComplete}>Pular abertura ↗</button>
  </motion.div>
}
