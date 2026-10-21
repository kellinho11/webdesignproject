// A intro como composição Remotion: cada quadro é função do quadro atual (useCurrentFrame), sem
// transição CSS nem timer, então o mesmo quadro sempre sai igual, no site (Player) ou num render.
// O criostato resfria estágio por estágio, os pulsos descem pelas linhas, o chip entra em
// superposição, o registro se emaranha, é medido e a câmera mergulha no chip.
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import Cryostat from '@/components/cryostat/Cryostat';

export const INTRO = { fps: 30, durationInFrames: 132, width: 720, height: 900 };

// [segundo em que começa, texto do status]
const STEPS = [
  [0, 'MXC 15 mK · resfriando'],
  [0.4, 'Linhas de controle ativas · 5 canais XY'],
  [1.5, 'Pulso π/2 · 5,1 GHz → q0–q4 em superposição'],
  [2.35, 'CNOT q0→q1 · emaranhando o registro'],
  [3.1, 'Medição · |10110⟩'],
];
const BITS = [1, 0, 1, 1, 0];
const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

export default function IntroFilm() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const state = {
    lit: interpolate(frame, [0.15 * fps, 1.45 * fps], [0, 6], CLAMP),
    pulse: t >= 0.3 ? (t / 1.1) % 1 : undefined,
    chip: interpolate(frame, [1.5 * fps, 1.8 * fps], [0, 1], CLAMP),
    rabi: t / 0.8,
    bus: interpolate(frame, [2.35 * fps, 2.95 * fps], [0, 1], { ...CLAMP, easing: Easing.bezier(0.23, 1, 0.32, 1) }),
    bits: t >= 3.1 ? BITS : undefined,
  };
  const step = STEPS.findLast(([at]) => t >= at)[1];
  return (
    <AbsoluteFill>
      <div
        className="intro-film__stage"
        style={{
          scale: interpolate(frame, [3.65 * fps, 4.35 * fps], [1, 13], { ...CLAMP, easing: Easing.bezier(0.7, 0, 0.84, 0) }),
          opacity: interpolate(frame, [3.95 * fps, 4.35 * fps], [1, 0], CLAMP),
        }}
      >
        <Cryostat prefix="iq" state={state} />
      </div>
      <p className="intro-film__status" style={{ opacity: interpolate(frame, [3.6 * fps, 3.9 * fps], [1, 0], CLAMP) }}>
        <i />{step}
      </p>
    </AbsoluteFill>
  );
}
