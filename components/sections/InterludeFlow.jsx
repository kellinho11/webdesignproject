// Seção: InterludeFlow
export default function InterludeFlow() {
  return (
    <>
  <section className="interlude interlude--flow" aria-labelledby="il3-title">
    <div className="leak leak--soft" aria-hidden="true"></div>
    <div className="container">
      <div className="interlude__copy interlude__copy--center">
        <p className="section-label reveal">COMO CHEGA ATÉ VOCÊ</p>
        <h2 id="il3-title" className="interlude__title reveal" style={{ '--rd': '80ms' }}>Da sua tela ao <span className="kw">qubit</span> e de volta.</h2>
      </div>
      <div className="flow reveal" id="flow" style={{ '--rd': '160ms' }} aria-hidden="true">
        <div className="flow__node" data-node="0">
          <span className="flow__icon"><svg viewBox="0 0 48 48"><rect x="6" y="9" width="36" height="24" rx="3" /><path d="M18 39h12M24 33v6" /></svg></span>{' '}
          <span className="flow__label">Sua empresa</span>
        </div>
        <div className="flow__link"><span className="flow__dot" data-dot="0"></span></div>
        <div className="flow__node" data-node="1">
          <span className="flow__icon"><svg viewBox="-20 -20 40 40"><g fill="none" stroke="url(#logo-grad)" strokeWidth="1.6"><ellipse rx="15" ry="5.8" transform="rotate(20)" /><ellipse rx="15" ry="5.8" transform="rotate(-20)" /><ellipse rx="15" ry="5.8" transform="rotate(90)" /></g><circle r="2.6" fill="#6B46FF" /></svg></span>{' '}
          <span className="flow__label">IA SynapseQ</span>
        </div>
        <div className="flow__link"><span className="flow__dot" data-dot="1"></span></div>
        <div className="flow__node" data-node="2">
          <span className="flow__icon"><svg viewBox="0 0 48 48"><ellipse cx="24" cy="10" rx="17" ry="3" /><ellipse cx="24" cy="21" rx="13" ry="2.4" /><ellipse cx="24" cy="31" rx="9" ry="1.8" /><path d="M12 11v9M36 11v9M16 22v8M32 22v8M20 32v6M28 32v6" /><rect x="18" y="38" width="12" height="4" rx="1" /></svg></span>{' '}
          <span className="flow__label">QPU · −273 °C</span>
        </div>
      </div>
      <div className="flow__foot reveal" style={{ '--rd': '240ms' }}>
        <span className="flow__ms" id="flow-ms">0 ms</span>{' '}
        <span className="flow__caption" id="flow-cap">Sua requisição sai…</span>
      </div>
    </div>
  </section>
    </>
  );
}
