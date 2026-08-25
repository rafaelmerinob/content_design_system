import * as React from 'react';

/**
 * Cierre de la ficha: par de logos centrados unidos por "+" y banda oscura de alianza.
 */
export interface FichaFooterProps {
  /** Ruta del logo de la clinica. Variable por ficha: nunca se fija un nombre generico. */
  partnerLogo?: string;
  /** Nombre de la clinica; se usa como texto si no hay logo. */
  partnerName?: string;
  /** Linea de alianza, ej. "Alianza MetLife · Interclinica". */
  allianceLine?: React.ReactNode;
  /** Sitio, por defecto "metlife.cl". */
  link?: string;
  logo?: string;
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function FichaFooter(props: FichaFooterProps): JSX.Element;
