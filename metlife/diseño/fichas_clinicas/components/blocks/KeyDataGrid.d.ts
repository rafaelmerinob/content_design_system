import * as React from 'react';
import { KeyDataCardProps } from '../primitives/KeyDataCard';

/** Fila de tarjetas de datos clave (siempre 2 en las fichas aprobadas). */
export interface KeyDataGridProps {
  items: KeyDataCardProps[];
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function KeyDataGrid(props: KeyDataGridProps): JSX.Element;
