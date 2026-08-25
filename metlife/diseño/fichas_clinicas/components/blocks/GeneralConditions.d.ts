import * as React from 'react';

/**
 * Bloque de condiciones generales: titulo en MAYUSCULA COMPLETA y bullets directo sobre blanco, sin marco.
 */
export interface GeneralConditionsProps {
  /** Por defecto "CONDICIONES GENERALES". Siempre en mayuscula completa. */
  title?: string;
  /** Bullets 1-2 fijos, 3o variable por producto, 4o variable por clinica. */
  items: React.ReactNode[];
  style?: React.CSSProperties;
}
export declare function GeneralConditions(props: GeneralConditionsProps): JSX.Element;
