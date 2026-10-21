// Seção: Compare (Tecnologia) · porta H: a moeda vira qubit
import QubitCoin from '../coin/QubitCoin.jsx';
import Film from '../films/Film.jsx';
import GateMark from '../story/GateMark.jsx';
import Kpis from '../story/Kpis.jsx';
import Pipeline from '../story/Pipeline.jsx';
import SpecTable from '../story/SpecTable.jsx';

const CHAPTERS = [
  { at: 0, caption: 'A IA clássica testa um caminho por vez, como quem procura a saída de um labirinto parede por parede.' },
  { at: 3, caption: 'Em superposição, os qubits avaliam os caminhos juntos, e a interferência apaga os errados.' },
  { at: 6, caption: 'Com 30 variáveis: 30 segundos no clássico, 98 milissegundos no SynapseQ.' },
  { at: 10, caption: 'A cada variável a mais o clássico dobra; o quântico mal se mexe. Quanto maior o problema, maior a vantagem.' },
];

export default function Compare() {
  return (
    <>
  <section className="section compare" id="tecnologia" aria-labelledby="compare-title" data-gate="H" data-state="|+⟩" data-num="§ 01" data-name="Tecnologia · superposição">
    <GateMark gate="H" name="Hadamard · superposição" />
    <div className="ed" id="comparativo">{/* id antigo (até a v1.3.0), mantido como apelido para links já compartilhados */}
      <header className="ed-head ed-head--tech">
        <p className="ed-num reveal"><span>§ 01</span>Por que SynapseQ</p>
        <h2 id="compare-title" className="ed-title reveal"><span className="tl">Quanto maior</span> <span className="tl tl--in2">o problema,</span> <span className="tl">maior a <span className="kw">vantagem.</span></span></h2>
        <p className="ed-lead reveal" style={{ '--rd': '120ms' }}>Um bit é uma moeda parada: 0 ou 1. Um qubit é a moeda girando, as duas faces ao mesmo tempo. Gire, pare e veja o estado colapsar.</p>
      </header>
      <Kpis items={[
        { label: 'Busca clássica', value: 'O(2ⁿ)', note: 'dobra a cada variável' },
        { label: 'Busca SynapseQ', value: 'O(√2ⁿ)', note: 'raiz do espaço de busca' },
        { label: '30 variáveis', value: '306×', count: 306, suffix: '×', note: '30 s → 98 ms' },
        { label: '50 variáveis', value: '1 ano → 0,1 s', note: 'onde o clássico desiste' },
      ]} />
      <div className="tech">
        <div className="tech__coin glass-panel reveal" style={{ '--rd': '80ms' }}>
          <p className="fig-label"><b>Fig. 1</b> Bit × qubit · experimente</p>
          <QubitCoin />
        </div>
        <div className="tech__film reveal" style={{ '--rd': '180ms' }}>
          <Film scene="compare" duration={14} title="Fig. 2 · Por que quântico" chapters={CHAPTERS} mesh="blue" />
          <ul className="tech__legend" aria-label="Legenda">
            <li><i className="is-c" aria-hidden="true" />IA clássica · um caminho por vez · O(2ⁿ)</li>
            <li><i className="is-q" aria-hidden="true" />SynapseQ · <span className="term" tabIndex="0" data-def="Técnica quântica que encontra a melhor solução deixando o sistema se acomodar no estado de menor energia, como uma bola rolando até o fundo do vale.">Quantum Annealing</span> · O(√2ⁿ)</li>
          </ul>
        </div>
      </div>
      <div className="tech__more">
        <Pipeline />
        <SpecTable caption={<><b>Tab. 1</b> Clássico × SynapseQ, no mesmo problema de otimização</>} head={['', 'IA clássica', 'SynapseQ']} rows={[
          ['Estratégia', 'testa combinações uma a uma', 'superposição + interferência'],
          ['20 variáveis', '29 ms', '3 ms'],
          ['30 variáveis', '30 s', '98 ms'],
          ['40 variáveis', '8,6 horas', '3,1 s'],
          ['Energia por resposta', '≈ 2,4 kWh', '≈ 0,03 kWh'],
          ['Quando usar', 'problemas pequenos', 'acima de ~25 variáveis'],
        ]} />
      </div>
    </div>
  </section>
    </>
  );
}
