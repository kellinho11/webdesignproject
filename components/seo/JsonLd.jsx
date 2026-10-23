// Escreve um bloco JSON-LD. O "<" vira <: assim nenhum texto dos dados consegue fechar a tag
// <script> e abrir HTML no meio da página.
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
