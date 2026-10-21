// O computador quântico, em Quantum Engineering: o criostato desenhado em SVG e, ao lado, os estágios
// de cima para baixo. Escolher um estágio leva a câmera até ele (lib/behaviors/machine.js troca
// data-stage). Sem JS, a máquina aparece inteira e as notas ficam todas abertas.
import Cryostat from '@/components/cryostat/Cryostat';

const STAGES = [
  { stage: 'SW', name: 'Criostato SQ-64', temp: '300 K → 15 mK', text: 'Seis estágios, de 300 K a 15 mK. O chip fica no fundo, mais frio que o espaço.', specs: [['Altura', '1,4 m'], ['Estágios', '6'], ['Mais frio', '15 mK']] },
  { stage: 'Rz', name: 'Linhas de controle', temp: '4 K → 15 mK', text: 'Seu problema chega como pulsos. A fase de cada um codifica os dados.', specs: [['Linhas XY', '5 por estágio'], ['Atenuação', '−60 dB'], ['Precisão de fase', '0,01 rad']] },
  { stage: 'U', name: 'Câmara de mistura', temp: '15 mK', text: 'Mede, zera, repete 1.024 vezes.', specs: [['Leitura', '1 µs'], ['Reset', '20 µs'], ['1.024 shots', '120 ms']] },
  { stage: 'H', name: 'Chip SQ-64', temp: '15 mK', text: 'Um pulso de micro-ondas põe cada qubit em superposição.', specs: [['Pulso', 'π/2 · 5,1 GHz'], ['Coerência T1', '118 µs'], ['Qubits', '64']] },
  { stage: 'M', name: 'Leitura do registro', temp: '15 mK', text: 'Cada qubit colapsa em 0 ou 1. É a sua resposta.', specs: [['Registro', '5 qubits'], ['Fidelidade de leitura', '98,9%'], ['Saída', 'JSON pela API']] },
];

export default function Machine() {
  return (
    <div className="machine reveal" data-stage="SW">
      <div className="machine__view" aria-hidden="true">
        <Cryostat prefix="mq" className="machine__qc" />
        <p className="machine__temp" data-m-temp>300 K → 15 mK</p>
      </div>
      <ol className="machine__stages" aria-label="Estágios do computador quântico, de cima para baixo">
        {STAGES.map((s, i) => (
          <li key={s.stage} data-note={s.stage} className={i === 0 ? 'is-on' : undefined}>
            <button type="button" className="machine__pick" data-stage-pick={s.stage} aria-expanded={i === 0}>
              <span className="machine__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="machine__name">{s.name}</span>
              <span className="machine__t">{s.temp}</span>
            </button>
            <div className="machine__detail">
              <p className="machine__text">{s.text}</p>
              <dl className="machine__specs">{s.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
