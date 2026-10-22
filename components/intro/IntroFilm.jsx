// A intro como composição Remotion: a chegada ao site. As órbitas da marca se desenham no escuro, o
// núcleo acende e vira uma íris que se abre até revelar a página de verdade, que já está por baixo.
// Cada quadro é função do quadro atual (useCurrentFrame), sem transição CSS nem timer.
// A composição tem o tamanho da janela (o Player recebe largura e altura), então a íris cobre a tela.
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const INTRO = { fps: 30, durationInFrames: 66 };
// quadro em que a íris começa a abrir: a página já pode animar a entrada do Hero por baixo
export const REVEAL = 30;

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const ORBITS = [20, -20, 90];
const ORBIT_LEN = 76;   // perímetro aproximado de cada elipse (rx 17, ry 6,5), em unidades do desenho

export default function IntroFilm() {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cx = width / 2, cy = height / 2;
  const unit = Math.min(width, height) / 9;                 // tamanho da marca: um nono do lado menor
  const far = Math.hypot(width, height) / 2 + 40;          // raio que cobre a tela inteira
  const hole = interpolate(frame, [REVEAL, 62], [0, far], { ...CLAMP, easing: Easing.bezier(0.7, 0, 0.2, 1) });
  return (
    <AbsoluteFill>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
        <defs>
          <mask id="intro-iris">
            <rect width={width} height={height} fill="#fff" />
            <circle cx={cx} cy={cy} r={hole} fill="#000" />
          </mask>
          <linearGradient id="intro-grad" x1="-18" y1="-18" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#6B46FF" />
          </linearGradient>
        </defs>
        {/* o escuro com o buraco da íris: por ele aparece a página */}
        <rect width={width} height={height} fill="#07090F" mask="url(#intro-iris)" />
        {/* a borda da íris: um anel gelo que acompanha a abertura */}
        <circle cx={cx} cy={cy} r={hole} fill="none" stroke="#C9D8FF" strokeWidth={1.5}
          opacity={interpolate(frame, [REVEAL, REVEAL + 4, 56, 62], [0, 0.9, 0.5, 0], CLAMP)} />
        <g transform={`translate(${cx} ${cy}) scale(${unit / 40})`}
          opacity={interpolate(frame, [REVEAL, REVEAL + 6], [1, 0], CLAMP)}>
          <g style={{ rotate: `${interpolate(frame, [0, REVEAL], [-60, 0], { ...CLAMP, easing: Easing.bezier(0.16, 1, 0.3, 1) })}deg`,
            scale: interpolate(frame, [REVEAL - 2, REVEAL + 12], [1, 2.4], { ...CLAMP, easing: Easing.bezier(0.7, 0, 0.84, 0) }) }}>
            {ORBITS.map((deg, i) => (
              <ellipse key={deg} rx={17} ry={6.5} transform={`rotate(${deg})`} fill="none" stroke="url(#intro-grad)" strokeWidth={1.4}
                strokeDasharray={ORBIT_LEN}
                strokeDashoffset={interpolate(frame, [2 + i * 4, 20 + i * 4], [ORBIT_LEN, 0], { ...CLAMP, easing: Easing.bezier(0.23, 1, 0.32, 1) })} />
            ))}
          </g>
          {/* o núcleo acende e é ele que se abre em íris */}
          <circle r={interpolate(frame, [14, 22, REVEAL], [0, 3.4, 3], CLAMP)} fill="#C9D8FF"
            style={{ filter: `drop-shadow(0 0 ${interpolate(frame, [14, REVEAL], [0, 6], CLAMP)}px #8DB4FF)` }} />
        </g>
      </svg>
    </AbsoluteFill>
  );
}
