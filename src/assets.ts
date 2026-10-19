export type Category = 'Nail art' | 'Francesinhas' | 'Clássicos' | 'Naturais' | 'Bastidores' | 'Equipe' | 'Instagram'
export interface SalonImage { id: number; title: string; category: Category; alt: string; src: string; small: string; width: number; height: number; smallWidth: number }
export const images: SalonImage[] = [
  {
    "id": 1,
    "title": "Azul em degradê",
    "category": "Nail art",
    "alt": "Unhas com esmaltação azul em degradê sobre cristal facetado",
    "src": "/images/full/01-azul-degrade.webp",
    "small": "/images/small/01-azul-degrade.webp",
    "width": 896,
    "height": 1200,
    "smallWidth": 478
  },
  {
    "id": 2,
    "title": "Azul & brilho",
    "category": "Nail art",
    "alt": "Unhas azuis com detalhe em degradê e glitter",
    "src": "/images/full/02-azul-com-glitter.webp",
    "small": "/images/small/02-azul-com-glitter.webp",
    "width": 900,
    "height": 1200,
    "smallWidth": 480
  },
  {
    "id": 3,
    "title": "Francesinha solar",
    "category": "Francesinhas",
    "alt": "Francesinha com pontas amarelo-neon sobre base rosada",
    "src": "/images/full/03-francesinha-amarelo-neon.webp",
    "small": "/images/small/03-francesinha-amarelo-neon.webp",
    "width": 900,
    "height": 1200,
    "smallWidth": 480
  },
  {
    "id": 4,
    "title": "Um arco-íris de cores",
    "category": "Nail art",
    "alt": "Unhas coloridas em tons neon com frascos de esmalte",
    "src": "/images/full/04-unhas-coloridas-neon.webp",
    "small": "/images/small/04-unhas-coloridas-neon.webp",
    "width": 899,
    "height": 1200,
    "smallWidth": 479
  },
  {
    "id": 5,
    "title": "Clássico com um toque de cor",
    "category": "Francesinhas",
    "alt": "Francesinha branca com unhas de destaque vermelhas e glitter",
    "src": "/images/full/05-francesinha-branca-detalhes-vermelhos.webp",
    "small": "/images/small/05-francesinha-branca-detalhes-vermelhos.webp",
    "width": 902,
    "height": 1200,
    "smallWidth": 481
  },
  {
    "id": 6,
    "title": "Preto, branco & arte",
    "category": "Nail art",
    "alt": "Esmaltação preta e branca com decoração de folhagem",
    "src": "/images/full/06-preto-branco-folhagem.webp",
    "small": "/images/small/06-preto-branco-folhagem.webp",
    "width": 903,
    "height": 1200,
    "smallWidth": 482
  },
  {
    "id": 7,
    "title": "Preto nada básico",
    "category": "Clássicos",
    "alt": "Unhas com esmaltação preta clássica",
    "src": "/images/full/07-preto-classico.webp",
    "small": "/images/small/07-preto-classico.webp",
    "width": 902,
    "height": 1200,
    "smallWidth": 481
  },
  {
    "id": 8,
    "title": "O vermelho perfeito",
    "category": "Clássicos",
    "alt": "Unhas com esmaltação vermelha",
    "src": "/images/full/08-vermelho-classico.webp",
    "small": "/images/small/08-vermelho-classico.webp",
    "width": 905,
    "height": 1200,
    "smallWidth": 483
  },
  {
    "id": 9,
    "title": "Naturalmente nude",
    "category": "Naturais",
    "alt": "Unhas com acabamento nude delicado",
    "src": "/images/full/09-nude-delicado.webp",
    "small": "/images/small/09-nude-delicado.webp",
    "width": 905,
    "height": 1200,
    "smallWidth": 483
  },
  {
    "id": 10,
    "title": "Noite azul",
    "category": "Clássicos",
    "alt": "Unhas com esmaltação azul-marinho",
    "src": "/images/full/10-azul-marinho.webp",
    "small": "/images/small/10-azul-marinho.webp",
    "width": 899,
    "height": 1200,
    "smallWidth": 479
  },
  {
    "id": 11,
    "title": "Cuidado em cada etapa",
    "category": "Bastidores",
    "alt": "Detalhe das mãos durante atendimento de manicure",
    "src": "/images/full/11-cinza-em-atendimento.webp",
    "small": "/images/small/11-cinza-em-atendimento.webp",
    "width": 903,
    "height": 1200,
    "smallWidth": 482
  },
  {
    "id": 13,
    "title": "Nude & dourado",
    "category": "Nail art",
    "alt": "Unhas nude com detalhes florais e dourados",
    "src": "/images/full/13-nude-com-detalhes-dourados.webp",
    "small": "/images/small/13-nude-com-detalhes-dourados.webp",
    "width": 964,
    "height": 1200,
    "smallWidth": 514
  },
  {
    "id": 14,
    "title": "Azul perolado",
    "category": "Nail art",
    "alt": "Unhas com esmaltação azul perolada",
    "src": "/images/full/14-azul-perolado.webp",
    "small": "/images/small/14-azul-perolado.webp",
    "width": 969,
    "height": 1200,
    "smallWidth": 517
  },
  {
    "id": 15,
    "title": "Intensidade em azul",
    "category": "Clássicos",
    "alt": "Esmaltação azul-royal em mão tatuada",
    "src": "/images/full/15-azul-royal.webp",
    "small": "/images/small/15-azul-royal.webp",
    "width": 969,
    "height": 1200,
    "smallWidth": 517
  },
  {
    "id": 16,
    "title": "Francesinha pink",
    "category": "Francesinhas",
    "alt": "Francesinha com pontas rosa-neon",
    "src": "/images/full/16-francesinha-rosa-neon.webp",
    "small": "/images/small/16-francesinha-rosa-neon.webp",
    "width": 899,
    "height": 1200,
    "smallWidth": 479
  },
  {
    "id": 17,
    "title": "Vermelho & glitter",
    "category": "Nail art",
    "alt": "Unhas vermelhas com detalhes em glitter",
    "src": "/images/full/17-vermelho-com-glitter.webp",
    "small": "/images/small/17-vermelho-com-glitter.webp",
    "width": 903,
    "height": 1200,
    "smallWidth": 482
  },
  {
    "id": 18,
    "title": "Energia neon",
    "category": "Nail art",
    "alt": "Unhas amarelo-neon com glitter sobre cristal facetado",
    "src": "/images/full/18-amarelo-neon-com-glitter.webp",
    "small": "/images/small/18-amarelo-neon-com-glitter.webp",
    "width": 903,
    "height": 1200,
    "smallWidth": 482
  },
  {
    "id": 19,
    "title": "Um brinde ao vinho",
    "category": "Clássicos",
    "alt": "Unhas em tom vinho com brilho",
    "src": "/images/full/19-vinho-brilhante.webp",
    "small": "/images/small/19-vinho-brilhante.webp",
    "width": 902,
    "height": 1200,
    "smallWidth": 481
  },
  {
    "id": 20,
    "title": "Arte em vermelho & preto",
    "category": "Nail art",
    "alt": "Nail art em vermelho, preto e branco com estampas",
    "src": "/images/full/20-vermelho-preto-estampa.webp",
    "small": "/images/small/20-vermelho-preto-estampa.webp",
    "width": 906,
    "height": 1200,
    "smallWidth": 483
  },
  {
    "id": 21,
    "title": "Beleza natural",
    "category": "Naturais",
    "alt": "Unhas curtas com acabamento natural",
    "src": "/images/full/21-unhas-naturais-blindadas.webp",
    "small": "/images/small/21-unhas-naturais-blindadas.webp",
    "width": 905,
    "height": 1200,
    "smallWidth": 483
  },
  {
    "id": 22,
    "title": "Delicadeza em rosa",
    "category": "Naturais",
    "alt": "Unhas com esmaltação rosa delicada",
    "src": "/images/full/22-rosa-delicado.webp",
    "small": "/images/small/22-rosa-delicado.webp",
    "width": 905,
    "height": 1200,
    "smallWidth": 483
  },
  {
    "id": 23,
    "title": "Seu momento de cuidado",
    "category": "Bastidores",
    "alt": "Profissional realizando atendimento de manicure",
    "src": "/images/full/23-atendimento-manicure.webp",
    "small": "/images/small/23-atendimento-manicure.webp",
    "width": 909,
    "height": 1200,
    "smallWidth": 485
  },
  {
    "id": 24,
    "title": "Alongamento delicado",
    "category": "Naturais",
    "alt": "Alongamento de unhas com acabamento nude",
    "src": "/images/full/24-alongamento-nude.webp",
    "small": "/images/small/24-alongamento-nude.webp",
    "width": 1200,
    "height": 789,
    "smallWidth": 640
  },
  {
    "id": 25,
    "title": "Quem cuida de você",
    "category": "Equipe",
    "alt": "Duas profissionais da Esmaltadas e Bellas no salão",
    "src": "/images/full/25-equipe-esmaltadas-e-bellas.webp",
    "small": "/images/small/25-equipe-esmaltadas-e-bellas.webp",
    "width": 1066,
    "height": 1200,
    "smallWidth": 569
  },
  {
    "id": 26,
    "title": "Qual é o seu esmalte favorito?",
    "category": "Instagram",
    "alt": "Arte principal da esmalteria com a frase Qual é o seu esmalte favorito?",
    "src": "/images/full/26-arte-principal-esmaltadas-e-bellas.webp",
    "small": "/images/small/26-arte-principal-esmaltadas-e-bellas.webp",
    "width": 1200,
    "height": 1200,
    "smallWidth": 640
  }
]
export const imageById = (id: number) => images.find(image => image.id === id)!
export const galleryImages = images.filter(image => !['Equipe', 'Instagram'].includes(image.category))
export const imageSrcSet = (image: SalonImage) => `${image.small} ${image.smallWidth}w, ${image.src} ${image.width}w`
