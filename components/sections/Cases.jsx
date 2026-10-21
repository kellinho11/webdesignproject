// Seção: Cases · porta Rz: o mesmo qubit, três problemas. Cada caso manda o algoritmo para a Demo.
import Film from '@/components/films/Film';
import GateMark from '@/components/story/GateMark';
import Kpis from '@/components/story/Kpis';

const CASES = [
  {
    id: 'qaoa', n: '2.1', algo: 'QAOA', area: 'Otimização de portfólio', mesh: 'violet', ratio: '16 / 10',
    def: 'Algoritmo quântico para otimização: procura a melhor combinação ajustando o circuito em camadas.',
    title: 'Menos risco, em tempo real.', fact: '1.200 ativos → 64 qubits',
    metrics: [['Risco', '−18%'], ['Rebalanceamento', '6 h → 340 ms'], ['Em produção', '3 gestoras']],
    chapters: [
      { at: 0, caption: 'Pontos são ativos; linhas, correlações.' },
      { at: 2, caption: 'Cada camada reduz o risco.' },
      { at: 6, caption: 'A melhor carteira se destaca.' },
    ],
  },
  {
    id: 'vqe', n: '2.2', algo: 'VQE', area: 'Descoberta de fármacos', mesh: 'blue', ratio: '4 / 5',
    def: 'Algoritmo híbrido que calcula a energia de moléculas: o quântico mede, o clássico ajusta, repetidamente.',
    title: 'Anos de laboratório em minutos.', fact: 'H₂ · LiH · BeH₂',
    metrics: [['Triagem', '14 meses → 9 dias'], ['Moléculas', '2.400'], ['Erro', '< 1,6 mHa']],
    chapters: [
      { at: 0, caption: 'Os elétrons definem a energia.' },
      { at: 2.5, caption: 'O quântico mede; o clássico ajusta.' },
      { at: 6, caption: 'A energia chega ao valor real.' },
    ],
  },
  {
    id: 'grover', n: '2.3', algo: 'Grover', area: 'Busca em dados', mesh: 'ice', ratio: '21 / 9',
    def: 'Algoritmo de busca quântica: encontra um item em N possibilidades com cerca de √N tentativas.',
    title: 'Sem varrer a base inteira.', fact: '1 mi de registros → 785 consultas',
    metrics: [['Consultas', '−99,9%'], ['Base', '10⁹ registros'], ['Fraudes achadas', '+31%']],
    chapters: [
      { at: 0, caption: 'Todos com a mesma chance.' },
      { at: 2.2, caption: 'O certo cresce; os outros somem.' },
      { at: 6.6, caption: 'Achado em √N passos.' },
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
        <p className="ed-lead reveal" style={{ '--rd': '120ms' }}>Escolha um. Ele vai para a Demo.</p>
      </header>
      <Kpis items={[
        { label: 'Setores', value: '3' },
        { label: 'Problemas em 2026', value: '48.210', count: 48210 },
        { label: 'Ganho médio', value: '412×', count: 412, suffix: '×' },
        { label: 'Mercado 2030', value: 'US$ 65 bi' },
      ]} />
      <div className="cases__grid">
        {CASES.map((c, i) => (
          <article className={`case case--${c.id} reveal`} key={c.id} data-case={c.id} style={{ '--rd': `${60 + i * 90}ms` }}>
            <Film scene={c.id} duration={9} title={`${c.algo} · ${c.area}`} chapters={c.chapters} mesh={c.mesh} ratio={c.ratio} captions="below" />
            <div className="case__body">
              <p className="case__algo"><span className="case__n">{c.n}</span><span className="term" tabIndex="0" data-def={c.def}>{c.algo}</span> · {c.area}</p>
              <h3 className="case__title">{c.title}</h3>
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
