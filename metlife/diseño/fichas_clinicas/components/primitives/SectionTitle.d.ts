import * as React from 'react';

/** Titulo de seccion de la ficha, con vineta cuadrada verde a la izquierda. */
export interface SectionTitleProps {
  /** Texto del titulo, sentence case, sin punto final. */
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function SectionTitle(props: SectionTitleProps): JSX.Element;
