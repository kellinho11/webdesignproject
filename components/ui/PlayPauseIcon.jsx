// Ícone dos botões de pausa (filmes e "Pausar movimento"): mostra a ação que o clique faz.
export default function PlayPauseIcon({ paused }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      {paused ? <path d="M5 3.5v9l7.5-4.5z" /> : <path d="M4.5 3.5h2.5v9H4.5zM9 3.5h2.5v9H9z" />}
    </svg>
  );
}
