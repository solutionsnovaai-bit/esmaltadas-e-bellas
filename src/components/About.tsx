import { imageById, imageSrcSet } from '../assets'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'

export default function About() {
  const photo = imageById(23), detail = imageById(9)
  return <section className="about section-pad" id="sobre" aria-labelledby="about-title">
    <div className="about-photos"><Reveal className="about-main-photo"><img src={photo.src} srcSet={imageSrcSet(photo)} sizes="(max-width: 760px) 80vw, 37vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><span className="photo-handwritten">cuidado de verdade.</span></Reveal>
      <Reveal className="about-detail-photo" delay={.2}><img src={detail.small} alt={detail.alt} width={detail.width} height={detail.height} loading="lazy" /></Reveal><span className="about-star" aria-hidden="true">✳</span>
    </div>
    <Reveal className="about-copy"><span className="eyebrow">NOSSA ESSÊNCIA</span><h2 id="about-title">Mais que unhas.<br />Um tempo para<br /><em>cuidar de você.</em></h2><p>A Esmaltadas & Bellas é feita de pessoas, de cores e daquele carinho que transforma um cuidado simples em um momento especial.</p><p>Aqui, a inspiração encontra mãos dedicadas. Da escolha do esmalte ao último detalhe, queremos que você se reconheça no resultado.</p><a href="#contato" className="text-link">Venha viver esse momento <ArrowUpRight size={18} /></a><div className="about-signature"><span>Esmaltadas & Bellas</span><small>COM CARINHO, PARA VOCÊ.</small></div></Reveal>
  </section>
}
