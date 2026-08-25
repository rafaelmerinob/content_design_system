import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export const metadata = {
  title: 'Content IA System — Design Tools',
  description: 'Plataforma de herramientas de IA para diseño y contenido de marca. MetLife, ProVida y más.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="app-layout">
          <Sidebar />
          <div className="main-area">
            <Header />
            <main className="page-content fade-in">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
