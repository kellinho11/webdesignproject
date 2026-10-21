'use client';

import { useEffect, useState } from 'react';
import useLive, { drift } from './useLive';

// Painel de telemetria do processador ao lado da esfera: coerência, fidelidade e temperatura, cada
// um com um histórico curto em blocos ASCII (▁▂▃▄▅▆▇). Valores ilustrativos.
const BARS = '▁▂▃▄▅▆▇';
const ROWS = [
  { k: 't1', label: 'Coerência T1', unit: 'µs', c: 118, s: 6, d: 0 },
  { k: 't2', label: 'Coerência T2', unit: 'µs', c: 92, s: 5, d: 0 },
  { k: 'f1', label: 'Fidelidade 1q', unit: '%', c: 99.96, s: 0.02, d: 2 },
  { k: 'f2', label: 'Fidelidade 2q', unit: '%', c: 99.71, s: 0.06, d: 2 },
  { k: 'mk', label: 'Câmara de mistura', unit: 'mK', c: 15.2, s: 0.6, d: 1 },
];
const spark = (h, c, s) => h.map((v) => BARS[Math.max(0, Math.min(6, Math.round(((v - (c - s)) / (2 * s)) * 6)))]).join('');

export default function Telemetry() {
  const [ref, on] = useLive(0.2);
  const [h, set] = useState(() => Object.fromEntries(ROWS.map((r) => [r.k, Array.from({ length: 16 }, (_, i) => r.c + Math.sin(i * 1.7) * r.s * 0.5)])));
  useEffect(() => {
    if (!on) return undefined;
    const id = setInterval(() => set((p) => Object.fromEntries(ROWS.map((r) => [r.k, [...p[r.k].slice(1), drift(p[r.k][15], r.c, r.s, r.s * 0.8)]]))), 900);
    return () => clearInterval(id);
  }, [on]);
  return (
    <dl className="telemetry" ref={ref}>
      <div className="telemetry__head"><dt>SQ-64 · telemetria</dt><dd><span className="live-status__dot" aria-hidden="true" />64/64 qubits ativos</dd></div>
      {ROWS.map((r) => (
        <div key={r.k} className="telemetry__row">
          <dt>{r.label}</dt>
          <dd><span className="telemetry__spark" aria-hidden="true">{spark(h[r.k], r.c, r.s)}</span><b>{h[r.k][15].toFixed(r.d).replace('.', ',')}</b> {r.unit}</dd>
        </div>
      ))}
    </dl>
  );
}
