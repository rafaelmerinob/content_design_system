import Link from 'next/link';
import { CLIENTS } from '@/lib/constants';
import { notFound } from 'next/navigation';

export default async function DisenoPage({ params }) {
  const { client: clientId } = await params;
  const client = CLIENTS[clientId];
  if (!client) notFound();

  const cat = client.categories.diseno;

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: client.color }} />
          <h1 className="page-title">{client.name} · Diseño</h1>
        </div>
        <p className="page-description">Herramientas de diseño disponibles</p>
      </div>

      <div className="grid-3">
        {cat.tools.map(tool => (
          <div key={tool.id}>
            {tool.status === 'active' ? (
              <Link href={`/${clientId}/diseno/${tool.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ cursor: 'pointer', minHeight: 160, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-soft)', color: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <span className="tag tag-success">Activa</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{tool.name}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>{tool.description}</p>
                  <div style={{ marginTop: 16, fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>
                    Abrir herramienta →
                  </div>
                </div>
              </Link>
            ) : (
              <div className="card" style={{ opacity: 0.5, minHeight: 160 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <span className="tag tag-warning">Próximamente</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{tool.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{tool.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
