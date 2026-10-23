// Depois do `next build`: grava em cada página de out/ uma CSP que só deixa rodar os scripts do
// próprio site e os scripts embutidos que o build gerou, cada um pelo hash (sha256) do seu texto.
// Um script injetado (XSS) não tem hash na lista e o navegador se recusa a rodá-lo.
// A CSP do cabeçalho (vercel.json) cobre o resto; quando há duas políticas, o navegador aplica as
// duas, então vale a mais restrita de cada diretiva.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';
const pages = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((f) => {
  const p = join(dir, f.name);
  return f.isDirectory() ? pages(p) : p.endsWith('.html') ? [p] : [];
});
// scripts embutidos que rodam: sem src e sem type (o JSON-LD é dado, não roda)
const INLINE = /<script(?![^>]*\s(?:src|type)=)[^>]*>([\s\S]*?)<\/script>/g;
const sha = (code) => `'sha256-${createHash('sha256').update(code, 'utf8').digest('base64')}'`;

let total = 0;
for (const file of pages(OUT)) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="Content-Security-Policy"')) continue;
  const hashes = [...new Set([...html.matchAll(INLINE)].map(([, code]) => sha(code)))];
  const csp = `script-src 'self' ${hashes.join(' ')}; object-src 'none'; base-uri 'self'`;
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}"/>`;
  // logo depois do charset: a política precisa vir antes do primeiro script
  const out = html.replace('<meta charSet="utf-8"/>', (m) => m + meta);
  if (out === html) throw new Error(`${file}: <meta charSet> não encontrado; a CSP não foi gravada`);
  writeFileSync(file, out);
  total += 1;
  console.log(`csp  ${file}  ${hashes.length} scripts embutidos`);
}
if (!total) throw new Error('nenhuma página em out/');
