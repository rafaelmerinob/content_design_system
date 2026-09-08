'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CLIENT_LIST } from '@/lib/constants';
import { useTheme } from 'next-themes';

/* ── Inline SVG icons ── */
const Icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  design: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  content: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  chevron: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  tool: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m-7-3.5l5.2-3m1.6-.9L17 3.5M5 3.5l5.2 3m1.6.9L17 10.5"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expandedClients, setExpandedClients] = useState({ metlife: true, provida: false });

  useEffect(() => setMounted(true), []);

  const toggleClient = (clientId) => {
    setExpandedClients(prev => ({ ...prev, [clientId]: !prev[clientId] }));
  };

  const isActive = (path) => pathname === path;
  const isInPath = (path) => pathname.startsWith(path);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg width="28" height="28" viewBox="0 0 1128 1098" fill="none">
            <style>{`
              .cls-1, .cls-2, .cls-3 { fill: currentColor; font-family: NeuePower-Ultra, 'Neue Power'; font-size: 149.14px; }
              .cls-4 { fill: none; stroke: currentColor; stroke-miterlimit: 10; stroke-width: 5.18px; }
              .cls-2 { letter-spacing: -.1em; }
              .cls-5 { letter-spacing: .27em; }
              .cls-6 { letter-spacing: .15em; }
              .cls-3 { letter-spacing: -.02em; }
              .cls-7 { letter-spacing: -.1em; }
              .cls-8 { letter-spacing: -.08em; }
            `}</style>
            <text className="cls-1" transform="translate(369.31 462.83) scale(.86 1)"><tspan className="cls-6"><tspan x="0" y="0">CON</tspan></tspan><tspan className="cls-5"><tspan x="0" y="160.18">TEN</tspan></tspan><tspan x="0" y="320.36">T</tspan></text>
            <text className="cls-3" transform="translate(459.4 783.19) scale(1.26 1)"><tspan x="0" y="0"> </tspan></text>
            <text className="cls-2" transform="translate(492.41 783.19) scale(.69 1)"><tspan x="0" y="0">3</tspan></text>
            <text className="cls-1" transform="translate(551.37 783.19) scale(.8 1)"><tspan className="cls-7" x="0" y="0">6</tspan><tspan className="cls-8" x="88.42" y="0">0</tspan></text>
            <path className="cls-4" d="M1082.17,516.56c24.2-273.53-221.54-458.85-482.39-468.53-200.28-7.43-390.96,89.6-485.09,268.1-77.36,146.69-95.26,331.98-32.67,487.19,25.34,62.84,61.16,106.96,112.46,151.43,295.62,256.27,807.97-47.91,878.74-378.83,4.22-19.73,7.2-39.56,8.95-59.36Z"/>
          </svg>
        </div>
        <div>
          <div className="sidebar-logo-text">Content IA</div>
          <div className="sidebar-logo-sub">Design System</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">General</div>
        <Link href="/" className={`sidebar-item ${isActive('/') ? 'active' : ''}`}>
          {Icons.dashboard}
          <span>Dashboard</span>
        </Link>

        <div className="sidebar-section-label" style={{ marginTop: 24 }}>Clientes</div>

        {CLIENT_LIST.map(client => (
          <div key={client.id} className="sidebar-client-group" style={{ marginBottom: 32 }}>
            <button
              className={`sidebar-item sidebar-client-toggle ${isInPath(`/${client.id}`) ? 'active' : ''}`}
              style={{ fontSize: '16px', fontWeight: 600, padding: '8px 12px' }}
              onClick={() => toggleClient(client.id)}
            >
              <div className="client-dot" style={{ background: client.color }} />
              <span>{client.name}</span>
              <span className={`sidebar-chevron ${expandedClients[client.id] ? 'open' : ''}`}>
                {Icons.chevron}
              </span>
            </button>

            {expandedClients[client.id] && (
              <div className="sidebar-sub-items" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                {Object.entries(client.categories).map(([catKey, cat]) => (
                  <div key={catKey} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <Link
                      href={`/${client.id}/${catKey}`}
                      className={`sidebar-sub-item ${isActive(`/${client.id}/${catKey}`) ? 'active' : ''}`}
                      style={{ paddingLeft: '38px', fontSize: '14px', marginBottom: '2px' }}
                    >
                      {catKey === 'diseno' ? Icons.design : Icons.content}
                      <span>{cat.label}</span>
                      {cat.tools.length > 0 && (
                        <span className="sidebar-count">{cat.tools.filter(t => t.status === 'active').length}</span>
                      )}
                    </Link>
                    {cat.tools.filter(t => t.status === 'active').map(tool => (
                      <Link
                        key={tool.id}
                        href={`/${client.id}/${catKey}/${tool.id}`}
                        className={`sidebar-tool-item ${isActive(`/${client.id}/${catKey}/${tool.id}`) ? 'active' : ''}`}
                        style={{ paddingLeft: '64px', fontSize: '13px' }}
                      >
                        <span>{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button 
          className="sidebar-item"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {mounted && theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
          <span>{mounted && theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
        </button>

        <button className="sidebar-item" style={{ marginTop: 4 }}>
          {Icons.settings}
          <span>Configuración</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--border);
          box-shadow: 4px 0 24px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          z-index: 50;
          overflow-y: auto;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-logo-icon {
          flex-shrink: 0;
        }
        .sidebar-logo-text {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .sidebar-logo-sub {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .sidebar-nav {
          flex: 1;
          padding: 12px 12px;
          overflow-y: auto;
        }

        .sidebar-section-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 8px 12px 6px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 12px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 450;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          font-family: var(--font-sans);
          text-align: left;
        }
        .sidebar-client-toggle {
          font-size: 16px;
          font-weight: 600;
          padding: 8px 12px;
        }
        .sidebar-item:hover {
          color: var(--text-primary);
          background: var(--bg-card-hover);
        }
        .sidebar-item.active {
          color: #ffffff;
          background: var(--accent);
          box-shadow: 0 4px 15px var(--accent-glow);
        }

        .client-dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .sidebar-chevron {
          margin-left: auto;
          display: flex;
          transition: transform var(--transition-fast);
          opacity: 0.5;
        }
        .sidebar-chevron.open {
          transform: rotate(180deg);
        }

        .sidebar-sub-items {
          padding-left: 0;
        }

        .sidebar-sub-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 12px 7px 32px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          color: var(--text-muted);
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .sidebar-sub-item:hover {
          color: var(--text-secondary);
          background: var(--bg-card-hover);
        }
        .sidebar-sub-item.active {
          color: var(--accent);
          font-weight: 500;
          background: var(--accent-soft);
        }

        .sidebar-count {
          margin-left: auto;
          font-size: 11px;
          font-weight: 600;
          background: var(--accent-soft);
          color: var(--accent);
          padding: 1px 7px;
          border-radius: var(--radius-full);
        }

        .sidebar-tool-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 57px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
          color: var(--text-muted);
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .sidebar-tool-item:hover {
          color: var(--text-secondary);
          background: var(--bg-card-hover);
        }
        .sidebar-tool-item.active {
          color: var(--accent);
        }

        .tool-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-muted);
          flex-shrink: 0;
        }
        .sidebar-tool-item.active .tool-dot {
          background: var(--accent);
        }

        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid var(--border);
        }

        .sidebar-client-group {
          margin-bottom: 2px;
        }
      `}</style>
    </aside>
  );
}
