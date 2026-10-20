// Peças compartilhadas pelos três painéis da demonstração
import { useCallback, useEffect, useRef, useState } from 'react';

export const fmt = new Intl.NumberFormat('pt-BR');
export const dec = (x, d) => x.toFixed(d).replace('.', ',');
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Área útil dos gráficos no viewBox W × 300. No celular o W acompanha a largura real,
// senão o SVG de 600 encolheria pela metade e os textos ficariam ilegíveis.
export const L = 44, T = 22, B = 252;

export function useChartWidth(ref) {
  const [W, setW] = useState(600);
  useEffect(() => {
    const measure = () => {
      const narrow = window.matchMedia('(max-width: 900px)').matches;
      setW(narrow ? Math.round(Math.min(600, Math.max(280, ref.current.clientWidth - 44))) : 600);
    };
    measure();
    let timer = 0;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(measure, 150); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', onResize); };
  }, [ref]);
  return W;
}

// Anima t de 0 a 1 em "dur" ms. state: 'idle' (Pronto), 'run' (Executando), 'done' (Medido).
// Com "reduzir movimento" vai direto ao fim.
export function usePlayback() {
  const [t, setT] = useState(0);
  const [state, setState] = useState('idle');
  const raf = useRef(0);

  const cancel = useCallback(() => cancelAnimationFrame(raf.current), []);
  const reset = useCallback(() => { cancel(); setT(0); setState('idle'); }, [cancel]);
  const start = useCallback((dur) => {
    cancel();
    if (reduceMotion()) { setT(1); setState('done'); return; }
    setT(0); setState('run');
    let begin = null;
    const step = (ts) => {
      if (begin === null) begin = ts;
      const v = Math.min(1, (ts - begin) / dur);
      setT(v);
      if (v < 1) raf.current = requestAnimationFrame(step); else setState('done');
    };
    raf.current = requestAnimationFrame(step);
  }, [cancel]);

  // Sem cancelamento ao desmontar: os painéis nunca saem da página, e no StrictMode
  // (desenvolvimento) esse cancelamento pararia a primeira execução automática no meio.
  return { t, state, start, reset };
}

// Roda a simulação sozinha na primeira vez em que o painel fica ativo e visível
export function useAutoRun(enabled, run) {
  const done = useRef(false);
  useEffect(() => {
    if (enabled && !done.current) { done.current = true; run(); }
  }, [enabled, run]);
}

export function Status({ id, state }) {
  const cls = 'lab__status' + (state === 'run' ? ' is-running' : state === 'done' ? ' is-done' : '');
  const text = state === 'run' ? 'Executando' : state === 'done' ? 'Medido' : 'Pronto';
  return <span id={id} className={cls} aria-live="polite">{text}</span>;
}

// Controle deslizante com rótulo; --fill pinta a parte já percorrida do trilho
export function RangeField({ id, label, min, max, value, onChange, display = value, valueText }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="lab__field">
      <span className="lab__field-head"><span>{label}</span><output id={`${id}-out`}>{display}</output></span>
      <input
        type="range" id={id} min={min} max={max} step="1" value={value}
        aria-valuetext={valueText}
        style={{ '--fill': `${fill}%` }}
        onChange={(e) => onChange(+e.target.value)}
      />
    </label>
  );
}

export function Metrics({ items }) {
  return (
    <dl className="lab__metrics">
      {items.map(([label, id, value]) => (
        <div key={id}><dt>{label}</dt><dd id={id}>{value}</dd></div>
      ))}
    </dl>
  );
}

// Grade horizontal com rótulos à esquerda e eixo inferior
export function Grid({ R, values, label }) {
  return (
    <>
      {values.map((v) => {
        const y = B - (B - T) * v;
        return (
          <g key={v}>
            <line className="v-grid" x1={L} x2={R} y1={y} y2={y} />
            <text className="v-text" x={L - 8} y={y + 4} textAnchor="end">{label(v)}</text>
          </g>
        );
      })}
      <line className="v-axis" x1={L} x2={R} y1={B} y2={B} />
    </>
  );
}

export function Chart({ id, W, children }) {
  return (
    <svg className="lab__svg" id={id} viewBox={`0 0 ${W} 300`} preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      {children}
    </svg>
  );
}

export function RunButton({ algo, running, onClick, children }) {
  return <button type="button" className="btn-primary lab__run" data-run={algo} disabled={running} onClick={onClick}>{children}</button>;
}
