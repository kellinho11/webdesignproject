import { Sora, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Fontes baixadas no build e servidas pelo próprio site: sem chamada ao Google na visita.
const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export const metadata = {
  title: 'SynapseQ · IA × Computação Quântica',
  description: 'SynapseQ combina modelos de linguagem de última geração com processamento quântico para resolver problemas que a computação clássica ainda não alcançou.',
};

export default function RootLayout({ children }) {
  return (
    // "intro-open" trava a rolagem enquanto a intro está na tela; o script da intro tira a classe.
    // suppressHydrationWarning: o script abaixo mexe nas classes do <html> antes do React assumir.
    <html lang="pt-BR" className={`intro-open ${sora.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* marca que o JS está ativo; sem JS as animações de entrada não escondem o conteúdo */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        {/* sem JS a intro (que depende do script) some e a página rola normalmente */}
        <noscript>
          <style>{'.intro{display:none!important}html.intro-open,html.intro-open body{overflow:auto!important}'}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
