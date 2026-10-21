'use client';

import { useEffect, useRef } from 'react';
import useLive from './useLive';
import { finePointer, smallScreen } from '@/lib/media';
import { fitCanvas, monoFont } from '@/lib/canvas';

// Esfera de Bloch: o estado de um qubit é um ponto na superfície (θ, φ). Aqui ele precessiona como
// sob um campo magnético e oscila entre |0⟩ e |1⟩ (Rabi), deixando um rastro. A câmera inclina com o
// ponteiro. Canvas 2D com projeção feita à mão: sem biblioteca 3D, poucos milhares de operações por quadro.
const TAU = Math.PI * 2;

function project(x, y, z, yaw, tilt) {
  // gira em torno do eixo vertical (yaw) e depois inclina (tilt); z do Bloch aponta para cima na tela
  const cx = Math.cos(yaw), sx = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
  const x1 = x * cx - y * sx, y1 = x * sx + y * cx;
  return { x: x1, y: -(z * ct - y1 * st), d: y1 * ct + z * st };
}

export default function BlochSphere() {
  const [ref, on, reduced] = useLive(0.2);
  const canvasRef = useRef(null);
  const ampRef = useRef(null);
  const pRef = useRef(null);
  const st = useRef({ t: 3.2, yaw: -0.6, tilt: 0.32, ty: -0.6, tt: 0.32, trail: [], raf: 0, last: 0 });

  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d'), s = st.current;
    const small = smallScreen();
    const MONO = monoFont(canvas);
    let W = 0, H = 0;
    const resize = () => {
      const fit = fitCanvas(canvas);
      W = fit.w; H = fit.h;
      ctx.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0); draw();
    };
    const state = (t) => ({ th: Math.PI * (0.5 - 0.38 * Math.cos(t * 0.45)), ph: t * 0.9 });
    const draw = () => {
      if (!W) return;
      const R = Math.min(W, H) * 0.4, ox = W / 2, oy = H / 2;
      ctx.clearRect(0, 0, W, H);
      const P = (x, y, z) => { const p = project(x, y, z, s.yaw, s.tilt); return { x: ox + p.x * R, y: oy + p.y * R, d: p.d }; };
      // malha: paralelos e meridianos em pontos, mais apagados atrás
      const n = small ? 28 : 44;
      for (let k = 1; k < 6; k++) {
        const th = (k / 6) * Math.PI;
        for (let i = 0; i < n; i++) { const ph = (i / n) * TAU; const p = P(Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)); ctx.fillStyle = `rgba(201, 216, 255, ${p.d > 0 ? 0.42 : 0.12})`; ctx.fillRect(p.x - 0.8, p.y - 0.8, 1.6, 1.6); }
      }
      for (let m = 0; m < 6; m++) {
        const ph = (m / 6) * Math.PI;
        for (let i = 0; i < n; i++) { const th = (i / n) * TAU; const p = P(Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)); ctx.fillStyle = `rgba(139, 112, 255, ${p.d > 0 ? 0.36 : 0.1})`; ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.4, 1.4); }
      }
      // eixos e rótulos dos estados da base
      const axis = (a, b, label, lb) => {
        const p = P(...a), q = P(...b);
        ctx.strokeStyle = 'rgba(238, 243, 255, 0.22)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.setLineDash([]);
        ctx.font = '500 12px ' + MONO; ctx.fillStyle = 'rgba(238, 243, 255, 0.7)'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const lp = P(...a.map((v) => v * 1.18)), lq = P(...b.map((v) => v * 1.18));
        ctx.fillText(label, lp.x, lp.y); ctx.fillText(lb, lq.x, lq.y);
      };
      axis([0, 0, 1], [0, 0, -1], '|0⟩', '|1⟩');
      axis([1, 0, 0], [-1, 0, 0], '|+⟩', '|−⟩');
      axis([0, 1, 0], [0, -1, 0], '|i⟩', '|−i⟩');
      // vetor de estado + rastro
      const { th, ph } = state(s.t);
      const v = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
      s.trail.push(v); if (s.trail.length > 90) s.trail.shift();
      s.trail.forEach((q, i) => { const p = P(...q); ctx.fillStyle = `rgba(59, 130, 246, ${(i / s.trail.length) * 0.8})`; ctx.fillRect(p.x - 1.2, p.y - 1.2, 2.4, 2.4); });
      const o = P(0, 0, 0), tip = P(...v);
      const g = ctx.createLinearGradient(o.x, o.y, tip.x, tip.y); g.addColorStop(0, 'rgba(59, 130, 246, 0.2)'); g.addColorStop(1, '#C9D8FF');
      ctx.strokeStyle = g; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(tip.x, tip.y); ctx.stroke();
      ctx.fillStyle = '#C9D8FF'; ctx.beginPath(); ctx.arc(tip.x, tip.y, 5, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(201, 216, 255, 0.35)'; ctx.beginPath(); ctx.arc(tip.x, tip.y, 10, 0, TAU); ctx.stroke();
      // leitura: amplitudes e probabilidades
      const a = Math.cos(th / 2), b = Math.sin(th / 2), f = (x) => x.toFixed(2).replace('.', ',');
      if (ampRef.current) ampRef.current.textContent = `|ψ⟩ = ${f(a)}|0⟩ + ${f(b)}·e^{i${f(ph % TAU)}}|1⟩`;
      if (pRef.current) pRef.current.style.setProperty('--p0', (a * a).toFixed(3));
    };
    const tick = (now) => {
      s.raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - (s.last || now)) / 1000); s.last = now;
      s.t += dt; s.yaw += (s.ty - s.yaw) * 0.06; s.tilt += (s.tt - s.tilt) * 0.06; s.ty += dt * 0.08;
      draw();
    };
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      s.ty = -0.6 + ((e.clientX - r.left) / r.width - 0.5) * 1.6 + s.t * 0.08;
      s.tt = 0.32 + ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    };
    if (finePointer()) window.addEventListener('pointermove', move, { passive: true });
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    if (on) { s.last = 0; s.raf = requestAnimationFrame(tick); } else draw();
    return () => { cancelAnimationFrame(s.raf); s.raf = 0; ro.disconnect(); window.removeEventListener('pointermove', move); };
  }, [on]);

  return (
    <figure className="bloch" ref={ref}>
      <canvas ref={canvasRef} className="bloch__canvas" aria-hidden="true" />
      <figcaption className="bloch__read">
        <span className="bloch__tag">Esfera de Bloch · 1 qubit{reduced ? ' (parada)' : ''}</span>
        <span className="bloch__amp" ref={ampRef} aria-hidden="true">|ψ⟩ = 0,71|0⟩ + 0,71|1⟩</span>
        <span className="bloch__p" ref={pRef} aria-hidden="true"><i /><span>P(0)</span><span>P(1)</span></span>
        <span className="sr-only">Um qubit desenhado como um ponto numa esfera: no polo de cima é 0, no de baixo é 1; entre os dois, uma superposição.</span>
      </figcaption>
    </figure>
  );
}
