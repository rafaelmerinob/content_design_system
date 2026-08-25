import React from 'react';

/** Notas al pie de una tabla. Formato (n) en linea, 8-9 pt, nunca superindice.
 *  `missing` lista las llamadas presentes en la tabla cuyo texto legal NO venia en la fuente:
 *  se rotulan con un aviso visible para que el cliente complete antes de publicar. */
export function LegalNotes({ notes = [], missing = [], style }) {
  const base = { font: `var(--weight-regular) var(--text-legal-size)/var(--text-legal-lh) var(--font-body)`, color: 'var(--text-legal)' };
  return (
    <ul style={{ listStyle: 'none', margin: 'var(--gap-legal) 0 0', padding: 0, ...style }}>
      {notes.map((n, i) => <li key={i} style={base}>{n}</li>)}
      {missing.length > 0 && (
        <li style={{ ...base, display: 'flex', gap: '4pt', alignItems: 'baseline' }}>
          <span aria-hidden="true">⚠️</span>
          <span>{missing.length === 1 ? 'Falta legal' : 'Faltan legales'} {missing.map((m) => '(' + m + ')').join(' ')}</span>
        </li>
      )}
    </ul>
  );
}
