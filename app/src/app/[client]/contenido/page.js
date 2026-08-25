import { CLIENTS } from '@/lib/constants';
import { notFound } from 'next/navigation';

export default async function ContenidoPage({ params }) {
  const { client: clientId } = await params;
  const client = CLIENTS[clientId];
  if (!client) notFound();

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: client.color }} />
          <h1 className="page-title">{client.name} · Contenido</h1>
        </div>
        <p className="page-description">Herramientas de contenido para {client.name}</p>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: 'var(--radius-lg)',
          background: 'rgba(255,255,255,0.03)', margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
          Sin herramientas de contenido
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 320, margin: '0 auto', lineHeight: 1.5 }}>
          Las herramientas de contenido para {client.name} se configurarán próximamente
        </p>
      </div>
    </>
  );
}
