'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function FichaRepository({ onSelectFicha }) {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFichas() {
      const { data, error } = await supabase
        .from('fichas')
        .select('id, created_at, product_name, clinic_name, generated_data')
        .eq('ficha_type', 'clinica')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setFichas(data);
      }
      setLoading(false);
    }
    fetchFichas();
  }, []);

  if (loading) {
    return <div className="repo-loading">Cargando repositorio...</div>;
  }

  return (
    <div className="repo-container">
      <div className="repo-header">
        <h3 className="repo-title">Repositorio de Fichas</h3>
        <p className="repo-subtitle">Historial de fichas clínicas generadas previamente.</p>
      </div>

      <div className="repo-grid">
        {fichas.length === 0 ? (
          <div className="repo-empty">No hay fichas generadas todavía.</div>
        ) : (
          fichas.map(ficha => (
            <div key={ficha.id} className="repo-card" onClick={() => onSelectFicha(ficha.generated_data)}>
              <div className="repo-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className="repo-card-content">
                <div className="repo-card-title">{Array.isArray(ficha.product_name) ? ficha.product_name.join(' ') : ficha.product_name}</div>
                <div className="repo-card-meta">{ficha.clinic_name} • {new Date(ficha.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .repo-container {
          padding: 24px;
          height: 100%;
          overflow-y: auto;
          background: var(--bg-card);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }
        .repo-header {
          margin-bottom: 24px;
        }
        .repo-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .repo-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .repo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .repo-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .repo-card:hover {
          border-color: var(--accent);
          background: var(--accent-soft);
          transform: translateY(-2px);
        }
        .repo-card-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
        .repo-card-content {
          flex: 1;
          overflow: hidden;
        }
        .repo-card-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .repo-card-meta {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .repo-loading, .repo-empty {
          color: var(--text-muted);
          font-size: 14px;
          text-align: center;
          padding: 40px;
        }
      `}</style>
    </div>
  );
}
