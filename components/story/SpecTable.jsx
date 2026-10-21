// Tabela comparativa no formato de ficha técnica: uma linha por critério, sem ícones.
export default function SpecTable({ caption, head, rows, className = '' }) {
  return (
    <div className={`spec reveal ${className}`}>
      <table>
        <caption className="fig-label">{caption}</caption>
        <thead><tr>{head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i} className={i === r.length - 2 ? 'is-q' : undefined}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
