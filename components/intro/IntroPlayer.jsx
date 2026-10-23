'use client';

// O Remotion Player toca a composição da intro uma vez, sem controles, no tamanho da janela.
// onReady: o Player já desenha o escuro; onReveal: a íris começou a abrir (a página pode animar a
// entrada); onEnded: a intro acabou.
import { useEffect, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import IntroFilm, { INTRO, REVEAL } from './IntroFilm';

export default function IntroPlayer({ onReady, onReveal, onEnded }) {
  const ref = useRef(null);
  const [size] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const player = ref.current;
    if (!player) return undefined;
    const raf = requestAnimationFrame(onReady);
    let revealed = false;
    const onFrame = (e) => { if (!revealed && e.detail.frame >= REVEAL) { revealed = true; onReveal(); } };
    player.addEventListener('frameupdate', onFrame);
    player.addEventListener('ended', onEnded);
    return () => { cancelAnimationFrame(raf); player.removeEventListener('frameupdate', onFrame); player.removeEventListener('ended', onEnded); };
  }, [onReady, onReveal, onEnded]);
  return (
    <Player
      ref={ref}
      component={IntroFilm}
      durationInFrames={INTRO.durationInFrames}
      fps={INTRO.fps}
      compositionWidth={size.w}
      compositionHeight={size.h}
      autoPlay
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      // a intro não tem som: sem as tags de áudio compartilhadas, o Player não toca o áudio mudo
      // em data: que serve para liberar autoplay (a CSP bloqueia media-src data:)
      numberOfSharedAudioTags={0}
      acknowledgeRemotionLicense
      style={{ width: '100%', height: '100%' }}
    />
  );
}
