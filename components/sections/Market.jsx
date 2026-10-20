// Seção: Market
export default function Market() {
  return (
    <>
  <section className="section market" id="mercado" aria-labelledby="market-title">
    <div className="leak" style={{ '--lx': '68%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">CX</span><span className="qwire__name">CNOT · emaranhamento</span><span className="qwire__line"></span></div></div>
    <svg className="bloch bloch--market" data-bloch viewBox="-130 -130 260 260" aria-hidden="true">
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
    <div className="container">
      <div className="convo">
        <div className="convo__side reveal">
          <h2 id="market-title" className="section-title section-title--violet"><span className="tl">O mercado quântico</span> <span className="tl">já é <span className="kw">real</span>.</span></h2>
          <p className="market__note">Dê seu palpite. Dados do setor, não da SynapseQ.</p>
          <ol className="convo__dots" aria-hidden="true"><li className="is-on"></li><li></li><li></li><li></li></ol>
        </div>
        <div className="convo__main reveal" style={{ '--rd': '100ms' }}>
          <div className="convo__stage" id="convo-stage">
          <article className="quiz is-active" data-answer="2" data-i="0" data-vals="12000000,120000000,1200000000" data-cap="Tamanho do mercado em 2028 · cada opção é 10× a anterior">
            <p className="quiz__n">Por que agora · <b>01</b> / 04 · Segurança</p>
            <p className="quiz__q">Em 2028, o mercado de números aleatórios quânticos vai valer <button type="button" className="quiz__opt" data-opt="0">US$ 12 milhões</button>, <button type="button" className="quiz__opt" data-opt="1">US$ 120 milhões</button> ou <button type="button" className="quiz__opt" data-opt="2">US$ 1,2 bilhão</button>?</p>
            <div className="quiz__answer" hidden>
            <p className="quiz__verdict"></p>
            <p className="stat__number">US$ 1,2B</p>
            <p className="stat__source">Fonte: IQT Research, 2026</p>
          <button type="button" className="quiz__next" data-next="1">Próxima pergunta <span aria-hidden="true">→</span></button></div>
          </article>
          <article className="quiz" data-answer="1" data-i="1" data-vals="4100,410000,41000000" data-cap="Usuários ativos · cada opção é 100× a anterior" aria-hidden="true">
            <p className="quiz__n">Por que agora · <b>02</b> / 04 · Adoção</p>
            <p className="quiz__q">A maior nuvem quântica já tem <button type="button" className="quiz__opt" data-opt="0">4.100</button>, <button type="button" className="quiz__opt" data-opt="1">410.000</button> ou <button type="button" className="quiz__opt" data-opt="2">41 milhões</button> de usuários ativos?</p>
            <div className="quiz__answer" hidden>
            <p className="quiz__verdict"></p>
            <p className="stat__number">+410.000</p>
            <p className="stat__source">Fonte: TBRI, análise sobre IBM Quantum</p>
          <button type="button" className="quiz__next" data-next="2">Próxima pergunta <span aria-hidden="true">→</span></button></div>
          </article>
          <article className="quiz" data-answer="2" data-i="2" data-vals="3500000,350000000,3500000000" data-cap="Execuções por dia · cada opção é 100× a anterior" aria-hidden="true">
            <p className="quiz__n">Por que agora · <b>03</b> / 04 · Volume</p>
            <p className="quiz__q">Por dia, essa nuvem roda <button type="button" className="quiz__opt" data-opt="0">3,5 milhões</button>, <button type="button" className="quiz__opt" data-opt="1">350 milhões</button> ou <button type="button" className="quiz__opt" data-opt="2">3,5 bilhões</button> de execuções quânticas?</p>
            <div className="quiz__answer" hidden>
            <p className="quiz__verdict"></p>
            <p className="stat__number">+3,5 bilhões</p>
            <p className="stat__source">Fonte: TBRI / IBM Quantum</p>
          <button type="button" className="quiz__next" data-next="3">Próxima pergunta <span aria-hidden="true">→</span></button></div>
          </article>
          <article className="quiz" data-answer="0" data-i="3" data-vals="0.86,10,100" data-cap="Erros a cada 1.000 operações · menor é melhor" aria-hidden="true">
            <p className="quiz__n">Por que agora · <b>04</b> / 04 · Precisão</p>
            <p className="quiz__q">As melhores operações entre 2 qubits acertam <button type="button" className="quiz__opt" data-opt="0">99,914%</button>, <button type="button" className="quiz__opt" data-opt="1">99%</button> ou <button type="button" className="quiz__opt" data-opt="2">90%</button> das vezes?</p>
            <div className="quiz__answer" hidden>
            <p className="quiz__verdict"></p>
            <p className="stat__number">99,914%</p>
            <p className="stat__source">Fonte: Quantinuum, 2025</p>
          </div>
          </article>
          </div>
          <div className="quiz__result" id="quiz-result" hidden>
        <p className="quiz__score" id="quiz-score"></p>
        <p className="market__honesty">Vantagem quântica prática em <span className="term" tabIndex="0" data-def="Problemas de escolher a melhor combinação entre muitas possíveis: rotas, escalas, carteiras.">otimização</span> ainda não foi demonstrada. É a fronteira da SynapseQ.</p>
      </div>
        </div>
      </div>
      <a className="next-hint next-hint--glyph reveal" href="#casos-de-uso" aria-label="A seguir: Onde isso entra no seu negócio?"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">Rz</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
