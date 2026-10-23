import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap() {
  return [
    { url: `${SITE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/glossario`, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
