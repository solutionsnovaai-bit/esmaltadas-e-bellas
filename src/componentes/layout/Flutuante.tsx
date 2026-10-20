import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { linkConversa, temWhatsApp, canalConversa } from '../../conteudo/site'
import { ease } from '../../lib/ease'
import BrandIcon from '../ui/BrandIcon'

/** Botão flutuante de conversa: aparece depois do topo e se recolhe no formulário e no rodapé. */
export function Flutuante() {
  const { scrollY } = useScroll()
  const [passou, setPassou] = useState(false)
  const [escondido, setEscondido] = useState(false)
  useMotionValueEvent(scrollY, 'change', v => setPassou(v > innerHeight * .8))

  useEffect(() => {
    const alvos = ['#agendar', 'footer'].map(s => document.querySelector(s)).filter(Boolean) as Element[]
    const vis = new Set<Element>()
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) vis.add(e.target); else vis.delete(e.target) })
      setEscondido(vis.size > 0)
    }, { threshold: .15 })
    alvos.forEach(a => io.observe(a))
    return () => io.disconnect()
  }, [])

  return <AnimatePresence>
    {passou && !escondido && <motion.a className="flutuante" href={linkConversa()} target="_blank" rel="noopener noreferrer"
      aria-label={`Agendar pelo ${canalConversa}`}
      initial={{ scale: 0, opacity: 0, rotate: -40 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: .7, ease: ease.expo }}>
      <span className="flutuante-onda anima" aria-hidden="true" />
      <BrandIcon brand={temWhatsApp ? 'whatsapp' : 'instagram'} />
      <span className="flutuante-rotulo">Agendar</span>
    </motion.a>}
  </AnimatePresence>
}
