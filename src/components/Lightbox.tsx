import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import type { SalonImage } from '../assets'
import { useDialog } from '../hooks/useDialog'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { whatsappAvailable, whatsappUrl, salon } from '../content'
import BrandIcon from './BrandIcon'

export default function Lightbox({ images, initialIndex, onClose }: { images: SalonImage[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex)
  const dialog = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number | null>(null)
  const { reduced } = useMotionPreferences()
  useDialog(true, dialog, onClose)
  const photo = images[index]
  const next = (direction: number) => setIndex(current => (current + direction + images.length) % images.length)
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); setIndex(current => (current + 1) % images.length) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(current => (current - 1 + images.length) % images.length) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [images.length])
  useEffect(() => { const preload = new Image(); preload.src = images[(index + 1) % images.length].src }, [index, images])
  return createPortal(<div className="lightbox-overlay" onClick={event => { if (event.target === event.currentTarget) onClose() }} data-lenis-prevent>
    <motion.div className="lightbox" ref={dialog} role="dialog" aria-modal="true" aria-labelledby="lightbox-title" tabIndex={-1} initial={reduced ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="lightbox-top"><span>ESMALTADAS & BELLAS</span><button className="icon-button" onClick={onClose} aria-label="Fechar foto"><X /></button></div>
      <div className="lightbox-photo" onTouchStart={event => { touchStart.current = event.touches[0].clientX }} onTouchEnd={event => { if (touchStart.current !== null) { const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 55) next(distance < 0 ? 1 : -1) } touchStart.current = null }}>
        <AnimatePresence mode="wait"><motion.img key={photo.id} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }} /></AnimatePresence>
        <button className="lightbox-prev icon-button" onClick={() => next(-1)} aria-label="Foto anterior"><ArrowLeft /></button><button className="lightbox-next icon-button" onClick={() => next(1)} aria-label="Próxima foto"><ArrowRight /></button>
      </div>
      <div className="lightbox-bottom"><div aria-live="polite"><span className="eyebrow">{photo.category} · {index + 1} / {images.length}</span><h2 id="lightbox-title">{photo.title}</h2></div><a href={whatsappAvailable ? whatsappUrl(`Olá! Gostei da inspiração “${photo.title}” no site da Esmaltadas & Bellas. Podemos conversar?`) : salon.instagram} target="_blank" rel="noopener noreferrer" className="button button-light"><BrandIcon brand={whatsappAvailable ? 'whatsapp' : 'instagram'} />Quero esse estilo <ArrowUpRight size={17} /></a></div>
      <p className="lightbox-help">Use as setas ou deslize para explorar. Esc para fechar.</p>
    </motion.div>
  </div>, document.body)
}
