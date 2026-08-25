import * as React from 'react';

/** Bloque de legales / notas al pie de una tabla. */
export interface LegalNotesProps {
  /** Un item por linea, ya numerado en formato "(1) ...". Si el Word numera desde (0), se respeta ese orden. */
  notes: React.ReactNode[];
  /** Llamadas (n) sin texto legal: se rotulan como "Faltan legales (1) (2)" con icono de aviso. */
  missing?: string[];
  style?: React.CSSProperties;
}
export declare function LegalNotes(props: LegalNotesProps): JSX.Element;
