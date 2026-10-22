// Seção: SiteFooter
export default function SiteFooter() {
  return (
    <>
<footer className="site-footer" id="rodape">
  <div className="container footer__inner">
    <div className="footer__brand">
      <a href="#topo" className="brand" aria-label="SynapseQ · início">{' '}
        <svg className="logo" viewBox="-20 -20 40 40" width="28" height="28" aria-hidden="true">
          <g className="logo__orbits" fill="none" stroke="url(#logo-grad)" strokeWidth="1.6">
            <ellipse rx="17" ry="6.5" transform="rotate(20)" />
            <ellipse rx="17" ry="6.5" transform="rotate(-20)" />
            <ellipse rx="17" ry="6.5" transform="rotate(90)" />
          </g>
          <circle r="3" fill="#6B46FF" />
        </svg>{' '}
        <span className="brand__name">SynapseQ</span>{' '}
      </a>
      <p className="footer__tagline">IA × Computação Quântica</p>
    </div>
    <nav className="footer__nav" aria-label="Seções">
      <a href="#tecnologia">Tecnologia</a>{' '}
      <a href="#casos-de-uso">Casos de Uso</a>{' '}
      <a href="#demo">Demo</a>{' '}
      <a href="#quantum-engineering">Quantum Engineering</a>{' '}
      <a href="#investidores">Investidores</a>
    </nav>
    <dl className="footer__spec">
      <div><dt>Processador</dt><dd>SQ-64 · 64 qubits supercondutores</dd></div>
      <div><dt>Operação</dt><dd>Criostato de diluição · 15 mK</dd></div>
      <div><dt>Acesso</dt><dd>api.synapseq.ai · 3 regiões</dd></div>
    </dl>
    <nav className="footer__nav" aria-label="Projeto">
      <a href="https://github.com/kellinho11/webdesignproject" target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
      <a href="https://www.facens.br" target="_blank" rel="noopener noreferrer">Facens</a>
    </nav>
  </div>
  <ol className="container footer__circuit" aria-label="O circuito desta página">
    <li><b>|0⟩</b>Início</li><li><b>H</b>Tecnologia</li><li><b>Rz</b>Casos de uso</li><li><b>U</b>Demo</li><li><b>SW</b>Quantum Engineering</li><li><b>M</b>Investidores</li>
  </ol>
  <div className="container footer__bottom">
    <span>© 2026 SynapseQ. Projeto acadêmico desenvolvido na Facens.</span>{' '}
    <span>Dados de mercado: IQT Research, TBRI, Quantinuum. Métricas de produto ilustrativas.</span>{' '}
    <span>Composto em Sora, Instrument Serif e JetBrains Mono.</span>
  </div>
</footer>
    </>
  );
}
