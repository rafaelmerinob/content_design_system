'use client';
import { useState } from 'react';
import BriefInput from '@/components/fichas/BriefInput';
import FichaPreview from '@/components/fichas/FichaPreview';
import { supabase } from '@/lib/supabase';

export default function FichaWorkspace() {
  const [fichaData, setFichaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (brief) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: brief.briefText,
          productName: brief.productName,
          clinicName: brief.clinicName,
          fichaType: brief.fichaType,
        }),
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
        product_name: brief.productName,
        clinic_name: brief.clinicName,
        ficha_type: brief.fichaType,
        brief_content: brief.briefText,
        generated_data: data.ficha,
      }).catch(err => console.error('Error saving ficha:', err));

      supabase.from('activity_log').insert({
        action: 'Ficha generada',
        detail: `${brief.productName || 'Ficha sin título'} · ${brief.clinicName || 'MetLife'}`,
        client_id: 'metlife',
        tool_id: 'fichas-clinicas',
        status: 'success'
      }).catch(err => console.error('Error saving log:', err));

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

  return (
    <div className="workspace">
      <div className="workspace-panel workspace-left">
        <BriefInput onGenerate={handleGenerate} isLoading={isLoading} />

        {error && (
          <div className="workspace-error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Demo button for testing */}
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
      </div>

      <div className="workspace-panel workspace-right">
        <FichaPreview fichaData={fichaData} />
      </div>

      <style jsx>{`
        .workspace {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 0;
          height: calc(100vh - var(--header-height) - 56px);
          margin: -28px -32px;
          border-top: 1px solid var(--border);
        }
        .workspace-panel {
          overflow-y: auto;
        }
        .workspace-left {
          padding: 24px;
          border-right: 1px solid var(--border);
          background: var(--bg-secondary);
        }
        .workspace-right {
          background: var(--bg-card);
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
