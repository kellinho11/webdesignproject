// Dados estruturados (schema.org em JSON-LD): dizem aos buscadores o que cada página é. A home é a
// organização, o site e o vídeo do Hero; o Glossário é um conjunto de termos com a trilha de volta.
import { SITE } from './site';
import { TERMS } from './glossario';

// Título e descrição da home, e o que toda página repete no Open Graph (o Next troca o openGraph
// inteiro de uma página, não junta com o do layout).
export const HOME = {
  title: 'SynapseQ · IA × Computação Quântica',
  description: 'SynapseQ combina modelos de linguagem de última geração com processamento quântico para resolver problemas que a computação clássica ainda não alcançou.',
};
export const OG = { siteName: 'SynapseQ', locale: 'pt_BR' };
// a imagem de app/opengraph-image.png, para as páginas que trocam o openGraph (o Next só a põe sozinho
// onde a página não define openGraph próprio)
export const OG_IMAGE = { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Marca da SynapseQ sobre fundo azul-escuro com o título "A inteligência do futuro, na velocidade do impossível"' };

const ORG = `${SITE}/#org`;
const WEBSITE = `${SITE}/#website`;

const org = {
  '@type': 'Organization',
  '@id': ORG,
  name: 'SynapseQ',
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/images/synapseq-512.png`, width: 512, height: 512 },
  description: 'Projeto acadêmico de WebDesign (Facens): uma empresa fictícia de IA e computação quântica.',
  sameAs: ['https://github.com/kellinho11/webdesignproject'],
};

const website = { '@type': 'WebSite', '@id': WEBSITE, url: `${SITE}/`, name: 'SynapseQ', inLanguage: 'pt-BR', publisher: { '@id': ORG } };

export function homeLd({ title, description }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      website,
      {
        '@type': 'WebPage', '@id': `${SITE}/#webpage`, url: `${SITE}/`, name: title, description, inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE }, about: { '@id': ORG },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/opengraph-image.png`, width: 1200, height: 630 },
        video: { '@id': `${SITE}/#video` },
      },
      {
        '@type': 'VideoObject', '@id': `${SITE}/#video`,
        name: 'Como funciona um computador quântico, em 20 segundos',
        description: 'Bit, superposição, emaranhamento, interferência, medição e o criostato a 15 mK: o funcionamento de um computador quântico em seis passos, sem som.',
        thumbnailUrl: `${SITE}/videos/computador-quantico.jpg`,
        contentUrl: `${SITE}/videos/computador-quantico.mp4`,
        uploadDate: '2026-10-21T12:00:00-03:00',
        duration: 'PT20S', width: 1080, height: 1080, inLanguage: 'pt-BR', isFamilyFriendly: true,
        publisher: { '@id': ORG },
      },
    ],
  };
}

export function glossaryLd({ title, description }) {
  const url = `${SITE}/glossario`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE }, breadcrumb: { '@id': `${url}#trilha` }, mainEntity: { '@id': `${url}#termos` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#trilha`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SynapseQ', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Glossário', item: url },
        ],
      },
      {
        '@type': 'DefinedTermSet', '@id': `${url}#termos`, name: title, url, inLanguage: 'pt-BR',
        hasDefinedTerm: TERMS.map((t) => ({ '@type': 'DefinedTerm', '@id': `${url}#${t.id}`, name: t.term, description: t.def, url: `${url}#${t.id}`, inDefinedTermSet: { '@id': `${url}#termos` } })),
      },
    ],
  };
}
