# Changelog — SynapseQ

Todas as mudanças relevantes do site são registradas aqui.
O projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/) (MAJOR.MINOR.PATCH).

## Como numeramos

Num site, o "contrato público" é aquilo de que outras pessoas dependem:

- **endereços e links**: páginas (`index.html`) e âncoras (`#investidores`) que podem ter sido salvos ou compartilhados;
- **estrutura e design system**: classes e variáveis CSS usadas para construir novas partes.

| Tipo | Quando usamos |
|------|---------------|
| **MAJOR** | A mudança quebra links, âncoras ou a estrutura usada até então |
| **MINOR** | Adiciona seção ou funcionalidade sem quebrar nada |
| **PATCH** | Corrige ou ajusta algo, sem novidade para quem usa o site |

Versões `0.x` são o desenvolvimento inicial: o site ainda não tinha conteúdo, então mudanças incompatíveis nessa fase não exigem MAJOR (regra 4 da especificação). A `1.0.0` é a primeira versão completa e utilizável.

---

## [4.2.0] — 2026-10-21 · MINOR

Uma revisão crítica de qualidade, desempenho e segurança. MINOR porque nada quebra: âncoras, classes e a intro continuam; entram favicon, imagem de compartilhamento, robots e sitemap.

### Corrigido
- **A página não fica mais presa atrás da intro.** A trava de rolagem vinha no próprio HTML e só saía depois que todo o JS carregava: com rede ruim ou bloqueador, a página ficava travada. Agora quem abre a intro é um script curto no `<head>` (`lib/boot.js`), que já deixa "Pular" e Esc funcionando antes do resto do JS; um toque no processador antes da hora fica guardado e, se o JS não chegar em 3 s, a intro sai.
- **Rolagem mais leve:** fora da Demo, o filme guiado pela rolagem era redesenhado a cada quadro (137 vezes até chegar nela). Agora só redesenha quando o instante muda.
- **Contraste AA (4,5:1)** no aviso "números ilustrativos" do Hero, nos placeholders e no select do formulário, nas notas dos números, nos nomes das portas e no "Pular" da intro.

### Alterado
- **Formulário honesto:** a confirmação não diz mais "Solicitação recebida" nem promete NDA; avisa que é uma demonstração e que nada foi enviado.
- **Botões do Hero levam aonde dizem:** "Ver a demonstração" (→ Demo) e "Como funciona" (→ Quantum Engineering), no lugar de "Agendar demonstração" e "Whitepaper técnico".
- README atualizado com a estrutura atual.

### Adicionado
- Cabeçalhos de segurança no `vercel.json`: `Content-Security-Policy` (`frame-ancestors 'none'`, `base-uri`, `form-action`, `object-src`), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`.
- Favicon (`app/icon.svg`), imagem de compartilhamento 1200×630 (`app/opengraph-image.png`), Open Graph, Twitter Card, link canônico, cor do tema, `robots.txt` e `sitemap.xml`.

---

## [4.1.0] — 2026-10-21 · MINOR

Menos texto, conteúdo mais direto e código reorganizado. MINOR porque nada quebra: âncoras, classes e eventos continuam os mesmos.

### Alterado
- **Conteúdo mais prático** (cerca de 1.580 → 1.080 palavras na página):
  - frases longas viraram rótulos curtos, números e setas ("Problema → função de custo");
  - legendas dos filmes, notas da máquina, pontes e etapas do fluxo com uma linha cada;
  - tabelas com 4 linhas, sem repetir o que a legenda e o filme já mostram;
  - saiu a linha de setor dos Casos de Uso, que repetia a área do caso.
- **CSS em partes**: `app/globals.css` virou um índice que importa 19 arquivos de `app/styles/` (tokens, base, componentes, filme, layout, percurso, fio, céu e um por seção), na ordem da página. Saíram 57 declarações que eram sempre sobrescritas pelo mesmo seletor mais abaixo. Capturas da página inteira antes e depois: nenhum pixel de diferença.
- **Utilitários compartilhados**:
  - `lib/media.js` reúne as consultas de tela e preferências (antes repetidas em 8 arquivos);
  - `lib/canvas.js` reúne o ajuste de resolução do canvas e a fonte mono (filmes e esfera de Bloch);
  - `lib/signals.js` centraliza os eventos `sq:*` e guarda o último valor de cada um, no lugar das variáveis globais `window.__sqAlgo` e `window.__sqMotionOff`;
  - `components/ui/PlayPauseIcon.jsx`, o ícone de pausa que estava duplicado.
- Imports dos componentes padronizados com `@/`, sem extensão.
- `package.json` na versão 4.1.0 (estava em 3.0.0).

### Corrigido
- Coordenadas do fundo espacial apareciam atrás dos títulos entre 700 e 1100 px: agora somem abaixo de 1100 px.
- Rótulos dos estágios da máquina (STILL, CP, MXC) ficavam cortados na borda quando a câmera aproxima: agora só aparecem quando cabem inteiros.
- No celular, a barra dos filmes mostra só o tempo atual, com mais espaço para o título.

---

## [4.0.0] — 2026-10-21 · MAJOR

O site vira um percurso: o visitante é um qubit que atravessa um circuito, da intro até a medição nos Investidores, ao lado do computador quântico que o processa. MAJOR porque a página foi reduzida às 6 seções do menu, a estrutura e as classes do design system mudaram e âncoras de seções removidas (Jornada, Mercado, Roadmap) deixaram de existir.

### Removido
- Seções Jornada, Mercado, Roadmap, os três interlúdios, o campo de pontos e o registrador de qubits: ficam o Hero e as 5 seções do menu, além da intro.
- Demonstrações interativas excessivas: o slider do comparativo, as abas e escalas dos Casos de Uso, o terminal de "Enviar requisição" e a Demo em React (`components/demo/`).
- A seção clara dos Casos de Uso, que destoava do resto da página.
- `lib/legacy.js` e `components/LegacyBehaviors.jsx`.

### Adicionado
- **O circuito da página**:
  - um fio de qubit percorre a margem e se desenha com a rolagem;
  - um marcador |ψ⟩ muda de estado a cada porta (H na Tecnologia, Rz nos Casos, U na Demo, SWAP na API, M nos Investidores);
  - frases-ponte grandes ligam uma seção à próxima, e as palavras acendem conforme a leitura.
- **O computador quântico ao lado do texto**:
  - o criostato da intro passou para um módulo compartilhado (`lib/cryostat.js`) e virou um instrumento fixo à direita;
  - a câmera desce até a parte que cada seção explica (chip, linhas de controle, leitura, máquina inteira, colapso), com nota e ficha técnica;
  - no celular, é uma faixa fixa de 132px no topo.
- **Filmes em motion graphics** (`components/films/`):
  - cenas desenhadas em ASCII num canvas, sobre gradient mesh, com legenda e barra de vidro;
  - capítulos, linha do tempo com clique e arraste, e botão de pausa;
  - tocam só quando estão na tela: no máximo 3 de uma vez no desktop e 1 no celular.
- **A moeda (bit × qubit)** é a interação principal da Tecnologia: girar põe em superposição e parar mede. O resultado medido é o mesmo que colapsa na porta M dos Investidores.
- **Ligação entre seções**: "Rodar na Demo", nos Casos, leva até a Demo e troca o algoritmo (o histograma e o circuito de QAOA, Grover ou VQE). Na Demo, a rolagem é a linha do tempo do filme.
- **Faixa de rumo no header**: mostra o capítulo atual, as 5 portas, a telemetria da QPU e o link da seção ativa no menu.
- **Hero**: esfera de Bloch em canvas, telemetria do processador e números-chave.
- **Mais informação em cada seção**:
  - números-chave no topo de todas as seções;
  - na Tecnologia, o fluxo "como uma pergunta vira resposta" e a tabela clássico × SynapseQ;
  - nos Casos, o setor e as métricas de antes e depois;
  - na Demo, o circuito do algoritmo escolhido e o log de shots;
  - na API, o código em Python, TypeScript e cURL e a ficha técnica do hardware;
  - nos Investidores, a tração, o uso dos recursos e os marcos;
  - no rodapé, a ficha da máquina e o mapa do circuito.
- **Fundo espacial**: céu em degradê com nebulosas, três camadas de estrelas com parallax, órbitas, coordenadas celestes e um fóton que cruza o céu.
- **"Pausar movimento"**: um botão que para todas as animações automáticas do site de uma vez (WCAG 2.2.2).

### Alterado
- **Direção visual editorial**:
  - grade com margem para o fio e 12 colunas;
  - títulos em escada, com uma palavra em serifa itálica;
  - cantos secos;
  - botão principal em chapa de gelo e secundário sublinhado;
  - sem texto em degradê e sem brilhos de neon.
- **Interações reorganizadas**: ficam em `lib/behaviors/` (intro, header, entradas, Hero, fio, máquina, contadores, ligações, formulário e glossário), ligadas por `components/Behavior.jsx`. Cada uma recebe um escopo de limpeza (`lib/scope.js`) que desfaz eventos, observers e timers ao desmontar.
- **CSS reorganizado**: um bloco por componente, na ordem da página, sem as regras mortas. Cada limpeza foi conferida com captura de página inteira em três larguras, com zero diferença de pixel.

### Desempenho e acessibilidade
- No celular, os filmes rodam a 24 quadros por segundo, com canvas de no máximo 1,5× e um filme tocando por vez.
- Tudo que se move para fora da tela, com a aba oculta ou com "Pausar movimento".
- Com "reduzir movimento", os filmes mostram o quadro-resumo e nada toca sozinho.
- Os filmes têm roteiro completo para leitores de tela.

### Observação
As métricas de produto (receita, clientes, telemetria) são ilustrativas: o SynapseQ é um projeto acadêmico. O site diz isso no Hero e no rodapé.

---

## [3.3.0] — 2026-10-20 · MINOR

Desempenho das funções principais: as interações aparecem na tela até 7 vezes mais rápido.

### Alterado
- **Luz sem filtro de desfoque**:
  - As manchas de luz (três no Hero, uma nos Investidores) usavam `filter: blur(70–90px)` sobre áreas de até 1240×900px. O navegador refazia esse desfoque cada vez que algo perto mudava. Elas viraram degradês radiais com mais paradas e queda mais longa: a mesma luz, sem custo para repintar.
  - As manchas do CTA e do rodapé, que eram formas SVG desfocadas, viraram degradês nas mesmas posições.
- **O circuito do Hero perdeu o `blur(1px)`**: é uma camada animada da largura da tela, e o desfoque era refeito a cada pulso das portas.

### Desempenho
Medido com a Event Timing API (a base da métrica INP), no Chromium sem GPU. Os números são o tempo até a resposta aparecer na tela:

| Interação | 3.2.0 | 3.3.0 |
|---|---|---|
| Enviar o formulário (com erros) | 392ms | 56ms |
| Trocar o passo da Jornada | 120ms | 40ms |
| Medir 1.000 vezes | 104ms | 40ms |
| Palpite no quiz, escolha nos Casos de Uso, abas e controles da Demo | 40–56ms | 32–56ms |

O JavaScript dessas funções já levava de 0 a 3ms. O tempo estava todo na pintura, por causa dos filtros.

### Observação
- É MINOR porque a aparência e as funções ficam iguais; só o custo de desenhar muda.
- Bateria de testes: 127/127, com 2 testes novos:
  - nenhuma mancha de luz visível com `filter`;
  - o envio do formulário e a troca de passo aparecem em menos de 150ms.

## [3.2.0] — 2026-10-20 · MINOR

Visual: o vidro vira o material das superfícies de uso, e os halos de neon dão lugar a indicadores nítidos.

### Adicionado
- **Material de vidro (glassmorphism)** em três pesos. Quanto maior a superfície, mais espesso o vidro:
  - **espesso**: a cápsula do header, que flutua sobre a página, e o menu mobile;
  - **médio**: o painel da Demonstração, o terminal da API e o cartão do formulário de investidores;
  - **fino**: as abas da Demo e o registrador de qubits.

  Cada superfície tem tinta translúcida, desfoque do que está atrás, borda mais clara no topo (a luz "vem de cima") e um **reflexo que acompanha o ponteiro**, mais forte perto da borda de cima, como num vidro de verdade.
- **Manchas de luz paradas** atrás do vidro da Demo e da API: sem algo colorido por trás, o desfoque não aparece.
- **O menu mobile se materializa** ao abrir: o desfoque e a escala chegam juntos, em vez de o painel só aparecer.
- **Tom "gelo"** (`--ice`) como acento frio dos indicadores.

### Alterado
- **Sem halos de neon em texto**:
  - o passo ativo da Jornada ganha um sublinhado gelo;
  - a opção do quiz em hover e a resposta certa ficam em cor sólida;
  - o tempo do quântico no Comparativo fica em gelo, sem brilho;
  - o título do Hero perde o halo violeta.
- **Brilhos mais contidos** em todo o site (os tokens `--glow-*` caíram pela metade), e as manchas borradas do rodapé e do CTA ficaram com metade da opacidade.
- **Texto sobre vidro** com um pouco mais de contraste, como os links do menu.

### Acessibilidade
- **Nunca vidro sobre vidro**: o botão "Portal do Investidor" dentro do header não vira outro vidro, só ganha contorno.
- Com "reduzir transparência" ou "mais contraste", o vidro fica sólido e sem desfoque, e as manchas de luz somem. Em navegador sem suporte a `backdrop-filter`, a tinta fica quase opaca.
- O menu mobile continua bem mais opaco que os painéis, para ser lido sobre o título do Hero.

### Desempenho
- Superfícies grandes usam tinta mais densa e menos desfoque (14px no painel da Demo, 10px no formulário), e no celular o desfoque é menor.
- O campo de pontos não cintila mais atrás do formulário de vidro dos Investidores: lá ele só redesenha na rolagem, e o navegador não refaz o desfoque a cada quadro.
- Medido no Chromium sem GPU, o pior caso:
  - Investidores: o mesmo da 3.1.0 (~15 qps);
  - Hero: igual;
  - Demo: de 60 para ~45 qps, o custo do desfoque numa área grande sem placa de vídeo.

### Observação
- É MINOR porque só muda a aparência; conteúdo, âncoras e classes continuam iguais.
- Bateria de testes: 125/125, com 6 testes novos:
  - vidro nas 6 superfícies;
  - nada de vidro sobre vidro no header;
  - o reflexo acompanhando o ponteiro;
  - nenhum halo de neon em texto;
  - a página sem erros JS;
  - "reduzir transparência" sólido.

## [3.1.0] — 2026-10-20 · MINOR

Sistema de movimento: o site passa a responder como uma ferramenta, não como um vídeo de fundo.

### Adicionado
- **Curvas de movimento como tokens**:
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` para entradas e respostas;
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` para o que se desloca na tela;
  - `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` para o menu mobile, que desliza como uma gaveta;
  - as durações `--dur-press` (140ms) e `--dur-ui` (200ms).
- **Resposta ao clique** em tudo que é clicável (botões, abas da Demo, passos da Jornada, escolhas dos Casos de Uso, opções do quiz, "Enviar" do terminal, botão do menu): o elemento afunda para 97% no instante do toque e volta rápido.
- **Jornada pelo teclado**: os passos, que já eram abas, passam a andar com as setas ←/→, Home e End.

### Alterado
- **Pelo teclado não há animação**: com as setas, o passo da Jornada troca na hora. Com o clique, a entrada caiu de 450ms para 220ms, com deslocamento de 6px (antes 10px).
- **O hover dos cartões** responde em 200ms depois da entrada. Antes herdava os 600ms da animação de entrada.
- **A explicação do glossário** abre em 140ms, a partir do termo (base), e não do centro.
- **A barra de progresso da Jornada** cresce por `transform`, não por `width`: não recalcula o layout a cada quadro.
- **As dicas de "próximo passo"** (pulso no próximo botão, seta que balança, porta entre seções) chamam atenção 3 vezes e param, em vez de pulsar para sempre.
- **O ponto "ao vivo"** nasce de 90% do tamanho, e não de zero.

### Removido
- Movimento decorativo sem propósito: as manchas de luz que derivavam, os brilhos que "respiravam" no Hero e nos Investidores, e as ilustrações dos Casos de Uso flutuando.

### Corrigido
- No celular, o toque deixava botões e cartões "levantados" (o hover ficava preso). O deslocamento do hover agora só vale com mouse.
- Com o Hero fora da tela, as animações dele (portas, medidores, pulsos, barras) ficam pausadas.

### Observação
- É MINOR porque só muda como as coisas se movem; conteúdo, âncoras e classes continuam iguais.
- Bateria de testes: 119/119, com 7 testes novos:
  - o clique afunda o botão para 97%;
  - as setas trocam o passo sem animação e o clique anima em 220ms;
  - a barra usa `transform`;
  - as dicas param depois de 3 pulsos;
  - nenhuma mancha deriva;
  - o Hero pausa fora da tela;
  - a página não tem erros JS.

## [3.0.0] — 2026-10-20 · MAJOR

O site passa a ser feito com **Next.js + React** e chega à versão final do redesenho (a "v5"): a página inteira é reorganizada, com uma intro interativa e seções recompostas.

### Adicionado
- **Intro interativa**: ao abrir o site, um processador quântico (criostato gelado com o chip no fundo) aparece por cima da página. É só tocar nele para "iniciar o processamento" e entrar no site, ou clicar em "Pular". Com "reduzir movimento" ou sem JavaScript, a intro não aparece.
- **Jornada em uma frase**: "Em 4 passos: Gire, Meça, Interfira e Compare." Os passos são as próprias palavras da frase, e um numeral grande em itálico marca o passo atual.
- **Comparativo em tela cheia**: o gráfico ocupa a seção, os tempos do clássico e do quântico flutuam junto das curvas, e uma legenda explica as duas.
- **Mercado como conversa**: uma pergunta por vez, com as opções dentro da frase ("vai valer US$ 12 milhões, US$ 120 milhões ou US$ 1,2 bilhão?"), a resposta com escala visual e "Próxima" para seguir.
- **Casos de Uso com escalas visuais**, **Demonstração** com as abas ao lado do título, **Roadmap** com um fio que liga as etapas e **Investidores** com o formulário em forma de frase ("Meu nome é ___, falo por ___ e quero investir ___").
- **Seções conectadas**: as dicas "A seguir" viram uma porta quântica entre uma seção e a próxima, e o terminal da API envia a requisição ao clicar em "Enviar".

### Alterado
- **Estrutura**:
  - `index.html`, `style.css` e `script.js` deram lugar a um app Next.js (App Router), gerado como site estático (`output: 'export'`, pasta `out/`).
  - Uma seção por componente, em `components/sections/`.
  - A **Demonstração ao vivo** é React de verdade (`components/demo/`), com estado próprio em cada aba e a simulação em `sim.js`.
  - Os demais comportamentos (intro, interlúdios, qubits, campo de pontos, formulário) ficam em `lib/legacy.js`, ligados por `components/LegacyBehaviors.jsx`.
- **Fontes** (Sora, JetBrains Mono e Instrument Serif) servidas pelo próprio site via `next/font`, sem chamada ao Google Fonts.
- **Mídia** em `public/`. O `vercel.json` declara o framework Next.js.

### Corrigido em relação ao redesenho de referência
- **Sem JavaScript**, nada fica invisível: entradas, Hero, circuito e gráfico do Comparativo já vêm visíveis e desenhados. A Demonstração mostra um aviso no lugar dos controles, e a intro some.
- **Menu mobile**:
  - fecha com Esc, devolvendo o foco ao botão, e também com um clique fora;
  - volta fechado ao passar para o desktop;
  - com o menu aberto, Tab vai para os links (o botão vem depois do menu no HTML).
- **Campo de pontos**: só anima com o Hero ou os Investidores na tela. Parado no meio do conteúdo, não gasta nenhum quadro.
- **Rodapé**: voltam os links do projeto (GitHub e Facens) e os de Jornada, Mercado, Demo e Roadmap.
- **Âncoras antigas** (`#comparativo`, `#cta-final`, `#rodape`) mantidas como apelidos, para links já compartilhados.
- **Esferas de Bloch**: os rótulos não saem mais cortados na borda da tela.

### Observação
- É MAJOR porque muda a estrutura do site, o modo de construir (Next.js + React) e a composição das seções.
- Para rodar localmente: `npm install`, depois `npm run dev` (desenvolvimento, com webpack) ou `npm run build` (site estático em `out/`).
- Bateria de testes: 112/112, contra o build servido por HTTP:
  - os testes genéricos (larguras de tela, sem JS, teclado, toque, "reduzir movimento", acessibilidade, formulário);
  - 24 testes novos das seções desta versão: intro, Jornada, Comparativo, quiz, Casos de Uso, Demonstração, Roadmap, qubits, interlúdios, campo de pontos e versão sem JS.
- No modo de desenvolvimento, onde o React monta cada componente duas vezes, a página fica idêntica ao build: nenhum elemento duplicado e nenhum erro.

## [2.9.1] — 2026-10-20 · PATCH

### Corrigido
- Os textos das esferas de Bloch decorativas saíam cortados na borda da tela:
  - o "θ = … · φ = …" da esfera dos Investidores, à esquerda, em todas as larguras até 1440px;
  - o rótulo |+⟩ da esfera do Mercado, à direita, a partir de 1280px.

  As esferas agora param numa margem que mantém os textos inteiros. No celular, onde elas ficam pequenas e meio fora da tela de propósito, os rótulos saem.

### Observação
- É PATCH porque só corrige a posição de um elemento decorativo.
- Bateria de testes: 161/161, com 1 teste novo: nenhum texto das esferas sai da tela, de 390 a 1920px. Ele falha no código da 2.9.0 e passa no da 2.9.1.

## [2.9.0] — 2026-10-20 · MINOR

Esta é a versão-alvo do roteiro: o site chega à forma visual e funcional planejada.

### Adicionado
- **Campo de pontos**: um céu de pontos finos em canvas atrás da página inteira, em três tons (branco, azul e violeta). Atrás do Hero e dos Investidores, os pontos formam "dunas" onduladas, mais densas e brilhantes. Nas seções de conteúdo, o céu cai para 42% de intensidade, para não competir com o texto.
- **Parallax em 3 planos** no Hero:
  - plano 1: os pontos andam a 35% da velocidade da rolagem;
  - plano 2: o conteúdo;
  - plano 3: as manchas de luz sobem mais rápido que o texto, enquanto o circuito e o painel de medição ficam para trás.
- **Brilhos saturados**: uma mancha violeta-azul forte no centro do Hero e uma maior atrás do cartão dos Investidores, que "respiram" devagar. A dos Investidores também sobe mais rápido que o conteúdo.
- **Rótulos técnicos em fonte mono** (JetBrains Mono, maiúsculas espaçadas, com um traço antes) em todas as seções e interlúdios. Os títulos ficam em branco puro.

### Desempenho
- No modelo de referência, o canvas redesenhava a cada quadro, sem parar. Aqui:
  - os pontos só cintilam enquanto o Hero ou os Investidores estão na tela, a no máximo ~30 quadros por segundo;
  - no resto da página o canvas só é redesenhado quando a página rola, e parado não gasta nenhum quadro.
- Os pontos são agrupados por cor: o canvas troca de cor só 3 vezes por quadro.
- O céu é refeito quando a página muda de altura (respostas que abrem, fontes que carregam) ou de largura.
- Medido no Chromium sem GPU: a mesma taxa de quadros da 2.8.0, tanto no Hero quanto no meio da página.

### Acessibilidade
- Com "reduzir movimento": os pontos acompanham a rolagem na mesma velocidade do conteúdo, não cintilam e não há parallax nem manchas se movendo.
- O canvas é decorativo (`aria-hidden`) e não pega cliques.

### Observação
- É MINOR porque só acrescenta camadas visuais e muda a aparência dos rótulos. Âncoras, ids e classes continuam iguais.
- Bateria de testes: 160/160, com 6 testes novos:
  - o canvas desenhado;
  - cintilando no Hero e parado no meio da página;
  - os fatores do parallax;
  - os rótulos mono;
  - a página sem erros JS;
  - "reduzir movimento".
- O teste do glossário passou a esperar a entrada da seção terminar antes do hover, e a dar mais folga à transição.

## [2.8.0] — 2026-10-20 · MINOR

### Adicionado
- **Profundidade no Hero**:
  - O painel "Medição" ganhou uma camada própria, nítida e opaca por cima do circuito desfocado, com contorno violeta e um brilho que "respira". A barra vencedora (|10⟩) também brilha.
  - Pulsos de luz correm pelos 5 fios do circuito, dois por fio, cada um no seu ritmo.
  - Os 5 medidores piscam devagar, cada um num ritmo diferente.
  - Duas manchas de luz: uma ampla no fundo e uma atrás do título, que se move devagar.
  - O título ganhou branco puro e um halo violeta suave.
- **Brilho nos botões principais** (os dois do Hero e o "Solicitar Acesso ao Data Room"): um ponto de luz segue o cursor sobre o botão.
- **Resposta ao clique** em todos os botões primários e secundários: o botão "afunda" para 97% enquanto é pressionado.
- **Grão de filme** por cima da página, bem sutil (7%), em telas a partir de 901px.

### Desempenho
- Com o Hero fora da tela, as animações dele (portas, medidores, pulsos, barras e brilhos) ficam pausadas.
- O grão fica fora do celular: um `mix-blend-mode` em tela cheia pesa em GPU fraca.
- O brilho que segue o cursor só existe com mouse; no toque não há hover.

### Acessibilidade
- Com "reduzir movimento", não há pulsos, medidores piscando nem manchas se movendo.
- O grão e as manchas não pegam cliques (`pointer-events: none`).
- No celular, o painel de medição fica a 40% para não competir com o texto do Hero.
- O texto "Backed by…" continua com 60% de opacidade, e não 46% como no modelo de referência: com 46%, o contraste ficaria abaixo de 4,5:1.

### Observação
- É MINOR porque só acrescenta camadas visuais. Âncoras e classes existentes continuam iguais (`.gate--meter` passou a agrupar os 5 medidores `.mq`).
- Bateria de testes: 154/154, com 5 testes novos:
  - a camada do painel e os 10 pulsos;
  - a pausa com o Hero fora da tela;
  - o brilho seguindo o cursor sem o grão bloquear o clique;
  - a página sem erros JS;
  - o grão só em telas largas e "reduzir movimento".

## [2.7.0] — 2026-10-20 · MINOR

### Adicionado
Três **interlúdios**: pausas visuais entre as seções, cada um com uma ilustração animada em SVG.
- **"Mais frio que o espaço sideral."** (depois da Jornada): um criostato com 5 andares e o chip no fundo. Os andares acendem do mais quente ao mais frio, de 300 K a 15 mK (≈ −273,14 °C), com pulsos de sinal descendo pelos cabos.
- **"Cada ponto, um qubit."** (depois dos Casos de Uso): um chip com 20 qubits em grade. Portas lógicas (CNOT, CZ, iSWAP) acendem a ligação entre dois qubits vizinhos, e um contador mostra quantas já rodaram.
- **"Da sua tela ao qubit e de volta."** (depois da Demonstração): o caminho de uma requisição, da empresa à IA SynapseQ e ao QPU, e a volta, com o tempo subindo até 340 ms.

### Acessibilidade
- Cada animação roda **uma vez** ao entrar na tela, em menos de 5 segundos, e para no estado final. Ela recomeça se o bloco sair e voltar para a tela. No modelo de referência elas giravam sem parar. Assim não é preciso botão de pausa (WCAG 2.2.2), e nada fica se mexendo enquanto a pessoa lê o resto da página.
- O estado final já vem escrito no HTML (15 mK, 20 qubits / 31 conexões, 340 ms). É o que aparece com "reduzir movimento" e sem JavaScript. Sem JS, as ilustrações (que dependem do script) saem e fica só o texto.
- As ilustrações são decorativas (`aria-hidden`). O fluxo é uma lista ordenada com as três etapas, para quem usa leitor de tela.

### Observação
- É MINOR porque só acrescenta blocos entre as seções. As âncoras e a ordem das dicas "A seguir" continuam as mesmas.
- O ícone da IA no fluxo tem o próprio degradê, em vez de depender do degradê do logo no header.
- Bateria de testes: 149/149, com 5 testes novos:
  - o criostato esfria e para;
  - o chip roda 12 portas e para;
  - o fluxo faz uma passada e termina em 340 ms;
  - a página sem erros JS;
  - "reduzir movimento" e sem JS já no estado final.

## [2.6.0] — 2026-10-20 · MINOR

### Adicionado
- **Tipografia de destaque**: em cada título, uma palavra-chave aparece em Instrument Serif itálica com o degradê azul-violeta da marca. Por exemplo: "na velocidade do *impossível*", "Entenda o quântico em *um minuto*", "O mercado quântico já é *real*", "De protótipo a *produção*". São 14 no total (Hero, títulos de seção e títulos dos passos da Jornada).
- Token `--fonte-destaque` ("Instrument Serif", com Georgia de reserva) e a fonte no link do Google Fonts, só no corte itálico usado.

### Alterado
- Títulos de seção maiores e mais justos: de `clamp(30px, 4vw, 52px)` para `clamp(34px, 4.8vw, 66px)`, com entrelinha 1,04.
- Títulos dos passos da Jornada, dos Casos de Uso e das perguntas do Mercado acompanham a nova escala.

### Observação
- É MINOR porque só muda a aparência dos títulos; o texto, as âncoras e as classes continuam os mesmos. A palavra-chave fica num `<span class="kw">` dentro do próprio título, então leitores de tela leem a frase inteira normalmente.
- Bateria de testes: 144/144, com 1 teste novo: as 14 palavras-chave ficam só em títulos, usam a fonte certa, não saem da tela em 390px e não deixam espaços estranhos no texto do título.

## [2.5.0] — 2026-10-20 · MINOR

### Adicionado
- **Fios de qubit** no topo de cada seção, da Jornada aos Investidores. Cada fio mostra uma porta quântica e o nome da operação (|0⟩ preparação, H Hadamard, CNOT, Rz, U(β, γ), SWAP, T e medição). Ao entrar na tela, a linha cresce e a porta acende, como um circuito percorrido ao longo da página.
- **Esferas de Bloch** decorativas atrás do Mercado e dos Investidores. O vetor do estado gira com a rolagem da seção e mostra os ângulos θ e φ.
- **Registrador de qubits** fixo na lateral direita, em telas a partir de 1360px. Ele mostra 5 qubits que mudam de estado com a rolagem e a porta da seção atual; no fim da página, os qubits são "medidos" e ficam só em |0⟩ e |1⟩.
- **Glossário**: 15 termos técnicos (qubit, superposição, medição, shots, interferência, Quantum Annealing, QAOA, VQE, Grover, QPU…) ficam sublinhados e mostram uma explicação curta no hover, no foco pelo teclado ou ao tocar.
- Fundo de ondas de interferência atrás do Comparativo, que se desloca de leve com a rolagem.

### Acessibilidade
- A explicação de cada termo é um elemento de verdade (`role="tooltip"`), ligado ao termo por `aria-describedby`. Leitores de tela leem a explicação quando o termo recebe foco.
- Esc fecha a explicação aberta (WCAG 1.4.13); tocar fora fecha no celular.
- Perto das bordas da tela, a caixa da explicação é empurrada para dentro e nunca sai da tela, mesmo em 320px.
- Fios, esferas e registrador são decorativos (`aria-hidden`).
- Sem JavaScript ou com "reduzir movimento", os fios já aparecem completos e o glossário continua funcionando só com CSS. Com "reduzir movimento", as esferas não precessam e o fundo de ondas fica parado.

### Desempenho
- As esferas de Bloch só animam enquanto estão na tela: o laço de animação para quando as duas saem de vista.
- O registrador e o fundo de ondas se atualizam no máximo uma vez por quadro durante a rolagem. Em telas estreitas, onde o registrador fica escondido, ele não calcula nada.

### Observação
- É MINOR porque só acrescenta elementos; nenhuma âncora, classe ou id existente mudou.
- No texto da Demonstração sobre VQE, a explicação de "precisão química" saiu da frase e foi para o glossário.
- Bateria de testes: 143/143, com 8 testes novos:
  - fios acesos nas 8 seções;
  - a esfera girando;
  - o registrador e a medição no fim da página;
  - o glossário: hover, Esc, ligação ao termo, caixas dentro da tela em 320px e a versão sem JS;
  - a página sem erros JS.

## [2.4.0] — 2026-10-20 · MINOR

### Adicionado
- **Comparativo** (`#tecnologia`), agora "Quanto maior o problema, maior a vantagem.":
  - Um controle deslizante muda o tamanho do problema, de 10 a 60 variáveis.
  - O tempo da IA clássica e o da SynapseQ aparecem em unidades do dia a dia (milissegundos, dias, mil anos).
  - O marcador do gráfico acompanha o controle e mostra quantas vezes o quântico é mais rápido.
  - Com problemas pequenos, a página admite que o clássico vence.
- **Mercado** (`#mercado`), agora "O mercado quântico já é real.": os 4 números viram palpites. Cada card tem 3 opções; depois do palpite, a resposta certa fica destacada, junto com o número, uma explicação simples e a fonte. No fim aparece o placar.
- **Casos de Uso** (`#casos-de-uso`), agora "Qual desafio é o seu?":
  - Três escolhas (carteira de investimentos, molécula para remédio, busca em milhões de registros) abrem um painel com a ilustração, um "Para ter ideia" e a comparação clássico × SynapseQ.
  - O botão "Testar na demo" leva à Demonstração já na aba do algoritmo certo.
- As dicas "A seguir" que apontam para essas três seções passam a descrever as interações novas.

### Acessibilidade
- O veredito do Comparativo é anunciado só quando o controle para, e não a cada passo arrastado.
- Os palpites usam `aria-disabled` em vez de `disabled`: depois de responder, o foco continua no botão clicado. O resultado de cada palpite é anunciado para leitores de tela.
- As escolhas dos Casos de Uso são abas no padrão das outras (setas ←/→, Home e End).
- O rótulo do gráfico ganhou contorno da cor do fundo e continua legível quando o marcador passa por baixo dele.
- Sem JavaScript:
  - o Comparativo mostra os valores de 30 variáveis, já escritos no HTML;
  - o Mercado mostra as 4 respostas, sem opções;
  - os Casos de Uso mostram os 3 painéis empilhados. O painel do Grover dispensa o quadro, que precisaria do JS para ser montado.
  - "Testar na demo" é um link para `#demo` e funciona mesmo assim.

### Removido
- Os cards "IA Clássica" e "SynapseQ" do Comparativo, a grade de 4 números do Mercado e os 3 cards fixos dos Casos de Uso. O conteúdo deles continua nas versões interativas.
- As classes que só esses blocos usavam (`compare-card*`, `badge`, `market__grid`, `stat`, `stat__desc`, `cases__grid`, `case`, `case__visual`, `case__title`, `case__text`).

### Observação
- É MINOR porque as âncoras e ids de seção continuam os mesmos (`#tecnologia`, `#comparativo`, `#mercado`, `#casos-de-uso`, `#grover`). As classes removidas eram internas dessas seções, não do design system (`card-glass`, botões, `section`).
- Bateria de testes: 135/135, com 5 testes novos: o controle do Comparativo, os palpites (um por card, o foco e o placar), as escolhas com teclado e o "Testar na demo", a página sem erros e a versão sem JS. O teste do Grover passou a abrir a escolha "Grover" antes.

## [2.3.0] — 2026-10-20 · MINOR

### Adicionado
- Seção **Jornada** (`#simples`), "Entenda o quântico em um minuto.", logo depois do Hero. São 4 passos em abas, e cada um se completa com uma ação:
  - **Gire**: uma moeda 3D mostra a diferença entre bit (parada) e qubit (girando, 0 e 1 ao mesmo tempo).
  - **Meça**: medir 1 vez dá um resultado só; medir 1.000 vezes monta o histograma de ~50% para cada lado.
  - **Interfira**: arrastar a onda 2 mostra a soma das ondas crescendo ou se anulando.
  - **Compare**: 120 pontos representam as 2.520 rotas entre 8 cidades. O jeito clássico testa uma a uma; o quântico filtra todas de uma vez e destaca a melhor.
- Cada passo completo ganha um ✓ na aba, enche a barra de progresso e mostra a explicação com um botão para o passo seguinte.
- Link "Comece aqui: gire um qubit" no pé do Hero, levando à Jornada.
- Dicas **"A seguir"** no fim de cada seção, da Jornada ao Roadmap, cada uma levando à seção seguinte.
- Link "Jornada" no rodapé.

### Acessibilidade
- As abas seguem o padrão WAI-ARIA: `aria-controls` ligando aba e painel, setas ←/→ (com volta), Home e End. O botão "Próximo" leva o foco junto para a aba nova.
- A cena da esquerda é decorativa (`aria-hidden`). O resultado de cada ação (moeda girando, contagem das medições, rota encontrada) é anunciado numa região `aria-live`.
- A mensagem das ondas só muda quando a faixa muda (alinhadas, no meio, opostas), para o leitor de tela não anunciar cada grau arrastado.
- O controle deslizante tem rótulo visível ("Deslocamento da onda 2").
- Sem JavaScript, os 4 passos aparecem como texto corrido, com as explicações, sem abas nem botões que não funcionariam.
- Com "reduzir movimento", as medições e as rotas mostram o resultado na hora, e a moeda e as dicas não pulsam.

### Mantido de propósito
- O link "Jornada" fica só no rodapé. Com 7 links, o menu do topo não cabe ao lado do botão "Portal do Investidor" em nenhuma largura de desktop. A Jornada já é a primeira seção depois do Hero e tem o link "Comece aqui".
- Os textos das dicas que apontam para Comparativo, Mercado e Casos de Uso descrevem o conteúdo atual dessas seções. Eles mudam quando as seções ganharem slider, palpites e escolha (2.4.0).
- As funções de preencher o controle deslizante e de navegar pelas abas com o teclado, antes só da Demonstração, agora são compartilhadas entre a Demonstração e a Jornada.
- Nenhuma âncora, classe ou id existente mudou.

### Observação
- É MINOR porque só acrescenta uma seção, dicas e links, sem quebrar nada.
- Bateria de testes: 130/130, com 13 testes novos (os 4 passos completos com mouse, as 120 rotas do jeito clássico, abas no teclado, sem JS, "reduzir movimento", abas a 320px, a ordem das dicas, o atalho do Hero em 4 tamanhos de tela e a âncora `#simples`).

## [2.2.1] — 2026-10-20 · PATCH

### Corrigido
- Header entre 1081 e ~1120px: o botão "Portal do Investidor" passava até 14px da margem direita do conteúdo e ficava colado na borda da janela. Nessa faixa, o espaço entre logo, menu e botão também diminui (de 24 para 16px), e o espaço entre os links vai de 18 para 16px.

### Observação
- É PATCH porque só ajusta espaçamento, sem mudar âncoras, classes nem conteúdo.
- O teste da 2.2.0 só conferia se a página rolava para o lado, e o botão ainda cabia na janela. O teste novo confere se ele fica dentro do container em 7 larguras, de 1081 a 1920px.
- Bateria de testes: 117/117.

## [2.2.0] — 2026-10-20 · MINOR

### Adicionado
- Seção **Roadmap** (`#roadmap`), "De protótipo a produção.", entre Quantum Engineering e Investidores. Uma linha do tempo com 5 etapas, de Q1 2026 a 2028, cada uma com data, descrição e selo de status (Concluído, Em andamento ou Planejado).
- A linha fica acesa até a etapa atual. As etapas planejadas aparecem esmaecidas.
- Ao entrar na tela, a linha cresce da esquerda para a direita e cada ponto acende quando ela chega. Os cards aparecem junto com os pontos, alternando entre cima e baixo da linha.
- No celular e em telas de até 1080px, a linha do tempo fica na vertical, com os cards empilhados.
- Link "Roadmap" no menu e no rodapé.

### Acessibilidade
- As etapas formam uma lista ordenada (`<ol>`), e a etapa atual é marcada com `aria-current="step"`.
- Com "reduzir movimento", não há deslocamento nem escala: os cards só aparecem com fade.
- Sem JavaScript, o roadmap já aparece completo, com a linha desenhada.

### Mantido de propósito
- A animação é feita só com CSS (transições em sequência). O JS apenas avisa quando a seção entra na tela, sem bibliotecas externas.
- A linha é desenhada pelo próprio CSS do grid e cai sempre na altura dos pontos. Nenhum cálculo de posição em JS, nem ao redimensionar a janela.
- Nenhuma âncora, classe ou id existente mudou.

### Observação
- É MINOR porque só acrescenta uma seção e um link no menu, sem quebrar nada.
- Entre 1081 e 1180px, o espaço entre os links do menu diminui um pouco para os 6 links caberem ao lado do botão "Portal do Investidor".
- Bateria de testes: 110/110, com 7 testes novos para o roadmap (pontos alinhados à linha, entrada completa, linha vertical no celular, sem JS, "reduzir movimento" e a âncora `#roadmap`).

## [2.1.0] — 2026-10-18 · MINOR

### Adicionado
- Seção **Demonstração ao vivo** (`#demo`), "Rode. Meça. Veja convergir.", entre Casos de Uso e Quantum Engineering. Um laboratório com três abas, uma para cada algoritmo dos casos de uso, com controles, botão "Executar" e gráfico animado:
  - **QAOA · Portfólio:** ativos no universo (6 a 16) e camadas do circuito (1 a 6). O gráfico mostra a distribuição das 1.024 medições até uma carteira se destacar, com os ativos escolhidos marcados.
  - **Grover · Busca:** tamanho da base (16 a 4.096 registros). A barra do registro certo cresce a cada iteração, com a média tracejada, até o ponto ótimo de ⌊π/4 · √N⌋ iterações.
  - **VQE · Molécula:** H₂, LiH ou BeH₂ e profundidade do ansatz (1 a 4). O erro de energia cai a cada iteração, em escala log, até passar (ou não) da precisão química de 1,6 mHa.
- Cada painel mostra quatro números ao lado do gráfico (espaço de busca, chance de acerto, energia estimada etc.). A primeira simulação roda sozinha quando a seção entra na tela, e cada aba roda na primeira vez em que é aberta.
- Link "Demo" no menu e no rodapé.
- Aviso de que a simulação é ilustrativa e roda no navegador, não em hardware quântico.

### Acessibilidade
- Abas no padrão WAI-ARIA: setas ←/→, Home e End trocam de aba; só a aba ativa entra no Tab.
- Todos os controles deslizantes têm rótulo. O de registros anuncia o valor real ("256 registros"), não o expoente.
- O estado de cada simulação ("Executando", "Medido") é anunciado por leitores de tela. A escolha da molécula usa botões com `aria-pressed`.
- Com "reduzir movimento", as simulações vão direto ao resultado, sem animação.

### Mantido de propósito
- Sem JavaScript o laboratório não funcionaria; no lugar dele aparece um aviso pedindo para ativar o JS. O resto da página continua visível (correção da 1.2.1).
- Nenhuma âncora, classe ou id existente mudou.

### Observação
- É MINOR porque só acrescenta uma seção e um link no menu, sem quebrar nada.
- No celular, o gráfico é desenhado na largura real da tela para o texto continuar legível, e as três abas ficam lado a lado.
- Com LiH e BeH₂ a convergência foi calibrada para depender da profundidade: H₂ chega à precisão química a partir da profundidade 2, LiH a partir da 3 e BeH₂ só na 4.
- Bateria de testes: 103/103, com 13 testes novos para a demonstração (abas e teclado, cada algoritmo, botão travado durante a execução, sem JS, "reduzir movimento" e legibilidade no celular).

## [2.0.0] — 2026-10-17 · MAJOR

Nova estrutura para o site, com as mesmas 5 seções e o mesmo conteúdo. As correções das versões anteriores foram mantidas.

### Mudou (incompatível)
- **Classes no padrão BEM** (`bloco__elemento--variação`), com nomes novos. Exemplos: `.header` → `.site-header`, `.nav` → `.site-nav`, `.hero-content` → `.hero__content`, `.comparativo` → `.compare`, `.mercado-card` → `.stat`, `.caso-card` → `.case`, `.api-benefit` → `.feature`, `.cta-form` → `.form`, `.footer` → `.site-footer`. Todas as seções seguem o padrão `.section` + `.section-head` + `.container`.
- **Âncoras novas:** `#comparativo` → `#tecnologia`, `#api-mockup` → `#quantum-engineering`, `#cta-final` → `#investidores`. O topo da página passa a ser `#topo`.
- Header com 72px de altura (antes 80px) e novo token `--header-h`.

### Adicionado
- Entrada do Hero em sequência (rótulo, título, subtítulo, botões e investidores), com a palavra "impossível" revelando o degradê.
- Circuito do Hero redesenhado: 5 qubits, portas H, CNOT e Rz, medidores e painel de medição com barras que "colapsam".
- Gráfico de complexidade com grade, pontos em n = 50 e destaque "312.000× mais rápido".
- Comparativo com rótulo e linha de escala em cada card (Exponencial × Polinomial).
- Ilustrações novas nos casos de uso (grafo do QAOA, molécula e curva de energia do VQE) e linhas "Clássico × SynapseQ".
- Terminal com cores de sintaxe e barra de título.
- Formulário em duas colunas com rótulos visíveis (antes só placeholder) e novas faixas de investimento.
- Token `--ease` (curva de animação padrão).

### Mantido de propósito
- **As âncoras antigas continuam funcionando:** `#comparativo`, `#api-mockup`, `#cta-final`, `#hero` e `#rodape` levam à seção certa, para não quebrar links já compartilhados.
- Conteúdo visível sem JavaScript (correção da 1.2.1). Agora isso vale também para a entrada do Hero e para o gráfico, que já vem desenhado no HTML.
- Comportamento do menu mobile (1.2.1): Esc devolve o foco, clique fora fecha, Tab entra nos links.
- Validação do formulário da 1.3.0, com os mesmos campos (`lead-*`).
- Links da Facens e do GitHub no rodapé.

### Corrigido
- Menu mobile translúcido: o título do Hero aparecia por trás dos links. Agora o painel é opaco.
- Ao abrir o menu pelo teclado, o painel ainda estava invisível no instante do Tab. Agora aparece na hora.
- Botões "tremiam" com o cursor na borda inferior (o hover sobe o botão 2px e o cursor saía dele). A área de hover foi estendida.
- Os rótulos "n = 50" e "n (variáveis)" do gráfico se sobrepunham.
- O botão "Portal do Investidor" perdia o nome acessível no celular, onde o texto é escondido.
- Sem JavaScript, o botão do menu aparecia no celular sem funcionar. Agora fica escondido, e a navegação continua pelos links do rodapé.

### Observação
- É MAJOR porque muda os nomes das classes e das âncoras principais, ou seja, o "contrato público" do site.
- Bateria de testes: 90/90. Os seletores do `qa.py` foram atualizados para os nomes novos, e entraram testes para o Hero e o gráfico sem JS e para a âncora antiga `#cta-final`.

## [1.3.0] — 2026-10-16 · MINOR

### Adicionado
- Validação do formulário de investidores, com a mensagem de erro logo abaixo de cada campo (`.field__error`):
  - **Nome:** pede nome e sobrenome (pelo menos duas palavras).
  - **E-mail:** precisa ter formato válido e ser corporativo. Provedores gratuitos (Gmail, Hotmail, Outlook, Yahoo, iCloud, UOL, BOL e outros) são recusados.
  - **Fundo / Empresa:** pelo menos 2 caracteres.
  - **Faixa de investimento:** precisa ser escolhida.
- Ao enviar com erro, o foco vai para o primeiro campo inválido e os campos com problema recebem `aria-invalid`. O erro some assim que o valor é corrigido.
- Ao sair de um campo já preenchido, ele é validado na hora. Passar pelos campos vazios com Tab não acusa erro.
- A mensagem de sucesso (`#form-success`) aparece dentro de uma região `aria-live` que já existe na página, para que leitores de tela anunciem o envio.
- Tokens `--erro` e `--erro-glow` no design system, para o estado de erro dos campos.

### Corrigido
- Campos preenchidos só com espaços eram aceitos. Agora contam como vazios.

### Observação
- É MINOR porque acrescenta uma funcionalidade nova sem mudar links, âncoras ou classes que já existiam. Os campos ganharam um `<div class="field">` em volta, e os ids e `name` continuam os mesmos.
- Sem JavaScript, o formulário continua usando o `required` do próprio navegador.

## [1.2.1] — 2026-10-15 · PATCH

Correções encontradas numa bateria de 87 testes isolados (14 larguras de tela, JS desligado, "reduzir movimento", toque, teclado e formulário).

### Corrigido
- Com o JavaScript desligado, 28 blocos de conteúdo ficavam invisíveis e o gráfico de complexidade aparecia vazio. Agora as animações de entrada só escondem o conteúdo quando o JS está ativo (classe `js` no `<html>`), e o gráfico já vem desenhado no HTML.
- O parallax do Hero apagava o efeito de escala da rolagem, porque os dois sobrescreviam o mesmo `transform`. Agora os dois efeitos são combinados.
- Com "reduzir movimento" ativado, o Hero ainda encolhia ao rolar. Agora só a opacidade muda.
- Menu mobile: a tecla Tab pulava os links do menu aberto, o Esc não devolvia o foco ao botão e clicar fora não fechava o menu.
- Rolagem horizontal em telas de 320px e 360px (rodapé e cabeçalho).
- Os campos do formulário tinham só placeholder e nenhum rótulo para leitores de tela. A mensagem de sucesso não era anunciada.
- Faltava a meta description da página.

### Observação
- É PATCH porque só corrige comportamento. Âncoras e classes que já existiam continuam iguais.
- Campos preenchidos só com espaços ainda são aceitos. Isso entra na validação do formulário da 1.3.0.

## [1.2.0] — 2026-10-15 · MINOR

### Adicionado
- Menu mobile: em telas de até 900px aparece um botão (ícone de três linhas que vira X) que abre e fecha o painel de navegação.
- O painel fecha ao escolher um link, ao apertar Esc ou ao voltar para o layout de desktop.
- Acessibilidade do botão: `aria-expanded`, `aria-controls` e rótulo que alterna entre "Abrir menu" e "Fechar menu".

### Corrigido
- Em telas pequenas o menu simplesmente sumia (`display: none`) e o botão "Portal do Investidor" apertava a logo. Agora o cabeçalho cabe em 390px.
- O `scroll-margin-top` das seções passou de 72px para 88px, porque o cabeçalho tem 80px de altura.

### Observação
- É MINOR porque acrescenta uma funcionalidade nova (o menu mobile) sem mudar links, âncoras ou classes que já existiam.

## [1.1.1] — 2026-10-15 · PATCH

### Corrigido
- As curvas do gráfico de complexidade eram desenhadas à mão e não representavam as funções O(2ⁿ) e O(√n). Agora são calculadas em `script.js` a partir das fórmulas.
- O marcador "n = 50" ficava em uma posição que não correspondia a n = 50 no eixo. Foi reposicionado.

### Observação
- É PATCH porque o gráfico continua no mesmo lugar, com o mesmo visual e as mesmas classes. Só o cálculo das curvas mudou.

## [1.1.0] — 2026-10-15 · MINOR

### Adicionado
- Seção "O mercado já está em escala" (`#mercado`), entre o Comparativo e os Casos de Uso, com quatro cartões de dados e a fonte de cada um: IQT Research (US$ 1,2B em QRNG até 2028), TBRI sobre IBM Quantum (+410.000 usuários e +3,5 bilhões de execuções por dia) e Quantinuum (99,914% de fidelidade em portas de 2 qubits).
- Aviso de transparência: ainda não há demonstração pública de vantagem quântica prática em otimização combinatorial.
- Layout responsivo: 4 colunas no desktop, 2 no tablet e 1 no celular.

### Observação
- É MINOR porque só acrescenta uma seção. Nenhum link, âncora ou classe existente mudou.

## [1.0.1] — 2026-10-15 · PATCH

### Corrigido
- Links do menu, do cabeçalho e do rodapé apontavam para páginas que não existem (`Tecnologias.html`, `QuantumEngineering.html`, `CasosdeUso.html`, `Investidores.html`, `Portal.html`, `Perfil.html`, `Creditos.html`) e davam erro 404. Agora levam às seções da própria página.
- Ao clicar num link do menu, o título da seção não fica mais escondido atrás do cabeçalho fixo.

### Observação
- As âncoras existentes (`#api-mockup`, `#cta-final`) foram mantidas. Foram acrescentadas `#hero`, `#comparativo`, `#casos-de-uso` e `#rodape`.

## [1.0.0] — 2026-10-08 · MAJOR (primeira versão estável)

Primeira versão completa e utilizável do site.

### Adicionado
- Cinco seções no conteúdo principal: Hero, Comparativo de Tecnologia, Casos de Uso, Mockup de API e CTA Final.
- Circuito quântico animado no Hero, gráfico de complexidade, grade de busca do Grover e terminal com efeito de digitação.
- Parallax pelo cursor no Hero e suporte a `prefers-reduced-motion`.

## [0.1.1] — 2026-10-08 · PATCH

### Alterado
- Paleta e tipografia ajustadas para a identidade visual Qorvex (azul `#3B82F6`, roxo `#6B46FF`, fonte Sora). Nenhuma funcionalidade nova.

## [0.1.0] — 2026-10-08 · MINOR

### Adicionado
- Design system escuro com glassmorphism: novas variáveis de cor, botões e cartões.
- Primeiro JavaScript: elementos aparecem ao rolar a página, e o header muda depois da rolagem.

### Corrigido
- Link do GitHub no rodapé apontando para o repositório real.

## [0.0.2] — 2026-10-06 · PATCH

### Adicionado
- Pastas `images/` e `videos/` e arquivo da logo.

### Corrigido
- Caminho da imagem da logo no header.

## [0.0.1] — 2026-10-06

### Adicionado
- Estrutura inicial: header com navegação, área principal vazia e rodapé.
