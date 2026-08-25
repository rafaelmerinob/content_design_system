import React from 'react';

/** Bloque CONDICIONES GENERALES: titulo en mayuscula + bullets, sin marco. */
export function GeneralConditions({ title = 'CONDICIONES GENERALES', items = [], style }) {
  return (
    <section style={style}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', margin: 0,
        font: `var(--weight-bold) var(--text-conditions)/1.2 var(--font-body)`,
        letterSpacing: 'var(--tracking-conditions)', color: 'var(--text-heading)' }}>
        <span style={{ width: 'var(--bullet-size)', height: 'var(--bullet-size)', background: 'var(--bullet-color)', flex: 'none' }} />
        {title}
      </h2>
      <ul style={{ listStyle: 'none', margin: 'var(--space-4) 0 0', padding: 0, display: 'grid', gap: 'var(--space-3)' }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: 'var(--bullet-size) 1fr', gap: 'var(--space-3)', alignItems: 'start' }}>
            <span style={{ width: 'var(--bullet-size)', height: 'var(--bullet-size)', background: 'var(--bullet-color)', marginTop: '4pt' }} />
            <span style={{ font: `var(--weight-regular) var(--text-body-size)/var(--text-body-lh) var(--font-body)`, color: 'var(--text-body)' }}>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
