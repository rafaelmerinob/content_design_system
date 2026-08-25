'use client';
import Link from 'next/link';
import { CLIENT_LIST } from '@/lib/constants';

export default function QuickAccess() {
  const activeTools = CLIENT_LIST.flatMap(client =>
    Object.entries(client.categories).flatMap(([catKey, cat]) =>
      cat.tools
        .filter(t => t.status === 'active')
        .map(t => ({ ...t, client, catKey }))
    )
  );

  const comingSoon = CLIENT_LIST.flatMap(client =>
    Object.entries(client.categories).flatMap(([catKey, cat]) =>
      cat.tools
        .filter(t => t.status === 'coming-soon')
        .map(t => ({ ...t, client, catKey }))
    )
  ).slice(0, 4);

  return (
    <div className="quick-access card" style={{ gridColumn: 'span 3' }}>
      <h3 className="section-title" style={{ marginBottom: 20 }}>Herramientas</h3>

      <div className="tools-grid">
        {activeTools.map(tool => (
          <Link
            key={`${tool.client.id}-${tool.id}`}
            href={`/${tool.client.id}/${tool.catKey}/${tool.id}`}
            className="tool-card active"
          >
            <div className="tool-card-header">
              <div className="tool-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <span className="tag tag-success">Activa</span>
            </div>
            <div className="tool-card-name">{tool.name}</div>
            <div className="tool-card-desc">{tool.description}</div>
            <div className="tool-card-client">
              <div className="tool-client-dot" style={{ background: tool.client.color }} />
              {tool.client.name}
            </div>
          </Link>
        ))}

        {comingSoon.map(tool => (
          <div
            key={`${tool.client.id}-${tool.id}`}
            className="tool-card disabled"
          >
            <div className="tool-card-header">
              <div className="tool-card-icon muted">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <span className="tag tag-warning">Próximamente</span>
            </div>
            <div className="tool-card-name">{tool.name}</div>
            <div className="tool-card-desc">{tool.description}</div>
            <div className="tool-card-client">
              <div className="tool-client-dot" style={{ background: tool.client.color }} />
              {tool.client.name}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }
        .tool-card {
          padding: 18px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          background: var(--bg-input);
          transition: all var(--transition-base);
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tool-card.active:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .tool-card.disabled {
          opacity: 0.5;
          cursor: default;
        }
        .tool-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .tool-card-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--accent-soft);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tool-card-icon.muted {
          background: rgba(255,255,255,0.05);
          color: var(--text-muted);
        }
        .tool-card-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .tool-card-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .tool-card-client {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: auto;
          padding-top: 8px;
          border-top: 1px solid var(--border);
        }
        .tool-client-dot {
          width: 6px;
          height: 6px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
