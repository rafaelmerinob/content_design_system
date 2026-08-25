import * as React from 'react';

export interface DataTableColumn {
  /** Clave del campo en cada fila. */
  key: string;
  /** Encabezado visible de la columna. */
  label: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Ancho CSS opcional, ej. "18%". */
  width?: string;
}
export interface DataTableGroup {
  /** Rotulo de categoria, siempre horizontal. Omitir en tablas sin rotulo. */
  label?: React.ReactNode;
  /** Color del rotulo; por defecto sigue el orden fijo Blue 200 -> Teal 200 -> Warm Gray 200. */
  color?: string;
  rows: Record<string, React.ReactNode>[];
}

/**
 * Tabla de coberturas/primas/edades de una ficha de producto.
 */
export interface DataTableProps {
  columns: DataTableColumn[];
  /** Un grupo = una categoria. Una sola categoria usa el rotulo gris neutro. */
  groups: DataTableGroup[];
  /** Notas al pie en formato "(n) texto", ancho completo de la tabla. */
  notes?: React.ReactNode[];
  /**
   * Llamadas (n) citadas en la tabla cuyo texto legal no venia en la fuente. Por defecto se detectan
   * solas comparando las llamadas de encabezados y celdas contra `notes`, y se rotulan bajo la tabla
   * como "Faltan legales (1) (2)". Pasar un array vacio para silenciar el aviso.
   */
  missingNotes?: string[];
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
