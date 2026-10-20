# Esmaltadas & Bellas

Site de uma página da esmalteria Esmaltadas & Bellas: unhas, cores e cuidado.

React 19, TypeScript, Vite 6, Motion 12 e Lenis. Fontes (Bodoni Moda e Manrope) e fotos servidas pelo próprio site, sem serviço externo.

## Rodar

```bash
npm ci
npm run dev      # desenvolvimento
npm run build    # versão final em dist/
```

## O que tem no site

- **Abertura "o vidro de esmalte"**: um traço desenha o vidro, o esmalte laca enche conforme o site carrega de verdade (fontes e foto do topo), um reflexo passa, a cor transborda pela tela, o nome aparece e voa até o topo enquanto a cortina de esmalte sobe escorrendo. Na volta à página (mesma sessão) a abertura é curta; com movimento reduzido, não há abertura.
- **Hero editorial**: título em Bodoni, a equipe dentro de uma moldura com formato de unha e reflexo que acompanha o mouse, minifotos com profundidade e selo girando.
- **Faixas cruzadas** que aceleram e invertem com a rolagem.
- **Vitrine**: carrossel infinito que corre sozinho, para no mouse, arrasta com inércia e tem lupa no desktop.
- **Manifesto** que acende palavra por palavra.
- **Cena das cores** (rolagem presa à tela): a tampa do esmalte treme, gira e sobe com o pincel, uma gota cai, o esmalte escorre e cobre a tela; depois quatro humores (delicada, intensa, autêntica, radiante) trocam a cor da tela, do vidro e da foto.
- **Cuidados**: lista grande; no desktop a foto do cuidado segue o mouse; cada item abre com o botão de agendar já com a mensagem pronta.
- **Inspirações**: filtros com marcador deslizante, cartões com inclinação e reflexo, foto grande com setas, teclado, arrastar e miniaturas.
- **Equipe**, **Como agendar** (pincelada que se desenha com a rolagem), **Agendar** (monta a mensagem e mostra como balão de conversa), **Instagram** (fotos que se abrem em leque) e **rodapé** com a assinatura "Bellas.".
- Cursor próprio no desktop, granulação de filme, barra de leitura e botão flutuante de conversa.

## Contato e WhatsApp

- WhatsApp: (11) 95237-6492
- Instagram: https://www.instagram.com/esmaltadasebellas/

Todos os botões de agendar abrem o WhatsApp com a mensagem pronta; o formulário monta o pedido (nome, cuidados, cor, período) e abre a conversa para revisar antes de enviar. O número aparece também no rodapé.

Para trocar o número, edite `NUMERO_WHATSAPP` em `src/conteudo/site.ts` (país + DDD + número, só dígitos) ou defina `VITE_WHATSAPP_NUMBER` na Vercel. Se ficar vazio, os botões voltam a levar ao Instagram.

## Textos e fotos

- Todos os textos estão em `src/conteudo/textos.ts`. Não há preço, endereço, horário ou avaliação inventados.
- As fotos estão em `public/fotos/` (uma resolução, WebP) e listadas em `src/conteudo/fotos.ts`.
- Imagem de compartilhamento (WhatsApp, Instagram etc.): `public/og.jpg`.

## Acessibilidade e conforto

- `prefers-reduced-motion` respeitado; botão **Reduzir animações** no rodapé (fica salvo no navegador).
- Rolagem nativa no celular; inércia só com mouse.
- Menu do celular e foto grande com foco preso, Esc para fechar e navegação por teclado.
- Animações contínuas param quando a seção sai da tela ou a aba fica em segundo plano.

## Deploy na Vercel

1. Importe o repositório na Vercel, branch `main`, raiz do repositório.
2. Deploy. O `vercel.json` já define Vite, `npm ci`, `npm run build` e a pasta `dist`.

O build gera canonical, Open Graph, dados estruturados, `sitemap.xml` e `robots.txt` com o domínio de produção da Vercel. Para fixar um domínio próprio, defina `VITE_SITE_URL=https://seu-dominio.com.br`.

Licenças de terceiros (fontes, Lenis e ícones): `docs/LICENCAS.md`.
