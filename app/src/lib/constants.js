// Client & tool configuration — extensible for future clients
export const CLIENTS = {
  metlife: {
    id: 'metlife',
    name: 'MetLife',
    color: '#003652',
    logo: '/fichas-clinicas/assets/logo-metlife.png',
    categories: {
      diseno: {
        label: 'Diseño',
        tools: [
          { id: 'fichas-clinicas', name: 'Fichas Clínicas', status: 'active', description: 'Fichas de producto de una página para seguros MetLife' },
          { id: 'folletos-eb', name: 'Folletos EB', status: 'coming-soon', description: 'Folletos de Employee Benefits' },
          { id: 'diseno-metlife', name: 'Diseño MetLife', status: 'coming-soon', description: 'Piezas de diseño general MetLife' },
          { id: 'videos-paso-a-paso', name: 'Videos Paso a Paso', status: 'coming-soon', description: 'Videos instructivos paso a paso' },
        ],
      },
      contenido: {
        label: 'Contenido',
        tools: [],
      },
    },
    agents: [
      { id: 'redactor', name: 'Redactor', status: 'online', description: 'Genera y adapta copy de marca' },
      { id: 'grillas', name: 'Grillas', status: 'online', description: 'Estructura datos en tablas y grillas' },
      { id: 'revisor', name: 'Revisor', status: 'idle', description: 'Verifica adherencia al design system' },
    ],
  },
  provida: {
    id: 'provida',
    name: 'ProVida',
    color: '#1a5276',
    logo: null,
    categories: {
      diseno: {
        label: 'Diseño',
        tools: [
          { id: 'fichas-comparativas', name: 'Fichas Comparativas', status: 'coming-soon', description: 'Fichas comparativas de productos ProVida' },
          { id: 'diseno-provida', name: 'Diseño ProVida', status: 'coming-soon', description: 'Piezas de diseño ProVida' },
        ],
      },
      contenido: {
        label: 'Contenido',
        tools: [],
      },
    },
    agents: [
      { id: 'redactor', name: 'Redactor', status: 'idle', description: 'Genera y adapta copy de marca' },
      { id: 'rentabilidad', name: 'Rentabilidad', status: 'idle', description: 'Análisis y reportes de rentabilidad' },
      { id: 'revisor', name: 'Revisor', status: 'idle', description: 'Verifica adherencia al design system' },
    ],
  },
};

export const CLIENT_LIST = Object.values(CLIENTS);

export function getClient(id) {
  return CLIENTS[id] || null;
}

export function getToolsForClient(clientId) {
  const client = getClient(clientId);
  if (!client) return [];
  return Object.values(client.categories).flatMap(cat => cat.tools);
}
