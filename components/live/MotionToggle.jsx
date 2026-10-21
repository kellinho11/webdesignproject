'use client';

import { useEffect, useState } from 'react';

// Pausa todo o movimento automático do site de uma vez (WCAG 2.2.2): marca o <html> com
// data-motion="off" (o CSS para as animações) e avisa os filmes, a esfera e a telemetria (sq:motion).
// A escolha fica guardada neste navegador.
export default function MotionToggle() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    let saved = false;
    try { saved = localStorage.getItem('sq-motion') === 'off'; } catch (e) { /* armazenamento bloqueado */ }
    if (saved) setOff(true);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = off ? 'off' : 'on';
    window.__sqMotionOff = off;
    window.dispatchEvent(new CustomEvent('sq:motion', { detail: { off } }));
    try { localStorage.setItem('sq-motion', off ? 'off' : 'on'); } catch (e) { /* armazenamento bloqueado */ }
  }, [off]);
  return (
    <button type="button" className="motion-toggle" aria-pressed={off} onClick={() => setOff((v) => !v)}>
      <svg viewBox="0 0 16 16" aria-hidden="true">{off ? <path d="M5 3.5v9l7.5-4.5z" /> : <path d="M4.5 3.5h2.5v9H4.5zM9 3.5h2.5v9H9z" />}</svg>
      <span>{off ? 'Retomar movimento' : 'Pausar movimento'}</span>
    </button>
  );
}
