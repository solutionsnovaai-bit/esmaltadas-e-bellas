import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'

const CHAVE = 'eb-movimento-reduzido-v2'
const Contexto = createContext({ reduzido: false, escolhaUsuario: false, alternar: () => {} })

/*
  O site roda com todos os efeitos em qualquer aparelho, inclusive no PC com as
  "animações do sistema" desligadas (Windows costuma vir assim e isso apagava a cena do esmalte).
  Quem prefere menos movimento usa o botão "Reduzir animações" do rodapé; a escolha fica salva no navegador.
*/
export function MovimentoProvider({ children }: { children: ReactNode }) {
  const [escolhaUsuario, setEscolhaUsuario] = useState(() => {
    try { return localStorage.getItem(CHAVE) === '1' } catch { return false }
  })
  const reduzido = escolhaUsuario

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
