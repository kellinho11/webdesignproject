'use client';

// O Remotion Player toca a composição da intro uma vez, sem controles; no fim, avisa onEnded.
import { useEffect, useRef } from 'react';
import { Player } from '@remotion/player';
import IntroFilm, { INTRO } from './IntroFilm';

export default function IntroPlayer({ onEnded }) {
  const ref = useRef(null);
  useEffect(() => {
    const player = ref.current;
    if (!player) return undefined;
    player.addEventListener('ended', onEnded);
    return () => player.removeEventListener('ended', onEnded);
  }, [onEnded]);
  return (
    <Player
      ref={ref}
      component={IntroFilm}
      durationInFrames={INTRO.durationInFrames}
      fps={INTRO.fps}
      compositionWidth={INTRO.width}
      compositionHeight={INTRO.height}
      autoPlay
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      acknowledgeRemotionLicense
      style={{ width: '100%', height: '100%' }}
    />
  );
}
