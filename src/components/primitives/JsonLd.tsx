// Datos estructurados para buscadores. Se escapa `<` para que ningún texto pueda
// cerrar la etiqueta <script>.
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);
