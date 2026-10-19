export const salon = {
  name: 'Esmaltadas & Bellas',
  instagram: 'https://www.instagram.com/esmaltadasebellas/',
  handle: '@esmaltadasebellas',
  // Empty until the owner supplies the actual international-format number.
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
}
export const whatsappAvailable = /^\d{10,15}$/.test(salon.whatsappNumber)
export const whatsappUrl = (message = 'Olá! Gostaria de saber mais sobre os serviços da Esmaltadas & Bellas.') =>
  whatsappAvailable ? `https://wa.me/${salon.whatsappNumber}?text=${encodeURIComponent(message)}` : salon.instagram
export const navigation = [
  { href: '#sobre', label: 'Nossa essência' },
  { href: '#servicos', label: 'Cuidados' },
  { href: '#galeria', label: 'Inspirações' },
]
export const services = [
  { number: '01', title: 'Manicure & pedicure', detail: 'Da escolha da cor ao acabamento: um momento só seu, para cuidar das mãos e dos pés com carinho.', tags: 'CUIDADO · COR · ACABAMENTO', image: 22 },
  { number: '02', title: 'Nail art & decoração', detail: 'Francesinhas coloridas, brilho, desenhos e combinações que traduzem o seu estilo. Escolha uma inspiração e converse com a equipe.', tags: 'CRIATIVIDADE · BRILHO · PERSONALIDADE', image: 6 },
  { number: '03', title: 'Alongamento em fibra', detail: 'Comprimento e formato para valorizar as suas mãos. Fale com a equipe sobre a técnica, a manutenção e o resultado que você procura.', tags: 'FORMATO · DELICADEZA · EXPRESSÃO', image: 24 },
  { number: '04', title: 'Unhas naturais & blindagem', detail: 'Para quem ama a beleza das unhas naturais. Conheça as possibilidades de cuidado e blindagem com a nossa equipe.', tags: 'NATURALIDADE · ATENÇÃO · LEVEZA', image: 21 },
]
export const colorMoods = [
  { name: 'Um toque de delicadeza', note: 'Nude, rosa e o encanto do essencial.', hex: '#b97085', background: '#f3e4e5', image: 13, word: 'delicada.' },
  { name: 'Clássica, nunca óbvia', note: 'O vermelho que dispensa explicações.', hex: '#a52e40', background: '#eed8d7', image: 8, word: 'intensa.' },
  { name: 'Livre para brilhar', note: 'Azul, brilho e a sua personalidade.', hex: '#384796', background: '#e4e4f1', image: 2, word: 'autêntica.' },
  { name: 'Cor para sair do comum', note: 'A energia dos tons que acendem o dia.', hex: '#8a6500', background: '#f2eecf', image: 18, word: 'radiante.' },
]
