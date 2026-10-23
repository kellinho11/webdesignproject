'use client';

// O vídeo do Hero: como funciona um computador quântico, em 20 s (renderizado em HyperFrames, video/).
// Toca mudo e em loop só quando está visível, com a aba aberta e sem "Pausar movimento"; com
// movimento reduzido, fica na capa. Espera a intro sair para começar do passo 01.
// Sem os controles nativos (no celular eles cobriam a legenda do vídeo): um botão abaixo pausa e
// retoma, e a escolha de quem pausou vale até tocar de novo.
import { useEffect, useRef, useState } from 'react';
import PlayPauseIcon from '@/components/ui/PlayPauseIcon';
import useLive from './useLive';

export default function HeroFilm() {
  const [ref, on] = useLive(0.25);
  const video = useRef(null);
  const [entered, setEntered] = useState(false);
  const [held, setHeld] = useState(false);     // quem vê pausou
  const [asked, setAsked] = useState(false);   // quem vê mandou tocar (com movimento reduzido)
  const playing = entered && !held && (on || asked);
  useEffect(() => {
    if (!window.__introPending) { setEntered(true); return undefined; }
    const go = () => setEntered(true);
    window.addEventListener('intro:done', go, { once: true });
    return () => window.removeEventListener('intro:done', go);
  }, []);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (playing) v.play().catch(() => {}); else v.pause();
  }, [playing]);
  const toggle = () => { setHeld(playing); setAsked(!playing && !on); };
  return (
    <figure className="hero__film" ref={ref}>
      <video ref={video} src="/videos/computador-quantico.mp4" poster="/videos/computador-quantico.jpg" muted loop playsInline preload="metadata" width="1080" height="1080"
        aria-label="Como funciona um computador quântico: bit, superposição, emaranhamento, interferência, medição e o criostato a 15 mK" />
      <figcaption>
        <button type="button" className="film__toggle" onClick={toggle} aria-label={playing ? 'Pausar o vídeo' : 'Reproduzir o vídeo'}>
          <PlayPauseIcon paused={!playing} />
        </button>
        Como funciona, em 20 s
      </figcaption>
    </figure>
  );
}
