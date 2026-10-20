// Comportamentos da página que ainda não viraram componentes React.
// Rodam uma vez, depois que o React desenha a página (ver App.jsx).
export function initLegacy() {
  /* === v9 · Intro: processador gélido, toque para iniciar === */
  (() => {
    'use strict';
    const l = document.getElementById('loader');
    const root = document.documentElement;
    const finish = () => { root.classList.remove('intro-open'); window.__introPending = false; window.dispatchEvent(new Event('intro:done')); };
    if (!l) { root.classList.remove('intro-open'); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { l.remove(); root.classList.remove('intro-open'); return; }
    window.__introPending = true;

    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.getElementById('intro-qc');
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
    lg('iq-side', [['0', '#0E0C1A'], ['.35', '#3A4466'], ['.5', '#B9C8F0'], ['.62', '#3A4466'], ['1', '#0E0C1A']]);
    lg('iq-top', [['0', '#1A1A2E'], ['.5', '#2C3352'], ['1', '#141326']], '0', '1');
    lg('iq-rod', [['0', '#1B2033'], ['.5', '#8C9BC4'], ['1', '#1B2033']]);
    const rg = mk('radialGradient', { id: 'iq-glow' }, defs);
    [['0', '#8DB4FF', '.7'], ['.4', '#6B46FF', '.35'], ['1', '#3B82F6', '0']].forEach(([o, c, op]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }, rg));
    const rv = mk('radialGradient', { id: 'iq-vapor' }, defs);
    [['0', '#DCE6FF', '.22'], ['1', '#DCE6FF', '0']].forEach(([o, c, op]) => mk('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }, rv));

    mk('ellipse', { cx: C, cy: 640, rx: 230, ry: 120, fill: 'url(#iq-glow)', class: 'iq-halo' });
    // Suspensão
    [-120, 120].forEach((dx) => mk('line', { x1: C + dx, y1: 0, x2: C + dx * 0.9, y2: ST[0].y, class: 'iq-hang' }));
    // Hastes de suporte entre estágios
    ST.forEach((p, i) => {
      const n = ST[i + 1]; if (!n) return;
      [-0.82, -0.42, 0.42, 0.82].forEach((f) => mk('rect', { x: C + f * p.rx - 2, y: p.y + T, width: 4, height: n.y - p.y - T, fill: 'url(#iq-rod)', class: 'iq-rod', transform: 'skewX(' + (-f * 6).toFixed(1) + ')', 'transform-origin': (C + f * p.rx) + ' ' + p.y }));
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
      mk('path', { d: 'M' + (C - p.rx) + ' ' + p.y + 'L' + (C - p.rx) + ' ' + (p.y + T) + 'A' + p.rx + ' ' + p.ry + ' 0 0 0 ' + (C + p.rx) + ' ' + (p.y + T) + 'L' + (C + p.rx) + ' ' + p.y + 'Z', fill: 'url(#iq-side)', class: 'iq-side' }, g);
      mk('ellipse', { cx: C, cy: p.y, rx: p.rx, ry: p.ry, fill: 'url(#iq-top)', class: 'iq-top' }, g);
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
    mk('rect', { x: C - 36, y: ST[5].y + T, width: 72, height: 44, fill: 'url(#iq-side)' }, mx);
    mk('ellipse', { cx: C, cy: ST[5].y + T + 44, rx: 36, ry: 6, fill: 'url(#iq-side)' }, mx);
    mk('rect', { x: C - 7, y: ST[5].y + 58, width: 14, height: CHIP_Y - ST[5].y - 70, fill: 'url(#iq-rod)' }, mx);
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
    [[C - 70, 560, 90], [C + 80, 580, 70], [C, 690, 160]].forEach(([x, y, r], k) => mk('ellipse', { cx: x, cy: y, rx: r, ry: r * 0.35, fill: 'url(#iq-vapor)', class: 'iq-vap', style: '--vd:' + (9 + k * 3) + 's' }));

    const status = document.getElementById('intro-status');
    const start = document.getElementById('intro-start'), skip = document.getElementById('intro-skip');
    const timers = []; const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    let done = false;
    const close = (fast) => {
      if (done) return; done = true;
      timers.forEach(clearTimeout);
      l.classList.add(fast ? 'is-skip' : 'is-out');
      finish();
      setTimeout(() => l.remove(), 800);
    };
    const run = () => {
      if (l.classList.contains('is-running')) return;
      l.classList.add('is-running'); start.disabled = true;
      status.textContent = 'Linhas de controle ativas · 5 canais XY';
      tiers.forEach((t, i) => at(160 + i * 210, () => t.classList.add('is-on')));
      at(1500, () => { l.classList.add('is-chip'); status.textContent = 'Pulso π/2 · 5,1 GHz → q0–q4 em superposição'; });
      at(2350, () => { l.classList.add('is-entangle'); status.textContent = 'CNOT q0→q1 · emaranhando o registro'; });
      at(3100, () => { l.classList.add('is-measure'); [1, 0, 1, 1, 0].forEach((v, k) => qubits[k].classList.toggle('is-one', !!v)); status.textContent = 'Medição · |10110⟩'; });
      at(3650, () => l.classList.add('is-zoom'));
      at(4350, () => close(false));
    };
    start.addEventListener('click', run);
    skip.addEventListener('click', () => close(true));
    l.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') close(true); });
    requestAnimationFrame(() => start.focus({ preventScroll: true }));
  })();

  (() => {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* === Header === */
    const header = $('.site-header');
    const toggle = $('.nav-toggle');
    const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 40);

    const navLinks = $$('.site-nav a');
    const setMenu = (open) => {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    const menuOpen = () => header.classList.contains('nav-open');
    toggle.addEventListener('click', () => setMenu(!menuOpen()));
    // Fecha ao escolher um link
    navLinks.forEach((a) => a.addEventListener('click', () => setMenu(false)));
    // O botão vem depois do menu no HTML: com o menu aberto, Tab no botão leva ao 1º link
    // (senão o foco sairia do header e quem usa teclado nunca chegaria aos links)
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && !e.shiftKey && menuOpen() && navLinks.length) { e.preventDefault(); navLinks[0].focus(); }
    });
    // Esc fecha e devolve o foco ao botão
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen()) { setMenu(false); toggle.focus(); }
    });
    // Clique fora do header fecha o menu
    document.addEventListener('click', (e) => {
      if (menuOpen() && !header.contains(e.target)) setMenu(false);
    });
    // Voltando para o layout de desktop, o menu fica fechado
    window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

    /* === Hero: timeline de entrada === */
    const goLoaded = () => requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));
    if (window.__introPending) window.addEventListener('intro:done', goLoaded, { once: true }); else goLoaded();

    /* === Reveal genérico === */
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        revealIO.unobserve(el);
        setTimeout(() => el.classList.add('reveal-done'), 1400);
      });
    }, { threshold: 0.2 });
    $$('.reveal').forEach((el) => revealIO.observe(el));

    const onceInView = (el, cb, threshold = 0.35) => {
      if (!el) return;
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { io.disconnect(); cb(); }
      }, { threshold });
      io.observe(el);
    };

    /* === Hero: parallax por cursor === */
    const hero = $('.hero');
    const heroContent = $('.hero__content');

    if (!reduceMotion && canHover) {
      let raf = 0;
      hero.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = hero.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
          hero.style.setProperty('--mx', nx.toFixed(3));
          hero.style.setProperty('--my', ny.toFixed(3));
        });
      });
      hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--mx', '0');
        hero.style.setProperty('--my', '0');
      });
    }

    /* === Hero: transição de saída === */
    const heroExit = () => {
      const r = hero.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.8)));
      heroContent.style.opacity = (1 - 0.7 * p).toFixed(3);
      heroContent.style.transform = reduceMotion ? '' : `scale(${(1 - 0.03 * p).toFixed(4)})`;
      if (!reduceMotion && r.bottom > 0) hero.style.setProperty('--sy', Math.max(0, -r.top).toFixed(1));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setHeaderState(); heroExit(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    setHeaderState();
    heroExit();
    // fora da tela, as animações do Hero ficam pausadas (o CSS usa .is-offscreen)
    if (hero) new IntersectionObserver(([e]) => hero.classList.toggle('is-offscreen', !e.isIntersecting)).observe(hero);

    /* === Comparativo: gráfico de complexidade === */
    const chart = $('.chart');
    if (chart) {
      const X = (n) => 40 + (340 * n) / 60;
      const expY = (n) => 220 - (195 * (Math.pow(2, n / 6) - 1)) / (Math.pow(2, 10) - 1);
      const sqrtY = (n) => 220 - 30 * Math.sqrt(n / 60);
      const build = (fy) => {
        let d = '';
        for (let n = 0; n <= 60; n += 0.5) d += `${n ? 'L' : 'M'}${X(n).toFixed(2)} ${fy(n).toFixed(2)} `;
        return d.trim();
      };
      $('#curve-exp').setAttribute('d', build(expY));
      if ($('#curve-aura')) $('#curve-aura').setAttribute('d', build(expY));
      $('#curve-sqrt').setAttribute('d', build(sqrtY));
      $('#dot-exp').setAttribute('cy', expY(50).toFixed(2));
      $('#dot-sqrt').setAttribute('cy', sqrtY(50).toFixed(2));
      onceInView(chart, () => chart.classList.add('is-drawn'), 0.4);
    }

    /* === Casos de uso: grade do Grover === */
    const grover = $('#grover');
    if (grover) {
      const TOTAL = 60;
      const TARGET = 37;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < TOTAL; i++) {
        const cell = document.createElement('span');
        cell.className = 'grover__cell' + (i === TARGET ? ' is-target' : '');
        if (i !== TARGET) cell.style.transitionDelay = `${Math.round(Math.random() * 500)}ms`;
        frag.appendChild(cell);
      }
      grover.appendChild(frag);
      onceInView(grover, () => grover.classList.add('is-amplified'), 0.6);
    }

    /* === API: digitação no terminal === */
    const code = $('#terminal-code');
    if (code) {
      const S = (t, c, f, k) => ({ t, c, f, k });
      const segments = [
        S('POST ', 't-method'), S('/v1/quantum/solve', 't-path'), S('\n'),
        S('X-PQ-KEM', 't-key', 2), S(': ', 't-punc', 2), S('ML-KEM-768', 't-str', 2), S('\n'),
        S('{', 't-punc'), S('\n'),
        S('  "algorithm"', 't-key', 3), S(': ', 't-punc', 3), S('"QAOA"', 't-str', 3, 'algo'), S(',', 't-punc'), S('\n'),
        S('  "problem"', 't-key', 3), S(': ', 't-punc', 3), S('"portfolio_optimization"', 't-str', 3, 'prob'), S(',', 't-punc'), S('\n'),
        S('  "assets"', 't-key', 3), S(': ', 't-punc', 3), S('1200', 't-num', 3), S(',', 't-punc'), S('\n'),
        S('  "qubits"', 't-key', 3), S(': ', 't-punc', 3), S('64', 't-num', 3, 'qb'), S(',', 't-punc'), S('\n'),
        S('  "layers_p"', 't-key', 3), S(': ', 't-punc', 3), S('4', 't-num', 3), S('\n'),
        S('}', 't-punc'), S('\n\n'),
        { pause: 650 },
        S('→ 200 OK', 't-ok', 1), S(' · approx_ratio: ', 't-meta'), S('0.94', 't-meta', 0, 'ratio'), S(' · ', 't-meta'), S('latency: 340ms', 't-meta', 1)
      ];

      const renderAll = () => {
        code.textContent = '';
        segments.forEach((s) => {
          if (s.pause) return;
          const span = document.createElement('span');
          if (s.c) span.className = s.c;
          if (s.f) span.dataset.f = s.f;
          if (s.k) span.dataset.k = s.k;
          span.textContent = s.t;
          code.appendChild(span);
        });
      };

      const type = () => {
        code.textContent = '';
        let i = 0;
        const next = () => {
          if (i >= segments.length) return;
          const seg = segments[i++];
          if (seg.pause) { setTimeout(next, seg.pause); return; }
          const span = document.createElement('span');
          if (seg.c) span.className = seg.c;
          if (seg.f) span.dataset.f = seg.f;
          if (seg.k) span.dataset.k = seg.k;
          code.appendChild(span);
          let k = 0;
          const step = () => {
            span.textContent += seg.t[k++];
            if (k < seg.t.length) setTimeout(step, seg.t[k - 1] === '\n' ? 90 : 22);
            else setTimeout(next, 0);
          };
          step();
        };
        next();
      };

      const sendBtn = document.getElementById('terminal-send');
      code.innerHTML = '<span class="t-meta">// Clique em "Enviar requisição" para chamar a API</span>';
      if (sendBtn) sendBtn.addEventListener('click', () => {
        sendBtn.disabled = true;
        sendBtn.classList.remove('is-hint');
        sendBtn.textContent = 'Enviando…';
        (reduceMotion ? renderAll : type)();
        setTimeout(() => { sendBtn.disabled = false; sendBtn.textContent = 'Enviar de novo ▶'; }, reduceMotion ? 0 : 4200);
      });
      const term = code.closest('.terminal');
      const feats = Array.from(document.querySelectorAll('.feature[data-f]'));
      feats.forEach((f) => {
        const on = () => {
          if (!code.querySelector('[data-f]') && !(sendBtn && sendBtn.disabled)) { renderAll(); if (sendBtn) { sendBtn.classList.remove('is-hint'); sendBtn.textContent = 'Enviar de novo ▶'; } }
          term.dataset.hl = f.dataset.f;
          feats.forEach((x) => x.classList.toggle('is-hl', x === f));
        };
        const off = () => { delete term.dataset.hl; f.classList.remove('is-hl'); };
        f.addEventListener('mouseenter', on); f.addEventListener('focus', on); f.addEventListener('click', on);
        f.addEventListener('mouseleave', off); f.addEventListener('blur', off);
        f.addEventListener('pointerdown', () => { touched = true; });
      });
      window.addEventListener('sq:set', (ev) => {
        const { k, v } = ev.detail;
        segments.forEach((sg) => { if (sg.k === k) sg.t = v; });
        const el = code.querySelector('[data-k="' + k + '"]');
        if (el) { el.textContent = v; el.classList.remove('is-linked'); void el.offsetWidth; el.classList.add('is-linked'); }
      });
      let touched = false;
      if (!reduceMotion && term) {
        const io = new IntersectionObserver((es) => {
          if (!es.some((x) => x.isIntersecting)) return;
          io.disconnect();
          let i = 0;
          const tick = () => {
            if (touched || i >= feats.length * 2) { if (!touched) { delete term.dataset.hl; feats.forEach((x) => x.classList.remove('is-hl')); } return; }
            const f = feats[i % feats.length];
            if (!code.querySelector('[data-f]') && !(sendBtn && sendBtn.disabled)) { renderAll(); if (sendBtn) { sendBtn.classList.remove('is-hint'); sendBtn.textContent = 'Enviar de novo ▶'; } }
            term.dataset.hl = f.dataset.f; feats.forEach((x) => x.classList.toggle('is-hl', x === f));
            i++; setTimeout(tick, 1800);
          };
          setTimeout(tick, 600);
        }, { threshold: 0.5 });
        io.observe(term);
        feats.forEach((f) => f.addEventListener('mouseenter', () => { touched = true; }));
      }
    }

    /* === CTA: validação do formulário === */
    const form = $('#investor-form');
    if (form) {
      const success = $('#form-success');
      const freeDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'live.com', 'bol.com.br', 'uol.com.br'];
      const rules = {
        name: (v) => (v.trim().split(/\s+/).length >= 2 ? '' : 'Informe nome e sobrenome.'),
        email: (v) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Informe um e-mail válido.';
          const domain = v.trim().split('@')[1].toLowerCase();
          return freeDomains.includes(domain) ? 'Use seu e-mail corporativo.' : '';
        },
        fund: (v) => (v.trim().length >= 2 ? '' : 'Informe o fundo ou empresa.'),
        range: (v) => (v ? '' : 'Selecione uma faixa.')
      };

      const validateField = (input) => {
        const msg = rules[input.name] ? rules[input.name](input.value) : '';
        const field = input.closest('.field');
        field.classList.toggle('has-error', Boolean(msg));
        field.querySelector('.field__error').textContent = msg;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        return !msg;
      };

      const inputs = $$('input, select', form);
      inputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.closest('.field').classList.contains('has-error')) validateField(input);
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const results = inputs.map(validateField);
        const firstInvalid = inputs[results.indexOf(false)];
        if (firstInvalid) { firstInvalid.focus(); return; }
        form.hidden = true;
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      });
    }
  })();


  /* === Roadmap: coreografia via Motion === */
  (() => {
    'use strict';
    const track = document.getElementById('rm-track');
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(track.querySelectorAll('.rm-item'));
    const paths = Array.from(track.querySelectorAll('.rm-path'));
    const LINE_DURATION = 1.8;
    const EASE = [0.16, 1, 0.3, 1];

    const lightAll = () => items.forEach((it) => it.querySelector('.rm-dot').classList.add('is-lit'));
    if (reduceMotion) { lightAll(); return; }

    // Momento (s) em que uma curva ease-out (cúbica) alcança a fração f da linha
    const reachTime = (f) => LINE_DURATION * (1 - Math.cbrt(1 - f));
    const fractionOf = (i) => (window.matchMedia('(max-width: 900px)').matches ? i / (items.length - 1) : i / (items.length - 1));

    // Estado inicial
    paths.forEach((p) => { p.style.strokeDashoffset = '1'; });
    items.forEach((it) => {
      const card = it.querySelector('.rm-card');
      const dot = it.querySelector('.rm-dot');
      card.style.opacity = '0';
      card.style.transform = it.classList.contains('rm-item--down') ? 'translateY(-12px)' : 'translateY(12px)';
      dot.style.transform = 'scale(0.4)';
      dot.style.opacity = '0.3';
    });

    const finalOpacity = (it) => (it.classList.contains('rm-item--planned') ? 0.6 : 1);

    const play = () => {
      const M = window.Motion;
      if (M && M.animate) {
        paths.forEach((p) => M.animate(p, { strokeDashoffset: [1, 0] }, { duration: LINE_DURATION, ease: 'easeOut' }));
        items.forEach((it, i) => {
          const delay = reachTime(fractionOf(i)) + i * 0.15;
          const card = it.querySelector('.rm-card');
          const dot = it.querySelector('.rm-dot');
          M.animate(dot, { transform: ['scale(0.4)', 'scale(1)'], opacity: [0.3, 1] }, { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] });
          M.animate(card, { opacity: [0, finalOpacity(it)], transform: [card.style.transform, 'translateY(0px)'] }, { duration: 0.7, delay: delay + 0.05, ease: EASE })
            .then(() => { card.style.opacity = ''; card.style.transform = ''; });
          setTimeout(() => dot.classList.add('is-lit'), delay * 1000);
        });
      } else {
        // Fallback sem Motion: transições CSS
        paths.forEach((p) => { p.style.transition = `stroke-dashoffset ${LINE_DURATION}s ease-out`; p.style.strokeDashoffset = '0'; });
        items.forEach((it, i) => {
          const delay = reachTime(fractionOf(i)) + i * 0.15;
          const card = it.querySelector('.rm-card');
          const dot = it.querySelector('.rm-dot');
          [card, dot].forEach((el) => { el.style.transition = `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`; });
          card.style.opacity = String(finalOpacity(it)); card.style.transform = 'none';
          dot.style.opacity = '1'; dot.style.transform = 'none';
          setTimeout(() => { dot.classList.add('is-lit'); card.style.transition = ''; card.style.opacity = ''; }, (delay + 0.8) * 1000);
        });
      }
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(); }
    }, { threshold: 0.3 });
    io.observe(track);
  })();

  /* === Roadmap: alinha a linha horizontal ao centro dos pontos === */
  (() => {
    const track = document.getElementById('rm-track');
    if (!track) return;
    const dot = track.querySelector('.rm-dot');
    const align = () => {
      const t = track.getBoundingClientRect();
      const d = dot.getBoundingClientRect();
      track.style.setProperty('--rm-line-top', (d.top - t.top + d.height / 2 - 2).toFixed(1) + 'px');
    };
    align();
    window.addEventListener('resize', align);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(align);
    if (window.ResizeObserver) new ResizeObserver(align).observe(track);
  })();

  /* (Demonstração ao vivo: agora é o componente React src/demo/Lab.jsx) */

  /* === Qubits: fios entre seções, Bloch, registrador === */
  (() => {
    'use strict';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PI = Math.PI;

    // Fios entre seções acendem ao entrar na viewport
    const wires = Array.from(document.querySelectorAll('.qwire'));
    const wio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-on'); wio.unobserve(e.target); } }), { rootMargin: '0px 0px -15% 0px' });
    wires.forEach((w) => wio.observe(w));

    // Esferas de Bloch: θ guiado pelo scroll da seção, φ precessa lentamente
    const spheres = Array.from(document.querySelectorAll('[data-bloch]')).map((svg) => ({
      svg, section: svg.closest('section'), visible: false,
      vec: svg.querySelector('[data-vec]'), tip: svg.querySelector('[data-tip]'), proj: svg.querySelector('[data-proj]'), state: svg.querySelector('[data-state]')
    }));
    const drawBloch = (s, time) => {
      const r = s.section.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const theta = PI * (0.12 + 0.62 * p);
      const phi = (reduce ? 0.6 : time * 0.00025) + p * 2.4 * PI;
      const x = 100 * Math.sin(theta) * Math.cos(phi);
      const yEq = 28 * Math.sin(theta) * Math.sin(phi);
      const y = -100 * Math.cos(theta) + yEq;
      s.vec.setAttribute('x2', x.toFixed(1)); s.vec.setAttribute('y2', y.toFixed(1));
      s.tip.setAttribute('cx', x.toFixed(1)); s.tip.setAttribute('cy', y.toFixed(1));
      s.proj.setAttribute('x1', x.toFixed(1)); s.proj.setAttribute('y1', y.toFixed(1));
      s.proj.setAttribute('x2', x.toFixed(1)); s.proj.setAttribute('y2', yEq.toFixed(1));
      const ph = ((phi / PI) % 2 + 2) % 2;
      s.state.textContent = 'θ = ' + (theta / PI).toFixed(2) + 'π · φ = ' + ph.toFixed(2) + 'π';
    };
    let blochRaf = 0;
    const blochLoop = (t) => { const vis = spheres.filter((s) => s.visible); vis.forEach((s) => drawBloch(s, t)); blochRaf = vis.length ? requestAnimationFrame(blochLoop) : 0; };
    const bio = new IntersectionObserver((es) => { es.forEach((e) => { const s = spheres.find((x) => x.svg === e.target); if (s) s.visible = e.isIntersecting; }); if (!reduce && !blochRaf && spheres.some((s) => s.visible)) blochRaf = requestAnimationFrame(blochLoop); });
    spheres.forEach((s) => { bio.observe(s.svg); drawBloch(s, 0); });

    // Registrador fixo: 5 qubits evoluindo com o scroll da página
    const reg = document.getElementById('qreg');
    const rows = reg ? Array.from(reg.querySelectorAll('.qreg__row')).map((row) => ({ v: row.querySelector('[data-v]'), t: row.querySelector('[data-t]'), k: row.querySelector('[data-k]') })) : [];
    const gateEl = document.getElementById('qreg-gate');
    const hero = document.querySelector('.hero');
    const sections = Array.from(document.querySelectorAll('main > section'));
    const gateFor = { simples: '|0⟩', tecnologia: 'H', mercado: 'CNOT', 'casos-de-uso': 'Rz(θ)', demo: 'U(β,γ)', 'quantum-engineering': 'SWAP', roadmap: 'T', investidores: 'MEDIR' };
    const ket = (theta, phi) => {
      if (theta < PI / 7) return '|0⟩';
      if (theta > PI - PI / 7) return '|1⟩';
      if (Math.abs(theta - PI / 2) < PI / 7) { const c = Math.cos(phi), s = Math.sin(phi); if (c > 0.8) return '|+⟩'; if (c < -0.8) return '|−⟩'; if (s > 0.8) return '|i⟩'; if (s < -0.8) return '|−i⟩'; }
      return '|ψ⟩';
    };
    const drawReg = () => {
      if (!reg) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      reg.classList.toggle('is-on', window.scrollY > (hero ? hero.offsetHeight * 0.6 : 400));
      const measuring = p > 0.94;
      rows.forEach((r, i) => {
        let theta = (PI / 2) * (1 - Math.cos(2 * PI * p * (1 + i * 0.4) + i * 0.7));
        let phi = 2 * PI * p * (2 + i) + i;
        if (measuring) { theta = (i % 3 === 1) ? PI : 0; phi = 0; }
        const x = 11 * Math.sin(theta) * Math.cos(phi), y = -11 * Math.cos(theta) + 3.2 * Math.sin(theta) * Math.sin(phi);
        r.v.setAttribute('x2', x.toFixed(2)); r.v.setAttribute('y2', y.toFixed(2));
        r.t.setAttribute('cx', x.toFixed(2)); r.t.setAttribute('cy', y.toFixed(2));
        r.k.textContent = ket(theta, phi);
      });
      let current = null;
      sections.forEach((s) => { const b = s.getBoundingClientRect(); if (b.top < window.innerHeight * 0.5 && b.bottom > window.innerHeight * 0.5) current = s; });
      gateEl.textContent = current && gateFor[current.id] ? gateFor[current.id] : '…';
    };

    // Deslocamento sutil do padrão de interferência
    const interf = document.querySelector('.bg-interference');
    const drawInterf = () => {
      if (!interf || reduce) return;
      const r = interf.parentElement.getBoundingClientRect(), vh = window.innerHeight;
      interf.style.setProperty('--sp', Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))).toFixed(3));
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => { drawReg(); drawInterf(); if (reduce) spheres.forEach((s) => drawBloch(s, 0)); ticking = false; });
    }, { passive: true });
    drawReg(); drawInterf();

  })();

  /* === Glossário: fecha a explicação ao tocar fora (touch) === */
  document.addEventListener('touchstart', (e) => {
    const a = document.activeElement;
    if (a && a.classList && a.classList.contains('term') && !e.target.closest('.term')) a.blur();
  }, { passive: true });

  /* ==========================================================
     v2 · Experiência interativa
     ========================================================== */
  (() => {
    'use strict';
    const $ = (id) => document.getElementById(id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fmt = new Intl.NumberFormat('pt-BR');
    const pct = (v) => (v * 100).toFixed(1).replace('.', ',') + '%';
    // entrada curta (220ms, ease-out forte): a troca de passo é frequente, então só um sinal de que mudou
    const pop = (el) => { if (!reduce && el.animate) el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }); };
    const fillRange = (input) => input.style.setProperty('--fill', ((input.value - input.min) / (input.max - input.min)) * 100 + '%');
    const unhint = (el) => el && el.classList.remove('is-hint');

    /* === Jornada === */
    const jr = $('jr');
    if (jr) {
      const steps = Array.from(jr.querySelectorAll('.jr__step'));
      const scenes = Array.from(jr.querySelectorAll('[data-scene]'));
      const chapters = Array.from(jr.querySelectorAll('[data-chapter]'));
      const bar = $('jr-bar');
      const done = new Set();
      // a barra cresce por transform (scaleX), não por width: não recalcula o layout a cada quadro
      const updateBar = () => { bar.style.transform = `scaleX(${done.size / 4})`; };
      // fromKeyboard: navegação por setas troca na hora, sem animação (ação repetida, precisa ser imediata)
      const go = (i, fromKeyboard) => {
        steps.forEach((s, k) => { s.setAttribute('aria-selected', String(k === i)); s.tabIndex = k === i ? 0 : -1; });
        scenes.forEach((s, k) => { s.hidden = k !== i; });
        chapters.forEach((c, k) => { c.hidden = k !== i; });
        if (fromKeyboard) steps[i].focus(); else { pop(chapters[i]); pop(scenes[i]); }
        const num = $('jr-num'); if (num) { num.textContent = String(i + 1).padStart(2, '0'); num.classList.remove('is-in'); void num.offsetWidth; num.classList.add('is-in'); }
        if (i === 2) drawWaves();
      };
      const complete = (i) => {
        if (done.has(i)) return;
        done.add(i);
        steps[i].classList.add('is-done');
        const r = $('jr-r' + i);
        if (r) { r.hidden = false; pop(r); }
        updateBar();
      };
      steps.forEach((s, k) => {
        s.addEventListener('click', () => go(k));
        // abas no padrão WAI-ARIA: ←/→ andam (dando a volta), Home e End vão às pontas
        s.addEventListener('keydown', (e) => {
          const n = steps.length, next = { ArrowRight: k + 1, ArrowLeft: k - 1, Home: 0, End: n - 1 }[e.key];
          if (next === undefined) return;
          e.preventDefault();
          go((next + n) % n, true);
        });
      });
      jr.querySelectorAll('[data-goto]').forEach((b) => b.addEventListener('click', () => go(+b.dataset.goto)));

      // 1 · Girar
      const coin = $('jr-coin'), coinRead = $('jr-coin-read'), spinBtn = jr.querySelector('[data-act="spin"]');
      spinBtn.addEventListener('click', () => {
        const on = !coin.classList.contains('is-spinning');
        coin.classList.remove('show-1');
        coin.classList.toggle('is-spinning', on);
        coinRead.innerHTML = on ? 'qubit = <b>0</b> e <b>1</b> ao mesmo tempo · |ψ⟩ = 0,71|0⟩ + 0,71|1⟩' : 'bit = <b>0</b>';
        spinBtn.textContent = on ? 'Parar a moeda' : 'Girar a moeda';
        unhint(spinBtn);
        if (on) complete(0);
      });

      // 2 · Medir
      const mcoin = $('jr-mcoin'), mread = $('jr-m-read'), tip = $('jr-m-tip');
      const b1 = jr.querySelector('[data-act="m1"]'), b1000 = jr.querySelector('[data-act="m1000"]');
      const counts = [0, 0];
      const drawHist = () => {
        const total = counts[0] + counts[1], max = Math.max(1, counts[0], counts[1]);
        [0, 1].forEach((k) => { $('jr-c' + k).textContent = fmt.format(counts[k]); $('jr-b' + k).style.height = (counts[k] / max) * 92 + '%'; });
        mread.textContent = total ? fmt.format(total) + (total === 1 ? ' medição' : ' medições') + ' · 0: ' + pct(counts[0] / total) + ' · 1: ' + pct(counts[1] / total) : '0 medições';
      };
      const lock = (on) => { b1.disabled = on; b1000.disabled = on; };
      b1.addEventListener('click', () => {
        lock(true);
        mcoin.classList.remove('show-1');
        mcoin.classList.add('is-spinning');
        setTimeout(() => {
          const r = Math.random() < 0.5 ? 0 : 1;
          mcoin.classList.remove('is-spinning');
          mcoin.classList.toggle('show-1', r === 1);
          counts[r]++; drawHist(); lock(false);
          if (counts[0] + counts[1] >= 3) complete(1); else { tip.hidden = false; }
        }, reduce ? 0 : 650);
      });
      b1000.addEventListener('click', () => {
        lock(true); unhint(b1000); tip.hidden = true;
        const base = counts.slice(), add0 = Math.round(500 + (Math.random() - 0.5) * 50);
        mcoin.classList.remove('show-1'); mcoin.classList.add('is-spinning');
        const finish = () => { mcoin.classList.remove('is-spinning'); mcoin.classList.toggle('show-1', add0 < 500); lock(false); complete(1); };
        if (reduce) { counts[0] = base[0] + add0; counts[1] = base[1] + 1000 - add0; drawHist(); finish(); return; }
        let start = null;
        const step = (ts) => {
          if (start === null) start = ts;
          const t = Math.min(1, (ts - start) / 1400);
          counts[0] = base[0] + Math.round(add0 * t);
          counts[1] = base[1] + Math.round((1000 - add0) * t);
          drawHist();
          if (t < 1) requestAnimationFrame(step); else finish();
        };
        requestAnimationFrame(step);
      });

      // 3 · Interferência
      const wa = $('jr-wa'), wb = $('jr-wb'), ws = $('jr-ws'), phase = $('jr-phase'), wread = $('jr-w-read'), wmsg = $('jr-w-msg');
      const wave = (y0, f) => { let d = ''; for (let x = 0; x <= 340; x += 4) { const a = (x / 340) * 4 * Math.PI; d += (x ? 'L' : 'M') + (70 + x) + ' ' + (y0 - f(a)).toFixed(1); } return d; };
      function drawWaves() {
        const deg = +phase.value, ph = (deg * Math.PI) / 180;
        wa.setAttribute('d', wave(50, (a) => 20 * Math.sin(a)));
        wb.setAttribute('d', wave(115, (a) => 20 * Math.sin(a + ph)));
        ws.setAttribute('d', wave(190, (a) => 20 * (Math.sin(a) + Math.sin(a + ph))));
        const amp = Math.abs(2 * Math.cos(ph / 2));
        ws.classList.toggle('is-flat', amp < 0.2);
        $('jr-phase-out').textContent = deg + '°';
        wread.textContent = 'Soma: ' + Math.round(amp * 100) + '% da força de uma onda';
        wmsg.textContent = deg < 30 ? 'Alinhadas, se somam: a resposta certa fica mais forte.' : deg > 150 ? 'Opostas, se anulam: as erradas somem.' : 'Continue arrastando…';
      }
      fillRange(phase); drawWaves();
      phase.addEventListener('input', () => { fillRange(phase); phase.classList.remove('is-hint-range'); drawWaves(); if (+phase.value >= 150) complete(2); });

      // 4 · Rotas
      const routes = $('jr-routes'), rread = $('jr-r-read');
      const N = 120, BEST = 87;
      const dots = Array.from({ length: N }, () => { const d = document.createElement('span'); d.className = 'jr__dot'; routes.appendChild(d); return d; });
      const modes = Array.from(jr.querySelectorAll('.jr__mode'));
      let timers = [];
      const clear = () => { timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); timers = []; dots.forEach((d) => { d.className = 'jr__dot'; }); };
      const setMode = (m) => { modes.forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.mode === m)); unhint(b); }); };
      const runClassic = () => {
        clear(); setMode('classic');
        if (reduce) { dots.forEach((d) => { d.className = 'jr__dot is-tested'; }); dots[BEST].className = 'jr__dot is-best'; rread.textContent = 'Melhor rota encontrada após testar as 2.520'; complete(3); return; }
        let i = 0;
        const t = setInterval(() => {
          if (i > 0) dots[i - 1].className = 'jr__dot is-tested';
          if (i >= N) { clearInterval(t); dots[BEST].className = 'jr__dot is-best'; rread.textContent = 'Melhor rota encontrada após testar as 2.520, uma a uma'; complete(3); return; }
          dots[i].className = 'jr__dot is-current';
          rread.textContent = 'Testando rota ' + fmt.format(Math.ceil(((i + 1) / N) * 2520)) + ' de 2.520…';
          i++;
        }, 30);
        timers.push(t);
      };
      const runQuantum = () => {
        clear(); setMode('quantum');
        dots.forEach((d) => { d.className = 'jr__dot is-super'; });
        rread.textContent = 'Todas as 2.520 rotas em superposição';
        const finish = () => { dots.forEach((d, k) => { d.className = k === BEST ? 'jr__dot is-best' : 'jr__dot is-gone'; }); rread.textContent = 'Interferência destacou a melhor rota em ~50 passos'; complete(3); };
        if (reduce) { finish(); return; }
        timers.push(setTimeout(() => { dots.forEach((d, k) => { if (k !== BEST && k % 2) d.className = 'jr__dot is-super is-fade'; }); rread.textContent = 'Interferência: rotas longas se cancelam…'; }, 800));
        timers.push(setTimeout(() => { dots.forEach((d, k) => { if (k !== BEST) d.className = 'jr__dot is-super is-fade'; }); }, 1500));
        timers.push(setTimeout(finish, 2200));
      };
      modes.forEach((b) => b.addEventListener('click', () => (b.dataset.mode === 'classic' ? runClassic() : runQuantum())));

      updateBar();
    }

    /* === Comparativo interativo === */
    const nIn = $('cmp-n');
    if (nIn) {
      const X = (n) => 40 + (340 * n) / 60;
      const expY = (n) => 220 - (195 * (Math.pow(2, n / 6) - 1)) / (Math.pow(2, 10) - 1);
      const sqY = (n) => 220 - 30 * Math.sqrt(n / 60);
      const sig = new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 });
      const human = (s) => {
        const f = (v, u, up) => { const r = v >= 10 ? Math.round(v) : Math.round(v * 10) / 10; return fmt.format(r) + ' ' + (r === 1 ? u : up); };
        if (s < 1e-3) return f(s * 1e6, 'microssegundo', 'microssegundos');
        if (s < 1) return f(s * 1e3, 'milissegundo', 'milissegundos');
        if (s < 60) return f(s, 'segundo', 'segundos');
        if (s < 3600) return f(s / 60, 'minuto', 'minutos');
        if (s < 86400) return f(s / 3600, 'hora', 'horas');
        if (s < 31557600) return f(s / 86400, 'dia', 'dias');
        const y = s / 31557600;
        return y < 1000 ? f(y, 'ano', 'anos') : f(y / 1000, 'mil anos', 'mil anos');
      };
      const marker = $('cmp-marker'), dExp = $('dot-exp'), dSq = $('dot-sqrt'), nl = $('cmp-nlbl'), big = $('cmp-big'), small = $('cmp-small');
      const drag = $('cmp-drag');
      const update = () => {
        const n = +nIn.value, x = X(n);
        const tc = Math.pow(2, n) * 2.8e-8, tq = 3e-6 * Math.pow(2, n / 2);
        $('cmp-n-out').textContent = n + ' variáveis';
        $('cmp-tc').textContent = human(tc);
        $('cmp-tq').textContent = human(tq);
        marker.setAttribute('x1', x); marker.setAttribute('x2', x);
        dExp.setAttribute('cx', x); dExp.setAttribute('cy', expY(n).toFixed(1));
        dSq.setAttribute('cx', x); dSq.setAttribute('cy', sqY(n).toFixed(1));
        nl.setAttribute('x', x); nl.textContent = 'n = ' + n;
        const st = $('cmp2');
        if (st) { st.style.setProperty('--cx', (x / 4).toFixed(2) + '%'); st.style.setProperty('--ey', (expY(n) / 2.6).toFixed(2) + '%'); st.style.setProperty('--qy', (sqY(n) / 2.6).toFixed(2) + '%'); st.classList.toggle('is-left', x < 215); }
        const left = x > 170;
        [big, small].forEach((t) => { t.setAttribute('x', left ? x - 10 : x + 10); t.setAttribute('text-anchor', left ? 'end' : 'start'); });
        if (tq < tc) {
          big.textContent = sig.format(tc / tq) + '×'; small.textContent = 'mais rápido';
          $('cmp-verdict').innerHTML = 'Com ' + n + ' variáveis, o quântico é <strong>' + sig.format(tc / tq) + '× mais rápido</strong>. Na prática: ' + human(tc) + ' viram ' + human(tq) + '.';
        } else {
          big.textContent = 'clássico vence'; small.textContent = 'problema pequeno';
          $('cmp-verdict').innerHTML = 'Com só ' + n + ' variáveis, o computador clássico ainda vence. <strong>Por isso só usamos quântico quando o problema é grande o bastante.</strong>';
        }
      };
      fillRange(nIn); update();
      nIn.addEventListener('input', () => { fillRange(nIn); nIn.classList.remove('is-hint-range'); drag.classList.add('is-gone'); update(); });
    }

    /* === Palpites de mercado === */
    const quizzes = Array.from(document.querySelectorAll('.quiz'));
    if (quizzes.length) {
      let answered = 0, score = 0;
      quizzes.forEach((card) => {
        const ans = +card.dataset.answer;
        const opts = Array.from(card.querySelectorAll('[data-opt]'));
        opts.forEach((b) => b.addEventListener('click', () => {
          if (card.classList.contains('is-answered')) return;
          card.classList.add('is-answered');
          const pick = +b.dataset.opt;
          opts.forEach((o) => { o.disabled = true; const k = +o.dataset.opt; if (k === ans) o.classList.add('is-correct'); else if (k === pick) o.classList.add('is-wrong'); });
          card.querySelector('.quiz__verdict').textContent = pick === ans ? 'Acertou.' : 'Quase. A resposta certa está destacada.';
          const a = card.querySelector('.quiz__answer'); a.hidden = false; pop(a);
          answered++; if (pick === ans) score++;
          if (answered === quizzes.length) {
            $('quiz-score').textContent = 'Você acertou ' + score + ' de ' + quizzes.length + '.';
            const r = $('quiz-result'); r.hidden = false; pop(r);
          }
        }));
      });
    }

    /* === Casos de uso: escolha === */
    const choices = Array.from(document.querySelectorAll('.pick__choice'));
    if (choices.length) {
      const panels = Array.from(document.querySelectorAll('[data-case-panel]'));
      choices.forEach((c) => c.addEventListener('click', () => {
        choices.forEach((x) => x.setAttribute('aria-selected', String(x === c)));
        panels.forEach((p) => { p.hidden = p.dataset.casePanel !== c.dataset.case; if (!p.hidden) pop(p); });
      }));
      document.querySelectorAll('.pick__demo').forEach((b) => b.addEventListener('click', () => {
        const tab = document.querySelector('.lab__tab[data-tab="' + b.dataset.demo + '"]');
        const demo = $('demo');
        if (tab) tab.click();
        if (demo) window.scrollTo({ top: demo.getBoundingClientRect().top + window.scrollY - 40, behavior: reduce ? 'auto' : 'smooth' });
      }));
    }
  })();

  /* ==========================================================
     v3 · Interlúdios em motion graphics
     ========================================================== */
  (() => {
    'use strict';
    const NS = 'http://www.w3.org/2000/svg';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mk = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
    const whenVisible = (el, onEnter, onLeave) => {
      const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? onEnter() : onLeave && onLeave())), { threshold: 0.25 });
      io.observe(el);
    };

    /* --- 1 · Criostato --- */
    const fr = document.getElementById('mg-fridge');
    if (fr) {
      const C = 250;
      const plates = [{ y: 52, rx: 170, t: '300 K' }, { y: 140, rx: 146, t: '50 K' }, { y: 226, rx: 122, t: '4 K' }, { y: 308, rx: 98, t: '800 mK' }, { y: 384, rx: 76, t: '100 mK' }];
      const defs = mk('defs', {}, fr);
      const rg = mk('radialGradient', { id: 'fr-glow' }, defs);
      mk('stop', { offset: '0', 'stop-color': '#6B46FF', 'stop-opacity': '0.55' }, rg);
      mk('stop', { offset: '1', 'stop-color': '#6B46FF', 'stop-opacity': '0' }, rg);
      mk('ellipse', { cx: C, cy: 462, rx: 170, ry: 70, fill: 'url(#fr-glow)' }, fr);
      const rxAt = (y) => {
        if (y <= plates[0].y) return plates[0].rx;
        for (let i = 0; i < plates.length - 1; i++) { const a = plates[i], b = plates[i + 1]; if (y <= b.y) return a.rx + ((y - a.y) / (b.y - a.y)) * (b.rx - a.rx); }
        return 40;
      };
      plates.forEach((p, i) => {
        const n = plates[i + 1], y2 = n ? n.y : 404, r = n ? n.rx : 30;
        [-0.86, -0.4, 0.4, 0.86].forEach((f) => mk('line', { x1: C + f * r, y1: p.y + 8, x2: C + f * r, y2, class: 'fr-rod' }, fr));
      });
      [-0.62, -0.2, 0.22, 0.6].forEach((f, k) => {
        let d = '';
        for (let y = 58; y <= 404; y += 3) { const x = C + f * Math.min(rxAt(y), 120) * 0.62 + Math.sin(y / 4.5 + k * 1.7) * 3.2; d += (y === 58 ? 'M' : 'L') + x.toFixed(1) + ' ' + y; }
        mk('path', { d, class: 'fr-coax' }, fr);
        const p = mk('path', { d, class: 'fr-pulse', pathLength: '400' }, fr);
        p.style.animationDelay = (k * 0.65).toFixed(2) + 's';
      });
      const tiers = plates.map((p, i) => {
        const g = mk('g', { class: 'fr-tier' }, fr);
        mk('ellipse', { cx: C, cy: p.y + 8, rx: p.rx, ry: p.rx * 0.15, class: 'fr-plate-under' }, g);
        mk('ellipse', { cx: C, cy: p.y, rx: p.rx, ry: p.rx * 0.15, class: 'fr-plate' }, g);
        mk('line', { x1: C + p.rx + 4, y1: p.y, x2: C + p.rx + 16, y2: p.y, class: 'fr-tick' }, g);
        const t = mk('text', { x: C + p.rx + 20, y: p.y + 4, class: 'fr-temp' }, g); t.textContent = p.t;
        return g;
      });
      const g = mk('g', { class: 'fr-tier' }, fr);
      mk('rect', { x: C - 26, y: 404, width: 52, height: 38, rx: 6, class: 'fr-mix' }, g);
      mk('rect', { x: C - 50, y: 448, width: 100, height: 20, rx: 3, class: 'fr-chip' }, g);
      for (let k = 0; k < 5; k++) mk('circle', { cx: C - 32 + k * 16, cy: 458, r: 3.4, class: 'fr-qubit' }, g);
      mk('line', { x1: C + 54, y1: 458, x2: C + 70, y2: 458, class: 'fr-tick' }, g);
      const t6 = mk('text', { x: C + 74, y: 462, class: 'fr-temp' }, g); t6.textContent = '15 mK · qubits';
      tiers.push(g);

      const temps = ['300 K', '50 K', '4 K', '800 mK', '100 mK', '15 mK'];
      const notes = ['temperatura ambiente', 'mais frio que Plutão', 'hélio líquido', 'quase lá…', 'mais frio que o espaço (2,7 K)', '≈ −273,14 °C · qubits prontos'];
      const tempEl = document.getElementById('fridge-temp'), cEl = document.getElementById('fridge-c');
      const set = (s) => {
        tiers.forEach((t, i) => { t.classList.toggle('is-cold', i <= s); t.classList.toggle('is-now', i === s); });
        tempEl.textContent = temps[s]; cEl.textContent = notes[s];
      };
      if (reduce) set(5);
      else {
        let s = 0, hold = 0, timer = null;
        set(0);
        const tick = () => { if (s < 5) { s++; set(s); } else if (++hold > 3) { s = 0; hold = 0; set(0); } };
        whenVisible(fr, () => { if (!timer) timer = setInterval(tick, 950); }, () => { clearInterval(timer); timer = null; });
      }
    }

    /* --- 2 · Chip --- */
    const chip = document.getElementById('mg-chip');
    if (chip) {
      mk('rect', { x: 30, y: 20, width: 460, height: 360, rx: 18, class: 'chip-pkg' }, chip);
      for (let x = 64; x <= 456; x += 28) {
        mk('line', { x1: x + 6, y1: 36, x2: x + 6, y2: 60, class: 'chip-bond' }, chip);
        mk('line', { x1: x + 6, y1: 340, x2: x + 6, y2: 364, class: 'chip-bond' }, chip);
        mk('rect', { x, y: 28, width: 12, height: 8, rx: 1, class: 'chip-pad' }, chip);
        mk('rect', { x, y: 364, width: 12, height: 8, rx: 1, class: 'chip-pad' }, chip);
      }
      mk('rect', { x: 70, y: 60, width: 380, height: 280, rx: 8, class: 'chip-die' }, chip);
      const COLS = 5, ROWS = 4, X0 = 120, DX = 70, Y0 = 100, DY = 66;
      const pos = (i) => ({ x: X0 + (i % COLS) * DX, y: Y0 + Math.floor(i / COLS) * DY });
      const links = [];
      for (let i = 0; i < COLS * ROWS; i++) {
        if (i % COLS < COLS - 1) links.push([i, i + 1]);
        if (i + COLS < COLS * ROWS) links.push([i, i + COLS]);
      }
      const fires = links.map(([a, b]) => {
        const A = pos(a), B = pos(b);
        mk('line', { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: 'chip-link' }, chip);
        return mk('line', { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: 'chip-fire', pathLength: '100' }, chip);
      });
      const nodes = Array.from({ length: COLS * ROWS }, (_, i) => {
        const p = pos(i), g = mk('g', { class: 'chip-node' }, chip);
        mk('circle', { cx: p.x, cy: p.y, r: 13, class: 'chip-q' }, g);
        mk('circle', { cx: p.x, cy: p.y, r: 5, class: 'chip-qc' }, g);
        return g;
      });
      const countEl = document.getElementById('chip-count'), readEl = document.getElementById('chip-read');
      const fmt = new Intl.NumberFormat('pt-BR');
      let count = 0, timer = null;
      const gates = ['CNOT', 'CZ', 'iSWAP'];
      const fire = () => {
        const k = Math.floor(Math.random() * links.length), [a, b] = links[k], f = fires[k];
        f.classList.remove('is-fire'); void f.getBoundingClientRect(); f.classList.add('is-fire');
        [a, b].forEach((n) => { nodes[n].classList.add('is-on'); setTimeout(() => nodes[n].classList.remove('is-on'), 650); });
        count++;
        countEl.textContent = fmt.format(count);
        readEl.textContent = 'portas executadas · ' + gates[k % 3] + ' q' + a + ' ↔ q' + b;
      };
      if (reduce) { nodes.forEach((n, i) => { if (i % 3 === 0) n.classList.add('is-on'); }); countEl.textContent = '20 qubits'; readEl.textContent = '31 conexões possíveis'; }
      else whenVisible(chip, () => { if (!timer) timer = setInterval(fire, 380); }, () => { clearInterval(timer); timer = null; });
    }

    /* --- 3 · Fluxo nuvem → QPU --- */
    const flow = document.getElementById('flow');
    if (flow) {
      const nodes = Array.from(flow.querySelectorAll('[data-node]'));
      const dots = Array.from(flow.querySelectorAll('[data-dot]'));
      const msEl = document.getElementById('flow-ms'), cap = document.getElementById('flow-cap');
      const phases = [
        { d: 700, cap: 'Sua requisição sai…', node: 0, dot: 0, dir: 1 },
        { d: 700, cap: 'A IA traduz o problema em qubits', node: 1, dot: 1, dir: 1 },
        { d: 700, cap: 'O QPU calcula a −273 °C', node: 2 },
        { d: 700, cap: 'A IA interpreta o resultado', node: 1, dot: 1, dir: -1 },
        { d: 700, cap: 'Resposta na sua tela', node: 0, dot: 0, dir: -1 },
        { d: 1400, cap: 'Resposta na sua tela', node: 0, hold: true }
      ];
      const total = phases.slice(0, 5).reduce((s, p) => s + p.d, 0);
      const render = (t) => {
        let acc = 0, ph = phases[phases.length - 1], local = 1;
        for (const p of phases) { if (t < acc + p.d) { ph = p; local = (t - acc) / p.d; break; } acc += p.d; }
        nodes.forEach((n, i) => n.classList.toggle('is-on', i === ph.node));
        dots.forEach((d, i) => {
          const on = ph.dot === i;
          d.style.opacity = on ? '1' : '0';
          d.classList.toggle('is-back', on && ph.dir < 0);
          if (on) d.style.left = ((ph.dir > 0 ? local : 1 - local) * 100).toFixed(1) + '%';
        });
        cap.textContent = ph.cap;
        msEl.textContent = Math.round(Math.min(t, total) / total * 340) + ' ms';
      };
      if (reduce) { nodes[2].classList.add('is-on'); msEl.textContent = '340 ms'; cap.textContent = 'Ida e volta até o QPU'; }
      else {
        let raf = null, start = null;
        const loopLen = phases.reduce((s, p) => s + p.d, 0);
        const step = (ts) => { if (start === null) start = ts; render((ts - start) % loopLen); raf = requestAnimationFrame(step); };
        whenVisible(flow, () => { if (!raf) { start = null; raf = requestAnimationFrame(step); } }, () => { cancelAnimationFrame(raf); raf = null; });
      }
    }
  })();


  /* === v4 · Pulsos no circuito + glow dos CTAs === */
  (() => {
    'use strict';
    const NS = 'http://www.w3.org/2000/svg';
    const hero = document.querySelector('.hero');
    const svg = document.querySelector('.hero__circuit:not(.hero__circuit--meter) svg');
    if (svg) {
      const g = document.createElementNS(NS, 'g');
      svg.querySelectorAll('.wires line').forEach((ln, i) => {
        for (let k = 0; k < 2; k++) {
          const p = ln.cloneNode();
          p.setAttribute('class', 'wire-pulse');
          p.setAttribute('pathLength', '100');
          const d = 6 + ((i * 7 + k * 5) % 6) * 0.9;
          p.style.setProperty('--pd', d.toFixed(1) + 's');
          p.style.setProperty('--po', (-(i * 1.7 + k * d * 0.5) % d).toFixed(2) + 's');
          g.appendChild(p);
        }
      });
      svg.querySelector('.wires').after(g);
    }
    setTimeout(() => hero && hero.classList.add('is-settled'), 1500);
    document.querySelectorAll('.btn-glow').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--gx', (e.clientX - r.left) + 'px');
        b.style.setProperty('--gy', (e.clientY - r.top) + 'px');
      });
    });
  })();


  /* === v5 · Campo de pontos com contornos + parallax em 3 planos === */
  (() => {
    'use strict';
    const cv = document.getElementById('starfield');
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const K = reduce ? 1 : 0.35; // plano 1: pontos a 35% da velocidade do conteúdo
    const hero = document.querySelector('.hero');
    const cta = document.getElementById('investidores');
    const COLORS = ['#E6E9FF', '#8DB4FF', '#A592FF'];
    let W = 0, H = 0, parts = [], ranges = [], fac = 1;

    const rng = (seed) => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const gauss = (r) => Math.sqrt(-2 * Math.log(r() || 1e-6)) * Math.cos(2 * Math.PI * r());

    const layout = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const maxS = Math.max(0, document.documentElement.scrollHeight - H);
      const L = H + K * maxS;
      const r = rng(7);
      const out = [];
      // Estrelas esparsas por toda a página
      const nStars = Math.min(2400, Math.round((W * L) / 6500));
      for (let i = 0; i < nStars; i++) {
        const q = r();
        out.push({ x: r() * W, y: r() * L, s: q < 0.06 ? 1.6 : 1, a: 0.12 + r() * 0.42, c: q < 0.78 ? 0 : q < 0.9 ? 1 : 2, w: 0.0006 + r() * 0.0016, p: r() * 6.28, z: 0 });
      }
      // Contornos (dunas de pontos) atrás do Hero e do CTA
      const zone = (el, fracs, ampF, seed) => {
        if (!el) return;
        const b = el.getBoundingClientRect(), top = b.top + window.scrollY, h = b.height;
        const s0 = Math.min(maxS, Math.max(0, top + h / 2 - H / 2));
        const lTop = top - s0 + K * s0;
        const zr = rng(seed);
        fracs.forEach((f, ci) => {
          const amp = h * ampF * (0.7 + zr() * 0.6), f1 = 1.2 + zr() * 1.6, f2 = 3 + zr() * 3, p1 = zr() * 6.28, p2 = zr() * 6.28;
          const tilt = (zr() - 0.5) * h * 0.18, spread = h * (0.05 + zr() * 0.04);
          const cx = 0.25 + zr() * 0.6;
          const n = Math.round(W * (0.75 - ci * 0.08));
          for (let i = 0; i < n; i++) {
            const u = zr();
            const env = Math.exp(-Math.pow((u - cx) / 0.42, 2));
            if (zr() > 0.2 + 0.8 * env) continue;
            const base = lTop + h * f + amp * Math.sin(u * f1 * Math.PI + p1) + amp * 0.3 * Math.sin(u * f2 * Math.PI + p2) + tilt * (u - 0.5);
            const below = zr() < 0.78;
            const d = below ? -Math.log(zr() || 1e-6) * spread * 0.55 : -Math.abs(gauss(zr)) * spread * 0.12;
            const near = Math.exp(-Math.abs(d) / (spread * 0.3));
            const q = zr();
            out.push({ x: u * W, y: base + d, s: near > 0.7 && q < 0.12 ? 1.5 : 1, a: (0.16 + 0.62 * near) * (0.55 + 0.45 * env), c: q < 0.62 ? 0 : q < 0.84 ? 1 : 2, w: 0.0008 + zr() * 0.0012, p: zr() * 6.28, z: 1 });
          }
        });
      };
      zone(hero, [0.5, 0.64, 0.78, 0.92], 0.07, 11);
      zone(cta, [0.22, 0.48, 0.74, 0.9], 0.06, 29);
      out.sort((a, b) => a.c - b.c);
      ranges = [0, 1, 2].map((c) => [out.findIndex((p) => p.c === c), out.length - out.slice().reverse().findIndex((p) => p.c === c)]);
      parts = out;
    };

    const draw = (t) => {
      const off = K * window.scrollY;
      const hb = hero ? hero.getBoundingClientRect() : null, cb = cta ? cta.getBoundingClientRect() : null;
      const inZone = (hb && hb.bottom > H * 0.45) || (cb && cb.top < H * 0.6);
      const target = inZone ? 1 : 0.42; // intensidade controlada nas seções de conteúdo
      fac = reduce ? target : fac + (target - fac) * 0.06;
      ctx.clearRect(0, 0, W, H);
      ranges.forEach(([a, b], c) => {
        if (a < 0) return;
        ctx.fillStyle = COLORS[c];
        for (let i = a; i < b; i++) {
          const p = parts[i], y = p.y - off;
          if (y < -2 || y > H + 2) continue;
          let al = p.a * (p.z ? 0.55 + 0.45 * fac : fac);
          let x = p.x;
          if (!reduce) { al *= 0.72 + 0.28 * Math.sin(t * p.w + p.p); if (p.z) x += Math.sin(t * 0.00035 + p.p) * 1.4; }
          ctx.globalAlpha = al;
          ctx.fillRect(x, y, p.s, p.s);
        }
      });
      ctx.globalAlpha = 1;
    };

    // Plano 3: glow do CTA sobe mais rápido que o conteúdo
    const ctaGlow = () => {
      if (reduce || !cta) return;
      const b = cta.getBoundingClientRect();
      if (b.bottom < -200 || b.top > H + 200) return;
      cta.style.setProperty('--cy', ((b.top + b.height / 2 - H / 2) * 0.18).toFixed(1));
    };

    let rt;
    const relayout = () => { clearTimeout(rt); rt = setTimeout(() => { layout(); draw(performance.now()); }, 160); };
    window.addEventListener('resize', relayout);
    if (window.ResizeObserver) new ResizeObserver(relayout).observe(document.body);
    layout(); ctaGlow();

    if (reduce) {
      draw(0);
      let tk = false;
      window.addEventListener('scroll', () => { if (tk) return; tk = true; requestAnimationFrame(() => { draw(0); tk = false; }); }, { passive: true });
    } else {
      // Cintila (laço de animação, ~15 qps) só com o Hero ou os Investidores na tela; no resto da
      // página redesenha só quando a página rola. Parado no meio do conteúdo, não gasta nenhum quadro.
      const introOpen = () => document.documentElement.classList.contains('intro-open');
      const lively = new Set();
      let raf = 0, last = 0;
      const loop = (t) => {
        if (!introOpen() && t - last > 66) { draw(t); ctaGlow(); last = t; }
        raf = lively.size ? requestAnimationFrame(loop) : 0;
      };
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => (e.isIntersecting ? lively.add(e.target) : lively.delete(e.target)));
        if (lively.size && !raf) raf = requestAnimationFrame(loop);
      });
      if (hero) io.observe(hero);
      if (cta) io.observe(cta);
      let tk = false;
      window.addEventListener('scroll', () => {
        if (raf || tk) return;
        tk = true;
        requestAnimationFrame((t) => { if (!introOpen()) { draw(t); ctaGlow(); } tk = false; });
      }, { passive: true });
      // a intro fecha com a página parada: desenha o céu nessa hora
      window.addEventListener('intro:done', () => draw(performance.now()), { once: true });
    }
  })();


  /* === v6 · Blobs do CTA a 40% da velocidade do scroll === */
  (() => {
    'use strict';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const b = document.querySelector('.blobs--cta');
    if (!b) return;
    const sec = b.closest('section');
    let tk = false;
    const upd = () => {
      const r = sec.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom > -200 && r.top < vh + 200) b.style.setProperty('--by', (-0.6 * (r.top + r.height / 2 - vh / 2)).toFixed(1));
      tk = false;
    };
    window.addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  })();


  /* === v7 · Quiz conversacional + fio do roadmap === */
  (() => {
    'use strict';
    const stage = document.getElementById('convo-stage');
    if (stage) {
      const qs = Array.from(stage.querySelectorAll('.quiz'));
      const dots = Array.from(document.querySelectorAll('.convo__dots li'));
      const show = (k) => {
        qs.forEach((q, i) => { const on = i === k; q.classList.toggle('is-active', on); q.inert = !on; if (on) q.removeAttribute('aria-hidden'); else q.setAttribute('aria-hidden', 'true'); });
        dots.forEach((d, i) => d.classList.toggle('is-on', i <= k));
        const f = qs[k].querySelector('.quiz__opt:not(:disabled)');
        if (f) setTimeout(() => f.focus({ preventScroll: true }), 300);
      };
      qs.forEach((q, i) => { q.inert = i !== 0; });
      stage.addEventListener('click', (e) => { const b = e.target.closest('[data-next]'); if (b) show(+b.dataset.next); });
    }
    const thread = document.querySelector('.rm-thread');
    if (thread) {
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { thread.classList.add('is-on'); io.disconnect(); } }, { threshold: 0.2 });
      io.observe(document.getElementById('rm-track'));
    }
  })();


  /* === v10 · Escalas visuais: casos de uso + respostas do mercado === */
  (() => {
    'use strict';
    const LOG2 = Math.log10(2);
    const fmt = new Intl.NumberFormat('pt-BR');
    const sup = (n) => String(n).replace(/[0-9]/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
    const sci = (lg) => { if (lg < 6) return fmt.format(Math.round(Math.pow(10, lg))); const e = Math.floor(lg); return (Math.pow(10, lg - e)).toFixed(2).replace('.', ',') + ' × 10' + sup(e); };
    const CFG = {
      qaoa: { max: 32, ticks: [0, 10, 20, 30], c: (n) => n * LOG2, q: (n) => Math.log10(n),
        out: (n) => n + ' ativos', ct: (n) => sci(n * LOG2) + ' carteiras para testar', qt: (n) => n + ' qubits em superposição',
        pins: [[11, 'Estrelas na Via Láctea'], [18.88, 'Grãos de areia na Terra']] },
      vqe: { max: 52, ticks: [0, 10, 20, 30, 40, 50], c: (n) => n * LOG2, q: (n) => Math.log10(n),
        out: (n) => n + ' spin-orbitais', ct: (n) => sci(n * LOG2) + ' amplitudes para simular', qt: (n) => n + ' qubits',
        pins: [[3.61, 'LiH · 12'], [48.16, 'Cafeína · 160'], [50.12, 'Átomos na Terra']] },
      grover: { max: 9, ticks: [0, 3, 6, 9], c: (e) => e, q: (e) => Math.log10(Math.max(1, Math.PI / 4 * Math.pow(10, e / 2))),
        out: (e) => fmt.format(Math.round(Math.pow(10, e))) + ' registros', ct: (e) => 'até ' + fmt.format(Math.round(Math.pow(10, e))) + ' consultas', qt: (e) => '≈ ' + fmt.format(Math.round(Math.PI / 4 * Math.pow(10, e / 2))) + ' iterações',
        pins: [[6, '1 milhão']] }
    };
    document.querySelectorAll('.scale[data-scale]').forEach((el) => {
      const cfg = CFG[el.dataset.scale]; if (!cfg) return;
      const inp = el.querySelector('input'), out = el.querySelector('output');
      const tc = el.querySelector('.scale__track--c i'), tq = el.querySelector('.scale__track--q i');
      const dc = el.querySelector('[data-c]'), dq = el.querySelector('[data-q]');
      const pct = (v) => Math.min(100, Math.max(0, (v / cfg.max) * 100)).toFixed(2) + '%';
      el.querySelector('.scale__axis').innerHTML = cfg.ticks.map((t) => '<span style="left:' + pct(t) + '">10' + sup(t) + '</span>').join('');
      el.querySelector('.scale__pins').innerHTML = cfg.pins.map((p, i) => '<span class="scale__pin' + (i % 2 ? ' is-low' : '') + (p[0] / cfg.max > 0.7 ? ' is-end' : '') + '" style="left:' + pct(p[0]) + '"><b>' + p[1] + '</b></span>').join('');
      const pins = Array.from(el.querySelectorAll('.scale__pin'));
      const upd = () => {
        const v = +inp.value, c = cfg.c(v);
        tc.style.width = pct(c); tq.style.width = pct(cfg.q(v));
        out.textContent = cfg.out(v); dc.textContent = cfg.ct(v); dq.textContent = cfg.qt(v);
        pins.forEach((p, i) => p.classList.toggle('is-passed', c >= cfg.pins[i][0]));
        inp.style.setProperty('--fill', ((v - inp.min) / (inp.max - inp.min)) * 100 + '%');
      };
      inp.addEventListener('input', upd); upd();
    });

    const stage = document.getElementById('convo-stage');
    if (!stage) return;
    const res = [];
    stage.addEventListener('click', (e) => {
      const b = e.target.closest('.quiz__opt'); if (!b) return;
      const card = b.closest('.quiz'); if (card.querySelector('.qscale')) return;
      const vals = card.dataset.vals.split(',').map(Number);
      const opts = Array.from(card.querySelectorAll('.quiz__opt'));
      const ans = +card.dataset.answer, pick = +b.dataset.opt;
      const lg = vals.map((v) => Math.log10(v)), mn = Math.min(...lg), mx = Math.max(...lg);
      const errs = card.dataset.i === '3';
      const rows = vals.map((v, i) => {
        const w = 16 + 84 * (lg[i] - mn) / (mx - mn || 1);
        const tag = i === ans && i === pick ? 'resposta · seu palpite' : i === ans ? 'resposta' : i === pick ? 'seu palpite' : '';
        return '<div class="qscale__row' + (i === ans ? ' is-correct' : '') + (i === pick ? ' is-pick' : '') + '"><span class="qscale__lbl">' + opts[i].textContent + (errs ? ' <small>' + String(v).replace('.', ',') + ' erros</small>' : '') + '</span><span class="qscale__bar"><i style="--w:' + w.toFixed(1) + '%"></i></span><span class="qscale__tag">' + tag + '</span></div>';
      }).join('');
      const box = document.createElement('div');
      box.className = 'qscale';
      box.innerHTML = '<p class="qscale__cap">' + card.dataset.cap + '</p>' + rows;
      const num = card.querySelector('.stat__number');
      num.after(box);
      requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('is-in')));
      res[+card.dataset.i] = pick === ans;
      if (res.filter((x) => x !== undefined).length === 4) {
        const cats = ['Segurança', 'Adoção', 'Volume', 'Precisão'];
        const dots = document.createElement('ol');
        dots.className = 'qdots';
        dots.innerHTML = res.map((ok, i) => '<li class="' + (ok ? 'is-ok' : 'is-miss') + '"><span aria-hidden="true">' + (ok ? '✓' : '✕') + '</span>' + cats[i] + '</li>').join('');
        const r = document.getElementById('quiz-result');
        r.prepend(dots);
      }
    });
  })();


  /* === v11 · Seções conectadas: Comparativo → Casos → Demo → API === */
  (() => {
    'use strict';
    const send = (k, v) => window.dispatchEvent(new CustomEvent('sq:set', { detail: { k, v } }));
    const flash = (el) => { if (!el) return; el.classList.remove('is-linked'); void el.offsetWidth; el.classList.add('is-linked'); };
    const cmp = document.getElementById('cmp-n');
    const scQ = document.getElementById('sc-qaoa');
    if (cmp) cmp.addEventListener('input', () => {
      const n = +cmp.value;
      send('qb', String(n));
      if (scQ) { scQ.value = n; scQ.dispatchEvent(new Event('input')); flash(scQ.closest('.scale')); }
    });
    const PROB = { qaoa: ['"QAOA"', '"portfolio_optimization"'], vqe: ['"VQE"', '"molecular_ground_state"'], grover: ['"Grover"', '"database_search"'] };
    document.querySelectorAll('.pick__choice[data-case]').forEach((c) => c.addEventListener('click', () => {
      const k = c.dataset.case, p = PROB[k]; if (!p) return;
      send('algo', p[0]); send('prob', p[1]);
      const tab = document.querySelector('.lab__tab[data-tab="' + k + '"]');
      if (tab && tab.getAttribute('aria-selected') !== 'true') tab.click();
      document.querySelectorAll('.lab__tab').forEach((t) => t.classList.toggle('is-linked', t === tab));
    }));
    const ratio = document.getElementById('q-ratio');
    if (ratio && window.MutationObserver) new MutationObserver(() => { const v = ratio.textContent.trim(); if (/^\d/.test(v)) send('ratio', v); }).observe(ratio, { childList: true, characterData: true, subtree: true });
  })();

}
