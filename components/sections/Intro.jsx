'use client';

// Seção: Intro. lib/boot.js abre a intro (e trava a rolagem) antes da primeira pintura, com o fundo
// escuro; aqui o Remotion Player toca a chegada ao site: a marca se desenha e a íris se abre sobre a
// página. Quando a íris começa a abrir, a página destrava e o Hero entra por baixo; no fim, a
// sobreposição sai. Tocar na tela, "Pular" ou Esc entram na hora. O Player chega num pedaço de JS
// separado, só para quem vê a intro.
// A intro nunca derruba a página: se o pedaço do Player não chegar (rede ruim, bloqueador) ou o
// Player quebrar tocando, ela sai na hora. Sem isso, o erro subia e o Next trocava o site inteiro
// pela tela "This page couldn't load".
import { Component, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

function IntroFalhou({ onEnded }) {
  useEffect(() => { onEnded(); }, [onEnded]);
  return null;
}
const loadPlayer = () => import('@/components/intro/IntroPlayer').catch(() => ({ default: IntroFalhou }));
// o pedaço do Player começa a baixar assim que este arquivo roda, sem esperar o React montar a página
const early = typeof window !== 'undefined' && window.__introPending ? loadPlayer() : null;
const IntroPlayer = dynamic(() => early || loadPlayer(), { ssr: false });

class SemQuebrar extends Component {
  state = { erro: false };
  static getDerivedStateFromError() { return { erro: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.erro ? null : this.props.children; }
}

export default function Intro() {
  const [open, setOpen] = useState(true);
  const [state, setState] = useState('');           // '' → 'is-ready' (o Player assumiu o escuro) → 'is-skip'
  const entered = useRef(false);
  const dialogRef = useRef(null);

  // libera a página: rolagem, e o Hero começa a entrar (reveal.js espera intro:done)
  const enter = useCallback(() => {
    if (entered.current) return;
    entered.current = true;
    document.documentElement.classList.remove('intro-open');
    window.__introPending = false;
    window.dispatchEvent(new Event('intro:done'));
  }, []);
  const skip = useCallback(() => { enter(); setState('is-skip'); setTimeout(() => setOpen(false), 300); }, [enter]);
  const end = useCallback(() => { enter(); setOpen(false); }, [enter]);
  const ready = useCallback(() => setState((v) => v || 'is-ready'), []);

  useEffect(() => {
    // a intro não abriu (reduzir movimento) ou já saiu pelo "Pular" antes de o JS chegar
    if (!document.documentElement.classList.contains('intro-open')) { entered.current = true; setOpen(false); return undefined; }
    window.__introReady = true;
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e) => { if (e.key === 'Escape') skip(); };
    document.addEventListener('keydown', onKey);
    return () => { window.__introReady = false; document.removeEventListener('keydown', onKey); };
  }, [skip]);

  if (!open) return null;
  return (
    <div className={`intro ${state}`} id="loader" role="dialog" aria-modal="true" aria-label="Entrando no SynapseQ" tabIndex={-1} ref={dialogRef}>
      <button type="button" className="intro__stage" id="intro-start" aria-label="Entrar no site" onClick={skip}>
        <SemQuebrar onError={end}><IntroPlayer onReady={ready} onReveal={enter} onEnded={end} /></SemQuebrar>
      </button>
      <button type="button" className="intro__skip" id="intro-skip" onClick={skip}>Pular</button>
    </div>
  );
}
