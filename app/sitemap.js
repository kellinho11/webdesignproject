import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// lastModified: a data da última mudança de conteúdo de cada página (atualize junto com ela).
// A home declara o vídeo do Hero, para aparecer também na busca de vídeos.
export default function sitemap() {
  return [
    {
      url: `${SITE}/`, lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 1,
      images: [`${SITE}/opengraph-image.png`],
      videos: [{
        title: 'Como funciona um computador quântico, em 20 segundos',
        thumbnail_loc: `${SITE}/videos/computador-quantico.jpg`,
        content_loc: `${SITE}/videos/computador-quantico.mp4`,
        description: 'Bit, superposição, emaranhamento, interferência, medição e o criostato a 15 mK, em seis passos.',
        duration: 20,
      }],
    },
    { url: `${SITE}/glossario`, lastModified: '2026-10-23', changeFrequency: 'monthly', priority: 0.6 },
  ];
}
