import { useEffect, useState } from 'react'

export function useMidia(query: string) {
  const [bate, setBate] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const atualiza = () => setBate(m.matches)
    atualiza()
    m.addEventListener('change', atualiza)
    return () => m.removeEventListener('change', atualiza)
  }, [query])
  return bate
}

/** Mouse de verdade (não toque). */
export const usePonteiroFino = () => useMidia('(hover: hover) and (pointer: fine)')
