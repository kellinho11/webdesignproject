// Formulário dos investidores: valida no blur, revalida enquanto corrige e troca pelo aviso de sucesso.
import { $, $$ } from '../scope';

const FREE = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com', 'bol.com.br', 'uol.com.br'];
const RULES = {
  name: (v) => (v.trim().split(/\s+/).length >= 2 ? '' : 'Informe nome e sobrenome.'),
  email: (v) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Informe um e-mail válido.';
    return FREE.includes(v.trim().split('@')[1].toLowerCase()) ? 'Use seu e-mail corporativo.' : '';
  },
  fund: (v) => (v.trim().length >= 2 ? '' : 'Informe o fundo ou empresa.'),
  range: (v) => (v ? '' : 'Selecione uma faixa.'),
};

export default function form(scope) {
  const el = $('#investor-form'), success = $('#form-success');
  if (!el) return;
  const check = (input) => {
    const msg = RULES[input.name] ? RULES[input.name](input.value) : '';
    const field = input.closest('.field');
    field.classList.toggle('has-error', Boolean(msg));
    field.querySelector('.field__error').textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };
  const inputs = $$('input, select', el);
  inputs.forEach((input) => {
    scope.on(input, 'blur', () => check(input));
    scope.on(input, 'input', () => { if (input.closest('.field').classList.contains('has-error')) check(input); });
  });
  scope.on(el, 'submit', (e) => {
    e.preventDefault();
    const ok = inputs.map(check);
    const first = inputs[ok.indexOf(false)];
    if (first) { first.focus(); return; }
    el.hidden = true;
    success.hidden = false;
    success.setAttribute('tabindex', '-1');
    success.focus();
  });
}
