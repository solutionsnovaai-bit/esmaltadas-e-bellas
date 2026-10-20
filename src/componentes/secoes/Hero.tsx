import { useRef, type MouseEvent, type PointerEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { hero } from '../../conteudo/textos'
import { foto } from '../../conteudo/fotos'
import { linkConversa, temWhatsApp } from '../../conteudo/site'
import { useMovimento } from '../../hooks/useMovimento'
import { rolarPara } from '../../hooks/useRolagem'
import { ease, molas } from '../../lib/ease'
import { Titulo } from '../ui/Revelar'
import { Botao, Brilho, Selo, reflexo } from '../ui/Pecas'
import BrandIcon from '../ui/BrandIcon'

const MINIS = [
  { id: 2, classe: 'mini-a', profundidade: 34, giro: -10 },
  { id: 8, classe: 'mini-b', profundidade: -26, giro: 8 },
  { id: 18, classe: 'mini-c', profundidade: 18, giro: 14 },
]

function Mini({ id, classe, profundidade, giro, mx, my, pronto, i }: (typeof MINIS)[number] & { mx: MotionValue<number>; my: MotionValue<number>; pronto: boolean; i: number }) {
  const x = useTransform(mx, v => v * profundidade)
  const y = useTransform(my, v => v * profundidade)
  const f = foto(id)
  return <motion.div className={`hero-mini ${classe}`} style={{ x, y }}
    initial={{ opacity: 0, scale: .6, rotate: giro * 2 }}
    animate={pronto ? { opacity: 1, scale: 1, rotate: giro } : undefined}
    transition={{ duration: 1.4, delay: .55 + i * .12, ease: ease.expo }}>
    <div className="unha" onPointerMove={reflexo}><img src={f.src} alt="" width={f.w} height={f.h} decoding="async" /></div>
  </motion.div>
}

/** Abertura do site: título editorial à esquerda, a equipe dentro de uma "unha" com reflexo à direita. */
export function Hero({ pronto }: { pronto: boolean }) {
  const { reduzido } = useMovimento()
  const secao = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end start'] })
  const yTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const yFoto = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const escalaFoto = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const mx = useSpring(useMotionValue(0), molas.suave)
  const my = useSpring(useMotionValue(0), molas.suave)
  const equipe = foto(25)

  const mover = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || reduzido) return
    mx.set(e.clientX / innerWidth - .5)
    my.set(e.clientY / innerHeight - .5)
  }
  const verInspiracoes = (e: MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); rolarPara('#inspiracoes', reduzido) }

  return <section id="inicio" ref={secao} className="hero" onPointerMove={mover} aria-labelledby="hero-titulo">
    <div className="hero-brilho" aria-hidden="true" />
    <div className="conteiner hero-grade">
      <motion.div className="hero-texto" style={reduzido ? undefined : { y: yTexto }}>
        <motion.p className="selo-texto" initial={{ opacity: 0, y: 12 }} animate={pronto ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: .1, ease: ease.expo }}>{hero.selo}</motion.p>
        <Titulo id="hero-titulo" as="h1" className="titulo hero-titulo" linhas={hero.linhas} destaque={hero.destaque} play={pronto} delay={.15} />
        <motion.p className="lead hero-lead" initial={{ opacity: 0, y: 18 }} animate={pronto ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, delay: .65, ease: ease.expo }}>{hero.texto}</motion.p>
        <motion.div className="hero-acoes" initial={{ opacity: 0, y: 18 }} animate={pronto ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, delay: .8, ease: ease.expo }}>
          <Botao href={linkConversa()} externo variante="laca" icone={<BrandIcon brand={temWhatsApp ? 'whatsapp' : 'instagram'} />}>{hero.cta}</Botao>
          <a className="link-seta" href="#inspiracoes" onClick={verInspiracoes}>{hero.secundario}<ArrowDown aria-hidden="true" /></a>
        </motion.div>
        <motion.ul className="hero-chips" aria-label="Cuidados" initial="fora" animate={pronto ? 'dentro' : 'fora'}
          transition={{ staggerChildren: .07, delayChildren: .95 }}>
          {hero.chips.map(c => <motion.li key={c} variants={{ fora: { opacity: 0, y: 10 }, dentro: { opacity: 1, y: 0, transition: { duration: .9, ease: ease.expo } } }}>
            <Brilho />{c}
          </motion.li>)}
        </motion.ul>
      </motion.div>

      <div className="hero-visual">
        <motion.div className="hero-moldura" style={reduzido ? undefined : { y: yFoto }}
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0 0)' }}
          animate={pronto ? { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0 0)' } : undefined}
          transition={{ duration: 1.6, delay: .1, ease: ease.quint }}>
          <div className="unha hero-unha" onPointerMove={reflexo} data-cursor="">
            <motion.img src={equipe.src} alt={equipe.alt} width={equipe.w} height={equipe.h} fetchPriority="high" decoding="async"
              style={reduzido ? undefined : { scale: escalaFoto }}
              initial={{ scale: 1.25 }} animate={pronto ? { scale: 1 } : undefined} transition={{ duration: 2.2, ease: ease.expo }} />
          </div>
          <p className="hero-legenda"><span>{hero.legenda}</span><em>E tem um lugar aqui.</em></p>
        </motion.div>
        {MINIS.map((m, i) => <Mini key={m.id} {...m} i={i} mx={mx} my={my} pronto={pronto} />)}
        <motion.div className="hero-selo-pos" initial={{ opacity: 0, scale: .5, rotate: -90 }} animate={pronto ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 1.4, delay: .9, ease: ease.expo }}>
          <Selo texto={hero.anel} className="hero-selo" />
        </motion.div>
      </div>
    </div>
    <motion.a href="#essencia" className="hero-rolar" onClick={e => { e.preventDefault(); rolarPara('#essencia', reduzido) }}
      initial={{ opacity: 0 }} animate={pronto ? { opacity: 1 } : undefined} transition={{ delay: 1.4, duration: 1 }}>
      <span>Role</span><i aria-hidden="true" />
    </motion.a>
  </section>
}
