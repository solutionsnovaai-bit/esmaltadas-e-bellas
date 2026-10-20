/*
  Contatos da Esmaltadas & Bellas.

  WhatsApp: escreva o número aqui (país + DDD + número, só dígitos — ex.: 5511999999999)
  ou defina VITE_WHATSAPP_NUMBER na Vercel. Enquanto estiver vazio, todos os botões
  levam ao Instagram e a mensagem montada no agendamento é copiada para colar no Direct.
*/
const NUMERO_WHATSAPP = ''

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

export const canalConversa = temWhatsApp ? 'WhatsApp' : 'Instagram'
