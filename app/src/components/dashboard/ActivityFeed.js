'use client';

const ACTIVITY = [
  { id: 1, action: 'Ficha generada', detail: 'Seguro Catastrófico Interclínica', client: 'MetLife', tool: 'Fichas Clínicas', time: 'Hace 12 min', status: 'success' },
  { id: 2, action: 'Brief recibido', detail: 'Seguro Ambulatorio · Nueva clínica', client: 'MetLife', tool: 'Fichas Clínicas', time: 'Hace 45 min', status: 'info' },
  { id: 3, action: 'Revisión completada', detail: 'Adherencia al Design System: 98%', client: 'MetLife', tool: 'Revisor', time: 'Hace 1h', status: 'success' },
  { id: 4, action: 'Herramienta configurada', detail: 'Fichas Comparativas · ProVida', client: 'ProVida', tool: 'Setup', time: 'Hace 3h', status: 'warning' },
  { id: 5, action: 'PDF exportado', detail: 'Seguro Ambulatorio · Interclínica', client: 'MetLife', tool: 'Fichas Clínicas', time: 'Hace 5h', status: 'success' },
];

export default function ActivityFeed() {
  return (
    <div className="activity-feed card">
      <div className="activity-header">
        <h3 className="section-title">Actividad reciente</h3>
        <button className="btn-ghost" style={{ fontSize: 12 }}>Ver todo</button>
      </div>
      <div className="activity-list">
        {ACTIVITY.map((item) => (
          <div key={item.id} className="activity-item">
            <div className={`activity-dot ${item.status}`} />
            <div className="activity-content">
              <div className="activity-action">{item.action}</div>
              <div className="activity-detail">{item.detail}</div>
            </div>
            <div className="activity-meta">
              <span className="activity-client">{item.client}</span>
              <span className="activity-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .activity-feed {
          grid-column: span 2;
        }
        .activity-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .activity-item:first-child {
          padding-top: 0;
        }
        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }
        .activity-dot.success { background: var(--success); }
        .activity-dot.info    { background: var(--info); }
        .activity-dot.warning { background: var(--warning); }
        .activity-dot.error   { background: var(--error); }
        .activity-content {
          flex: 1;
          min-width: 0;
        }
        .activity-action {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-primary);
        }
        .activity-detail {
          font-size: 12.5px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .activity-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
          flex-shrink: 0;
        }
        .activity-client {
          font-size: 11px;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }
        .activity-time {
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
