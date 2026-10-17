// SynapseQ — animações e interações (vanilla JS, sem dependências)
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
