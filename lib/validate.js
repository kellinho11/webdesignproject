// Regras do formulário dos investidores, sem DOM: dá para testar sozinhas e repetir no servidor no
// dia em que o formulário enviar dados (validar só no navegador não protege nada; quem ataca
// manda a requisição sem passar pelo JS).
// Aqui a validação cuida de formato e tamanho. Contra SQL injection a defesa é outra: consulta
// parametrizada no servidor (ver SECURITY.md); o texto nunca é colado dentro do SQL.
export const LIMITS = { name: 80, fund: 80, email: 254 };
export const RANGES = ['US$ 250k – 1M', 'US$ 1M – 5M', 'US$ 5M – 15M', 'Acima de US$ 15M'];
const WORD = "\\p{L}+(?:['’-]\\p{L}+)*\\.?";
const NAME = new RegExp(`^${WORD}(?: ${WORD})+$`, 'u');
const FREE = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com', 'bol.com.br', 'uol.com.br'];

// O que foi digitado, numa forma só: Unicode normalizado (NFC), sem caracteres de controle nem
// invisíveis, espaços simples e no máximo `max` caracteres.
export function clean(value, max = 254) {
  return String(value ?? '').normalize('NFC').replace(/[\p{Cc}\p{Cf}]/gu, '').replace(/\s+/g, ' ').trim().slice(0, max);
}

// Cada regra recebe o texto já limpo e devolve a mensagem de erro, ou '' quando está certo.
export const RULES = {
  // lista do que pode ter: letras de qualquer alfabeto, com apóstrofo ou hífen entre elas (O'Brien,
  // Ana-Lúcia) e ponto de abreviação (J. R.); pelo menos duas palavras
  name: (v) => {
    if (v.split(' ').length < 2) return 'Informe nome e sobrenome.';
    return NAME.test(v) ? '' : 'Use só letras, espaço, hífen e apóstrofo.';
  },
  fund: (v) => (/^[\p{L}\p{N}][\p{L}\p{N} &.,'()/-]{1,79}$/u.test(v) ? '' : 'Informe o fundo ou empresa.'),
  email: (v) => {
    const [user, domain = ''] = v.split('@');
    if (v.length > LIMITS.email || user.length > 64 || !/^[\w.+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(v)) return 'Informe um e-mail válido.';
    return FREE.includes(domain.toLowerCase()) ? 'Use seu e-mail corporativo.' : '';
  },
  // só as faixas da lista: uma opção inventada no DevTools não passa
  range: (v) => (RANGES.includes(v) ? '' : 'Selecione uma faixa.'),
};
