# UI kit — Ficha de producto

Recreacion de la ficha de producto de una pagina, el unico entregable del sistema. `index.html`
muestra las dos fichas ya aprobadas por cliente y permite cambiar de producto:

- **Seguro Ambulatorio** — una sola tabla, rotulo de categoria unica en gris neutro.
- **Seguro Catastrofico Interclinica** — dos tablas: "Montos por tramo de edad" (sin rotulo) y
  "Reembolsa prestaciones" multi-categoria con el orden fijo Hospitalario / Ambulatorio / Otros.

## Archivos
| Archivo | Rol |
| --- | --- |
| `index.html` | Vista interactiva; carga el bundle del sistema y los datos. |
| `data.js` | Contenido real transcrito de las fichas aprobadas. |
| `ficha-view.jsx` | Composicion de los bloques en el orden fijo. |
| `kit-app.jsx` | Chrome de demo: selector de producto y "mesa" gris. |

## Limitaciones conocidas
- La tabla **"Primas mensuales"** de la ficha Ambulatorio aparece en la guia pero su contenido no era
  legible en el PDF entregado: se omite en vez de inventarla.
- Los legales de la tabla multi-categoria del Catastrofico ((0) a (4)) estaban recortados en la fuente:
  se omiten.
- Solo hay una fotografia de header disponible (la del Catastrofico), se reutiliza en ambas fichas.
- El chrome superior (selector de producto, fondo gris) es andamiaje de demo, no parte de la ficha.
