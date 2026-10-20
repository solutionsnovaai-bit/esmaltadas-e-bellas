import { lazy, Suspense, useCallback, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { MovimentoProvider, useMovimento } from './hooks/useMovimento'
import { useRolagem } from './hooks/useRolagem'
import type { Foto } from './conteudo/fotos'
import Abertura, { modoAbertura, type ModoAbertura } from './componentes/abertura/Abertura'
import { Topo } from './componentes/layout/Topo'
import { Rodape } from './componentes/layout/Rodape'
import { Flutuante } from './componentes/layout/Flutuante'
import { Cursor } from './componentes/layout/Cursor'
import { Hero } from './componentes/secoes/Hero'
import { Faixas } from './componentes/secoes/Faixas'
import { Vitrine } from './componentes/secoes/Vitrine'
import { Manifesto } from './componentes/secoes/Manifesto'
import { CenaCor } from './componentes/secoes/CenaCor'
import { Cuidados } from './componentes/secoes/Cuidados'
import { Galeria } from './componentes/secoes/Galeria'
import { Equipe } from './componentes/secoes/Equipe'
import { Passos } from './componentes/secoes/Passos'
import { Agendar } from './componentes/secoes/Agendar'
import { Instagram } from './componentes/secoes/Instagram'

const Lightbox = lazy(() => import('./componentes/layout/Lightbox'))

function Experiencia() {
  const { reduzido } = useMovimento()
  const [modo] = useState<ModoAbertura>(() => modoAbertura(reduzido))
  const [abertura, setAbertura] = useState(modo !== 'nenhuma')
  const [pronto, setPronto] = useState(modo === 'nenhuma')
  const [selecao, setSelecao] = useState<{ fotos: Foto[]; i: number } | null>(null)
  const { scrollYProgress } = useScroll()
  const progresso = useSpring(scrollYProgress, { stiffness: 160, damping: 35 })

  useLayoutEffect(() => {
    if (modo === 'nenhuma') return
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [modo])

  useRolagem(!abertura)
  const aoSair = useCallback(() => setPronto(true), [])
  const aoFim = useCallback(() => setAbertura(false), [])
  const abrir = useCallback((fotos: Foto[], i: number) => setSelecao({ fotos, i }), [])

  return <>
    {abertura && <Abertura modo={modo} onSaida={aoSair} onFim={aoFim} />}
    <div className={abertura ? 'site is-abrindo' : 'site'}>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <motion.div className="progresso" style={{ scaleX: progresso }} aria-hidden="true" />
      <Topo marcaVisivel={!abertura} />
      <main id="conteudo">
        <Hero pronto={pronto} />
        <Faixas />
        <Vitrine abrir={abrir} />
        <Manifesto />
        <CenaCor />
        <Cuidados />
        <Galeria abrir={abrir} />
        <Equipe />
        <Passos />
        <Agendar />
        <Instagram />
      </main>
      <Rodape />
      <Flutuante />
    </div>
    <Cursor />
    <div className="grao anima" aria-hidden="true" />
    <Suspense fallback={null}>
      <AnimatePresence>
        {selecao && <Lightbox key="lb" fotos={selecao.fotos} inicial={selecao.i} fechar={() => setSelecao(null)} />}
      </AnimatePresence>
    </Suspense>
  </>
}

export default function App() {
  return <MovimentoProvider><Experiencia /></MovimentoProvider>
}
