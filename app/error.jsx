'use client';

// Erro inesperado numa página: no lugar da tela branca do Next (em inglês), a página de erro do site,
// com "tentar de novo" e o caminho de volta. Se o erro chegou com a intro aberta, solta a rolagem.
import { useEffect } from 'react';
import Logo from '@/components/ui/Logo';

export default function Erro({ reset }) {
  useEffect(() => {
    document.documentElement.classList.remove('intro-open');
    window.__introPending = false;
  }, []);
  return (
    <main id="topo" className="gloss lost">
      <div className="container">
        <a href="/" className="brand" aria-label="SynapseQ · início"><Logo defs /><span className="brand__name" translate="no">SynapseQ</span></a>
        <p className="ed-num"><span>Erro</span>Decoerência inesperada</p>
        <h1 className="ed-title"><span className="tl">Algo saiu</span> <span className="tl">do <span className="kw">circuito.</span></span></h1>
        <p className="gloss__lead">Esta parte do site não carregou, provavelmente por uma falha de conexão. Tente de novo ou volte para o início.</p>
        <p className="lost__actions"><button type="button" className="btn-primary" onClick={() => reset()}>Tentar de novo <span className="btn__arrow" aria-hidden="true">→</span></button> <a href="/" className="btn-secondary">Ir para o início</a></p>
      </div>
    </main>
  );
}
