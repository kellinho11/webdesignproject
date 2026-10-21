// Seção: Demo · porta U: a rolagem roda o circuito. A seção é alta e o filme fica preso na tela;
// descer a página é avançar no tempo (lib/behaviors/thread.js manda o progresso para o filme).
import GlassOrbs from '@/components/glass/GlassOrbs';
import Film from '@/components/films/Film';
import GateMark from '@/components/story/GateMark';
import Circuits from '@/components/story/Circuits';
import ShotLog from '@/components/live/ShotLog';

const CHAPTERS = [
  { at: 0, caption: 'O circuito dá probabilidades, então roda muitas vezes.' },
  { at: 1.5, caption: 'Cada shot termina em 0 e 1.' },
  { at: 5, caption: 'As boas respostas se repetem.' },
  { at: 10, caption: '1.024 shots: a mais frequente é a solução.' },
];

export default function Demo() {
  return (
    <>
  <section className="section lab" id="demo" data-algo="qaoa" aria-labelledby="lab-title" data-gate="U" data-state="U(β,γ)|ψ⟩" data-num="§ 03" data-name="Demonstração · medição repetida">
    <GlassOrbs preset="demo" />
    <GateMark gate="U" name="U(β, γ) · camada variacional" />
    {/* só este bloco é alto: o circuito, depois dele, não passa por baixo da parte fixa */}
    <div className="scrub">
    <div className="scrub__sticky">
      <div className="ed scrub__grid">
        <header className="scrub__head">
          <p className="ed-num"><span>§ 03</span>Demonstração · <span data-algo-label>QAOA · carteira</span></p>
          <h2 id="lab-title" className="ed-title ed-title--sm"><span className="tl">Rode. Meça.</span> <span className="tl tl--in2">Veja <span className="kw">convergir.</span></span></h2>
        </header>
        <div className="scrub__film">
          <Film scene="demo" duration={13} title="Da medição à resposta" chapters={CHAPTERS} mesh="violet" ratio="16 / 9" captions="below" scrub listen className="film--wide" />
        </div>
        <ol className="scrub__chapters">
          {CHAPTERS.map((c, i) => <li key={i} className="scrub__ch" data-at={c.at / 13}><span>{String(i + 1).padStart(2, '0')}</span>{c.caption}</li>)}
        </ol>
        <div className="scrub__side">
          <dl className="lab__stats">
            <div><dt>Shots</dt><dd data-count="1024">1.024</dd></div>
            <div><dt>Resposta vencedora</dt><dd data-count="61" data-suffix="%">61%</dd></div>
            <div><dt>Qualidade</dt><dd data-count="0.94" data-dec="2">0,94</dd></div>
          </dl>
          <ShotLog />
        </div>
      </div>
    </div>
    </div>
    <div className="ed lab__after">
      <Circuits />
      <p className="lab__note">Outro algoritmo? Escolha em <a href="#casos-de-uso">Casos de uso</a>.</p>
    </div>
  </section>
    </>
  );
}
