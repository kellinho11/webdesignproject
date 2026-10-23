// Marca de link que abre em nova guia: a seta para quem vê, o aviso para leitor de tela.
export default function NewTab() {
  return (
    <>
      <svg className="newtab" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M4 2h6v6M10 2 3 9" /></svg>
      <span className="sr-only"> (abre em nova guia)</span>
    </>
  );
}
