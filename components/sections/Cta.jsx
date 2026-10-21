// Seção: Cta · porta M: a medição no fim do circuito

export default function Cta() {
  return (
    <>
  <section className="section cta" id="investidores" aria-labelledby="cta-title" data-gate="M">
    {/* id antigo (até a v1.3.0), mantido como apelido para links já compartilhados */}
    <div className="ed" id="cta-final">
      <p className="cta__collapse reveal" aria-live="polite">Fim do circuito. Seu qubit colapsou em <output id="cta-qubit">|?⟩</output></p>
      <div className="cta2 reveal">
        <p className="ed-num"><span>§ 05</span>Investidores · Series A</p>
        <h2 id="cta-title" className="ed-title cta2__title"><span className="tl">Faça parte</span> <span className="tl">da próxima</span> <span className="tl"><span className="kw">fronteira.</span></span></h2>
        <p className="cta__text">Series A aberta. Peça o data room.</p>

        <div className="raise">
          <dl className="raise__kpis">
            <div><dt>ARR</dt><dd>US$ 4,2 mi</dd></div>
            <div><dt>Crescimento</dt><dd>3,1× ao ano</dd></div>
            <div><dt>Patentes</dt><dd>23</dd></div>
            <div><dt>Rodada</dt><dd>US$ 40 mi</dd></div>
          </dl>
          <figure className="raise__use">
            <figcaption className="fig-label">Uso da rodada</figcaption>
            <p className="raise__bar" aria-hidden="true"><i style={{ '--w': '45%' }} /><i style={{ '--w': '30%' }} /><i style={{ '--w': '25%' }} /></p>
            <ul className="raise__legend"><li>Hardware SQ-128 · 45%</li><li>P&amp;D em algoritmos · 30%</li><li>Go-to-market · 25%</li></ul>
          </figure>
          <ol className="raise__road">
            <li><b>Q4 2026</b>SQ-64 para todos</li>
            <li><b>Q2 2027</b>SQ-128</li>
            <li><b>2028</b>SQ-256</li>
          </ol>
        </div>
        <form className="form sentence" id="investor-form" noValidate>
          <p className="sentence__body">
            <span className="sentence__lead">Para investidores ·</span>
            {' '}Meu nome é <span className="field" style={{ '--w': '15ch' }}><label htmlFor="f-name" className="sr-only">Nome completo</label><input id="f-name" name="name" type="text" autoComplete="name" placeholder="nome completo" required /><span className="field__error" aria-live="polite"></span></span>,
            falo por <span className="field" style={{ '--w': '13ch' }}><label htmlFor="f-fund" className="sr-only">Fundo / empresa</label><input id="f-fund" name="fund" type="text" autoComplete="organization" placeholder="fundo / empresa" required /><span className="field__error" aria-live="polite"></span></span>
            {' '}e quero investir <span className="field field--select" style={{ '--w': '19ch' }}><label htmlFor="f-range" className="sr-only">Faixa de investimento</label><select id="f-range" name="range" required><option value="">faixa de investimento</option><option>US$ 250k – 1M</option><option>US$ 1M – 5M</option><option>US$ 5M – 15M</option><option>Acima de US$ 15M</option></select><span className="field__error" aria-live="polite"></span></span>.
            Envie o acesso para <span className="field" style={{ '--w': '17ch' }}><label htmlFor="f-email" className="sr-only">E-mail corporativo</label><input id="f-email" name="email" type="email" autoComplete="email" placeholder="e-mail corporativo" required /><span className="field__error" aria-live="polite"></span></span>
          </p>
          <button type="submit" className="btn-primary form__submit">Solicitar acesso ao data room <span className="btn__arrow" aria-hidden="true">→</span></button>
        </form>

        <div className="form__success" id="form-success" hidden>
          <p className="form__success-title">Dados válidos.</p>
          <p className="form__success-text">Projeto acadêmico: nada foi enviado nem guardado.</p>
        </div>

        <p className="cta__nda"><svg className="icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></svg> Demonstração: o formulário só confere os campos, não envia dados</p>
      </div>
    </div>
  </section>
    </>
  );
}
