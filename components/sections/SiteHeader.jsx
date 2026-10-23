// Seção: SiteHeader · uma barra: marca, as seções na ordem da página (cada uma com a sua porta do
// circuito), o botão de movimento e o Portal do Investidor. A linha de baixo marca o progresso.
import MotionToggle from '@/components/live/MotionToggle';
import Logo from '@/components/ui/Logo';
import NewTab from '@/components/ui/NewTab';

const NAV = [
  ['#tecnologia', 'H', 'Tecnologia'],
  ['#casos-de-uso', 'Rz', 'Casos de Uso'],
  ['#demo', 'U', 'Demo'],
  ['#quantum-engineering', 'SW', 'Quantum Engineering'],
  ['#investidores', 'M', 'Investidores'],
];

export default function SiteHeader() {
  return (
<header className="site-header">
  <div className="container header__inner">
    <a href="#topo" className="brand" aria-label="SynapseQ · início">
      <Logo defs />
      <span className="brand__name">SynapseQ</span>
    </a>

    <nav className="site-nav" id="site-nav" aria-label="Principal">
      {NAV.map(([href, gate, label]) => (
        <a key={href} href={href}><b className="site-nav__gate" aria-hidden="true">{gate}</b>{label}</a>
      ))}
      <a href="/glossario" target="_blank" rel="noopener" className="site-nav__out">Glossário<NewTab /></a>
    </nav>

    <div className="header__actions">
      <MotionToggle />
      <a href="#investidores" className="btn-secondary btn--sm">
        <svg className="icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
        <span className="btn__label">Portal do Investidor</span>
      </a>
      <button className="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Abrir menu">
        <span></span><span></span>
      </button>
    </div>
  </div>
  <i className="header__progress" aria-hidden="true" />
</header>
  );
}
