import * as React from 'react';

/**
 * Lienzo de una ficha de producto. Ancho fijo (675,12 pt); el alto crece con el contenido y nunca supera una pagina.
 */
export interface FichaPageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FichaPage(props: FichaPageProps): JSX.Element;

/** Contenedor del cuerpo con los margenes laterales de la ficha. */
export interface FichaBodyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FichaBody(props: FichaBodyProps): JSX.Element;
