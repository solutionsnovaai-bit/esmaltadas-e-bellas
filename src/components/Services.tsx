import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { services } from '../content'
import { imageById, imageSrcSet } from '../assets'
import Reveal from './Reveal'

export default function Services() {
  const [selected, setSelected] = useState(0)
  const image = imageById(services[selected].image)
  return <section className="services section-pad" id="servicos" aria-labelledby="services-title">
    <Reveal className="section-heading"><div><span className="eyebrow">FEITO PARA O SEU MOMENTO</span><h2 id="services-title">Cuidado que<br /><em>vai além da cor.</em></h2></div><p>Você traz a inspiração.<br />A gente cuida dos detalhes.</p></Reveal>
    <div className="services-layout"><Reveal className="services-image"><AnimatePresence mode="wait"><motion.img key={image.id} src={image.src} srcSet={imageSrcSet(image)} sizes="(max-width: 760px) 88vw, 36vw" alt={image.alt} width={image.width} height={image.height} loading="lazy" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} /></AnimatePresence><span className="service-image-label">UM CUIDADO, MUITAS POSSIBILIDADES.</span></Reveal>
      <div className="services-list">{services.map((service, index) => <Reveal key={service.number} delay={index * .06}><article className={`service-item${index === selected ? ' is-open' : ''}`}><h3><button onClick={() => setSelected(index)} aria-expanded={selected === index} aria-controls={`service-panel-${index}`} id={`service-toggle-${index}`}><span className="service-number">{service.number}</span>{service.title}{selected === index ? <Minus size={22} /> : <Plus size={22} />}</button></h3><div id={`service-panel-${index}`} role="region" aria-labelledby={`service-toggle-${index}`} hidden={index !== selected}><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p>{service.detail}</p><span className="service-tags">{service.tags}</span><a className="text-link" href="#contato">Converse com a equipe <ArrowUpRight size={16} /></a></motion.div></div></article></Reveal>)}</div>
    </div>
  </section>
}
