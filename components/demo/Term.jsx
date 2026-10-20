// Termo do glossário: a explicação aparece no hover/foco (CSS .term[data-def])
export function Term({ def, children }) {
  return <span className="term" tabIndex={0} data-def={def}>{children}</span>;
}
