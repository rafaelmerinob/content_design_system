import Link from 'next/link';
import { CLIENTS } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return Object.keys(CLIENTS).map(id => ({ client: id }));
}

export default async function ClientPage({ params }) {
  const { client: clientId } = await params;
  const client = CLIENTS[clientId];
  if (!client) notFound();

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 14, height: 14, borderRadius: 4,
            background: client.color
          }} />
          <h1 className="page-title">{client.name}</h1>
        </div>
        <p className="page-description">Herramientas de diseño y contenido para {client.name}</p>
      </div>

      {Object.entries(client.categories).map(([catKey, cat]) => (
        <div key={catKey} style={{ marginBottom: 32 }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">{cat.label}</h2>
              <p className="section-subtitle">{cat.tools.length} herramienta{cat.tools.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {cat.tools.length > 0 ? (
            <div className="grid-3">
              {cat.tools.map(tool => (
                <div key={tool.id}>
                  {tool.status === 'active' ? (
                    <Link href={`/${clientId}/${catKey}/${tool.id}`} style={{ textDecoration: 'none' }}>
                      <div className="card" style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 'var(--radius-md)',
                            background: 'var(--accent-soft)', color: 'var(--accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                            </svg>
                          </div>
                          <span className="tag tag-success">Activa</span>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{tool.name}</h3>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{tool.description}</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="card" style={{ opacity: 0.5 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 'var(--radius-md)',
                          background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                          </svg>
                        </div>
                        <span className="tag tag-warning">Próximamente</span>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{tool.name}</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{tool.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--text-muted)', fontSize: 14 }}>
              No hay herramientas de {cat.label.toLowerCase()} configuradas aún
            </div>
          )}
        </div>
      ))}

      {/* Agents */}
      <div style={{ marginBottom: 32 }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Agentes</h2>
            <p className="section-subtitle">Agentes de IA asignados a {client.name}</p>
          </div>
        </div>
        <div className="grid-3">
          {client.agents.map(agent => (
            <div key={agent.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: agent.status === 'online' ? 'var(--success)' : 'var(--text-muted)',
                  boxShadow: agent.status === 'online' ? '0 0 6px var(--success)' : 'none'
                }} />
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{agent.name}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
