import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'
import BrandIcon from './BrandIcon'
import { navigation, salon } from '../content'
import { useDialog } from '../hooks/useDialog'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  useDialog(open, dialog, () => setOpen(false))
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const query = window.matchMedia('(min-width: 960px)')
    const onResize = () => { if (query.matches) setOpen(false) }
    query.addEventListener('change', onResize)
    return () => { window.removeEventListener('scroll', onScroll); query.removeEventListener('change', onResize) }
  }, [])
  return <>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <BrandLogo />
      <nav className="desktop-nav" aria-label="Menu principal">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <a className="header-contact" href="#contato">Vamos conversar <ArrowUpRight size={17} /></a>
      <button className="menu-toggle icon-button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open} aria-controls="menu-mobile"><Menu /></button>
    </header>
    <AnimatePresence>{open && <motion.div ref={dialog} id="menu-mobile" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navegação" data-lenis-prevent
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <button className="menu-close icon-button" onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button>
      <span className="eyebrow">ESCOLHA SEU PRÓXIMO MOMENTO</span>
      <nav>{[...navigation, { href: '#contato', label: 'Vamos conversar' }].map((item, index) => <motion.a key={item.href} href={item.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .08 }}><small>0{index + 1}</small>{item.label}<ArrowUpRight /></motion.a>)}</nav>
      <a className="text-link" href={salon.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" />{salon.handle}</a>
    </motion.div>}</AnimatePresence>
  </>
}
