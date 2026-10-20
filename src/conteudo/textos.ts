/* Todos os textos do site num lugar só. Nada de preço, endereço, horário ou avaliação inventados. */

export const navegacao = [
  { href: '#essencia', rotulo: 'Essência' },
  { href: '#cuidados', rotulo: 'Cuidados' },
  { href: '#cores', rotulo: 'Cores' },
  { href: '#inspiracoes', rotulo: 'Inspirações' },
  { href: '#agendar', rotulo: 'Agendar' },
] as const

export const hero = {
  selo: 'Esmalteria · Nail art · Alongamento',
  linhas: ['Beleza que', 'começa nos'],
  destaque: 'detalhes.',
  texto: 'Unhas, cores e cuidado. Um momento só seu, feito com carinho do primeiro esmalte ao último brilho.',
  cta: 'Agendar meu horário',
  secundario: 'Ver inspirações',
  chips: ['Manicure & pedicure', 'Nail art', 'Alongamento em fibra'],
  legenda: 'O carinho tem rosto.',
  anel: 'ESMALTADAS & BELLAS ✳ UNHAS, CORES & CUIDADO ✳ ',
}

export const faixa = {
  laca: ['Manicure', 'Pedicure', 'Nail art', 'Francesinha', 'Alongamento em fibra', 'Blindagem'],
  noite: ['Unhas Bellas', 'Dias mais coloridos', 'Seu momento', 'Cor & cuidado'],
}

export const vitrine = {
  selo: 'Feito por mãos que amam cuidar',
  titulo: 'Seu estilo,',
  destaque: 'na ponta dos dedos.',
  texto: 'Arraste para o lado, passe o mouse para ver de perto e toque na foto para ampliar.',
}

export const manifesto = {
  selo: 'Nossa essência',
  texto: 'Mais que unhas. Um tempo para cuidar de você. Da escolha da cor ao último brilho, cada detalhe é feito com calma, atenção e aquele carinho de quem ama o que faz.',
  destaques: 4,
  assinatura: 'Esmaltadas & Bellas',
}

export const cores = {
  selo: 'Escolha a sua cor',
  frase: 'Hoje eu quero',
  frase2: 'me sentir',
  dica: 'Role para abrir o esmalte',
  cta: 'Quero essa cor',
  humores: [
    { palavra: 'delicada.', nome: 'Nude & rosé', nota: 'O encanto do essencial: nude, rosa e um toque dourado.', foto: 13, fundo: '#f1d3cf', tinta: '#2b1220', esmalte: '#e9a3ad' },
    { palavra: 'intensa.', nome: 'Vermelho clássico', nota: 'O vermelho que dispensa explicações.', foto: 8, fundo: '#9e1028', tinta: '#fbeee8', esmalte: '#c8102e' },
    { palavra: 'autêntica.', nome: 'Azul royal', nota: 'Azul, brilho e a sua personalidade inteira.', foto: 15, fundo: '#1c2a96', tinta: '#eef0ff', esmalte: '#2c43dc' },
    { palavra: 'radiante.', nome: 'Neon solar', nota: 'A energia dos tons que acendem o dia.', foto: 18, fundo: '#f2d81c', tinta: '#1a0b14', esmalte: '#ffe31f' },
  ],
} as const

export const cuidados = {
  selo: 'Cuidados',
  titulo: 'Cuidado que vai',
  destaque: 'além da cor.',
  texto: 'Escolha o que você quer hoje. A equipe ajuda com a técnica, a cor e o acabamento.',
  agendar: 'Agendar este cuidado',
  itens: [
    { numero: '01', titulo: 'Manicure & pedicure', texto: 'Da escolha da cor ao acabamento: um momento só seu, para cuidar das mãos e dos pés com carinho.', tags: ['Cuidado', 'Cor', 'Acabamento'], foto: 22 },
    { numero: '02', titulo: 'Nail art & decoração', texto: 'Francesinhas coloridas, brilho, desenhos e combinações que traduzem o seu estilo. Traga uma inspiração e converse com a equipe.', tags: ['Criatividade', 'Brilho', 'Personalidade'], foto: 6 },
    { numero: '03', titulo: 'Alongamento em fibra', texto: 'Comprimento e formato para valorizar as suas mãos. Fale com a equipe sobre a técnica, a manutenção e o resultado que você procura.', tags: ['Formato', 'Delicadeza', 'Expressão'], foto: 24 },
    { numero: '04', titulo: 'Naturais & blindagem', texto: 'Para quem ama a beleza das unhas naturais. Conheça as possibilidades de cuidado e blindagem com a equipe.', tags: ['Naturalidade', 'Atenção', 'Leveza'], foto: 21 },
  ],
} as const

export const galeria = {
  selo: 'Nosso portfólio',
  titulo: 'Inspiração para',
  destaque: 'a sua próxima visita.',
  texto: 'Gostou de alguma? Toque na foto e mande para a equipe: dá para fazer igual ou criar a sua versão.',
  mais: 'Ver todas as inspirações',
  menos: 'Mostrar menos',
  pedir: 'Quero esta',
}

export const equipe = {
  selo: 'Quem cuida de você',
  titulo: 'O carinho',
  destaque: 'tem rosto.',
  texto: 'Por trás de cada cor, existem mãos atentas e um sorriso que recebe você pelo nome. Aqui, o seu horário é um encontro: sem pressa, com conversa boa e muita atenção ao detalhe.',
  valores: [
    { titulo: 'Atenção ao detalhe', texto: 'Cutícula, formato, cor e brilho, cada etapa no seu tempo.' },
    { titulo: 'A sua cara', texto: 'Do clássico ao neon, a escolha é sua; a gente ajuda a acertar.' },
    { titulo: 'Um momento seu', texto: 'Um intervalo na rotina para sair mais leve e mais Bella.' },
  ],
}

export const passos = {
  selo: 'Como agendar',
  titulo: 'Do primeiro oi',
  destaque: 'ao seu horário.',
  itens: [
    { titulo: 'Escolha a inspiração', texto: 'Navegue pelas fotos e separe a que mais combina com você.' },
    { titulo: 'Mande um oi', texto: 'Fale com a equipe e combine o cuidado, a cor e o melhor horário.' },
    { titulo: 'Seu momento', texto: 'Chegue, relaxe e saia com as mãos do jeito que você sonhou.' },
  ],
}

export const agendar = {
  selo: 'Seu próximo momento começa aqui',
  titulo: 'Que tal reservar',
  destaque: 'um tempo só para você?',
  texto: 'Monte o seu pedido em segundos. A mensagem fica pronta para você enviar; a equipe confirma o horário com você.',
  campos: {
    nome: 'Como podemos te chamar?',
    nomeDica: 'Seu nome',
    servicos: 'O que você quer fazer?',
    cor: 'A cor do momento',
    periodo: 'Melhor período',
    dia: 'Algum dia de preferência?',
    diaDica: 'Ex.: sábado de manhã',
    obs: 'Quer contar mais alguma coisa?',
    obsDica: 'Ex.: quero uma francesinha colorida',
  },
  servicos: ['Manicure', 'Pedicure', 'Nail art', 'Francesinha', 'Alongamento em fibra', 'Blindagem'],
  cores: [
    { nome: 'Nude', hex: '#e5bfae' },
    { nome: 'Rosa', hex: '#f0a3bd' },
    { nome: 'Vermelho', hex: '#c8102e' },
    { nome: 'Vinho', hex: '#5c0f24' },
    { nome: 'Azul', hex: '#2c43dc' },
    { nome: 'Preto', hex: '#121014' },
    { nome: 'Neon', hex: '#ffe31f' },
    { nome: 'Surpresa', hex: 'conic-gradient(#f0a3bd, #ffe31f, #2c43dc, #c8102e, #f0a3bd)' },
  ],
  periodos: ['Manhã', 'Tarde', 'Noite'],
  previa: 'Sua mensagem',
  previaVazia: 'Escolha um cuidado para montar a mensagem.',
  enviarWhats: 'Enviar no WhatsApp',
  enviarInsta: 'Copiar e abrir o Instagram',
  copiado: 'Mensagem copiada! Cole no Direct.',
  nota: 'Nada é enviado sem você: o pedido abre na conversa para você revisar.',
}

export const instagram = {
  selo: 'A inspiração continua por lá',
  titulo: 'Mais cores no feed.',
  destaque: 'Mais Bellas no seu dia.',
  cta: 'Seguir no Instagram',
  fotos: [4, 16, 26, 17, 1],
}

export const rodape = {
  chamada: 'Seu momento',
  destaque: 'começa aqui.',
  assinatura: 'Bellas.',
  frase: 'Unhas, cores & cuidado.',
  movimento: 'Reduzir animações',
  movimentoAtivo: 'Ativar animações',
}
