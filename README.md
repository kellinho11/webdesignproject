# webdesignproject
Projeto para a Aula de WebDesign (FACENS)

## Como rodar

O site é feito com [Next.js](https://nextjs.org/) e React, e gerado como páginas estáticas (pasta `out/`).

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000 (webpack: o Turbopack falha com next/font em dev)
npm run build   # gera o site estático em out/
npm start       # serve out/ localmente
```

- `app/`: layout, página, favicon, imagem de compartilhamento, robots e sitemap.
- `app/styles/`: o CSS em partes, importado por `app/globals.css` na ordem da página.
- `components/sections/`: uma seção da página por componente.
- `components/cryostat/Cryostat.jsx` + `lib/cryostat.js`: o computador quântico em SVG, usado pela intro e por Quantum Engineering.
- `components/intro/`: a intro, uma composição [Remotion](https://www.remotion.dev/) tocada pelo Remotion Player (cada quadro é função do quadro atual; o Player só baixa para quem vê a intro).
- `components/story/`, `live/`, `films/`, `coin/`: pontes, máquina, peças ao vivo, filmes em ASCII e a moeda.
- `lib/boot.js`: script do `<head>` que abre a intro (e deixa "Pular" funcionando antes do resto do JS).
- `lib/behaviors/`: header, percurso (seção atual, pontes, Demo pela rolagem), máquina, formulário e demais interações, ligados por `components/Behavior.jsx`.
- `vercel.json`: cabeçalhos de segurança do site publicado.

O formulário dos Investidores é uma demonstração: confere os campos e não envia dados.

## Teaser em vídeo (HyperFrames)

`video/` é um projeto [HyperFrames](https://hyperframes.heygen.com/): o teaser de 12 s é HTML renderizado quadro a quadro. Usa o próprio criostato e a logo do site (`video/assets/`) e uma gravação do site rodando. O resultado publicado fica em `public/videos/teaser.mp4` (rodapé e `og:video`).

```bash
cd video
npm run dev      # Studio: pré-visualiza e edita
npm run check    # valida a composição
npx --yes hyperframes@0.8.185 render --crf 22 --video-frame-format png -o ../public/videos/teaser.mp4
```

O render precisa do FFmpeg no PATH. Uma cena por arquivo em `video/compositions/` (frio, titulo, prova, marca).
