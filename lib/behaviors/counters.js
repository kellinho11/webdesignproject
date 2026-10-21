// Números que contam até o valor quando aparecem ([data-count], com o texto final já no HTML).
import { $$ } from '../scope';
import { reducedMotion } from '../media';

const fmt = new Intl.NumberFormat('pt-BR');

export default function counters(scope) {
  if (reducedMotion()) return;
  const els = $$('[data-count]');
  const io = scope.observe(new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '';
    const t0 = performance.now(), dur = 900;
    const start = scope.loop((now) => {
      const k = Math.min(1, (now - t0) / dur), v = end * (1 - Math.pow(1 - k, 4));
      el.textContent = (dec ? v.toFixed(dec).replace('.', ',') : fmt.format(Math.round(v))) + suf;
      return k < 1;
    });
    start();
  }), { threshold: 0.6 }));
  els.forEach((el) => io.observe(el));
}
