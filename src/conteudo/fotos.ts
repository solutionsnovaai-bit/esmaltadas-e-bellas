export type Categoria = 'Nail art' | 'Francesinhas' | 'Clássicos' | 'Naturais' | 'Bastidores' | 'Equipe' | 'Instagram'

export interface Foto { id: number; titulo: string; categoria: Categoria; alt: string; src: string; w: number; h: number }

/** Fotos enviadas pelo salão (uma resolução, ~900 × 1200, WebP). */
export const fotos: Foto[] = [
  { id: 1, titulo: "Azul em degradê", categoria: "Nail art", alt: "Unhas com esmaltação azul em degradê sobre cristal facetado", src: '/fotos/01-azul-degrade.webp', w: 896, h: 1200 },
  { id: 2, titulo: "Azul & brilho", categoria: "Nail art", alt: "Unhas azuis com detalhe em degradê e glitter", src: '/fotos/02-azul-com-glitter.webp', w: 900, h: 1200 },
  { id: 3, titulo: "Francesinha solar", categoria: "Francesinhas", alt: "Francesinha com pontas amarelo-neon sobre base rosada", src: '/fotos/03-francesinha-amarelo-neon.webp', w: 900, h: 1200 },
  { id: 4, titulo: "Um arco-íris de cores", categoria: "Nail art", alt: "Unhas coloridas em tons neon com frascos de esmalte", src: '/fotos/04-unhas-coloridas-neon.webp', w: 899, h: 1200 },
  { id: 5, titulo: "Clássico com um toque de cor", categoria: "Francesinhas", alt: "Francesinha branca com unhas de destaque vermelhas e glitter", src: '/fotos/05-francesinha-branca-detalhes-vermelhos.webp', w: 902, h: 1200 },
  { id: 6, titulo: "Preto, branco & arte", categoria: "Nail art", alt: "Esmaltação preta e branca com decoração de folhagem", src: '/fotos/06-preto-branco-folhagem.webp', w: 903, h: 1200 },
  { id: 7, titulo: "Preto nada básico", categoria: "Clássicos", alt: "Unhas com esmaltação preta clássica", src: '/fotos/07-preto-classico.webp', w: 902, h: 1200 },
  { id: 8, titulo: "O vermelho perfeito", categoria: "Clássicos", alt: "Unhas com esmaltação vermelha", src: '/fotos/08-vermelho-classico.webp', w: 905, h: 1200 },
  { id: 9, titulo: "Naturalmente nude", categoria: "Naturais", alt: "Unhas com acabamento nude delicado", src: '/fotos/09-nude-delicado.webp', w: 905, h: 1200 },
  { id: 10, titulo: "Noite azul", categoria: "Clássicos", alt: "Unhas com esmaltação azul-marinho", src: '/fotos/10-azul-marinho.webp', w: 899, h: 1200 },
  { id: 11, titulo: "Cuidado em cada etapa", categoria: "Bastidores", alt: "Detalhe das mãos durante atendimento de manicure", src: '/fotos/11-cinza-em-atendimento.webp', w: 903, h: 1200 },
  { id: 13, titulo: "Nude & dourado", categoria: "Nail art", alt: "Unhas nude com detalhes florais e dourados", src: '/fotos/13-nude-com-detalhes-dourados.webp', w: 964, h: 1200 },
  { id: 14, titulo: "Azul perolado", categoria: "Nail art", alt: "Unhas com esmaltação azul perolada", src: '/fotos/14-azul-perolado.webp', w: 969, h: 1200 },
  { id: 15, titulo: "Intensidade em azul", categoria: "Clássicos", alt: "Esmaltação azul-royal em mão tatuada", src: '/fotos/15-azul-royal.webp', w: 969, h: 1200 },
  { id: 16, titulo: "Francesinha pink", categoria: "Francesinhas", alt: "Francesinha com pontas rosa-neon", src: '/fotos/16-francesinha-rosa-neon.webp', w: 899, h: 1200 },
  { id: 17, titulo: "Vermelho & glitter", categoria: "Nail art", alt: "Unhas vermelhas com detalhes em glitter", src: '/fotos/17-vermelho-com-glitter.webp', w: 903, h: 1200 },
  { id: 18, titulo: "Energia neon", categoria: "Nail art", alt: "Unhas amarelo-neon com glitter sobre cristal facetado", src: '/fotos/18-amarelo-neon-com-glitter.webp', w: 903, h: 1200 },
  { id: 19, titulo: "Um brinde ao vinho", categoria: "Clássicos", alt: "Unhas em tom vinho com brilho", src: '/fotos/19-vinho-brilhante.webp', w: 902, h: 1200 },
  { id: 20, titulo: "Arte em vermelho & preto", categoria: "Nail art", alt: "Nail art em vermelho, preto e branco com estampas", src: '/fotos/20-vermelho-preto-estampa.webp', w: 906, h: 1200 },
  { id: 21, titulo: "Beleza natural", categoria: "Naturais", alt: "Unhas curtas com acabamento natural", src: '/fotos/21-unhas-naturais-blindadas.webp', w: 905, h: 1200 },
  { id: 22, titulo: "Delicadeza em rosa", categoria: "Naturais", alt: "Unhas com esmaltação rosa delicada", src: '/fotos/22-rosa-delicado.webp', w: 905, h: 1200 },
  { id: 23, titulo: "Seu momento de cuidado", categoria: "Bastidores", alt: "Profissional realizando atendimento de manicure", src: '/fotos/23-atendimento-manicure.webp', w: 909, h: 1200 },
  { id: 24, titulo: "Alongamento delicado", categoria: "Naturais", alt: "Alongamento de unhas com acabamento nude", src: '/fotos/24-alongamento-nude.webp', w: 1200, h: 789 },
  { id: 25, titulo: "Quem cuida de você", categoria: "Equipe", alt: "Duas profissionais da Esmaltadas e Bellas no salão", src: '/fotos/25-equipe-esmaltadas-e-bellas.webp', w: 1066, h: 1200 },
  { id: 26, titulo: "Qual é o seu esmalte favorito?", categoria: "Instagram", alt: "Arte principal da esmalteria com a frase Qual é o seu esmalte favorito?", src: '/fotos/26-arte-principal-esmaltadas-e-bellas.webp', w: 1200, h: 1200 },
]

export const foto = (id: number) => fotos.find(f => f.id === id)!

/** Trabalhos e bastidores (sem a foto da equipe e a arte do Instagram). */
export const trabalhos = fotos.filter(f => f.categoria !== 'Equipe' && f.categoria !== 'Instagram')

export const categorias = ['Todas', 'Nail art', 'Francesinhas', 'Clássicos', 'Naturais', 'Bastidores'] as const
export type Filtro = (typeof categorias)[number]
