'use client';

// Demonstração ao vivo: abas QAOA, Grover e VQE com estado React (o único trecho interativo em React puro).
import { useEffect, useRef, useState } from 'react';
import QaoaPanel from './QaoaPanel.jsx';
import GroverPanel from './GroverPanel.jsx';
import VqePanel from './VqePanel.jsx';
import { useChartWidth } from './ui.jsx';

const TABS = [
  { id: 'qaoa', algo: 'QAOA', name: 'Portfólio', Panel: QaoaPanel },
  { id: 'grover', algo: 'Grover', name: 'Busca', Panel: GroverPanel },
  { id: 'vqe', algo: 'VQE', name: 'Molécula', Panel: VqePanel }
];

export default function Lab() {
  const hostRef = useRef(null);
  const tabRefs = useRef([]);
  const [active, setActive] = useState('qaoa');
  const [seen, setSeen] = useState(false);
  const W = useChartWidth(hostRef);

  // a primeira simulação roda sozinha quando o laboratório entra na tela
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setSeen(true); }
    }, { threshold: 0.35 });
    io.observe(hostRef.current);
    return () => io.disconnect();
  }, []);

  // setas ←/→, Home e End trocam de aba (padrão WAI-ARIA); só a aba ativa entra no Tab
  const onKeyDown = (e, i) => {
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const k = (next + TABS.length) % TABS.length;
    setActive(TABS[k].id);
    tabRefs.current[k].focus();
  };

  return (
    <div className="lab reveal" id="lab" ref={hostRef}>
      <div className="lab__top">
        <h2 id="lab-title" className="section-title section-title--blue"><span className="tl">Rode. Meça.</span> <span className="tl"><span className="kw">Veja convergir.</span></span></h2>
        <div className="lab__side">
          <p className="lab__note"><span className="live-dot" aria-hidden="true">●</span> Demonstração ao vivo · simulação ilustrativa, no seu navegador.</p>
          <div className="lab__tabs" role="tablist" aria-label="Algoritmos">
            {TABS.map((tab, i) => (
              <button
                key={tab.id} ref={(el) => { tabRefs.current[i] = el; }}
                className="lab__tab" role="tab" type="button" id={`tab-${tab.id}`} data-tab={tab.id}
                aria-selected={active === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1}
                onClick={() => setActive(tab.id)} onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="lab__tab-algo">{tab.algo}</span> {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* a demonstração depende de JS; sem ele o CSS esconde abas e painéis e fica só este aviso */}
      <noscript><p className="demo__nojs">Ative o JavaScript para rodar as simulações de QAOA, Grover e VQE.</p></noscript>
      {/* os três painéis ficam montados (cada um guarda seus controles); só o ativo aparece */}
      {TABS.map(({ id, Panel }) => (
        <Panel key={id} active={active === id} autoRun={seen && active === id} W={W} />
      ))}
    </div>
  );
}
