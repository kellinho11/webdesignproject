// Seção: Api · porta SWAP: o roteamento no hardware fica escondido atrás de um endpoint.
import GlassOrbs from '../glass/GlassOrbs.jsx';
import Film from '../films/Film.jsx';
import GateMark from '../story/GateMark.jsx';
import Kpis from '../story/Kpis.jsx';
import SpecTable from '../story/SpecTable.jsx';
import CodeTabs from '../live/CodeTabs.jsx';

const CHAPTERS = [
  { at: 0, caption: 'Sua aplicação descreve o problema em JSON. Nada de física.' },
  { at: 3.2, caption: 'A requisição viaja até a QPU, resfriada a −273 °C.' },
  { at: 6.6, caption: 'A resposta volta pronta para usar, em 340 ms.' },
];

const FEATURES = [
  { n: '4.1', title: 'Latência quase-zero', text: <>A <span className="term" tabIndex="0" data-def="Quantum Processing Unit: o chip quântico, equivalente quântico da CPU.">QPU</span> resolve só a parte difícil; o resto fica no clássico.</> },
  { n: '4.2', title: 'Segurança pós-quântica', text: 'Criptografia que resiste a computadores quânticos, de ponta a ponta.' },
  { n: '4.3', title: 'API-first', text: 'Poucas linhas. Zero física. SDK para Python e TypeScript.' },
];

export default function Api() {
  return (
    <>
  <section className="section api" id="quantum-engineering" aria-labelledby="api-title" data-gate="SW" data-state="SWAP|ψ⟩" data-num="§ 04" data-name="Quantum Engineering · roteamento">
    <GlassOrbs preset="api" />
    <GateMark gate="SW" name="SWAP · roteamento no hardware" />
    <div className="ed">
      <header className="ed-head ed-head--api">
        <p className="ed-num reveal"><span>§ 04</span>Quantum Engineering · POST /v1/quantum/solve</p>
        <h2 id="api-title" className="ed-title reveal"><span className="tl">Um endpoint.</span> <span className="tl tl--in4"><span className="kw">Toda a física</span></span> <span className="tl tl--in2">por trás.</span></h2>
      </header>
      <Kpis items={[
        { label: 'Latência p50', value: '340 ms', note: 'p99 1,2 s' },
        { label: 'Disponibilidade', value: '99,95%', note: 'SLA contratual' },
        { label: 'Regiões', value: '3', note: 'São Paulo, Virgínia, Frankfurt' },
        { label: 'Chamadas em 2026', value: '2,8 mi', note: 'até outubro' },
      ]} />
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
        <div className="reveal"><p className="fig-label"><b>Fig. 6</b> A mesma chamada em três linguagens</p><CodeTabs /></div>
        <SpecTable caption={<><b>Tab. 2</b> Ficha técnica do hardware</>} head={['', 'SQ-64 (hoje)', 'SQ-128 (2027)']} rows={[
          ['Qubits físicos', '64', '128'],
          ['Fidelidade 2 qubits', '99,71%', '99,85%'],
          ['Coerência T1', '118 µs', '200 µs'],
          ['Profundidade útil', '180 portas', '400 portas'],
          ['Temperatura', '15 mK', '10 mK'],
          ['Correção de erro', 'mitigação', 'código de superfície'],
        ]} />
      </div>
    </div>
  </section>
    </>
  );
}
