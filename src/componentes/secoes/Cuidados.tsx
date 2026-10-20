import { useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { cuidados } from '../../conteudo/textos'
import { foto } from '../../conteudo/fotos'
import { linkConversa, mensagens } from '../../conteudo/site'
import { usePonteiroFino } from '../../hooks/useMidia'
import { ease } from '../../lib/ease'
import { Titulo, Revelar } from '../ui/Revelar'

/** Lista grande de cuidados: no desktop, a foto do cuidado segue o mouse; clique abre os detalhes. */
export function Cuidados() {
  const fino = usePonteiroFino()
  const lista = useRef<HTMLDivElement>(null)
  const [aberto, setAberto] = useState<number | null>(0)
  const [sobre, setSobre] = useState<number | null>(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: .5 })
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: .5 })
  const giro = useTransform(useSpring(useVelocity(mx), { stiffness: 120, damping: 20 }), [-2000, 2000], [-14, 14])

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (!fino || !lista.current) return
    const r = lista.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return <section id="cuidados" className="secao cuidados" aria-labelledby="cuidados-titulo">
    <div className="conteiner">
      <div className="cuidados-cabeca">
        <div>
          <Revelar><p className="selo-texto">{cuidados.selo}</p></Revelar>
          <Titulo id="cuidados-titulo" linhas={[cuidados.titulo]} destaque={cuidados.destaque} />
        </div>
        <Revelar delay={.1}><p className="lead">{cuidados.texto}</p></Revelar>
      </div>

      <div ref={lista} className="cuidados-lista" onPointerMove={mover} onPointerLeave={() => setSobre(null)}>
        {cuidados.itens.map((item, i) => {
          const f = foto(item.foto)
          const estaAberto = aberto === i
          return <Revelar key={item.numero} delay={i * .06} className={`cuidado ${estaAberto ? 'is-aberto' : ''}`}>
            <h3>
              <button type="button" className="cuidado-linha" aria-expanded={estaAberto} aria-controls={`cuidado-${i}`}
                onClick={() => setAberto(estaAberto ? null : i)} onPointerEnter={() => setSobre(i)}>
                <span className="cuidado-numero">{item.numero}</span>
                <span className="cuidado-mini unha" aria-hidden="true"><img src={f.src} alt="" width={f.w} height={f.h} loading="lazy" decoding="async" /></span>
                <span className="cuidado-titulo">{item.titulo}</span>
                <span className="cuidado-tags" aria-hidden="true">{item.tags.join(' · ')}</span>
                <span className="cuidado-mais" aria-hidden="true"><Plus /></span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {estaAberto && <motion.div id={`cuidado-${i}`} className="cuidado-corpo" role="region"
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: .7, ease: ease.expo }}>
                <div className="cuidado-corpo-dentro">
                  <p>{item.texto}</p>
                  <a className="link-seta" href={linkConversa(mensagens.servico(item.titulo))} target="_blank" rel="noopener noreferrer">
                    {cuidados.agendar}<ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </motion.div>}
            </AnimatePresence>
          </Revelar>
        })}

        {fino && <motion.div className="cuidados-seguidor" aria-hidden="true" style={{ x, y, rotate: giro }}>
          <AnimatePresence>
            {sobre !== null && <motion.div key={sobre} className="unha cuidados-seguidor-foto"
              initial={{ opacity: 0, scale: .6, clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0, scale: .8 }} transition={{ duration: .6, ease: ease.expo }}>
              <img src={foto(cuidados.itens[sobre].foto).src} alt="" />
            </motion.div>}
          </AnimatePresence>
        </motion.div>}
      </div>
    </div>
  </section>
}
