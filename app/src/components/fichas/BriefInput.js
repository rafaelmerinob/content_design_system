'use client';
import { useState, useRef } from 'react';

const FICHA_TYPES = [
  { id: 'clinica', label: 'Ficha de Clínica' },
  { id: 'comercial', label: 'Ficha Comercial' },
  { id: 'tecnica', label: 'Ficha Técnica' },
];

export default function BriefInput({ onGenerate, isLoading }) {
  const [fichaType, setFichaType] = useState('clinica');
  const [productName, setProductName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [briefText, setBriefText] = useState('');
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleSubmit = () => {
    if (!briefText.trim() && !file) return;
    onGenerate({
      fichaType,
      productName,
      clinicName,
      briefText,
      file,
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (f) setFile(f);
  };

  return (
    <div className="brief-input">
      <div className="brief-header">
        <h3 className="brief-title">Brief de contenido</h3>
        <p className="brief-subtitle">Ingresa el contenido para generar la ficha</p>
      </div>

      <div className="brief-form">
        {/* Tipo de ficha */}
        <div className="field">
          <label className="field-label">Tipo de ficha</label>
          <div className="field-pills">
            {FICHA_TYPES.map(t => (
              <button
                key={t.id}
                className={`pill ${fichaType === t.id ? 'active' : ''}`}
                onClick={() => setFichaType(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Producto */}
        <div className="field">
          <label className="field-label">Nombre del producto</label>
          <input
            type="text"
            className="field-input"
            placeholder="Ej: Seguro Catastrófico Interclínica"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </div>

        {/* Clínica */}
        <div className="field">
          <label className="field-label">Clínica / Partner</label>
          <input
            type="text"
            className="field-input"
            placeholder="Ej: Interclínica"
            value={clinicName}
            onChange={e => setClinicName(e.target.value)}
          />
        </div>

        {/* Brief text */}
        <div className="field">
          <label className="field-label">Contenido del brief</label>
          <textarea
            className="field-textarea"
            rows={10}
            placeholder="Pega aquí el contenido del brief: títulos, datos clave, tablas, legales, condiciones generales..."
            value={briefText}
            onChange={e => setBriefText(e.target.value)}
          />
        </div>

        {/* File upload */}
        <div className="field">
          <label className="field-label">O sube un archivo</label>
          <div
            className="file-drop"
            onDrop={handleFileDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              style={{ display: 'none' }}
              accept=".doc,.docx,.pdf,.txt,.xlsx"
              onChange={handleFileDrop}
            />
            {file ? (
              <div className="file-selected">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/>
                </svg>
                <span>{file.name}</span>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); setFile(null); }}>✕</button>
              </div>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span className="file-drop-text">Arrastra un archivo o haz clic</span>
                <span className="file-drop-hint">Word, PDF, Excel o texto</span>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary generate-btn"
          onClick={handleSubmit}
          disabled={isLoading || (!briefText.trim() && !file)}
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              Generando ficha...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Generar con IA
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .brief-input {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .brief-header {
          margin-bottom: 24px;
        }
        .brief-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .brief-subtitle {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .brief-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .field-input {
          padding: 10px 14px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 14px;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .field-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-glow);
        }
        .field-textarea {
          padding: 12px 14px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-sans);
          line-height: 1.6;
          resize: vertical;
          outline: none;
          transition: border-color var(--transition-fast);
          min-height: 180px;
        }
        .field-textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-glow);
        }
        .field-pills {
          display: flex;
          gap: 6px;
        }
        .pill {
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 13px;
          font-weight: 500;
          font-family: var(--font-sans);
          border: 1px solid var(--border);
          background: var(--bg-input);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .pill:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }
        .pill.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }

        .file-drop {
          border: 2px dashed var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .file-drop:hover {
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .file-drop-text {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .file-drop-hint {
          font-size: 11px;
          color: var(--text-muted);
        }
        .file-selected {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--success);
          font-weight: 500;
        }
        .file-remove {
          margin-left: 8px;
          color: var(--text-muted);
          font-size: 14px;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--font-sans);
        }
        .file-remove:hover { color: var(--error); }

        .generate-btn {
          width: 100%;
          justify-content: center;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          margin-top: 8px;
        }
        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
