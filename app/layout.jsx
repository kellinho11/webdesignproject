import { Sora, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import { BOOT_SCRIPT } from '@/lib/boot';
import { SITE } from '@/lib/site';
import './globals.css';

// Fontes baixadas no build e servidas pelo próprio site: sem chamada ao Google na visita.
const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

const title = 'SynapseQ · IA × Computação Quântica';
const description = 'SynapseQ combina modelos de linguagem de última geração com processamento quântico para resolver problemas que a computação clássica ainda não alcançou.';

// favicon (app/icon.svg) e imagem de compartilhamento (app/opengraph-image.png) entram sozinhos
export const metadata = {
  metadataBase: new URL(SITE),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/', siteName: 'SynapseQ', title, description, videos: [{ url: '/videos/teaser.mp4', type: 'video/mp4', width: 1920, height: 1080 }] },
  twitter: { card: 'summary_large_image', title, description },
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
