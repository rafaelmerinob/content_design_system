'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function buildBreadcrumbs(pathname) {
  if (pathname === '/') return [{ label: 'Dashboard', href: '/' }];
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [{ label: 'Dashboard', href: '/' }];
  const labelMap = {
    metlife: 'MetLife',
    provida: 'ProVida',
    diseno: 'Diseño',
    contenido: 'Contenido',
    'fichas-clinicas': 'Fichas Clínicas',
    'folletos-eb': 'Folletos EB',
    'fichas-comparativas': 'Fichas Comparativas',
  };
  let path = '';
  for (const seg of segments) {
    path += `/${seg}`;
    crumbs.push({ label: labelMap[seg] || seg, href: path });
  }
  return crumbs;
}

export default function Header() {
  const pathname = usePathname();
  const crumbs = buildBreadcrumbs(pathname);

  return (
    <header className="app-header">
      <div className="header-left">
        <nav className="breadcrumbs">
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} className="breadcrumb-item">
              {i > 0 && <span className="breadcrumb-sep">/</span>}
              {i === crumbs.length - 1 ? (
                <span className="breadcrumb-current">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="breadcrumb-link">{crumb.label}</Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      <div className="header-right">
        <div className="header-status">
          <span className="pulse-dot" style={{ background: 'var(--success)' }} />
          <span className="header-status-text">Agentes activos</span>
        </div>
        <div className="header-avatar">
          <span>C3</span>
        </div>
      </div>

      <style jsx>{`
        .app-header {
          height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          border-bottom: 1px solid var(--border);
          background: rgba(10, 14, 26, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .breadcrumb-item {
          display: flex;
          align-items: center;
        }
        .breadcrumb-sep {
          margin: 0 10px;
          color: var(--text-muted);
          font-size: 13px;
          opacity: 0.5;
        }
        .breadcrumb-link {
          font-size: 14px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .breadcrumb-link:hover {
          color: var(--text-secondary);
        }
        .breadcrumb-current {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .header-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: var(--success-soft);
          border-radius: var(--radius-full);
        }
        .header-status-text {
          font-size: 12px;
          font-weight: 500;
          color: var(--success);
        }

        .header-avatar {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-md);
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
        }
      `}</style>
    </header>
  );
}
