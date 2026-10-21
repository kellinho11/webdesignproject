// Script do <head>: roda antes da primeira pintura, sem esperar o resto do JS.
// - marca que o JS está ativo (sem JS as animações de entrada não escondem o conteúdo);
// - abre a intro e trava a rolagem. Quem trava é este script, não o HTML: se o resto do JS não
//   chegar, a página não fica presa;
// - "Pular", Esc e um toque no processador já saem da intro aqui; se o resto do JS não chegar em
//   5 s, a intro sai sozinha (com JS ela é uma animação de cerca de 4 s).
// Quando components/sections/Intro.jsx assume (window.__introReady), estes ouvintes não fazem mais nada.
function boot() {
  var root = document.documentElement;
  root.classList.add('js');
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
  setTimeout(leave, 5000);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') leave(); });
}

export const BOOT_SCRIPT = `(${boot.toString()})()`;
