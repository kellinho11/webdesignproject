// Seção: Cases · porta Rz: o mesmo qubit, três problemas. Cada caso manda o algoritmo para a Demo.
import Film from '../films/Film.jsx';
import GateMark from '../story/GateMark.jsx';
import Kpis from '../story/Kpis.jsx';

const CASES = [
  {
    id: 'qaoa', n: '2.1', algo: 'QAOA', area: 'Otimização de portfólio', mesh: 'violet', ratio: '16 / 10',
    def: 'Algoritmo quântico para otimização: procura a melhor combinação ajustando o circuito em camadas.',
    title: 'Menos risco, em tempo real.', fact: '1.200 ativos → 64 qubits · latência 340 ms', sector: 'Finanças · gestão de ativos',
    metrics: [['Risco da carteira', '−18%'], ['Rebalanceamento', '6 h → 340 ms'], ['Em produção', '3 gestoras']],
    chapters: [
      { at: 0, caption: 'Cada ponto é um ativo; as linhas, como eles se movem juntos.' },
      { at: 2, caption: 'Cada camada do circuito puxa a carteira para combinações de menor risco.' },
      { at: 6, caption: 'Depois de 4 camadas, a melhor combinação se destaca.' },
    ],
  },
  {
    id: 'vqe', n: '2.2', algo: 'VQE', area: 'Descoberta de fármacos', mesh: 'blue', ratio: '4 / 5',
    def: 'Algoritmo híbrido que calcula a energia de moléculas: o quântico mede, o clássico ajusta, repetidamente.',
    title: 'Anos de laboratório em minutos de simulação.', fact: 'H₂ · LiH · BeH₂ → erro abaixo de 1,6 mHa', sector: 'Saúde · descoberta de fármacos',
    metrics: [['Triagem de candidatos', '14 meses → 9 dias'], ['Moléculas simuladas', '2.400'], ['Precisão química', '< 1,6 mHa']],
    chapters: [
      { at: 0, caption: 'A nuvem de elétrons define a energia da molécula.' },
      { at: 2.5, caption: 'O quântico mede a energia; o clássico ajusta o circuito e mede de novo.' },
      { at: 6, caption: 'A energia cai até o valor real, E₀, com erro abaixo de 1,6 mHa.' },
    ],
  },
  {
    id: 'grover', n: '2.3', algo: 'Grover', area: 'Busca em dados', mesh: 'ice', ratio: '21 / 9',
    def: 'Algoritmo de busca quântica: encontra um item em N possibilidades com cerca de √N tentativas.',
    title: 'Sem varrer a base inteira.', fact: '1 milhão de registros → ≈ 785 consultas (π/4 · √N)', sector: 'Logística · dados e fraude',
    metrics: [['Consultas por busca', '−99,9%'], ['Base indexada', '10⁹ registros'], ['Fraudes detectadas', '+31%']],
    chapters: [
      { at: 0, caption: '60 registros, todos com a mesma chance no começo.' },
      { at: 2.2, caption: 'Cada iteração amplifica o registro certo e apaga os outros.' },
      { at: 6.6, caption: 'Em ≈ √N passos o certo se destaca, sem olhar um por um.' },
    ],
  },
];

export default function Cases() {
  return (
    <>
  <section className="section cases" id="casos-de-uso" aria-labelledby="cases-title" data-gate="Rz" data-state="Rz(θ)|+⟩" data-num="§ 02" data-name="Casos de uso · fase">
    <GateMark gate="Rz" name="Rz(θ) · rotação de fase" />
    <div className="ed">
      <header className="ed-head ed-head--cases">
        <p className="ed-num reveal"><span>§ 02</span>Casos de uso</p>
        <h2 id="cases-title" className="ed-title reveal"><span className="tl">Qual desafio</span> <span className="tl tl--in3">é o <span className="kw">seu?</span></span></h2>
        <p className="ed-lead reveal" style={{ '--rd': '120ms' }}>Três problemas que travam a computação clássica. Escolha um e ele vai junto para a Demo.</p>
      </header>
      <Kpis items={[
        { label: 'Setores atendidos', value: '3', note: 'finanças, saúde, logística' },
        { label: 'Problemas resolvidos em 2026', value: '48.210', count: 48210 },
        { label: 'Ganho médio de tempo', value: '412×', count: 412, suffix: '×' },
        { label: 'Mercado endereçável', value: 'US$ 65 bi', note: 'até 2030 · IQT Research' },
      ]} />
      <div className="cases__grid">
        {CASES.map((c, i) => (
          <article className={`case case--${c.id} reveal`} key={c.id} data-case={c.id} style={{ '--rd': `${60 + i * 90}ms` }}>
            <Film scene={c.id} duration={9} title={`${c.algo} · ${c.area}`} chapters={c.chapters} mesh={c.mesh} ratio={c.ratio} captions="below" />
            <div className="case__body">
              <p className="case__algo"><span className="case__n">{c.n}</span><span className="term" tabIndex="0" data-def={c.def}>{c.algo}</span> · {c.area}</p>
              <h3 className="case__title">{c.title}</h3>
              <p className="case__sector">{c.sector}</p>
              <p className="case__fact"><span>Na prática</span>{c.fact}</p>
              <dl className="case__metrics">{c.metrics.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <button type="button" className="case__run" data-algo={c.id} aria-pressed={c.id === 'qaoa'}>Rodar na Demo <span aria-hidden="true">↓</span></button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
    </>
  );
}
