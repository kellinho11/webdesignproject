// Seção: Api · porta SWAP: o roteamento no hardware fica escondido atrás de um endpoint.
// Primeiro a máquina (o que a API esconde), depois a chamada que a usa.
import GlassOrbs from '@/components/glass/GlassOrbs';
import Film from '@/components/films/Film';
import Kpis from '@/components/story/Kpis';
import Machine from '@/components/story/Machine';
import SpecTable from '@/components/story/SpecTable';
import CodeTabs from '@/components/live/CodeTabs';

const CHAPTERS = [
  { at: 0, caption: 'Você manda JSON.' },
  { at: 3.2, caption: 'A QPU roda a −273 °C.' },
  { at: 6.6, caption: 'A resposta volta em 340 ms.' },
];

const FEATURES = [
  { n: '4.1', title: 'Rápida', text: <>A <span className="term" tabIndex="0" data-def="Quantum Processing Unit: o chip quântico, equivalente quântico da CPU.">QPU</span> só faz a parte difícil.</> },
  { n: '4.2', title: 'Segura', text: 'Criptografia pós-quântica.' },
  { n: '4.3', title: 'Simples', text: 'SDK Python e TypeScript.' },
];

export default function Api() {
  return (
    <>
  <section className="section api" id="quantum-engineering" aria-labelledby="api-title" data-gate="SW">
    <GlassOrbs preset="api" />
    <div className="ed">
      <header className="ed-head ed-head--api">
        <p className="ed-num reveal"><span>§ 04</span>Quantum Engineering · POST /v1/quantum/solve</p>
        <h2 id="api-title" className="ed-title reveal"><span className="tl">Um endpoint.</span> <span className="tl"><span className="kw">Toda a física</span></span> <span className="tl">por trás.</span></h2>
      </header>
      <Kpis items={[
        { label: 'Latência', value: '340 ms' },
        { label: 'Disponibilidade', value: '99,95%' },
        { label: 'Regiões', value: '3', note: 'SP · Virgínia · Frankfurt' },
        { label: 'Chamadas 2026', value: '2,8 mi' },
      ]} />
      <Machine />
      <div className="api__grid">
        <div className="api__film reveal" style={{ '--rd': '80ms' }}>
          <Film scene="api" duration={10} title="synapseq · api.synapseq.ai" chapters={CHAPTERS} mesh="blue" ratio="16 / 11" />
        </div>
        <ol className="api__features">
          {FEATURES.map((f, i) => (
            <li className="feature reveal" key={f.n} style={{ '--rd': `${140 + i * 80}ms` }}>
              <span className="feature__index">{f.n}</span>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__text">{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="api__dev">
        <div className="reveal"><p className="fig-label">A chamada</p><CodeTabs /></div>
        <SpecTable caption={<>Hardware</>} head={['', 'SQ-64 (hoje)', 'SQ-128 (2027)']} rows={[
          ['Qubits físicos', '64', '128'],
          ['Fidelidade', '99,71%', '99,85%'],
          ['Coerência T1', '118 µs', '200 µs'],
          ['Temperatura', '15 mK', '10 mK'],
        ]} />
      </div>
    </div>
  </section>
    </>
  );
}
