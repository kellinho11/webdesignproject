'use client';

import { useEffect, useState } from 'react';
import { RUNS } from '../films/scenes';

// Registro dos últimos shots medidos, sincronizado com a rolagem da Demo (evento sq:scrub) e com o
// algoritmo escolhido nos Casos (sq:algo). Determinístico: o mesmo ponto da rolagem dá as mesmas linhas.
const rand = (i) => { const x = Math.sin(i * 91.7 + 13.1) * 43758.5453; return x - Math.floor(x); };
function pick(run, i) {
  let r = rand(i), k = 0;
  while (k < run.prob.length - 1 && r > run.prob[k]) { r -= run.prob[k]; k++; }
  return k;
}

export default function ShotLog() {
  const [q, setQ] = useState(0);
  const [algo, setAlgo] = useState('qaoa');
  useEffect(() => {
    const onScrub = (e) => setQ(e.detail);
    const onAlgo = (e) => setAlgo(e.detail.algo);
    window.addEventListener('sq:scrub', onScrub);
    window.addEventListener('sq:algo', onAlgo);
    return () => { window.removeEventListener('sq:scrub', onScrub); window.removeEventListener('sq:algo', onAlgo); };
  }, []);
  const run = RUNS[algo] || RUNS.qaoa;
  const n = Math.max(0, Math.round(1024 * Math.min(1, Math.max(0, (q * 13 - 1) / 10))));
  const lines = Array.from({ length: 6 }, (_, k) => n - k).filter((i) => i > 0);
  return (
    <div className="shotlog" aria-hidden="true">
      <p className="shotlog__head"><span>shot</span><span>medição</span><span>p</span></p>
      {lines.length === 0 && <p className="shotlog__idle">aguardando execução…</p>}
      {lines.map((i) => {
        const k = pick(run, i);
        return <p key={i} className={k === run.win ? 'is-win' : undefined}><span>#{String(i).padStart(4, '0')}</span><span>|{run.bits[k]}⟩</span><span>{run.prob[k].toFixed(2).replace('.', ',')}</span></p>;
      })}
    </div>
  );
}
