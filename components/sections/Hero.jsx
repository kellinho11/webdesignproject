// Seção: Hero
export default function Hero() {
  return (
    <>
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero__circuit" aria-hidden="true">
      <div className="hero__circuit-inner">
        <svg viewBox="0 0 900 360" preserveAspectRatio="xMidYMid meet">
          <g className="wires">
            <text x="14" y="64">|q0⟩</text><line x1="56" y1="60" x2="674" y2="60" />
            <text x="14" y="124">|q1⟩</text><line x1="56" y1="120" x2="674" y2="120" />
            <text x="14" y="184">|q2⟩</text><line x1="56" y1="180" x2="674" y2="180" />
            <text x="14" y="244">|q3⟩</text><line x1="56" y1="240" x2="674" y2="240" />
            <text x="14" y="304">|q4⟩</text><line x1="56" y1="300" x2="674" y2="300" />
            {/* bits clássicos até o painel */}
            <path className="cbit" d="M674 58 H720 M674 62 H720 M674 118 H720 M674 122 H720" />
          </g>

          <g className="gate gate--h" style={{ '--d': '0ms' }}><rect x="86" y="46" width="28" height="28" /><text x="100" y="64">H</text></g>
          <g className="gate gate--h" style={{ '--d': '150ms' }}><rect x="86" y="106" width="28" height="28" /><text x="100" y="124">H</text></g>
          <g className="gate gate--h" style={{ '--d': '300ms' }}><rect x="86" y="166" width="28" height="28" /><text x="100" y="184">H</text></g>

          <g className="gate gate--cx" style={{ '--d': '450ms' }}><line x1="170" y1="60" x2="170" y2="130" /><circle className="ctrl" cx="170" cy="60" r="4.5" /><circle className="tgt" cx="170" cy="120" r="10" /><line x1="160" y1="120" x2="180" y2="120" /></g>
          <g className="gate gate--h" style={{ '--d': '600ms' }}><rect x="156" y="226" width="28" height="28" /><text x="170" y="244">H</text></g>

          <g className="gate gate--cx" style={{ '--d': '750ms' }}><line x1="240" y1="120" x2="240" y2="190" /><circle className="ctrl" cx="240" cy="120" r="4.5" /><circle className="tgt" cx="240" cy="180" r="10" /><line x1="230" y1="180" x2="250" y2="180" /></g>
          <g className="gate gate--rz" style={{ '--d': '900ms' }}><polygon points="240,283 257,300 240,317 223,300" /><text x="240" y="303">Rz</text></g>

          <g className="gate gate--rz" style={{ '--d': '1050ms' }}><polygon points="310,43 327,60 310,77 293,60" /><text x="310" y="63">Rz</text></g>
          <g className="gate gate--cx" style={{ '--d': '1200ms' }}><line x1="310" y1="180" x2="310" y2="250" /><circle className="ctrl" cx="310" cy="180" r="4.5" /><circle className="tgt" cx="310" cy="240" r="10" /><line x1="300" y1="240" x2="320" y2="240" /></g>

          <g className="gate gate--h" style={{ '--d': '1350ms' }}><rect x="366" y="106" width="28" height="28" /><text x="380" y="124">H</text></g>
          <g className="gate gate--cx" style={{ '--d': '1500ms' }}><line x1="380" y1="240" x2="380" y2="310" /><circle className="ctrl" cx="380" cy="240" r="4.5" /><circle className="tgt" cx="380" cy="300" r="10" /><line x1="370" y1="300" x2="390" y2="300" /></g>

          <g className="gate gate--rz" style={{ '--d': '1650ms' }}><polygon points="450,163 467,180 450,197 433,180" /><text x="450" y="183">Rz</text></g>
          <g className="gate gate--cx" style={{ '--d': '1800ms' }}><line x1="450" y1="60" x2="450" y2="130" /><circle className="ctrl" cx="450" cy="60" r="4.5" /><circle className="tgt" cx="450" cy="120" r="10" /><line x1="440" y1="120" x2="460" y2="120" /></g>

          <g className="gate gate--h" style={{ '--d': '1950ms' }}><rect x="506" y="286" width="28" height="28" /><text x="520" y="304">H</text></g>
          <g className="gate gate--rz" style={{ '--d': '2100ms' }}><polygon points="520,223 537,240 520,257 503,240" /><text x="520" y="243">Rz</text></g>

          <g className="gate gate--h" style={{ '--d': '2250ms' }}><rect x="586" y="46" width="28" height="28" /><text x="600" y="64">H</text></g>

          <g className="gate--meter">
            <g className="mq" style={{ '--bd': '3.6s', '--bo': '-0.4s' }}><rect x="646" y="46" width="28" height="28" /><path d="M652 68 a8 8 0 0 1 16 0 M660 68 L667 54" /></g>
            <g className="mq" style={{ '--bd': '4.4s', '--bo': '-2.1s' }}><rect x="646" y="106" width="28" height="28" /><path d="M652 128 a8 8 0 0 1 16 0 M660 128 L667 114" /></g>
            <g className="mq" style={{ '--bd': '3.1s', '--bo': '-1.2s' }}><rect x="646" y="166" width="28" height="28" /><path d="M652 188 a8 8 0 0 1 16 0 M660 188 L667 174" /></g>
            <g className="mq" style={{ '--bd': '5.2s', '--bo': '-3.3s' }}><rect x="646" y="226" width="28" height="28" /><path d="M652 248 a8 8 0 0 1 16 0 M660 248 L667 234" /></g>
            <g className="mq" style={{ '--bd': '4s', '--bo': '-0.9s' }}><rect x="646" y="286" width="28" height="28" /><path d="M652 308 a8 8 0 0 1 16 0 M660 308 L667 294" /></g>
          </g>
        </svg>
      </div>
    </div>
    <div className="hero__glow hero__glow--core" aria-hidden="true"></div>
    <div className="hero__veil" aria-hidden="true"></div>
    <div className="hero__glow hero__glow--ambient" aria-hidden="true"></div>
    <div className="hero__circuit hero__circuit--meter" aria-hidden="true">
      <div className="hero__circuit-inner">
        <svg viewBox="0 0 900 360" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="meter-glow"><stop offset="0" stopColor="#6B46FF" stopOpacity=".55" /><stop offset=".55" stopColor="#3B82F6" stopOpacity=".18" /><stop offset="1" stopColor="#3B82F6" stopOpacity="0" /></radialGradient>
            <filter id="meter-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22" /></filter>
          </defs>
          <ellipse className="measure__glow" cx="802" cy="185" rx="130" ry="175" fill="url(#meter-glow)" filter="url(#meter-blur)" />
          <g className="measure">
            <rect className="measure__panel" x="720" y="40" width="165" height="280" />
            <text className="measure__title" x="734" y="64">MEDIÇÃO · q0 q1</text>
            <line className="measure__base" x1="732" y1="270" x2="878" y2="270" />
            <rect className="bar" style={{ '--s': '1', '--end': '.06' }} x="740" y="90" width="22" height="180" />
            <rect className="bar" style={{ '--s': '-1', '--end': '.05' }} x="778" y="90" width="22" height="180" />
            <rect className="bar bar--win" style={{ '--s': '1', '--end': '.8' }} x="816" y="90" width="22" height="180" />
            <rect className="bar" style={{ '--s': '-1', '--end': '.09' }} x="854" y="90" width="22" height="180" />
            <text className="measure__label" x="751" y="290">|00⟩</text>{' '}
            <text className="measure__label" x="789" y="290">|01⟩</text>{' '}
            <text className="measure__label" x="827" y="290">|10⟩</text>{' '}
            <text className="measure__label" x="865" y="290">|11⟩</text>
          </g>
        </svg>
      </div>
    </div>
    <div className="hero__glow hero__glow--text" aria-hidden="true"></div>

    <div className="container hero__content">
      <div className="hero__parallax">
        <p className="hero__label hero-in" style={{ '--d': '0ms' }}><span className="live-dot" aria-hidden="true">●</span> IA × COMPUTAÇÃO QUÂNTICA</p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line hero-in" style={{ '--d': '200ms' }}>A inteligência do futuro,</span>{' '}
          <span className="hero__line hero-in" style={{ '--d': '320ms' }}>na velocidade do <span className="text-gradient-reveal kw">impossível</span></span>
        </h1>
        <p className="hero__subtitle hero-in" style={{ '--d': '450ms' }}>IA de última geração + processamento quântico, para problemas que a computação clássica ainda não alcança.</p>
        <div className="hero__actions">
          <a href="#investidores" className="btn-primary btn-glow hero-in hero-in--scale" style={{ '--d': '560ms' }}>Agendar Demonstração</a>{' '}
          <a href="#quantum-engineering" className="btn-secondary btn-glow hero-in" style={{ '--d': '620ms' }}>Ler Whitepaper Técnico</a>
        </div>
        <p className="hero__backers hero-in hero-in--fade" style={{ '--d': '750ms' }}>Backed by <span>Quantum Capital</span> · <span>Nebula Ventures</span> · <span>Vertex Partners</span></p>
      </div>
    </div>
    <a className="hero__cue hero-in hero-in--fade" style={{ '--d': '1000ms' }} href="#simples"><span className="hero__cue-coin" aria-hidden="true"></span>Comece aqui: gire um qubit <span aria-hidden="true">↓</span></a>
  </section>
    </>
  );
}
