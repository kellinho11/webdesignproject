// Seção: Cases · porta Rz: o mesmo qubit, três problemas de negócio. Cada caso conta a mesma história em
// três linhas (o problema hoje, o que o quântico faz, o resultado) e manda o algoritmo para a Demo.
import Film from '@/components/films/Film';
import Kpis from '@/components/story/Kpis';
import { def } from '@/lib/glossario';

// `how`: a frase do meio, cortada onde entra o nome do algoritmo (com a definição do Glossário)
const CASES = [
  {
    id: 'qaoa', n: '2.1', algo: 'QAOA', sector: 'Finanças', mesh: 'violet', ratio: '16 / 10',
    def: def('qaoa'),
    title: 'Menos risco, em tempo real.',
    today: 'Uma gestora com 1.200 ativos leva 6 horas para recalcular a carteira. O mercado muda antes.',
    how: ['O ', ' procura a melhor combinação de ativos, ajustando o circuito em camadas.'],
    result: 'A carteira é refeita em 340 ms, com 18% menos risco.',
    facts: [['Quem compra', 'Gestoras, bancos e seguradoras'], ['Em produção', '3 gestoras']],
    chapters: [
      { at: 0, caption: 'Cada ponto é um ativo; cada linha, um risco em comum.' },
      { at: 2, caption: 'A cada camada, o risco da carteira cai.' },
      { at: 6, caption: 'Sobra a carteira de menor risco.' },
    ],
  },
  {
    id: 'vqe', n: '2.2', algo: 'VQE', sector: 'Farmacêutica', mesh: 'blue', ratio: '16 / 10',
    def: def('vqe'),
    title: 'Triagem em dias, não em meses.',
    today: 'Testar 2.400 moléculas candidatas em laboratório leva 14 meses.',
    how: ['O ', ' calcula a energia de cada molécula no computador, antes de qualquer ensaio.'],
    result: 'A triagem cai para 9 dias, e só as promissoras vão para a bancada.',
    facts: [['Quem compra', 'Farmacêuticas e laboratórios de pesquisa'], ['Já simuladas', 'H₂ · LiH · BeH₂']],
    chapters: [
      { at: 0, caption: 'A molécula candidata entra no computador.' },
      { at: 2.5, caption: 'O quântico mede; o clássico ajusta.' },
      { at: 6, caption: 'A energia calculada diz se vale o ensaio.' },
    ],
  },
  {
    id: 'grover', n: '2.3', algo: 'Grover', sector: 'Antifraude', mesh: 'ice', ratio: '16 / 10',
    def: def('grover'),
    title: 'Sem varrer a base inteira.',
    today: 'Achar uma transação suspeita entre 1 milhão de registros exige conferir um por um.',
    how: ['O algoritmo de ', ' reforça o registro certo a cada passo, até ele se destacar.'],
    result: '785 consultas em vez de 1 milhão, e 31% mais fraudes encontradas.',
    facts: [['Quem compra', 'Bancos, meios de pagamento e varejo'], ['Base testada', '10⁹ registros']],
    chapters: [
      { at: 0, caption: 'Um milhão de registros, iguais à primeira vista.' },
      { at: 2.2, caption: 'A cada passo, o suspeito se destaca.' },
      { at: 6.6, caption: 'Achado em 785 consultas.' },
    ],
  },
];

export default function Cases() {
  return (
    <>
  <section className="section cases" id="casos-de-uso" aria-labelledby="cases-title" data-gate="Rz">
    <div className="ed">
      <header className="ed-head ed-head--cases">
        <p className="ed-num reveal"><span>§ 02</span>Casos de uso</p>
        <h2 id="cases-title" className="ed-title reveal"><span className="tl">Qual desafio</span> <span className="tl">é o <span className="kw">seu?</span></span></h2>
        <p className="ed-lead reveal" style={{ '--rd': '120ms' }}>Três problemas de negócio. Escolha um e veja rodar na Demo.</p>
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
            <Film scene={c.id} duration={9} title={`${c.sector} · ${c.algo}`} chapters={c.chapters} mesh={c.mesh} ratio={c.ratio} captions="below" />
            <div className="case__body">
              <p className="case__algo"><span className="case__n">{c.n}</span>{c.sector}</p>
              <h3 className="case__title">{c.title}</h3>
              <ol className="case__story">
                <li><span>Hoje</span>{c.today}</li>
                <li><span>Com quântico</span><span>{c.how[0]}<span className="term" tabIndex="0" data-def={c.def} translate="no">{c.algo}</span>{c.how[1]}</span></li>
                <li><span>Resultado</span>{c.result}</li>
              </ol>
              <dl className="case__metrics">{c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
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
