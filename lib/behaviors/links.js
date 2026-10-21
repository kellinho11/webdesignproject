// Ligações entre seções: escolher um caso manda o algoritmo para a Demo, e o resultado da medição
// (moeda ou porta M do fio) aparece nos Investidores.
import { $, $$ } from '../scope';
import { reducedMotion } from '../media';
import { emit } from '../signals';

const NAMES = { qaoa: 'QAOA · carteira', vqe: 'VQE · molécula', grover: 'Grover · busca' };

export default function links(scope) {
  const demo = $('#demo');
  const setAlgo = (algo) => {
    if (demo) demo.dataset.algo = algo;
    emit('algo', { algo });
    $$('[data-algo-label]').forEach((el) => { el.textContent = NAMES[algo]; });
    $$('[data-algo]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.algo === algo)));
  };
  $$('[data-algo]').forEach((b) => scope.on(b, 'click', () => {
    setAlgo(b.dataset.algo);
    if (demo) window.scrollTo({ top: demo.getBoundingClientRect().top + window.scrollY, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }));
  const out = $('#cta-qubit');
  scope.listen('collapse', ({ value }) => { if (out) out.textContent = `|${value}⟩`; });
}
