import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { imageById, imageSrcSet } from '../assets'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import MagneticButton from './MagneticButton'

export default function Hero({ ready }: { ready: boolean }) {
  const section = useRef<HTMLElement>(null)
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const photo = imageById(25)
  return <section id="inicio" className="hero" ref={section}>
    <motion.div className="hero-copy" style={{ y: reduced ? 0 : textY }}>
      <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: .1 }}>SEU MOMENTO DE SE SENTIR BELLA</motion.p>
      <h1>{['Beleza que', 'começa nos', 'detalhes.'].map((line, index) => <span className="line-mask" key={line}><motion.span className={index === 2 ? 'hero-italic' : ''} initial={{ y: '110%', rotate: 3 }} animate={{ y: ready ? 0 : '110%', rotate: ready ? 0 : 3 }} transition={{ duration: reduced ? .1 : 1.1, delay: index * .12, ease: [.22, 1, .36, 1] }}>{line}</motion.span></span>)}</h1>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }} transition={{ delay: .45, duration: .8 }}>
        <p className="hero-description">Um encontro com a sua melhor versão.<br />Unhas, cores e cuidado, do nosso jeito.</p>
        <MagneticButton href="#galeria" className="button-dark">Encontre sua próxima cor <ArrowUpRight size={19} /></MagneticButton>
        <div className="hero-footnote"><span className="tiny-spark" aria-hidden="true">✳</span> Feito por mãos que amam cuidar.</div>
      </motion.div>
    </motion.div>
    <div className="hero-visual">
      <motion.div className="hero-photo" style={{ y: reduced ? 0 : imageY }} initial={{ scale: 1.07 }} animate={{ scale: ready ? 1 : 1.07 }} transition={{ duration: 1.8, ease: [.22, 1, .36, 1] }}>
        <img src={photo.src} srcSet={imageSrcSet(photo)} sizes="(max-width: 760px) 100vw, 58vw" alt="As duas profissionais da Esmaltadas & Bellas, juntas na esmalteria" width={photo.width} height={photo.height} fetchPriority="high" />
      </motion.div>
      <div className="hero-photo-shade" />
      <span className="hero-photo-label">O CARINHO TEM ROSTO.<br /><strong>E tem um lugar aqui.</strong></span>
      <a href="#sobre" className="hero-seal" aria-label="Conheça a Esmaltadas e Bellas"><span className="seal-orbit" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="seal-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs><text><textPath href="#seal-path">CORES • CUIDADO • VOCÊ • CORES • CUIDADO • VOCÊ • </textPath></text></svg></span><span className="seal-flower" aria-hidden="true">✳</span></a>
      <span className="photo-index">01 / NOSSA ESSÊNCIA</span>
    </div>
    <a className="hero-scroll" href="#inspiracoes"><ArrowDown size={15} /><span>DESLIZE PARA SE INSPIRAR</span></a>
  </section>
}
