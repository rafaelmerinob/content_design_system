import React from 'react';

/** Titulo de seccion: vineta cuadrada verde + texto Blue 950. */
export function SectionTitle({ children, style }) {
  return (
    <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', margin: 0,
      font: `var(--weight-bold) var(--text-section)/1.2 var(--font-body)`, color: 'var(--text-heading)', ...style }}>
      <span style={{ width: 'var(--bullet-size)', height: 'var(--bullet-size)', background: 'var(--bullet-color)', flex: 'none' }} />
      {children}
    </h2>
  );
}
