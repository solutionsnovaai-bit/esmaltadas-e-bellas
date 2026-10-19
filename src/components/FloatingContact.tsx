import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { salon, whatsappAvailable, whatsappUrl } from '../content'
import BrandIcon from './BrandIcon'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const outside = (event: PointerEvent) => { if (!container.current?.contains(event.target as Node)) setOpen(false) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])
  return <div className="floating-contact" ref={container}>
    <AnimatePresence>{open && <motion.div id="floating-contact-panel" className="floating-panel" initial={{ opacity: 0, y: 12, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .95 }}><button className="panel-close icon-button" aria-label="Fechar contato" onClick={() => { setOpen(false); trigger.current?.focus() }}><X size={18} /></button><span className="eyebrow">ESMALTADAS & BELLAS</span><h3>Vamos conversar?</h3><p>Nosso WhatsApp estará disponível em breve. Por enquanto, fale com a equipe pelo Instagram.</p><a className="button button-dark" href={salon.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" />Ir para o Instagram<ArrowUpRight size={15} /></a></motion.div>}</AnimatePresence>
    {whatsappAvailable ? <a className="whatsapp-fab" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Esmaltadas e Bellas no WhatsApp"><BrandIcon brand="whatsapp" /></a> : <button className="whatsapp-fab" ref={trigger} onClick={() => setOpen(value => !value)} aria-label="Abrir opções de contato — WhatsApp em breve" aria-controls="floating-contact-panel" aria-expanded={open}><BrandIcon brand="whatsapp" /></button>}
  </div>
}
