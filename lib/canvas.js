// Peças desenhadas em canvas (filmes, esfera de Bloch): resolução e fonte.
import { smallScreen } from './media';

// ajusta o canvas à resolução da tela, com teto de 1,5× (1,25× no celular), e devolve o tamanho em px CSS
export function fitCanvas(canvas) {
  const r = canvas.getBoundingClientRect(), dpr = Math.min(smallScreen() ? 1.25 : 1.5, window.devicePixelRatio || 1);
  if (r.width) { canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr); }
  return { w: r.width, h: r.height, dpr };
}

export const monoFont = (el) => getComputedStyle(el).getPropertyValue('--font-mono').trim();
