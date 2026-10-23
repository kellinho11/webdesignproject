// Seção: SiteFooter · também fecha o Glossário: lá, `home="/"` leva os links de volta às seções da home.
import Logo from '@/components/ui/Logo';
import NewTab from '@/components/ui/NewTab';

export default function SiteFooter({ home = '' }) {
  return (
    <>
<footer className="site-footer" id="rodape">
  <div className="container footer__inner">
    <div className="footer__brand">
      <a href={`${home}#topo`} className="brand" aria-label="SynapseQ · início">{' '}
        <Logo size={28} />{' '}
        <span className="brand__name">SynapseQ</span>{' '}
      </a>
      <p className="footer__tagline">IA × Computação Quântica</p>
    </div>
    <nav className="footer__nav" aria-label="Seções">
      <a href={`${home}#tecnologia`}>Tecnologia</a>{' '}
      <a href={`${home}#casos-de-uso`}>Casos de Uso</a>{' '}
      <a href={`${home}#demo`}>Demo</a>{' '}
      <a href={`${home}#quantum-engineering`}>Quantum Engineering</a>{' '}
      <a href={`${home}#investidores`}>Investidores</a>
    </nav>
    <dl className="footer__spec">
      <div><dt>Processador</dt><dd>SQ-64 · 64 qubits supercondutores</dd></div>
      <div><dt>Operação</dt><dd>Criostato de diluição · 15 mK</dd></div>
      <div><dt>Acesso</dt><dd>api.synapseq.ai · 3 regiões</dd></div>
    </dl>
    <nav className="footer__nav" aria-label="Projeto">
      <a href="/glossario" target={home ? undefined : '_blank'} rel={home ? undefined : 'noopener'} aria-current={home ? 'page' : undefined}>Glossário{!home && <NewTab />}</a>{' '}
      <a href="https://github.com/kellinho11/webdesignproject" target="_blank" rel="noopener noreferrer">GitHub<NewTab /></a>{' '}
      <a href="https://www.facens.br" target="_blank" rel="noopener noreferrer">Facens<NewTab /></a>
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
