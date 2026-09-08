'use client';
import { useState, useRef, useEffect } from 'react';

export default function BriefInput({ onGenerate, isLoading, fichaData, setFichaData, onRestart }) {
  const [step, setStep] = useState(1);
  const [briefFile, setBriefFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [fichaTitle, setFichaTitle] = useState('');
  const [fichaTitle2, setFichaTitle2] = useState('');
  
  const briefRef = useRef(null);
  const photoRef = useRef(null);
  const logoRef = useRef(null);

  const [photoX, setPhotoX] = useState(50);
  const [photoY, setPhotoY] = useState(50);
  const [photoZoom, setPhotoZoom] = useState(1);

  useEffect(() => {
    if (fichaData) {
      if (fichaData.photoPosition) {
        const parts = String(fichaData.photoPosition).split(' ');
        if (parts.length === 2) {
          setPhotoX(parseInt(parts[0]) || 50);
          setPhotoY(parseInt(parts[1]) || 50);
        }
      }
      if (fichaData.photoZoom) {
        setPhotoZoom(parseFloat(fichaData.photoZoom) || 1);
      }
    }
  }, [fichaData]);

  const handlePhotoChange = (key, value) => {
    if (key === 'x') {
      setPhotoX(value);
      setFichaData({ ...fichaData, photoPosition: `${value}% ${photoY}%` });
    } else if (key === 'y') {
      setPhotoY(value);
      setFichaData({ ...fichaData, photoPosition: `${photoX}% ${value}%` });
    } else if (key === 'zoom') {
      setPhotoZoom(value);
      setFichaData({ ...fichaData, photoZoom: value });
    }
  };

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!briefFile || !fichaTitle.trim()) return;
    
    // Combine titles into array if subtitle is provided
    const titleData = fichaTitle2.trim() ? [fichaTitle.trim(), fichaTitle2.trim()] : fichaTitle.trim();
    
    onGenerate({
      briefFile,
      photoFile,
      logoFile,
      title: titleData
    });
  };

  const createDropHandler = (setter, autoNext = true) => (e) => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (f) {
      setter(f);
      if (autoNext) setTimeout(handleNextStep, 400);
    }
  };

  const renderDropzone = (label, hint, accept, file, setter, inputRef, isActive) => {
    if (!isActive && !file) return null;

    return (
      <div className={`field ${isActive ? 'field-active' : 'field-completed'}`}>
        <label className="field-label">{label}</label>
        
        <div 
          className={`generic-dropzone ${file ? 'has-file' : ''}`}
          onDrop={createDropHandler(setter, !file)}
          onDragOver={e => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            accept={accept}
            onChange={createDropHandler(setter, !file)}
          />
          
          {file ? (
            <div className="file-selected">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="16 13 12 17 8 13"/>
              </svg>
              <span className="file-name">{file.name}</span>
              <button 
                className="file-remove" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setter(null); 
                  if (isActive) setStep(Math.max(1, step - 1));
                }}>
                ✕
              </button>
            </div>
          ) : (
            <div className="generic-dropzone-content">
              <div className="generic-dropzone-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#8E9BB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                  <path d="M12 15V9"/>
                  <path d="m9 12 3-3 3 3"/>
                </svg>
              </div>
              <p className="generic-dropzone-title">Drag&Drop files here</p>
              <p className="generic-dropzone-or">or</p>
              <button className="generic-dropzone-btn" onClick={() => inputRef.current?.click()}>
                Browse Files
              </button>
              {hint && <p className="generic-dropzone-hint">{hint}</p>}
            </div>
          )}
        </div>
        
        {!file && isActive && (
          <button className="btn-skip" onClick={handleNextStep}>Omitir paso</button>
        )}
      </div>
    );
  };

  // --- EDIT MODE (Post Generation) ---
  if (fichaData) {
    return (
      <div className="edit-panel">
        <div className="edit-header">
          <h3 className="edit-title">Ajustes de Ficha</h3>
          <p className="edit-subtitle">Edita los textos haciendo clic directamente en la vista previa. Usa los controles abajo para encuadrar la imagen.</p>
        </div>

        <div className="edit-section">
          <h4>Encuadre de Fotografía</h4>
          <div className="slider-group">
            <label>Posición Horizontal (X)</label>
            <div className="slider-row">
              <input type="range" min="0" max="100" value={photoX} onChange={(e) => handlePhotoChange('x', parseInt(e.target.value))} />
              <span>{photoX}%</span>
            </div>
          </div>
          <div className="slider-group">
            <label>Posición Vertical (Y)</label>
            <div className="slider-row">
              <input type="range" min="0" max="100" value={photoY} onChange={(e) => handlePhotoChange('y', parseInt(e.target.value))} />
              <span>{photoY}%</span>
            </div>
          </div>
          <div className="slider-group">
            <label>Zoom</label>
            <div className="slider-row">
              <input type="range" min="1" max="3" step="0.1" value={photoZoom} onChange={(e) => handlePhotoChange('zoom', parseFloat(e.target.value))} />
              <span>{photoZoom}x</span>
            </div>
          </div>
        </div>

        <div className="edit-actions">
          <button className="btn btn-danger btn-restart" onClick={onRestart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Comenzar de nuevo
          </button>
        </div>

        <style jsx>{`
          .edit-panel { display: flex; flex-direction: column; height: 100%; }
          .edit-header { margin-bottom: 24px; }
          .edit-title { font-size: 18px; font-weight: 600; color: var(--text-primary); }
          .edit-subtitle { font-size: 13px; color: var(--text-muted); margin-top: 6px; line-height: 1.5; }
          .edit-section { padding: 20px; background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border); }
          .edit-section h4 { margin: 0 0 16px 0; font-size: 14px; color: var(--text-secondary); }
          .slider-group { margin-bottom: 16px; }
          .slider-group:last-child { margin-bottom: 0; }
          .slider-group label { display: block; font-size: 12px; font-weight: 500; color: var(--text-muted); margin-bottom: 6px; }
          .slider-row { display: flex; align-items: center; gap: 12px; }
          .slider-row input[type="range"] { flex: 1; accent-color: var(--accent); }
          .slider-row span { font-size: 12px; font-variant-numeric: tabular-nums; width: 36px; text-align: right; color: var(--text-primary); font-weight: 500; }
          .edit-actions { margin-top: auto; padding-top: 24px; }
          .btn-restart { width: 100%; justify-content: center; padding: 12px; font-size: 14px; background: var(--error-soft); color: var(--error); border: 1px solid transparent; cursor: pointer; border-radius: var(--radius-md); display: flex; align-items: center; gap: 8px;}
          .btn-restart:hover { background: var(--error); color: white; }
        `}</style>
      </div>
    );
  }

  // --- UPLOAD MODE (Stepper) ---
  return (
    <div className="brief-input">
      <div className="brief-header">
        <h3 className="brief-title">Generar nueva ficha</h3>
        <p className="brief-subtitle">Completa los pasos para generar el documento.</p>
      </div>

      <div className="stepper-indicator">
        <div className={`step-dot ${step >= 1 ? 'active' : ''}`} />
        <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 2 ? 'active' : ''}`} />
        <div className={`step-line ${step >= 3 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
        <div className={`step-line ${step >= 4 ? 'active' : ''}`} />
        <div className={`step-dot ${step >= 4 ? 'active' : ''}`} />
      </div>

      <div className="brief-form">
        {step >= 1 && renderDropzone('Paso 1: Brief de contenido (Requerido)', '', '.docx', briefFile, setBriefFile, briefRef, step === 1)}
        {step >= 2 && renderDropzone('Paso 2: Foto del Header (Opcional)', '', 'image/*', photoFile, setPhotoFile, photoRef, step === 2)}
        {step >= 3 && renderDropzone('Paso 3: Logo del Partner (Opcional)', '', 'image/*', logoFile, setLogoFile, logoRef, step === 3)}

        {step >= 4 && (
          <div className={`field ${step === 4 ? 'field-active' : 'field-completed'}`}>
            <label className="field-label">Paso 4: Títulos de la Ficha</label>
            <input 
              type="text" 
              className="text-input" 
              placeholder="Línea 1 (Ej. Seguro de Vida)" 
              value={fichaTitle}
              onChange={(e) => setFichaTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fichaTitle.trim() && document.getElementById('title2-input')?.focus()}
              autoFocus
            />
            <input 
              id="title2-input"
              type="text" 
              className="text-input mt-2" 
              placeholder="Línea 2 / Subtítulo (Opcional)" 
              value={fichaTitle2}
              onChange={(e) => setFichaTitle2(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fichaTitle.trim() && setStep(5)}
            />
            {step === 4 && fichaTitle.trim() && (
              <button className="btn btn-secondary mt-2" onClick={() => setStep(5)} style={{ alignSelf: 'flex-start' }}>Continuar</button>
            )}
          </div>
        )}

        {step >= 5 && (
          <div className="generate-wrapper">
            <button
              className="btn btn-primary generate-btn"
              onClick={handleSubmit}
              disabled={isLoading || !briefFile || !fichaTitle.trim()}
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
        )}
      </div>

      <style jsx global>{`
        .brief-input {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .brief-header {
          margin-bottom: 20px;
        }
        .brief-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .brief-subtitle {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        
        .stepper-indicator {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          padding: 0 8px;
        }
        .step-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--surface-200);
          border: 2px solid var(--border);
          flex-shrink: 0;
          transition: all 0.3s;
        }
        .step-dot.active {
          background: var(--accent);
          border-color: var(--accent);
        }
        .step-line {
          flex: 1;
          height: 2px;
          background: var(--border);
          transition: all 0.3s;
        }
        .step-line.active {
          background: var(--accent);
        }

        .brief-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.3s;
        }
        .field-completed {
          opacity: 0.6;
        }
        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        
        /* EXACT match to user's drag&drop reference image */
        .generic-dropzone {
          border: 2px dashed #C3C8D4;
          border-radius: 6px;
          background: #F8FAFC;
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .generic-dropzone.has-file {
          border-style: solid;
          border-color: var(--border);
          padding: 16px;
          background: var(--bg-input);
        }
        .field-active .generic-dropzone:not(.has-file) {
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }
        
        .generic-dropzone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .generic-dropzone-icon {
          margin-bottom: 12px;
        }
        .generic-dropzone-title {
          font-size: 16px;
          color: #64748B;
          font-weight: 500;
          margin: 0 0 8px 0;
        }
        .generic-dropzone-or {
          font-size: 13px;
          color: #94A3B8;
          margin: 0 0 16px 0;
        }
        .generic-dropzone-btn {
          border: 1px solid #3B82F6;
          color: #3B82F6;
          background: transparent;
          border-radius: 4px;
          padding: 8px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .generic-dropzone-btn:hover {
          background: #EFF6FF;
        }
        .generic-dropzone-hint {
          font-size: 12px;
          color: #94A3B8;
          margin-top: 12px;
        }

        .file-selected {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 500;
          width: 100%;
        }
        .file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .file-remove {
          color: var(--text-muted);
          font-size: 14px;
          cursor: pointer;
          background: var(--surface-100);
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
        }
        .file-remove:hover { color: var(--error); background: var(--error-soft); }

        .btn-skip {
          align-self: flex-start;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 12px;
          cursor: pointer;
          padding: 4px 0;
          text-decoration: underline;
        }
        .btn-skip:hover { color: var(--text-primary); }

        .text-input {
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
        }
        .text-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-soft);
        }

        .generate-wrapper {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .generate-btn {
          width: 100%;
          justify-content: center;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
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
        .mt-2 { margin-top: 8px; }
      `}</style>
    </div>
  );
}
