'use client';

// O vídeo do Hero: como funciona um computador quântico, em 20 s (renderizado em HyperFrames, video/).
// Toca mudo e em loop só quando está visível, com a aba aberta e sem "Pausar movimento"; com
// movimento reduzido, fica na capa e mostra os controles. Espera a intro sair para começar do passo 01.
import { useEffect, useRef, useState } from 'react';
import useLive from './useLive';

export default function HeroFilm() {
  const [ref, on, reduced] = useLive(0.25);
  const video = useRef(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!window.__introPending) { setEntered(true); return undefined; }
    const go = () => setEntered(true);
    window.addEventListener('intro:done', go, { once: true });
    return () => window.removeEventListener('intro:done', go);
  }, []);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (on && entered) v.play().catch(() => {}); else v.pause();
  }, [on, entered]);
  return (
    <figure className="hero__film" ref={ref}>
      <video ref={video} src="/videos/computador-quantico.mp4" poster="/videos/computador-quantico.jpg" muted loop playsInline preload="metadata" controls={reduced} width="1080" height="1080"
        aria-label="Como funciona um computador quântico: bit, superposição, emaranhamento, interferência, medição e o criostato a 15 mK" />
      <figcaption>Como funciona, em 20 s</figcaption>
    </figure>
  );
}
