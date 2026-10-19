import { ArrowUpRight, ArrowUp } from 'lucide-react'
import BrandLogo from './BrandLogo'
import BrandIcon from './BrandIcon'
import { navigation, salon } from '../content'

export default function Footer() {
  return <footer className="footer section-pad"><div className="footer-top"><BrandLogo light /><nav aria-label="Menu do rodapé">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}<ArrowUpRight size={14} /></a>)}<a href={salon.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" />Instagram<ArrowUpRight size={14} /></a></nav><a href="#inicio" className="back-top" aria-label="Voltar ao início"><ArrowUp size={24} /></a></div><p className="footer-statement">Você, ainda mais <em>bella.</em><span aria-hidden="true">✳</span></p><div className="footer-bottom"><span>© {new Date().getFullYear()} Esmaltadas & Bellas</span><span>UNHAS, CORES & CUIDADO.</span><span>Feito para inspirar você.</span></div></footer>
}
