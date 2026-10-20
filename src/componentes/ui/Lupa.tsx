import { useRef, type PointerEvent, type ReactNode } from 'react'

const ZOOM = 2.3

/** Lente redonda que acompanha o mouse e amplia a foto (só com mouse). */
export function Lupa({ children, className = '' }: { children: ReactNode; className?: string }) {
  const caixa = useRef<HTMLDivElement>(null)
  const lente = useRef<HTMLSpanElement>(null)
  const esconder = () => { if (caixa.current) caixa.current.dataset.lupa = '' }
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const c = caixa.current, l = lente.current
    if (!c || !l || e.pointerType !== 'mouse' || e.buttons !== 0) { esconder(); return }
    const img = c.querySelector('img')
    if (!img || !img.complete || !img.naturalWidth) return
    const cr = c.getBoundingClientRect(), r = img.getBoundingClientRect()
    const nw = img.naturalWidth, nh = img.naturalHeight
    const escala = Math.max(r.width / nw, r.height / nh)
    const ox = (r.width - nw * escala) / 2, oy = (r.height - nh * escala) / 2
    const raio = l.offsetWidth / 2
    const px = e.clientX - r.left - ox, py = e.clientY - r.top - oy
    l.style.transform = `translate3d(${e.clientX - cr.left - raio}px, ${e.clientY - cr.top - raio}px, 0)`
    const src = `url("${img.currentSrc || img.src}")`
    if (l.dataset.src !== src) { l.style.backgroundImage = src; l.dataset.src = src }
    l.style.backgroundSize = `${nw * escala * ZOOM}px ${nh * escala * ZOOM}px`
    l.style.backgroundPosition = `${raio - px * ZOOM}px ${raio - py * ZOOM}px`
    c.dataset.lupa = 'ativa'
  }
  return <div ref={caixa} className={`lupa ${className}`} onPointerMove={mover} onPointerLeave={esconder} onPointerDown={esconder}>
    {children}<span ref={lente} className="lupa-lente" aria-hidden="true" />
  </div>
}
