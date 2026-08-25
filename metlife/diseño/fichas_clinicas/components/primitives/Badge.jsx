import React from 'react';

/** Badge de capital: pildora translucida sobre la foto del header.
 *  Medido en la ficha aprobada: relleno blanco al 34,9%, sin borde ni blur,
 *  alto 24,2pt y 14,2pt de aire lateral. */
export function Badge({ children, style }) {
  const s = {
    display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box',
    height: '24.2pt', padding: '0 14.2pt',
    borderRadius: 'var(--radius-pill)',
    background: 'var(--badge-fill)',
    color: 'var(--text-on-dark)',
    font: `var(--weight-medium) var(--text-badge)/1.2 var(--font-body)`,
    ...style,
  };
  return <span style={s}>{children}</span>;
}
