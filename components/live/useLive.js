'use client';

import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from '@/lib/media';
import { listen, motionPaused } from '@/lib/signals';

// Liga uma peça "ao vivo" só quando vale a pena: visível na tela, aba aberta e sem pedido de
// movimento reduzido. Devolve [ref, rodando, reduzido].
export default function useLive(threshold = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const rm = reducedMotion();
    setReduced(rm);
    let visible = false;
    // "Pausar movimento" (MotionToggle) também desliga
    const sync = () => setOn(visible && !document.hidden && !rm && !motionPaused());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    const offMotion = listen('motion', sync);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync); offMotion(); };
  }, [threshold]);
  return [ref, on, reduced];
}
