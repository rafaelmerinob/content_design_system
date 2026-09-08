'use client';
import { useState } from 'react';
import BriefInput from '@/components/fichas/BriefInput';
import FichaPreview from '@/components/fichas/FichaPreview';
import FichaRepository from '@/components/fichas/FichaRepository';
import { supabase } from '@/lib/supabase';

export default function FichaWorkspace() {
  const [fichaData, setFichaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'repo'

  const handleGenerate = async (files) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (files.briefFile) formData.append('briefFile', files.briefFile);
      if (files.photoFile) formData.append('photoFile', files.photoFile);
      if (files.logoFile) formData.append('logoFile', files.logoFile);
      if (files.title) formData.append('title', JSON.stringify(files.title));
      formData.append('fichaType', 'clinica');

      const res = await fetch('/api/claude', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${res.status}`);
      }

      const data = await res.json();
      setFichaData(data.ficha);

      // Guardar en Supabase de forma asíncrona sin bloquear la UI
      supabase.from('fichas').insert({
        client_id: 'metlife',
        product_name: data.ficha.title || 'Ficha sin título',
        clinic_name: data.ficha.partnerName || 'Clínica',
        ficha_type: 'clinica',
        brief_content: 'Contenido extraído del Word',
        generated_data: data.ficha,
      }).then(({ error }) => {
        if (error) console.error('Error saving ficha:', error);
      });

      supabase.from('activity_log').insert({
        action: 'Ficha generada',
        detail: `${data.ficha.title || 'Ficha sin título'} · ${data.ficha.partnerName || 'MetLife'}`,
        client_id: 'metlife',
        tool_id: 'fichas-clinicas',
        status: 'success'
      }).then(({ error }) => {
        if (error) console.error('Error saving log:', error);
      });

    } catch (err) {
      setError(err.message);
      console.error('Generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo data for preview testing
  const handleDemoLoad = () => {
    setFichaData({
      title: ['Seguro Catastrófico', 'Interclínica'],
      badge: 'Capital UF 10.000 por asegurado',
      intro: 'Un seguro que te entrega un respaldo económico ante gastos médicos de alto costo, hospitalarios y ambulatorios, para enfrentar con mayor tranquilidad los eventos de salud más complejos.',
      keyData: [
        { icon: 'ShieldProtection', value: 'UF 10.000', label: 'Capital asegurado por asegurado' },
        { icon: 'FinancialStrength', value: 'UF 40', label: 'Deducible hasta los 69 años' },
      ],
      tables: [{
        title: null,
        columns: [
          { key: 'e', label: 'Edad hasta', width: '46%' },
          { key: 'm', label: 'Monto máximo de reembolso (UF)', align: 'right' },
          { key: 'd', label: 'Deducible (UF)', align: 'right' },
        ],
        groups: [{ rows: [
          { e: '69 años', m: '10.000', d: '40' },
          { e: '70 - 74 años', m: '3.500', d: '150' },
          { e: '75 - 79 años', m: '3.500', d: '250' },
          { e: '80 años en adelante (*)', m: '3.500', d: '350' },
        ] }],
        notes: [],
      }, {
        title: 'Reembolsa prestaciones',
        columns: [
          { key: 'p', label: 'Prestaciones', width: '23.9%' },
          { key: 'c', label: 'Cobertura con bonificación ISAPRE/FONASA', width: '20%' },
          { key: 's', label: 'Cobertura sin bonificación ISAPRE/FONASA (0)', width: '24.1%' },
          { key: 't', label: 'Tope por prestación', width: '15.1%' },
        ],
        groups: [
          { label: 'Hospitalario', rows: [
            { p: 'Día Cama Medicina; UTI; UCI; Intermedio; Recuperación', c: '100%', s: '50%', t: 'Sin Tope' },
            { p: 'Servicio Hospitalario (1)', c: '100%', s: '50%', t: 'Sin Tope' },
            { p: 'Honorarios Médico Quirúrgicos', c: '100%', s: '50%', t: 'Sin Tope' },
          ] },
          { label: 'Ambulatorio', rows: [
            { p: 'Consultas Médicas', c: '100%', s: '50%', t: 'Sin Tope' },
            { p: 'Cirugía Ambulatoria', c: '100%', s: '50%', t: 'Sin Tope' },
            { p: 'Exámenes de Laboratorio e imágenes', c: '100%', s: '50%', t: 'Sin Tope' },
          ] },
        ],
        notes: [],
      }],
      conditions: [
        'Todos los asegurados deberán completar el formulario "Propuesta de Seguro" o "Solicitud de Incorporación al Seguro", y una DPS (Declaración Personal de Salud).',
        'La compañía aseguradora establecerá restricciones y limitaciones de cobertura respecto a situaciones o enfermedades preexistentes declaradas.',
        'La póliza no cubre situaciones y enfermedades preexistentes.',
      ],
      partnerName: 'Interclínica',
      partnerLogo: 'logo-interclinica.png',
    });
  };

  const handleRestart = () => {
    setFichaData(null);
    setError(null);
    setActiveTab('create');
  };

  const handleSelectFicha = (data) => {
    setFichaData(data);
    setActiveTab('create'); // Switch to editor view
  };

  return (
    <div className="workspace-container">
      <div className="workspace-tabs">
        <button 
          className={`workspace-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Generar Nueva
        </button>
        <button 
          className={`workspace-tab ${activeTab === 'repo' ? 'active' : ''}`}
          onClick={() => setActiveTab('repo')}
        >
          Repositorio
        </button>
      </div>

      {activeTab === 'repo' ? (
        <div className="workspace-repo-view">
          <FichaRepository onSelectFicha={handleSelectFicha} />
        </div>
      ) : (
        <div className="workspace">
          <div className="workspace-panel workspace-left">
            <BriefInput 
              onGenerate={handleGenerate} 
              isLoading={isLoading} 
              fichaData={fichaData}
              setFichaData={setFichaData}
              onRestart={handleRestart}
            />

            {error && (
              <div className="workspace-error">
                <strong>Error:</strong> {error}
              </div>
            )}

            {/* Demo button for testing (only show if not generated) */}
            {!fichaData && (
              <button
                className="btn btn-secondary"
                style={{ marginTop: 12, width: '100%', justifyContent: 'center', fontSize: 13 }}
                onClick={handleDemoLoad}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Cargar demo (Seguro Catastrófico)
              </button>
            )}
          </div>

          <div className="workspace-panel workspace-right">
            <FichaPreview fichaData={fichaData} setFichaData={setFichaData} />
          </div>
        </div>
      )}

      <style jsx>{`
        .workspace-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 240px);
          margin-top: 10px;
        }
        .workspace-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .workspace-tab {
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .workspace-tab:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }
        .workspace-tab.active {
          color: var(--accent);
          background: var(--bg-card);
          border-color: var(--border);
          box-shadow: var(--shadow-sm);
        }
        .workspace-repo-view {
          flex: 1;
          height: calc(100% - 50px);
        }
        .workspace {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 24px;
          height: calc(100% - 50px);
        }
        .workspace-panel {
          overflow-y: auto;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }
        .workspace-left {
          padding: 24px;
        }
        .workspace-right {
          position: relative;
        }
        .workspace-error {
          margin-top: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background: var(--error-soft);
          color: var(--error);
          font-size: 13px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
