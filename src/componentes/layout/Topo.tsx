import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { navegacao } from '../../conteudo/textos'
import { linkConversa, site, temWhatsApp } from '../../conteudo/site'
import { rolarPara, pausarRolagem } from '../../hooks/useRolagem'
import { useMovimento } from '../../hooks/useMovimento'
import { ease } from '../../lib/ease'
import { Marca, Magnetico, Brilho } from '../ui/Pecas'
import BrandIcon from '../ui/BrandIcon'

/** Topo fixo: some ao descer, volta ao subir, ganha fundo depois do hero. Menu cheio no celular. */
export function Topo({ marcaVisivel }: { marcaVisivel: boolean }) {
  const { reduzido } = useMovimento()
  const { scrollY } = useScroll()
  const [rolado, setRolado] = useState(false)
  const [escondido, setEscondido] = useState(false)
  const [aberto, setAberto] = useState(false)
  const botaoMenu = useRef<HTMLButtonElement>(null)
  const painel = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', v => {
    const anterior = scrollY.getPrevious() ?? 0
    setRolado(v > 40)
    if (aberto) return
    if (v > 640 && v > anterior + 4) setEscondido(true)
    else if (v < anterior - 4 || v < 640) setEscondido(false)
  })

  useEffect(() => {
    if (!aberto) return
    document.body.classList.add('travado')
    pausarRolagem(true)
    const foco = painel.current?.querySelectorAll<HTMLElement>('a, button')
    foco?.[0]?.focus()
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
      if (e.key === 'Tab' && foco && foco.length) {
        const primeiro = foco[0], ultimo = foco[foco.length - 1]
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus() }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus() }
      }
    }
    document.addEventListener('keydown', tecla)
    return () => {
      document.body.classList.remove('travado')
      pausarRolagem(false)
      document.removeEventListener('keydown', tecla)
      botaoMenu.current?.focus()
    }
  }, [aberto])

  const ir = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setAberto(false)
    window.setTimeout(() => rolarPara(href, reduzido), aberto ? 380 : 0)
  }

  return <>
    <header className={`topo ${rolado ? 'is-rolado' : ''} ${escondido ? 'is-escondido' : ''} ${aberto ? 'is-aberto' : ''}`}>
      <div className="conteiner topo-grade">
        <a href="#inicio" className="topo-marca" onClick={e => ir(e, '#inicio')} aria-label="Esmaltadas & Bellas, voltar ao início">
          <span data-alvo-marca style={{ opacity: marcaVisivel ? 1 : 0 }}><Marca /></span>
        </a>
        <nav className="topo-nav" aria-label="Seções do site">
          {navegacao.map(item => <a key={item.href} href={item.href} onClick={e => ir(e, item.href)}>
            <span data-texto={item.rotulo}>{item.rotulo}</span>
          </a>)}
        </nav>
        <div className="topo-acoes">
          <Magnetico forca={.2}>
            <a className="topo-cta" href={linkConversa()} target="_blank" rel="noopener noreferrer">
              <BrandIcon brand={temWhatsApp ? 'whatsapp' : 'instagram'} />
              <span>Agendar</span>
            </a>
          </Magnetico>
          <button ref={botaoMenu} className="topo-menu" type="button" aria-expanded={aberto} aria-controls="menu-celular"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto(a => !a)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {aberto && <motion.div id="menu-celular" ref={painel} className="menu" role="dialog" aria-modal="true" aria-label="Menu"
        initial={{ clipPath: 'circle(0% at calc(100% - 44px) 32px)' }}
        animate={{ clipPath: 'circle(150% at calc(100% - 44px) 32px)' }}
        exit={{ clipPath: 'circle(0% at calc(100% - 44px) 32px)' }}
        transition={{ duration: reduzido ? 0 : .7, ease: ease.quint }}>
        <nav className="menu-links" aria-label="Menu principal">
          {navegacao.map((item, i) => <span key={item.href} className="mascara">
            <motion.a href={item.href} onClick={e => ir(e, item.href)}
              initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: .9, delay: .18 + i * .06, ease: ease.expo }}>
              <small>{String(i + 1).padStart(2, '0')}</small>{item.rotulo}
            </motion.a>
          </span>)}
        </nav>
        <motion.div className="menu-rodape" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .8, ease: ease.expo }}>
          <a className="botao laca" href={linkConversa()} target="_blank" rel="noopener noreferrer">
            <span>Agendar meu horário</span><span className="botao-icone" aria-hidden="true"><ArrowUpRight /></span>
          </a>
          <a className="menu-insta" href={site.instagram} target="_blank" rel="noopener noreferrer">
            <BrandIcon brand="instagram" /> {site.arroba}
          </a>
          <Brilho className="menu-brilho" />
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>
}
