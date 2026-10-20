import { useMemo, useState, type PointerEvent } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'
import { galeria } from '../../conteudo/textos'
import { categorias, trabalhos, type Filtro, type Foto } from '../../conteudo/fotos'
import { ease } from '../../lib/ease'
import { Titulo, Revelar } from '../ui/Revelar'
import { Brilho } from '../ui/Pecas'

const INICIAIS = 8

function inclinar(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget, r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
  el.style.setProperty('--rx', `${((.5 - py) * 9).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${((px - .5) * 11).toFixed(2)}deg`)
  el.style.setProperty('--bx', `${(px * 100).toFixed(1)}%`)
  el.style.setProperty('--by', `${(py * 100).toFixed(1)}%`)
}
const soltar = (e: PointerEvent<HTMLElement>) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') }

/** Portfólio com filtros (o marcador desliza) e cartões que inclinam com reflexo. Toque abre a foto grande. */
export function Galeria({ abrir }: { abrir: (fotos: Foto[], i: number) => void }) {
  const [filtro, setFiltro] = useState<Filtro>('Todas')
  const [todas, setTodas] = useState(false)
  const filtradas = useMemo(() => filtro === 'Todas' ? trabalhos : trabalhos.filter(f => f.categoria === filtro), [filtro])
  const visiveis = todas || filtro !== 'Todas' ? filtradas : filtradas.slice(0, INICIAIS)

  return <section id="inspiracoes" className="secao galeria" aria-labelledby="galeria-titulo">
    <div className="conteiner">
      <div className="galeria-cabeca">
        <div>
          <Revelar><p className="selo-texto">{galeria.selo}</p></Revelar>
          <Titulo id="galeria-titulo" linhas={[galeria.titulo]} destaque={galeria.destaque} />
        </div>
        <Revelar delay={.1} className="galeria-lado">
          <p className="lead">{galeria.texto}</p>
          <p className="galeria-contagem"><Brilho /> {trabalhos.length} inspirações reais do salão</p>
        </Revelar>
      </div>

      <LayoutGroup>
        <div className="filtros" role="group" aria-label="Filtrar inspirações">
          {categorias.map(c => <button key={c} type="button" aria-pressed={filtro === c} className={filtro === c ? 'is-ativo' : ''}
            onClick={() => { setFiltro(c); setTodas(false) }}>
            {filtro === c && <motion.span layoutId="filtro-marcador" className="filtro-marcador" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="filtro-rotulo">{c}</span>
          </button>)}
        </div>

        <motion.ul layout className="galeria-grade">
          <AnimatePresence mode="popLayout">
            {visiveis.map((f, i) => <motion.li key={f.id} layout
              initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .9 }}
              transition={{ duration: .7, delay: Math.min(i, 8) * .04, ease: ease.expo }}>
              <button type="button" className="cartao" data-cursor="ver" onPointerMove={inclinar} onPointerLeave={soltar}
                onClick={() => abrir(filtradas, filtradas.indexOf(f))} aria-label={`Ampliar: ${f.titulo}`}>
                <span className="cartao-foto"><img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" /></span>
                <span className="cartao-legenda"><small>{f.categoria}</small><strong>{f.titulo}</strong><ArrowUpRight aria-hidden="true" /></span>
              </button>
            </motion.li>)}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      {filtro === 'Todas' && filtradas.length > INICIAIS && <div className="galeria-mais">
        <button type="button" className="botao contorno" onClick={() => setTodas(t => !t)} aria-expanded={todas}>
          <span>{todas ? galeria.menos : `${galeria.mais} (${filtradas.length})`}</span>
          <span className="botao-icone" aria-hidden="true">{todas ? <Minus /> : <Plus />}</span>
        </button>
      </div>}
    </div>
  </section>
}
