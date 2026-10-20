// Seção: InterludeChip
export default function InterludeChip() {
  return (
    <>
  <section className="interlude interlude--chip" aria-labelledby="il2-title">
    <div className="leak leak--soft" aria-hidden="true"></div>
    <div className="container interlude__inner interlude__inner--rev">
      <div className="interlude__media" aria-hidden="true">
        <svg className="mg" id="mg-chip" viewBox="0 0 520 400"></svg>
      </div>
      <div className="interlude__copy">
        <p className="section-label reveal">O CHIP</p>
        <h2 id="il2-title" className="interlude__title reveal" style={{ '--rd': '80ms' }}>Cada ponto, um <span className="kw">qubit</span>.</h2>
        <p className="interlude__sub reveal" style={{ '--rd': '160ms' }}>Cada linha acesa é uma porta lógica conectando dois qubits.</p>
        <div className="interlude__readout reveal" style={{ '--rd': '240ms' }}>
          <span className="interlude__big" id="chip-count">0</span>{' '}
          <span className="interlude__small" id="chip-read">portas executadas</span>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
