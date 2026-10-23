// Formulário dos investidores: valida no blur, revalida enquanto corrige e troca pelo aviso de sucesso.
// As regras ficam em lib/validate.js; aqui só a ligação com a página. O texto digitado só vai para
// comparações e para o próprio campo, nunca para HTML.
// Robôs: o campo-isca (.form__trap) preenchido ou um envio menos de 1,5 s depois do primeiro foco
// marca o envio como descartado. O aviso é o mesmo, para o robô não saber que foi barrado.
import { $, $$ } from '../scope';
import { clean, LIMITS, RULES } from '../validate';

const HUMAN_MS = 1500;

export default function form(scope) {
  const el = $('#investor-form'), success = $('#form-success');
  if (!el) return;
  const trap = $('.form__trap input', el);
  const set = $('.form__set', el);
  if (set) set.disabled = false;   // nasce desabilitado no HTML (ver Cta.jsx)
  const check = (input, tidy = false) => {
    const value = clean(input.value, LIMITS[input.name]);
    if (tidy && input.tagName === 'INPUT') input.value = value;
    const msg = RULES[input.name] ? RULES[input.name](value) : '';
    const field = input.closest('.field');
    field.classList.toggle('has-error', Boolean(msg));
    field.querySelector('.field__error').textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };
  let started = 0;
  scope.on(el, 'focusin', () => { if (!started) started = performance.now(); });
  const inputs = $$('.field input, .field select', el);
  inputs.forEach((input) => {
    scope.on(input, 'blur', () => check(input, true));
    scope.on(input, 'input', () => { if (input.closest('.field').classList.contains('has-error')) check(input); });
  });
  scope.on(el, 'submit', (e) => {
    e.preventDefault();
    const ok = inputs.map((input) => check(input, true));
    const first = inputs[ok.indexOf(false)];
    if (first) { first.focus(); return; }
    const bot = (trap && trap.value !== '') || !started || performance.now() - started < HUMAN_MS;
    success.dataset.discarded = String(bot);
    el.hidden = true;
    success.hidden = false;
    success.setAttribute('tabindex', '-1');
    success.focus();
  });
}
