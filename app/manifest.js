// Manifesto do app: nome, cores e ícones para "Adicionar à tela inicial" e para os buscadores.
export const dynamic = 'force-static';

export default function manifest() {
  return {
    name: 'SynapseQ · IA × Computação Quântica',
    short_name: 'SynapseQ',
    description: 'IA e computação quântica numa só API: o seu problema vira um circuito quântico.',
    lang: 'pt-BR',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#04050B',
    theme_color: '#07090F',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/images/synapseq-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/images/synapseq-512.png', type: 'image/png', sizes: '512x512' },
    ],
  };
}
