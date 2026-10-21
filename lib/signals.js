// Sinais da página. As peças não importam umas às outras: conversam por eventos sq:<nome> na window,
// e o último valor de cada sinal fica guardado para quem monta depois (um filme que entra na tela
// depois de o visitante escolher um algoritmo nos Casos, por exemplo).
//   scrub     0..1        rolagem da Demo (percurso → ShotLog)
//   algo      { algo }    algoritmo escolhido nos Casos (links → Film, ShotLog)
//   measure   { value }   a moeda foi medida (QubitCoin → percurso, machine)
//   collapse  { value }   o qubit colapsou nos Investidores (percurso → links, machine)
//   motion    { off }     "Pausar movimento" (MotionToggle → filmes, esfera, telemetria)
const last = {};

export function emit(name, detail) {
  last[name] = detail;
  window.dispatchEvent(new CustomEvent(`sq:${name}`, { detail }));
}

export const latest = (name) => last[name];

// devolve a função que desliga o ouvinte
export function listen(name, fn) {
  const h = (e) => fn(e.detail);
  window.addEventListener(`sq:${name}`, h);
  return () => window.removeEventListener(`sq:${name}`, h);
}

export const motionPaused = () => !!last.motion?.off;
