// Página 404: endereço que não existe. Fica fora dos buscadores e leva de volta ao site.
import Logo from '@/components/ui/Logo';

export const metadata = { title: 'Página não encontrada', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main id="topo" className="gloss lost">
      <div className="container">
        <a href="/" className="brand" aria-label="SynapseQ · início"><Logo defs /><span className="brand__name">SynapseQ</span></a>
        <p className="ed-num"><span>404</span>Medição sem resultado</p>
        <h1 className="ed-title"><span className="tl">Este endereço</span> <span className="tl">colapsou em <span className="kw">nada.</span></span></h1>
        <p className="gloss__lead">A página que você procurou não existe. Volte para o início ou consulte o Glossário.</p>
        <p className="lost__actions"><a href="/" className="btn-primary">Ir para o início <span className="btn__arrow" aria-hidden="true">→</span></a> <a href="/glossario" className="btn-secondary">Glossário</a></p>
      </div>
    </main>
  );
}
