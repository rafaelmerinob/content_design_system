import StatsCard from '@/components/dashboard/StatsCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import AgentStatus from '@/components/dashboard/AgentStatus';
import QuickAccess from '@/components/dashboard/QuickAccess';

const iconFichas = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

const iconAgents = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6"/>
  </svg>
);

const iconClients = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const iconTools = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);

export default function DashboardPage() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Vista general de la plataforma Content IA System</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatsCard
          icon={iconFichas}
          label="Fichas generadas"
          value="24"
          change="12%"
          changeType="up"
          accent="#818cf8"
        />
        <StatsCard
          icon={iconAgents}
          label="Agentes activos"
          value="3"
          accent="#34d399"
        />
        <StatsCard
          icon={iconClients}
          label="Clientes"
          value="2"
          accent="#60a5fa"
        />
        <StatsCard
          icon={iconTools}
          label="Herramientas"
          value="1"
          change="5 próximamente"
          changeType="up"
          accent="#fbbf24"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 24 }}>
        <ActivityFeed />
        <AgentStatus />
      </div>

      <QuickAccess />
    </>
  );
}
