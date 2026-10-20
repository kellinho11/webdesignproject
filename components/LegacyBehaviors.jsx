'use client';

import { useEffect } from 'react';
import { initLegacy } from '@/lib/legacy';

// Liga os comportamentos de lib/legacy.js ao HTML já renderizado no build.
// Rodam uma vez por página: o StrictMode monta os efeitos duas vezes em desenvolvimento,
// e esses comportamentos criam nós (SVGs da intro e dos interlúdios) que não seriam desfeitos.
let started = false;

export default function LegacyBehaviors() {
  useEffect(() => {
    if (started) return;
    started = true;
    initLegacy();
  }, []);
  return null;
}
