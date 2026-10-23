'use client';

// A lista do Glossário com a busca. O HTML já sai com todos os termos (sem JS, a busca some e a
// lista fica inteira). A busca ignora acentos e maiúsculas e procura no termo e na definição;
// o texto digitado só é comparado, nunca vira HTML.
import { useMemo, useState } from 'react';

const plain = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

export default function GlossaryList({ terms }) {
  const [query, setQuery] = useState('');
  const index = useMemo(() => terms.map((t) => plain(`${t.term} ${t.def}`)), [terms]);
  const q = plain(query.trim());
  const shown = terms.filter((_, i) => !q || index[i].includes(q));
  return (
    <>
      <div className="gloss__search">
        <label htmlFor="gloss-q">Buscar no glossário</label>
        <input id="gloss-q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} maxLength={60}
          placeholder="qubit, medição, Grover…" autoComplete="off" spellCheck="false" aria-controls="gloss-list" />
        <p className="gloss__count" aria-live="polite">{shown.length === terms.length ? `${terms.length} termos` : `${shown.length} de ${terms.length} termos`}</p>
      </div>
      <dl className="gloss__list" id="gloss-list">
        {shown.map((t) => (
          <div className="gloss__item" id={t.id} key={t.id}>
            <dt><a href={`#${t.id}`}>{t.term}</a></dt>
            <dd>
              <p>{t.def}</p>
              <a className="gloss__where" href={`/${t.where[0]}`}>Na página: {t.where[1]} <span aria-hidden="true">→</span></a>
            </dd>
          </div>
        ))}
      </dl>
      {shown.length === 0 && <p className="gloss__empty">Nenhum termo com “{query.trim()}”. Tente outra palavra.</p>}
    </>
  );
}
