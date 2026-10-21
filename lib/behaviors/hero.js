// Hero: parallax pelo cursor (só com mouse), saída ao rolar, pulsos nos fios e pausa fora da tela.
import { $ } from '../scope';
import { reducedMotion, finePointer } from '../media';

const NS = 'http://www.w3.org/2000/svg';

export default function hero(scope) {
  const el = $('.hero'), content = $('.hero__content');
  if (!el || !content) return;
  const reduce = reducedMotion();

  if (!reduce && finePointer()) {
    let raf = 0;
    scope.on(el, 'pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      });
    });
    scope.on(el, 'pointerleave', () => { el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); });
    scope.add(() => cancelAnimationFrame(raf));
  }

  let ticking = false;
  const exit = () => {
    ticking = false;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0) return;
    const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.8)));
    content.style.opacity = (1 - 0.7 * p).toFixed(3);
    content.style.transform = reduce ? '' : `translateY(${(p * -24).toFixed(1)}px)`;
    if (!reduce) el.style.setProperty('--sy', Math.max(0, -r.top).toFixed(1));
  };
  scope.on(window, 'scroll', () => { if (!ticking) { ticking = true; scope.frame(exit); } }, { passive: true });
  exit();
  scope.observe(new IntersectionObserver(([e]) => el.classList.toggle('is-offscreen', !e.isIntersecting))).observe(el);

  // pulsos que correm pelos fios do circuito (duas por fio, fora de fase)
  const svg = $('.hero__circuit:not(.hero__circuit--meter) svg');
  if (svg) {
    const g = document.createElementNS(NS, 'g');
    svg.querySelectorAll('.wires line').forEach((ln, i) => {
      for (let k = 0; k < 2; k++) {
        const p = ln.cloneNode();
        const d = 6 + ((i * 7 + k * 5) % 6) * 0.9;
        p.setAttribute('class', 'wire-pulse');
        p.setAttribute('pathLength', '100');
        p.style.setProperty('--pd', d.toFixed(1) + 's');
        p.style.setProperty('--po', (-(i * 1.7 + k * d * 0.5) % d).toFixed(2) + 's');
        g.appendChild(p);
      }
    });
    svg.querySelector('.wires').after(g);
    scope.add(() => g.remove());
  }
  scope.timeout(() => el.classList.add('is-settled'), 1500);
}
