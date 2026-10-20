import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { passos } from '../../conteudo/textos'
import { useMovimento } from '../../hooks/useMovimento'
import { Titulo, Revelar } from '../ui/Revelar'

const TRACO_H = 'M10 70C160 10 250 130 420 72S700 6 860 66S1150 140 1310 58'
const TRACO_V = 'M40 10C80 140 0 240 40 380S90 620 40 760'

/** Três passos ligados por uma pincelada que se desenha com a rolagem. */
export function Passos() {
  const { reduzido } = useMovimento()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .8', 'end .55'] })
  const desenho = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return <section className="secao passos" aria-labelledby="passos-titulo">
    <div className="conteiner">
      <div className="passos-cabeca">
        <Revelar><p className="selo-texto">{passos.selo}</p></Revelar>
        <Titulo id="passos-titulo" linhas={[passos.titulo]} destaque={passos.destaque} />
      </div>
      <div ref={ref} className="passos-trilha">
        <svg className="passos-traco passos-traco-h" viewBox="0 0 1320 140" preserveAspectRatio="none" aria-hidden="true">
          <path d={TRACO_H} className="passos-traco-fundo" />
          <motion.path d={TRACO_H} style={{ pathLength: reduzido ? 1 : desenho }} />
        </svg>
        <svg className="passos-traco passos-traco-v" viewBox="0 0 80 770" preserveAspectRatio="none" aria-hidden="true">
          <path d={TRACO_V} className="passos-traco-fundo" />
          <motion.path d={TRACO_V} style={{ pathLength: reduzido ? 1 : desenho }} />
        </svg>
        <ol className="passos-lista">
          {passos.itens.map((p, i) => <Revelar as="li" key={p.titulo} delay={i * .12}>
            <span className="passos-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </Revelar>)}
        </ol>
      </div>
    </div>
  </section>
}
