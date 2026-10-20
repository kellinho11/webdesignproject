// Simulações ilustrativas da demonstração ao vivo.
// Funções puras: recebem os controles e devolvem números. A interface fica nos componentes.

// gerador pseudoaleatório com semente: os mesmos controles dão sempre o mesmo resultado
export const rng = (seed) => () => {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* --- QAOA: das 16 carteiras mais amostradas, a de menor risco ganha peso a cada camada --- */
export const QAOA_K = 16;

export function qaoaModel(n, p) {
  const r = rng(n * 131 + 7);
  const strings = [];
  while (strings.length < QAOA_K) {
    let s = '';
    for (let i = 0; i < n; i++) s += r() < 0.38 ? '1' : '0';
    if (s.includes('1') && !strings.includes(s)) strings.push(s);
  }
  // o índice 0 é a melhor carteira; mais camadas concentram a probabilidade nela
  const beta = 0.22 + 0.32 * p;
  const w = strings.map((_, rank) => Math.exp(-beta * rank));
  const sum = w.reduce((a, b) => a + b, 0);
  // embaralha a ordem das barras (Fisher–Yates com a mesma semente)
  const order = strings.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { n, strings, final: w.map((x) => x / sum), order, ratio: 1 - 0.34 * Math.exp(-0.55 * p) };
}

/* --- Grover: a amplitude do alvo cresce a cada iteração; ótimo em ⌊π/4 · √N⌋ iterações --- */
const GROVER_MAX_BARS = 32;

export function groverParams(exp) {
  const N = Math.pow(2, exp);
  const bars = Math.min(GROVER_MAX_BARS, N); // com N = 16 desenha 16 barras, não 32
  return {
    N, bars,
    target: Math.floor(bars * 0.6),
    k: Math.max(1, Math.floor((Math.PI / 4) * Math.sqrt(N))),
    theta: Math.asin(1 / Math.sqrt(N))
  };
}

export function groverAmplitudes(g, j) {
  const target = Math.sin((2 * j + 1) * g.theta);                       // amplitude do alvo
  const other = Math.cos((2 * j + 1) * g.theta) / Math.sqrt(g.N - 1);   // amplitude de cada um dos outros
  return { target, other, mean: (target + (g.N - 1) * other) / g.N };
}

/* --- VQE: o erro cai a cada iteração até um piso que depende da profundidade do ansatz --- */
// e0: energia do estado fundamental (Hartree); slow/hard: moléculas maiores convergem mais devagar e param mais alto
export const MOLECULES = {
  h2: { label: 'H₂', e0: -1.1373, slow: 1, hard: 1 },
  lih: { label: 'LiH', e0: -7.8823, slow: 1.4, hard: 1.3 },
  beh2: { label: 'BeH₂', e0: -15.5951, slow: 1.9, hard: 1.7 }
};
export const VQE_ITERS = 60;
export const CHEM = 0.0016; // precisão química: 1,6 mHa

export function vqeSeries(mol, d) {
  const m = MOLECULES[mol], r = rng(d * 17 + mol.length * 101);
  // com estes valores H₂ converge a partir da profundidade 2, LiH da 3 e BeH₂ só na 4
  const floor = (0.0042 / Math.pow(d, 1.6)) * m.hard, tau = (4 + 5 / d) * m.slow;
  const pts = [];
  for (let i = 0; i <= VQE_ITERS; i++) pts.push(floor + 0.32 * Math.exp(-i / tau) * (0.72 + 0.28 * Math.cos(i * 0.9)) * (0.9 + 0.2 * r()));
  return { m, pts };
}
