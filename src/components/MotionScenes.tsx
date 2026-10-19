import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { colorMoods } from '../content'
import { imageById, imageSrcSet } from '../assets'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal from './Reveal'

export default function MotionScenes() {
  const [selected, setSelected] = useState(0)
  const scene = useRef<HTMLElement>(null)
  const active = useSceneActivity(scene)
  const { reduced } = useMotionPreferences()
  const mood = colorMoods[selected], photo = imageById(mood.image)
  return <section className={`mood-scene${active && !reduced ? ' scene-active' : ''}`} ref={scene} aria-labelledby="mood-title">
    <div className="ribbon" aria-hidden="true"><div className="ribbon-track">{Array.from({ length: 4 }, (_, index) => <span key={index}>UNHAS BELLAS <i>✳</i> DIAS MAIS COLORIDOS <i>✳</i> </span>)}</div></div>
    <motion.div className="mood-inner section-pad" animate={{ backgroundColor: mood.background }} transition={{ duration: .7 }}>
      <div className="mood-copy"><Reveal><span className="eyebrow">UM ESTADO DE ESPÍRITO. UMA COR.</span><h2 id="mood-title">Hoje eu quero<br />me sentir<br /><AnimatePresence mode="wait"><motion.em key={mood.word} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: .3 }} style={{ color: mood.hex }}>{mood.word}</motion.em></AnimatePresence></h2></Reveal>
        <div className="mood-swatches" role="group" aria-label="Escolha uma inspiração de cor">{colorMoods.map((option, index) => <button key={option.word} style={{ '--swatch': option.hex } as React.CSSProperties} aria-label={option.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><span /></button>)}</div>
        <div className="mood-description" aria-live="polite"><h3>{mood.name}</h3><p>{mood.note}</p></div><a className="text-link" href="#galeria">Encontre mais inspirações <ArrowUpRight size={18} /></a>
      </div>
      <div className="mood-visual"><span className="mood-outline" aria-hidden="true" /><AnimatePresence mode="wait"><motion.figure className="mood-photo" key={photo.id} initial={reduced ? false : { opacity: 0, rotate: -6, y: 35 }} animate={{ opacity: 1, rotate: 3, y: 0 }} exit={{ opacity: 0, rotate: 7, y: -20 }} transition={{ duration: .45 }}><img src={photo.src} srcSet={imageSrcSet(photo)} sizes="(max-width: 760px) 75vw, 36vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><figcaption>{photo.title}<span>ESMALTADAS & BELLAS</span></figcaption></motion.figure></AnimatePresence><span className="mood-float" aria-hidden="true">✳</span></div>
    </motion.div>
  </section>
}
