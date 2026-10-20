import { useLayoutEffect, useRef } from 'react'
import { animate, stagger } from 'motion/react'
import { FRASCO } from '../ui/Frasco'
import { Gotas } from '../ui/Gotas'
import { Marca } from '../ui/Pecas'
import { foto } from '../../conteudo/fotos'

export type ModoAbertura = 'completa' | 'rapida' | 'nenhuma'
const CHAVE = 'eb-abertura-v2'

export function modoAbertura(reduzido: boolean): ModoAbertura {
  if (reduzido) return 'nenhuma'
  try { return sessionStorage.getItem(CHAVE) ? 'rapida' : 'completa' } catch { return 'completa' }
}

const espera = (s: number) => new Promise<void>(r => window.setTimeout(r, s * 1000))
const ONDA = 'M-240 0Q-210 -9 -180 0T-120 0T-60 0T0 0T60 0T120 0T180 0T240 0T300 0T360 0T420 0T480 0V320H-240Z'
const LIQ_VAZIO = FRASCO.fundo + 8
const LIQ_CHEIO = FRASCO.topo - 4

type Props = { modo: ModoAbertura; onSaida: () => void; onFim: () => void }

/*
  Abertura "o vidro de esmalte" (1ª visita ~4,5 s; ao voltar ~1,4 s).
  1. No escuro, um traço fino desenha o vidro de esmalte.
  2. O esmalte laca enche o vidro conforme o site carrega (é a barra de carregamento de verdade).
  3. Um reflexo de luz passa pelo vidro e a cor transborda: um círculo laca cobre a tela a partir dele.
  4. O nome da casa aparece; a cortina de esmalte sobe escorrendo e o nome voa até o topo do site.
  Só transform, opacity e clip-path se movem.
*/
export default function Abertura({ modo, onSaida, onFim }: Props) {
  const raiz = useRef<HTMLDivElement>(null)
  const palco = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const liquido = useRef<SVGGElement>(null)
  const reflexo = useRef<SVGRectElement>(null)
  const contador = useRef<HTMLSpanElement>(null)
  const cortina = useRef<HTMLDivElement>(null)
  const voo = useRef<HTMLDivElement>(null)
  const marca = useRef<HTMLDivElement>(null)
  const pular = useRef<() => void>(() => {})

  useLayoutEffect(() => {
    if (modo === 'nenhuma') { onSaida(); onFim(); return }
    try { sessionStorage.setItem(CHAVE, '1') } catch { /* navegação privada */ }
    const completa = modo === 'completa'
    let cancelado = false
    let terminou = false
    const E = [0.16, 1, 0.3, 1] as const

    const encerrar = () => {
      if (terminou) return
      terminou = true
      onSaida()
      onFim()
    }
    pular.current = () => { cancelado = true; encerrar() }

    /* Carregamento real: fontes da marca e a foto do topo. */
    const capa = new Image()
    capa.src = foto(25).src
    const tarefas: Promise<unknown>[] = [
      document.fonts?.load('500 64px "Bodoni Moda"') ?? Promise.resolve(),
      document.fonts?.load('italic 400 64px "Bodoni Moda"') ?? Promise.resolve(),
      document.fonts?.load('600 16px Manrope') ?? Promise.resolve(),
      capa.decode().catch(() => undefined),
    ]
    let feitas = 0
    let progresso = 0
    let enchendo = false
    const mostrar = (v: number) => { if (contador.current) contador.current.textContent = String(Math.round(v)).padStart(3, '0') }
    const nivel = (alvo: number, dur = .9) => {
      if (!enchendo || !liquido.current) return
      const de = progresso
      progresso = alvo
      animate(liquido.current, { y: LIQ_VAZIO - (LIQ_VAZIO - LIQ_CHEIO) * alvo }, { duration: dur, ease: [0.3, 0, 0.2, 1] })
      animate(de, alvo * 100, { duration: dur, ease: [0.3, 0, 0.2, 1], onUpdate: mostrar })
    }
    const carregado = Promise.race([
      Promise.all(tarefas.map(t => Promise.resolve(t).catch(() => undefined).then(() => { feitas++; nivel(Math.max(.18, feitas / tarefas.length) * .86) }))),
      espera(6),
    ])

    const medirVoo = () => {
      const v = voo.current, m = marca.current
      const alvo = document.querySelector<HTMLElement>('[data-alvo-marca] .marca')
      if (!v || !m || !alvo) return null
      const W = m.offsetWidth, H = m.offsetHeight
      const R = alvo.getBoundingClientRect()
      const x0 = (innerWidth - W) / 2, y0 = (innerHeight - H) / 2
      v.style.transform = `translate(${x0}px, ${y0}px)`
      return { x0, y0, x1: R.left, y1: R.top + (R.height - H * (R.width / W)) / 2, s1: R.width / W }
    }

    const roda = async () => {
      const letras = marca.current?.querySelectorAll('.marca-l') ?? []
      if (completa) {
        /* 1. O traço desenha o vidro. */
        const tracos = svg.current?.querySelectorAll('.ab-traco') ?? []
        animate(tracos, { strokeDashoffset: [1, 0], opacity: [0, 1] }, { duration: 1.25, delay: stagger(.09), ease: [0.45, 0, 0.15, 1] })
        animate(palco.current!.querySelectorAll('.ab-texto'), { opacity: [0, 1], y: [10, 0] }, { duration: .8, delay: stagger(.1, { startDelay: .45 }), ease: E })
        /* 2. O esmalte começa a encher. */
        await espera(.6)
        if (cancelado) return
        enchendo = true
        nivel(Math.max(.18, feitas / tarefas.length) * .86, 1.1)
        await Promise.all([espera(1.3), carregado])
        if (cancelado) return
        nivel(1, .55)
        await espera(.6)
        if (cancelado) return
        /* 3. O reflexo passa e a cor transborda. */
        animate(reflexo.current!, { x: [-120, 260] }, { duration: .8, ease: [0.6, 0, 0.3, 1] })
        animate(svg.current!, { rotate: [0, -4, 3, 0] }, { duration: .7, ease: 'easeInOut' })
        await espera(.45)
        if (cancelado) return
        const r = svg.current!.getBoundingClientRect()
        const cx = r.left + r.width * FRASCO.centro.x, cy = r.top + r.height * FRASCO.centro.y
        cortina.current!.style.clipPath = `circle(0px at ${cx}px ${cy}px)`
        cortina.current!.style.visibility = 'visible'
        const raioFinal = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 40
        animate(cortina.current!, { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${raioFinal}px at ${cx}px ${cy}px)`] }, { duration: 1.05, ease: [0.7, 0, 0.2, 1] })
        animate(palco.current!, { scale: [1, .86], opacity: [1, 0] }, { duration: .7, delay: .25, ease: [0.5, 0, 0.75, 0] })
        await espera(.55)
      } else {
        await Promise.race([document.fonts?.ready ?? Promise.resolve(), espera(.6)])
      }
      if (cancelado) return

      /* 4. O nome aparece sobre a laca. */
      let medida = medirVoo()
      voo.current!.style.visibility = 'visible'
      await animate(letras, { y: ['0.6em', '0em'], opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'] },
        { duration: completa ? .9 : .6, delay: stagger(completa ? .035 : .02), ease: E }).finished
      if (cancelado) return
      await espera(completa ? .35 : .12)
      if (cancelado) return

      /* 5. A cortina sobe escorrendo e o nome voa até o topo. */
      medida = medirVoo() ?? medida
      onSaida()
      raiz.current?.classList.add('is-saindo')
      const dur = completa ? 1.2 : .95
      animate(cortina.current!, { y: ['0%', '-125%'] }, { duration: dur, ease: [0.76, 0, 0.24, 1] })
      if (medida) {
        const { x0, y0, x1, y1, s1 } = medida
        animate(voo.current!, { x: [x0, x1] }, { duration: dur, ease: [0.72, 0, 0.22, 1] })
        animate(voo.current!, { y: [y0, y1] }, { duration: dur, ease: [0.5, 0, 0.18, 1] })
        animate(marca.current!, { scale: [1, s1], color: ['#fbf4ee', '#2b1220'] }, { duration: dur, ease: [0.62, 0, 0.2, 1] })
        animate(marca.current!.querySelector('.marca-e')!, { color: ['#fbf4ee', '#d21f6b'] }, { duration: dur, ease: [0.62, 0, 0.2, 1] })
      }
      await espera(dur)
      if (!cancelado) encerrar()
    }

    roda().catch(() => encerrar())
    return () => { cancelado = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (modo === 'nenhuma') return null
  const rapida = modo === 'rapida'
  return <div ref={raiz} className={`abertura ${rapida ? 'is-rapida' : ''}`}>
    {!rapida && <div className="ab-fundo" aria-hidden="true" />}
    {!rapida && <div ref={palco} className="ab-palco" aria-hidden="true">
      <svg ref={svg} className="ab-frasco" viewBox={`0 0 ${FRASCO.w} ${FRASCO.h}`} overflow="visible">
        <defs>
          <clipPath id="ab-corpo"><path d={FRASCO.corpo} /></clipPath>
          <linearGradient id="ab-luz" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        </defs>
        <g clipPath="url(#ab-corpo)">
          <g ref={liquido} style={{ transform: `translateY(${LIQ_VAZIO}px)` }}>
            <path className="ab-onda anima" d={ONDA} />
          </g>
          <text x="120" y="338" textAnchor="middle" className="ab-monograma">E&amp;B</text>
          <g transform="skewX(-14)"><rect ref={reflexo} x="0" y="180" width="44" height="270" fill="url(#ab-luz)" style={{ transform: 'translateX(-120px)' }} /></g>
        </g>
        {[FRASCO.corpo, FRASCO.gargalo, FRASCO.tampa, FRASCO.haste, 'M81 150H159M81 158H159'].map((d, i) =>
          <path key={i} className="ab-traco" d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} opacity={0} />)}
      </svg>
      <p className="ab-texto ab-contador"><span ref={contador}>000</span><small>%</small></p>
      <p className="ab-texto ab-legenda">preparando a sua cor</p>
    </div>}

    <div ref={cortina} className="ab-cortina" aria-hidden="true" style={rapida ? undefined : { visibility: 'hidden' }}>
      <Gotas className="ab-gotas" semente={3} />
    </div>

    <div ref={voo} className="ab-voo" aria-hidden="true" style={{ visibility: 'hidden' }}>
      <div ref={marca} className="ab-marca"><Marca letras /></div>
    </div>

    <button className="ab-pular" type="button" onClick={() => pular.current()}>Pular abertura</button>
  </div>
}
