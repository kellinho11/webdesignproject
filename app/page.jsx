import LegacyBehaviors from '@/components/LegacyBehaviors';
import GlassSheen from '@/components/glass/GlassSheen';
import Intro from '@/components/sections/Intro';
import Starfield from '@/components/sections/Starfield';
import SiteHeader from '@/components/sections/SiteHeader';
import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import InterludeFridge from '@/components/sections/InterludeFridge';
import Compare from '@/components/sections/Compare';
import Market from '@/components/sections/Market';
import Cases from '@/components/sections/Cases';
import InterludeChip from '@/components/sections/InterludeChip';
import Demo from '@/components/sections/Demo';
import InterludeFlow from '@/components/sections/InterludeFlow';
import Api from '@/components/sections/Api';
import Roadmap from '@/components/sections/Roadmap';
import Cta from '@/components/sections/Cta';
import QubitRegister from '@/components/sections/QubitRegister';
import SiteFooter from '@/components/sections/SiteFooter';

export default function Home() {
  return (
    <>
      <Intro />
      <Starfield />
      <SiteHeader />
      <main id="topo">
        <Hero />
        <Journey />
        <InterludeFridge />
        <Compare />
        <Market />
        <Cases />
        <InterludeChip />
        <Demo />
        <InterludeFlow />
        <Api />
        <Roadmap />
        <Cta />
      </main>
      <QubitRegister />
      <SiteFooter />
      <LegacyBehaviors />
      <GlassSheen />
    </>
  );
}
