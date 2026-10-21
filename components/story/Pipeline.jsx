// Como uma pergunta vira resposta: as quatro etapas do SynapseQ, com pacotes correndo entre elas.
const STEPS = [
  { n: '01', name: 'Modelo de IA', what: 'Lê o problema em linguagem de negócio e o escreve como uma função de custo.', spec: 'LLM 70B · ajuste fino em otimização' },
  { n: '02', name: 'Compilador quântico', what: 'Transforma a função num circuito e o encaixa no chip: portas, ordem e roteamento.', spec: '64 qubits · profundidade < 180 portas' },
  { n: '03', name: 'QPU a 15 mK', what: 'Executa o circuito 1.024 vezes. Cada execução termina numa medição.', spec: 'SQ-64 · 1.024 shots · 120 ms' },
  { n: '04', name: 'Leitura por IA', what: 'Corrige o ruído, lê o histograma e devolve a resposta em JSON.', spec: 'Mitigação de erro · p50 340 ms' },
];

export default function Pipeline() {
  return (
    <figure className="pipe reveal">
      <figcaption className="fig-label"><b>Fig. 3</b> Como uma pergunta vira resposta</figcaption>
      <ol className="pipe__steps">
        {STEPS.map((s, i) => (
          <li className="pipe__step" key={s.n} style={{ '--k': i }}>
            <span className="pipe__n">{s.n}</span>
            <h3 className="pipe__name">{s.name}</h3>
            <p className="pipe__what">{s.what}</p>
            <p className="pipe__spec">{s.spec}</p>
          </li>
        ))}
      </ol>
      <div className="pipe__wire" aria-hidden="true"><i /><i /><i /></div>
    </figure>
  );
}
