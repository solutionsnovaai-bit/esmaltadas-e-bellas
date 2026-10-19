export default function BrandLogo({ light = false }: { light?: boolean }) {
  return <a href="#inicio" className={`brand-logo${light ? ' brand-logo-light' : ''}`} aria-label="Esmaltadas e Bellas — início">
    <span>Esmaltadas <i>&</i> Bellas<span className="brand-dot">.</span></span>
    <small>UNHAS, CORES & CUIDADO</small>
  </a>
}
