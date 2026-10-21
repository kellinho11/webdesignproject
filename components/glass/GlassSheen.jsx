'use client';

// Reflexo de luz que acompanha o ponteiro sobre os painéis de vidro.
// Um só listener na página (delegação), em vez de um por painel. Não renderiza nada.
import { useEffect } from 'react';
import { finePointer, reducedTransparency } from '@/lib/media';

const GLASS = '.site-header .header__inner, .glass-panel, .cta .form.sentence';

// px, py: posição do ponteiro dentro do painel (0..1). Devolve onde fica o reflexo (sx, sy em %)
// e quão forte ele é (sheen, opacidade do branco). A luz "vem de cima": o reflexo fica mais forte
// perto da borda superior e quase some embaixo, como num vidro de verdade.
export function sheenAt(px, py) {
  const sheen = 0.03 + 0.09 * (1 - Math.min(1, Math.max(0, py)));
  return { sx: px * 100, sy: py * 100 - 20, sheen: Number(sheen.toFixed(3)) };
}

export default function GlassSheen() {
  useEffect(() => {
    // só com mouse: no toque não há ponteiro pairando para acompanhar
    if (!finePointer() || reducedTransparency()) return;
    let last = null, raf = 0, ev = null;
    const clear = (el) => { el.style.removeProperty('--sheen'); el.style.removeProperty('--sx'); el.style.removeProperty('--sy'); };
    const paint = () => {
      raf = 0;
      const el = ev.target.closest?.(GLASS);
      if (last && last !== el) clear(last);
      last = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const { sx, sy, sheen } = sheenAt((ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height);
      el.style.setProperty('--sx', `${sx}%`);
      el.style.setProperty('--sy', `${sy}%`);
      el.style.setProperty('--sheen', sheen);
    };
    // no máximo um cálculo por quadro, mesmo com o mouse disparando dezenas de eventos
    const onMove = (e) => { ev = e; if (!raf) raf = requestAnimationFrame(paint); };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); if (last) clear(last); };
  }, []);
  return null;
}
