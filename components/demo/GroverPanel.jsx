import { useCallback, useMemo, useState } from 'react';
import { groverAmplitudes, groverParams } from './sim.js';
import { B, Chart, Grid, L, Metrics, RangeField, RunButton, Status, T, dec, fmt, useAutoRun, usePlayback } from './ui.jsx';

export default function GroverPanel({ active, autoRun, W }) {
  // o controle guarda o expoente: N = 2^exp (16 a 4.096 registros)
  const [exp, setExp] = useState(8);
  const { t, state, start, reset } = usePlayback();
  const g = useMemo(() => groverParams(exp), [exp]);
  const run = useCallback(() => start(Math.min(3200, 500 + g.k * 260)), [start, g.k]);
  useAutoRun(autoRun, run);

  const R = W - 14;
  const j = Math.floor(t * g.k);
  const a = groverAmplitudes(g, j);
  const slot = (R - L) / g.bars, bw = slot - Math.min(5, slot * 0.3);
  const my = B - (B - T) * Math.abs(a.mean);
  const N = fmt.format(g.N);

  return (
    <div className="card-glass lab__panel" role="tabpanel" id="panel-grover" data-panel="grover" aria-labelledby="tab-grover" hidden={!active}>
      <div className="lab__controls">
        <p className="lab__desc">Ache 1 registro: a barra violeta cresce a cada rodada.</p>
        <RangeField id="g-n" label="Registros na base (N)" min={4} max={12} value={exp} display={N} valueText={`${N} registros`}
          onChange={(v) => { setExp(v); reset(); }} />
        <RunButton algo="grover" running={state === 'run'} onClick={run}>Executar Grover</RunButton>
      </div>
      <div className="lab__viz">
        <div className="lab__viz-head"><span>Amplitudes por estado · média tracejada</span><Status id="g-status" state={state} /></div>
        <Chart id="g-viz" W={W}>
          <Grid R={R} values={[0.25, 0.5, 0.75, 1]} label={(v) => dec(v, 2)} />
          {Array.from({ length: g.bars }, (_, i) => {
            const hot = i === g.target;
            const h = Math.max(1.5, (B - T) * Math.abs(hot ? a.target : a.other)), x = L + i * slot + (slot - bw) / 2;
            return (
              <g key={i}>
                <rect className={'v-bar' + (hot ? ' v-bar--hot' : '')} x={x.toFixed(1)} y={(B - h).toFixed(1)} width={bw.toFixed(1)} height={h.toFixed(1)} />
                {hot && <text className="v-text--hot" x={x + bw / 2} y={B - h - 8} textAnchor="middle">alvo</text>}
              </g>
            );
          })}
          <line className="v-mean" x1={L} x2={R} y1={my.toFixed(1)} y2={my.toFixed(1)} />
          <text className="v-text" x={L} y={B + 22}>
            {g.N > g.bars ? `${g.bars} de ${N} estados exibidos` : `${N} estados`} · amplitude |α|
          </text>
        </Chart>
        <Metrics items={[
          ['Iterações quânticas', 'g-iter', `${j} / ${g.k}`],
          ['Clássico (média)', 'g-classic', fmt.format(g.N / 2)],
          ['P(sucesso)', 'g-prob', `${dec(a.target * a.target * 100, 1)}%`],
          ['Redução de consultas', 'g-speed', state === 'done' ? `${dec(g.N / 2 / g.k, 1)}×` : '…']
        ]} />
      </div>
    </div>
  );
}
