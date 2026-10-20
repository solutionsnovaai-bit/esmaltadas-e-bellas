import { Fragment } from 'react'
import { faixa } from '../../conteudo/textos'
import { Faixa } from '../ui/Faixa'
import { Brilho } from '../ui/Pecas'

/** Duas faixas cruzadas (laca e noite) que correm em sentidos opostos e reagem à rolagem. */
export function Faixas() {
  const itens = (lista: readonly string[], italico: boolean) => lista.map(t => <Fragment key={t}>
    <span className={italico ? 'faixa-texto is-italico' : 'faixa-texto'}>{t}</span><Brilho className="faixa-brilho" />
  </Fragment>)
  return <section className="faixas" aria-label={faixa.laca.join(', ')}>
    <Faixa className="faixa-noite" velocidade={2.2}>{itens(faixa.noite, false)}</Faixa>
    <Faixa className="faixa-laca" velocidade={-3}>{itens(faixa.laca, true)}</Faixa>
  </section>
}
