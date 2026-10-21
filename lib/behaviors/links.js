// Ligações entre seções: escolher um caso manda o algoritmo para a Demo, e o resultado da medição
// (moeda ou porta M do fio) aparece nos Investidores.
import { $, $$, reducedMotion } from '../scope';

const NAMES = { qaoa: 'QAOA · carteira', vqe: 'VQE · molécula', grover: 'Grover · busca' };

export default function links(scope) {
  const demo = $('#demo');
  const setAlgo = (algo) => {
    window.__sqAlgo = algo;
    if (demo) demo.dataset.algo = algo;
    window.dispatchEvent(new CustomEvent('sq:algo', { detail: { algo } }));
    $$('[data-algo-label]').forEach((el) => { el.textContent = NAMES[algo]; });
    $$('[data-algo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.algo === algo)));
  };
  $$('[data-algo]').forEach((b) => scope.on(b, 'click', () => {
    setAlgo(b.dataset.algo);
    if (demo) window.scrollTo({ top: demo.getBoundingClientRect().top + window.scrollY, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }));
  const out = $('#cta-qubit');
  scope.on(window, 'sq:collapse', (e) => { if (out) out.textContent = `|${e.detail.value}⟩`; });
}
