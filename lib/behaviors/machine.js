// O instrumento: desenha o criostato e, a cada porta do fio (evento sq:gate), leva a câmera até a
// parte da máquina que a seção explica. A câmera é um transform no SVG inteiro (só composição, sem
// repintar a cada quadro); os estados acendem estágios, pulsos e qubits por classe.
import { $, $$, reducedMotion } from '../scope';
import { buildCryostat } from '../cryostat';

// foco de cada estágio em coordenadas do desenho (600 × 760): centro e zoom
const CAM = {
  top: { x: 300, y: 380, k: 1 },
  H: { x: 300, y: 612, k: 2.7 },
  Rz: { x: 300, y: 300, k: 1.55 },
  U: { x: 300, y: 545, k: 2.05 },
  SW: { x: 300, y: 372, k: 0.98 },
  M: { x: 300, y: 616, k: 3.1 },
};
const TEMP = { top: '300 K', H: '15 mK', Rz: '4 K → 15 mK', U: '15 mK', SW: '300 K → 15 mK', M: '15 mK' };
const DEPTH = { top: 0, Rz: 0.55, U: 0.85, H: 1, SW: 0.5, M: 1 };

export default function machine(scope) {
  const el = $('.machine'), svg = $('#machine-qc'), view = $('.machine__view');
  if (!el || !svg) return;
  const { tiers, qubits } = buildCryostat(svg, 'mq');
  scope.add(() => { svg.textContent = ''; });
  const temp = $('[data-m-temp]'), notes = $$('[data-note]', el);
  let stage = 'top';

  const aim = () => {
    const c = CAM[stage], r = view.getBoundingClientRect(), u = r.width / 600;   // px por unidade do desenho
    const k = c.k, tx = r.width / 2 - c.x * u * k, ty = r.height / 2 - c.y * u * k;
    svg.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${k})`;
  };
  const set = (g) => {
    stage = CAM[g] ? g : 'top';
    el.dataset.stage = stage;
    notes.forEach((n) => n.classList.toggle('is-on', n.dataset.note === stage));
    if (temp) temp.textContent = TEMP[stage];
    el.style.setProperty('--depth', DEPTH[stage]);
    // estágios acesos até a profundidade do capítulo
    const lit = Math.round(DEPTH[stage] * (tiers.length - 1));
    tiers.forEach((t, i) => t.classList.toggle('is-on', stage !== 'top' && i <= lit));
    if (stage !== 'U' && stage !== 'M') qubits.forEach((q) => q.classList.remove('is-one'));
    aim();
  };
  scope.on(window, 'sq:gate', (e) => set(e.detail.gate));
  // Demo: cada shot lido aparece no chip (os qubits piscam com a medição)
  let lastShot = -1;
  scope.on(window, 'sq:scrub', (e) => {
    if (stage !== 'U') return;
    const shot = Math.floor(e.detail * 160);
    if (shot === lastShot) return;
    lastShot = shot;
    qubits.forEach((q, k) => q.classList.toggle('is-one', Math.sin(shot * 12.9 + k * 78.2) > 0.1));
  });
  scope.on(window, 'sq:collapse', (e) => {
    const bits = e.detail.value ? [1, 0, 1, 1, 1] : [0, 1, 0, 0, 0];
    qubits.forEach((q, k) => q.classList.toggle('is-one', !!bits[k]));
  });
  scope.observe(new ResizeObserver(aim)).observe(view);
  if (reducedMotion()) el.classList.add('is-still');
  set('top');
}
