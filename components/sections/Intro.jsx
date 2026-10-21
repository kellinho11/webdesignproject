'use client';

// Seção: Intro. lib/boot.js abre a intro (e trava a rolagem) antes da primeira pintura; aqui o
// Remotion Player toca a composição e, no fim, a página entra. Tocar no processador, "Pular" ou Esc
// entram na hora. O Player chega num pedaço de JS separado, só para quem vê a intro.
import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const IntroPlayer = dynamic(() => import('@/components/intro/IntroPlayer'), { ssr: false });

export default function Intro() {
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(null);
  const done = useRef(false);
  const dialogRef = useRef(null);

  const close = useCallback((fast) => {
    if (done.current) return;
    done.current = true;
    setLeaving(fast ? 'is-skip' : 'is-out');
    document.documentElement.classList.remove('intro-open');
    window.__introPending = false;
    window.dispatchEvent(new Event('intro:done'));
    setTimeout(() => setOpen(false), 700);
  }, []);
  const end = useCallback(() => close(false), [close]);

  useEffect(() => {
    // a intro não abriu (reduzir movimento) ou já saiu pelo "Pular" antes de o JS chegar
    if (!document.documentElement.classList.contains('intro-open')) { done.current = true; setOpen(false); return undefined; }
    window.__introReady = true;
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e) => { if (e.key === 'Escape') close(true); };
    document.addEventListener('keydown', onKey);
    return () => { window.__introReady = false; document.removeEventListener('keydown', onKey); };
  }, [close]);

  if (!open) return null;
  return (
    <div className={`intro${leaving ? ` ${leaving}` : ''}`} id="loader" role="dialog" aria-modal="true" aria-label="Iniciar SynapseQ" tabIndex={-1} ref={dialogRef}>
      <button type="button" className="intro__machine" id="intro-start" aria-label="Entrar no site" onClick={() => close(true)}>
        <IntroPlayer onEnded={end} />
      </button>
      <button type="button" className="intro__skip" id="intro-skip" onClick={() => close(true)}>Pular</button>
    </div>
  );
}
