import { useRef, type MouseEvent } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { navegacao, rodape } from '../../conteudo/textos'
import { linkConversa, site, temWhatsApp } from '../../conteudo/site'
import { useMovimento } from '../../hooks/useMovimento'
import { rolarPara } from '../../hooks/useRolagem'
import { ease } from '../../lib/ease'
import { Titulo } from '../ui/Revelar'
import { Botao, Brilho, Marca } from '../ui/Pecas'
import { Gotas } from '../ui/Gotas'
import BrandIcon from '../ui/BrandIcon'

/** Rodapé: convite final, links, controle de animações e a assinatura gigante "Bellas.". */
export function Rodape() {
  const { reduzido, escolhaUsuario, alternar } = useMovimento()
  const assinatura = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: assinatura, offset: ['start end', 'end end'] })
  const yAss = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const ir = (e: MouseEvent<HTMLAnchorElement>, href: string) => { e.preventDefault(); rolarPara(href, reduzido) }

  return <footer className="rodape escuro">
    <Gotas className="rodape-gotas" semente={11} />
    <div className="conteiner">
      <div className="rodape-convite">
        <Titulo linhas={[rodape.chamada]} destaque={rodape.destaque} className="titulo rodape-titulo" />
        <div className="rodape-acoes">
          <Botao href={linkConversa()} externo variante="laca" icone={<BrandIcon brand={temWhatsApp ? 'whatsapp' : 'instagram'} />}>Agendar meu horário</Botao>
          <Botao href={site.instagram} externo variante="contorno" icone={<BrandIcon brand="instagram" />}>{site.arroba}</Botao>
        </div>
      </div>

      <div className="rodape-colunas">
        <div className="rodape-marca">
          <Marca />
          <p>{rodape.frase}</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="rodape-rotulo">Navegue</p>
          <ul>{navegacao.map(n => <li key={n.href}><a href={n.href} onClick={e => ir(e, n.href)}>{n.rotulo}</a></li>)}</ul>
        </nav>
        <div>
          <p className="rodape-rotulo">Fale com a gente</p>
          <ul>
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" /> Instagram</a></li>
            {temWhatsApp && <li><a href={linkConversa()} target="_blank" rel="noopener noreferrer"><BrandIcon brand="whatsapp" /> WhatsApp</a></li>}
          </ul>
        </div>
        <div>
          <p className="rodape-rotulo">Conforto</p>
          <button type="button" className="rodape-movimento" aria-pressed={escolhaUsuario} onClick={alternar}>
            <span className="interruptor" aria-hidden="true"><i /></span>
            {escolhaUsuario ? rodape.movimentoAtivo : rodape.movimento}
          </button>
          <a href="#inicio" className="rodape-topo" onClick={e => ir(e, '#inicio')}><ArrowUp aria-hidden="true" /> Voltar ao topo</a>
        </div>
      </div>
    </div>

    {/* O gatilho fica no parágrafo inteiro: as letras deslocadas ficam recortadas e a detecção de visibilidade não as veria. */}
    <motion.p ref={assinatura} className="rodape-assinatura" aria-hidden="true"
      initial="fora" whileInView="dentro" viewport={{ once: true, amount: .2 }}>
      <motion.span style={reduzido ? undefined : { y: yAss }} variants={{ fora: {}, dentro: { transition: { staggerChildren: .06 } } }}>
        {Array.from(rodape.assinatura).map((l, i) => <motion.span key={i} className={l === '.' ? 'is-ponto' : ''}
          variants={{ fora: { y: '60%', opacity: 0 }, dentro: { y: '0%', opacity: 1, transition: { duration: 1.3, ease: ease.expo } } }}>{l}</motion.span>)}
      </motion.span>
      <Brilho className="rodape-brilho anima" />
    </motion.p>

    <div className="conteiner rodape-base">
      <span>© {new Date().getFullYear()} {site.nome}</span>
      <span>{rodape.frase}</span>
    </div>
  </footer>
}
