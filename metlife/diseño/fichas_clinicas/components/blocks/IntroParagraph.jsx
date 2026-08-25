import React from 'react';

/** Parrafo introductorio, justo debajo del header oscuro. */
export function IntroParagraph({ children, style }) {
  return (
    <p style={{ margin: 0,
      font: `var(--weight-regular) var(--text-intro)/var(--text-intro-lh) var(--font-body)`,
      color: 'var(--text-body)', textWrap: 'pretty', ...style }}>{children}</p>
  );
}
