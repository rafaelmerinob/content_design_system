import * as React from 'react';

/**
 * Header de una ficha de producto: foto a sangre, degradado Blue 950, logo MetLife, badge de capital y titulo.
 */
export interface FichaHeaderProps {
  /** Titulo de producto, maximo 2 lineas. El salto se escribe con \n (el componente respeta pre-line). */
  title: React.ReactNode;
  /** Texto del badge translucido de capital. Opcional. */
  badge?: React.ReactNode;
  /** Ruta de la fotografia de fondo. */
  photo?: string;
  /**
   * object-position de la foto. Por defecto 'center bottom'.
   * REGLA: el texto ocupa el tercio izquierdo del header. Si un rostro o la accion principal
   * de la foto queda bajo el badge o el titular, desplazar la foto hacia la derecha
   * ('60% bottom', '70% bottom', 'right bottom') hasta liberar esa zona.
   */
  photoPosition?: string;
  /**
   * Acercamiento de la foto (1 = sin acercar). Se usa cuando la foto tiene una relacion de aspecto
   * parecida a la del header y por lo tanto no sobra ancho: object-position sola no mueve nada.
   * El acercamiento toma photoPosition como origen, asi que photoZoom={1.6} con
   * photoPosition="left center" corre el motivo hacia la derecha, liberando el texto.
   */
  photoZoom?: number;
  /** Ruta del logo en version blanca. */
  logo?: string;
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function FichaHeader(props: FichaHeaderProps): JSX.Element;
