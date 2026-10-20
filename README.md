# webdesignproject
Projeto para a Aula de WebDesign (FACENS)

## Como rodar

O site é feito com [Next.js](https://nextjs.org/) e React, e gerado como páginas estáticas (pasta `out/`).

```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # gera o site estático em out/
npm start       # serve out/ localmente
```

- `app/`: layout, página e estilos globais.
- `components/sections/`: uma seção da página por componente.
- `components/demo/`: a Demonstração ao vivo (QAOA, Grover e VQE), em React com estado próprio.
- `components/LegacyBehaviors.jsx` + `lib/legacy.js`: intro, interlúdios, qubits, campo de pontos, formulário e demais interações, ligados no navegador.
