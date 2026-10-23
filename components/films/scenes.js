// Cenas dos filmes explicativos. Cada cena é draw(ctx, t, w, h, b): desenha o quadro do instante t
// (segundos, de 0 à duração) num canvas de w × h px. O fundo ASCII ocupa o canvas inteiro; textos e
// gráficos ficam dentro de b = {x, y, w, h}, a área livre entre a barra de título e a legenda. Nada aqui guarda estado entre quadros: o mesmo
// t sempre dá o mesmo quadro, então pausar, voltar ao loop ou mostrar um quadro parado é trivial.

const RAMP = ' .:-=+*#%@';
const INK = '238, 243, 255';
const BLUE = '59, 130, 246';
const VIOLET = '139, 112, 255';
const ICE = '201, 216, 255';
// a família real vem do next/font (nome gerado no build); o Film a informa antes do primeiro quadro
let MONO = 'ui-monospace, monospace';
export const setMono = (family) => { if (family) MONO = family; };

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
// ease-out forte (cubic-bezier(0.23, 1, 0.32, 1) aproximado) e ease-in-out para movimento na tela
export const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 4);
export const easeInOut = (x) => { x = clamp(x); return x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2; };
const phase = (t, a, b) => clamp((t - a) / (b - a));       // progresso 0..1 de t dentro de [a, b]
const rand = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// Folha de glifos: cada caractere da rampa, numa cor, desenhado uma vez (o brilho vem do próprio
// caractere: quanto mais denso, mais opaco). O campo ASCII só copia daqui com drawImage, que custa
// bem menos que um fillText por célula. Chave: cor, tamanho, escala da tela e fonte.
const sheets = new Map();
if (typeof document !== 'undefined' && document.fonts) document.fonts.ready.then(() => sheets.clear());
function sheet(color, cell, dpr) {
  const key = `${color}|${cell}|${dpr}|${MONO}`;
  let s = sheets.get(key);
  if (s) return s;
  const cw = cell * 0.62, gw = Math.ceil(cw * dpr), gh = Math.ceil(cell * dpr);
  const c = document.createElement('canvas'); c.width = gw * RAMP.length; c.height = gh;
  const g = c.getContext('2d');
  g.scale(dpr, dpr); g.font = `${cell * 0.92}px ${MONO}`; g.textBaseline = 'top';
  for (let i = 1; i < RAMP.length; i++) {
    g.fillStyle = `rgba(${color}, ${0.18 + 0.62 * ((i + 0.5) / RAMP.length)})`;
    g.fillText(RAMP[i], (i * gw) / dpr, 0);
  }
  s = { c, gw, gh };
  sheets.set(key, s);
  return s;
}

// Campo ASCII: a grade cobre o canvas; field(c, r) devolve 0..1 (densidade) e, opcional, uma cor RGB
function ascii(ctx, w, h, cell, field) {
  const cw = cell * 0.62, cols = Math.ceil(w / cw), rows = Math.ceil(h / cell);
  const dpr = ctx.getTransform().a, ink = sheet(INK, cell, dpr);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = field(c / cols, r / rows, c, r);
      const d = typeof v === 'number' ? v : v[0];
      if (d < 0.06) continue;
      const i = Math.min(RAMP.length - 1, Math.floor(d * RAMP.length));
      if (!i) continue;
      const g = typeof v === 'number' ? ink : sheet(v[1], cell, dpr);
      ctx.drawImage(g.c, i * g.gw, 0, g.gw, g.gh, c * cw, r * cell, g.gw / dpr, g.gh / dpr);
    }
  }
}
function label(ctx, text, x, y, { size = 12, color = INK, alpha = 0.9, align = 'left', weight = 500 } = {}) {
  ctx.font = `${weight} ${size}px ${MONO}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.fillStyle = `rgba(${color}, ${alpha})`; ctx.fillText(text, x, y); ctx.textAlign = 'left';
}
function line(ctx, pts, color, width, alpha = 1) {
  ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = `rgba(${color}, ${alpha})`; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
}
function dot(ctx, x, y, r, color, alpha = 1) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${color}, ${alpha})`; ctx.fill(); }
const fmtTime = (s) => (s < 1 ? `${Math.round(s * 1000)} ms` : s < 60 ? `${s.toFixed(s < 10 ? 1 : 0)} s` : s < 3600 ? `${Math.round(s / 60)} min` : s < 86400 ? `${Math.round(s / 3600)} h` : s < 31557600 ? `${Math.round(s / 86400)} dias` : `${Math.round(s / 31557600).toLocaleString('pt-BR')} anos`);

/* --- Tecnologia: clássico testa um caminho por vez; quântico avalia em superposição --- */
export function compare(ctx, t, w, h, b) {
  const n = 10 + 50 * easeInOut(phase(t, 6, 13));            // tamanho do problema cresce no ato 3
  const cols = Math.ceil(w / (14 * 0.62));
  ascii(ctx, w, h, 14, (x, y, c, r) => {
    if (t < 3) {                                               // ato 1: varredura, uma célula por vez
      const k = r * cols + c, head = Math.floor((t / 3) * cols * 14);
      return k < head ? [0.3, BLUE] : k === head ? [1, ICE] : 0.12;   // ainda não testado: '.'
    }
    const wave = 0.5 + 0.5 * Math.sin(x * 14 + t * 2.2) * Math.cos(y * 9 - t * 1.6);   // ato 2+: interferência
    return [(0.1 + 0.5 * wave * clamp((t - 3) / 1.5)) * (t > 6 ? 0.55 : 1), VIOLET];
  });
  if (t < 3) label(ctx, `caminho ${Math.floor((t / 3) * cols * 14).toLocaleString('pt-BR')} de 2ⁿ…`, b.x + 4, b.y + 10, { color: ICE });
  else if (t < 6) label(ctx, 'todos os caminhos em superposição', b.x + 4, b.y + 10, { color: ICE, alpha: easeOut(phase(t, 3, 4)) });
  const L = b.x + b.w * 0.06, R = b.x + b.w * 0.96, T = b.y + 44, B = b.y + b.h - 26;
  const X = (k) => L + (R - L) * (k / 60), expY = (k) => B - (B - T) * (Math.pow(2, k / 6) - 1) / (Math.pow(2, 10) - 1), sqY = (k) => B - (B - T) * 0.14 * Math.sqrt(k / 60);
  const reveal = easeOut(phase(t, 6, 9));
  if (reveal > 0) {
    line(ctx, [[L, B], [R, B]], INK, 1, 0.25);
    const upto = 60 * reveal, pe = [], pq = [];
    for (let k = 0; k <= upto; k += 0.5) { pe.push([X(k), expY(k)]); pq.push([X(k), sqY(k)]); }
    line(ctx, pe, INK, 2, 0.75); line(ctx, pq, BLUE, 3);
    label(ctx, 'clássico · O(2ⁿ)', X(Math.min(upto, 55)) - 10, expY(Math.min(upto, 55)), { align: 'right', alpha: 0.75 });
    label(ctx, 'quântico · O(√2ⁿ)', X(Math.min(upto, 60)), sqY(Math.min(upto, 60)) - 16, { align: 'right', color: ICE });
    const x = X(n); line(ctx, [[x, T], [x, B]], INK, 1, 0.3 * reveal);
    dot(ctx, x, expY(n), 5, INK, reveal); dot(ctx, x, sqY(n), 6, BLUE, reveal);
    const tc = Math.pow(2, n) * 2.8e-8, tq = 3e-6 * Math.pow(2, n / 2);
    label(ctx, `n = ${Math.round(n)}`, x, B + 14, { align: 'center', size: 11, alpha: 0.7 * reveal });
    label(ctx, `${Math.round(n)} variáveis: ${fmtTime(tc)} × ${fmtTime(tq)}`, b.x + 4, b.y + 10, { size: 15, weight: 600, color: ICE, alpha: reveal });
  }
}

/* --- QAOA: camadas do circuito puxam a carteira para o menor risco --- */
const NODES = [[0.08, 0.6], [0.3, 0.2], [0.34, 0.9], [0.55, 0.5], [0.74, 0.12], [0.78, 0.86], [0.96, 0.5]];
const EDGES = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6], [2, 5]];
export function qaoa(ctx, t, w, h, b) {
  const p = Math.min(4, Math.floor(t / 2) + 1);               // camada do circuito (1 a 4)
  const settle = easeOut(phase(t, 0, 8));
  ascii(ctx, w, h, 12, (x, y) => {                             // paisagem de risco que vai assentando
    const v = 0.5 + 0.5 * Math.sin(x * 9 + 1.7) * Math.cos(y * 7 + t * 0.4) * (1 - settle * 0.7);
    return [clamp(v * 0.5), y < 0.5 ? VIOLET : INK];
  });
  const P = ([x, y]) => [b.x + 10 + x * (b.w - 20), b.y + 26 + y * (b.h - 36)];
  EDGES.forEach(([a, c]) => line(ctx, [P(NODES[a]), P(NODES[c])], INK, 1.2, 0.28));
  const best = [3, 4];
  line(ctx, [P(NODES[best[0]]), P(NODES[best[1]])], VIOLET, 3, settle);
  NODES.forEach((nd, i) => { const [x, y] = P(nd); dot(ctx, x, y, best.includes(i) ? 6 + 3 * settle : 5, best.includes(i) ? VIOLET : INK, best.includes(i) ? 1 : 0.7); });
  label(ctx, `p = ${p}`, b.x + 4, b.y + 8, { color: ICE, size: 11 });
  label(ctx, `risco ${(0.42 - 0.3 * settle).toFixed(2).replace('.', ',')}`, b.x + b.w - 4, b.y + 8, { align: 'right', size: 11 });
}

/* --- VQE: o quântico mede a energia, o clássico ajusta, até chegar em E₀ --- */
export function vqe(ctx, t, w, h, b) {
  const k = easeOut(phase(t, 0, 7.5));
  ascii(ctx, w, h, 12, (x, y) => {                             // nuvem eletrônica em volta do núcleo
    const dx = x - 0.2, dy = (y - 0.55) * 0.75, r = Math.sqrt(dx * dx + dy * dy);
    return [clamp(0.9 * Math.exp(-r * 8) + 0.3 * Math.sin(r * 40 - t * 4) * Math.exp(-r * 4)), VIOLET];
  });
  const L = b.x + b.w * 0.42, R = b.x + b.w - 6, T = b.y + 26, B = b.y + b.h - 6, E0 = B - (B - T) * 0.12;
  line(ctx, [[L, T], [L, B]], INK, 1, 0.25);
  line(ctx, [[L, E0], [R, E0]], INK, 1, 0.45);
  label(ctx, 'E₀', R, E0 - 10, { align: 'right', color: ICE, size: 11 });
  const pts = [];
  for (let i = 0; i <= 60 * k; i++) {
    const u = i / 60, e = Math.exp(-u * 4.5) * (1 + 0.25 * Math.sin(u * 22));
    pts.push([L + (R - L) * u, E0 - (E0 - T) * e]);
  }
  if (pts.length > 1) { line(ctx, pts, BLUE, 2.5); const [x, y] = pts[pts.length - 1]; dot(ctx, x, y, 4.5, ICE); }
  label(ctx, `iteração ${Math.round(k * 60)}`, b.x + 4, b.y + 8, { size: 11, color: ICE });
  label(ctx, `erro ${(1.6 + 40 * Math.exp(-k * 5)).toFixed(1).replace('.', ',')} mHa`, b.x + b.w - 4, b.y + 8, { size: 11, align: 'right' });
}

/* --- Grover: a amplificação faz o registro certo se destacar em ≈ √N passos --- */
export function grover(ctx, t, w, h, b) {
  const COLS = 12, ROWS = 5, TARGET = 31, it = Math.min(3, Math.floor(t / 2.2)), a = easeOut(phase(t, 0.6, 7));
  ascii(ctx, w, h, 12, (x, y) => [0.1 + 0.06 * Math.sin(x * 30 + y * 12 + t), INK]);
  const gx = b.x + 6, gy = b.y + 26, cw = (b.w - 12) / COLS, ch = (b.h - 30) / ROWS;
  ctx.font = `${Math.min(cw, ch) * 0.7}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 0; i < COLS * ROWS; i++) {
    const x = gx + (i % COLS + 0.5) * cw, y = gy + (Math.floor(i / COLS) + 0.5) * ch;
    const hit = i === TARGET, amp = hit ? 0.3 + 0.7 * a : 0.42 * (1 - a * 0.7) + 0.06 * rand(i + Math.floor(t * 3));
    ctx.fillStyle = `rgba(${hit ? VIOLET : INK}, ${0.25 + 0.75 * amp})`;
    ctx.fillText(RAMP[Math.max(1, Math.min(RAMP.length - 1, Math.floor(amp * RAMP.length)))], x, y);
  }
  ctx.textAlign = 'left';
  label(ctx, `iteração ${it} de 3`, b.x + 4, b.y + 8, { color: ICE, size: 11 });
  label(ctx, '≈ π/4 · √N', b.x + b.w - 4, b.y + 8, { align: 'right', size: 11 });
}

/* --- Demo: os shots caem, o histograma se forma e a resposta mais frequente vence --- */
// cada caso de uso dá um histograma diferente: a QAOA acha a melhor carteira, o Grover quase sempre
// acerta o registro marcado e o VQE espalha mais (a energia mínima é a mais provável, não a única)
export const RUNS = {
  qaoa: { bits: ['000110', '110110', '010010', '110100', '001011', '100110', '110111', '011001'], prob: [0.04, 0.61, 0.03, 0.12, 0.02, 0.09, 0.07, 0.02], win: 1, what: 'carteira de menor risco' },
  grover: { bits: ['000000', '010111', '101101', '001110', '110001', '011010', '100100', '111011'], prob: [0.01, 0.02, 0.91, 0.01, 0.02, 0.01, 0.01, 0.01], win: 2, what: 'registro encontrado' },
  vqe: { bits: ['1100', '1010', '1001', '0110', '0101', '0011', '1110', '0111'], prob: [0.48, 0.17, 0.11, 0.08, 0.06, 0.05, 0.03, 0.02], win: 0, what: 'estado de menor energia' },
};
export function demo(ctx, t, w, h, b, o = {}) {
  const run = RUNS[o.algo] || RUNS.qaoa, BITS = run.bits, PROB = run.prob, WIN = run.win;
  const shots = Math.round(1024 * easeInOut(phase(t, 1, 11))), f = shots / 1024;
  const cell = 13, cw = cell * 0.62;
  // fundo: grade fria quase apagada; à esquerda, rastros de 0 e 1 caindo (cada rastro é um shot medido)
  ascii(ctx, w, h, cell, (x, y) => (x < 0.3 ? 0 : 0.07));
  ctx.font = `${cell}px ${MONO}`; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  const rainCols = Math.floor((b.x + b.w * 0.26) / cw), rainRows = Math.ceil(h / cell);
  for (let c = 0; c < rainCols; c += 2) {
    const speed = 0.25 + rand(c) * 0.35, len = 6 + Math.floor(rand(c + 3) * 8);
    const head = ((t * speed + rand(c + 9)) % 1.4) * rainRows * 1.1;
    for (let k = 0; k < len; k++) {
      const r = Math.floor(head) - k; if (r < 0 || r >= rainRows) continue;
      const hot = rand(c * 31 + r) < 0.18;
      ctx.fillStyle = `rgba(${k === 0 ? ICE : hot ? VIOLET : INK}, ${(k === 0 ? 0.95 : 0.55) * (1 - k / len)})`;
      ctx.fillText(rand(c * 7 + r + Math.floor(t * 4)) < 0.5 ? '0' : '1', c * cw, r * cell);
    }
  }
  // histograma em blocos ASCII: colunas de caracteres empilhados na grade
  const x0 = b.x + b.w * 0.32, x1 = b.x + b.w - 8, base = b.y + b.h - 22, top = b.y + 48;
  const slot = (x1 - x0) / BITS.length, barCols = Math.max(2, Math.floor((slot * 0.62) / cw)), maxRows = Math.floor((base - top) / cell);
  ctx.font = `${cell}px ${MONO}`; ctx.textBaseline = 'bottom'; ctx.textAlign = 'left';
  BITS.forEach((bits, i) => {
    const val = (PROB[i] / PROB[WIN]) * f + 0.05 * (1 - f) * (0.5 + 0.5 * Math.sin(t * 5 + i));
    const rowsOn = val * maxRows, full = Math.floor(rowsOn), frac = rowsOn - full;
    const bx = x0 + i * slot + (slot - barCols * cw) / 2;
    for (let r = 0; r <= full; r++) {
      const ch = r < full ? '█' : RAMP[Math.floor(frac * (RAMP.length - 1))];
      ctx.fillStyle = `rgba(${i === WIN ? VIOLET : INK}, ${i === WIN ? 0.95 : 0.5})`;
      for (let q = 0; q < barCols; q++) ctx.fillText(ch, bx + q * cw, base - r * cell);
    }
    if (slot > 52) label(ctx, bits, x0 + i * slot + slot / 2, base + 12, { size: 10, align: 'center', alpha: i === WIN ? 0.95 : 0.45, color: i === WIN ? VIOLET : INK });
  });
  // em tela estreita os dois rótulos não cabem lado a lado: o resultado desce uma linha
  const tight = b.w < 520;
  label(ctx, `shots ${shots.toLocaleString('pt-BR')} / 1.024`, tight ? b.x + 4 : x0, b.y + 10, { color: ICE });
  const win = easeOut(phase(t, 10, 11.5));
  if (win > 0) label(ctx, `|${BITS[WIN]}⟩ · ${Math.round(PROB[WIN] * 100)}% · ${run.what}`, tight ? b.x + 4 : b.x + b.w - 4, b.y + (tight ? 28 : 10), { align: tight ? 'left' : 'right', color: VIOLET, weight: 600, alpha: win });
}

/* --- API: a requisição sai, a QPU calcula a −273 °C e a resposta volta --- */
const REQ = ['POST /v1/quantum/solve', '{ "algorithm": "QAOA",', '  "assets": 1200, "qubits": 64 }'];
const QPU = [
  '   ._______.   ',
  '   |=======|   ',
  '    \\=====/    ',
  '     |===|     ',
  '    /=====\\    ',
  '   |=======|   ',
  '    \\_____/    ',
  '     [qpu]     ',
];
export function api(ctx, t, w, h, b) {
  const busy = t > 4.4 && t < 6.6;
  // fundo: campo frio, que "ferve" de leve enquanto a QPU calcula
  ascii(ctx, w, h, 12, (x, y) => {
    const dx = x - 0.78, dy = y - 0.5, r = Math.sqrt(dx * dx + dy * dy);
    return [clamp((busy ? 0.5 : 0.28) * Math.exp(-r * 4) + 0.05 + (busy ? 0.15 * Math.sin(r * 50 - t * 8) * Math.exp(-r * 6) : 0)), busy ? VIOLET : BLUE];
  });
  const all = REQ.join('\n'), typed = Math.floor(clamp(t / 3) * all.length), lines = all.slice(0, typed).split('\n');
  lines.forEach((l, i) => label(ctx, l, b.x + 4, b.y + 10 + i * 20, { size: 13, color: i === 0 ? ICE : INK, alpha: 0.9 }));
  const size = Math.min(13, b.h / 14), qx = b.x + b.w * 0.78, qy = b.y + b.h * 0.58 - (QPU.length * size * 1.15) / 2;
  QPU.forEach((row, i) => label(ctx, row, qx, qy + i * size * 1.15, { size, align: 'center', color: busy ? VIOLET : INK, alpha: 0.9 }));
  const y = b.y + b.h * 0.58, xa = b.x + 8, xb = qx - size * 5;
  line(ctx, [[xa, y], [xb, y]], INK, 1, 0.25);
  label(ctx, 'app', xa, y - 14, { size: 11, alpha: 0.6 });
  const go = phase(t, 3.2, 4.4), back = phase(t, 6.6, 7.8);
  if (go > 0 && go < 1) dot(ctx, xa + (xb - xa) * easeInOut(go), y, 5, VIOLET);
  if (back > 0 && back < 1) dot(ctx, xb - (xb - xa) * easeInOut(back), y, 5, BLUE);
  if (busy) label(ctx, `−273 °C · ${Math.round(phase(t, 4.4, 6.6) * 64)} / 64 qubits`, qx, qy + QPU.length * size * 1.15 + 10, { align: 'center', size: 11, color: VIOLET });
  if (t >= 7.8) {
    const a = easeOut(phase(t, 7.8, 8.6));
    label(ctx, '200 OK · 340 ms', b.x + 4, b.y + b.h - 34, { size: 13, color: ICE, alpha: a, weight: 600 });
    label(ctx, '{ "approx_ratio": 0.94, "risk": 0.12 }', b.x + 4, b.y + b.h - 14, { size: 12, alpha: 0.85 * a });
  }
}

export default { compare, qaoa, vqe, grover, demo, api };
