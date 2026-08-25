'use client';
import { CLIENT_LIST } from '@/lib/constants';

export default function AgentStatus() {
  return (
    <div className="agent-status card">
      <h3 className="section-title" style={{ marginBottom: 20 }}>Estado de agentes</h3>

      {CLIENT_LIST.map(client => (
        <div key={client.id} className="agent-client-block">
          <div className="agent-client-header">
            <div className="agent-client-dot" style={{ background: client.color }} />
            <span className="agent-client-name">{client.name}</span>
          </div>
          <div className="agent-list">
            {client.agents.map(agent => (
              <div key={agent.id} className="agent-row">
                <div className="agent-info">
                  <span className={`agent-indicator ${agent.status}`} />
                  <span className="agent-name">{agent.name}</span>
                </div>
                <span className={`tag tag-${agent.status === 'online' ? 'success' : 'warning'}`}>
                  {agent.status === 'online' ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .agent-client-block {
          margin-bottom: 20px;
        }
        .agent-client-block:last-child {
          margin-bottom: 0;
        }
        .agent-client-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .agent-client-dot {
          width: 8px;
          height: 8px;
          border-radius: 3px;
        }
        .agent-client-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .agent-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .agent-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.02);
        }
        .agent-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .agent-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .agent-indicator.online {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }
        .agent-indicator.idle {
          background: var(--text-muted);
        }
        .agent-name {
          font-size: 13.5px;
          color: var(--text-primary);
          font-weight: 450;
        }
      `}</style>
    </div>
  );
}
