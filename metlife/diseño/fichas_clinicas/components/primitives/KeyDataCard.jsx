import React from 'react';
import { BrandIcon } from './BrandIcon.jsx';

/** Tarjeta de dato clave: icono circular + cifra grande + descripcion corta. */
export function KeyDataCard({ icon = 'ShieldProtection', value, label, assetBase, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
      background: 'var(--surface-key-data)', borderRadius: 'var(--radius-card)',
      padding: 'var(--space-4) var(--space-5)', ...style }}>
      <BrandIcon name={icon} assetBase={assetBase} />
      <div>
        <div style={{ font: `var(--weight-display) var(--text-numeral)/var(--text-numeral-lh) var(--font-display)`, color: 'var(--text-heading)' }}>{value}</div>
        <div style={{ font: `var(--weight-regular) var(--text-body-size)/1.3 var(--font-body)`, color: 'var(--text-body)', marginTop: '2pt' }}>{label}</div>
      </div>
    </div>
  );
}
