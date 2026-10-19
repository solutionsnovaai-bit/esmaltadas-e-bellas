import { lazy, Suspense, useCallback, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import type { SalonImage } from './assets'
import BrandIntro from './components/BrandIntro'
import Header from './components/Header'
import Hero from './components/Hero'
import AutoGallery from './components/AutoGallery'
import MotionScenes from './components/MotionScenes'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import Instagram from './components/Instagram'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import MotionControls from './components/MotionControls'

const Lightbox = lazy(() => import('./components/Lightbox'))

function Experience() {
  const [intro, setIntro] = useState(true)
  const [selection, setSelection] = useState<{ images: SalonImage[]; index: number } | null>(null)
  const { reduced } = useMotionPreferences()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 35 })
  const finishIntro = useCallback(() => setIntro(false), [])
  const closeLightbox = useCallback(() => setSelection(null), [])
  const openPhoto = useCallback((images: SalonImage[], index: number) => setSelection({ images, index }), [])
  useSmoothScroll(!intro && !selection)

  return <>
    <AnimatePresence>{intro && <BrandIntro onComplete={finishIntro} />}</AnimatePresence>
    <div inert={intro ? true : undefined}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true" />
      <Header />
      <main id="conteudo">
        <Hero ready={!intro} />
        <AutoGallery onOpen={openPhoto} />
        <About />
        <MotionScenes />
        <Services />
        <Gallery onOpen={openPhoto} />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <MotionControls />
      <FloatingContact />
    </div>
    <Suspense fallback={null}>
      {selection && <Lightbox images={selection.images} initialIndex={selection.index} onClose={closeLightbox} />}
    </Suspense>
  </>
}

export default function App() {
  return <MotionPreferencesProvider><Experience /></MotionPreferencesProvider>
}
