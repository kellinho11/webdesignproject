// Ponte entre duas seções: uma frase grande que fecha um assunto e abre o próximo. As palavras
// acendem conforme a frase passa pela tela (--p, de lib/behaviors/thread.js; --i é a posição da
// palavra e --n o total). parts: lista de [texto, destaque?]; o destaque sai em serifa itálica.
export default function Bridge({ parts, note, align = 'left', to }) {
  let i = 0;
  const words = parts.flatMap(([text, em], k) => text.split(' ').filter(Boolean).map((w, j) => (
    <span key={`${k}-${j}`} className={em ? 'bridge__w bridge__w--em' : 'bridge__w'} style={{ '--i': i++ }}>{w} </span>
  )));
  return (
    <div className={`bridge bridge--${align}`} style={{ '--n': i }}>
      <div className="ed">
        <p className="bridge__text">{words}</p>
        {note && <a className="bridge__note" href={to}>{note}</a>}
      </div>
    </div>
  );
}
