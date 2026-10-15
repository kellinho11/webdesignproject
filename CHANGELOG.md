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
