'use client';

import { useState } from 'react';

// Exemplo de chamada da API em três linguagens, com cópia. Abas acessíveis: setas trocam de aba.
const SNIPPETS = {
  Python: `from synapseq import Client

sq = Client(api_key="sk_live_…")
job = sq.solve(
    algorithm="QAOA",
    problem="portfolio_optimization",
    assets=1200, qubits=64, shots=1024,
)
print(job.result.best, job.result.approx_ratio)
# → [0,1,1,0,…]  0.94`,
  TypeScript: `import { SynapseQ } from "@synapseq/sdk";

const sq = new SynapseQ(process.env.SQ_KEY);
const job = await sq.solve({
  algorithm: "QAOA",
  problem: "portfolio_optimization",
  assets: 1200, qubits: 64, shots: 1024,
});
console.log(job.result.best, job.latencyMs); // 340`,
  cURL: `curl https://api.synapseq.ai/v1/quantum/solve \\
  -H "Authorization: Bearer $SQ_KEY" \\
  -d '{ "algorithm": "QAOA",
        "problem": "portfolio_optimization",
        "assets": 1200, "qubits": 64, "shots": 1024 }'

# 200 OK · 340 ms · approx_ratio 0.94`,
};
const NAMES = Object.keys(SNIPPETS);

export default function CodeTabs() {
  const [tab, setTab] = useState(NAMES[0]);
  const [copied, setCopied] = useState(false);
  const key = (e) => {
    const i = NAMES.indexOf(tab);
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const n = NAMES[(i + (e.key === 'ArrowRight' ? 1 : NAMES.length - 1)) % NAMES.length];
      setTab(n); document.getElementById(`code-tab-${n}`)?.focus();
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(SNIPPETS[tab]); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch (e) { /* sem permissão de área de transferência */ }
  };
  return (
    <div className="code">
      <div className="code__bar">
        <div role="tablist" aria-label="Linguagem do exemplo" className="code__tabs" onKeyDown={key}>
          {NAMES.map((n) => (
            <button key={n} id={`code-tab-${n}`} type="button" role="tab" aria-selected={tab === n} aria-controls="code-panel" tabIndex={tab === n ? 0 : -1} onClick={() => setTab(n)}>{n}</button>
          ))}
        </div>
        <button type="button" className="code__copy" onClick={copy}>{copied ? 'Copiado' : 'Copiar'}</button>
      </div>
      <pre className="code__body" id="code-panel" role="tabpanel" aria-labelledby={`code-tab-${tab}`} tabIndex={0}><code>{SNIPPETS[tab]}</code></pre>
    </div>
  );
}
