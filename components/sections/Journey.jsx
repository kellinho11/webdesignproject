// Seção: Journey
export default function Journey() {
  return (
    <>
  <section className="section journey" id="simples" aria-labelledby="jr-title">
    <div className="leak" style={{ '--lx': '72%' }} aria-hidden="true"></div>
    <div className="qwire" aria-hidden="true"><div className="container qwire__inner"><span className="qwire__ket">|q⟩</span><span className="qwire__line"></span><span className="qwire__gate">|0⟩</span><span className="qwire__name">Preparação · estado inicial</span><span className="qwire__line"></span></div></div>
    <div className="container">
      <div className="jr" id="jr">
        <div className="jr__intro reveal">
          <h2 id="jr-title" className="section-title section-title--blue"><span className="tl">Entenda o quântico</span> <span className="tl">em <span className="kw">um minuto</span>.</span></h2>
          <p className="jr__sentence">
            <span className="jr__lead">Em 4 passos:</span>{' '}
            <span className="jr__steps" role="tablist" aria-label="Passos"><button className="jr__step" role="tab" type="button" aria-selected="true"><span className="jr__step-t">Gire</span></button><span className="jr__sep" aria-hidden="true">,</span> <button className="jr__step" role="tab" type="button" aria-selected="false"><span className="jr__step-t">Meça</span></button><span className="jr__sep" aria-hidden="true">,</span> <button className="jr__step" role="tab" type="button" aria-selected="false"><span className="jr__step-t">Interfira</span></button> <span className="jr__sep" aria-hidden="true">e</span> <button className="jr__step" role="tab" type="button" aria-selected="false"><span className="jr__step-t">Compare</span></button><span className="jr__sep" aria-hidden="true">.</span></span>
          </p>
          <span className="jr__progress" aria-hidden="true"><span id="jr-bar"></span></span>
        </div>

        <div className="jr__body reveal" style={{ '--rd': '120ms' }}>
          <div className="jr__stage" aria-hidden="true">
            <span className="jr__numeral is-in" id="jr-num">01</span>
            <div className="jr__scene" data-scene="0">
              <div className="coin3d" id="jr-coin"><span className="coin3d__face coin3d__face--front">0</span><span className="coin3d__face coin3d__face--back">1</span></div>
              <p className="jr__readout" id="jr-coin-read">bit = <b>0</b></p>
            </div>
            <div className="jr__scene" data-scene="1" hidden>
              <div className="jr__measure">
                <div className="coin3d coin3d--sm" id="jr-mcoin"><span className="coin3d__face coin3d__face--front">0</span><span className="coin3d__face coin3d__face--back">1</span></div>
                <div className="jr__hist">
                  <div className="jr__hcol"><span className="jr__hval" id="jr-c0">0</span><span className="jr__hbar"><span id="jr-b0"></span></span><span className="jr__hlbl">0</span></div>
                  <div className="jr__hcol"><span className="jr__hval" id="jr-c1">0</span><span className="jr__hbar"><span id="jr-b1"></span></span><span className="jr__hlbl">1</span></div>
                </div>
              </div>
              <p className="jr__readout" id="jr-m-read">0 medições</p>
            </div>
            <div className="jr__scene" data-scene="2" hidden>
              <svg className="jr__waves" viewBox="0 0 420 240">{' '}
                <text className="jr__wlbl" x="0" y="54">onda 1</text>{' '}
                <text className="jr__wlbl" x="0" y="119">onda 2</text>{' '}
                <text className="jr__wlbl jr__wlbl--sum" x="0" y="194">soma</text>
                <line className="jr__wbase" x1="70" y1="190" x2="410" y2="190" />
                <path className="jr__w jr__w--a" id="jr-wa" d="" />
                <path className="jr__w jr__w--b" id="jr-wb" d="" />
                <path className="jr__w jr__w--s" id="jr-ws" d="" />
              </svg>
              <p className="jr__readout" id="jr-w-read">Soma: 200% da força de uma onda</p>
            </div>
            <div className="jr__scene" data-scene="3" hidden>
              <div className="jr__routes" id="jr-routes"></div>
              <p className="jr__readout" id="jr-r-read">2.520 rotas possíveis · escolha um jeito de resolver</p>
            </div>
          </div>

          <div className="jr__panel">
            <div className="jr__chapter" data-chapter="0">
              <p className="jr__kicker">Passo 1 · <span className="term" tabIndex="0" data-def="A unidade de informação de um computador quântico. Pode estar em 0, em 1 ou numa combinação dos dois.">Qubit</span></p>
              <h3 className="jr__title">Moeda parada: <span className="kw">bit</span>. Girando: <span className="kw">qubit</span>.</h3>
              <p className="jr__text">Bit: 0 ou 1. Gire a moeda.</p>
              <div className="jr__actions"><button type="button" className="btn-primary jr__act is-hint" data-act="spin">Girar a moeda</button></div>
              <div className="jr__reveal" id="jr-r0" hidden>
                <p>Girando: 0 e 1 ao mesmo tempo, a <span className="term" tabIndex="0" data-def="Estado em que o qubit guarda 0 e 1 ao mesmo tempo, cada um com um peso, até ser medido.">superposição</span>.</p>
                <button type="button" className="jr__next" data-goto="1">Próximo passo <span aria-hidden="true">→</span></button>
              </div>
            </div>

            <div className="jr__chapter" data-chapter="1" hidden>
              <p className="jr__kicker">Passo 2 · <span className="term" tabIndex="0" data-def="Ler o valor de um qubit. A superposição se desfaz e sobra um único resultado: 0 ou 1.">Medição</span></p>
              <h3 className="jr__title">Olhou, <span className="kw">caiu</span>.</h3>
              <p className="jr__text">Cada leitura dá uma resposta só.</p>
              <div className="jr__actions">
                <button type="button" className="btn-secondary jr__act" data-act="m1">Medir 1 vez</button>{' '}
                <button type="button" className="btn-primary jr__act is-hint" data-act="m1000">Medir 1.000 vezes</button>
              </div>
              <p className="jr__tip" id="jr-m-tip" hidden>Um resultado parece sorte. Meça mais.</p>
              <div className="jr__reveal" id="jr-r1" hidden>
                <p>Repita milhares de vezes (<span className="term" tabIndex="0" data-def="Repetições do mesmo cálculo. Cada uma dá uma resposta; a frequência revela a probabilidade.">shots</span>): o padrão é a resposta.</p>
                <button type="button" className="jr__next" data-goto="2">Próximo passo <span aria-hidden="true">→</span></button>
              </div>
            </div>

            <div className="jr__chapter" data-chapter="2" hidden>
              <p className="jr__kicker">Passo 3 · <span className="term" tabIndex="0" data-def="Ondas que se somam ou se cancelam. Algoritmos quânticos usam isso para reforçar a resposta certa.">Interferência</span></p>
              <h3 className="jr__title">As erradas se <span className="kw">anulam</span>.</h3>
              <p className="jr__text">Arraste a onda 2.</p>
              <label className="lab__field jr__slider">{' '}
                <span className="lab__field-head"><span>Deslocamento da onda 2</span><output id="jr-phase-out">0°</output></span>
                <input type="range" id="jr-phase" min="0" max="180" step="1" defaultValue="0" className="is-hint-range" />
              </label>
              <p className="jr__live" id="jr-w-msg" aria-live="polite">Alinhadas, se somam: a resposta certa fica mais forte.</p>
              <div className="jr__reveal" id="jr-r2" hidden>
                <p>As erradas se anulam. A certa sobra.</p>
                <button type="button" className="jr__next" data-goto="3">Próximo passo <span aria-hidden="true">→</span></button>
              </div>
            </div>

            <div className="jr__chapter" data-chapter="3" hidden>
              <p className="jr__kicker">Passo 4 · IA na nuvem × Quântico na nuvem</p>
              <h3 className="jr__title">Mesmo problema, <span className="kw">dois jeitos</span>.</h3>
              <p className="jr__text">Rota mais curta entre 8 cidades: 2.520 caminhos.</p>
              <div className="jr__actions">
                <button type="button" className="btn-secondary jr__act jr__mode is-hint" data-mode="classic" aria-pressed="false">Jeito clássico</button>{' '}
                <button type="button" className="btn-secondary jr__act jr__mode" data-mode="quantum" aria-pressed="false">Jeito quântico</button>
              </div>
              <div className="jr__reveal" id="jr-r3" hidden>
                <p className="jr__sum-join">SynapseQ: a IA prepara, o quântico escolhe, a IA entrega.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="next-hint next-hint--glyph reveal" href="#tecnologia" aria-label="A seguir: Quanto tempo isso economiza?"><span className="next-hint__line" aria-hidden="true"></span><span className="next-hint__gate" aria-hidden="true">H</span><span className="next-hint__line" aria-hidden="true"></span></a>
    </div>
  </section>
    </>
  );
}
