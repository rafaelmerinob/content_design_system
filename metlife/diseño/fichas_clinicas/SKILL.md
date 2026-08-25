---
name: fichas-metlife-design
description: Use this skill to generate well-branded interfaces and assets for MetLife Chile product fact sheets ("fichas de producto"), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Reglas no negociables al armar una ficha

- **Encuadre del header**: el badge y el titular ocupan el tercio izquierdo. Ningun rostro ni la accion
  principal de la foto puede quedar tapado por ese texto. Si ocurre, desplazar la foto hacia la derecha con
  `photoPosition` (`'60% bottom'`, `'70% bottom'`, `'right bottom'`). Revisar siempre antes de entregar.
- **Legales**: no se inventan ni se adaptan. Si la fuente (Word, brief) no trae el texto legal, se reusa el
  de la ficha aprobada mas cercana y **se le avisa explicitamente al usuario** que ese bloque necesita
  validacion del cliente.
- **Llamadas sin legal**: si una celda o encabezado cita "(1)" y la fuente no trae ese legal, la ficha lo
  rotula en el lugar del legal como "\u26A0\uFE0F Falta legal (1)" (o "Faltan legales (1) (2) (3)" si son varios).
  Nunca se deja la llamada muda ni se rellena con texto inventado. `DataTable` lo detecta y lo rotula solo.
- **Datos**: cifras, tramos, porcentajes y edades se transcriben literales de la fuente.
- **Listas sin datos**: si la fuente trae una enumeracion donde cada linea es solo un nombre
  (enfermedades cubiertas, exclusiones, prestaciones sin tope), **no se arma como tabla**: va con
  `BulletGrid` — tarjeta warm gray con vinetas verdes en 3 columnas, precedida de un `SectionTitle`.
  Se respeta el orden exacto de la fuente.

