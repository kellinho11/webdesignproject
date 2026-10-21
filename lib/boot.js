// Script do <head>: roda antes da primeira pintura, sem esperar o resto do JS.
// - marca que o JS está ativo (sem JS as animações de entrada não escondem o conteúdo);
// - abre a intro e trava a rolagem. Quem trava é este script, não o HTML: se o resto do JS não
//   chegar, a página não fica presa;
// - "Pular" e Esc já funcionam aqui. Um toque no processador antes de o JS chegar fica guardado
//   e a intro roda assim que ele chegar; se não chegar em 3 s, a intro sai.
// Quando lib/behaviors/intro.js assume (window.__introReady), estes ouvintes não fazem mais nada.
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
    if (window.__introReady || !e.target.closest) return;
    if (e.target.closest('#intro-skip')) leave();
    else if (e.target.closest('#intro-start') && !window.__introQueued) {
      window.__introQueued = true;
      setTimeout(leave, 3000);
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') leave(); });
}

export const BOOT_SCRIPT = `(${boot.toString()})()`;
