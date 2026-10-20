// Seção: InterludeFridge
export default function InterludeFridge() {
  return (
    <>
  <section className="interlude interlude--fridge" aria-labelledby="il1-title">
    <div className="leak leak--soft" aria-hidden="true"></div>
    <div className="container interlude__inner">
      <div className="interlude__copy">
        <p className="section-label reveal">POR DENTRO DO HARDWARE</p>
        <h2 id="il1-title" className="interlude__title reveal" style={{ '--rd': '80ms' }}>Mais frio que o <span className="kw">espaço sideral</span>.</h2>
        <p className="interlude__sub reveal" style={{ '--rd': '160ms' }}>Cada andar esfria mais. No fundo, o chip com os qubits.</p>
        <div className="interlude__readout reveal" style={{ '--rd': '240ms' }}>
          <span className="interlude__big" id="fridge-temp">300 K</span>{' '}
          <span className="interlude__small" id="fridge-c">temperatura ambiente</span>
        </div>
      </div>
      <div className="interlude__media" aria-hidden="true">
        <svg className="mg" id="mg-fridge" viewBox="0 0 520 520"></svg>
      </div>
    </div>
  </section>
    </>
  );
}
