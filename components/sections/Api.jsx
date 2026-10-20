// Seção: Api

export default function Api() {
  return (
    <>
  <section className="section api" id="quantum-engineering" aria-labelledby="api-title">
    <div className="leak" style={{ '--lx': '32%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">SW</span><span className="qwire__name">SWAP · roteamento no hardware</span><span className="qwire__line"></span></div></div>
    <div className="container">
      <div className="api__grid">
        <div className="api__copy">
          <p className="api__tag reveal">Quantum Engineering · POST /v1/quantum/solve</p>
          <div className="reveal" style={{ '--rd': '60ms' }}><h2 id="api-title" className="section-title section-title--blue"><span className="tl">Um endpoint.</span> <span className="tl"><span className="kw">Toda a física</span> por trás.</span></h2></div>
          <div className="api__features">
          <article className="feature reveal" style={{ '--rd': '80ms' }} data-f="1" tabIndex="0">
            <p className="feature__index">01</p>
            <div>
              <h3 className="feature__title"><svg className="feature__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13.5" r="7.5" /><path d="M12 13.5V9.5M9.5 2.5h5M18.5 6l1.5-1.5" /></svg>Latência quase-zero</h3>
              <p className="feature__text">A <span className="term" tabIndex="0" data-def="Quantum Processing Unit: o chip quântico, equivalente quântico da CPU.">QPU</span> resolve só a parte difícil.</p>
            </div>
          </article>
          <article className="feature reveal" style={{ '--rd': '160ms' }} data-f="2" tabIndex="0">
            <p className="feature__index">02</p>
            <div>
              <h3 className="feature__title"><svg className="feature__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><circle cx="9" cy="15.5" r=".9" /><circle cx="12" cy="15.5" r=".9" /><circle cx="15" cy="15.5" r=".9" /></svg>Segurança pós-quântica</h3>
              <p className="feature__text">Resiste a computadores quânticos.</p>
            </div>
          </article>
          <article className="feature reveal" style={{ '--rd': '240ms' }} data-f="3" tabIndex="0">
            <p className="feature__index">03</p>
            <div>
              <h3 className="feature__title"><svg className="feature__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13.5 4.5l-3 15" /></svg>API-first</h3>
              <p className="feature__text">Poucas linhas. Zero física.</p>
            </div>
          </article>
          </div>
        </div>
        <div className="terminal reveal" aria-label="Exemplo de requisição à API SynapseQ">
          <div className="terminal__bar">
            <span className="terminal__dots" aria-hidden="true"><i></i><i></i><i></i></span>{' '}
            <span className="terminal__title">synapseq · api.synapseq.ai</span>{' '}
            <button type="button" className="terminal__send is-hint" id="terminal-send">Enviar requisição ▶</button>
          </div>
          <pre className="terminal__body"><code id="terminal-code"></code><span className="terminal__cursor" aria-hidden="true"></span></pre>
        </div>
      </div>
      <a className="next-hint next-hint--glyph reveal" href="#roadmap" aria-label="A seguir: Onde a SynapseQ está hoje"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">T</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
