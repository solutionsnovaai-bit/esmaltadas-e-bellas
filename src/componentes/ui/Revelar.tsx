import type { ReactNode, ElementType } from 'react'
import { motion } from 'motion/react'
import { ease } from '../../lib/ease'

type RevelarProps = { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'p' | 'li' | 'span' }

/** Entrada suave (sobe, ganha nitidez) quando o bloco chega à tela. */
export function Revelar({ children, delay = 0, y = 26, className, as = 'div' }: RevelarProps) {
  const M = motion[as] as typeof motion.div
  return <M className={className}
    initial={{ opacity: 0, y, filter: 'blur(8px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, amount: .35 }}
    transition={{ duration: 1.1, delay, ease: ease.expo }}>
    {children}
  </M>
}

type TituloProps = {
  linhas: readonly string[]
  destaque?: string
  id?: string
  className?: string
  as?: ElementType
  /** Controle manual (ex.: depois da abertura). Sem isso, entra ao aparecer na tela. */
  play?: boolean
  delay?: number
}

/** Título em linhas: cada linha sobe por trás de uma máscara. O destaque vem em itálico laca. */
export function Titulo({ linhas, destaque, id, className = 'titulo', as: Tag = 'h2', play, delay = 0 }: TituloProps) {
  const todas = destaque ? [...linhas, destaque] : [...linhas]
  const gatilho = play === undefined
    ? { whileInView: 'dentro', viewport: { once: true, amount: .5 } }
    : { animate: play ? 'dentro' : 'fora' }
  return <Tag id={id} className={className}>
    <span className="visualmente-oculto">{todas.join(' ')}</span>
    <motion.span aria-hidden="true" style={{ display: 'block' }} initial="fora" {...gatilho}
      transition={{ staggerChildren: .09, delayChildren: delay }}>
      {todas.map((linha, i) => <span key={i} className="mascara titulo-linha">
        <motion.span style={{ display: 'inline-block' }}
          variants={{ fora: { y: '108%', rotate: 2.5 }, dentro: { y: '0%', rotate: 0, transition: { duration: 1.25, ease: ease.expo } } }}>
          {destaque && i === todas.length - 1 ? <em>{linha}</em> : linha}
        </motion.span>
      </span>)}
    </motion.span>
  </Tag>
}

/** Letras que sobem uma a uma. */
export function Letras({ texto, play = true, delay = 0, passo = .035, className }: { texto: string; play?: boolean; delay?: number; passo?: number; className?: string }) {
  return <span className={className} aria-label={texto} role="text">
    {Array.from(texto).map((l, i) => <span key={i} className="mascara" style={{ display: 'inline-block' }} aria-hidden="true">
      <motion.span style={{ display: 'inline-block', whiteSpace: 'pre' }}
        initial={{ y: '110%' }} animate={play ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 1, delay: delay + i * passo, ease: ease.expo }}>{l}</motion.span>
    </span>)}
  </span>
}
