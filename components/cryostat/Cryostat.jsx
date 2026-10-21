// O criostato desenhado em SVG (geometria em lib/cryostat.js). Sem a prop `state`, o visual de cada
// estágio fica com o CSS (a máquina de Quantum Engineering troca classes). Com `state`, cada parte
// recebe o valor do quadro, para a intro em Remotion, onde tudo é função do quadro atual:
//   lit    0..6   quantos estágios já resfriaram (fração = o estágio que está acendendo)
//   pulse  0..1   posição dos pulsos nas linhas coaxiais (ausente: pulsos apagados)
//   chip   0..1   superposição no chip (os qubits ficam violeta)
//   rabi   0..1   oscilação de Rabi dos qubits em superposição
//   bus    0..1   emaranhamento (o barramento entre os qubits se acende)
//   bits   [0|1]  medição do registro (ausente: ainda não medido)
import { W, H, C, T, CHIP_Y, GEO } from '@/lib/cryostat';

const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const rgb = (c) => `rgb(${c.join(', ')})`;
const QUBIT = [42, 49, 80], VIOLET = [165, 146, 255], ONE = [255, 255, 255];

export default function Cryostat({ prefix, state, className }) {
  const id = (n) => `${prefix}-${n}`, url = (n) => `url(#${id(n)})`;
  const s = state;
  const on = (i) => (s ? Math.min(1, Math.max(0, s.lit - i)) : undefined);
  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <defs>
        <linearGradient id={id('side')} x1="0" y1="0" x2="1" y2="0">
          {[['0', '#0E0C1A'], ['.35', '#3A4466'], ['.5', '#B9C8F0'], ['.62', '#3A4466'], ['1', '#0E0C1A']].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <linearGradient id={id('top')} x1="0" y1="0" x2="0" y2="1">
          {[['0', '#1A1A2E'], ['.5', '#2C3352'], ['1', '#141326']].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <linearGradient id={id('rod')} x1="0" y1="0" x2="1" y2="0">
          {[['0', '#1B2033'], ['.5', '#8C9BC4'], ['1', '#1B2033']].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
        <radialGradient id={id('glow')}>
          <stop offset="0" stopColor="#8DB4FF" stopOpacity=".7" />
          <stop offset=".4" stopColor="#6B46FF" stopOpacity=".35" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse className="iq-halo" cx={C} cy={640} rx={230} ry={120} fill={url('glow')} style={s && { opacity: 0.28 + 0.62 * s.chip }} />
      {[-120, 120].map((dx) => <line key={dx} className="iq-hang" x1={C + dx} y1={0} x2={C + dx * 0.9} y2={GEO.tiers[0].y} />)}
      {GEO.rods.map((r, k) => <rect key={k} className="iq-rod" x={r.x} y={r.y} width={4} height={r.h} fill={url('rod')} transform={`skewX(${r.skew.toFixed(1)})`} transformOrigin={`${r.ox} ${r.oy}`} />)}
      <path className="iq-coil" d={GEO.coil} />
      {GEO.coax.map((d, k) => <path key={k} className="iq-coax" d={d} />)}
      {GEO.coax.map((d, k) => (
        <path key={k} className="iq-pulse" d={d} pathLength="100"
          style={s && { opacity: s.pulse === undefined ? 0 : 1, strokeDashoffset: s.pulse === undefined ? 100 : 100 - ((s.pulse * 100 + k * 12) % 100) }} />
      ))}

      {GEO.tiers.map((p, i) => (
        <g key={i} className="iq-tier" data-on={s ? on(i) > 0.5 : undefined}>
          <path className="iq-side" d={p.side} fill={url('side')} />
          <ellipse className="iq-top" cx={C} cy={p.y} rx={p.rx} ry={p.ry} fill={url('top')}
            style={s && { stroke: rgb(mix([220, 230, 255], [141, 180, 255], on(i))), filter: on(i) ? `drop-shadow(0 0 ${6 * on(i)}px rgba(59, 130, 246, 0.9))` : 'none' }} />
          <ellipse className="iq-hole" cx={C} cy={p.y} rx={p.rx * 0.32} ry={p.ry * 0.32} />
          {p.bolts.map(([x, y], k) => <circle key={k} className="iq-bolt" cx={x.toFixed(1)} cy={y.toFixed(1)} r={1.3} />)}
          {p.atts.map((x, k) => (
            <g key={k}>
              <rect className="iq-att" x={(x - 3).toFixed(1)} y={p.y - 13} width={6} height={11} rx={1.2} style={s && { fill: rgb(mix([26, 31, 51], [107, 70, 255], on(i))) }} />
              <circle className="iq-sma" cx={x.toFixed(1)} cy={p.y - 1} r={2} />
            </g>
          ))}
          <line className="iq-tick" x1={C + p.rx + 6} y1={p.y + 4} x2={C + p.rx + 22} y2={p.y + 4} />
          <text className="iq-label" x={C + p.rx + 27} y={p.y + 8}>{p.lb}</text>
          {p.frost.map(([x, y, r], k) => <circle key={k} className="iq-frost" cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(2)} style={s && { opacity: 0.45 * (1 - on(i)) }} />)}
        </g>
      ))}

      <g className="iq-mxc">
        <rect x={C - 36} y={GEO.tiers[5].y + T} width={72} height={44} fill={url('side')} />
        <ellipse cx={C} cy={GEO.tiers[5].y + T + 44} rx={36} ry={6} fill={url('side')} />
        <rect x={C - 7} y={GEO.tiers[5].y + 58} width={14} height={CHIP_Y - GEO.tiers[5].y - 70} fill={url('rod')} />
      </g>

      <g className="iq-chipg">
        <polygon className="iq-pkg-l" points={[C - 104, CHIP_Y, C, CHIP_Y + 26, C, CHIP_Y + 40, C - 104, CHIP_Y + 14].join(' ')} />
        <polygon className="iq-pkg-r" points={[C, CHIP_Y + 26, C + 104, CHIP_Y, C + 104, CHIP_Y + 14, C, CHIP_Y + 40].join(' ')} />
        <polygon className="iq-pkg-t" points={[C - 104, CHIP_Y, C, CHIP_Y - 26, C + 104, CHIP_Y, C, CHIP_Y + 26].join(' ')} />
        <polygon className="iq-die" points={[C - 70, CHIP_Y, C, CHIP_Y - 17.5, C + 70, CHIP_Y, C, CHIP_Y + 17.5].join(' ')} style={s && s.chip > 0 ? { stroke: '#A592FF' } : undefined} />
        {GEO.qubits.slice(0, -1).map((x, k) => (
          <line key={k} className="iq-bus" x1={x} y1={CHIP_Y} x2={GEO.qubits[k + 1]} y2={CHIP_Y} pathLength="1"
            style={s && { strokeDashoffset: 1 - s.bus, stroke: s.bus ? '#A592FF' : undefined }} />
        ))}
        {GEO.res.map((d, k) => <path key={k} className="iq-res" d={d} />)}
        {GEO.qubits.map((x, k) => {
          const measured = s && s.bits, sup = s ? s.chip * (measured ? 0 : 1) : 0;
          const wobble = s ? 1 + 0.25 * sup * Math.sin((s.rabi + k * 0.17) * Math.PI * 2) : 1;
          return (
            <circle key={k} className="iq-q" cx={x} cy={CHIP_Y} r={4.2}
              style={s && { fill: rgb(measured ? (s.bits[k] ? ONE : QUBIT) : mix(QUBIT, VIOLET, sup)), scale: wobble, filter: measured && s.bits[k] ? 'drop-shadow(0 0 5px #8DB4FF)' : 'none' }} />
          );
        })}
        <text className="iq-chiplabel" x={C} y={CHIP_Y + 60} textAnchor="middle">SQ-5 · q0 q1 q2 q3 q4</text>
      </g>
    </svg>
  );
}
