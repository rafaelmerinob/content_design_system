import FichaWorkspace from '@/components/fichas/FichaWorkspace';

export default function FichasClinicasPage() {
  return (
    <>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'var(--accent-soft)', color: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div>
            <h1 className="page-title" style={{ fontSize: 22 }}>Fichas Clínicas</h1>
            <p className="page-description" style={{ marginTop: 2, fontSize: 13 }}>
              Genera fichas de producto MetLife con IA
            </p>
          </div>
        </div>
      </div>

      <FichaWorkspace />
    </>
  );
}
