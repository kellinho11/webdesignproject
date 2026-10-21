// Consultas de mídia do site, definidas uma vez para componentes e comportamentos.
export const media = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;
export const reducedMotion = () => media('(prefers-reduced-motion: reduce)');
export const reducedTransparency = () => media('(prefers-reduced-transparency: reduce)');
export const finePointer = () => media('(hover: hover) and (pointer: fine)');
// celular ou tela de toque: filmes a 24 fps, canvas até 1,5×, um filme tocando por vez
export const smallScreen = () => media('(max-width: 700px), (pointer: coarse)');
