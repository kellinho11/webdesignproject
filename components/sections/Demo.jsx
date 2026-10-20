// Seção: Demo
import Lab from '../demo/Lab.jsx';

export default function Demo() {
  return (
    <>
  <section className="section lab" id="demo" aria-labelledby="lab-title">
    <div className="leak" style={{ '--lx': '66%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">U</span><span className="qwire__name">U(β, γ) · camada variacional</span><span className="qwire__line"></span></div></div>
    <div className="bg-lattice" aria-hidden="true"></div>
    <div className="container">
      <Lab />
      <a className="next-hint next-hint--glyph reveal" href="#quantum-engineering" aria-label="A seguir: Como sua empresa usaria isso?"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">SW</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
