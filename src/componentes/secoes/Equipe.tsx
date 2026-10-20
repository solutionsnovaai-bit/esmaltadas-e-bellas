import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { equipe } from '../../conteudo/textos'
import { foto } from '../../conteudo/fotos'
import { useMovimento } from '../../hooks/useMovimento'
import { ease } from '../../lib/ease'
import { Titulo, Revelar } from '../ui/Revelar'
import { Selo, reflexo } from '../ui/Pecas'

/** Quem cuida de você: a equipe em destaque no escuro, com a foto subindo por trás de uma cortina. */
export function Equipe() {
  const { reduzido } = useMovimento()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const escala = useTransform(scrollYProgress, [0, .5, 1], [1.18, 1.04, 1])
  const yPalavra = useTransform(scrollYProgress, [0, 1], ['30%', '-40%'])
  const f = foto(25)

  return <section ref={ref} className="secao equipe escuro" aria-labelledby="equipe-titulo">
    <motion.p className="equipe-fundo-palavra" aria-hidden="true" style={reduzido ? undefined : { y: yPalavra }}>Bellas</motion.p>
    <div className="conteiner equipe-grade">
      <div className="equipe-visual">
        <motion.div className="equipe-moldura" initial="fora" whileInView="dentro" viewport={{ once: true, amount: .25 }}>
          <motion.div variants={{
            fora: { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)' },
            dentro: { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', transition: { duration: 1.7, ease: ease.quint } },
          }}>
            <div className="unha equipe-unha" onPointerMove={reflexo}>
              <motion.img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async"
                style={reduzido ? undefined : { y: yFoto, scale: escala }} />
            </div>
          </motion.div>
        </motion.div>
        <Selo texto="FEITO COM CARINHO ✳ FEITO COM CARINHO ✳ " className="equipe-selo" />
      </div>
      <div className="equipe-texto">
        <Revelar><p className="selo-texto">{equipe.selo}</p></Revelar>
        <Titulo id="equipe-titulo" linhas={[equipe.titulo]} destaque={equipe.destaque} />
        <Revelar delay={.1}><p className="lead">{equipe.texto}</p></Revelar>
        <ol className="equipe-valores">
          {equipe.valores.map((v, i) => <Revelar as="li" key={v.titulo} delay={.12 + i * .08}>
            <span className="equipe-num">{String(i + 1).padStart(2, '0')}</span>
            <div><strong>{v.titulo}</strong><p>{v.texto}</p></div>
          </Revelar>)}
        </ol>
      </div>
    </div>
  </section>
}
