import React from 'react';

/** Lienzo de la ficha: ancho fijo 675,12 pt, alto variable, siempre una sola pagina. */
export function FichaPage({ children, style }) {
  return (
    <article style={{ boxSizing: 'border-box', width: 'var(--page-width)', background: 'var(--surface-page)',
      color: 'var(--text-body)', fontFamily: 'var(--font-body)', margin: '0 auto', ...style }}>
      {children}
    </article>
  );
}

/** Cuerpo con los margenes laterales de la ficha; el header y el footer van a sangre. */
export function FichaBody({ children, style }) {
  return (
    <div style={{ boxSizing: 'border-box', padding: 'var(--space-6) var(--page-padding-x) var(--space-5)',
      display: 'grid', gap: 'var(--gap-block)', ...style }}>{children}</div>
  );
}
