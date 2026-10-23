# Segurança

O SynapseQ é um site estático: o build gera HTML, CSS, JS e mídia em `out/`, e a Vercel só entrega
esses arquivos. Não há servidor rodando código, banco de dados, login nem cookies. Por isso as
portas de ataque mais comuns não existem aqui. As que existem estão fechadas assim:

| Ataque | Como seria | O que impede |
|---|---|---|
| **XSS** (script injetado) | Um texto digitado vira HTML e roda como script | Nada que o visitante digita vira HTML (só `textContent` e texto do React, sem `innerHTML`). E, se algo passar, a CSP só deixa rodar os arquivos do próprio site e os scripts embutidos com o hash gravado no build (`scripts/csp.mjs`). |
| **Script de terceiros** | Uma CDN comprometida troca uma biblioteca | Nenhum script, fonte ou CSS vem de fora: tudo é servido pelo próprio site (`default-src 'self'`). As versões ficam fixas no `package-lock.json` e o Dependabot avisa quando sai correção. |
| **Clickjacking** | O site aparece num `<iframe>` invisível de outra página | `frame-ancestors 'none'` e `X-Frame-Options: DENY`. |
| **Rebaixamento para HTTP** | Alguém no meio da rede força a versão sem cadeado | HSTS de 2 anos (`Strict-Transport-Security`) e `upgrade-insecure-requests`. |
| **Janela aberta controlando o site** | Uma guia aberta por link troca o endereço da que abriu | Links externos com `rel="noopener noreferrer"`, o Glossário com `noopener`, e `Cross-Origin-Opener-Policy: same-origin`. |
| **Arquivo com tipo falso** | O navegador "adivinha" que um arquivo é script | `X-Content-Type-Options: nosniff`. |
| **Formulário abusado** | Texto gigante, caracteres invisíveis, opção inventada no DevTools, robô | `maxlength`, limpeza do texto (`lib/validate.js`), faixa só da lista, campo-isca para robôs e tempo mínimo de preenchimento. O formulário é uma demonstração: não envia nem guarda nada. |
| **Acesso a câmera, microfone etc.** | Um script tenta pedir permissões | `Permissions-Policy` nega todas. |

## SQL injection

SQL injection acontece quando o servidor monta uma consulta colando o texto do usuário dentro dela:

```js
// ERRADO: o nome "x'); DROP TABLE investidores; --" vira parte do comando
db.query(`INSERT INTO investidores (nome) VALUES ('${nome}')`);
```

Este site não tem banco nem servidor, então não existe consulta para atacar. Se o formulário passar
a enviar dados, a regra é uma só: **consulta parametrizada**. O texto vai separado do comando e o
banco nunca o lê como SQL, por mais aspas que ele tenha:

```js
// CERTO: o banco recebe o comando e os valores separados
db.query('INSERT INTO investidores (nome, fundo, email, faixa) VALUES ($1, $2, $3, $4)', [nome, fundo, email, faixa]);
```

Bloquear aspas no formulário **não** protege contra SQL injection (o atacante não usa o formulário,
manda a requisição direto) e ainda barra nomes reais como "O'Brien". As regras de `lib/validate.js`
cuidam de formato e tamanho, e devem ser repetidas no servidor.

## Conferir

- `qa.py` testa os cabeçalhos, a CSP por hash e o formulário com textos de ataque (T192–T194).
- Os cabeçalhos no ar: <https://securityheaders.com/?q=webdesignproject-nine.vercel.app>.
- Achou um problema? Abra um aviso privado em
  <https://github.com/kellinho11/webdesignproject/security/advisories/new>.
