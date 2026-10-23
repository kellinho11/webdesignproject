// Depois do `next build`: tira de out/ a cópia da página de erro que o Next gera em /_not-found.
// Publicada, ela respondia 200 com o conteúdo da 404 (uma "404 falsa"). A 404 de verdade é out/404.html.
import { rmSync } from 'node:fs';
import { join } from 'node:path';

for (const f of ['_not-found.html', '_not-found.txt', '_not-found']) {
  rmSync(join('out', f), { recursive: true, force: true });
}
console.log('limpa  out/_not-found removido');
