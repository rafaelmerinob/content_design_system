import * as React from 'react';

/** Icono circular de marca MetLife. Tres formas de nombrarlo:
 *  - set original PNG: 'ShieldProtection' | 'FinancialStrength' | 'Stethoscope' | 'Heart' | 'Family' | 'HelpingTheElderly'
 *  - biblioteca SVG por nombre kebab + prop `set`: name="medical-stethoscope" set="category"
 *  - ruta explicita: name="product/dental" */
export interface BrandIconProps {
  /** Nombre del icono. PascalCase = set PNG original; kebab-case = biblioteca SVG; 'set/nombre' = ruta explicita. */
  name?: string;
  /** Carpeta de la biblioteca SVG cuando `name` es kebab-case. 'category' (circulo Warm Gray, glifo azul) o 'product' (circulo Blue 950, glifo blanco). */
  set?: 'category' | 'product';
  /** Solo para el set PNG original: 'light' usa circulo gris con glifo azul (ShieldProtection y Family). */
  variant?: 'dark' | 'light';
  /** Diametro; por defecto var(--icon-circle-size) = 36pt. */
  size?: string | number;
  /** Ruta relativa a /assets desde el HTML que monta el componente. */
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function BrandIcon(props: BrandIconProps): JSX.Element;
