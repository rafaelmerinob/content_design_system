import * as React from 'react';

/**
 * Tarjeta de listado en columnas para una nomina cerrada que la fuente entrega como lista
 * (enfermedades con deducible UF 0, exclusiones, prestaciones sin tope). Va precedida de un
 * SectionTitle, igual que una tabla.
 */
export interface BulletGridProps {
  /** Los items en el orden exacto de la fuente. No se reordenan ni se agrupan. */
  items: React.ReactNode[];
  /** Numero de columnas; 3 por defecto (2 si los nombres son largos). */
  columns?: number;
  style?: React.CSSProperties;
}
export declare function BulletGrid(props: BulletGridProps): JSX.Element;
