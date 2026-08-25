import * as React from 'react';

/**
 * Tarjeta de dato clave sobre fondo verde: icono circular oscuro, cifra grande en display y descripcion corta.
 */
export interface KeyDataCardProps {
  /** Icono del set MetLife; ver BrandIcon. */
  icon?: 'ShieldProtection' | 'FinancialStrength' | 'Stethoscope' | 'Heart' | 'Family' | 'HelpingTheElderly';
  /** Cifra grande, ej. "UF 100". */
  value: React.ReactNode;
  /** Descripcion corta bajo la cifra, ej. "Capital asegurado por asegurado". */
  label: React.ReactNode;
  /** Ruta relativa a /assets. */
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function KeyDataCard(props: KeyDataCardProps): JSX.Element;
