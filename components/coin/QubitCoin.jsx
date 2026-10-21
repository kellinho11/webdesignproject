'use client';

import { useRef, useState } from 'react';

// A única peça interativa do site: a moeda como bit e como qubit.
// Parada, ela é um bit (0 ou 1). Girando, é um qubit: as duas faces ao mesmo tempo.
// Parar é medir: a rotação desacelera até uma face sorteada, e o estado colapsa.
const READ = {
  bit: (v) => <>bit = <b>{v}</b></>,
  spin: () => <>qubit = <b>0 e 1</b> ao mesmo tempo · |ψ⟩ = 0,71|0⟩ + 0,71|1⟩</>,
  measured: (v) => <>medida: <b>{v}</b> · a superposição colapsou</>,
};

// ângulo atual do rotateY a partir da matriz calculada pelo navegador (no meio da animação CSS)
function currentAngle(el) {
  const m = new DOMMatrix(getComputedStyle(el).transform);
  return (Math.atan2(-m.m13, m.m11) * 180) / Math.PI;
}

export default function QubitCoin() {
  const coinRef = useRef(null);
  const [mode, setMode] = useState('bit');
  const [value, setValue] = useState(0);
  const [measures, setMeasures] = useState([0, 0]);

  const spin = () => {
    const el = coinRef.current;
    el.style.transition = 'none';
    el.style.transform = '';
    setMode('spin');
  };
  const measure = () => {
    const el = coinRef.current;
    const result = Math.random() < 0.5 ? 0 : 1;
    const from = currentAngle(el);
    // congela onde a animação está e desacelera até a face sorteada, sempre girando para frente
    el.style.transition = 'none';
    el.style.transform = `rotateY(${from}deg)`;
    const base = from + 360;
    const target = base + (((result * 180 - base) % 360) + 360) % 360;
    // sem transição (movimento reduzido) o transitionend nunca chega: a medição é imediata
    setMode(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'measured' : 'stopping');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = '';
      el.style.transform = `rotateY(${target}deg)`;
    }));
    setValue(result);
    // o resultado vira o estado do fio: a porta M, nos Investidores, mostra essa mesma medição
    window.dispatchEvent(new CustomEvent('sq:measure', { detail: { value: result } }));
    setMeasures(([a, b]) => (result ? [a, b + 1] : [a + 1, b]));
  };
  const onEnd = (e) => { if (e.propertyName === 'transform' && mode === 'stopping') setMode('measured'); };

  const spinning = mode === 'spin';
  const total = measures[0] + measures[1];
  return (
    <div className="qcoin" data-mode={mode}>
      <div className="qcoin__stage">
        <div ref={coinRef} className={`coin3d${spinning ? ' is-spinning' : ''}`} id="jr-coin" onTransitionEnd={onEnd}>
          <span className="coin3d__face coin3d__face--front">0</span>
          <span className="coin3d__face coin3d__face--back">1</span>
        </div>
        <span className="qcoin__shadow" aria-hidden="true" />
      </div>
      <p className="qcoin__read" id="jr-coin-read" aria-live="polite">
        {spinning ? READ.spin() : mode === 'bit' ? READ.bit(value) : READ.measured(value)}
      </p>
      <button type="button" className="btn-primary qcoin__btn" onClick={spinning ? measure : spin} disabled={mode === 'stopping'}>
        {spinning ? 'Parar e medir' : 'Girar a moeda'}
      </button>
      {total > 0 && <p className="qcoin__note">Esse é o seu qubit. Ele segue pelo circuito <span aria-hidden="true">↓</span></p>}
      <p className="qcoin__tally" aria-label={`Medições: ${measures[0]} vezes 0, ${measures[1]} vezes 1`}>
        <span>|0⟩ <b>{measures[0]}</b></span>
        <span className="qcoin__split" aria-hidden="true"><i style={{ transform: `scaleX(${total ? measures[0] / total : 0.5})` }} /></span>
        <span><b>{measures[1]}</b> |1⟩</span>
      </p>
    </div>
  );
}
