import { useCallback, useMemo, useState } from 'react';
import { QAOA_K, easeOut, qaoaModel } from './sim.js';
import { Term } from './Term.jsx';
import { B, Chart, Grid, L, Metrics, RangeField, RunButton, Status, T, dec, fmt, useAutoRun, usePlayback } from './ui.jsx';

export default function QaoaPanel({ active, autoRun, W }) {
  const [n, setN] = useState(12);
  const [p, setP] = useState(3);
  const { t, state, start, reset } = usePlayback();
  const m = useMemo(() => qaoaModel(n, p), [n, p]);
  const run = useCallback(() => start(2600), [start]);
  useAutoRun(autoRun, run);

  // mexer num controle cancela a execução e mostra o novo ponto de partida
  const change = (set) => (v) => { set(v); reset(); };

  const R = W - 14;
  const e = easeOut(t);
  const probs = m.final.map((f) => (1 - e) / QAOA_K + e * f); // começa uniforme e vai para a distribuição final
  const maxP = Math.max(...m.final) * 1.12;
  const slot = (R - L) / QAOA_K, bw = slot - 8;
  const done = state === 'done';
  const best = m.strings[0];
  const picked = best.split('').filter((c) => c === '1').length;

  return (
    <div className="card-glass lab__panel" role="tabpanel" id="panel-qaoa" data-panel="qaoa" aria-labelledby="tab-qaoa" hidden={!active}>
      <div className="lab__controls">
        <p className="lab__desc">Carteira de menor risco · 1.024 <Term def="Repetições do cálculo. Cada uma dá uma resposta; a mais frequente é a escolhida.">shots</Term>.</p>
        <RangeField id="q-n" label="Ativos no universo" min={6} max={16} value={n} onChange={change(setN)} />
        <RangeField id="q-p" label="Camadas do circuito (p)" min={1} max={6} value={p} onChange={change(setP)} />
        <RunButton algo="qaoa" running={state === 'run'} onClick={run}>Executar QAOA</RunButton>
      </div>
      <div className="lab__viz">
        <div className="lab__viz-head"><span>Distribuição de bitstrings medidos</span><Status id="q-status" state={state} /></div>
        <Chart id="q-viz" W={W}>
          <Grid R={R} values={[0.25, 0.5, 0.75, 1]} label={(g) => dec(maxP * g, 2)} />
          {m.order.map((rank, pos) => {
            const pr = probs[rank], h = Math.max(1, (B - T) * Math.min(1, pr / maxP)), x = L + pos * slot + 4;
            const hot = rank === 0 && t > 0.15;
            const cx = x + bw / 2;
            return (
              <g key={rank}>
                <rect className={'v-bar' + (hot ? ' v-bar--hot' : '')} x={x.toFixed(1)} y={(B - h).toFixed(1)} width={bw.toFixed(1)} height={h.toFixed(1)} />
                {hot && <>
                  <text className="v-text--hot" x={cx} y={B - h - 8} textAnchor="middle">{Math.round(pr * 100)}%</text>
                  <text className="v-mono" x={Math.min(R - 60, Math.max(L + 60, cx))} y={B + 22} textAnchor="middle">|{best}⟩</text>
                </>}
              </g>
            );
          })}
          <text className="v-text" x={L} y={B + 40}>16 respostas mais medidas · probabilidade</text>
        </Chart>
        <div className="lab__chips" id="q-chips" role="group" aria-label="Ativos da carteira escolhida">
          {Array.from({ length: n }, (_, i) => (
            <span key={i} className={'lab__chip' + (done && best[i] === '1' ? ' is-on' : '')}>A{String(i + 1).padStart(2, '0')}</span>
          ))}
        </div>
        <Metrics items={[
          ['Espaço de busca', 'q-space', fmt.format(Math.pow(2, n))],
          ['Shots medidos', 'q-shots', fmt.format(Math.round(1024 * t))],
          ['Approx. ratio', 'q-ratio', done ? dec(m.ratio, 2) : '…'],
          ['Carteira', 'q-pick', done ? `${picked} de ${n}` : '…']
        ]} />
      </div>
    </div>
  );
}
