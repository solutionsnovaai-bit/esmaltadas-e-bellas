import { ArrowUpRight } from 'lucide-react'
import { imageById, imageSrcSet } from '../assets'
import { salon } from '../content'
import BrandIcon from './BrandIcon'
import Reveal from './Reveal'
import MagneticButton from './MagneticButton'

export default function Instagram() {
  const photos = [4, 26, 19].map(imageById)
  return <section className="instagram-section section-pad" aria-labelledby="instagram-title"><Reveal className="instagram-heading"><span className="instagram-glyph"><BrandIcon brand="instagram" /></span><span className="eyebrow">A INSPIRAÇÃO CONTINUA POR LÁ</span><h2 id="instagram-title">Mais cores no feed.<br /><em>Mais Bellas no seu dia.</em></h2><MagneticButton href={salon.instagram} external className="button-outline">{salon.handle}<ArrowUpRight size={18} /></MagneticButton></Reveal>
    <div className="instagram-collage">{photos.map((photo, index) => <Reveal className={`instagram-shot instagram-shot-${index + 1}`} key={photo.id} delay={index * .1}><a href={salon.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Ver o Instagram da Esmaltadas e Bellas — ${photo.title}`}><img src={photo.small} srcSet={imageSrcSet(photo)} sizes="(max-width: 600px) 44vw, 28vw" alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /><span><BrandIcon brand="instagram" /><ArrowUpRight size={20} /></span></a></Reveal>)}</div>
  </section>
}
