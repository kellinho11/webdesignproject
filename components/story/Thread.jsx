// O fio de qubit que atravessa a página pela margem esquerda. A tinta e o marcador |ψ⟩ andam com a
// rolagem (lib/behaviors/thread.js); sem JS, o fio aparece inteiro e parado.
export default function Thread() {
  return (
    <div className="thread" aria-hidden="true">
      <span className="thread__ink" />
      <span className="thread__ket">
        <b className="thread__gate" />
        <span className="thread__state">|0⟩</span>
      </span>
    </div>
  );
}
