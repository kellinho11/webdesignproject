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
import Thread from '@/components/story/Thread';
import Bridge from '@/components/story/Bridge';
import Machine from '@/components/story/Machine';
import Space from '@/components/live/Space';

// Um circuito de uma ponta à outra: o visitante é o qubit. Ele entra em |0⟩ no Hero, passa por
// uma porta em cada seção (H, Rz, U, SWAP) e é medido nos Investidores. Depois do Hero a página
// é um percurso em duas trilhas: o texto à esquerda, costurado pelo fio da margem (Thread) e pelas
// pontes, e à direita o computador quântico (Machine), que a página desce estágio por estágio.
export default function Home() {
  return (
    <>
      <Space />
      <Intro />
      <SiteHeader />
      <main id="topo">
        <Hero />
        <div className="story">
        <Thread />
        <Machine />
        <Compare />
        <Bridge parts={[['Uma moeda girando é bonita no papel.'], ['Onde ela paga a conta?', true]]} note="H → Rz · aplicar ao mundo real" to="#casos-de-uso" />
        <Cases />
        <Bridge align="right" parts={[['Cada caso é um circuito.'], ['Rode um', true], ['e conte as respostas.']]} note="Rz → U · medir mil vezes" to="#demo" />
        <Demo />
        <Bridge align="center" parts={[['Por trás de cada histograma há um criostato a −273 °C.'], ['Você só vê um endpoint.', true]]} note="U → SWAP · do laboratório para a API" to="#quantum-engineering" />
        <Api />
        <Bridge parts={[['Todo circuito termina numa medição.'], ['Esta é a sua.', true]]} note="SWAP → M · colapso" to="#investidores" />
        <Cta />
        </div>
      </main>
      <SiteFooter />
      <Behavior />
      <GlassSheen />
    </>
  );
}
