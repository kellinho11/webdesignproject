// Intro: o criostato desenhado em SVG; tocar no processador roda a sequência e entra no site.
import { reducedMotion } from '../scope';
import { buildCryostat } from '../cryostat';

export default function intro(scope) {
  const l = document.getElementById('loader');
  const root = document.documentElement;
  const finish = () => { root.classList.remove('intro-open'); window.__introPending = false; window.dispatchEvent(new Event('intro:done')); };
  if (!l) { root.classList.remove('intro-open'); return; }
  if (reducedMotion()) { l.remove(); root.classList.remove('intro-open'); return; }
  window.__introPending = true;

  const svg = document.getElementById('intro-qc');
  const { tiers, qubits } = buildCryostat(svg, 'iq');
  scope.add(() => { svg.textContent = ''; });

  const status = document.getElementById('intro-status');
  const start = document.getElementById('intro-start'), skip = document.getElementById('intro-skip');
  let done = false;
  const close = (fast) => {
    if (done) return; done = true;
    l.classList.add(fast ? 'is-skip' : 'is-out');
    finish();
    setTimeout(() => l.remove(), 800);
  };
  const run = () => {
    if (l.classList.contains('is-running')) return;
    l.classList.add('is-running'); start.disabled = true;
    status.textContent = 'Linhas de controle ativas · 5 canais XY';
    tiers.forEach((t, i) => scope.timeout(() => t.classList.add('is-on'), 160 + i * 210));
    scope.timeout(() => { l.classList.add('is-chip'); status.textContent = 'Pulso π/2 · 5,1 GHz → q0–q4 em superposição'; }, 1500);
    scope.timeout(() => { l.classList.add('is-entangle'); status.textContent = 'CNOT q0→q1 · emaranhando o registro'; }, 2350);
    scope.timeout(() => { l.classList.add('is-measure'); [1, 0, 1, 1, 0].forEach((v, k) => qubits[k].classList.toggle('is-one', !!v)); status.textContent = 'Medição · |10110⟩'; }, 3100);
    scope.timeout(() => l.classList.add('is-zoom'), 3650);
    scope.timeout(() => close(false), 4350);
  };
  scope.on(start, 'click', run);
  scope.on(skip, 'click', () => close(true));
  scope.on(l, 'keydown', (ev) => { if (ev.key === 'Escape') close(true); });
  scope.frame(() => start.focus({ preventScroll: true }));
}
