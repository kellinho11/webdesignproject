// O circuito de cada algoritmo, desenhado em SVG: 4 qubits, portas em colunas e a medição no fim.
// A Demo mostra o do algoritmo escolhido nos Casos (#demo[data-algo], trocado por lib/behaviors/links.js).
const Q = 4, X0 = 54, DX = 46, Y0 = 26, DY = 34;
const y = (q) => Y0 + q * DY;

function Gate({ c, q, label, span = 1, wide = 1, kind = '' }) {
  const x = X0 + c * DX, h = DY * (span - 1) + 24, w = 30 * wide + (wide - 1) * 16;
  return (
    <g className={`cq__gate ${kind}`}>
      <rect x={x - w / 2} y={y(q) - 12} width={w} height={h} />
      <text x={x} y={y(q) + (span - 1) * DY / 2 + 4}>{label}</text>
    </g>
  );
}
const Cx = ({ c, a, b }) => (
  <g className="cq__cx"><line x1={X0 + c * DX} y1={y(a)} x2={X0 + c * DX} y2={y(b)} /><circle cx={X0 + c * DX} cy={y(a)} r="3.5" /><circle className="cq__tgt" cx={X0 + c * DX} cy={y(b)} r="8" /></g>
);
const all = (c, label, kind) => [0, 1, 2, 3].map((q) => <Gate key={`${c}${q}`} c={c} q={q} label={label} kind={kind} />);
const meter = (c) => [0, 1, 2, 3].map((q) => <Gate key={`m${q}`} c={c} q={q} label="M" kind="is-m" />);

const DEFS = {
  qaoa: { cols: 9, name: 'QAOA · p = 2 camadas', body: [...all(0, 'H'), <Gate key="z1" c={1.5} q={0} label="ZZ(γ₁)" span={4} wide={2} kind="is-op" />, ...all(3, 'Rx', 'is-rot'), <Gate key="z2" c={4.5} q={0} label="ZZ(γ₂)" span={4} wide={2} kind="is-op" />, ...all(6, 'Rx', 'is-rot'), ...meter(7.5)] },
  grover: { cols: 9, name: 'Grover · 2 iterações', body: [...all(0, 'H'), <Gate key="o1" c={1.5} q={0} label="Oráculo" span={4} wide={2} kind="is-op" />, <Gate key="d1" c={3.5} q={0} label="Difusão" span={4} wide={2} kind="is-rot" />, <Gate key="o2" c={5.5} q={0} label="Oráculo" span={4} wide={2} kind="is-op" />, <Gate key="d2" c={7.5} q={0} label="Dif." span={4} kind="is-rot" />, ...meter(8.5)] },
  vqe: { cols: 9, name: 'VQE · ansatz de 2 camadas', body: [...all(0, 'Ry', 'is-rot'), <Cx key="a" c={1} a={0} b={1} />, <Cx key="b" c={2} a={1} b={2} />, <Cx key="c" c={3} a={2} b={3} />, ...all(4, 'Ry', 'is-rot'), <Cx key="d" c={5} a={0} b={1} />, <Cx key="e" c={6} a={1} b={2} />, <Cx key="f" c={7} a={2} b={3} />, ...meter(8.5)] },
};

export default function Circuits() {
  return (
    <div className="circuits">
      {Object.entries(DEFS).map(([k, d]) => (
        <figure key={k} className="cq" data-circuit={k}>
          <figcaption className="fig-label">{d.name}</figcaption>
          <svg viewBox={`0 0 ${X0 + (d.cols + 0.6) * DX} ${Y0 + Q * DY - 6}`} role="img" aria-label={`Circuito do ${d.name}`}>
            {[0, 1, 2, 3].map((q) => <g key={q} className="cq__wire"><text x="6" y={y(q) + 4}>q{q}</text><line x1="30" y1={y(q)} x2={X0 + (d.cols + 0.4) * DX} y2={y(q)} /></g>)}
            {d.body}
          </svg>
        </figure>
      ))}
    </div>
  );
}
