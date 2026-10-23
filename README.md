# webdesignproject
Projeto para a Aula de WebDesign (FACENS)

## Como rodar

O site é feito com [Next.js](https://nextjs.org/) e React, e gerado como páginas estáticas (pasta `out/`).

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000 (webpack: o Turbopack falha com next/font em dev)
npm run build   # gera o site estático em out/ (e grava a CSP de cada página)
npm start       # serve out/ localmente
```

- `app/`: layout, a home (`page.jsx`), o Glossário (`glossario/page.jsx`), favicon, imagem de compartilhamento, robots e sitemap.
- `lib/glossario.js`: os termos do Glossário, também usados pelas dicas da home.
- `lib/seo.js` + `components/seo/JsonLd.jsx`: título e descrição da home e os dados estruturados (JSON-LD) de cada página; `app/manifest.js` e `app/not-found.jsx` completam o SEO.
- `app/styles/`: o CSS em partes, importado por `app/globals.css` na ordem da página.
- `components/sections/`: uma seção da página por componente.
- `components/cryostat/Cryostat.jsx` + `lib/cryostat.js`: o computador quântico em SVG, usado pela intro e por Quantum Engineering.
- `components/intro/`: a intro, uma composição [Remotion](https://www.remotion.dev/) tocada pelo Remotion Player: a marca se desenha e uma íris se abre sobre a página (cada quadro é função do quadro atual; o Player só baixa para quem vê a intro).
- `components/story/`, `live/`, `films/`, `coin/`: pontes, máquina, peças ao vivo, filmes em ASCII e a moeda.
- `lib/boot.js`: script do `<head>` que abre a intro (e deixa "Pular" funcionando antes do resto do JS).
- `lib/behaviors/`: header, percurso (seção atual, pontes, Demo pela rolagem), máquina, formulário e demais interações, ligados por `components/Behavior.jsx`.
- `vercel.json`: cabeçalhos de segurança do site publicado; `scripts/csp.mjs` grava, depois do build, a CSP por hash de cada página. Ver `SECURITY.md`.
- `lib/validate.js`: as regras do formulário, sem DOM.

O formulário dos Investidores é uma demonstração: confere os campos e não envia dados.

## Vídeo do Hero (HyperFrames)

`video/` é um projeto [HyperFrames](https://hyperframes.heygen.com/): "como funciona um computador quântico" em 20 s (bit, superposição, emaranhamento, interferência, medição e o criostato do site), quadrado e sem som, renderizado quadro a quadro a partir de HTML. Uma cena por arquivo em `video/compositions/`. O resultado fica em `public/videos/computador-quantico.mp4`, no Hero (só toca visível) e como `og:video`.

```bash
cd video
npm run dev      # Studio: pré-visualiza e edita
npm run check    # valida a composição
npx --yes hyperframes@0.8.185 render --crf 18 -o renders/computador-quantico-1080.mp4
ffmpeg -i renders/computador-quantico-1080.mp4 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an ../public/videos/computador-quantico.mp4
```

O render precisa do FFmpeg no PATH.
