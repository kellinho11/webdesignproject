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
