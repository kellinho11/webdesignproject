// Script do <head>: roda antes da primeira pintura, sem esperar o resto do JS.
// - marca que o JS está ativo (sem JS as animações de entrada não escondem o conteúdo);
// - abre a intro e trava a rolagem. Quem trava é este script, não o HTML: se o resto do JS não
//   chegar, a página não fica presa;
// - "Pular", Esc e um toque na tela já saem da intro aqui;
// - a intro só toca se puder começar logo: se o resto do JS não chegar em 1,5 s (rede ou aparelho
//   lento), ela sai e a página aparece. Esperar no escuro por uma animação de 2 s não vale a pena.
// Quando components/sections/Intro.jsx assume (window.__introReady), estes ouvintes não fazem mais nada.
// As outras páginas (o Glossário) não têm intro: lá o script só marca o JS.
function boot() {
  var root = document.documentElement;
  root.classList.add('js');
  if (!/^\/(index(\.html)?)?$/.test(location.pathname)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.classList.add('intro-open');
  window.__introPending = true;
  var leave = function () {
    if (window.__introReady || !root.classList.contains('intro-open')) return;
    root.classList.remove('intro-open');
    root.classList.add('intro-skipped');
    window.__introPending = false;
    document.body.classList.add('is-loaded');
  };
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('#intro-skip, #intro-start')) leave();
  });
  setTimeout(leave, 1500);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') leave(); });
}

export const BOOT_SCRIPT = `(${boot.toString()})()`;
