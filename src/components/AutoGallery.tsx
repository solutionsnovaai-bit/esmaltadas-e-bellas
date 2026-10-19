import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { imageById, imageSrcSet } from '../assets'
import type { SalonImage } from '../assets'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal from './Reveal'

const highlights = [16, 8, 14].map(imageById)
export default function AutoGallery({ onOpen }: { onOpen: (images: SalonImage[], index: number) => void }) {
  const section = useRef<HTMLElement>(null)
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] })
  const leftY = useTransform(scrollYProgress, [0, 1], [65, -45])
  const rightY = useTransform(scrollYProgress, [0, 1], [-35, 55])
  return <section className="featured section-pad" id="inspiracoes" ref={section} aria-labelledby="featured-title">
    <Reveal className="featured-heading"><span className="eyebrow">PEQUENOS DETALHES. MUITA PERSONALIDADE.</span><h2 id="featured-title">Seu estilo.<br /><em>Na ponta dos dedos.</em></h2><p>Do delicado ao marcante, existe uma cor<br className="desktop-break" /> que combina com o seu momento.</p></Reveal>
    <div className="featured-grid">{highlights.map((photo, index) => <motion.div className={`featured-item featured-item-${index + 1}`} key={photo.id} style={{ y: reduced ? 0 : index === 0 ? leftY : index === 2 ? rightY : 0 }}>
      <button className="featured-photo photo-button" onClick={() => onOpen(highlights, index)} aria-label={`Ampliar ${photo.title}`}>
        <img src={photo.small} srcSet={imageSrcSet(photo)} sizes="(max-width: 600px) 75vw, 30vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
        <span className="photo-action" aria-hidden="true"><ArrowUpRight /></span>
      </button><div className="featured-caption"><span>0{index + 1}</span><h3>{photo.title}</h3><span>{photo.category}</span></div>
    </motion.div>)}</div>
    <Reveal className="featured-bottom"><span>QUAL VAI SER A SUA PRÓXIMA?</span><a href="#galeria" className="text-link">Explorar todas as inspirações <ArrowUpRight size={18} /></a></Reveal>
  </section>
}
