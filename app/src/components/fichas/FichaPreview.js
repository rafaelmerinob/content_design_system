'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * FichaPreview renders the MetLife ficha using the existing Design System bundle.
 * It loads _ds_bundle.js inside an iframe to keep the ficha's CSS isolated from the app.
 */
export default function FichaPreview({ fichaData, setFichaData }) {
  const iframeRef = useRef(null);
  const [viewMode, setViewMode] = useState('preview');
  const [jsonText, setJsonText] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  // Parse photo position
  const [photoX, setPhotoX] = useState(50);
  const [photoY, setPhotoY] = useState(50);
  const [photoZoom, setPhotoZoom] = useState(1);

  // Initialize values when data changes
  useEffect(() => {
    if (fichaData) {
      setJsonText(JSON.stringify(fichaData, null, 2));
      
      // Parse "X% Y%" from photoPosition if it exists
      if (fichaData.photoPosition) {
        const parts = String(fichaData.photoPosition).split(' ');
        if (parts.length === 2) {
          const x = parseInt(parts[0]);
          const y = parseInt(parts[1]);
          if (!isNaN(x)) setPhotoX(x);
          if (!isNaN(y)) setPhotoY(y);
        }
      }
      if (fichaData.photoZoom) {
        setPhotoZoom(parseFloat(fichaData.photoZoom));
      }
    }
  }, [fichaData]);

  // Handle photo control changes
  const handlePhotoChange = (key, value) => {
    if (key === 'x') {
      setPhotoX(value);
      updateFichaData({ ...fichaData, photoPosition: `${value}% ${photoY}%` });
    } else if (key === 'y') {
      setPhotoY(value);
      updateFichaData({ ...fichaData, photoPosition: `${photoX}% ${value}%` });
    } else if (key === 'zoom') {
      setPhotoZoom(value);
      updateFichaData({ ...fichaData, photoZoom: value });
    }
  };

  const updateFichaData = (newData) => {
    if (setFichaData) setFichaData(newData);
  };

  const handleJsonSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      updateFichaData(parsed);
      setViewMode('preview');
    } catch (e) {
      alert('Error de formato JSON: ' + e.message);
    }
  };

  const handleDragStart = (e, index, type) => {
    setDraggedItem({ index, type });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index, type) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type !== type || draggedItem.index === index) return;
    
    const newData = { ...fichaData };
    const list = [...newData[type]];
    const item = list.splice(draggedItem.index, 1)[0];
    list.splice(index, 0, item);
    
    updateFichaData(newData);
    setDraggedItem({ index, type });
  };
  
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  useEffect(() => {
    if (!fichaData || !iframeRef.current || viewMode !== 'preview') return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Build the HTML that renders the ficha using the DS components
    const html = buildFichaHTML(fichaData);
    doc.open();
    doc.write(html);
    doc.close();
  }, [fichaData, viewMode]);

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
        <div className="preview-tabs">
          <button 
            className={`preview-tab ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
          >
            Vista Previa
          </button>
          <button 
            className={`preview-tab ${viewMode === 'reorder' ? 'active' : ''}`}
            onClick={() => setViewMode('reorder')}
          >
            Ordenar
          </button>
          <button 
            className={`preview-tab ${viewMode === 'json' ? 'active' : ''}`}
            onClick={() => setViewMode('json')}
          >
            Editar JSON
          </button>
        </div>
        
        <div className="preview-toolbar-actions">
          {viewMode === 'json' ? (
            <button className="btn btn-primary" onClick={handleJsonSave} style={{ fontSize: 12, padding: '6px 12px' }}>
              Aplicar Cambios
            </button>
          ) : (
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: 12, padding: '6px 12px' }}
              disabled={isExporting}
              onClick={async () => {
                try {
                  setIsExporting(true);
                  
                  // Capture the current state of the iframe directly so manual inline edits are preserved
                  const iframe = iframeRef.current;
                  if (!iframe) throw new Error('No iframe found');
                  const doc = iframe.contentDocument || iframe.contentWindow.document;
                  
                  // Cleanup contenteditable attributes before printing
                  const editableElements = doc.querySelectorAll('[contenteditable]');
                  editableElements.forEach(el => {
                    el.removeAttribute('contenteditable');
                    el.style.boxShadow = '';
                  });
                  
                  const html = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
                  
                  // Re-enable contenteditable
                  setTimeout(() => {
                    const win = iframe.contentWindow;
                    if (win && win.enableInlineEditing) win.enableInlineEditing();
                  }, 100);
                  
                  const response = await fetch('/api/pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ html })
                  });
                  
                  if (!response.ok) throw new Error('Error al generar PDF');
                  
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${fichaData.title?.[0] || 'Ficha'}.pdf`.replace(/\\s+/g, '_');
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                  console.error(error);
                  alert('Hubo un error al exportar el PDF directo.');
                } finally {
                  setIsExporting(false);
                }
              }}
            >
              {isExporting ? 'Generando...' : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Descargar PDF
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Photo controls have been moved to BriefInput Edit Panel */}

      <div className="preview-scroll">
        {viewMode === 'preview' ? (
          <iframe
            ref={iframeRef}
            className="preview-iframe"
            title="Ficha Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : viewMode === 'reorder' ? (
          <div className="reorder-container">
            <h3>Ordenar Elementos</h3>
            <p className="reorder-desc">Arrastra los elementos para cambiar su orden.</p>
            
            <div className="reorder-section">
              <h4>Datos Clave (Key Data)</h4>
              {fichaData.keyData?.map((item, idx) => (
                <div
                  key={`keyData-${idx}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx, 'keyData')}
                  onDragOver={(e) => handleDragOver(e, idx, 'keyData')}
                  onDragEnd={handleDragEnd}
                  className="reorder-item"
                >
                  <div className="drag-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </div>
                  <div className="item-content">
                    <strong>{item.label}</strong>: {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="reorder-section">
              <h4>Tablas</h4>
              {fichaData.tables?.map((table, idx) => (
                <div
                  key={`tables-${idx}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx, 'tables')}
                  onDragOver={(e) => handleDragOver(e, idx, 'tables')}
                  onDragEnd={handleDragEnd}
                  className="reorder-item"
                >
                  <div className="drag-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </div>
                  <div className="item-content">
                    <strong>Tabla {idx + 1}</strong>: {table.title || 'Sin título'}
                  </div>
                </div>
              ))}
            </div>

            <div className="reorder-section">
              <h4>Condiciones Generales</h4>
              {fichaData.conditions?.map((cond, idx) => (
                <div
                  key={`cond-${idx}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx, 'conditions')}
                  onDragOver={(e) => handleDragOver(e, idx, 'conditions')}
                  onDragEnd={handleDragEnd}
                  className="reorder-item"
                >
                  <div className="drag-handle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </div>
                  <div className="item-content">
                    {cond.length > 80 ? cond.substring(0, 80) + '...' : cond}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <textarea 
            className="json-editor"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
          />
        )}
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
          padding: 8px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
          background: var(--bg-card);
        }
        .preview-tabs {
          display: flex;
          gap: 4px;
        }
        .preview-tab {
          background: transparent;
          border: none;
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: 4px;
          cursor: pointer;
        }
        .preview-tab.active {
          background: var(--surface-100);
          color: var(--text-primary);
        }
        .photo-controls {
          display: flex;
          gap: 16px;
          padding: 10px 16px;
          background: var(--bg-input);
          border-bottom: 1px solid var(--border);
          align-items: center;
          font-size: 12px;
        }
        .photo-controls-label {
          font-weight: 600;
          color: var(--text-secondary);
        }
        .photo-controls label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .photo-controls input[type="range"] {
          width: 80px;
        }
        .json-editor {
          width: 100%;
          height: 100%;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          font-family: monospace;
          font-size: 13px;
          resize: none;
          background: var(--bg-input);
          color: var(--text-primary);
          line-height: 1.5;
        }
        .preview-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-primary);
          padding: 24px;
        }
        .preview-iframe {
          width: 900px;
          min-height: 1200px;
          border: none;
          background: white;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .reorder-container {
          width: 100%;
          max-width: 600px;
          background: white;
          padding: 32px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .reorder-container h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }
        .reorder-desc {
          color: var(--text-muted);
          font-size: 14px;
          margin: 0 0 24px 0;
        }
        .reorder-section {
          margin-bottom: 32px;
        }
        .reorder-section h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
        }
        .reorder-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 6px;
          margin-bottom: 8px;
          cursor: grab;
          transition: all 0.2s;
        }
        .reorder-item:active {
          cursor: grabbing;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          border-color: var(--text-secondary);
        }
        .drag-handle {
          color: var(--text-muted);
          display: flex;
          cursor: grab;
        }
        .item-content {
          font-size: 13px;
          color: var(--text-primary);
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

  // Build bullet grid sections
  const bulletGridSections = (data.bulletGrids || []).map(b => {
    const sectionTitle = b.title
      ? `React.createElement(DS.SectionTitle, null, "${escapeJS(b.title)}")`
      : 'null';
    
    const items = JSON.stringify(b.items || []);

    return `
      React.createElement("div", { style: { display: "grid", gap: "var(--gap-section-title)" } },
        ${sectionTitle},
        React.createElement(DS.BulletGrid, { items: ${items} })
      )
    `;
  }).join(',\n');

  const keyDataItems = JSON.stringify(data.keyData || []);
  const conditions = JSON.stringify(data.conditions || [
    'Todos los asegurados deberán completar el formulario "Propuesta de Seguro" o "Solicitud de Incorporación al Seguro", y una DPS (Declaración Personal de Salud).',
    'La compañía aseguradora establecerá restricciones y limitaciones de cobertura respecto a situaciones o enfermedades preexistentes declaradas.',
    'La póliza no cubre situaciones y enfermedades preexistentes.',
  ]);

  // Combine sections for the React.createElement call
  const middleSections = [tableSections, bulletGridSections].filter(Boolean).join(',\n          ') || 'null';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="/fichas-clinicas/styles.css">
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"><\/script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"><\/script>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #ffffff; }
  </style>
</head>
<body class="print-exact">
  <style>
    /* Force background images and colors to print */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Regla Biblia: Sin bordes de 1px en tablas, solo zebra */
    table td, table th {
      border: none !important;
    }
  </style>
  <div id="root"></div>
  <script src="/fichas-clinicas/_ds_bundle.js"><\/script>
  <script>
    (function() {
      var DS = window.FichasMetLifeDesignSystem_6917a8;
      if (!DS) { document.getElementById('root').innerHTML = '<p style="padding:40px;color:red">Error: Design System bundle not loaded</p>'; return; }

      var assetBase = "${assetBase}";
      var partnerLogoUrl = "${escapeJS(data.partnerLogo || '')}" 
        ? ("${escapeJS(data.partnerLogo || '')}".startsWith('/') ? "${escapeJS(data.partnerLogo || '')}" : assetBase + "${escapeJS(data.partnerLogo || '')}")
        : assetBase + "logo-interclinica.png";
      
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
          title: titleEl,
          photo: "${escapeJS(data.headerPhoto || '')}" || undefined,
          photoPosition: "${escapeJS(data.photoPosition || '')}" || undefined,
          photoZoom: ${data.photoZoom ? Number(data.photoZoom) : 1}
        }),
        React.createElement(DS.FichaBody, null,
          React.createElement(DS.IntroParagraph, null, "${escapeJS(data.intro || '')}"),
          React.createElement(DS.KeyDataGrid, {
            assetBase: assetBase,
            items: ${keyDataItems}
          }),
          ${middleSections},
          React.createElement(DS.GeneralConditions, { items: ${conditions} })
        ),
        React.createElement(DS.FichaFooter, {
          assetBase: assetBase,
          partnerLogo: partnerLogoUrl,
          partnerName: "${escapeJS(data.partnerName || 'Interclínica')}",
          allianceLine: "Alianza MetLife · ${escapeJS(data.partnerName || 'Interclínica')}"
        })
      );

      ReactDOM.createRoot(document.getElementById('root')).render(app);
      
      // Inject inline editing capabilities
      window.enableInlineEditing = function() {
        var elements = document.querySelectorAll('h1, h2, h3, h4, p, span, td, th, li, strong, b');
        elements.forEach(function(el) {
          // Only make elements editable if they contain text directly or single text nodes
          if (el.children.length === 0 || (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)) {
            el.setAttribute('contenteditable', 'true');
            el.style.outline = 'none';
            el.style.transition = 'box-shadow 0.2s';
            
            el.addEventListener('focus', function() { 
              el.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.4)'; 
              el.style.borderRadius = '2px';
            });
            el.addEventListener('blur', function() { 
              el.style.boxShadow = 'none'; 
            });
            // Prevent Enter from creating new divs in some elements
            el.addEventListener('keydown', function(e) {
              if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertLineBreak');
              }
            });
          }
        });
      };
      
      setTimeout(window.enableInlineEditing, 500);

      window.addEventListener('message', function(e) {
        if (e.data === 'print') {
          window.print();
        }
      });
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
