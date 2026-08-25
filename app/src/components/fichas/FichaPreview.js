'use client';
import { useEffect, useRef } from 'react';

/**
 * FichaPreview renders the MetLife ficha using the existing Design System bundle.
 * It loads _ds_bundle.js inside an iframe to keep the ficha's CSS isolated from the app.
 */
export default function FichaPreview({ fichaData }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!fichaData || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Build the HTML that renders the ficha using the DS components
    const html = buildFichaHTML(fichaData);
    doc.open();
    doc.write(html);
    doc.close();
  }, [fichaData]);

  if (!fichaData) {
    return (
      <div className="preview-empty">
        <div className="preview-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        </div>
        <h4 className="preview-empty-title">Vista previa de la ficha</h4>
        <p className="preview-empty-text">
          Ingresa un brief de contenido y genera la ficha para verla aquí
        </p>

        <style jsx>{`
          .preview-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 500px;
            text-align: center;
            gap: 12px;
          }
          .preview-empty-icon {
            width: 80px;
            height: 80px;
            border-radius: var(--radius-lg);
            background: rgba(255,255,255,0.03);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
          }
          .preview-empty-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-secondary);
          }
          .preview-empty-text {
            font-size: 13px;
            color: var(--text-muted);
            max-width: 260px;
            line-height: 1.5;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <div className="preview-toolbar">
        <span className="preview-toolbar-label">Vista previa</span>
        <div className="preview-toolbar-actions">
          <button className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Exportar PDF
          </button>
        </div>
      </div>
      <div className="preview-scroll">
        <iframe
          ref={iframeRef}
          className="preview-iframe"
          title="Ficha Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <style jsx>{`
        .preview-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .preview-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .preview-toolbar-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .preview-toolbar-actions {
          display: flex;
          gap: 8px;
        }
        .preview-scroll {
          flex: 1;
          overflow: auto;
          background: #DCE1E6;
          padding: 24px;
          display: flex;
          justify-content: center;
        }
        .preview-iframe {
          width: 900px;
          min-height: 1200px;
          border: none;
          background: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

function buildFichaHTML(data) {
  const assetBase = '/fichas-clinicas/assets/';
  const title = Array.isArray(data.title)
    ? data.title.map((l, i) => `${i > 0 ? '<br/>' : ''}${l}`).join('')
    : data.title;

  // Build table sections
  const tableSections = (data.tables || []).map(t => {
    const sectionTitle = t.title
      ? `React.createElement(DS.SectionTitle, null, "${escapeJS(t.title)}")`
      : 'null';

    const columns = JSON.stringify(t.columns || []);
    const groups = JSON.stringify(t.groups || []);
    const notes = JSON.stringify(t.notes || []);

    return `
      React.createElement("div", { style: { display: "grid", gap: "var(--gap-section-title)" } },
        ${sectionTitle},
        React.createElement(DS.DataTable, {
          columns: ${columns},
          groups: ${groups},
          notes: ${notes}
        })
      )
    `;
  }).join(',\n');

  const keyDataItems = JSON.stringify(data.keyData || []);
  const conditions = JSON.stringify(data.conditions || [
    'Todos los asegurados deberán completar el formulario "Propuesta de Seguro" o "Solicitud de Incorporación al Seguro", y una DPS (Declaración Personal de Salud).',
    'La compañía aseguradora establecerá restricciones y limitaciones de cobertura respecto a situaciones o enfermedades preexistentes declaradas.',
    'La póliza no cubre situaciones y enfermedades preexistentes.',
  ]);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/fichas-clinicas/styles.css">
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"><\/script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"><\/script>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #DCE1E6; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="/fichas-clinicas/_ds_bundle.js"><\/script>
  <script>
    (function() {
      var DS = window.FichasMetLifeDesignSystem_6917a8;
      if (!DS) { document.getElementById('root').innerHTML = '<p style="padding:40px;color:red">Error: Design System bundle not loaded</p>'; return; }

      var assetBase = "${assetBase}";
      var titleParts = ${JSON.stringify(Array.isArray(data.title) ? data.title : [data.title])};
      var titleEl = titleParts.map(function(l, i) {
        return React.createElement(React.Fragment, { key: i },
          i > 0 ? React.createElement("br") : null,
          l
        );
      });

      var app = React.createElement(DS.FichaPage, null,
        React.createElement(DS.FichaHeader, {
          assetBase: assetBase,
          badge: "${escapeJS(data.badge || '')}",
          title: titleEl
        }),
        React.createElement(DS.FichaBody, null,
          React.createElement(DS.IntroParagraph, null, "${escapeJS(data.intro || '')}"),
          React.createElement(DS.KeyDataGrid, {
            assetBase: assetBase,
            items: ${keyDataItems}
          }),
          ${tableSections || 'null'},
          React.createElement(DS.GeneralConditions, { items: ${conditions} })
        ),
        React.createElement(DS.FichaFooter, {
          assetBase: assetBase,
          partnerLogo: assetBase + "${escapeJS(data.partnerLogo || 'logo-interclinica.png')}",
          partnerName: "${escapeJS(data.partnerName || 'Interclínica')}",
          allianceLine: "Alianza MetLife · ${escapeJS(data.partnerName || 'Interclínica')}"
        })
      );

      ReactDOM.createRoot(document.getElementById('root')).render(app);
    })();
  <\/script>
</body>
</html>`;
}

function escapeJS(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}
