import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { salon, services, whatsappAvailable, whatsappUrl } from '../content'
import BrandIcon from './BrandIcon'
import Reveal from './Reveal'

export default function Contact() {
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const message = `Olá, Esmaltadas & Bellas!${name.trim() ? ` Meu nome é ${name.trim()}.` : ''} Gostaria de saber mais sobre ${service || 'os serviços'} e consultar os horários disponíveis.`
  const copyMessage = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); setCopyFailed(false) }
    catch { setCopyFailed(true); setCopied(false) }
  }
  return <section className="contact section-pad" id="contato" aria-labelledby="contact-title"><Reveal className="contact-copy"><span className="eyebrow">SEU PRÓXIMO MOMENTO COMEÇA AQUI</span><h2 id="contact-title">Que tal reservar<br />um tempo<br /><em>só para você?</em></h2><p>Escolha a sua inspiração e venha conversar com a gente. A equipe te ajuda com os serviços, os detalhes e os horários disponíveis.</p><a className="contact-instagram text-link" href={salon.instagram} target="_blank" rel="noopener noreferrer"><BrandIcon brand="instagram" />{salon.handle}<ArrowUpRight size={18} /></a><span className="contact-spark" aria-hidden="true">✳</span></Reveal>
    <Reveal className="contact-card" delay={.15}><span className="eyebrow">VAMOS CONVERSAR?</span><h3>Seu momento,<br /><em>do seu jeito.</em></h3><p>Deixe a sua mensagem pronta e fale com a equipe {whatsappAvailable ? 'pelo WhatsApp' : 'pelo Instagram'}.</p>
      <div className="contact-fields"><label htmlFor="contact-name">Como podemos te chamar? <small>(opcional)</small></label><input id="contact-name" type="text" autoComplete="given-name" placeholder="Seu nome" maxLength={60} value={name} onChange={event => { setName(event.target.value); setCopied(false) }} /><label htmlFor="contact-service">O que você tem em mente?</label><select id="contact-service" value={service} onChange={event => { setService(event.target.value); setCopied(false) }}><option value="">Quero conhecer as possibilidades</option>{services.map(item => <option key={item.number} value={item.title}>{item.title}</option>)}</select></div>
      {!whatsappAvailable && <><div className="message-preview"><p>{message}</p><button className="copy-button" onClick={copyMessage}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Mensagem copiada' : 'Copiar mensagem'}</button></div><span className="sr-only" role="status">{copied ? 'Mensagem copiada. Agora abra o Instagram e cole na conversa.' : copyFailed ? 'Não foi possível copiar. Selecione o texto da mensagem e copie manualmente.' : ''}</span>{copyFailed && <p className="copy-feedback">Selecione e copie o texto acima para enviar.</p>}</>}
      <a href={whatsappAvailable ? whatsappUrl(message) : salon.instagram} target="_blank" rel="noopener noreferrer" className="button button-dark contact-submit"><BrandIcon brand={whatsappAvailable ? 'whatsapp' : 'instagram'} />{whatsappAvailable ? 'Conversar no WhatsApp' : 'Abrir conversa no Instagram'}<ArrowUpRight size={18} /></a><p className="contact-note">{whatsappAvailable ? 'A mensagem abre no WhatsApp para você enviar.' : 'Copie a mensagem e envie pelo Direct do Instagram.'} O agendamento é confirmado diretamente com a equipe. Seus dados não são enviados por este site.</p>
    </Reveal></section>
}
