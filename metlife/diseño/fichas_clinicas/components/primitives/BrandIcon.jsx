import React from 'react';

/** Set original de 6 iconos PNG (circulo solido con glifo blanco) entregados por el cliente. */
const REAL = {
  ShieldProtection: 'icon-shield-protection.png',
  FinancialStrength: 'icon-financial-strength.png',
  Stethoscope: 'icon-stethoscope.png',
  Heart: 'icon-heart.png',
  Family: 'icon-family.png',
  HelpingTheElderly: 'icon-helping-the-elderly.png',
};
const LIGHT = {
  ShieldProtection: 'icon-shield-protection-light.png',
  Family: 'icon-family-light.png',
};

/** Resuelve el archivo a partir de name/set.
 *  - PascalCase ('Heart', 'ShieldProtection') -> set original PNG.
 *  - kebab-case ('medical-stethoscope') -> biblioteca SVG, carpeta segun `set`.
 *  - con barra ('product/dental') -> ruta explicita dentro de la biblioteca. */
function resolve(name, set, variant) {
  if (name.includes('/')) return 'icons/' + name.replace(/\.svg$/, '') + '.svg';
  if (/^[a-z0-9-]+$/.test(name)) return 'icons/' + (set || 'category') + '/' + name + '.svg';
  return (variant === 'light' && LIGHT[name]) || REAL[name] || REAL.ShieldProtection;
}

/** Icono circular del sistema de fichas. */
export function BrandIcon({ name = 'ShieldProtection', set = 'category', variant = 'dark', size, assetBase = '../../assets/', style }) {
  return (
    <img src={assetBase + resolve(name, set, variant)} alt="" style={{
      width: size || 'var(--icon-circle-size)', height: size || 'var(--icon-circle-size)',
      borderRadius: '50%', flex: 'none', objectFit: 'cover', ...style,
    }} />
  );
}
