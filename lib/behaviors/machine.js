// O instrumento (Quantum Engineering): o criostato já vem no HTML (components/cryostat/Cryostat.jsx);
// aqui a câmera vai até o estágio escolhido na lista ao lado. A câmera é um transform no SVG inteiro (só composição, sem repintar a cada quadro);
// os estágios acendem por classe. Fora da tela, as animações do desenho param.
import { $, $$ } from '../scope';
import { reducedMotion } from '../media';
import { latest } from '../signals';

// foco de cada estágio em coordenadas do desenho (600 × 760): centro e zoom
const CAM = {
  SW: { x: 300, y: 372, k: 0.98 },
  Rz: { x: 300, y: 300, k: 1.55 },
  U: { x: 300, y: 545, k: 2.05 },
  H: { x: 300, y: 612, k: 2.7 },
  M: { x: 300, y: 616, k: 3.1 },
};
const DEPTH = { SW: 1, Rz: 0.55, U: 0.85, H: 1, M: 1 };

// box: caixa do rótulo (getBBox, unidades do desenho); win: o que a câmera mostra { l, r, t, b }.
// Rótulo só aparece inteiro, com uma folga para a moldura: rótulo pela metade parece defeito.
const EDGE = 6;
function fits(box, win) {
  return box.x >= win.l + EDGE && box.x + box.width <= win.r - EDGE && box.y >= win.t + EDGE && box.y + box.height <= win.b - EDGE;
}

export default function machine(scope) {
  const el = $('.machine'), svg = $('.machine__qc'), view = $('.machine__view');
  if (!el || !svg) return;
  const tiers = $$('.iq-tier', svg), qubits = $$('.iq-q', svg);
  const labels = tiers.map((t) => ({ text: t.querySelector('.iq-label'), tick: t.querySelector('.iq-tick') }));
  const temp = $('[data-m-temp]'), notes = $$('[data-note]', el), picks = $$('[data-stage-pick]', el);
  let stage = 'SW';

  const aim = () => {
    const c = CAM[stage], r = view.getBoundingClientRect(), u = r.width / 600;   // px por unidade do desenho
    if (!r.width) return;
    const k = c.k, tx = r.width / 2 - c.x * u * k, ty = r.height / 2 - c.y * u * k;
    svg.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${k})`;
    // a janela da câmera em unidades do desenho: rótulos que cairiam na borda somem com o zoom
    const s = u * k, win = { l: -tx / s, r: (r.width - tx) / s, t: -ty / s, b: (r.height - ty) / s };
    labels.forEach(({ text, tick }) => {
      const cut = !fits(text.getBBox(), win);
      text.classList.toggle('is-cut', cut);
      tick.classList.toggle('is-cut', cut);
    });
  };
  const set = (g) => {
    stage = CAM[g] ? g : 'SW';
    el.dataset.stage = stage;
    notes.forEach((n) => n.classList.toggle('is-on', n.dataset.note === stage));
    picks.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.stagePick === stage)));
    const pick = picks.find((b) => b.dataset.stagePick === stage);
    if (temp && pick) temp.textContent = pick.querySelector('.machine__t').textContent;
    const lit = Math.round(DEPTH[stage] * (tiers.length - 1));
    tiers.forEach((t, i) => t.classList.toggle('is-on', i <= lit));
    // na leitura, o registro mostra a medição da página (a moeda ou o colapso nos Investidores)
    const v = latest('collapse')?.value ?? latest('measure')?.value ?? 1;
    const bits = v ? [1, 0, 1, 1, 0] : [0, 1, 0, 0, 1];
    qubits.forEach((q, k) => q.classList.toggle('is-one', stage === 'M' && !!bits[k]));
    aim();
  };
  picks.forEach((b) => scope.on(b, 'click', () => set(b.dataset.stagePick)));
  scope.observe(new ResizeObserver(aim)).observe(view);
  scope.observe(new IntersectionObserver(([e]) => el.classList.toggle('is-offscreen', !e.isIntersecting))).observe(el);
  if (reducedMotion()) el.classList.add('is-still');
  set('SW');
}
