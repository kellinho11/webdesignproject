// Desenho do criostato de diluição (o "computador quântico") em SVG: suspensão, seis estágios de
// 300 K a 15 mK, linhas coaxiais com pulsos, câmara de mistura e o chip de 5 qubits no fundo.
// Usado pela intro e pelo instrumento fixo da página (lib/behaviors/machine.js). prefix separa os ids
// dos degradês, porque os dois desenhos convivem no mesmo documento.
export function buildCryostat(svg, prefix = 'iq') {
  const id = (n) => `${prefix}-${n}`;
  const url = (n) => `url(#${prefix}-${n})`;
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (t, at, p) => { const n = document.createElementNS(NS, t); for (const k in at) n.setAttribute(k, at[k]); (p || svg).appendChild(n); return n; };
  let seed = 41; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const C = 300, T = 9;
  const ST = [
    { y: 92, rx: 236, lb: '300 K' }, { y: 178, rx: 206, lb: '50 K' }, { y: 258, rx: 178, lb: '4 K' },
    { y: 334, rx: 150, lb: 'STILL · 800 mK' }, { y: 404, rx: 124, lb: 'CP · 100 mK' }, { y: 470, rx: 100, lb: 'MXC · 15 mK' }
  ].map((p) => ({ ...p, ry: p.rx * 0.15 }));
  const rxAt = (y) => { if (y <= ST[0].y) return ST[0].rx; for (let i = 0; i < ST.length - 1; i++) { const A = ST[i], B = ST[i + 1]; if (y <= B.y) return A.rx + ((y - A.y) / (B.y - A.y)) * (B.rx - A.rx); } return 60; };

  const defs = mk('defs', {});
  const lg = (id, stops, x2 = '1', y2 = '0') => { const g = mk('linearGradient', { id, x1: '0', y1: '0', x2, y2 }, defs); stops.forEach(([o, c, op]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': op ?? 1 }, g)); };
  lg(id('side'), [['0', '#0E0C1A'], ['.35', '#3A4466'], ['.5', '#B9C8F0'], ['.62', '#3A4466'], ['1', '#0E0C1A']]);
  lg(id('top'), [['0', '#1A1A2E'], ['.5', '#2C3352'], ['1', '#141326']], '0', '1');
  lg(id('rod'), [['0', '#1B2033'], ['.5', '#8C9BC4'], ['1', '#1B2033']]);
  const rg = mk('radialGradient', { id: id('glow') }, defs);
  [['0', '#8DB4FF', '.7'], ['.4', '#6B46FF', '.35'], ['1', '#3B82F6', '0']].forEach(([o, c, op]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }, rg));
  const rv = mk('radialGradient', { id: id('vapor') }, defs);
  [['0', '#DCE6FF', '.22'], ['1', '#DCE6FF', '0']].forEach(([o, c, op]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }, rv));

  mk('ellipse', { cx: C, cy: 640, rx: 230, ry: 120, fill: url('glow'), class: 'iq-halo' });
  // Suspensão
  [-120, 120].forEach((dx) => mk('line', { x1: C + dx, y1: 0, x2: C + dx * 0.9, y2: ST[0].y, class: 'iq-hang' }));
  // Hastes de suporte entre estágios
  ST.forEach((p, i) => {
    const n = ST[i + 1]; if (!n) return;
    [-0.82, -0.42, 0.42, 0.82].forEach((f) => mk('rect', { x: C + f * p.rx - 2, y: p.y + T, width: 4, height: n.y - p.y - T, fill: url('rod'), class: 'iq-rod', transform: 'skewX(' + (-f * 6).toFixed(1) + ')', 'transform-origin': (C + f * p.rx) + ' ' + p.y }));
  });
  // Trocador de calor (Still → MXC)
  let coil = '';
  for (let y = ST[3].y + 14; y <= ST[5].y - 6; y += 1.5) { const x = C - 58 + 11 * Math.sin((y - ST[3].y) / 4.2); coil += (coil ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
  mk('path', { d: coil, class: 'iq-coil' });
  // Linhas coaxiais XY (5) + pulsos
  const lanes = [-0.46, -0.23, 0, 0.23, 0.46];
  const laneX = (k, y) => C + lanes[k] * Math.min(rxAt(y), 190) * 0.62;
  const CHIP_Y = 618;
  const pulses = lanes.map((_, k) => {
    let d = '';
    for (let y = 24; y <= 560; y += 4) d += (d ? 'L' : 'M') + laneX(k, Math.min(y, ST[5].y)).toFixed(1) + ' ' + y;
    d += 'L' + (C - 48 + k * 24) + ' ' + CHIP_Y;
    mk('path', { d, class: 'iq-coax' });
    const p = mk('path', { d, class: 'iq-pulse', pathLength: '100' });
    p.style.setProperty('--pd', (k * 0.12).toFixed(2) + 's');
    return p;
  });
  // Estágios (placas com volume, parafusos, atenuadores, rótulos)
  const tiers = ST.map((p, i) => {
    const g = mk('g', { class: 'iq-tier', style: '--i:' + i });
    mk('path', { d: 'M' + (C - p.rx) + ' ' + p.y + 'L' + (C - p.rx) + ' ' + (p.y + T) + 'A' + p.rx + ' ' + p.ry + ' 0 0 0 ' + (C + p.rx) + ' ' + (p.y + T) + 'L' + (C + p.rx) + ' ' + p.y + 'Z', fill: url('side'), class: 'iq-side' }, g);
    mk('ellipse', { cx: C, cy: p.y, rx: p.rx, ry: p.ry, fill: url('top'), class: 'iq-top' }, g);
    mk('ellipse', { cx: C, cy: p.y, rx: p.rx * 0.32, ry: p.ry * 0.32, class: 'iq-hole' }, g);
    for (let k = 0; k <= 12; k++) { const t = Math.PI * (k / 12); mk('circle', { cx: (C + Math.cos(t) * p.rx * 0.9).toFixed(1), cy: (p.y + Math.sin(t) * p.ry * 0.86).toFixed(1), r: 1.3, class: 'iq-bolt' }, g); }
    if (i > 0) lanes.forEach((_, k) => { const x = laneX(k, p.y); mk('rect', { x: (x - 3).toFixed(1), y: p.y - 13, width: 6, height: 11, rx: 1.2, class: 'iq-att' }, g); mk('circle', { cx: x.toFixed(1), cy: p.y - 1, r: 2, class: 'iq-sma' }, g); });
    mk('line', { x1: C + p.rx + 6, y1: p.y + 4, x2: C + p.rx + 22, y2: p.y + 4, class: 'iq-tick' }, g);
    const tx = mk('text', { x: C + p.rx + 27, y: p.y + 8, class: 'iq-label' }, g); tx.textContent = p.lb;
    // Geada nas bordas
    for (let k = 0; k < 9; k++) { const t = Math.PI * rnd(); mk('circle', { cx: (C + Math.cos(t) * p.rx * (0.96 + rnd() * 0.05)).toFixed(1), cy: (p.y + T + Math.sin(t) * p.ry * 0.98 + rnd() * 3).toFixed(1), r: (0.6 + rnd() * 1.1).toFixed(2), class: 'iq-frost', style: '--fd:' + (rnd() * 4).toFixed(2) + 's' }, g); }
    return g;
  });
  // Câmara de mistura + dedo frio
  const mx = mk('g', { class: 'iq-mxc' });
  mk('rect', { x: C - 36, y: ST[5].y + T, width: 72, height: 44, fill: url('side') }, mx);
  mk('ellipse', { cx: C, cy: ST[5].y + T + 44, rx: 36, ry: 6, fill: url('side') }, mx);
  mk('rect', { x: C - 7, y: ST[5].y + 58, width: 14, height: CHIP_Y - ST[5].y - 70, fill: url('rod') }, mx);
  // Pacote do chip (isométrico)
  const chip = mk('g', { class: 'iq-chipg' });
  const W = 104, Hh = 26;
  mk('polygon', { points: [C - W, CHIP_Y, C, CHIP_Y + Hh, C, CHIP_Y + Hh + 14, C - W, CHIP_Y + 14].join(' '), class: 'iq-pkg-l' }, chip);
  mk('polygon', { points: [C, CHIP_Y + Hh, C + W, CHIP_Y, C + W, CHIP_Y + 14, C, CHIP_Y + Hh + 14].join(' '), class: 'iq-pkg-r' }, chip);
  mk('polygon', { points: [C - W, CHIP_Y, C, CHIP_Y - Hh, C + W, CHIP_Y, C, CHIP_Y + Hh].join(' '), class: 'iq-pkg-t' }, chip);
  mk('polygon', { points: [C - 70, CHIP_Y, C, CHIP_Y - 17.5, C + 70, CHIP_Y, C, CHIP_Y + 17.5].join(' '), class: 'iq-die' }, chip);
  const qx = (k) => C - 48 + k * 24;
  const buses = [0, 1, 2, 3].map((k) => mk('line', { x1: qx(k), y1: CHIP_Y, x2: qx(k + 1), y2: CHIP_Y, class: 'iq-bus', pathLength: '1' }, chip));
  [0, 1, 2, 3, 4].forEach((k) => { let d = 'M' + qx(k) + ' ' + (CHIP_Y + 3); for (let j = 0; j < 4; j++) d += 'l' + (j % 2 ? -4 : 4) + ' 2.2'; mk('path', { d, class: 'iq-res' }, chip); });
  const qubits = [0, 1, 2, 3, 4].map((k) => mk('circle', { cx: qx(k), cy: CHIP_Y, r: 4.2, class: 'iq-q', style: '--rd:' + (0.62 + k * 0.17).toFixed(2) + 's' }, chip));
  const qlbl = mk('text', { x: C, y: CHIP_Y + Hh + 34, class: 'iq-chiplabel', 'text-anchor': 'middle' }, chip); qlbl.textContent = 'SQ-5 · q0 q1 q2 q3 q4';
  // Neve / vapor
  for (let k = 0; k < 46; k++) mk('circle', { cx: (C + (rnd() - 0.5) * 420).toFixed(1), cy: (60 + rnd() * 560).toFixed(1), r: (0.5 + rnd() * 1.2).toFixed(2), class: 'iq-snow', style: '--sd:' + (6 + rnd() * 7).toFixed(1) + 's;--so:' + (-rnd() * 10).toFixed(1) + 's' });
  [[C - 70, 560, 90], [C + 80, 580, 70], [C, 690, 160]].forEach(([x, y, r], k) => mk('ellipse', { cx: x, cy: y, rx: r, ry: r * 0.35, fill: url('vapor'), class: 'iq-vap', style: '--vd:' + (9 + k * 3) + 's' }));
  return { tiers, qubits, pulses, buses, ST, CHIP_Y };
}
