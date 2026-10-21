import { listen } from './signals';

// Escopo de limpeza: tudo o que um comportamento liga (eventos, observers, timers, quadros)
// passa por aqui, e scope.dispose() desfaz tudo de uma vez. Assim o React pode montar,
// desmontar e montar de novo (StrictMode, recarga a quente) sem deixar ouvintes duplicados.
export function createScope() {
  const undo = [];
  const scope = {
    on(target, type, fn, opts) {
      if (!target) return;
      target.addEventListener(type, fn, opts);
      undo.push(() => target.removeEventListener(type, fn, opts));
    },
    observe(observer) { undo.push(() => observer.disconnect()); return observer; },
    timeout(fn, ms) { const id = setTimeout(fn, ms); undo.push(() => clearTimeout(id)); return id; },
    frame(fn) { const id = requestAnimationFrame(fn); undo.push(() => cancelAnimationFrame(id)); return id; },
    // laço de quadros só enquanto houver trabalho: tick() devolve false para parar
    loop(tick) {
      let id = 0;
      const step = (now) => { id = tick(now) === false ? 0 : requestAnimationFrame(step); };
      const start = () => { if (!id) id = requestAnimationFrame(step); };
      undo.push(() => cancelAnimationFrame(id));
      return start;
    },
    // sinal da página (lib/signals.js), desligado junto com o resto
    listen(name, fn) { undo.push(listen(name, fn)); },
    add(fn) { undo.push(fn); },
    dispose() { while (undo.length) { try { undo.pop()(); } catch (e) { /* segue limpando */ } } },
  };
  return scope;
}

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
