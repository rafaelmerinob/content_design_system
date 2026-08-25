import * as React from 'react';

/**
 * Pildora translucida de capital asegurado, colocada sobre la foto del header.
 */
export interface BadgeProps {
  /** Texto de la pildora, ej. "Capital UF 10.000 por asegurado". */
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
