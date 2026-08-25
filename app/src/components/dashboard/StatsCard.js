'use client';

export default function StatsCard({ icon, label, value, change, changeType = 'up', accent }) {
  const accentColor = accent || 'var(--accent)';
  const accentSoft = accent ? `${accent}1a` : 'var(--accent-soft)';

  return (
    <div className="stat-card card">
      <div className="stat-card-header">
        <div className="stat-card-icon" style={{ background: accentSoft, color: accentColor }}>
          {icon}
        </div>
        {change && (
          <span className={`stat-change ${changeType}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>

      <style jsx>{`
        .stat-card {
          position: relative;
          overflow: hidden;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, ${accentColor}, transparent);
          opacity: 0.6;
        }
        .stat-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .stat-card-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-change {
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: var(--radius-full);
        }
        .stat-change.up {
          background: var(--success-soft);
          color: var(--success);
        }
        .stat-change.down {
          background: var(--error-soft);
          color: var(--error);
        }
        .stat-card-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-card-label {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 450;
        }
      `}</style>
    </div>
  );
}
