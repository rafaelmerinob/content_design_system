# Fichas de producto MetLife — Design System

Sistema **exclusivo para fichas de producto**: el PDF de una pagina que MetLife Chile entrega junto a
cada seguro vendido en alianza con una clinica. No es el brand book general de MetLife y no cubre web,
app ni campana; cubre un unico entregable y, en los puntos marcados como excepcion, **tiene prioridad
sobre los defaults del brand book general**.

## Fuente

| Fuente | Detalle |
| --- | --- |
| `uploads/System_Design_Fichas_MetLife (1).pdf` | Guia de diseno interna, 11 paginas. Unica fuente entregada. |
| Fichas aprobadas por cliente | Fotografiadas dentro de esa guia: "Seguro Ambulatorio" y "Seguro Catastrofico Interclinica". Los colores, medidas y assets de este sistema se muestrearon directamente de esas piezas. |

No se entrego codigo, Figma ni archivos de fuente. **No hay** acceso al brand book general de MetLife;
las referencias a el (Brand Voice pag. 96, Brand Architecture — Co-branding pag. 24) vienen citadas
dentro de la guia y no se pudieron verificar.

## Producto

Un solo producto/superficie: la **ficha de producto** (PDF de una pagina, ancho fijo 675,12 pt, alto
variable). El orden de bloques es fijo:

1. **Header** — logo + foto + badge translucido + titulo en 2 lineas
2. **Parrafo introductorio** — copy corto debajo del titulo
3. **Tarjetas de datos clave** — 2 tarjetas: icono + cifra grande + descripcion
4. **Bloque(s) de tablas** — coberturas, primas, edades; la cantidad varia por producto
5. **CONDICIONES GENERALES** — titulo en mayuscula + bullets, sin marco
6. **Footer** — logos centrados + conector "+" + linea de alianza

Solo varia la cantidad y el contenido de las tablas del bloque 4 (ej. Catastrofico reemplaza "Primas
mensuales" por "Montos por tramo de edad"). Eso es variacion de contenido, no de estructura ni de estilo.

---

## CONTENT FUNDAMENTALS

**Idioma y persona.** Espanol de Chile. El parrafo introductorio habla **de tu a la persona asegurada**
("Un seguro que **te** entrega respaldo economico para **tus** consultas medicas..."). Las tablas, los
legales y las condiciones generales cambian a **tercera persona institucional** ("La compania aseguradora
establecera restricciones...", "La poliza no cubre..."). Nunca se usa "nosotros" ni primera persona.

**Tono.** Sobrio, tranquilizador, sin venta dura. La promesa emocional aparece una sola vez, al final del
parrafo introductorio ("...para que puedas cuidar tu salud con mayor tranquilidad", "...para enfrentar con
mayor tranquilidad los eventos de salud mas complejos"). De ahi en adelante el documento es puramente
informativo.

**Casing.**
- Titulo de producto: title case tal como se comercializa — *Seguro Catastrofico Interclinica*.
- Titulos de seccion: sentence case — *Reembolsa prestaciones*, *Primas mensuales*.
- **CONDICIONES GENERALES**: mayuscula completa. Es una excepcion deliberada al brand book general, que
  pide sentence case para disclaimers.
- Encabezados de tabla: sentence case, salvo nombres propios y siglas (ISAPRE/FONASA, UTI, UCI, DPS).
- Filas de tabla: el contenido llega del Word del brief y se respeta su casing, incluso cuando mezcla
  *Consulta medica* con *Consultas Medicas*.

**Numeros.** Formato chileno: coma decimal y punto de miles — *UF 0,5*, *UF 10.000*. La unidad va antes de
la cifra ("UF 100"), nunca despues. Un guion largo (—) marca "no aplica" en una celda; "Sin Tope" y "0%" se
escriben, no se dejan vacios.

**Notas al pie.** Numero entre parentesis **en linea**, tanto en la celda que anota (`Consulta medica (2)`)
como en la nota (`(2) Considera consulta urgencia.`). Nunca superindice — excepcion explicita al brand book.
Un item por linea; si el Word numera desde (0), se respeta ese orden; el texto legal se incluye completo
aunque la pagina se alargue.

**Emoji: nunca.** No hay emoji, ni iconos decorativos en el copy, ni signos de exclamacion. El unico
caracter usado como simbolo es el **+** que une los dos logos del footer.

**Regla de oro.** No se agregan elementos, textos ni bloques que no esten pedidos en el brief de contenido.
Ante contenido no cubierto por esta guia: no improvisar, marcar pendiente y consultar.

---

## VISUAL FOUNDATIONS

**Vibe general.** Documento clinico y corporativo: una sola imagen fotografica, mucho blanco, tablas densas
y un solo acento verde. No hay ilustracion, ni patrones, ni texturas, ni gradientes de color de marca. El
unico degradado del sistema es el velo Blue 950 sobre la foto del header.

**Fotografia y encuadre del header.** Una sola foto por ficha, siempre a sangre en el header, situacion
clinica real (consulta, examen, atencion), luz natural, tonos frios que el velo Blue 950 unifica. Anclada
abajo (`object-position: center bottom`) porque el recorte de 16:9 a 366pt sobra por arriba.
**Regla obligatoria de encuadre:** el texto del header — badge y titular — ocupa el tercio izquierdo. Ningun
rostro ni la accion principal de la foto puede quedar tapado por ese texto. Si ocurre, se desplaza la foto
hacia la derecha con la prop `photoPosition` del `FichaHeader` (`'60% bottom'`, `'70% bottom'`,
`'right bottom'`) hasta liberar la zona. Cuando la foto tiene una relacion de aspecto parecida a la del
header (16:9, 3:2) no sobra ancho y `photoPosition` sola no mueve nada: en ese caso se acerca con
`photoZoom` tomando `photoPosition` como origen (ej. `photoZoom={1.6} photoPosition="left center"`). Se reencuadra, nunca se recorta ni se deforma la imagen. Esta
revision es parte del cierre de toda ficha, no un extra.

**Color.** Paleta corta y literal (ver `tokens/colors.css`). Blue 950 `#003652` es el color estructural:
header de tabla, banda de footer, texto y conector. El verde `#8FF5B1` es el unico acento y solo aparece en
tres lugares: vinetas cuadradas, link del footer y (en su version clara `#CFFBE4`) el relleno de las
tarjetas de datos clave. Los grises son frios (`#F5F6F8`, `#E7EAEF`) salvo el warm gray `#F5F2ED` reservado
al rotulo "Otros". Los rotulos de categoria siguen un orden fijo que no se reordena:
Blue 200 → Teal 200 → Warm Gray 200.

**Tipografia.** Dos familias. **IvyPresto** (serif de alto contraste) solo para el titulo de producto y para
la cifra grande de las tarjetas de datos clave — nunca para texto corrido. **Inter** para todo lo demas:
parrafos, titulos de seccion, tablas, legales. La escala esta en puntos porque el entregable es un PDF:
42pt titulo · 30pt cifra · 16pt titulo de seccion · 15pt CONDICIONES GENERALES · 14pt bajada · 10pt cuerpo · 9,5pt tabla ·
8,5pt legales. El salto entre tabla y legales es intencional y debe verse: **el legal nunca hereda el tamano
del cuerpo**.

**Layout.** Ancho de pagina fijo 675,12 pt; margen lateral 34,5 pt; header de alto fijo 353,28 pt medido
desde el borde superior hasta donde termina el fondo oscuro. El header y la banda del footer van a sangre;
todo lo demas respeta el margen lateral. El alto de la pagina crece con el contenido y nunca pasa de una
pagina. No hay grilla de columnas: los bloques son de ancho completo y solo las tarjetas de datos clave se
dividen en dos.

**Fondos e imagenes.** Una sola fotografia por ficha, a sangre en el header, tono frio y desaturado
(consulta clinica real, luz natural, sin grano ni filtro calido). Encima va un degradado horizontal Blue 950
de izquierda a derecha (≈94% → 18% de opacidad) que actua como **gradiente de proteccion** para el logo, el
badge y el titulo. El resto del documento es blanco puro; no hay imagenes en el cuerpo.

**Transparencia y blur.** Se usan una sola vez: el badge de capital es verde translucido sobre la foto
(se alcanza a ver la textura a traves del color) con un borde sutil mas claro y un blur minimo. Todo lo demas
es opaco. El tono/opacidad exacto del badge esta en revision con el equipo de marca.

**Bordes, esquinas y sombras.** Radio 11,5 pt en tarjetas de datos clave y en el contenedor de la tabla
(la tabla recorta sus esquinas; el header oscuro hereda las de arriba). El badge es pill. Las vinetas son
cuadrados sin radio. **No hay sombras** en la pieza impresa: ni exteriores ni interiores. **No hay bordes**
de 1px en tablas ni tarjetas — la separacion de filas se hace solo con la fila alternada `#F5F6F8`. El bloque
CONDICIONES GENERALES va directo sobre blanco, sin marco ni caja contenedora.

**Animacion, hover y press.** Ninguno: el entregable es un PDF estatico. En los prototipos HTML de este
sistema el unico chrome interactivo (selector de producto del UI kit) usa transiciones cortas de 150 ms sobre
`background`/`color`, hover por cambio de color (nunca por sombra ni escala) y no hay estado press. Cualquier
componente que se lleve a pantalla debe mantener ese criterio: sin bounce, sin escala, sin parallax.

**Elementos fijos.** Ninguno flota ni queda pegado: el logo esta anclado arriba a la izquierda del header y
el par de logos del footer va centrado como conjunto, con tamanos equiparados.

---

## ICONOGRAPHY

- El sistema usa un **set propietario de iconos MetLife** con nombres propios: `ShieldProtection`,
  `FinancialStrength`, `Stethoscope`, `Heart`, `Family`, `HelpingTheElderly`. No es una libreria publica.
- Formato obligatorio en fichas: **circulo Blue 950 solido con el glifo blanco adentro**, a la izquierda de
  la cifra. El glifo es solido (no de trazo) y ocupa poco mas de la mitad del circulo.
- Criterio de seleccion: proteccion/cobertura → `ShieldProtection`; dinero/monto → `FinancialStrength`;
  consulta clinica → `Stethoscope`; salud general → `Heart`; titular + cargas → `Family`; adultos mayores o
  dependencia → `HelpingTheElderly`.
- **Biblioteca oficial en SVG (agosto 2026).** El cliente entrego el set completo de iconos MetLife:
  - `assets/icons/category/` — 128 iconos, circulo **Warm Gray** con glifo **Blue 950**. Uso general.
  - `assets/icons/product/` — 27 iconos, circulo **Blue 950** con glifo **blanco**. Lineas de producto.
  Se llaman con `<BrandIcon name="medical-stethoscope" set="category" />` o `name="product/dental"`.
  Lista completa en las cards "Iconos de categoria" e "Iconos de producto" del Design System.
- Los seis PNG originales (`assets/icon-*.png`) siguen disponibles con sus nombres PascalCase; ya no hace
  falta ningun stand-in de Lucide.
- Emoji: nunca. Caracteres unicode como icono: solo el `+` del footer y el guion largo `—` como "no aplica".

## Assets

| Archivo | Origen | Nota |
| --- | --- | --- |
| `assets/logo-metlife-white.png` | Header de la ficha Catastrofico | Version blanca, la que va sobre foto. |
| `assets/logo-metlife.png` | Footer de la ficha | Version color sobre blanco. |
| `assets/logo-interclinica.png` | Footer de la ficha | Logo de clinica: **variable por ficha**, nunca se fija como generico. |
| `assets/icon-shield-protection.png` | Tarjeta "Capital asegurado" | Asset real. |
| `assets/icon-financial-strength.png` | Tarjeta "Deducible" | Asset real. |
| `assets/icons/category/*.svg` | Uso general (128) | Circulo Warm Gray, glifo Blue 950. |
| `assets/icons/product/*.svg` | Lineas de producto (27) | Circulo Blue 950, glifo blanco. |
| `assets/photo-header-clinica.jpg` | Header de la ficha Catastrofico | Unica fotografia disponible. |
| `assets/badge-translucido.png` | Header de la ficha Catastrofico | Referencia del efecto translucido. |

Todos los logos y fotografias fueron **recortados programaticamente** del PDF entregado; ninguno fue
redibujado ni reconstruido.

## Fuentes

Cada archivo se identifico leyendo su tabla `name` y el `italicAngle`: los nombres de archivo entregados
por fonnts.com NO corresponden a su contenido (p. ej. "Ivy-Presto-Text-.otf" es en realidad el Bold).

- **IvyPresto Text** (licenciada) — familia de `--font-display`: titular de producto y cifras de tarjeta.
  Romanas disponibles: Thin 100, Light 300, Semi Bold 600, **Bold 700**. No hay Regular 400.
  El titular usa `--weight-display:700`, que es un archivo real (sin negrita sintetica).
- **IvyPresto Headline** — `--font-headline`: Thin 100, Light 300, Semi Bold 600 romanas. Sin uso en la ficha.
- **IvyPresto Display** — **todos los archivos entregados son cursivas** (-12 grados) en 100/300/600/700.
  Se declaran con `font-style:italic` bajo `--font-display-italic` y **no** se usan en la ficha.
  **Falta**: las romanas de IvyPresto Display, si la marca las exige para el titular.
- **Inter** — se carga desde Google Fonts, es la fuente real del sistema.

---

## Indice

### Raiz
| Archivo | Rol |
| --- | --- |
| `styles.css` | Punto de entrada; solo `@import`. Es el unico archivo que enlaza un consumidor. |
| `thumbnail.html` | Tile del sistema. |
| `SKILL.md` | Envoltorio para usar este sistema como Agent Skill. |
| `readme.md` | Este archivo. |

### Tokens
`tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/layout.css` · `tokens/fonts.css`

### Componentes
Primitivos — `components/primitives/`:
- **Badge** — pildora translucida de capital sobre la foto del header.
- **BrandIcon** — icono circular Blue 950 con glifo blanco.
- **SectionTitle** — titulo de seccion con vineta cuadrada verde.
- **KeyDataCard** — tarjeta de dato clave: icono + cifra + descripcion.

Bloques de ficha — `components/blocks/`:
- **FichaPage** / **FichaBody** — lienzo de ancho fijo y cuerpo con margenes.
- **FichaHeader** — header de alto fijo con foto, degradado, logo, badge y titulo.
- **IntroParagraph** — parrafo introductorio.
- **KeyDataGrid** — fila de 2 tarjetas de datos clave.
- **DataTable** — tabla con encabezado Blue 950, zebra y rotulo de categoria.
- **LegalNotes** — notas al pie en formato (n) en linea.
- **GeneralConditions** — bloque CONDICIONES GENERALES sin marco.
- **FichaFooter** — logos con conector "+" y banda de alianza.

Cada componente trae su `.d.ts` (contrato de props) y su `.prompt.md` (cuando usarlo y las reglas que no
se pueden romper).

**Adiciones intencionales.** `BrandIcon` y `FichaPage`/`FichaBody` no son "componentes" nombrados en la guia:
el primero envuelve el set de iconos para que el circulo oscuro sea imposible de omitir; los segundos fijan
el ancho de pagina y los margenes. Todo lo demas corresponde 1:1 a un bloque de la guia.

### UI kit
`ui_kits/ficha-producto/` — ficha completa e interactiva con los dos productos aprobados. Ver su README para
las limitaciones de contenido.

### Plantilla
`templates/ficha-producto/` — punto de partida para producir una ficha nueva.

### Guidelines
`guidelines/*.card.html` — fichas de especimen (colores, tipografia, espaciado, marca) que alimentan la
pestana Design System.

---

## Reglas de produccion

1. **Encuadre del header**: ningun rostro ni la accion principal de la foto puede quedar bajo el badge o el
   titular. Ver VISUAL FOUNDATIONS y `FichaHeader.prompt.md`.
2. **Llamada sin legal**: si una tabla cita "(1)" y la fuente no trae ese texto, `DataTable` rotula solo
   bajo la tabla "⚠️ Falta legal (1)" — o "Faltan legales (1) (2) (3)" si son varios. Es un aviso
   deliberado para el cliente: nunca se deja la llamada muda ni se inventa el texto.
3. **Datos**: cifras, tramos, porcentajes y edades se transcriben literales de la fuente.
4. **Lista sin datos = tarjeta, no tabla**: una enumeracion de nombres sin porcentajes ni topes
   ("Enfermedades con deducible UF 0", exclusiones) se compone con `BulletGrid`: tarjeta warm gray
   `#F5F2ED`, vinetas verdes, 3 columnas, en el orden exacto de la fuente. Una tabla de una sola
   columna no es una alternativa valida.

---

## Pendientes / no verificables

1. **Verde de tarjetas**: resuelto — manda la ficha aprobada. El relleno de tarjeta es `#CFFBE4`;
   `#8FF5B1` queda para vinetas y links sobre fondo oscuro.
2. **Badge translucido**: resuelto — medido en la ficha aprobada: blanco al 34,9%, sin borde ni blur,
   alto 24,2pt y 14,2pt de aire lateral.
3. **Tamanos tipograficos**: la guia declara solo el tamano de los legales (8-9 pt). El resto de la escala se
   derivo midiendo las fichas aprobadas contra el ancho de pagina conocido (675,12 pt). **Confirmar contra el
   archivo de Design.**
4. **Contenido faltante**: resuelto para Ambulatorio — con la ficha aprobada del 23 de julio se incorporaron
   "Primas mensuales" y "Consideraciones importantes". Siguen faltando los legales de la tabla
   multi-categoria del Catastrofico (recortados en el PDF).
