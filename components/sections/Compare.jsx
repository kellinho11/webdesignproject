// Seção: Compare
export default function Compare() {
  return (
    <>
  <section className="section compare" id="tecnologia" aria-labelledby="compare-title">
    <div className="leak" style={{ '--lx': '30%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">H</span><span className="qwire__name">Hadamard · superposição</span><span className="qwire__line"></span></div></div>
    <div className="bg-interference" aria-hidden="true"></div>
    <div className="container" id="comparativo">{/* id antigo (até a v1.3.0), mantido como apelido para links já compartilhados */}
      <div className="cmp2" id="cmp2">
        <div className="cmp2__head reveal">
          <p className="cmp2__tag">Por que SynapseQ · O(2ⁿ) contra O(√2ⁿ)</p>
          <h2 id="compare-title" className="section-title section-title--blue"><span className="tl">Quanto maior o problema,</span> <span className="tl">maior a <span className="kw">vantagem</span>.</span></h2>
        </div>
        <div className="cmp2__stage reveal" style={{ '--rd': '80ms' }}>
          <div className="cmp2__plot">
          <svg className="chart is-drawn" viewBox="0 0 400 260" aria-hidden="true">
            <g className="chart__grid">
              <line x1="40" y1="20" x2="40" y2="220" />
              <line x1="40" y1="220" x2="384" y2="220" />
              <line x1="40" y1="120" x2="384" y2="120" className="chart__gridline" />
              <line x1="40" y1="70" x2="384" y2="70" className="chart__gridline" />
              <line x1="40" y1="170" x2="384" y2="170" className="chart__gridline" />
            </g>
            <text className="chart__axis" x="34" y="124" textAnchor="end">tempo</text>{' '}
            <text className="chart__axis" x="384" y="240" textAnchor="end">variáveis</text>
            {/* curvas já desenhadas no HTML (versão simplificada, para quem está sem JS); o script recalcula */}
            <path className="chart__aura" id="curve-aura" d="M40.0 220.0 L51.3 220.0 L62.7 219.9 L74.0 219.8 L85.3 219.7 L96.7 219.6 L108.0 219.4 L119.3 219.2 L130.7 219.0 L142.0 218.7 L153.3 218.3 L164.7 217.8 L176.0 217.1 L187.3 216.3 L198.7 215.3 L210.0 214.1 L221.3 212.5 L232.7 210.5 L244.0 208.0 L255.3 204.8 L266.7 200.8 L278.0 195.8 L289.3 189.5 L300.7 181.5 L312.0 171.4 L323.3 158.7 L334.7 142.7 L346.0 122.6 L357.3 97.2 L368.7 65.3 L380.0 25.0" />
            <path className="chart__curve chart__curve--exp" id="curve-exp" pathLength="1" d="M40.0 220.0 L51.3 220.0 L62.7 219.9 L74.0 219.8 L85.3 219.7 L96.7 219.6 L108.0 219.4 L119.3 219.2 L130.7 219.0 L142.0 218.7 L153.3 218.3 L164.7 217.8 L176.0 217.1 L187.3 216.3 L198.7 215.3 L210.0 214.1 L221.3 212.5 L232.7 210.5 L244.0 208.0 L255.3 204.8 L266.7 200.8 L278.0 195.8 L289.3 189.5 L300.7 181.5 L312.0 171.4 L323.3 158.7 L334.7 142.7 L346.0 122.6 L357.3 97.2 L368.7 65.3 L380.0 25.0" />
            <path className="chart__curve chart__curve--sqrt" id="curve-sqrt" pathLength="1" d="M40.0 220.0 L51.3 214.5 L62.7 212.3 L74.0 210.5 L85.3 209.0 L96.7 207.8 L108.0 206.6 L119.3 205.5 L130.7 204.5 L142.0 203.6 L153.3 202.7 L164.7 201.8 L176.0 201.0 L187.3 200.3 L198.7 199.5 L210.0 198.8 L221.3 198.1 L232.7 197.4 L244.0 196.8 L255.3 196.1 L266.7 195.5 L278.0 194.9 L289.3 194.3 L300.7 193.7 L312.0 193.2 L323.3 192.6 L334.7 192.1 L346.0 191.5 L357.3 191.0 L368.7 190.5 L380.0 190.0" />
            <text className="chart__label chart__label--exp" x="336" y="128" textAnchor="end">Clássico · O(2ⁿ)</text>{' '}
            <text className="chart__label chart__label--sqrt" x="378" y="178" textAnchor="end">Quântico · O(√2ⁿ)</text>
            <line className="chart__marker" id="cmp-marker" x1="210" y1="20" x2="210" y2="220" />
            <circle className="chart__dot chart__dot--exp" id="dot-exp" cx="210" cy="214.1" r="4" />
            <circle className="chart__dot chart__dot--sqrt" id="dot-sqrt" cx="210" cy="198.8" r="4" />
            <text className="chart__axis chart__nlbl" id="cmp-nlbl" x="210" y="240" textAnchor="middle">n = 30</text>{' '}
            <text className="chart__big" id="cmp-big" x="200" y="62" textAnchor="end">306×</text>{' '}
            <text className="chart__small" id="cmp-small" x="200" y="80" textAnchor="end">mais rápido</text>{' '}
          </svg>{' '}
          
          <label className="cmp2__slider"><span className="sr-only">Tamanho do problema</span><input type="range" id="cmp-n" min="10" max="60" step="1" defaultValue="30" className="is-hint-range" /></label>{' '}
          <span className="cmp2__handle" aria-hidden="true"><output id="cmp-n-out">30 variáveis</output><span className="cmp__drag" id="cmp-drag">← arraste →</span></span>
          </div>
          <div className="cmp2__float cmp2__float--c"><span className="cmp2__ftime" id="cmp-tc">30 segundos</span></div>
          <div className="cmp2__float cmp2__float--q"><span className="cmp2__ftime" id="cmp-tq">98 milissegundos</span></div>
        </div>
        <ul className="cmp2__legend reveal" aria-label="Legenda do gráfico">
          <li className="lg lg--c"><span className="lg__key" aria-hidden="true"></span><span className="lg__name">IA clássica</span><span className="lg__meta">um caminho por vez · O(2ⁿ)</span></li>
          <li className="lg lg--q"><span className="lg__key" aria-hidden="true"></span><span className="lg__name">SynapseQ</span><span className="lg__meta"><span className="term" tabIndex="0" data-def="Técnica quântica que encontra a melhor solução deixando o sistema se acomodar no estado de menor energia, como uma bola rolando até o fundo do vale.">Quantum Annealing</span> · O(√2ⁿ)</span></li>
          <li className="lg lg--n"><span className="lg__key" aria-hidden="true"></span><span className="lg__name">Tamanho do problema</span><span className="lg__meta">arraste sobre o gráfico</span></li>
        </ul>
        <p className="cmp__verdict" id="cmp-verdict" aria-live="polite"></p>
      </div>
      <a className="next-hint next-hint--glyph reveal" href="#mercado" aria-label="A seguir: Isso já é real ou ficção?"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">CX</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
