// O computador quântico como instrumento fixo ao lado do texto. A página desce pela máquina: cada
// seção põe a câmera na parte que ela explica (lib/behaviors/machine.js troca data-stage). As notas já
// vêm no HTML; o CSS mostra só a do estágio atual (sem JS, todas aparecem em lista).
const NOTES = [
  { stage: 'top', name: 'Criostato de diluição SQ-64', text: 'Seis estágios, de 300 K a 15 mK. O chip fica no fundo, mais frio que o espaço.', specs: [['Altura', '1,4 m'], ['Estágios', '6'], ['Mais frio', '15 mK']] },
  { stage: 'H', name: 'Chip SQ-64 · superposição', text: 'Um pulso de micro-ondas põe o qubit em superposição.', specs: [['Pulso', 'π/2 · 5,1 GHz'], ['Coerência T1', '118 µs'], ['Qubits', '64']] },
  { stage: 'Rz', name: 'Linhas de controle · fase', text: 'Seu problema chega como pulsos. A fase de cada um codifica os dados.', specs: [['Linhas XY', '5 por estágio'], ['Atenuação', '−60 dB'], ['Precisão de fase', '0,01 rad']] },
  { stage: 'U', name: 'Câmara de mistura · leitura', text: 'Mede, zera, repete 1.024 vezes.', specs: [['Leitura', '1 µs'], ['Reset', '20 µs'], ['1.024 shots', '120 ms']] },
  { stage: 'SW', name: 'A máquina inteira · roteamento', text: 'A QPU fica no laboratório; você chega pela nuvem.', specs: [['Regiões', '3'], ['Disponibilidade', '99,95%'], ['Fila média', '37 jobs']] },
  { stage: 'M', name: 'Registro medido · colapso', text: 'Cada qubit colapsa em 0 ou 1. É a sua resposta.', specs: [['Registro', '5 qubits'], ['Fidelidade de leitura', '98,9%'], ['Resultado', 'sua medição']] },
];

export default function Machine() {
  return (
    <aside className="machine" data-stage="top" aria-label="Modelo do computador quântico">
      <div className="machine__sticky">
        <div className="machine__view" aria-hidden="true">
          <svg className="machine__qc" id="machine-qc" viewBox="0 0 600 760" />
          <p className="machine__depth"><span data-m-temp>300 K</span><i /></p>
        </div>
        <ol className="machine__notes">
          {NOTES.map((n) => (
            <li key={n.stage} data-note={n.stage}>
              <p className="machine__name">{n.name}</p>
              <p className="machine__text">{n.text}</p>
              <dl className="machine__specs">{n.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
