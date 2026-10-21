'use client';

import { useEffect, useState } from 'react';
import useLive, { drift } from './useLive';

// Faixa de telemetria da QPU no header: temperatura da câmara, fila e fidelidade mudam de leve,
// como num painel de laboratório. Dados ilustrativos (o SynapseQ é fictício).
const fmt = (v, d) => v.toFixed(d).replace('.', ',');

export default function LiveStatus() {
  const [ref, on] = useLive(0);
  const [s, set] = useState({ mk: 15.2, queue: 37, fid: 99.71 });
  useEffect(() => {
    if (!on) return undefined;
    const id = setInterval(() => set((p) => ({
      mk: drift(p.mk, 15.2, 0.6, 0.4),
      queue: Math.max(12, Math.round(drift(p.queue, 37, 14, 6))),
      fid: drift(p.fid, 99.71, 0.06, 0.03),
    })), 1600);
    return () => clearInterval(id);
  }, [on]);
  return (
    <p className="live-status" ref={ref} aria-label="Status da QPU (ilustrativo)">
      <span className="live-status__dot" aria-hidden="true" />
      <span>SQ-64 online</span>
      <span className="live-status__v"><b>{fmt(s.mk, 1)}</b> mK</span>
      <span className="live-status__v live-status__wide">fila <b>{s.queue}</b></span>
      <span className="live-status__v live-status__wide">F₂q <b>{fmt(s.fid, 2)}%</b></span>
    </p>
  );
}
