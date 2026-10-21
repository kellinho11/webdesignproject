'use client';

import { useEffect, useRef, useState } from 'react';
import SCENES, { setMono } from './scenes';

// Filme explicativo: uma cena em ASCII desenhada num canvas, sobre um gradient mesh, dentro de uma
// moldura de vidro com legenda e linha do tempo. Roda em loop como um vídeo, mas é código: pesa
// quase nada, fica nítido em qualquer tela e segue a paleta do site.
//
// - toca só enquanto está visível e a aba está aberta; no máximo 3 ao mesmo tempo (1 no celular),
//   os mais visíveis;
// - a linha do tempo aceita clique e arraste; o botão pausa/retoma (WCAG 2.2.2);
// - scrub: não toca sozinho, o tempo vem de fora (evento film:seek com 0..1, a rolagem da Demo);
// - com movimento reduzido, não toca sozinho: mostra o quadro-resumo (poster) e a legenda final;
// - desenha a 30 quadros por segundo (24 no celular, com resolução de no máximo 1,5×).
const live = new Set();
let limit = 3;
function elect() {
  const ranked = [...live].filter((f) => f.wants()).sort((a, b) => b.ratio - a.ratio);
  live.forEach((f) => { const k = ranked.indexOf(f); f.allow(k > -1 && k < limit); });
}

const fmt = (s) => `00:${String(Math.floor(s)).padStart(2, '0')}`;

export default function Film({ scene, duration, chapters, title, poster = duration * 0.92, mesh = 'blue', ratio = '16 / 9', captions = 'over', scrub = false, listen = false, className = '' }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const barRef = useRef(null);
  const trackRef = useRef(null);
  const timeRef = useRef(null);
  const capRef = useRef(null);
  const headRef = useRef(null);
  const state = useRef({ t: 0, last: 0, acc: 0, visible: false, paused: false, raf: 0, w: 0, h: 0, box: null, capH: 0, opts: {} });
  const [chapter, setChapter] = useState(scrub ? 0 : chapters.length - 1);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  // filme estreito (celular, cartões): a legenda sai de cima da cena e vai para baixo da tela
  const [narrow, setNarrow] = useState(false);
  const place = captions === 'below' || narrow ? 'below' : 'over';

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 520));
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current, ctx = canvas.getContext('2d'), s = state.current;
    const draw = SCENES[scene];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 700px), (pointer: coarse)').matches;
    const FPS = small ? 24 : 30;
    limit = small ? 1 : 3;
    setMono(getComputedStyle(root).getPropertyValue('--font-mono').trim());
    s.capH = 0;
    if (listen && window.__sqAlgo) s.opts = { algo: window.__sqAlgo };

    const chapterAt = (t) => { let i = 0; chapters.forEach((c, k) => { if (t >= c.at) i = k; }); return i; };
    const paint = () => {
      if (!s.w) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = canvas.width / s.w;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, s.t, s.w, s.h, s.box, s.opts);
      barRef.current.style.transform = `scaleX(${s.t / duration})`;
      timeRef.current.textContent = `${fmt(s.t)} / ${fmt(duration)}`;
      setChapter((c) => { const n = chapterAt(s.t); return c === n ? c : n; });
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(small ? 1.5 : 2, window.devicePixelRatio || 1);
      if (!r.width) return;
      s.w = r.width; s.h = r.height;
      // área livre para textos da cena: entre a barra de título e a legenda (a maior já vista, para
      // o gráfico não pular quando uma legenda de duas linhas troca por uma de uma)
      const top = headRef.current.offsetTop + headRef.current.offsetHeight + 8;
      s.capH = place === 'over' ? Math.max(s.capH, r.height - capRef.current.offsetTop) : 0;
      const bottom = r.height - (s.capH ? s.capH + 8 : 12);
      s.box = { x: 16, y: top, w: r.width - 32, h: Math.max(40, bottom - top) };
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      paint();
    };
    const tick = (now) => {
      s.raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - (s.last || now)) / 1000);
      s.last = now; s.acc += dt;
      if (s.acc < 1 / FPS) return;
      s.t = (s.t + s.acc) % duration; s.acc = 0;
      paint();
    };
    let allowed = false;
    const sync = () => {
      const run = allowed && !s.paused && !document.hidden && !window.__sqMotionOff;
      if (run && !s.raf) { s.last = 0; s.raf = requestAnimationFrame(tick); }
      if (!run && s.raf) { cancelAnimationFrame(s.raf); s.raf = 0; }
      setPlaying(run);
    };
    const me = { ratio: 0, wants: () => !scrub && s.visible && !s.paused, allow: (ok) => { allowed = ok; sync(); } };
    live.add(me);
    s.sync = elect;

    if (scrub) s.paused = true;
    else if (reduce.matches) { s.paused = true; s.t = poster; setPaused(true); }

    // rolagem (scrub) e clique/arraste na linha do tempo levam o filme a um instante
    const seek = (q) => { s.t = Math.min(duration - 0.001, Math.max(0, q * duration)); paint(); };
    const onSeek = (e) => seek(e.detail);
    const track = trackRef.current;
    const at = (e) => { const r = track.getBoundingClientRect(); seek((e.clientX - r.left) / r.width); };
    const down = (e) => { if (scrub) return; track.setPointerCapture(e.pointerId); at(e); track.addEventListener('pointermove', at); };
    const up = () => track.removeEventListener('pointermove', at);
    const onAlgo = (e) => { s.opts = { ...s.opts, algo: e.detail.algo }; if (!scrub) s.t = 0; paint(); };
    const vis = () => sync();
    root.addEventListener('film:seek', onSeek);
    track.addEventListener('pointerdown', down);
    track.addEventListener('pointerup', up);
    track.addEventListener('pointercancel', up);
    if (listen) window.addEventListener('sq:algo', onAlgo);
    document.addEventListener('visibilitychange', vis);
    window.addEventListener('sq:motion', vis);

    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; me.ratio = e.intersectionRatio; elect(); }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    io.observe(root);
    resize();
    return () => {
      live.delete(me); elect();
      ro.disconnect(); io.disconnect();
      root.removeEventListener('film:seek', onSeek);
      track.removeEventListener('pointerdown', down); track.removeEventListener('pointerup', up); track.removeEventListener('pointercancel', up);
      window.removeEventListener('sq:algo', onAlgo);
      document.removeEventListener('visibilitychange', vis);
      window.removeEventListener('sq:motion', vis);
      cancelAnimationFrame(s.raf); s.raf = 0;
    };
  }, [scene, duration, chapters, poster, place, scrub, listen]);

  const toggle = () => {
    const s = state.current;
    s.paused = !s.paused;
    setPaused(s.paused);
    s.sync?.();
  };

  const caption = (
    <p ref={capRef} className={`film__caption film__caption--${place}`} aria-hidden="true" key={chapter}>
      <span className="film__step">{String(chapter + 1).padStart(2, '0')}</span>
      {chapters[chapter].caption}
    </p>
  );

  return (
    <figure ref={rootRef} className={`film film--${mesh}${scrub ? ' film--scrub' : ''} ${className}`} data-scene={scene} data-playing={playing ? 'true' : 'false'}>
      <div className="film__screen" style={{ '--ratio': ratio }}>
        <div className="film__mesh" aria-hidden="true"><i /><i /><i /></div>
        <canvas ref={canvasRef} className="film__canvas" aria-hidden="true" />
        <div className="film__bar" ref={headRef}>
          <span className="film__rec" aria-hidden="true" />
          <span className="film__title">{title}</span>
          <span className="film__time" ref={timeRef} aria-hidden="true">00:00</span>
        </div>
        {place === 'over' && caption}
      </div>
      {place === 'below' && caption}
      <div className="film__ctl">
        {scrub
          ? <span className="film__hint" aria-hidden="true">role ↓</span>
          : (
            <button type="button" className="film__toggle" onClick={toggle} aria-pressed={paused} aria-label={paused ? `Reproduzir: ${title}` : `Pausar: ${title}`}>
              <svg viewBox="0 0 16 16" aria-hidden="true">{paused ? <path d="M5 3.5v9l7.5-4.5z" /> : <path d="M4.5 3.5h2.5v9H4.5zM9 3.5h2.5v9H9z" />}</svg>
            </button>
          )}
        <span className="film__track" ref={trackRef} aria-hidden="true">
          <i ref={barRef} />
          {chapters.map((c, i) => <b key={i} className={i <= chapter ? 'is-on' : undefined} style={{ left: `${(c.at / duration) * 100}%` }} />)}
        </span>
      </div>
      {/* roteiro completo para leitores de tela: a legenda visual muda sozinha e não é anunciada */}
      <figcaption className="sr-only">{title}. {chapters.map((c) => c.caption).join(' ')}</figcaption>
    </figure>
  );
}
