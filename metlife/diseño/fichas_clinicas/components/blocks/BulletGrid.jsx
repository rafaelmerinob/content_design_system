import React from 'react';

/** Tarjeta de listado en varias columnas: nomina cerrada que viene en la fuente como lista
 *  (enfermedades cubiertas, exclusiones, prestaciones sin tope). No es una tabla: no hay datos
 *  por fila, solo nombres, asi que se compone como tarjeta warm gray con vinetas verdes. */
export function BulletGrid({ items = [], columns = 3, style }) {
  return (
    <div style={{ boxSizing: 'border-box', background: 'var(--surface-list-card)',
      borderRadius: 'var(--radius-card)', padding: 'var(--space-5) var(--space-6)', ...style }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        columnGap: 'var(--space-6)', rowGap: 'var(--space-4)' }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
            font: `var(--weight-regular) var(--text-body-size)/1.35 var(--font-body)`,
            color: 'var(--text-body)' }}>
            <span style={{ width: 'var(--bullet-size)', height: 'var(--bullet-size)',
              background: 'var(--bullet-color)', flex: 'none', marginTop: '3.5pt' }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
