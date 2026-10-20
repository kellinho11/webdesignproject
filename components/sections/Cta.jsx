// Seção: Cta
export default function Cta() {
  return (
    <>
  <section className="section cta" id="investidores" aria-labelledby="cta-title">
    <div className="leak" style={{ '--lx': '50%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">M</span><span className="qwire__name">Medição · colapso</span><span className="qwire__line"></span></div></div>
    <svg className="bloch bloch--cta" data-bloch viewBox="-130 -130 260 260" aria-hidden="true">
      <circle className="bloch__sphere" r="100" />
      <ellipse className="bloch__eq" rx="100" ry="28" />
      <ellipse className="bloch__mer" rx="28" ry="100" />
      <line className="bloch__axis" x1="0" y1="-114" x2="0" y2="114" />
      <line className="bloch__axis" x1="-114" y1="0" x2="114" y2="0" />
      <text className="bloch__lbl" x="0" y="-120" textAnchor="middle">|0⟩</text>{' '}
      <text className="bloch__lbl" x="0" y="128" textAnchor="middle">|1⟩</text>{' '}
      <text className="bloch__lbl" x="118" y="4">|+⟩</text>
      <line className="bloch__proj" data-proj x1="0" y1="0" x2="0" y2="0" />
      <line className="bloch__vec" data-vec x1="0" y1="0" x2="0" y2="-100" />
      <circle className="bloch__tip" data-tip cx="0" cy="-100" r="5" />
      <text className="bloch__state" data-state x="-124" y="-104">θ = 0.00π · φ = 0.00π</text>{' '}
    </svg>
    <div className="cta__glow" aria-hidden="true"></div>
    <div className="blobs blobs--cta" aria-hidden="true"><svg className="blob blob--a" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice"><path d="M420 110C548 84 668 168 652 292C638 404 536 474 414 462C292 450 186 398 178 286C170 176 296 136 420 110Z" /></svg><svg className="blob blob--b" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice"><path d="M250 210C330 132 474 148 524 240C574 334 502 436 388 446C276 456 160 404 152 322C144 254 186 272 250 210Z" /></svg><svg className="blob blob--c" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice"><path d="M590 250C672 212 772 266 768 352C764 444 670 504 576 482C484 460 438 396 460 326C478 272 520 282 590 250Z" /></svg></div>
    {/* id antigo (até a v1.3.0), mantido como apelido para links já compartilhados */}
    <div className="container" id="cta-final">
      <div className="cta2 reveal">
        <h2 id="cta-title" className="section-title cta2__title section-title--violet"><span className="tl">Faça parte da próxima</span> <span className="tl"><span className="kw">fronteira</span>.</span></h2>
        <p className="cta__text">Rodada Series A aberta. Acesso ao data room com roadmap, benchmarks e tração.</p>

        <form className="form sentence" id="investor-form" noValidate>
          <p className="sentence__body">
            <span className="sentence__lead">Para investidores ·</span>
            {' '}Meu nome é <span className="field" style={{ '--w': '15ch' }}><label htmlFor="f-name" className="sr-only">Nome completo</label><input id="f-name" name="name" type="text" autoComplete="name" placeholder="nome completo" required /><span className="field__error" aria-live="polite"></span></span>,
            falo por <span className="field" style={{ '--w': '13ch' }}><label htmlFor="f-fund" className="sr-only">Fundo / empresa</label><input id="f-fund" name="fund" type="text" autoComplete="organization" placeholder="fundo / empresa" required /><span className="field__error" aria-live="polite"></span></span>
            {' '}e quero investir <span className="field field--select" style={{ '--w': '19ch' }}><label htmlFor="f-range" className="sr-only">Faixa de investimento</label><select id="f-range" name="range" required><option value="">faixa de investimento</option><option>US$ 250k – 1M</option><option>US$ 1M – 5M</option><option>US$ 5M – 15M</option><option>Acima de US$ 15M</option></select><span className="field__error" aria-live="polite"></span></span>.
            Envie o acesso para <span className="field" style={{ '--w': '17ch' }}><label htmlFor="f-email" className="sr-only">E-mail corporativo</label><input id="f-email" name="email" type="email" autoComplete="email" placeholder="e-mail corporativo" required /><span className="field__error" aria-live="polite"></span></span>
          </p>
          <button type="submit" className="btn-primary btn-glow form__submit">Solicitar Acesso ao Data Room <span aria-hidden="true">→</span></button>
        </form>

        <div className="form__success" id="form-success" hidden>
          <p className="form__success-title">Solicitação recebida.</p>
          <p className="form__success-text">Nosso time de relações com investidores enviará o NDA e o acesso ao data room em até 48 horas.</p>
        </div>

        <p className="cta__nda"><svg className="icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg> Seus dados são protegidos sob NDA automático</p>
      </div>
    </div>
  </section>
    </>
  );
}
