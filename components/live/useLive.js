'use client';

import { useEffect, useRef, useState } from 'react';

// Liga uma peça "ao vivo" só quando vale a pena: visível na tela, aba aberta e sem pedido de
// movimento reduzido. Devolve [ref, rodando, reduzido].
export default function useLive(threshold = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(rm);
    let visible = false;
    // "Pausar movimento" (MotionToggle) também desliga
    const sync = () => setOn(visible && !document.hidden && !rm && !window.__sqMotionOff);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('sq:motion', sync);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync); window.removeEventListener('sq:motion', sync); };
  }, [threshold]);
  return [ref, on, reduced];
}

// passeio aleatório limitado: o valor anda um pouco a cada passo e volta para perto do centro
export const drift = (v, center, spread, step) => {
  const next = v + (Math.random() - 0.5) * step + (center - v) * 0.15;
  return Math.min(center + spread, Math.max(center - spread, next));
};
