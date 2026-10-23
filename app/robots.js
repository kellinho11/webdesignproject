import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

// Tudo aberto aos buscadores, menos os .txt que o Next gera com os dados de cada página (não são
// páginas, e apareceriam na busca como texto solto).
export default function robots() {
  return { rules: { userAgent: '*', allow: '/', disallow: '/*.txt$' }, sitemap: `${SITE}/sitemap.xml`, host: SITE };
}
