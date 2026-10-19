import { Pause, Play } from 'lucide-react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export default function MotionControls() {
  const { paused, toggle, reduced } = useMotionPreferences()
  const systemReduced = reduced && !paused
  return <button className="motion-control" onClick={toggle} aria-pressed={paused} aria-label={systemReduced ? 'Movimento reduzido conforme a preferência do dispositivo' : paused ? 'Retomar animações' : 'Pausar animações'} title={reduced ? 'Movimento reduzido' : 'Pausar animações'}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{systemReduced ? 'MOTION REDUZIDO' : paused ? 'RETOMAR MOTION' : 'PAUSAR MOTION'}</span></button>
}
