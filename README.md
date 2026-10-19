# Esmaltadas & Bellas

Portfólio responsivo em português com React 19, Vite, TypeScript, Tailwind 4, Motion e Lenis. A estrutura de movimento, fontes locais e ícones sociais foi adaptada do projeto `solutionsnovaai-bit/rezende-precatorios`, comparado com `solutionsnovaai-bit/rezendeprecatorios`. Os repositórios de referência não foram alterados.

## Desenvolvimento

Instale as dependências com `npm ci`. Execute `npm run dev` para desenvolvimento e `npm run build` para a versão estática em `dist/`.

## Contato

Instagram: https://www.instagram.com/esmaltadasebellas/

O número de WhatsApp está intencionalmente vazio. Para ativar, copie `.env.example` para `.env.local`, informe `VITE_WHATSAPP_NUMBER` com o número real incluindo país e DDD (apenas dígitos) e faça um novo build/deploy. Até então, o balão explica a disponibilidade e direciona ao Instagram. Nenhum número fictício é utilizado.

Os campos de contato apenas montam uma mensagem local. Não há armazenamento, envio de formulário ou confirmação automática de agendamento. O visitante copia a mensagem e envia no Instagram; com WhatsApp configurado, ela é anexada ao link `wa.me`.

## Imagens

25 fotografias/artes fornecidas pelo cliente, em duas resoluções WebP (50 arquivos). A coleção tem 23 imagens de trabalhos e atendimento, além da foto da equipe e da arte principal. A foto do ambiente com a televisão foi excluída. O manifesto tipado é `src/assets.ts`.

As imagens foram recortadas, limpas e ampliadas a partir dos prints fornecidos; ampliações por IA não equivalem aos originais da câmera. Não há avaliações, endereço, preços, telefone ou horários inventados.

## Interações e acessibilidade

- Abertura a cada carregamento, com opção de pular.
- Parallax, revelações, botões magnéticos, faixa contínua e troca de paletas.
- Preferência `prefers-reduced-motion` respeitada; botão para pausar movimento.
- Rolagem nativa em telas de toque; Lenis apenas com ponteiro fino.
- Filtros, coleção completa, lightbox com teclado, swipe, Escape e gerenciamento de foco.
- Menu móvel com foco contido e fechamento por Escape.
- Fontes hospedadas localmente; imagens responsivas e carregamento sob demanda.
- Ícones oficiais Instagram/WhatsApp via Simple Icons, mantidos sem alteração. Licença em `docs/licenses/simple-icons-LICENSE.md`; fontes e Lenis em `docs/licencas/`.

## Deploy na Vercel

1. Importe `solutionsnovaai-bit/esmaltadas-e-bellas` na Vercel.
2. Use a branch `main` e a raiz do repositório como Root Directory.
3. Clique em Deploy. O arquivo `vercel.json` já define **Vite**, instalação `npm ci`, build `npm run build` e saída `dist`.

Node.js 22 é definido em `package.json`. Não há servidor, banco de dados ou variável obrigatória para o primeiro deploy. O WhatsApp permanece sem número e o Instagram funciona como contato.

O build detecta o domínio de produção pelas variáveis da Vercel para gerar canonical, Open Graph, dados estruturados, `sitemap.xml` e `robots.txt`. Para fixar um domínio próprio, defina opcionalmente `VITE_SITE_URL=https://seu-dominio.com.br` nas configurações da Vercel e refaça o deploy. Para ativar o WhatsApp, defina `VITE_WHATSAPP_NUMBER` com o número real, país e DDD, apenas dígitos, e refaça o deploy.

Não envie `.env.local`, credenciais, `node_modules` ou `dist` ao GitHub. O repositório contém o código-fonte, as fontes locais e todos os assets. A Vercel gera a versão de produção a partir do commit.

Referências de configuração: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite), [vercel.json](https://vercel.com/docs/project-configuration/vercel-json) e [variáveis de ambiente](https://vercel.com/docs/environment-variables/system-environment-variables).

## Verificações

Compilação TypeScript, build de produção, integridade dos 50 arquivos WebP, 23 entradas da galeria, exclusão da foto da televisão e geração de metadados/sitemap com um domínio de teste. A inspeção visual em navegador não foi executada no ambiente gerenciado; os movimentos, filtros e contato estão implementados no código.
