// Geometria do criostato de diluição (o "computador quântico"), em coordenadas de um desenho de
// 600 × 760: suspensão, seis estágios de 300 K a 15 mK, linhas coaxiais, câmara de mistura e o chip
// de 5 qubits no fundo. Só dados, calculados uma vez: quem desenha é components/cryostat/Cryostat.jsx.
export const W = 600, H = 760, C = 300, T = 9, CHIP_Y = 618;

export const STAGES = [
  { y: 92, rx: 236, lb: '300 K' }, { y: 178, rx: 206, lb: '50 K' }, { y: 258, rx: 178, lb: '4 K' },
  { y: 334, rx: 150, lb: 'STILL · 800 mK' }, { y: 404, rx: 124, lb: 'CP · 100 mK' }, { y: 470, rx: 100, lb: 'MXC · 15 mK' },
].map((p) => ({ ...p, ry: p.rx * 0.15 }));

const rxAt = (y) => {
  if (y <= STAGES[0].y) return STAGES[0].rx;
  for (let i = 0; i < STAGES.length - 1; i++) {
    const A = STAGES[i], B = STAGES[i + 1];
    if (y <= B.y) return A.rx + ((y - A.y) / (B.y - A.y)) * (B.rx - A.rx);
  }
  return 60;
};
const LANES = [-0.46, -0.23, 0, 0.23, 0.46];
const laneX = (k, y) => C + LANES[k] * Math.min(rxAt(y), 190) * 0.62;
const qx = (k) => C - 48 + k * 24;

function build() {
  let seed = 41;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  // hastes de suporte entre estágios
  const rods = STAGES.slice(0, -1).flatMap((p, i) => [-0.82, -0.42, 0.42, 0.82].map((f) => ({
    x: C + f * p.rx - 2, y: p.y + T, h: STAGES[i + 1].y - p.y - T, skew: -f * 6, ox: C + f * p.rx, oy: p.y,
  })));
  // trocador de calor (Still → MXC)
  let coil = '';
  for (let y = STAGES[3].y + 14; y <= STAGES[5].y - 6; y += 1.5) {
    coil += `${coil ? 'L' : 'M'}${(C - 58 + 11 * Math.sin((y - STAGES[3].y) / 4.2)).toFixed(1)} ${y.toFixed(1)}`;
  }
  // linhas coaxiais XY, do topo até cada qubit
  const coax = LANES.map((_, k) => {
    let d = '';
    for (let y = 24; y <= 560; y += 4) d += `${d ? 'L' : 'M'}${laneX(k, Math.min(y, STAGES[5].y)).toFixed(1)} ${y}`;
    return `${d}L${qx(k)} ${CHIP_Y}`;
  });
  const tiers = STAGES.map((p, i) => ({
    ...p,
    side: `M${C - p.rx} ${p.y}L${C - p.rx} ${p.y + T}A${p.rx} ${p.ry} 0 0 0 ${C + p.rx} ${p.y + T}L${C + p.rx} ${p.y}Z`,
    bolts: Array.from({ length: 13 }, (_, k) => { const t = Math.PI * (k / 12); return [C + Math.cos(t) * p.rx * 0.9, p.y + Math.sin(t) * p.ry * 0.86]; }),
    atts: i > 0 ? LANES.map((_, k) => laneX(k, p.y)) : [],
    frost: Array.from({ length: 9 }, () => { const t = Math.PI * rnd(); return [C + Math.cos(t) * p.rx * (0.96 + rnd() * 0.05), p.y + T + Math.sin(t) * p.ry * 0.98 + rnd() * 3, 0.6 + rnd() * 1.1]; }),
  }));
  const res = [0, 1, 2, 3, 4].map((k) => { let d = `M${qx(k)} ${CHIP_Y + 3}`; for (let j = 0; j < 4; j++) d += `l${j % 2 ? -4 : 4} 2.2`; return d; });
  return { rods, coil, coax, tiers, res, qubits: [0, 1, 2, 3, 4].map(qx) };
}

export const GEO = build();
