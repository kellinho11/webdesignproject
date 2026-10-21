// Seção: SiteHeader
import LiveStatus from '../live/LiveStatus.jsx';
import MotionToggle from '../live/MotionToggle.jsx';

export default function SiteHeader() {
  return (
    <>
<header className="site-header">
  <div className="container header__inner">
    <a href="#topo" className="brand" aria-label="SynapseQ · início">{' '}
      <svg className="logo" viewBox="-20 -20 40 40" width="32" height="32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-grad" x1="-18" y1="-18" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#6B46FF" />
          </linearGradient>
        </defs>
        <g className="logo__orbits" fill="none" stroke="url(#logo-grad)" strokeWidth="1.6">
          <ellipse rx="17" ry="6.5" transform="rotate(20)" />
          <ellipse rx="17" ry="6.5" transform="rotate(-20)" />
          <ellipse rx="17" ry="6.5" transform="rotate(90)" />
        </g>
        <circle r="3" fill="#6B46FF" />
      </svg>{' '}
      <span className="brand__name">SynapseQ</span>{' '}
    </a>

    <nav className="site-nav" id="site-nav" aria-label="Principal">
      <a href="#tecnologia">Tecnologia</a>{' '}
      <a href="#quantum-engineering">Quantum Engineering</a>{' '}
      <a href="#casos-de-uso">Casos de Uso</a>{' '}
      <a href="#demo">Demo</a>{' '}
      <a href="#investidores">Investidores</a>
    </nav>

    <div className="header__actions">
      <a href="#investidores" className="btn-secondary btn--sm">{' '}
        <svg className="icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>{' '}
        <span className="btn__label">Portal do Investidor</span>{' '}
      </a>{' '}
      <button className="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Abrir menu">{' '}
        <span></span><span></span>{' '}
      </button>
    </div>
  </div>
  {/* faixa de rumo: em que capítulo do circuito você está, quanto falta e o status da QPU */}
  <div className="header__strip">
    <div className="container header__strip-inner">
      <p className="chapter"><b data-chapter-num>§ 00</b> <span data-chapter-name>Início · estado |0⟩</span></p>
      <ol className="chapter__track" aria-hidden="true">
        {['H', 'Rz', 'U', 'SW', 'M'].map((g) => <li key={g} data-tick={g}>{g}</li>)}
        <i className="chapter__fill" />
      </ol>
      <LiveStatus />
      <MotionToggle />
    </div>
  </div>
</header>
    </>
  );
}
