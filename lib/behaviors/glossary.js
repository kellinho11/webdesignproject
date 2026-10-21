// Glossário (.term): no toque, a explicação fecha ao tocar fora.
export default function glossary(scope) {
  scope.on(document, 'touchstart', (e) => {
    const a = document.activeElement;
    if (a && a.classList && a.classList.contains('term') && !e.target.closest('.term')) a.blur();
  }, { passive: true });
}
