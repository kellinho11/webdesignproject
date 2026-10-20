// SynapseQ — animações e interações (vanilla JS, sem dependências)
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  // --fill (0–100%) pinta no CSS a parte já percorrida do trilho do controle deslizante
  const fillRange = (input) => {
    const p = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--fill', `${p}%`);
  };
  // abas no padrão WAI-ARIA: ←/→ andam (dando a volta), Home e End vão às pontas. Devolve o índice da aba ou null.
  const tabKey = (e, i, n) => {
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return null;
    e.preventDefault();
    return (next + n) % n;
  };

  /* === Header e menu mobile === */
  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 40);

  const setMenu = (open) => {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  const menuOpen = () => header.classList.contains('nav-open');

  toggle.addEventListener('click', () => setMenu(!menuOpen()));
  // Fecha ao escolher um link
  $$('.site-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  // Esc fecha e devolve o foco ao botão (quem usa teclado não se perde)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen()) { setMenu(false); toggle.focus(); }
  });
  // Clique fora do header fecha o menu
  document.addEventListener('click', (e) => {
    if (menuOpen() && !header.contains(e.target)) setMenu(false);
  });
  // Voltando para o layout de desktop, o menu fica fechado
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* === Hero: timeline de entrada === */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-loaded')));

  /* === Reveal genérico === */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      revealIO.unobserve(el);
      // depois de aparecer, o atraso escalonado não vale mais para o hover
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

  /* === Hero: parallax por cursor ===
     Mexe só em variáveis CSS (--mx, --my) usadas pelo circuito e por .hero__parallax;
     o fade de rolagem usa outro elemento (.hero__content), então um não apaga o outro. */
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

  /* === Hero: transição de saída ===
     Ao rolar, o conteúdo esmaece; com "reduzir movimento" só a opacidade muda, sem escala. */
  const heroExit = () => {
    const r = hero.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height * 0.8)));
    heroContent.style.opacity = (1 - 0.7 * p).toFixed(3);
    heroContent.style.transform = reduceMotion ? '' : `scale(${(1 - 0.03 * p).toFixed(4)})`;
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

  /* === Jornada: 4 passos (Gire, Meça, Interfira, Compare) ===
     Cada passo se completa com uma ação (girar, medir, arrastar, escolher) e então mostra a explicação.
     A cena da esquerda é decorativa; o resultado de cada ação é anunciado em #jr-status. */
  const jr = $('#jr');
  if (jr) {
    const byId = (id) => document.getElementById(id);
    const fmt = new Intl.NumberFormat('pt-BR');
    const pct = (v) => `${(v * 100).toFixed(1).replace('.', ',')}%`;
    const pop = (el) => {
      if (!reduceMotion && el.animate) el.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' });
    };
    const unhint = (el) => el.classList.remove('is-hint');
    const status = byId('jr-status');
    const say = (text) => { status.textContent = text; };

    const steps = $$('.jr__step', jr);
    const scenes = $$('[data-scene]', jr);
    const chapters = $$('[data-chapter]', jr);
    const bar = byId('jr-bar');
    const done = new Set();
    const go = (i, focus) => {
      steps.forEach((s, k) => {
        s.setAttribute('aria-selected', String(k === i));
        s.tabIndex = k === i ? 0 : -1;
        if (k === i && focus) s.focus();
      });
      scenes.forEach((s, k) => { s.hidden = k !== i; });
      chapters.forEach((c, k) => { c.hidden = k !== i; });
      pop(chapters[i]); pop(scenes[i]);
    };
    const complete = (i) => {
      if (done.has(i)) return;
      done.add(i);
      steps[i].classList.add('is-done');
      const r = byId(`jr-r${i}`);
      r.hidden = false; pop(r);
      bar.style.width = `${(done.size / steps.length) * 100}%`;
    };
    steps.forEach((s, i) => {
      s.addEventListener('click', () => go(i));
      s.addEventListener('keydown', (e) => {
        const next = tabKey(e, i, steps.length);
        if (next !== null) go(next, true);
      });
    });
    // "Próximo: ..." leva o foco junto, senão quem usa teclado fica preso no capítulo que sumiu
    $$('[data-goto]', jr).forEach((b) => b.addEventListener('click', () => go(+b.dataset.goto, true)));

    // 1 · Girar: parada é bit (0); girando é qubit (0 e 1)
    const coin = byId('jr-coin'), coinRead = byId('jr-coin-read'), spinBtn = $('[data-act="spin"]', jr);
    spinBtn.addEventListener('click', () => {
      const on = !coin.classList.contains('is-spinning');
      coin.classList.toggle('is-spinning', on);
      coinRead.innerHTML = on ? 'qubit = <b>0</b> e <b>1</b> ao mesmo tempo · |ψ⟩ = 0,71|0⟩ + 0,71|1⟩' : 'bit = <b>0</b>';
      spinBtn.textContent = on ? 'Parar a moeda' : 'Girar a moeda';
      say(on ? 'A moeda está girando: é 0 e 1 ao mesmo tempo.' : 'Moeda parada: bit igual a 0.');
      unhint(spinBtn);
      if (on) complete(0);
    });

    // 2 · Medir: uma leitura parece sorte; mil mostram o padrão de ~50%
    const mcoin = byId('jr-mcoin'), mread = byId('jr-m-read'), tip = byId('jr-m-tip');
    const b1 = $('[data-act="m1"]', jr), b1000 = $('[data-act="m1000"]', jr);
    const counts = [0, 0];
    const drawHist = () => {
      const total = counts[0] + counts[1], max = Math.max(1, ...counts);
      counts.forEach((c, k) => {
        byId(`jr-c${k}`).textContent = fmt.format(c);
        byId(`jr-b${k}`).style.height = `${(c / max) * 92}%`;
      });
      mread.textContent = total
        ? `${fmt.format(total)} ${total === 1 ? 'medição' : 'medições'} · 0: ${pct(counts[0] / total)} · 1: ${pct(counts[1] / total)}`
        : '0 medições';
    };
    const lock = (on) => { b1.disabled = on; b1000.disabled = on; };
    const land = (side) => { mcoin.classList.remove('is-spinning'); mcoin.classList.toggle('show-1', side === 1); };
    b1.addEventListener('click', () => {
      lock(true);
      mcoin.classList.remove('show-1');
      mcoin.classList.add('is-spinning');
      setTimeout(() => {
        const r = Math.random() < 0.5 ? 0 : 1;
        land(r);
        counts[r]++; drawHist(); lock(false);
        say(`Deu ${r}. ${mread.textContent}.`);
        if (counts[0] + counts[1] >= 3) complete(1); else tip.hidden = false;
      }, reduceMotion ? 0 : 650);
    });
    b1000.addEventListener('click', () => {
      lock(true); unhint(b1000); tip.hidden = true;
      const base = counts.slice(), add0 = Math.round(500 + (Math.random() - 0.5) * 50);
      mcoin.classList.remove('show-1'); mcoin.classList.add('is-spinning');
      const fill = (t) => {
        counts[0] = base[0] + Math.round(add0 * t);
        counts[1] = base[1] + Math.round((1000 - add0) * t);
        drawHist();
      };
      const finish = () => { land(add0 < 500 ? 1 : 0); lock(false); say(`${mread.textContent}.`); complete(1); };
      if (reduceMotion) { fill(1); finish(); return; }
      let start = null;
      const step = (ts) => {
        if (start === null) start = ts;
        const t = Math.min(1, (ts - start) / 1400);
        fill(t);
        if (t < 1) requestAnimationFrame(step); else finish();
      };
      requestAnimationFrame(step);
    });

    // 3 · Interferência: soma de duas senoides; amplitude da soma = |2·cos(φ/2)|
    const wa = byId('jr-wa'), wb = byId('jr-wb'), ws = byId('jr-ws'), phase = byId('jr-phase');
    const wread = byId('jr-w-read'), wmsg = byId('jr-w-msg'), wout = byId('jr-phase-out');
    const wave = (y0, f) => {
      let d = '';
      for (let x = 0; x <= 340; x += 4) d += `${x ? 'L' : 'M'}${70 + x} ${(y0 - f((x / 340) * 4 * Math.PI)).toFixed(1)}`;
      return d;
    };
    let lastMsg = '';
    const drawWaves = () => {
      const deg = +phase.value, ph = (deg * Math.PI) / 180;
      wa.setAttribute('d', wave(50, (a) => 20 * Math.sin(a)));
      wb.setAttribute('d', wave(115, (a) => 20 * Math.sin(a + ph)));
      ws.setAttribute('d', wave(190, (a) => 20 * (Math.sin(a) + Math.sin(a + ph))));
      const amp = Math.abs(2 * Math.cos(ph / 2));
      ws.classList.toggle('is-flat', amp < 0.2);
      wout.textContent = `${deg}°`;
      wread.textContent = `Soma: ${Math.round(amp * 100)}% da força de uma onda`;
      // só troca o texto quando a faixa muda: o aria-live anunciaria cada grau arrastado
      const msg = deg < 30 ? 'Alinhadas, se somam: a resposta certa fica mais forte.'
        : deg > 150 ? 'Opostas, se anulam: as erradas somem.' : 'Continue arrastando…';
      if (msg !== lastMsg) wmsg.textContent = lastMsg = msg;
    };
    fillRange(phase); drawWaves();
    phase.addEventListener('input', () => {
      fillRange(phase); drawWaves();
      if (+phase.value >= 150) complete(2);
    });

    // 4 · Rotas: 120 pontos representam as 2.520 rotas; o clássico testa uma a uma, o quântico filtra por interferência
    const routes = byId('jr-routes'), rread = byId('jr-r-read');
    const N = 120, BEST = 87, TOTAL = 2520;
    const dots = Array.from({ length: N }, () => routes.appendChild(document.createElement('span')));
    const paintDots = (cls) => dots.forEach((d, k) => { d.className = `jr__dot ${cls(k)}`.trim(); });
    paintDots(() => '');
    const modes = $$('.jr__mode', jr);
    let timers = [];
    const reset = (mode) => {
      timers.forEach(clearTimeout); timers = [];
      paintDots(() => '');
      modes.forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); unhint(b); });
    };
    const finishRoutes = (text, cls) => { paintDots(cls); rread.textContent = text; say(text); complete(3); };
    const runClassic = () => {
      reset('classic');
      const end = () => finishRoutes(`Melhor rota encontrada após testar as ${fmt.format(TOTAL)}, uma a uma`, (k) => (k === BEST ? 'is-best' : 'is-tested'));
      if (reduceMotion) { end(); return; }
      say('Testando as rotas uma a uma…');
      let i = 0;
      const tick = () => {
        if (i > 0) dots[i - 1].className = 'jr__dot is-tested';
        if (i >= N) { end(); return; }
        dots[i].className = 'jr__dot is-current';
        rread.textContent = `Testando rota ${fmt.format(Math.ceil(((i + 1) / N) * TOTAL))} de ${fmt.format(TOTAL)}…`;
        i++;
        timers.push(setTimeout(tick, 30));
      };
      tick();
    };
    const runQuantum = () => {
      reset('quantum');
      const end = () => finishRoutes('Interferência destacou a melhor rota em ~50 passos', (k) => (k === BEST ? 'is-best' : 'is-gone'));
      if (reduceMotion) { end(); return; }
      paintDots(() => 'is-super');
      rread.textContent = `Todas as ${fmt.format(TOTAL)} rotas em superposição`;
      say(rread.textContent);
      timers.push(setTimeout(() => {
        paintDots((k) => (k !== BEST && k % 2 ? 'is-super is-fade' : 'is-super'));
        rread.textContent = 'Interferência: rotas longas se cancelam…';
      }, 800));
      timers.push(setTimeout(() => paintDots((k) => (k !== BEST ? 'is-super is-fade' : 'is-super')), 1500));
      timers.push(setTimeout(end, 2200));
    };
    modes.forEach((b) => b.addEventListener('click', () => (b.dataset.mode === 'classic' ? runClassic() : runQuantum())));
  }

  /* === Comparativo: gráfico de complexidade ===
     Curvas calculadas, não desenhadas à mão. Eixo x: n de 0 a 60 mapeado em 40..380.
     Clássica: O(2^n) normalizada para a altura do gráfico; quântica: O(√n).
     O HTML já traz uma versão simplificada para quem está sem JS. */
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
    $('#curve-sqrt').setAttribute('d', build(sqrtY));
    $('#dot-exp').setAttribute('cy', expY(50).toFixed(2));
    $('#dot-sqrt').setAttribute('cy', sqrtY(50).toFixed(2));
    onceInView(chart, () => chart.classList.add('is-drawn'), 0.4);
  }

  /* === Casos de uso: grade do Grover ===
     60 registros; um deles (sorteado) é o "registro certo" que se destaca ao entrar na tela. */
  const grover = $('#grover');
  if (grover) {
    const TOTAL = 60;
    const TARGET = Math.floor(Math.random() * TOTAL);
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

  /* === Demonstração ao vivo: QAOA, Grover e VQE ===
     Simulação ilustrativa: os números saem de fórmulas simples (não de um simulador quântico),
     mas seguem o comportamento real de cada algoritmo. Os gráficos são SVG montados aqui. */
  const lab = $('#lab');
  if (lab) {
    const fmt = new Intl.NumberFormat('pt-BR');
    const dec = (x, d) => x.toFixed(d).replace('.', ',');
    const byId = (id) => document.getElementById(id);
    // Área útil dos gráficos no viewBox W × 300. No celular o W acompanha a largura real,
    // senão o SVG de 600 encolheria pela metade e os textos ficariam ilegíveis.
    const L = 44, T = 22, B = 252;
    let W = 600, R = W - 14;
    const measure = () => {
      const narrow = window.matchMedia('(max-width: 900px)').matches;
      W = narrow ? Math.round(Math.min(600, Math.max(280, lab.clientWidth - 44))) : 600;
      R = W - 14;
    };
    measure();

    // gerador pseudoaleatório com semente: os mesmos controles dão sempre o mesmo resultado
    const rng = (seed) => () => {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    // anima de 0 a 1 em "dur" ms; com "reduzir movimento" vai direto ao fim. Devolve a função que cancela.
    const play = (dur, frame, done) => {
      if (reduceMotion) { frame(1); done(); return () => {}; }
      let start = null, raf = 0;
      const step = (ts) => {
        if (start === null) start = ts;
        const t = Math.min(1, (ts - start) / dur);
        frame(t);
        if (t < 1) raf = requestAnimationFrame(step); else done();
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    };
    const setStatus = (el, state) => {
      el.classList.toggle('is-running', state === 'run');
      el.classList.toggle('is-done', state === 'done');
      el.textContent = state === 'run' ? 'Executando' : state === 'done' ? 'Medido' : 'Pronto';
    };
    // linhas de grade horizontais com o rótulo à esquerda
    const gridLines = (values, label) => values.map((v) => {
      const y = B - (B - T) * v;
      return `<line class="viz__grid" x1="${L}" x2="${R}" y1="${y}" y2="${y}"/><text class="viz__text" x="${L - 8}" y="${y + 4}" text-anchor="end">${label(v)}</text>`;
    }).join('');
    const axis = () => `<line class="viz__axis" x1="${L}" x2="${R}" y1="${B}" y2="${B}"/>`;
    const paint = (svg, s) => { svg.setAttribute('viewBox', `0 0 ${W} 300`); svg.innerHTML = s; };

    /* --- QAOA: das 16 carteiras mais amostradas, a de menor risco ganha peso a cada camada --- */
    const qaoa = (() => {
      const nIn = byId('q-n'), pIn = byId('q-p'), svg = byId('q-viz'), status = byId('q-status');
      const btn = $('[data-run="qaoa"]', lab);
      const K = 16;
      let stop = () => {}, ran = false;

      const model = () => {
        const n = +nIn.value, p = +pIn.value, r = rng(n * 131 + 7);
        const strings = [];
        while (strings.length < K) {
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
      };

      let last = null;
      const draw = (m, t) => {
        last = [m, t];
        const e = easeOut(t);
        const probs = m.final.map((f) => (1 - e) / K + e * f); // começa uniforme e vai para a distribuição final
        const maxP = Math.max(...m.final) * 1.12;
        const slot = (R - L) / K, bw = slot - 8;
        let s = gridLines([0.25, 0.5, 0.75, 1], (g) => dec(maxP * g, 2)) + axis();
        m.order.forEach((rank, pos) => {
          const p = probs[rank], h = Math.max(1, (B - T) * Math.min(1, p / maxP)), x = L + pos * slot + 4;
          const hot = rank === 0 && t > 0.15;
          s += `<rect class="viz__bar${hot ? ' viz__bar--hot' : ''}" x="${x.toFixed(1)}" y="${(B - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}"/>`;
          if (hot) {
            const cx = x + bw / 2;
            s += `<text class="viz__text--hot" x="${cx}" y="${B - h - 8}" text-anchor="middle">${Math.round(p * 100)}%</text>`;
            s += `<text class="viz__mono" x="${Math.min(R - 60, Math.max(L + 60, cx))}" y="${B + 22}" text-anchor="middle">|${m.strings[0]}⟩</text>`;
          }
        });
        s += `<text class="viz__text" x="${L}" y="${B + 40}">16 respostas mais medidas · probabilidade</text>`;
        paint(svg, s);
        byId('q-shots').textContent = fmt.format(Math.round(1024 * t));
      };

      const chips = (m, on) => {
        byId('q-chips').innerHTML = Array.from({ length: m.n }, (_, i) =>
          `<span class="lab__chip${on && m.strings[0][i] === '1' ? ' is-on' : ''}">A${String(i + 1).padStart(2, '0')}</span>`).join('');
      };
      const reset = (m) => {
        byId('q-space').textContent = fmt.format(Math.pow(2, m.n));
        byId('q-ratio').textContent = '…';
        byId('q-pick').textContent = '…';
        chips(m, false);
      };

      const run = () => {
        stop(); ran = true;
        const m = model();
        reset(m); setStatus(status, 'run'); btn.disabled = true;
        stop = play(2600, (t) => draw(m, t), () => {
          const k = m.strings[0].split('').filter((c) => c === '1').length;
          byId('q-ratio').textContent = dec(m.ratio, 2);
          byId('q-pick').textContent = `${k} de ${m.n}`;
          chips(m, true); setStatus(status, 'done'); btn.disabled = false;
        });
      };
      const preview = () => { stop(); btn.disabled = false; const m = model(); reset(m); draw(m, 0); setStatus(status, 'idle'); };

      [nIn, pIn].forEach((input) => {
        fillRange(input);
        input.addEventListener('input', () => { fillRange(input); byId(`${input.id}-out`).textContent = input.value; preview(); });
      });
      btn.addEventListener('click', run);
      preview();
      return { ensure: () => { if (!ran) run(); }, redraw: () => last && draw(...last) };
    })();

    /* --- Grover: a amplitude do alvo cresce a cada iteração; ótimo em ⌊π/4 · √N⌋ iterações --- */
    const groverDemo = (() => {
      const nIn = byId('g-n'), svg = byId('g-viz'), status = byId('g-status');
      const btn = $('[data-run="grover"]', lab);
      const MAX_BARS = 32;
      let stop = () => {}, ran = false;

      const params = () => {
        const N = Math.pow(2, +nIn.value);
        const bars = Math.min(MAX_BARS, N); // com N = 16 desenha 16 barras, não 32
        return {
          N, bars,
          target: Math.floor(bars * 0.6),
          k: Math.max(1, Math.floor((Math.PI / 4) * Math.sqrt(N))),
          theta: Math.asin(1 / Math.sqrt(N))
        };
      };

      let last = null;
      const draw = (g, j) => {
        last = [g, j];
        const at = Math.sin((2 * j + 1) * g.theta);                       // amplitude do alvo
        const ao = Math.cos((2 * j + 1) * g.theta) / Math.sqrt(g.N - 1);  // amplitude de cada um dos outros
        const mean = (at + (g.N - 1) * ao) / g.N;
        const slot = (R - L) / g.bars, bw = slot - Math.min(5, slot * 0.3);
        let s = gridLines([0.25, 0.5, 0.75, 1], (v) => dec(v, 2)) + axis();
        for (let i = 0; i < g.bars; i++) {
          const hot = i === g.target;
          const h = Math.max(1.5, (B - T) * Math.abs(hot ? at : ao)), x = L + i * slot + (slot - bw) / 2;
          s += `<rect class="viz__bar${hot ? ' viz__bar--hot' : ''}" x="${x.toFixed(1)}" y="${(B - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}"/>`;
          if (hot) s += `<text class="viz__text--hot" x="${x + bw / 2}" y="${B - h - 8}" text-anchor="middle">alvo</text>`;
        }
        const my = B - (B - T) * Math.abs(mean);
        s += `<line class="viz__mean" x1="${L}" x2="${R}" y1="${my.toFixed(1)}" y2="${my.toFixed(1)}"/>`;
        const shown = g.N > g.bars ? `${g.bars} de ${fmt.format(g.N)} estados exibidos` : `${fmt.format(g.N)} estados`;
        s += `<text class="viz__text" x="${L}" y="${B + 22}">${shown} · amplitude |α|</text>`;
        paint(svg, s);
        byId('g-iter').textContent = `${j} / ${g.k}`;
        byId('g-prob').textContent = `${dec(at * at * 100, 1)}%`;
      };

      const reset = (g) => {
        byId('g-classic').textContent = fmt.format(g.N / 2);
        byId('g-speed').textContent = '…';
      };

      const run = () => {
        stop(); ran = true;
        const g = params();
        reset(g); setStatus(status, 'run'); btn.disabled = true;
        let last = -1;
        stop = play(Math.min(3200, 500 + g.k * 260), (t) => {
          const j = Math.floor(t * g.k);
          if (j !== last) { last = j; draw(g, j); }
        }, () => {
          byId('g-speed').textContent = `${dec(g.N / 2 / g.k, 1)}×`;
          setStatus(status, 'done'); btn.disabled = false;
        });
      };
      const preview = () => { stop(); btn.disabled = false; const g = params(); reset(g); draw(g, 0); setStatus(status, 'idle'); };

      fillRange(nIn);
      nIn.addEventListener('input', () => {
        fillRange(nIn);
        const N = fmt.format(Math.pow(2, +nIn.value));
        byId('g-n-out').textContent = N;
        nIn.setAttribute('aria-valuetext', `${N} registros`);
        preview();
      });
      btn.addEventListener('click', run);
      preview();
      return { ensure: () => { if (!ran) run(); }, redraw: () => last && draw(...last) };
    })();

    /* --- VQE: o erro cai a cada iteração até um piso que depende da profundidade do ansatz --- */
    const vqe = (() => {
      const dIn = byId('v-d'), svg = byId('v-viz'), status = byId('v-status');
      const btn = $('[data-run="vqe"]', lab);
      const molButtons = $$('[data-mol]', lab);
      // e0: energia do estado fundamental (Hartree); slow/hard: moléculas maiores convergem mais devagar e param mais alto
      const MOL = {
        h2: { e0: -1.1373, slow: 1, hard: 1 },
        lih: { e0: -7.8823, slow: 1.4, hard: 1.3 },
        beh2: { e0: -15.5951, slow: 1.9, hard: 1.7 }
      };
      const ITERS = 60, CHEM = 0.0016; // precisão química: 1,6 mHa
      let mol = 'h2', stop = () => {}, ran = false;

      const series = () => {
        const m = MOL[mol], d = +dIn.value, r = rng(d * 17 + mol.length * 101);
        // com estes valores H₂ converge a partir da profundidade 2, LiH da 3 e BeH₂ só na 4
        const floor = (0.0042 / Math.pow(d, 1.6)) * m.hard, tau = (4 + 5 / d) * m.slow;
        const pts = [];
        for (let i = 0; i <= ITERS; i++) pts.push(floor + 0.32 * Math.exp(-i / tau) * (0.72 + 0.28 * Math.cos(i * 0.9)) * (0.9 + 0.2 * r()));
        return { m, pts };
      };
      // eixo y em escala log: 10⁰ no topo, 10⁻⁴ na base
      const yOf = (err) => T + (Math.min(4, Math.max(0, -Math.log10(err))) / 4) * (B - T);
      const xOf = (i) => L + (i / ITERS) * (R - L);
      const EXP = ['⁰', '⁻¹', '⁻²', '⁻³', '⁻⁴'];

      let last = null;
      const draw = (sr, t) => {
        last = [sr, t];
        const upto = Math.max(1, Math.round(t * ITERS));
        const cy = yOf(CHEM);
        let s = `<rect class="viz__band" x="${L}" y="${cy.toFixed(1)}" width="${R - L}" height="${(B - cy).toFixed(1)}"/>`;
        s += gridLines([1, 0.75, 0.5, 0.25, 0], (v) => `10${EXP[Math.round((1 - v) * 4)]}`);
        s += `<line class="viz__thresh" x1="${L}" x2="${R}" y1="${cy.toFixed(1)}" y2="${cy.toFixed(1)}"/>`;
        s += `<text class="viz__text viz__text--blue" x="${R - 4}" y="${(cy - 7).toFixed(1)}" text-anchor="end">precisão química · 1,6 mHa</text>`;
        s += axis();
        let d = '';
        for (let i = 0; i <= upto; i++) d += `${i ? 'L' : 'M'}${xOf(i).toFixed(1)} ${yOf(sr.pts[i]).toFixed(1)}`;
        s += `<path class="viz__curve" d="${d}"/>`;
        s += `<circle class="viz__dot" cx="${xOf(upto).toFixed(1)}" cy="${yOf(sr.pts[upto]).toFixed(1)}" r="4"/>`;
        s += `<text class="viz__text" x="${L}" y="${B + 22}">iterações (0–${ITERS}) · erro em Hartree</text>`;
        paint(svg, s);
        const err = sr.pts[upto];
        byId('v-e').textContent = `${dec(sr.m.e0 + err, 4)} Ha`;
        byId('v-err').textContent = `${dec(err * 1000, 2)} mHa`;
        byId('v-it').textContent = String(upto);
      };

      const run = () => {
        stop(); ran = true;
        const sr = series();
        setStatus(status, 'run'); btn.disabled = true; byId('v-ok').textContent = '…';
        stop = play(2800, (t) => draw(sr, t), () => {
          byId('v-ok').textContent = sr.pts[ITERS] < CHEM ? 'Convergiu' : 'Aumente o ansatz';
          setStatus(status, 'done'); btn.disabled = false;
        });
      };
      const preview = () => { stop(); btn.disabled = false; draw(series(), 0); byId('v-ok').textContent = '…'; setStatus(status, 'idle'); };

      molButtons.forEach((b) => b.addEventListener('click', () => {
        mol = b.dataset.mol;
        molButtons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        preview();
      }));
      fillRange(dIn);
      dIn.addEventListener('input', () => { fillRange(dIn); byId('v-d-out').textContent = dIn.value; preview(); });
      btn.addEventListener('click', run);
      preview();
      return { ensure: () => { if (!ran) run(); }, redraw: () => last && draw(...last) };
    })();

    /* --- Abas: setas ←/→, Home e End trocam de aba (padrão WAI-ARIA); cada aba roda sozinha na 1ª vez --- */
    const runners = { qaoa, grover: groverDemo, vqe };
    const tabs = $$('[role="tab"]', lab);
    const panels = $$('[role="tabpanel"]', lab);
    const select = (id, focus) => {
      tabs.forEach((t) => {
        const on = t.dataset.tab === id;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach((p) => { p.hidden = p.dataset.panel !== id; });
      runners[id].ensure();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t.dataset.tab));
      t.addEventListener('keydown', (e) => {
        const next = tabKey(e, i, tabs.length);
        if (next !== null) select(tabs[next].dataset.tab, true);
      });
    });

    // ao mudar a largura (girar o celular, redimensionar a janela) os gráficos são refeitos na nova medida
    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const before = W;
        measure();
        if (W !== before) Object.values(runners).forEach((r) => r.redraw());
      }, 150);
    });

    // a primeira simulação roda sozinha quando o laboratório entra na tela
    onceInView(lab, qaoa.ensure, 0.35);
  }

  /* === API: digitação no terminal (uma vez, ao entrar na tela) === */
  const code = $('#terminal-code');
  if (code) {
    const S = (t, c) => ({ t, c });
    const segments = [
      S('POST ', 't-method'), S('/v1/quantum/solve', 't-path'), S('\n'),
      S('{', 't-punc'), S('\n'),
      S('  "algorithm"', 't-key'), S(': ', 't-punc'), S('"QAOA"', 't-str'), S(',', 't-punc'), S('\n'),
      S('  "problem"', 't-key'), S(': ', 't-punc'), S('"portfolio_optimization"', 't-str'), S(',', 't-punc'), S('\n'),
      S('  "assets"', 't-key'), S(': ', 't-punc'), S('1200', 't-num'), S(',', 't-punc'), S('\n'),
      S('  "qubits"', 't-key'), S(': ', 't-punc'), S('64', 't-num'), S(',', 't-punc'), S('\n'),
      S('  "layers_p"', 't-key'), S(': ', 't-punc'), S('4', 't-num'), S('\n'),
      S('}', 't-punc'), S('\n\n'),
      { pause: 650 },
      S('→ 200 OK', 't-ok'), S(' · approx_ratio: 0.94 · latency: 340ms', 't-meta')
    ];

    const renderAll = () => {
      code.textContent = '';
      segments.forEach((s) => {
        if (s.pause) return;
        const span = document.createElement('span');
        if (s.c) span.className = s.c;
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

    if (reduceMotion) renderAll();
    else onceInView(code.closest('.terminal'), type, 0.4);
  }

  /* === Roadmap: a linha cresce e as etapas acendem quando a seção entra na tela === */
  const roadmap = $('#roadmap-track');
  onceInView(roadmap, () => {
    roadmap.classList.add('is-playing');
    // terminada a entrada, os atrasos escalonados saem e o hover dos cards responde na hora
    setTimeout(() => roadmap.classList.add('is-settled'), 2600);
  }, 0.3);

  /* === CTA: validação do formulário ===
     Sem backend neste projeto. Cada campo mostra o próprio erro em .field__error;
     o sucesso aparece em #form-success, dentro de uma região aria-live. */
  const form = $('#lead-form');
  if (form) {
    // Com JS a validação é nossa; sem JS o "required" do navegador continua valendo
    form.noValidate = true;

    // Provedores gratuitos: o formulário é para investidores, então pede e-mail corporativo
    const freeDomains = [
      'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.com.br', 'outlook.com', 'outlook.com.br',
      'live.com', 'msn.com', 'yahoo.com', 'yahoo.com.br', 'icloud.com', 'me.com', 'aol.com',
      'proton.me', 'protonmail.com', 'bol.com.br', 'uol.com.br', 'terra.com.br', 'ig.com.br'
    ];

    // Cada regra recebe o valor e devolve a mensagem de erro ("" = válido).
    // trim() faz um campo só com espaços contar como vazio.
    const rules = {
      nome: (v) => {
        const words = v.trim().split(/\s+/).filter(Boolean);
        if (words.length === 0) return 'Informe seu nome completo.';
        return words.length < 2 ? 'Informe nome e sobrenome.' : '';
      },
      email: (v) => {
        const email = v.trim().toLowerCase();
        if (!email) return 'Informe seu e-mail.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Informe um e-mail válido, como nome@empresa.com.';
        return freeDomains.includes(email.split('@')[1]) ? 'Use seu e-mail corporativo.' : '';
      },
      fundo: (v) => (v.trim().length >= 2 ? '' : 'Informe o fundo ou a empresa.'),
      ticket: (v) => (v ? '' : 'Selecione uma faixa de investimento.')
    };

    const inputs = $$('input, select', form);
    const feedback = $('.form-feedback', form);
    const hasError = (input) => input.closest('.field').classList.contains('has-error');

    const validateField = (input) => {
      const msg = rules[input.name] ? rules[input.name](input.value) : '';
      const field = input.closest('.field');
      field.classList.toggle('has-error', Boolean(msg));
      field.querySelector('.field__error').textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    };

    inputs.forEach((input) => {
      // Ao sair do campo: só acusa erro se a pessoa já digitou algo
      // (passar pelos campos com Tab não deve encher a tela de vermelho)
      input.addEventListener('blur', () => {
        if (input.value.trim() || hasError(input)) validateField(input);
      });
      // Enquanto corrige, o erro some assim que o valor fica válido
      input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', () => {
        if (hasError(input)) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const previous = $('#form-success');
      if (previous) previous.remove();

      const results = inputs.map(validateField);
      const firstInvalid = inputs[results.indexOf(false)];
      if (firstInvalid) { firstInvalid.focus(); return; }

      const msg = document.createElement('p');
      msg.id = 'form-success';
      msg.className = 'form-success';
      msg.textContent = 'Solicitação recebida. Nosso time de relações com investidores enviará o NDA e o acesso ao data room em até 48 horas.';
      feedback.appendChild(msg);
      form.reset();
      inputs.forEach((input) => input.removeAttribute('aria-invalid'));
    });
  }
})();
