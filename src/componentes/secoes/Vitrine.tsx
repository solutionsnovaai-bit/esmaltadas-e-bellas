import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { vitrine } from '../../conteudo/textos'
import { foto, type Foto } from '../../conteudo/fotos'
import { useCenaAtiva } from '../../hooks/useCenaAtiva'
import { useMovimento } from '../../hooks/useMovimento'
import { Titulo, Revelar } from '../ui/Revelar'
import { Lupa } from '../ui/Lupa'

const IDS = [3, 13, 17, 1, 22, 20, 14, 16, 9, 6, 18, 19, 5, 10]
const lista = IDS.map(foto)

/** Carrossel infinito: corre sozinho, para no mouse, arrasta com inércia; lupa no desktop. */
export function Vitrine({ abrir }: { abrir: (fotos: Foto[], i: number) => void }) {
  const { reduzido } = useMovimento()
  const area = useRef<HTMLDivElement>(null)
  const ativa = useCenaAtiva(area, .1)
  const grupo = useRef<HTMLDivElement>(null)
  const largura = useRef(0)
  const arrasto = useRef<{ id: number; x0: number; pos: number; t: number; moveu: number; v: number } | null>(null)
  const inercia = useRef(0)
  const arrastou = useRef(false)
  const [pausa, setPausa] = useState(false)
  const x = useMotionValue(0)
  const inclina = useSpring(0, { stiffness: 200, damping: 30 })

  const normal = (v: number) => largura.current ? -largura.current + ((v % largura.current) + largura.current) % largura.current : 0

  useEffect(() => {
    if (!grupo.current) return
    const medir = () => { largura.current = grupo.current?.getBoundingClientRect().width ?? 0; x.set(-largura.current) }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(grupo.current)
    return () => ro.disconnect()
  }, [x, reduzido])

  useAnimationFrame((_, delta) => {
    if (reduzido || !ativa || arrasto.current) return
    const dt = Math.min(delta, 40) / 1000
    if (Math.abs(inercia.current) > 4) {
      x.set(normal(x.get() + inercia.current * dt))
      inercia.current *= Math.pow(.05, dt)
      inclina.set(Math.max(-8, Math.min(8, inercia.current / 160)))
    } else {
      inercia.current = 0
      inclina.set(0)
      if (!pausa) x.set(normal(x.get() - 34 * dt))
    }
  })

  const inicio = (e: PointerEvent<HTMLDivElement>) => {
    if (reduzido || e.button !== 0) return
    arrasto.current = { id: e.pointerId, x0: e.clientX, pos: x.get(), t: performance.now(), moveu: 0, v: 0 }
  }
  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const a = arrasto.current
    if (!a || a.id !== e.pointerId) return
    const dx = e.clientX - a.x0
    if (Math.abs(dx) > 6 && !e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.setPointerCapture(e.pointerId)
    const agora = performance.now()
    const anterior = x.get()
    x.set(normal(a.pos + dx))
    const dtt = Math.max(agora - a.t, 1)
    a.v = a.v * .6 + ((x.get() - anterior) / dtt * 1000) * .4
    a.t = agora
    a.moveu = Math.max(a.moveu, Math.abs(dx))
    inclina.set(Math.max(-8, Math.min(8, a.v / 160)))
  }
  const fim = () => {
    const a = arrasto.current
    if (!a) return
    inercia.current = Math.abs(a.v) > 200 ? a.v : 0
    window.setTimeout(() => { arrasto.current = null }, 0)
    if (a.moveu > 6) { arrastou.current = true; window.setTimeout(() => { arrastou.current = false }, 60) }
  }
  const passo = (sentido: number) => {
    const card = grupo.current?.querySelector('figure')?.getBoundingClientRect().width ?? 300
    const gap = grupo.current ? parseFloat(getComputedStyle(grupo.current).columnGap) || 24 : 24
    if (reduzido) area.current?.querySelector('.vitrine-janela')?.scrollBy({ left: sentido * (card + gap), behavior: 'auto' })
    else inercia.current = -sentido * (card + gap) * 3.1
  }
  const teclado = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); passo(e.key === 'ArrowRight' ? 1 : -1) }
  }

  return <section className="secao vitrine" aria-labelledby="vitrine-titulo" ref={area}>
    <div className="conteiner vitrine-cabeca">
      <div>
        <Revelar><p className="selo-texto">{vitrine.selo}</p></Revelar>
        <Titulo id="vitrine-titulo" linhas={[vitrine.titulo]} destaque={vitrine.destaque} />
      </div>
      <div className="vitrine-lado">
        <Revelar delay={.1}><p className="lead">{vitrine.texto}</p></Revelar>
        <div className="setas">
          <button type="button" onClick={() => passo(-1)} aria-label="Fotos anteriores"><ArrowLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => passo(1)} aria-label="Próximas fotos"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </div>
    <div className={`vitrine-janela ${reduzido ? 'is-parada' : ''}`} role="region" aria-label="Trabalhos do salão" tabIndex={0}
      onKeyDown={teclado} onPointerDown={inicio} onPointerMove={mover} onPointerUp={fim} onPointerCancel={fim} onLostPointerCapture={fim}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setPausa(true) }} onPointerLeave={() => setPausa(false)}
      data-cursor="arraste">
      <motion.div className="vitrine-trilho" style={reduzido ? undefined : { x, skewX: inclina }}>
        {Array.from({ length: reduzido ? 1 : 3 }, (_, g) => <div className="vitrine-grupo" ref={g === 0 ? grupo : undefined} key={g} aria-hidden={g > 0 || undefined}>
          {lista.map((f, i) => <figure key={f.id} className="vitrine-item">
            <button type="button" className="vitrine-foto" data-cursor="ver" tabIndex={g > 0 ? -1 : 0}
              aria-label={`Ampliar: ${f.titulo}`} onClick={() => { if (!arrastou.current) abrir(lista, i) }}>
              <Lupa><img src={f.src} alt={g === 0 ? f.alt : ''} width={f.w} height={f.h} loading="lazy" decoding="async" draggable={false} /></Lupa>
            </button>
            <figcaption><span>{f.categoria}<small>{String(i + 1).padStart(2, '0')}</small></span><strong>{f.titulo}</strong></figcaption>
          </figure>)}
        </div>)}
      </motion.div>
    </div>
  </section>
}
