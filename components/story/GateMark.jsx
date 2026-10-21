// Porta do circuito no ponto em que o fio entra na seção: letra da porta e o nome por extenso.
export default function GateMark({ gate, name }) {
  return (
    <span className="gate-mark" aria-hidden="true">
      <b>{gate}</b>
      <i>{name}</i>
    </span>
  );
}
