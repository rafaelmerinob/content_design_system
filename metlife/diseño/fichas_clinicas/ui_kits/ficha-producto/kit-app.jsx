const PARTNER = { name: 'Interclínica', logo: '../../assets/logo-interclinica.png' };
const PRODUCTS = [
  { id: 'ambulatorio', label: 'Seguro Ambulatorio' },
  { id: 'catastrofico', label: 'Seguro Catastrófico' },
];

const chromeStyles = {
  bar: { position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 16px', background: 'var(--blue-950)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 12 },
  tab: (on) => ({ padding: '6px 14px', borderRadius: 999, cursor: 'pointer', border: '1px solid rgba(255,255,255,.35)',
    background: on ? 'var(--green-300)' : 'transparent', color: on ? 'var(--blue-950)' : '#fff',
    font: '500 12px/1 var(--font-body)', transition: 'background .15s ease, color .15s ease' }),
  desk: { background: '#DCE1E6', padding: '28px 0 48px', minHeight: '100vh' },
  sheet: { boxShadow: '0 10px 30px rgba(0,54,82,.18)' },
};

function App() {
  const [id, setId] = React.useState('catastrofico');
  return (
    <div>
      <div style={chromeStyles.bar}>
        <span style={{ opacity: .7, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 10 }}>Ficha de producto</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {PRODUCTS.map((p) => (
            <button key={p.id} style={chromeStyles.tab(p.id === id)} onClick={() => setId(p.id)}>{p.label}</button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', opacity: .7 }}>675,12 pt de ancho · una sola página</span>
      </div>
      <div style={chromeStyles.desk}>
        <div style={{ width: 'var(--page-width)', margin: '0 auto', ...chromeStyles.sheet }}>
          {React.createElement(window.Ficha, { data: window.FICHAS[id], partner: PARTNER })}
        </div>
      </div>
    </div>
  );
}

// El montaje lo dispara index.html, no el top level: este archivo tambien queda dentro del
// bundle del design system y ahi no debe tomar el #root de la pagina anfitriona.
window.mountFichaKit = () => ReactDOM.createRoot(document.getElementById('root')).render(<App />);
