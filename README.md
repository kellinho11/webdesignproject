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
- `components/story/`, `live/`, `films/`, `coin/`: o fio e a máquina, as peças ao vivo, os filmes em ASCII e a moeda.
- `lib/boot.js`: script do `<head>` que abre a intro (e deixa "Pular" funcionando antes do resto do JS).
- `lib/behaviors/`: intro, header, fio, formulário e demais interações, ligados por `components/Behavior.jsx`.
- `vercel.json`: cabeçalhos de segurança do site publicado.

O formulário dos Investidores é uma demonstração: confere os campos e não envia dados.
