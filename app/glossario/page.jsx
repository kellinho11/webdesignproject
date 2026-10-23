// Glossário: a segunda página do site. Os termos que a home usa, em ordem alfabética, com a seção
// onde cada um aparece. Abre em nova guia a partir do menu e do rodapé.
import Logo from '@/components/ui/Logo';
import SiteFooter from '@/components/sections/SiteFooter';
import GlossaryList from '@/components/glossario/GlossaryList';
import JsonLd from '@/components/seo/JsonLd';
import { TERMS } from '@/lib/glossario';
import { OG, OG_IMAGE, glossaryLd } from '@/lib/seo';

const title = 'Glossário de computação quântica';
const description = 'Qubit, superposição, medição, QAOA, Grover: os termos de computação quântica do site da SynapseQ, em linguagem simples.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/glossario', languages: { 'pt-BR': '/glossario' } },
  openGraph: { ...OG, type: 'article', url: '/glossario', title: `${title} · SynapseQ`, description, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: `${title} · SynapseQ`, description, images: [OG_IMAGE] },
};

const SORTED = [...TERMS].sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));

export default function Glossario() {
  return (
    <>
      <JsonLd data={glossaryLd({ title, description })} />
      <header className="site-header page-header">
        <div className="container header__inner">
          <a href="/" className="brand" aria-label="SynapseQ · início">
            <Logo defs />
            <span className="brand__name">SynapseQ</span>
          </a>
          <a href="/" className="btn-secondary btn--sm">Voltar ao site</a>
        </div>
      </header>
      <main id="topo" className="gloss">
        <div className="container">
          <nav className="gloss__trail" aria-label="Você está em">
            <ol><li><a href="/">SynapseQ</a></li><li aria-current="page">Glossário</li></ol>
          </nav>
          <p className="ed-num"><span>§ G</span>Glossário</p>
          <h1 className="ed-title gloss__title"><span className="tl">Computação quântica,</span> <span className="tl">em <span className="kw">palavras simples.</span></span></h1>
          <p className="gloss__lead">Os termos que aparecem no site da SynapseQ, do qubit ao criostato. Cada um leva de volta à parte da página onde ele entra em ação.</p>
          <GlossaryList terms={SORTED} />
        </div>
      </main>
      <SiteFooter home="/" />
    </>
  );
}
