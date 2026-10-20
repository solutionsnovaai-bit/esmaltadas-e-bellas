import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { instagram } from '../../conteudo/textos'
import { foto } from '../../conteudo/fotos'
import { site } from '../../conteudo/site'
import { useMovimento } from '../../hooks/useMovimento'
import { Titulo, Revelar } from '../ui/Revelar'
import { Botao } from '../ui/Pecas'
import BrandIcon from '../ui/BrandIcon'

const LEQUE = [
  { x: -118, r: -16, y: 34 },
  { x: -60, r: -8, y: 8 },
  { x: 0, r: 0, y: -6 },
  { x: 60, r: 8, y: 8 },
  { x: 118, r: 16, y: 34 },
]

function Carta({ id, i, p }: { id: number; i: number; p: MotionValue<number> }) {
  const alvo = LEQUE[i]
  const x = useTransform(p, [0, 1], ['0%', `${alvo.x}%`])
  const y = useTransform(p, [0, 1], [i * -4, alvo.y])
  const rotate = useTransform(p, [0, 1], [(i - 2) * 2, alvo.r])
  const f = foto(id)
  return <motion.li className="insta-carta" style={{ x, y, rotate, zIndex: i === 2 ? 5 : 5 - Math.abs(i - 2) }}>
    <a href={site.instagram} target="_blank" rel="noopener noreferrer" data-cursor="ver" aria-label={`${f.titulo} — abrir o Instagram`}>
      <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
      <span className="insta-icone" aria-hidden="true"><BrandIcon brand="instagram" /></span>
    </a>
  </motion.li>
}

/** As fotos chegam empilhadas e se abrem em leque conforme a rolagem. */
export function Instagram() {
  const { reduzido } = useMovimento()
  const ref = useRef<HTMLUListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start .95', 'center .55'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24 })
  const fixo = useTransform(p, () => 1)

  return <section className="secao instagram" aria-labelledby="insta-titulo">
    <div className="conteiner instagram-dentro">
      <Revelar><p className="selo-texto">{instagram.selo}</p></Revelar>
      <Titulo id="insta-titulo" className="titulo instagram-titulo" linhas={[instagram.titulo]} destaque={instagram.destaque} />
      <ul ref={ref} className="insta-leque">
        {instagram.fotos.map((id, i) => <Carta key={id} id={id} i={i} p={reduzido ? fixo : p} />)}
      </ul>
      <Revelar className="instagram-cta">
        <Botao href={site.instagram} externo icone={<BrandIcon brand="instagram" />}>{instagram.cta}</Botao>
        <p className="instagram-arroba">{site.arroba}</p>
      </Revelar>
    </div>
  </section>
}
