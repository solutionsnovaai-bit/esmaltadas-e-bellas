/*
  Contatos da Esmaltadas & Bellas.

  WhatsApp: país + DDD + número, só dígitos. Para trocar, edite NUMERO_WHATSAPP
  (ou defina VITE_WHATSAPP_NUMBER na Vercel). Se ficar vazio, os botões levam ao Instagram.
*/
const NUMERO_WHATSAPP = '5511952376492'

const numero = (NUMERO_WHATSAPP || import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')

export const site = {
  nome: 'Esmaltadas & Bellas',
  instagram: 'https://www.instagram.com/esmaltadasebellas/',
  arroba: '@esmaltadasebellas',
  whatsapp: numero,
} as const

export const temWhatsApp = /^\d{10,15}$/.test(site.whatsapp)

export const mensagens = {
  geral: 'Oi! Vim pelo site e queria agendar um horário na Esmaltadas & Bellas 💅',
  servico: (servico: string) => `Oi! Vim pelo site e queria agendar: ${servico}. Quais horários vocês têm?`,
  inspiracao: (titulo: string) => `Oi! Vi a inspiração "${titulo}" no site e queria fazer igual. Tem horário?`,
  cor: (cor: string) => `Oi! Hoje eu quero me sentir ${cor} 💅 Queria agendar um horário.`,
} as const

/** Link de conversa: WhatsApp quando o número existe; senão, o Instagram. */
export function linkConversa(texto: string = mensagens.geral) {
  return temWhatsApp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}` : site.instagram
}

/** Número para exibir: (11) 95237-6492. */
export const telefoneVisivel = temWhatsApp
  ? site.whatsapp.replace(/^55/, '').replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
  : ''

export const canalConversa = temWhatsApp ? 'WhatsApp' : 'Instagram'
