import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { galleryImages, imageSrcSet } from '../assets'
import type { Category, SalonImage } from '../assets'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import Reveal from './Reveal'

const filters: ('Todos' | Category)[] = ['Todos', 'Clássicos', 'Francesinhas', 'Nail art', 'Naturais', 'Bastidores']
// An editorial opening sequence; every supplied work is retained in the collection.
const order = [13, 1, 7, 3, 17, 4, 6, 22, 2, 5, 8, 9, 10, 11, 14, 15, 16, 18, 19, 20, 21, 23, 24]
const collection = order.map(id => galleryImages.find(image => image.id === id)!)

export default function Gallery({ onOpen }: { onOpen: (images: SalonImage[], index: number) => void }) {
  const [filter, setFilter] = useState<'Todos' | Category>('Todos')
  const [expanded, setExpanded] = useState(false)
  const { reduced } = useMotionPreferences()
  const grid = useRef<HTMLDivElement>(null)
  const filtered = collection.filter(photo => filter === 'Todos' || photo.category === filter)
  const visible = expanded ? filtered : filtered.slice(0, 8)
  return <section className="gallery section-pad" id="galeria" aria-labelledby="gallery-title">
    <Reveal className="section-heading"><div><span className="eyebrow">NOSSO PORTFÓLIO</span><h2 id="gallery-title">Inspiração para<br /><em>a sua próxima visita.</em></h2></div><div className="gallery-intro"><span className="gallery-flower" aria-hidden="true">✳</span><p>Trabalhos da Esmaltadas & Bellas.<br />Toque em uma foto e veja de pertinho.</p></div></Reveal>
    <div className="gallery-toolbar"><div className="gallery-filters" role="group" aria-label="Filtrar inspirações">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => { setFilter(item); setExpanded(false) }}>{filter === item && <Check size={12} />}{item}</button>)}</div><span className="gallery-count" aria-live="polite">{filtered.length} INSPIRAÇÕES</span></div>
    <div className="gallery-grid" ref={grid} id="galeria-fotos">{visible.map((photo, index) => <motion.figure className="gallery-card" key={photo.id} initial={reduced ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }} transition={{ duration: .65, delay: (index % 4) * .055, ease: [.22, 1, .36, 1] }}>
      <button className="photo-button" onClick={() => onOpen(filtered, index)} aria-label={`Ampliar ${photo.title}`}><img src={photo.small} srcSet={imageSrcSet(photo)} sizes="(max-width: 600px) 44vw, (max-width: 960px) 29vw, 22vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /><span className="gallery-hover" aria-hidden="true"><span>VER DE PERTO</span><ArrowUpRight size={24} /></span></button><figcaption><h3>{photo.title}</h3><span>{photo.category}</span></figcaption>
    </motion.figure>)}</div>
    {!expanded && filtered.length > 8 ? <div className="gallery-more"><button className="button button-outline" aria-controls="galeria-fotos" aria-expanded={expanded} onClick={() => { setExpanded(true); window.setTimeout(() => grid.current?.querySelectorAll<HTMLButtonElement>('button')[8]?.focus({ preventScroll: true }), 50) }}>Ver a coleção completa <span>({filtered.length})</span><ArrowDown size={18} /></button></div> : <p className="gallery-end">Cada detalhe, uma nova possibilidade. <span aria-hidden="true">✳</span></p>}
  </section>
}
