import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { manifesto } from '../../conteudo/textos'
import { foto } from '../../conteudo/fotos'
import { useMovimento } from '../../hooks/useMovimento'
import { ease } from '../../lib/ease'
import { Revelar } from '../ui/Revelar'
import { Brilho, reflexo } from '../ui/Pecas'

function Palavra({ p, faixa, children, destaque }: { p: MotionValue<number>; faixa: [number, number]; children: string; destaque: boolean }) {
  const opacity = useTransform(p, faixa, [.13, 1])
  const y = useTransform(p, faixa, [6, 0])
  return <motion.span className={destaque ? 'palavra is-destaque' : 'palavra'} style={{ opacity, y }}>{children}</motion.span>
}

/** "Mais que unhas": o texto acende palavra por palavra conforme a leitura avança. */
export function Manifesto() {
  const { reduzido } = useMovimento()
  const texto = useRef<HTMLParagraphElement>(null)
  const fotosRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: texto, offset: ['start .85', 'end .5'] })
  const { scrollYProgress: pf } = useScroll({ target: fotosRef, offset: ['start end', 'end start'] })
  const yA = useTransform(pf, [0, 1], ['10%', '-14%'])
  const yB = useTransform(pf, [0, 1], ['30%', '-30%'])
  const giroB = useTransform(pf, [0, 1], [10, -4])
  const palavras = manifesto.texto.split(' ')
  const a = foto(23), b = foto(11)

  return <section id="essencia" className="secao manifesto" aria-labelledby="manifesto-titulo">
    <div className="conteiner manifesto-grade">
      <div className="manifesto-fotos" ref={fotosRef} aria-hidden="true">
        <motion.div className="manifesto-foto-a" style={reduzido ? undefined : { y: yA }}
          initial="fora" whileInView="dentro" viewport={{ once: true, amount: .3 }}>
          {/* O gatilho fica fora do recorte: o Chrome ignora elementos com clip-path fechado na detecção de visibilidade. */}
          <motion.div variants={{ fora: { clipPath: 'inset(100% 0% 0% 0%)' }, dentro: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.5, ease: ease.quint } } }}>
            <div className="unha" onPointerMove={reflexo}><img src={a.src} alt="" width={a.w} height={a.h} loading="lazy" decoding="async" /></div>
          </motion.div>
        </motion.div>
        <motion.div className="manifesto-foto-b" style={reduzido ? undefined : { y: yB, rotate: giroB }}
          initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: .3 }} transition={{ duration: 1.4, delay: .25, ease: ease.expo }}>
          <div className="unha" onPointerMove={reflexo}><img src={b.src} alt="" width={b.w} height={b.h} loading="lazy" decoding="async" /></div>
        </motion.div>
        <Brilho className="manifesto-brilho anima" />
      </div>
      <div className="manifesto-texto">
        <Revelar><p className="selo-texto" id="manifesto-titulo">{manifesto.selo}</p></Revelar>
        <p ref={texto} className="manifesto-frase">
          {reduzido ? manifesto.texto : palavras.map((w, i) => <Fragment key={i}>
            <Palavra p={scrollYProgress} faixa={[i / palavras.length, (i + 1) / palavras.length]} destaque={i < manifesto.destaques}>{w}</Palavra>{' '}
          </Fragment>)}
        </p>
        <Revelar delay={.1}><p className="manifesto-assinatura"><Brilho /> {manifesto.assinatura}</p></Revelar>
      </div>
    </div>
  </section>
}
