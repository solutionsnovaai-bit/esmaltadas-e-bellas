/* Borda de esmalte escorrendo: gotas penduradas com a cor do bloco (currentColor). */
const W = 1440
const H = 150

function gerar(semente: number) {
  const rnd = (i: number) => { const a = Math.sin(i * 12.9898 + semente * 78.233) * 43758.5453; return a - Math.floor(a) }
  let d = `M0 -2H${W}V16`
  const gotas: string[] = []
  let x = 18
  let i = 1
  while (x < W - 10) {
    const w = 14 + rnd(i) * 26
    const len = 24 + Math.pow(rnd(i + 7), 1.6) * (H - 40)
    const r = w * .46
    const cx = x + w
    gotas.push(`M${(cx - w).toFixed(1)} 15C${(cx - w * .5).toFixed(1)} 15 ${(cx - r).toFixed(1)} ${(len * .35 + 15).toFixed(1)} ${(cx - r).toFixed(1)} ${(len - r + 15).toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 0 0 ${(cx + r).toFixed(1)} ${(len - r + 15).toFixed(1)}C${(cx + r).toFixed(1)} ${(len * .35 + 15).toFixed(1)} ${(cx + w * .5).toFixed(1)} 15 ${(cx + w).toFixed(1)} 15Z`)
    x += w * 2 + 10 + rnd(i + 3) * 70
    i++
  }
  d += `H0Z`
  return d + gotas.join('')
}

const CACHE = new Map<number, string>()

export function Gotas({ className = '', semente = 1 }: { className?: string; semente?: number }) {
  if (!CACHE.has(semente)) CACHE.set(semente, gerar(semente))
  return <svg className={`gotas ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
    <path d={CACHE.get(semente)} fill="currentColor" />
  </svg>
}
