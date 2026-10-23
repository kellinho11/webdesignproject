// Faixa de números-chave no começo de cada seção: o resumo em uma linha antes do detalhe.
// count: o número conta até o valor ao aparecer (lib/behaviors/counters.js); o texto final já vem no HTML.
export default function Kpis({ items, className = '' }) {
  return (
    <dl className={`kpis reveal ${className}`}>
      {items.map((k) => (
        <div key={k.label}>
          <dt>{k.label}</dt>
          <dd {...(k.count ? { 'data-count': k.count, 'data-dec': k.dec, 'data-suffix': k.suffix } : {})}>{k.value}</dd>
          {k.note && <dd className="kpis__note">{k.note}</dd>}
        </div>
      ))}
    </dl>
  );
}
