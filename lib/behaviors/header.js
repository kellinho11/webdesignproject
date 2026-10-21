// Header: estado ao rolar e menu do celular (Esc, clique fora e Tab levam o foco certo).
import { $, $$ } from '../scope';

export default function header(scope) {
  const el = $('.site-header'), toggle = $('.nav-toggle');
  if (!el || !toggle) return;
  const links = $$('.site-nav a');
  const isOpen = () => el.classList.contains('nav-open');
  const setMenu = (open) => {
    el.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  scope.on(toggle, 'click', () => setMenu(!isOpen()));
  links.forEach((a) => scope.on(a, 'click', () => setMenu(false)));
  // o botão vem depois do menu no HTML: com o menu aberto, Tab nele leva ao 1º link
  scope.on(toggle, 'keydown', (e) => { if (e.key === 'Tab' && !e.shiftKey && isOpen() && links.length) { e.preventDefault(); links[0].focus(); } });
  scope.on(document, 'keydown', (e) => { if (e.key === 'Escape' && isOpen()) { setMenu(false); toggle.focus(); } });
  scope.on(document, 'click', (e) => { if (isOpen() && !el.contains(e.target)) setMenu(false); });
  const wide = window.matchMedia('(min-width: 1081px)');
  scope.on(wide, 'change', (e) => { if (e.matches) setMenu(false); });

  let ticking = false;
  const sync = () => { ticking = false; el.classList.toggle('is-scrolled', window.scrollY > 40); };
  scope.on(window, 'scroll', () => { if (!ticking) { ticking = true; scope.frame(sync); } }, { passive: true });
  sync();
}
