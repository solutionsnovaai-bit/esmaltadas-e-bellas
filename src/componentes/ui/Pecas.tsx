import { useId, useRef, type ReactNode, type PointerEvent, type CSSProperties, type MouseEvent } from 'react'
import { motion, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { molas } from '../../lib/ease'
import { usePonteiroFino } from '../../hooks/useMidia'

/** Estrelinha de quatro pontas (o brilho do esmalte). */
export function Brilho({ className = 'brilho', style }: { className?: string; style?: CSSProperties }) {
  return <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 0C12.9 7.6 16.4 11.1 24 12 16.4 12.9 12.9 16.4 12 24 11.1 16.4 7.6 12.9 0 12 7.6 11.1 11.1 7.6 12 0Z" />
  </svg>
}

/** Nome da casa em tipografia: Esmaltadas & Bellas. */
export function Marca({ className = '', letras = false }: { className?: string; letras?: boolean }) {
  const parte = (t: string, c: string) => letras
    ? <span className={c}>{Array.from(t).map((l, i) => <span key={i} className="marca-l">{l}</span>)}</span>
    : <span className={c}>{t}</span>
  return <span className={`marca ${className}`}>
    {parte('Esmaltadas', 'marca-a')}{parte('&', 'marca-e')}{parte('Bellas', 'marca-b')}
  </span>
}

/** Ímã: o elemento é puxado levemente na direção do mouse. */
export function Magnetico({ children, forca = .3, className }: { children: ReactNode; forca?: number; className?: string }) {
  const fino = usePonteiroFino()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, molas.ima)
  const y = useSpring(0, molas.ima)
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (!fino || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * forca)
    y.set((e.clientY - (r.top + r.height / 2)) * forca)
  }
  return <motion.div ref={ref} className={className} style={{ x, y, display: 'inline-flex' }}
    onPointerMove={mover} onPointerLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}

type BotaoProps = {
  href: string
  children: ReactNode
  variante?: '' | 'laca' | 'claro' | 'contorno'
  icone?: ReactNode
  externo?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  className?: string
  rotulo?: string
}

/** Botão-pílula com ícone que gira no hover e preenchimento que sobe. */
export function Botao({ href, children, variante = '', icone, externo, onClick, className = '', rotulo }: BotaoProps) {
  return <Magnetico forca={.18}>
    <a className={`botao ${variante} ${className}`} href={href} onClick={onClick} aria-label={rotulo}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span>{children}</span>
      <span className="botao-icone" aria-hidden="true">{icone ?? <ArrowUpRight />}</span>
    </a>
  </Magnetico>
}

/** Selo redondo com texto girando em volta. */
export function Selo({ texto, className = '', children }: { texto: string; className?: string; children?: ReactNode }) {
  const id = `selo${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return <div className={`selo ${className}`} aria-hidden="true">
    <svg viewBox="0 0 200 200" className="selo-anel anima">
      <defs><path id={id} d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
      <text><textPath href={`#${id}`} startOffset="0" textLength="486" lengthAdjust="spacing">{texto}</textPath></text>
    </svg>
    <div className="selo-miolo">{children ?? <Brilho />}</div>
  </div>
}

/** Reflexo de esmalte: grava a posição do mouse nas variáveis --bx/--by da moldura. */
export function reflexo(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--bx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`)
  el.style.setProperty('--by', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`)
}
