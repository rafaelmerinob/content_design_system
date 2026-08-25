import React from 'react';
import { Badge } from '../primitives/Badge.jsx';

/** Bloque 1: foto full-bleed + logo arriba a la izquierda + badge y titulo abajo.
 *  Geometria medida en la ficha de referencia (pagina 675pt de ancho):
 *  header 366pt de alto, margen 42pt, logo 120x22.5pt a 21pt del borde superior,
 *  linea base del badge a 193pt, titulo 42/50pt con lineas base en 261 y 311.
 *
 *  REGLA DE ENCUADRE: el texto ocupa el tercio izquierdo. Si un rostro o la accion principal
 *  de la foto cae bajo el badge o el titular, desplazar la foto con photoPosition
 *  ("70% bottom", "right bottom", ...) hasta liberar esa zona. Si la foto no tiene margen horizontal
 *  sobrante (relacion de aspecto parecida a la del header, donde el recorte solo ocurre en vertical),
 *  usar photoZoom para acercar y photoPosition como origen del acercamiento:
 *  photoZoom={1.6} photoPosition="left center" corre el motivo hacia la derecha.
 *  Es un ajuste obligatorio, no opcional: ningun rostro debe quedar tapado por el texto. */
export function FichaHeader({ title, badge, photo, photoPosition = 'center bottom', photoZoom = 1, logo, assetBase = '../../assets/', style }) {
  const photoSrc = photo || assetBase + 'photo-header-clinica.jpg';
  const logoSrc = logo || assetBase + 'logo-metlife-white.png';
  return (
    <header style={{ position: 'relative', height: 'var(--header-height)', overflow: 'hidden',
      background: 'var(--blue-950)', ...style }}>
      <img src={photoSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: photoPosition, transform: photoZoom !== 1 ? `scale(${photoZoom})` : undefined, transformOrigin: photoPosition }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,54,82,.94) 0%, rgba(0,54,82,.86) 26%, rgba(0,54,82,.42) 58%, rgba(0,54,82,.18) 100%)' }} />
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', boxSizing: 'border-box', padding: '21pt var(--page-padding-x) 43pt' }}>
        <img src={logoSrc} alt="MetLife" style={{ height: 'var(--logo-header-height)', width: 'auto', alignSelf: 'flex-start' }} />
        <div style={{ display: 'grid', gap: '12pt', justifyItems: 'start' }}>
          {badge && <Badge>{badge}</Badge>}
          <h1 style={{ margin: 0, maxWidth: '82%', whiteSpace: 'pre-line',
            font: `var(--weight-display) var(--text-headline)/var(--text-headline-lh) var(--font-display)`,
            color: 'var(--text-on-dark)' }}>{title}</h1>
        </div>
      </div>
    </header>
  );
}
