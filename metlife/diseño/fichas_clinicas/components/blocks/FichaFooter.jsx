import React from 'react';

/** Bloque 6: logos centrados con conector "+" y banda de alianza.
 *  Medido en la ficha de referencia: franja de logos de 76,5pt con filete superior de 0,75pt,
 *  logo MetLife 119,2 x 22,5pt, logo aliado 25,5pt de alto, separacion de 24pt a cada lado del "+",
 *  banda inferior de 36pt con margen lateral de 30pt. */
export function FichaFooter({ partnerLogo, partnerName, allianceLine, link = 'metlife.cl', logo, assetBase = '../../assets/', style }) {
  const metlife = logo || assetBase + 'logo-metlife.png';
  return (
    <footer style={style}>
      <div style={{ boxSizing: 'border-box', height: 'var(--footer-logos-height)', borderTop: '0.75pt solid var(--rule-hairline)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24pt' }}>
        <img src={metlife} alt="MetLife" style={{ height: 'var(--logo-footer-height)', width: 'auto' }} />
        <span style={{ font: `var(--weight-regular) 18pt/1 var(--font-body)`, color: 'var(--connector-color)' }}>+</span>
        {partnerLogo
          ? <img src={partnerLogo} alt={partnerName || ''} style={{ height: 'var(--logo-partner-height)', width: 'auto' }} />
          : <span style={{ font: `var(--weight-semibold) 14pt/1 var(--font-body)`, color: 'var(--text-heading)' }}>{partnerName}</span>}
      </div>
      <div style={{ background: 'var(--surface-footer-band)', minHeight: 'var(--footer-band-height)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 30pt' }}>
        <span style={{ font: `var(--weight-regular) var(--text-table)/1.4 var(--font-body)`, color: 'var(--text-on-dark)' }}>{allianceLine}</span>
        <span style={{ font: `var(--weight-regular) var(--text-table)/1.4 var(--font-body)`, color: 'var(--link-on-dark)' }}>{link}</span>
      </div>
    </footer>
  );
}
