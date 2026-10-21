// Seção: Compare (Tecnologia) · porta H: a moeda vira qubit
import QubitCoin from '@/components/coin/QubitCoin';
import Film from '@/components/films/Film';
import GateMark from '@/components/story/GateMark';
import Kpis from '@/components/story/Kpis';
import Pipeline from '@/components/story/Pipeline';
import SpecTable from '@/components/story/SpecTable';

const CHAPTERS = [
  { at: 0, caption: 'Clássico: um caminho por vez.' },
  { at: 3, caption: 'Quântico: todos juntos; a interferência apaga os errados.' },
  { at: 6, caption: '30 variáveis: 30 s × 98 ms.' },
  { at: 10, caption: 'Cada variável dobra o clássico. O quântico mal muda.' },
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
        <p className="ed-lead reveal" style={{ '--rd': '120ms' }}>Bit é moeda parada. Qubit é moeda girando. Gire e meça.</p>
      </header>
      <Kpis items={[
        { label: 'Clássico', value: 'O(2ⁿ)' },
        { label: 'SynapseQ', value: 'O(√2ⁿ)' },
        { label: '30 variáveis', value: '306×', count: 306, suffix: '×', note: '30 s → 98 ms' },
        { label: '50 variáveis', value: '1 ano → 0,1 s' },
      ]} />
      <div className="tech">
        <div className="tech__coin glass-panel reveal" style={{ '--rd': '80ms' }}>
          <p className="fig-label"><b>Fig. 1</b> Bit × qubit · experimente</p>
          <QubitCoin />
        </div>
        <div className="tech__film reveal" style={{ '--rd': '180ms' }}>
          <Film scene="compare" duration={14} title="Fig. 2 · Por que quântico" chapters={CHAPTERS} mesh="blue" />
          <ul className="tech__legend" aria-label="Legenda">
            <li><i className="is-c" aria-hidden="true" />Clássico · O(2ⁿ)</li>
            <li><i className="is-q" aria-hidden="true" />SynapseQ · <span className="term" tabIndex="0" data-def="Técnica quântica que encontra a melhor solução deixando o sistema se acomodar no estado de menor energia, como uma bola rolando até o fundo do vale.">Quantum Annealing</span> · O(√2ⁿ)</li>
          </ul>
        </div>
      </div>
      <div className="tech__more">
        <Pipeline />
        <SpecTable caption={<><b>Tab. 1</b> Mesmo problema, dois métodos</>} head={['', 'Clássico', 'SynapseQ']} rows={[
          ['30 variáveis', '30 s', '98 ms'],
          ['40 variáveis', '8,6 horas', '3,1 s'],
          ['Energia', '2,4 kWh', '0,03 kWh'],
          ['Melhor para', '< 25 variáveis', '> 25 variáveis'],
        ]} />
      </div>
    </div>
  </section>
    </>
  );
}
