import React from 'react';
import { LegalNotes } from './LegalNotes.jsx';

const CATEGORY_ORDER = ['var(--category-1)', 'var(--category-2)', 'var(--category-3)'];

/** Detecta llamadas (n) en encabezados y celdas y devuelve las que no tienen nota escrita. */
function findMissingNotes(columns, groups, notes) {
  const found = new Set();
  const scan = (v) => {
    if (typeof v !== 'string') return;
    const m = v.match(/\((\d+)\)/g);
    if (m) m.forEach((x) => found.add(x.slice(1, -1)));
  };
  columns.forEach((c) => scan(c.label));
  groups.forEach((g) => { scan(g.label); g.rows.forEach((r) => Object.values(r).forEach(scan)); });
  const covered = new Set();
  notes.forEach((n) => { if (typeof n === 'string') { const m = n.match(/^\s*\((\d+)\)/); if (m) covered.add(m[1]); } });
  return [...found].filter((n) => !covered.has(n)).sort((a, b) => a - b);
}

/** Tabla de ficha: encabezado Blue 950, zebra fria, rotulo de categoria horizontal.
 *  Si una celda cita una llamada (n) que no tiene nota escrita, la tabla rotula sola
 *  "\u26A0\uFE0F Faltan legales (n)" bajo la tabla: la ficha nunca sale con una llamada muda. */
export function DataTable({ columns = [], groups = [], notes = [], missingNotes, style }) {
  const missing = missingNotes || findMissingNotes(columns, groups, notes);
  const hasLabels = groups.some((g) => g.label);
  const single = groups.length === 1;
  let rowIndex = -1;
  const cell = (align, extra) => ({
    boxSizing: 'border-box',
    padding: 'var(--cell-padding-y) var(--cell-padding-x)',
    textAlign: align || 'left', verticalAlign: 'middle', overflowWrap: 'break-word',
    font: `var(--weight-regular) var(--text-table)/var(--text-table-lh) var(--font-body)`,
    color: 'var(--text-body)', ...extra,
  });
  return (
    <div style={style}>
      <div style={{ borderRadius: 'var(--radius-table)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            {hasLabels && <col style={{ width: 'var(--table-label-col)' }} />}
            {columns.map((c, i) => <col key={i} style={{ width: c.width }} />)}
          </colgroup>
          <thead>
            <tr style={{ background: 'var(--surface-table-header)' }}>
              {columns.map((c, i) => (
                <th key={i} colSpan={hasLabels && i === 0 ? 2 : 1}
                  style={cell(hasLabels && i === 0 ? 'center' : c.align, {
                    color: 'var(--text-on-dark)',
                    fontWeight: 'var(--weight-semibold)',
                    paddingTop: 'var(--space-3)', paddingBottom: 'var(--space-3)',
                  })}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g, gi) => g.rows.map((row, ri) => {
              rowIndex += 1;
              const zebra = rowIndex % 2 === 1;
              return (
                <tr key={gi + '-' + ri} style={{ background: zebra ? 'var(--surface-row-zebra)' : 'var(--surface-row)' }}>
                  {hasLabels && ri === 0 && (
                    <td rowSpan={g.rows.length} style={cell('center', {
                      background: g.color || (single ? 'var(--category-single)' : CATEGORY_ORDER[gi % 3]),
                      fontWeight: 'var(--weight-semibold)', writingMode: 'horizontal-tb',
                    })}>{g.label}</td>
                  )}
                  {columns.map((c, ci) => (
                    <td key={ci} style={cell(c.align, ci === 0 ? { fontWeight: 'var(--weight-regular)' } : null)}>{row[c.key]}</td>
                  ))}
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
      {(notes.length > 0 || missing.length > 0) && <LegalNotes notes={notes} missing={missing} />}
    </div>
  );
}
