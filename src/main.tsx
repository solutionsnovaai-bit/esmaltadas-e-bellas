import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilos/index.css'
import App from './App'

/* Voltar para a página pelo histórico também conta como carga: recarrega para a abertura rodar inteira. */
window.addEventListener('pageshow', e => { if (e.persisted) location.reload() })

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
