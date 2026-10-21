'use client';

import { useEffect, useRef } from 'react';
import { reducedMotion } from '@/lib/media';

// Fundo espacial da página inteira, preso à tela e atrás de tudo:
// - três camadas de estrelas (longe, meio, perto) que a rolagem desloca em velocidades diferentes;
// - nebulosas em degradê (sem blur) e órbitas finas com coordenadas celestes, como um painel de observatório;
// - algumas estrelas cintilam e um fóton cruza o céu de vez em quando (param com "Pausar movimento").
// As estrelas são desenhadas uma vez num ladrilho e repetidas pelo CSS; rolar só mexe transform.
const LAYERS = [
  { tile: 420, n: 260, r: [0.35, 0.8], a: [0.25, 0.6], k: 0.02 },
  { tile: 560, n: 90, r: [0.6, 1.2], a: [0.35, 0.8], k: 0.05 },
  { tile: 760, n: 26, r: [1, 1.8], a: [0.6, 1], k: 0.1, glint: true },
];

function tile(L, seed) {
  let s = seed; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const c = document.createElement('canvas'); c.width = c.height = L.tile;
  const ctx = c.getContext('2d');
  for (let i = 0; i < L.n; i++) {
    const x = rnd() * L.tile, y = rnd() * L.tile, r = L.r[0] + rnd() * (L.r[1] - L.r[0]), a = L.a[0] + rnd() * (L.a[1] - L.a[0]);
    // tom frio com algumas estrelas puxando para o violeta
    const hue = rnd() < 0.25 ? '186, 170, 255' : rnd() < 0.5 ? '201, 216, 255' : '238, 243, 255';
    ctx.fillStyle = `rgba(${hue}, ${a})`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    if (L.glint && rnd() < 0.5) {
      ctx.strokeStyle = `rgba(${hue}, ${a * 0.45})`; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(x - r * 5, y); ctx.lineTo(x + r * 5, y); ctx.moveTo(x, y - r * 5); ctx.lineTo(x, y + r * 5); ctx.stroke();
    }
  }
  return c.toDataURL('image/png');
}

const TWINKLES = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 37.7) % 100, y: (i * 61.3 + 11) % 100, d: (3 + (i % 5) * 0.9).toFixed(1), o: (-(i * 0.73) % 4).toFixed(2),
}));

export default function Space() {
  const refs = useRef([]);
  useEffect(() => {
    LAYERS.forEach((L, i) => {
      const el = refs.current[i];
      el.style.backgroundImage = `url(${tile(L, 7 + i * 131)})`;
      el.style.backgroundSize = `${L.tile}px ${L.tile}px`;
      el.style.setProperty('--tile', `${L.tile}px`);
    });
    if (reducedMotion()) return undefined;
    let raf = 0;
    const move = () => {
      raf = 0;
      const y = window.scrollY;
      LAYERS.forEach((L, i) => { refs.current[i].style.transform = `translate3d(0, ${-((y * L.k) % L.tile).toFixed(1)}px, 0)`; });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(move); };
    window.addEventListener('scroll', on, { passive: true });
    move();
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="space" aria-hidden="true">
      <div className="space__sky" />
      {LAYERS.map((L, i) => <div key={i} className={`space__stars space__stars--${i}`} ref={(el) => { refs.current[i] = el; }} />)}
      <div className="space__twinkles">{TWINKLES.map((t, i) => <i key={i} style={{ left: `${t.x}%`, top: `${t.y}%`, '--td': `${t.d}s`, '--to': `${t.o}s` }} />)}</div>
      <svg className="space__orbits" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <g className="space__rings">
          <ellipse cx="760" cy="420" rx="520" ry="190" transform="rotate(-18 760 420)" />
          <ellipse cx="760" cy="420" rx="380" ry="138" transform="rotate(-18 760 420)" />
          <ellipse cx="760" cy="420" rx="250" ry="92" transform="rotate(-18 760 420)" />
        </g>
        <g className="space__coords">
          <text x="18" y="40">RA 14h 29m 43s</text>
          <text x="18" y="60">DEC −62° 40′ 46″</text>
          <text x="982" y="975" textAnchor="end">SQ-OBS · campo 04 · 2026.10</text>
          <line x1="18" y1="500" x2="44" y2="500" /><line x1="31" y1="487" x2="31" y2="513" />
          <line x1="956" y1="500" x2="982" y2="500" /><line x1="969" y1="487" x2="969" y2="513" />
        </g>
      </svg>
      <i className="space__photon" />
    </div>
  );
}
