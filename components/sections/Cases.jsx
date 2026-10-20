// Seção: Cases
export default function Cases() {
  return (
    <>
  <section className="section cases" id="casos-de-uso" aria-labelledby="cases-title">
    <div className="leak" style={{ '--lx': '34%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">Rz</span><span className="qwire__name">Rz(θ) · rotação de fase</span><span className="qwire__line"></span></div></div>
    <div className="container">
      <div className="pick">
        <div className="pick__head reveal">
          <p className="pick__tag">Casos de uso</p>
          <h2 id="cases-title" className="section-title section-title--violet"><span className="tl">Qual desafio</span> <span className="tl">é o <span className="kw">seu</span>?</span></h2>
          <div className="pick__choices" role="tablist" aria-label="Desafios">
            <span className="pick__arrow" aria-hidden="true">→</span>{' '}
            <button type="button" className="pick__choice" role="tab" data-case="qaoa" aria-selected="true"><span className="pick__algo">QAOA</span><span className="pick__label">Montar a melhor carteira de investimentos</span></button>{' '}
            <button type="button" className="pick__choice" role="tab" data-case="vqe" aria-selected="false"><span className="pick__algo">VQE</span><span className="pick__label">Descobrir uma molécula para um novo remédio</span></button>{' '}
            <button type="button" className="pick__choice" role="tab" data-case="grover" aria-selected="false"><span className="pick__algo">Grover</span><span className="pick__label">Achar um registro entre milhões</span></button>
          </div>
        </div>

        <div className="pick__panel reveal" style={{ '--rd': '240ms' }} role="tabpanel" data-case-panel="qaoa">
          <div className="pick__visual">
            <svg viewBox="0 0 300 140" aria-hidden="true">
              <g className="graph__edges">
                <line x1="40" y1="70" x2="100" y2="30" /><line x1="40" y1="70" x2="110" y2="108" />
                <line x1="100" y1="30" x2="110" y2="108" /><line x1="100" y1="30" x2="170" y2="62" />
                <line x1="110" y1="108" x2="170" y2="62" /><line x1="110" y1="108" x2="236" y2="112" />
                <line x1="236" y1="112" x2="268" y2="66" /><line x1="230" y1="28" x2="268" y2="66" />
                <line x1="170" y1="62" x2="236" y2="112" />
              </g>
              <line className="graph__edge--hot" x1="170" y1="62" x2="230" y2="28" />
              <g className="graph__nodes">
                <circle cx="40" cy="70" r="6" /><circle cx="100" cy="30" r="5" /><circle cx="110" cy="108" r="7" />
                <circle cx="236" cy="112" r="5" /><circle cx="268" cy="66" r="6" />
              </g>
              <circle className="graph__node--hot" cx="170" cy="62" r="8" />
              <circle className="graph__node--hot" cx="230" cy="28" r="6" />
            </svg>
            <p className="pick__caption">Cada ponto é um ativo; as linhas, como eles se movem juntos.</p>
          </div>
          <div className="pick__content">
            <p className="case__algo"><span className="term" tabIndex="0" data-def="Algoritmo quântico para otimização: procura a melhor combinação ajustando o circuito em camadas.">QAOA</span> · Otimização de portfólio</p>
            <h3 className="pick__title">Menos risco, em tempo real.</h3>
            <p className="pick__fact"><span>Na prática</span>1.200 ativos → 64 qubits · latência 340 ms</p>
            <div className="scale lab__field" data-scale="qaoa">
              <div className="scale__ctl"><label htmlFor="sc-qaoa">Ativos na carteira</label><output id="sc-qaoa-out" htmlFor="sc-qaoa">…</output></div>
              <input type="range" className="scale__input" id="sc-qaoa" min="10" max="100" step="1" defaultValue="100" />
              <div className="scale__ruler" aria-hidden="true">
                <div className="scale__pins"></div>
                <div className="scale__track scale__track--c"><i></i></div>
                <div className="scale__track scale__track--q"><i></i></div>
                <div className="scale__axis"></div>
              </div>
              <dl className="scale__read"><div className="is-c"><dt>Clássico</dt><dd data-c>…</dd></div><div className="is-q"><dt>SynapseQ</dt><dd data-q>…</dd></div></dl>
            </div>
            <button type="button" className="btn-primary pick__demo" data-demo="qaoa">Testar na demo <span aria-hidden="true">→</span></button>
          </div>
        </div>

        <div className="pick__panel" role="tabpanel" data-case-panel="vqe" hidden>
          <div className="pick__visual">
            <svg viewBox="0 0 300 140" aria-hidden="true">
              <g className="mol__bonds">
                <line x1="70" y1="72" x2="112" y2="44" /><line x1="70" y1="72" x2="112" y2="104" />
                <line x1="70" y1="72" x2="28" y2="46" /><line x1="70" y1="72" x2="28" y2="102" />
                <line x1="112" y1="44" x2="112" y2="104" />
              </g>
              <circle className="mol__atom mol__atom--core" cx="70" cy="72" r="12" />
              <circle className="mol__atom" cx="112" cy="44" r="8" /><circle className="mol__atom" cx="112" cy="104" r="8" />
              <circle className="mol__atom mol__atom--sm" cx="28" cy="46" r="6" /><circle className="mol__atom mol__atom--sm" cx="28" cy="102" r="6" />
              <line className="energy__axis" x1="158" y1="20" x2="158" y2="120" />
              <line className="energy__axis" x1="158" y1="120" x2="290" y2="120" />
              <line className="energy__target" x1="158" y1="92" x2="290" y2="92" />
              <path className="energy__curve" d="M162 26 C 180 120, 196 70, 212 98 S 238 86, 252 93 S 276 91, 290 92" />
              <text className="energy__label" x="288" y="86" textAnchor="end">E₀</text>{' '}
            </svg>
            <p className="pick__caption">A energia da molécula cai até o valor real (E₀).</p>
          </div>
          <div className="pick__content">
            <p className="case__algo"><span className="term" tabIndex="0" data-def="Algoritmo híbrido que calcula a energia de moléculas: o quântico mede, o clássico ajusta, repetidamente.">VQE</span> · Descoberta de fármacos</p>
            <h3 className="pick__title">Anos de laboratório em minutos de simulação.</h3>
            <p className="pick__fact"><span>Na prática</span>H₂ · LiH · BeH₂ → erro abaixo de 1,6 mHa</p>
            <div className="scale lab__field" data-scale="vqe">
              <div className="scale__ctl"><label htmlFor="sc-vqe">Spin-orbitais da molécula</label><output id="sc-vqe-out" htmlFor="sc-vqe">…</output></div>
              <input type="range" className="scale__input" id="sc-vqe" min="4" max="160" step="1" defaultValue="160" />
              <div className="scale__ruler" aria-hidden="true">
                <div className="scale__pins"></div>
                <div className="scale__track scale__track--c"><i></i></div>
                <div className="scale__track scale__track--q"><i></i></div>
                <div className="scale__axis"></div>
              </div>
              <dl className="scale__read"><div className="is-c"><dt>Clássico</dt><dd data-c>…</dd></div><div className="is-q"><dt>SynapseQ</dt><dd data-q>…</dd></div></dl>
            </div>
            <button type="button" className="btn-primary pick__demo" data-demo="vqe">Testar na demo <span aria-hidden="true">→</span></button>
          </div>
        </div>

        <div className="pick__panel" role="tabpanel" data-case-panel="grover" hidden>
          <div className="pick__visual">
            <div className="grover" id="grover" aria-hidden="true"></div>
            <p className="pick__caption">60 registros; a amplificação faz o certo se destacar.</p>
          </div>
          <div className="pick__content">
            <p className="case__algo"><span className="term" tabIndex="0" data-def="Algoritmo de busca quântica: encontra um item em N possibilidades com cerca de √N tentativas.">Grover</span> · Busca em dados</p>
            <h3 className="pick__title">Sem varrer a base inteira.</h3>
            <p className="pick__fact"><span>Na prática</span>1 milhão de registros → ≈ 785 consultas (π/4 · √N)</p>
            <div className="scale lab__field" data-scale="grover">
              <div className="scale__ctl"><label htmlFor="sc-grover">Registros na base</label><output id="sc-grover-out" htmlFor="sc-grover">…</output></div>
              <input type="range" className="scale__input" id="sc-grover" min="2" max="9" step="0.1" defaultValue="6" />
              <div className="scale__ruler" aria-hidden="true">
                <div className="scale__pins"></div>
                <div className="scale__track scale__track--c"><i></i></div>
                <div className="scale__track scale__track--q"><i></i></div>
                <div className="scale__axis"></div>
              </div>
              <dl className="scale__read"><div className="is-c"><dt>Clássico</dt><dd data-c>…</dd></div><div className="is-q"><dt>SynapseQ</dt><dd data-q>…</dd></div></dl>
            </div>
            <button type="button" className="btn-primary pick__demo" data-demo="grover">Testar na demo <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </div>
      <a className="next-hint next-hint--glyph reveal" href="#demo" aria-label="A seguir: Rode o algoritmo você mesmo"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">U</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
