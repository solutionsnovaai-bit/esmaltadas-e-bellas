import { useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { agendar as t } from '../../conteudo/textos'
import { linkConversa, site, temWhatsApp } from '../../conteudo/site'
import { ease } from '../../lib/ease'
import { Titulo, Revelar } from '../ui/Revelar'
import { Brilho } from '../ui/Pecas'
import BrandIcon from '../ui/BrandIcon'

const juntar = (l: string[]) => l.length <= 1 ? l.join('') : `${l.slice(0, -1).join(', ')} e ${l[l.length - 1]}`

/** Monte seu pedido: escolhas viram uma mensagem pronta, mostrada como um balão de conversa. */
export function Agendar() {
  const [nome, setNome] = useState('')
  const [servicos, setServicos] = useState<string[]>([])
  const [cor, setCor] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState<string | null>(null)
  const [dia, setDia] = useState('')
  const [obs, setObs] = useState('')
  const [erro, setErro] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const grupoServicos = useRef<HTMLFieldSetElement>(null)

  const mensagem = useMemo(() => {
    if (!servicos.length) return ''
    const linhas = [
      nome.trim() ? `Oi! Aqui é ${nome.trim()} 💅` : 'Oi! 💅',
      `Vim pelo site e queria agendar: ${juntar(servicos).toLowerCase()}.`,
      cor ? `Cor do momento: ${cor.toLowerCase()}.` : '',
      periodo || dia.trim() ? `Melhor horário: ${[periodo?.toLowerCase(), dia.trim()].filter(Boolean).join(', ')}.` : '',
      obs.trim(),
      'Tem horário?',
    ]
    return linhas.filter(Boolean).join('\n')
  }, [nome, servicos, cor, periodo, dia, obs])

  const alternar = (s: string) => { setErro(false); setServicos(l => l.includes(s) ? l.filter(x => x !== s) : [...l, s]) }

  const enviar = async (e: FormEvent) => {
    e.preventDefault()
    if (!mensagem) { setErro(true); grupoServicos.current?.querySelector('input')?.focus(); return }
    if (temWhatsApp) { window.open(linkConversa(mensagem), '_blank', 'noopener'); return }
    try { await navigator.clipboard.writeText(mensagem); setCopiado(true); window.setTimeout(() => setCopiado(false), 4200) } catch { /* sem área de transferência */ }
    window.open(site.instagram, '_blank', 'noopener')
  }

  return <section id="agendar" className="secao agendar" aria-labelledby="agendar-titulo">
    <div className="agendar-luz" aria-hidden="true" />
    <div className="conteiner agendar-grade">
      <div className="agendar-intro">
        <Revelar><p className="selo-texto">{t.selo}</p></Revelar>
        <Titulo id="agendar-titulo" linhas={[t.titulo]} destaque={t.destaque} />
        <Revelar delay={.1}><p className="lead">{t.texto}</p></Revelar>

        <Revelar delay={.2} className="balao-area">
          <p className="balao-rotulo">{t.previa}</p>
          <motion.div layout className="balao" transition={{ duration: .5, ease: ease.expo }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.pre key={mensagem ? 'm' : 'v'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className={mensagem ? '' : 'is-vazio'}>{mensagem || t.previaVazia}</motion.pre>
            </AnimatePresence>
            <span className="balao-hora" aria-hidden="true">agora <Check /><Check /></span>
          </motion.div>
        </Revelar>
      </div>

      <Revelar delay={.1} className="agendar-cartao">
        <form onSubmit={enviar} noValidate aria-describedby="agendar-nota">
          <div className="campo">
            <label htmlFor="ag-nome">{t.campos.nome}</label>
            <input id="ag-nome" value={nome} onChange={e => setNome(e.target.value)} placeholder={t.campos.nomeDica} autoComplete="given-name" maxLength={40} />
          </div>

          <fieldset ref={grupoServicos} className="campo" aria-invalid={erro || undefined} aria-describedby={erro ? 'ag-erro' : undefined}>
            <legend>{t.campos.servicos} <small>obrigatório</small></legend>
            <div className="fichas">
              {t.servicos.map(s => <label key={s} className={`ficha ${servicos.includes(s) ? 'is-marcada' : ''}`}>
                <input type="checkbox" checked={servicos.includes(s)} onChange={() => alternar(s)} />
                <span><Check aria-hidden="true" />{s}</span>
              </label>)}
            </div>
            {erro && <p className="campo-erro" id="ag-erro" role="alert">Escolha pelo menos um cuidado.</p>}
          </fieldset>

          <fieldset className="campo">
            <legend>{t.campos.cor}</legend>
            <div className="amostras">
              {t.cores.map(c => <label key={c.nome} className={`amostra ${cor === c.nome ? 'is-marcada' : ''}`}>
                <input type="radio" name="cor" checked={cor === c.nome} onChange={() => setCor(c.nome)} onClick={() => { if (cor === c.nome) setCor(null) }} />
                <span className="amostra-gota" style={{ background: c.hex }} aria-hidden="true" />
                <span className="amostra-nome">{c.nome}</span>
              </label>)}
            </div>
          </fieldset>

          <div className="campo-dupla">
            <fieldset className="campo">
              <legend>{t.campos.periodo}</legend>
              <div className="fichas">
                {t.periodos.map(p => <label key={p} className={`ficha ${periodo === p ? 'is-marcada' : ''}`}>
                  <input type="radio" name="periodo" checked={periodo === p} onChange={() => setPeriodo(p)} onClick={() => { if (periodo === p) setPeriodo(null) }} />
                  <span>{p}</span>
                </label>)}
              </div>
            </fieldset>
            <div className="campo">
              <label htmlFor="ag-dia">{t.campos.dia}</label>
              <input id="ag-dia" value={dia} onChange={e => setDia(e.target.value)} placeholder={t.campos.diaDica} maxLength={40} />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="ag-obs">{t.campos.obs}</label>
            <textarea id="ag-obs" value={obs} onChange={e => setObs(e.target.value)} placeholder={t.campos.obsDica} rows={2} maxLength={300} data-lenis-prevent />
          </div>

          <button type="submit" className="botao laca agendar-enviar">
            <BrandIcon brand={temWhatsApp ? 'whatsapp' : 'instagram'} />
            <span>{temWhatsApp ? t.enviarWhats : t.enviarInsta}</span>
            <span className="botao-icone" aria-hidden="true">{temWhatsApp ? <Brilho /> : <Copy />}</span>
          </button>
          <p className="agendar-nota" id="agendar-nota" aria-live="polite">{copiado ? t.copiado : t.nota}</p>
        </form>
      </Revelar>
    </div>
  </section>
}
