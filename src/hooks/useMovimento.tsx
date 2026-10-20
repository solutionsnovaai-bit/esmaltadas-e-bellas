import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'

const CHAVE = 'eb-movimento-reduzido'
const Contexto = createContext({ reduzido: false, escolhaUsuario: false, alternar: () => {} })

/** Junta a preferência do sistema com o botão "Reduzir animações" do rodapé. */
export function MovimentoProvider({ children }: { children: ReactNode }) {
  const sistema = Boolean(useReducedMotion())
  const [escolhaUsuario, setEscolhaUsuario] = useState(() => {
    try { return localStorage.getItem(CHAVE) === '1' } catch { return false }
  })
  const reduzido = sistema || escolhaUsuario

  useEffect(() => {
    document.documentElement.dataset.movimento = reduzido ? 'reduzido' : 'pleno'
  }, [reduzido])

  const alternar = () => setEscolhaUsuario(atual => {
    const novo = !atual
    try { localStorage.setItem(CHAVE, novo ? '1' : '0') } catch { /* navegação privada */ }
    return novo
  })

  return <Contexto.Provider value={{ reduzido, escolhaUsuario, alternar }}>
    <MotionConfig reducedMotion={reduzido ? 'always' : 'never'}>{children}</MotionConfig>
  </Contexto.Provider>
}

export const useMovimento = () => useContext(Contexto)
