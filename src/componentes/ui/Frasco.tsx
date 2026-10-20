import { useId } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'

/* Desenho do vidro de esmalte (viewBox 0 0 240 440). Usado na abertura e na cena das cores. */
export const FRASCO = {
  w: 240,
  h: 440,
  tampa: 'M80 172L86 26C86.5 15 94 8 105 8H135C146 8 153.5 15 154 26L160 172Z',
  gargalo: 'M90 172H150V198H90Z',
  corpo: 'M72 198H168C194 198 212 216 212 242V390C212 414 194 432 168 432H72C46 432 28 414 28 390V242C28 216 46 198 72 198Z',
  haste: 'M117 172H123V360H117Z',
  cerdas: 'M110 354C110 346 130 346 130 354L127 396C126 407 114 407 113 396Z',
  /** Altura útil do líquido (topo do corpo até o fundo). */
  topo: 206,
  fundo: 432,
  /** Ponta do pincel, de onde cai a gota. */
  ponta: { x: 120, y: 406 },
  /** Centro do corpo (fração do viewBox) — de onde a cor se espalha na abertura. */
  centro: { x: 120 / 240, y: 318 / 440 },
} as const

const ONDA = 'M-240 0Q-210 -9 -180 0T-120 0T-60 0T0 0T60 0T120 0T180 0T240 0T300 0T360 0T420 0T480 0V320H-240Z'

type Valor<T> = T | MotionValue<T>

type Props = {
  cor: Valor<string>
  /** 0 = vazio, 1 = cheio. */
  nivel?: Valor<number>
  tampaX?: MotionValue<number>
  tampaY?: MotionValue<number>
  tampaGiro?: MotionValue<number>
  /** 0 → 1: a gota sai da ponta do pincel e cai. */
  gota?: MotionValue<number>
  className?: string
}

/** Vidro de esmalte com líquido ondulando, tampa (com pincel) que pode girar e subir. */
export function Frasco({ cor, nivel = .78, tampaX, tampaY, tampaGiro, gota, className = '' }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const fixo = (v: Valor<number>) => typeof v === 'number'
  const nivelY = useTransform(() => {
    const n = fixo(nivel) ? nivel as number : (nivel as MotionValue<number>).get()
    return FRASCO.fundo - n * (FRASCO.fundo - FRASCO.topo)
  })
  /* A gota nasce na ponta do pincel (onde quer que a tampa esteja) e cai. */
  const HASTE = FRASCO.ponta.y - 172
  const rad = () => ((tampaGiro?.get() ?? 0) * Math.PI) / 180
  const gotaX = useTransform(() => 120 + (tampaX?.get() ?? 0) - HASTE * Math.sin(rad()))
  const gotaY = useTransform(() => 172 + (tampaY?.get() ?? 0) + HASTE * Math.cos(rad()) + Math.pow(gota?.get() ?? 0, 1.6) * 760)
  const gotaOp = useTransform(() => { const g = gota?.get() ?? 0; return g > 0 && g < .98 ? 1 : 0 })
  const gotaEsc = useTransform(() => { const g = gota?.get() ?? 0; return g < .12 ? .35 + g * 5.4 : 1 + Math.min(g, .5) * .5 })

  return <svg className={`frasco ${className}`} viewBox={`0 0 ${FRASCO.w} ${FRASCO.h}`} aria-hidden="true" focusable="false" overflow="visible">
    <defs>
      <clipPath id={`${id}c`}><path d={FRASCO.corpo} /></clipPath>
      <linearGradient id={`${id}t`} x1="0" x2="1">
        <stop offset="0" stopColor="#0d0509" /><stop offset=".22" stopColor="#3a1a2b" /><stop offset=".34" stopColor="#5b3349" />
        <stop offset=".5" stopColor="#1b0b14" /><stop offset="1" stopColor="#070205" />
      </linearGradient>
      <linearGradient id={`${id}v`} x1="0" x2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".26" /><stop offset=".3" stopColor="#fff" stopOpacity=".05" />
        <stop offset=".7" stopColor="#fff" stopOpacity=".03" /><stop offset="1" stopColor="#fff" stopOpacity=".2" />
      </linearGradient>
      <radialGradient id={`${id}l`} cx=".3" cy=".25" r=".9">
        <stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".28" />
      </radialGradient>
    </defs>

    {/* sombra no chão */}
    <ellipse cx="120" cy="438" rx="92" ry="7" fill="#000" opacity=".28" />

    {/* líquido */}
    <g clipPath={`url(#${id}c)`}>
      <motion.g style={{ y: nivelY }}>
        <motion.path className="frasco-onda anima" d={ONDA} style={{ fill: cor }} />
      </motion.g>
      <rect x="20" y="190" width="200" height="250" fill={`url(#${id}l)`} />
      <text x="120" y="338" textAnchor="middle" className="frasco-monograma">E&amp;B</text>
    </g>

    {/* vidro */}
    <path d={FRASCO.gargalo} className="frasco-gargalo" />
    <path d={FRASCO.corpo} fill={`url(#${id}v)`} className="frasco-vidro" />
    <rect x="42" y="226" width="11" height="176" rx="5.5" className="frasco-reflexo" />
    <rect x="193" y="246" width="5" height="70" rx="2.5" className="frasco-reflexo" opacity=".55" />

    {/* gota */}
    {gota && <motion.g style={{ x: gotaX, y: gotaY, opacity: gotaOp }}>
      <motion.path d="M0 -2C0 -2 -8 10 -8 16A8 8 0 0 0 8 16C8 10 0 -2 0 -2Z" style={{ fill: cor, scale: gotaEsc, originX: '0px', originY: '0px' }} />
    </motion.g>}

    {/* tampa + pincel */}
    <motion.g style={{ x: tampaX, y: tampaY, rotate: tampaGiro, originX: '120px', originY: '172px' }}>
      <path d={FRASCO.haste} className="frasco-haste" />
      <motion.path d={FRASCO.cerdas} style={{ fill: cor }} />
      <path d={FRASCO.tampa} fill={`url(#${id}t)`} />
      <path d="M95 22V160" className="frasco-tampa-luz" />
      <path d="M81 150H159M81 158H159.3M80.6 166H159.6" className="frasco-tampa-aneis" />
    </motion.g>
  </svg>
}
