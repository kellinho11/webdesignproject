// Seção: Intro
export default function Intro() {
  return (
    <>
<div className="intro" id="loader" role="dialog" aria-modal="true" aria-label="Iniciar SynapseQ">
  <div className="intro__noise" aria-hidden="true"></div>
  <button type="button" className="intro__machine" id="intro-start" aria-label="Iniciar processamento quântico e entrar no site">{' '}
    <svg className="intro__qc" id="intro-qc" viewBox="0 0 600 760" aria-hidden="true"></svg>{' '}
  </button>
  <div className="intro__hud" aria-live="polite">
    <p className="intro__status"><span className="intro__dot" aria-hidden="true"></span><span id="intro-status">MXC 15 mK · em espera</span></p>
    <p className="intro__cta" id="intro-cta">Toque no processador para iniciar</p>
  </div>
  <button type="button" className="intro__skip" id="intro-skip">Pular</button>
</div>

    </>
  );
}
