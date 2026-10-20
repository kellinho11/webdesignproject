// Seção: SiteFooter
export default function SiteFooter() {
  return (
    <>
<footer className="site-footer" id="rodape">
  <div className="blobs blobs--footer" aria-hidden="true"><svg className="blob blob--a" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice"><path d="M420 110C548 84 668 168 652 292C638 404 536 474 414 462C292 450 186 398 178 286C170 176 296 136 420 110Z" /></svg><svg className="blob blob--b" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice"><path d="M250 210C330 132 474 148 524 240C574 334 502 436 388 446C276 456 160 404 152 322C144 254 186 272 250 210Z" /></svg><svg className="blob blob--c" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice"><path d="M590 250C672 212 772 266 768 352C764 444 670 504 576 482C484 460 438 396 460 326C478 272 520 282 590 250Z" /></svg></div>
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
      <a href="#simples">Jornada</a>{' '}
      <a href="#tecnologia">Tecnologia</a>{' '}
      <a href="#mercado">Mercado</a>{' '}
      <a href="#casos-de-uso">Casos de Uso</a>{' '}
      <a href="#demo">Demo</a>{' '}
      <a href="#quantum-engineering">Quantum Engineering</a>{' '}
      <a href="#roadmap">Roadmap</a>{' '}
      <a href="#investidores">Investidores</a>
    </nav>
    <nav className="footer__nav" aria-label="Projeto">
      <a href="https://github.com/kellinho11/webdesignproject" target="_blank" rel="noopener noreferrer">GitHub</a>{' '}
      <a href="https://www.facens.br" target="_blank" rel="noopener noreferrer">Facens</a>
    </nav>
  </div>
  <div className="container footer__bottom">
    <span>© 2026 SynapseQ. Projeto acadêmico desenvolvido na Facens.</span>{' '}
    <span>Dados de mercado: IQT Research, TBRI, Quantinuum.</span>
  </div>
</footer>
    </>
  );
}
