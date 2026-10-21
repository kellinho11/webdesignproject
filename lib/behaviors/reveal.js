// Entradas ao rolar: cada .reveal aparece uma vez. Os títulos (.tl) sobem linha a linha por máscara.
import { $$ } from '../scope';

export default function reveal(scope) {
  const io = scope.observe(new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('is-visible');
    io.unobserve(el);
    scope.timeout(() => el.classList.add('reveal-done'), 1400);
  }), { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }));
  $$('.reveal').forEach((el) => io.observe(el));

  // entrada do Hero: espera a intro sair
  const go = () => scope.frame(() => scope.frame(() => document.body.classList.add('is-loaded')));
  if (window.__introPending) scope.on(window, 'intro:done', go, { once: true }); else go();
}
