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
