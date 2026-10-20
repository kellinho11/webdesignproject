// Seção: Roadmap
export default function Roadmap() {
  return (
    <>
  <section className="section roadmap" id="roadmap" aria-labelledby="roadmap-title">
    <div className="leak" style={{ '--lx': '70%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">T</span><span className="qwire__name">T · fase π/4</span><span className="qwire__line"></span></div></div>
    <div className="container">
      <h2 id="roadmap-title" className="section-title section-title--violet rm-title reveal"><span className="tl">De protótipo</span> <span className="tl">a <span className="sr-only">produção.</span><span className="rm-arrow" aria-hidden="true">↓</span></span></h2>

      <div className="rm-track" id="rm-track">
        <span className="rm-word" aria-hidden="true">produção.</span>{' '}
        <span className="rm-tag" aria-hidden="true">Onde estamos</span>{' '}
        <svg className="rm-thread" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="rm-thread-g" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#6B46FF" stopOpacity=".55" /><stop offset=".55" stopColor="#3B82F6" stopOpacity=".28" /><stop offset="1" stopColor="#3B82F6" stopOpacity="0" /></linearGradient></defs>
          <path d="M400 0 C 400 300, 0 260, 0 600" pathLength="1" stroke="url(#rm-thread-g)" />
        </svg>{' '}
        <svg className="rm-line rm-line--h" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="rm-grad-h" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3B82F6" />
              <stop offset="0.5" stopColor="#6B46FF" />
              <stop offset="0.5" stopColor="rgba(244,245,255,0.22)" />
              <stop offset="1" stopColor="rgba(244,245,255,0.22)" />
            </linearGradient>
          </defs>
          <path className="rm-path" d="M100 2 H900" pathLength="1" stroke="url(#rm-grad-h)" />
        </svg>{' '}
        <svg className="rm-line rm-line--v" viewBox="0 0 4 1000" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="rm-grad-v" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#3B82F6" />
              <stop offset="0.5" stopColor="#6B46FF" />
              <stop offset="0.5" stopColor="rgba(244,245,255,0.22)" />
              <stop offset="1" stopColor="rgba(244,245,255,0.22)" />
            </linearGradient>
          </defs>
          <path className="rm-path" d="M2 0 V1000" pathLength="1" stroke="url(#rm-grad-v)" />
        </svg>

        <ol className="rm-list">
          <li className="rm-item rm-item--up rm-item--done" data-i="0">
            <span className="rm-dot" aria-hidden="true"></span>
            <article className="rm-card">
              <p className="rm-date">Q1 2026</p>
              <p className="rm-desc">Protótipo QAOA validado em simulador de 14 qubits</p>
              <span className="rm-badge rm-badge--done"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>Concluído</span>
            </article>
          </li>
          <li className="rm-item rm-item--down rm-item--done" data-i="1">
            <span className="rm-dot" aria-hidden="true"></span>
            <article className="rm-card">
              <p className="rm-date">Q3 2026</p>
              <p className="rm-desc">Piloto com fundo quant para otimização de portfólio real</p>
              <span className="rm-badge rm-badge--done"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>Concluído</span>
            </article>
          </li>
          <li className="rm-item rm-item--up rm-item--now" data-i="2">
            <span className="rm-dot" aria-hidden="true"></span>
            <article className="rm-card">
              <p className="rm-date">Q1 2027</p>
              <p className="rm-desc">Acesso unificado a hardware quântico de terceiros via API</p>
              <span className="rm-badge rm-badge--now"><span className="live-dot" aria-hidden="true">●</span>Em andamento</span>
            </article>
          </li>
          <li className="rm-item rm-item--down rm-item--planned" data-i="3">
            <span className="rm-dot" aria-hidden="true"></span>
            <article className="rm-card">
              <p className="rm-date">Q3 2027</p>
              <p className="rm-desc">Primeiros clientes pagantes em produção</p>
              <span className="rm-badge rm-badge--planned">Planejado</span>
            </article>
          </li>
          <li className="rm-item rm-item--up rm-item--planned" data-i="4">
            <span className="rm-dot" aria-hidden="true"></span>
            <article className="rm-card">
              <p className="rm-date">2028</p>
              <p className="rm-desc">Expansão para simulação molecular (VQE) em escala</p>
              <span className="rm-badge rm-badge--planned">Planejado</span>
            </article>
          </li>
        </ol>
      </div>
      <a className="next-hint next-hint--glyph reveal" href="#investidores" aria-label="A seguir: Faça parte da próxima etapa"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">M</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
