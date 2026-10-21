// O fio: um qubit atravessa a página. A linha da margem se desenha com a rolagem, o marcador |ψ⟩
// desce junto com o centro da tela e muda de estado a cada porta (uma por seção). Também move as
// pontes entre seções (as palavras acendem conforme se lê) e o filme da Demo, que anda com a rolagem.
//
// Desempenho: as posições são medidas só ao carregar e quando o layout muda; durante a rolagem
// é só aritmética e transform/opacity (e uma variável CSS por elemento visível).
import { $, $$ } from '../scope';
import { reducedMotion } from '../media';
import { emit } from '../signals';

const clamp = (x) => Math.min(1, Math.max(0, x));

export default function thread(scope) {
  const main = $('#topo'), line = $('.thread');
  if (!main || !line) return;
  const ket = $('.thread__ket'), ketState = $('.thread__state'), ketGate = $('.thread__gate');
  const gates = $$('section[data-gate]');                // seções com porta: { el, top, label, state }
  const bridges = $$('.bridge');
  const scrubs = $$('.scrub');
  const chNum = $('[data-chapter-num]'), chName = $('[data-chapter-name]'), fill = $('.chapter__fill');
  const ticks = $$('[data-tick]'), navLinks = $$('.site-nav a');
  const reduce = reducedMotion();
  let L = null, current = -1, measured = null;

  const measure = () => {
    const y = window.scrollY, mr = (line.offsetParent || main).getBoundingClientRect();
    // o fio começa na primeira porta (Tecnologia) e vai até o fim da página
    const first = gates.length ? gates[0].getBoundingClientRect().top + y : mr.top + y;
    L = {
      vh: window.innerHeight,
      top: first,
      h: mr.bottom + y - first,
      gates: gates.map((el) => ({ el, top: el.getBoundingClientRect().top + y })),
      bridges: bridges.map((el) => { const r = el.getBoundingClientRect(); return { el, top: r.top + y, h: r.height }; }),
      scrubs: scrubs.map((el) => { const r = el.getBoundingClientRect(); return { el, top: r.top + y, h: r.height, film: el.querySelector('.film'), chs: $$('[data-at]', el) }; }),
    };
    line.style.top = `${(first - (mr.top + y)).toFixed(1)}px`;
    line.style.height = `${L.h.toFixed(1)}px`;
    update();
  };

  const setState = (i) => {
    if (i === current) return;
    current = i;
    const g = gates[i];
    gates.forEach((el, k) => el.classList.toggle('is-passed', k <= i));
    let state = g ? g.dataset.state : '|0⟩';
    // a porta M colapsa o estado: vale a medição da moeda, se a pessoa mediu
    if (g && g.dataset.gate === 'M') {
      if (measured === null) measured = Math.random() < 0.5 ? 0 : 1;
      state = `|${measured}⟩`;
      emit('collapse', { value: measured });
    }
    emit('gate', { gate: g ? g.dataset.gate : 'top' });
    // faixa do header: capítulo atual, marcas das portas já passadas e o link do menu da seção
    if (chNum) { chNum.textContent = g ? g.dataset.num : '§ 00'; chName.textContent = g ? g.dataset.name : 'Início · estado |0⟩'; }
    ticks.forEach((t, k) => t.classList.toggle('is-on', k <= i));
    navLinks.forEach((a) => { if (g && a.getAttribute('href') === '#' + g.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (!ket) return;
    ketState.textContent = state;
    ketGate.textContent = g ? g.dataset.gate : '';
    ket.dataset.gate = g ? g.dataset.gate : '';
  };

  const update = () => {
    if (!L) return;
    const y = window.scrollY, mid = y + L.vh * 0.5;
    const p = clamp((mid - L.top) / L.h);
    line.style.setProperty('--p', p.toFixed(4));
    if (fill) fill.style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - L.vh)).toFixed(4)})`;
    if (ket) ket.style.transform = `translate3d(0, ${(p * L.h).toFixed(1)}px, 0)`;
    let i = -1;
    L.gates.forEach((g, k) => { if (mid >= g.top) i = k; });
    setState(i);
    // pontes: 0 quando o topo entra por baixo, 1 quando a frase passou do meio da tela
    L.bridges.forEach((b) => {
      if (y + L.vh < b.top || y > b.top + b.h) return;
      const q = clamp((y + L.vh * 0.9 - b.top) / (b.h + L.vh * 0.45));
      b.el.style.setProperty('--p', reduce ? 1 : q.toFixed(3));
    });
    // Demo: a seção é alta e o filme fica preso na tela; a rolagem vira a linha do tempo
    L.scrubs.forEach((s) => {
      const q = clamp((y - s.top) / Math.max(1, s.h - L.vh));
      s.el.style.setProperty('--p', q.toFixed(4));
      if (s.film) s.film.dispatchEvent(new CustomEvent('film:seek', { detail: q }));
      emit('scrub', q);
      let on = 0;
      s.chs.forEach((c, k) => { if (q >= +c.dataset.at) on = k; });
      s.chs.forEach((c, k) => c.classList.toggle('is-on', k === on));
    });
  };

  let ticking = false;
  scope.on(window, 'scroll', () => { if (!ticking) { ticking = true; scope.frame(() => { ticking = false; update(); }); } }, { passive: true });
  const ro = scope.observe(new ResizeObserver(() => scope.frame(measure)));
  ro.observe(main);
  scope.listen('measure', ({ value }) => { measured = value; if (gates[current]?.dataset.gate === 'M') { current = -2; update(); } });
  // as fontes mudam a altura dos títulos: mede de novo quando terminarem de carregar
  if (document.fonts) document.fonts.ready.then(() => scope.frame(measure));
  measure();
}
