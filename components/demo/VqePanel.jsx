import { useCallback, useMemo, useState } from 'react';
import { CHEM, MOLECULES, VQE_ITERS, vqeSeries } from './sim.js';
import { Term } from './Term.jsx';
import { B, Chart, Grid, L, Metrics, RangeField, RunButton, Status, T, dec, useAutoRun, usePlayback } from './ui.jsx';

const EXP = ['⁰', '⁻¹', '⁻²', '⁻³', '⁻⁴'];
// eixo y em escala log: 10⁰ no topo, 10⁻⁴ na base
const yOf = (err) => T + (Math.min(4, Math.max(0, -Math.log10(err))) / 4) * (B - T);

export default function VqePanel({ active, autoRun, W }) {
  const [mol, setMol] = useState('h2');
  const [depth, setDepth] = useState(2);
  const { t, state, start, reset } = usePlayback();
  const sr = useMemo(() => vqeSeries(mol, depth), [mol, depth]);
  const run = useCallback(() => start(2800), [start]);
  useAutoRun(autoRun, run);

  const R = W - 14;
  const xOf = (i) => L + (i / VQE_ITERS) * (R - L);
  const upto = Math.max(1, Math.round(t * VQE_ITERS));
  const err = sr.pts[upto];
  const cy = yOf(CHEM);
  const path = sr.pts.slice(0, upto + 1).map((v, i) => `${i ? 'L' : 'M'}${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`).join('');
  const verdict = sr.pts[VQE_ITERS] < CHEM ? 'Convergiu' : 'Aumente o ansatz';

  return (
    <div className="card-glass lab__panel" role="tabpanel" id="panel-vqe" data-panel="vqe" aria-labelledby="tab-vqe" hidden={!active}>
      <div className="lab__controls">
        <p className="lab__desc">Energia mínima até a <Term def="Margem de erro (1,6 mHa) pequena o bastante para prever reações químicas com confiança.">precisão química</Term>.</p>
        <div className="lab__field">
          <span className="lab__field-head"><span id="v-mol-label">Molécula</span></span>
          <div className="lab__seg" role="group" aria-labelledby="v-mol-label">
            {Object.entries(MOLECULES).map(([key, m]) => (
              <button key={key} type="button" aria-pressed={mol === key} data-mol={key} onClick={() => { setMol(key); reset(); }}>{m.label}</button>
            ))}
          </div>
        </div>
        <RangeField id="v-d" label="Profundidade do ansatz" min={1} max={4} value={depth} onChange={(v) => { setDepth(v); reset(); }} />
        <RunButton algo="vqe" running={state === 'run'} onClick={run}>Executar VQE</RunButton>
      </div>
      <div className="lab__viz">
        <div className="lab__viz-head"><span>Erro de energia por iteração · escala log</span><Status id="v-status" state={state} /></div>
        <Chart id="v-viz" W={W}>
          <rect className="v-band" x={L} y={cy.toFixed(1)} width={R - L} height={(B - cy).toFixed(1)} />
          <Grid R={R} values={[1, 0.75, 0.5, 0.25, 0]} label={(v) => `10${EXP[Math.round((1 - v) * 4)]}`} />
          <line className="v-thresh" x1={L} x2={R} y1={cy.toFixed(1)} y2={cy.toFixed(1)} />
          <text className="v-text" style={{ fill: '#3B82F6' }} x={R - 4} y={(cy - 7).toFixed(1)} textAnchor="end">precisão química · 1,6 mHa</text>
          <path className="v-curve" d={path} />
          <circle className="v-dot" cx={xOf(upto).toFixed(1)} cy={yOf(err).toFixed(1)} r="4" />
          <text className="v-text" x={L} y={B + 22}>iterações (0–{VQE_ITERS}) · erro em Hartree</text>
        </Chart>
        <Metrics items={[
          ['Energia estimada', 'v-e', `${dec(sr.m.e0 + err, 4)} Ha`],
          ['Erro', 'v-err', `${dec(err * 1000, 2)} mHa`],
          ['Iterações', 'v-it', String(upto)],
          ['Status', 'v-ok', state === 'done' ? verdict : '…']
        ]} />
      </div>
    </div>
  );
}
