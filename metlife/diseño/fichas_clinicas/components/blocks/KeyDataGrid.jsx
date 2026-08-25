import React from 'react';
import { KeyDataCard } from '../primitives/KeyDataCard.jsx';

/** Fila de 2 tarjetas de datos clave. */
export function KeyDataGrid({ items = [], assetBase, style }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length || 2}, 1fr)`, gap: 'var(--gap-cards)', ...style }}>
      {items.map((it, i) => <KeyDataCard key={i} {...it} assetBase={assetBase} />)}
    </div>
  );
}
