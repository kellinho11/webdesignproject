import Behavior from '@/components/Behavior';
import GlassSheen from '@/components/glass/GlassSheen';
import Intro from '@/components/sections/Intro';
import SiteHeader from '@/components/sections/SiteHeader';
import Hero from '@/components/sections/Hero';
import Compare from '@/components/sections/Compare';
import Cases from '@/components/sections/Cases';
import Demo from '@/components/sections/Demo';
import Api from '@/components/sections/Api';
import Cta from '@/components/sections/Cta';
import SiteFooter from '@/components/sections/SiteFooter';
import Bridge from '@/components/story/Bridge';
import Space from '@/components/live/Space';

// Um circuito de uma ponta à outra: o visitante é o qubit. Ele entra em |0⟩ no Hero, passa por
// uma porta em cada seção (H, Rz, U, SWAP) e é medido nos Investidores. As pontes entre as seções
// fecham um assunto e abrem o próximo; o computador quântico mora em Quantum Engineering.
export default function Home() {
  return (
    <>
      <Space />
      <Intro />
      <SiteHeader />
      <main id="topo">
        <Hero />
        <div className="story">
        <Compare />
        <Bridge parts={[['Bonito no papel.'], ['E na prática?', true]]} note="H → Rz · aplicar ao mundo real" to="#casos-de-uso" />
        <Cases />
        <Bridge align="right" parts={[['Cada caso é um circuito.'], ['Rode um.', true]]} note="Rz → U · medir mil vezes" to="#demo" />
        <Demo />
        <Bridge align="center" parts={[['Atrás do histograma, −273 °C.'], ['Você só vê a API.', true]]} note="U → SWAP · do laboratório para a API" to="#quantum-engineering" />
        <Api />
        <Bridge parts={[['Todo circuito termina numa medição.'], ['A sua.', true]]} note="SWAP → M · colapso" to="#investidores" />
        <Cta />
        </div>
      </main>
      <SiteFooter />
      <Behavior />
      <GlassSheen />
    </>
  );
}
