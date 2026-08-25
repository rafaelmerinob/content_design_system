# Notas del proyecto

Este proyecto es el design system de **fichas de producto MetLife** (agencia: content360.cl).

## Regla dura: no contaminar las fichas de clinica

Hay tres tipos de ficha y NO comparten look:

- **Ficha de clinica** — look aprobado por el cliente. Lleva logo de clinica, paleta de `tokens/colors.css`
  y nada mas. **Nunca** lleva `data-product` ni acentos de producto. Si parece necesitar un color o un
  bloque que no existe en el sistema, es un error, no un caso nuevo.
- **Ficha comercial** — va al cliente final. Puede traer logo y acentos del producto via
  `data-product="<slug>"` (ver `tokens/products.css`).
- **Ficha tecnica** — va al equipo de ventas. Header propio por producto, mayor densidad, tablas de
  codigos y definiciones.

Los acentos de producto viven SIEMPRE dentro de `[data-product]`, jamas en `:root`.

Pendiente al cerrar la ultima sesion:
- Verificar visualmente `ui_kits/ficha-producto/index.html` y `templates/ficha-producto/FichaProducto.dc.html`
  una vez que `_ds_bundle.js` este compilado (en la primera pasada el bundle aun no existia, por lo que
  el UI kit mostraba pantalla en blanco).
- Faltan: archivo real de IvyPresto y los 4 SVG de iconos (Stethoscope, Heart, Family, HelpingTheElderly).
