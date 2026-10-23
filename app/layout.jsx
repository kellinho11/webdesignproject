import { Sora, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import { BOOT_SCRIPT } from '@/lib/boot';
import { SITE } from '@/lib/site';
import { HOME, OG } from '@/lib/seo';
import './globals.css';

// Fontes baixadas no build e servidas pelo próprio site: sem chamada ao Google na visita.
const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

// Metadados de todas as páginas; cada página completa com título, descrição, canonical e Open
// Graph próprios. Favicon, ícone da Apple, manifesto e imagem de compartilhamento são arquivos de
// app/ que o Next liga sozinho.
export const metadata = {
  metadataBase: new URL(SITE),
  title: { default: HOME.title, template: '%s · SynapseQ' },
  description: HOME.description,
  applicationName: 'SynapseQ',
  authors: [{ name: 'kellinho11', url: 'https://github.com/kellinho11' }],
  creator: 'kellinho11',
  publisher: 'SynapseQ',
  keywords: ['computação quântica', 'inteligência artificial', 'qubit', 'QPU', 'QAOA', 'VQE', 'algoritmo de Grover', 'otimização', 'API quântica', 'SynapseQ'],
  category: 'technology',
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1, 'max-snippet': -1 } },
  openGraph: { ...OG, type: 'website', title: HOME.title, description: HOME.description },
  twitter: { card: 'summary_large_image', title: HOME.title, description: HOME.description },
};

export const viewport = { themeColor: '#07090F' };

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: o script abaixo mexe nas classes do <html> antes do React assumir.
    <html lang="pt-BR" className={`${sora.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* "js" e "intro-open" (trava a rolagem enquanto a intro está na tela): ver lib/boot.js */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        {/* sem JS a intro (que depende do script) some e a página rola normalmente */}
        <noscript>
          <style>{'.intro{display:none!important}html.intro-open,html.intro-open body{overflow:auto!important}'}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
