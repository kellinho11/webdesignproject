'use client';

import { useEffect, useState } from 'react';
import PlayPauseIcon from '@/components/ui/PlayPauseIcon';
import { emit } from '@/lib/signals';

// Pausa todo o movimento automático do site de uma vez (WCAG 2.2.2): marca o <html> com
// data-motion="off" (o CSS para as animações) e avisa os filmes, a esfera e a telemetria (sinal motion).
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
    emit('motion', { off });
    try { localStorage.setItem('sq-motion', off ? 'off' : 'on'); } catch (e) { /* armazenamento bloqueado */ }
  }, [off]);
  return (
    <button type="button" className="motion-toggle" aria-pressed={off} onClick={() => setOff((v) => !v)}>
      <PlayPauseIcon paused={off} />
      <span>{off ? 'Retomar movimento' : 'Pausar movimento'}</span>
    </button>
  );
}
