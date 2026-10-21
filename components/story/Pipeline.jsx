// Como uma pergunta vira resposta: as quatro etapas do SynapseQ, com pacotes correndo entre elas.
const STEPS = [
  { n: '01', name: 'IA', what: 'Problema → função de custo', spec: 'LLM 70B' },
  { n: '02', name: 'Compilador', what: 'Função → circuito no chip', spec: '< 180 portas' },
  { n: '03', name: 'QPU a 15 mK', what: 'Roda 1.024 vezes', spec: '120 ms' },
  { n: '04', name: 'Leitura', what: 'Histograma → JSON', spec: 'p50 340 ms' },
];

export default function Pipeline() {
  return (
    <figure className="pipe reveal">
      <figcaption className="fig-label"><b>Fig. 3</b> Da pergunta à resposta</figcaption>
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
