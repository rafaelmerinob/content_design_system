Icono circular oscuro que acompana a la cifra en una tarjeta de datos clave; el circulo oscuro es obligatorio en fichas.

```jsx
<BrandIcon name="ShieldProtection" assetBase="../../assets/" />
```

Criterio de seleccion (de la guia):
- `ShieldProtection` — proteccion / cobertura asegurada (tarjeta "Capital asegurado")
- `FinancialStrength` — dinero / monto financiero (tarjeta "Deducible")
- `Stethoscope` — atencion medica / consulta clinica
- `Heart` — salud / bienestar general
- `Family` — grupo familiar / cargas
- `HelpingTheElderly` — acompanamiento / cuidado a terceros

Los seis son PNG reales del set MetLife entregados por el cliente (`assets/icon-*.png`).
`ShieldProtection` y `Family` tienen ademas variante clara (`variant="light"`): glifo azul sobre circulo gris.

## Biblioteca SVG de marca (agosto 2026)

Ademas de los seis PNG originales, el sistema incluye la biblioteca oficial de iconos MetLife en SVG:

- `assets/icons/category/` — 128 iconos. Circulo **Warm Gray** con glifo **Blue 950**. Uso general:
  secciones, bullets, apoyo visual de coberturas.
- `assets/icons/product/` — 27 iconos. Circulo **Blue 950** con glifo **blanco**. Identifican lineas de
  producto (dental, vision, critical-illness, hospital-indemnity, etc.).

Se llaman por nombre kebab-case mas la prop `set`, o con ruta explicita:

```jsx
<BrandIcon name="medical-stethoscope" set="category" />
<BrandIcon name="product/dental" />
```

Los nombres PascalCase antiguos siguen funcionando sin cambios. La lista completa esta en las cards
"Iconos de categoria" e "Iconos de producto" de la pestana Design System.
