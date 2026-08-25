/* @ds-bundle: {"format":4,"namespace":"FichasMetLifeDesignSystem_6917a8","components":[{"name":"BulletGrid","sourcePath":"components/blocks/BulletGrid.jsx"},{"name":"DataTable","sourcePath":"components/blocks/DataTable.jsx"},{"name":"FichaFooter","sourcePath":"components/blocks/FichaFooter.jsx"},{"name":"FichaHeader","sourcePath":"components/blocks/FichaHeader.jsx"},{"name":"FichaPage","sourcePath":"components/blocks/FichaPage.jsx"},{"name":"FichaBody","sourcePath":"components/blocks/FichaPage.jsx"},{"name":"GeneralConditions","sourcePath":"components/blocks/GeneralConditions.jsx"},{"name":"IntroParagraph","sourcePath":"components/blocks/IntroParagraph.jsx"},{"name":"KeyDataGrid","sourcePath":"components/blocks/KeyDataGrid.jsx"},{"name":"LegalNotes","sourcePath":"components/blocks/LegalNotes.jsx"},{"name":"Badge","sourcePath":"components/primitives/Badge.jsx"},{"name":"BrandIcon","sourcePath":"components/primitives/BrandIcon.jsx"},{"name":"KeyDataCard","sourcePath":"components/primitives/KeyDataCard.jsx"},{"name":"SectionTitle","sourcePath":"components/primitives/SectionTitle.jsx"}],"sourceHashes":{"components/blocks/BulletGrid.jsx":"241e6cf4ae33","components/blocks/DataTable.jsx":"0fb49105760d","components/blocks/FichaFooter.jsx":"f1b8500e67d8","components/blocks/FichaHeader.jsx":"76d561e9cfcf","components/blocks/FichaPage.jsx":"659bde598318","components/blocks/GeneralConditions.jsx":"faac129a4b14","components/blocks/IntroParagraph.jsx":"ca12c365a7f0","components/blocks/KeyDataGrid.jsx":"3d37518019b9","components/blocks/LegalNotes.jsx":"5446cd90c20f","components/primitives/Badge.jsx":"8909bfb495d3","components/primitives/BrandIcon.jsx":"f7dc81aefb6f","components/primitives/KeyDataCard.jsx":"b650416cfa6d","components/primitives/SectionTitle.jsx":"e777713f1d84","ui_kits/ficha-producto/data.js":"45b89696efb0","ui_kits/ficha-producto/ficha-view.jsx":"dfb8a37e5ed6","ui_kits/ficha-producto/kit-app.jsx":"a56596e393c2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FichasMetLifeDesignSystem_6917a8 = window.FichasMetLifeDesignSystem_6917a8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/blocks/BulletGrid.jsx
try { (() => {
/** Tarjeta de listado en varias columnas: nomina cerrada que viene en la fuente como lista
 *  (enfermedades cubiertas, exclusiones, prestaciones sin tope). No es una tabla: no hay datos
 *  por fila, solo nombres, asi que se compone como tarjeta warm gray con vinetas verdes. */
function BulletGrid({
  items = [],
  columns = 3,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      boxSizing: 'border-box',
      background: 'var(--surface-list-card)',
      borderRadius: 'var(--radius-card)',
      padding: 'var(--space-5) var(--space-6)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      columnGap: 'var(--space-6)',
      rowGap: 'var(--space-4)'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      font: `var(--weight-regular) var(--text-body-size)/1.35 var(--font-body)`,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 'var(--bullet-size)',
      height: 'var(--bullet-size)',
      background: 'var(--bullet-color)',
      flex: 'none',
      marginTop: '3.5pt'
    }
  }), /*#__PURE__*/React.createElement("span", null, it)))));
}
Object.assign(__ds_scope, { BulletGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/BulletGrid.jsx", error: String((e && e.message) || e) }); }

// components/blocks/FichaFooter.jsx
try { (() => {
/** Bloque 6: logos centrados con conector "+" y banda de alianza.
 *  Medido en la ficha de referencia: franja de logos de 76,5pt con filete superior de 0,75pt,
 *  logo MetLife 119,2 x 22,5pt, logo aliado 25,5pt de alto, separacion de 24pt a cada lado del "+",
 *  banda inferior de 36pt con margen lateral de 30pt. */
function FichaFooter({
  partnerLogo,
  partnerName,
  allianceLine,
  link = 'metlife.cl',
  logo,
  assetBase = '../../assets/',
  style
}) {
  const metlife = logo || assetBase + 'logo-metlife.png';
  return /*#__PURE__*/React.createElement("footer", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      boxSizing: 'border-box',
      height: 'var(--footer-logos-height)',
      borderTop: '0.75pt solid var(--rule-hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24pt'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: metlife,
    alt: "MetLife",
    style: {
      height: 'var(--logo-footer-height)',
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) 18pt/1 var(--font-body)`,
      color: 'var(--connector-color)'
    }
  }, "+"), partnerLogo ? /*#__PURE__*/React.createElement("img", {
    src: partnerLogo,
    alt: partnerName || '',
    style: {
      height: 'var(--logo-partner-height)',
      width: 'auto'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) 14pt/1 var(--font-body)`,
      color: 'var(--text-heading)'
    }
  }, partnerName)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-footer-band)',
      minHeight: 'var(--footer-band-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30pt'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) var(--text-table)/1.4 var(--font-body)`,
      color: 'var(--text-on-dark)'
    }
  }, allianceLine), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) var(--text-table)/1.4 var(--font-body)`,
      color: 'var(--link-on-dark)'
    }
  }, link)));
}
Object.assign(__ds_scope, { FichaFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/FichaFooter.jsx", error: String((e && e.message) || e) }); }

// components/blocks/FichaPage.jsx
try { (() => {
/** Lienzo de la ficha: ancho fijo 675,12 pt, alto variable, siempre una sola pagina. */
function FichaPage({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      boxSizing: 'border-box',
      width: 'var(--page-width)',
      background: 'var(--surface-page)',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-body)',
      margin: '0 auto',
      ...style
    }
  }, children);
}

/** Cuerpo con los margenes laterales de la ficha; el header y el footer van a sangre. */
function FichaBody({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      boxSizing: 'border-box',
      padding: 'var(--space-6) var(--page-padding-x) var(--space-5)',
      display: 'grid',
      gap: 'var(--gap-block)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { FichaPage, FichaBody });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/FichaPage.jsx", error: String((e && e.message) || e) }); }

// components/blocks/GeneralConditions.jsx
try { (() => {
/** Bloque CONDICIONES GENERALES: titulo en mayuscula + bullets, sin marco. */
function GeneralConditions({
  title = 'CONDICIONES GENERALES',
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: style
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      margin: 0,
      font: `var(--weight-bold) var(--text-conditions)/1.2 var(--font-body)`,
      letterSpacing: 'var(--tracking-conditions)',
      color: 'var(--text-heading)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 'var(--bullet-size)',
      height: 'var(--bullet-size)',
      background: 'var(--bullet-color)',
      flex: 'none'
    }
  }), title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 'var(--space-4) 0 0',
      padding: 0,
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: 'var(--bullet-size) 1fr',
      gap: 'var(--space-3)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 'var(--bullet-size)',
      height: 'var(--bullet-size)',
      background: 'var(--bullet-color)',
      marginTop: '4pt'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) var(--text-body-size)/var(--text-body-lh) var(--font-body)`,
      color: 'var(--text-body)'
    }
  }, it)))));
}
Object.assign(__ds_scope, { GeneralConditions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/GeneralConditions.jsx", error: String((e && e.message) || e) }); }

// components/blocks/IntroParagraph.jsx
try { (() => {
/** Parrafo introductorio, justo debajo del header oscuro. */
function IntroParagraph({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: `var(--weight-regular) var(--text-intro)/var(--text-intro-lh) var(--font-body)`,
      color: 'var(--text-body)',
      textWrap: 'pretty',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { IntroParagraph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/IntroParagraph.jsx", error: String((e && e.message) || e) }); }

// components/blocks/LegalNotes.jsx
try { (() => {
/** Notas al pie de una tabla. Formato (n) en linea, 8-9 pt, nunca superindice.
 *  `missing` lista las llamadas presentes en la tabla cuyo texto legal NO venia en la fuente:
 *  se rotulan con un aviso visible para que el cliente complete antes de publicar. */
function LegalNotes({
  notes = [],
  missing = [],
  style
}) {
  const base = {
    font: `var(--weight-regular) var(--text-legal-size)/var(--text-legal-lh) var(--font-body)`,
    color: 'var(--text-legal)'
  };
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 'var(--gap-legal) 0 0',
      padding: 0,
      ...style
    }
  }, notes.map((n, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: base
  }, n)), missing.length > 0 && /*#__PURE__*/React.createElement("li", {
    style: {
      ...base,
      display: 'flex',
      gap: '4pt',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("span", null, missing.length === 1 ? 'Falta legal' : 'Faltan legales', " ", missing.map(m => '(' + m + ')').join(' '))));
}
Object.assign(__ds_scope, { LegalNotes });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/LegalNotes.jsx", error: String((e && e.message) || e) }); }

// components/blocks/DataTable.jsx
try { (() => {
const CATEGORY_ORDER = ['var(--category-1)', 'var(--category-2)', 'var(--category-3)'];

/** Detecta llamadas (n) en encabezados y celdas y devuelve las que no tienen nota escrita. */
function findMissingNotes(columns, groups, notes) {
  const found = new Set();
  const scan = v => {
    if (typeof v !== 'string') return;
    const m = v.match(/\((\d+)\)/g);
    if (m) m.forEach(x => found.add(x.slice(1, -1)));
  };
  columns.forEach(c => scan(c.label));
  groups.forEach(g => {
    scan(g.label);
    g.rows.forEach(r => Object.values(r).forEach(scan));
  });
  const covered = new Set();
  notes.forEach(n => {
    if (typeof n === 'string') {
      const m = n.match(/^\s*\((\d+)\)/);
      if (m) covered.add(m[1]);
    }
  });
  return [...found].filter(n => !covered.has(n)).sort((a, b) => a - b);
}

/** Tabla de ficha: encabezado Blue 950, zebra fria, rotulo de categoria horizontal.
 *  Si una celda cita una llamada (n) que no tiene nota escrita, la tabla rotula sola
 *  "\u26A0\uFE0F Faltan legales (n)" bajo la tabla: la ficha nunca sale con una llamada muda. */
function DataTable({
  columns = [],
  groups = [],
  notes = [],
  missingNotes,
  style
}) {
  const missing = missingNotes || findMissingNotes(columns, groups, notes);
  const hasLabels = groups.some(g => g.label);
  const single = groups.length === 1;
  let rowIndex = -1;
  const cell = (align, extra) => ({
    boxSizing: 'border-box',
    padding: 'var(--cell-padding-y) var(--cell-padding-x)',
    textAlign: align || 'left',
    verticalAlign: 'middle',
    overflowWrap: 'break-word',
    font: `var(--weight-regular) var(--text-table)/var(--text-table-lh) var(--font-body)`,
    color: 'var(--text-body)',
    ...extra
  });
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-table)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("colgroup", null, hasLabels && /*#__PURE__*/React.createElement("col", {
    style: {
      width: 'var(--table-label-col)'
    }
  }), columns.map((c, i) => /*#__PURE__*/React.createElement("col", {
    key: i,
    style: {
      width: c.width
    }
  }))), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-table-header)'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    colSpan: hasLabels && i === 0 ? 2 : 1,
    style: cell(hasLabels && i === 0 ? 'center' : c.align, {
      color: 'var(--text-on-dark)',
      fontWeight: 'var(--weight-semibold)',
      paddingTop: 'var(--space-3)',
      paddingBottom: 'var(--space-3)'
    })
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, groups.map((g, gi) => g.rows.map((row, ri) => {
    rowIndex += 1;
    const zebra = rowIndex % 2 === 1;
    return /*#__PURE__*/React.createElement("tr", {
      key: gi + '-' + ri,
      style: {
        background: zebra ? 'var(--surface-row-zebra)' : 'var(--surface-row)'
      }
    }, hasLabels && ri === 0 && /*#__PURE__*/React.createElement("td", {
      rowSpan: g.rows.length,
      style: cell('center', {
        background: g.color || (single ? 'var(--category-single)' : CATEGORY_ORDER[gi % 3]),
        fontWeight: 'var(--weight-semibold)',
        writingMode: 'horizontal-tb'
      })
    }, g.label), columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: cell(c.align, ci === 0 ? {
        fontWeight: 'var(--weight-regular)'
      } : null)
    }, row[c.key])));
  }))))), (notes.length > 0 || missing.length > 0) && /*#__PURE__*/React.createElement(__ds_scope.LegalNotes, {
    notes: notes,
    missing: missing
  }));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Badge.jsx
try { (() => {
/** Badge de capital: pildora translucida sobre la foto del header.
 *  Medido en la ficha aprobada: relleno blanco al 34,9%, sin borde ni blur,
 *  alto 24,2pt y 14,2pt de aire lateral. */
function Badge({
  children,
  style
}) {
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '24.2pt',
    padding: '0 14.2pt',
    borderRadius: 'var(--radius-pill)',
    background: 'var(--badge-fill)',
    color: 'var(--text-on-dark)',
    font: `var(--weight-medium) var(--text-badge)/1.2 var(--font-body)`,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", {
    style: s
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Badge.jsx", error: String((e && e.message) || e) }); }

// components/blocks/FichaHeader.jsx
try { (() => {
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
function FichaHeader({
  title,
  badge,
  photo,
  photoPosition = 'center bottom',
  photoZoom = 1,
  logo,
  assetBase = '../../assets/',
  style
}) {
  const photoSrc = photo || assetBase + 'photo-header-clinica.jpg';
  const logoSrc = logo || assetBase + 'logo-metlife-white.png';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      height: 'var(--header-height)',
      overflow: 'hidden',
      background: 'var(--blue-950)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photoSrc,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: photoPosition,
      transform: photoZoom !== 1 ? `scale(${photoZoom})` : undefined,
      transformOrigin: photoPosition
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(0,54,82,.94) 0%, rgba(0,54,82,.86) 26%, rgba(0,54,82,.42) 58%, rgba(0,54,82,.18) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: '21pt var(--page-padding-x) 43pt'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "MetLife",
    style: {
      height: 'var(--logo-header-height)',
      width: 'auto',
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '12pt',
      justifyItems: 'start'
    }
  }, badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, null, badge), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      maxWidth: '82%',
      whiteSpace: 'pre-line',
      font: `var(--weight-display) var(--text-headline)/var(--text-headline-lh) var(--font-display)`,
      color: 'var(--text-on-dark)'
    }
  }, title))));
}
Object.assign(__ds_scope, { FichaHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/FichaHeader.jsx", error: String((e && e.message) || e) }); }

// components/primitives/BrandIcon.jsx
try { (() => {
/** Set original de 6 iconos PNG (circulo solido con glifo blanco) entregados por el cliente. */
const REAL = {
  ShieldProtection: 'icon-shield-protection.png',
  FinancialStrength: 'icon-financial-strength.png',
  Stethoscope: 'icon-stethoscope.png',
  Heart: 'icon-heart.png',
  Family: 'icon-family.png',
  HelpingTheElderly: 'icon-helping-the-elderly.png'
};
const LIGHT = {
  ShieldProtection: 'icon-shield-protection-light.png',
  Family: 'icon-family-light.png'
};

/** Resuelve el archivo a partir de name/set.
 *  - PascalCase ('Heart', 'ShieldProtection') -> set original PNG.
 *  - kebab-case ('medical-stethoscope') -> biblioteca SVG, carpeta segun `set`.
 *  - con barra ('product/dental') -> ruta explicita dentro de la biblioteca. */
function resolve(name, set, variant) {
  if (name.includes('/')) return 'icons/' + name.replace(/\.svg$/, '') + '.svg';
  if (/^[a-z0-9-]+$/.test(name)) return 'icons/' + (set || 'category') + '/' + name + '.svg';
  return variant === 'light' && LIGHT[name] || REAL[name] || REAL.ShieldProtection;
}

/** Icono circular del sistema de fichas. */
function BrandIcon({
  name = 'ShieldProtection',
  set = 'category',
  variant = 'dark',
  size,
  assetBase = '../../assets/',
  style
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: assetBase + resolve(name, set, variant),
    alt: "",
    style: {
      width: size || 'var(--icon-circle-size)',
      height: size || 'var(--icon-circle-size)',
      borderRadius: '50%',
      flex: 'none',
      objectFit: 'cover',
      ...style
    }
  });
}
Object.assign(__ds_scope, { BrandIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/BrandIcon.jsx", error: String((e && e.message) || e) }); }

// components/primitives/KeyDataCard.jsx
try { (() => {
/** Tarjeta de dato clave: icono circular + cifra grande + descripcion corta. */
function KeyDataCard({
  icon = 'ShieldProtection',
  value,
  label,
  assetBase,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      background: 'var(--surface-key-data)',
      borderRadius: 'var(--radius-card)',
      padding: 'var(--space-4) var(--space-5)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.BrandIcon, {
    name: icon,
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-display) var(--text-numeral)/var(--text-numeral-lh) var(--font-display)`,
      color: 'var(--text-heading)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-regular) var(--text-body-size)/1.3 var(--font-body)`,
      color: 'var(--text-body)',
      marginTop: '2pt'
    }
  }, label)));
}
Object.assign(__ds_scope, { KeyDataCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/KeyDataCard.jsx", error: String((e && e.message) || e) }); }

// components/blocks/KeyDataGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Fila de 2 tarjetas de datos clave. */
function KeyDataGrid({
  items = [],
  assetBase,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length || 2}, 1fr)`,
      gap: 'var(--gap-cards)',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(__ds_scope.KeyDataCard, _extends({
    key: i
  }, it, {
    assetBase: assetBase
  }))));
}
Object.assign(__ds_scope, { KeyDataGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/blocks/KeyDataGrid.jsx", error: String((e && e.message) || e) }); }

// components/primitives/SectionTitle.jsx
try { (() => {
/** Titulo de seccion: vineta cuadrada verde + texto Blue 950. */
function SectionTitle({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      margin: 0,
      font: `var(--weight-bold) var(--text-section)/1.2 var(--font-body)`,
      color: 'var(--text-heading)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 'var(--bullet-size)',
      height: 'var(--bullet-size)',
      background: 'var(--bullet-color)',
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ficha-producto/data.js
try { (() => {
// Contenido real extraído de fichas ya aprobadas por cliente (guía de diseño, páginas 3-10).
window.FICHAS = {
  ambulatorio: {
    title: 'Seguro Ambulatorio',
    badge: 'Capital UF 100 por asegurado',
    intro: 'Un seguro que te entrega respaldo económico para tus consultas médicas, cirugías y exámenes ambulatorios, reembolsando parte de tu gasto para que puedas cuidar tu salud con mayor tranquilidad.',
    keyData: [{
      icon: 'ShieldProtection',
      value: 'UF 100',
      label: 'Capital asegurado por asegurado'
    }, {
      icon: 'FinancialStrength',
      value: 'UF 0,5',
      label: 'Deducible por asegurado'
    }],
    tables: [{
      title: 'Reembolsa prestaciones',
      columns: [{
        key: 'p',
        label: 'Prestaciones',
        width: '20.6%'
      }, {
        key: 'r',
        label: 'Reembolso máximo por prestación',
        width: '15.1%'
      }, {
        key: 's',
        label: 'Cobertura sin bonificación ISAPRE/FONASA (1)',
        width: '19.5%'
      }, {
        key: 't',
        label: 'Tope por prestación por asegurado',
        width: '14.4%'
      }, {
        key: 'a',
        label: 'Tope máximo anual por beneficiario',
        width: '13.6%'
      }],
      groups: [{
        label: 'Ambulatorio',
        rows: [{
          p: 'Consulta médica (2)',
          r: '50%',
          s: '0%',
          t: 'UF 1',
          a: '\u2014'
        }, {
          p: 'Cirugía ambulatoria',
          r: '50%',
          s: '0%',
          t: '\u2014',
          a: '\u2014'
        }, {
          p: 'Exámenes imagenología amb., laboratorio amb. e imagenología amb. alto costo',
          r: '50%',
          s: '0%',
          t: '\u2014',
          a: '\u2014'
        }, {
          p: 'Procedimientos de diagnóstico (3)',
          r: '50%',
          s: '0%',
          t: '\u2014',
          a: '\u2014'
        }, {
          p: 'Procedimientos quirúrgicos (3)',
          r: '50%',
          s: '0%',
          t: '\u2014',
          a: '\u2014'
        }, {
          p: 'Procedimientos terapéuticos',
          r: '50%',
          s: '0%',
          t: 'UF 0,8',
          a: 'UF 8'
        }]
      }],
      notes: ['(1) Una vez presentada la nota de reembolso de $0 emitida por la Isapre o Fonasa, o el documento en el que se indique "no cubierto".', '(2) Considera consulta urgencia.', '(3) Se incluyen los medicamentos suministrados en la atención de urgencias dentro de la Red Interclínica.']
    }]
  },
  catastrofico: {
    title: ['Seguro Catastrófico', 'Interclínica'],
    badge: 'Capital UF 10.000 por asegurado',
    intro: 'Un seguro que te entrega un respaldo económico ante gastos médicos de alto costo, hospitalarios y ambulatorios, para enfrentar con mayor tranquilidad los eventos de salud más complejos.',
    keyData: [{
      icon: 'ShieldProtection',
      value: 'UF 10.000',
      label: 'Capital asegurado por asegurado'
    }, {
      icon: 'FinancialStrength',
      value: 'UF 40',
      label: 'Deducible hasta los 69 años'
    }],
    tables: [{
      title: null,
      columns: [{
        key: 'e',
        label: 'Edad hasta',
        width: '46%'
      }, {
        key: 'm',
        label: 'Monto máximo de reembolso (UF)',
        align: 'right'
      }, {
        key: 'd',
        label: 'Deducible (UF)',
        align: 'right'
      }],
      groups: [{
        rows: [{
          e: '69 años',
          m: '10.000',
          d: '40'
        }, {
          e: '70 - 74 años',
          m: '3.500',
          d: '150'
        }, {
          e: '75 - 79 años',
          m: '3.500',
          d: '250'
        }, {
          e: '80 años en adelante (*)',
          m: '3.500',
          d: '350'
        }]
      }],
      notes: []
    }, {
      title: 'Reembolsa prestaciones',
      columns: [{
        key: 'p',
        label: 'Prestaciones',
        width: '23.9%'
      }, {
        key: 'c',
        label: 'Cobertura con bonificación ISAPRE/FONASA',
        width: '20%'
      }, {
        key: 's',
        label: 'Cobertura sin bonificación ISAPRE/FONASA (0)',
        width: '24.1%'
      }, {
        key: 't',
        label: 'Tope por prestación',
        width: '15.1%'
      }],
      groups: [{
        label: 'Hospitalario',
        rows: [{
          p: 'Día Cama Medicina; UTI; UCI; Intermedio; Recuperación',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Servicio Hospitalario (1)',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Honorarios Médico Quirúrgicos',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Cirugía Dental por Accidente',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Cirugía Plástica por Accidente',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Hospitalización Domiciliaria',
          c: '100%',
          s: '50%',
          t: 'Arancel dia cama Red Interclínica'
        }, {
          p: 'Servicio privado de enfermera',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Servicio de Ambulancia (2)',
          c: '100%',
          s: '50%',
          t: 'UF 10 si el asegurado es hospitalizado'
        }]
      }, {
        label: 'Ambulatorio',
        rows: [{
          p: 'Consultas Médicas',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Cirugía Ambulatoria',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Exámenes de Laboratorio e imagenes',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Prótesis y Ortesis Ambulatoria',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Procedimientos de Diagnósticos y Terapéuticos',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Medicina física y rehabilitación ambulatoria',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }]
      }, {
        label: 'Otros',
        rows: [{
          p: 'Medicamentos Ambulatorios (3)',
          c: '50%',
          s: '25%',
          t: 'Sin Tope'
        }, {
          p: 'Complicaciones del Embarazo (4)',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Kinesiología Ambulatoria',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Beneficio en el Extranjero',
          c: '50%',
          s: '0%',
          t: 'Sin Tope'
        }, {
          p: 'Obesidad Mórbida No Preexistente',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Atención por Radioterapia, Quimioterapia y Diálisis',
          c: '100%',
          s: '50%',
          t: 'Sin Tope'
        }, {
          p: 'Gastos médicos derivados de SIDA',
          c: '100%',
          s: '25%',
          t: 'Sin Tope'
        }]
      }],
      notes: []
    }]
  }
};
window.CONDICIONES = ['Todos los asegurados deberán completar el formulario "Propuesta de Seguro" o "Solicitud de Incorporación al Seguro", y una DPS (Declaración Personal de Salud).', 'La compañía aseguradora establecerá restricciones y limitaciones de cobertura respecto a situaciones o enfermedades preexistentes declaradas.', 'La póliza no cubre situaciones y enfermedades preexistentes.'];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ficha-producto/data.js", error: String((e && e.message) || e) }); }

// ui_kits/ficha-producto/ficha-view.jsx
try { (() => {
// Nada de lectura del design system en el top level: este archivo tambien es barrido por el
// compilador del design system, donde window.DS no existe. Se resuelve dentro del componente.
function Ficha({
  data,
  partner
}) {
  const {
    FichaPage,
    FichaBody,
    FichaHeader,
    IntroParagraph,
    KeyDataGrid,
    SectionTitle,
    DataTable,
    GeneralConditions,
    FichaFooter
  } = window.DS || window.FichasMetLifeDesignSystem_6917a8;
  const title = Array.isArray(data.title) ? data.title.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("br", null), l)) : data.title;
  return /*#__PURE__*/React.createElement(FichaPage, null, /*#__PURE__*/React.createElement(FichaHeader, {
    assetBase: "../../assets/",
    badge: data.badge,
    title: title
  }), /*#__PURE__*/React.createElement(FichaBody, null, /*#__PURE__*/React.createElement(IntroParagraph, null, data.intro), /*#__PURE__*/React.createElement(KeyDataGrid, {
    assetBase: "../../assets/",
    items: data.keyData
  }), data.tables.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 'var(--gap-section-title)'
    }
  }, t.title && /*#__PURE__*/React.createElement(SectionTitle, null, t.title), /*#__PURE__*/React.createElement(DataTable, {
    columns: t.columns,
    groups: t.groups,
    notes: t.notes
  }))), /*#__PURE__*/React.createElement(GeneralConditions, {
    items: [...window.CONDICIONES, /*#__PURE__*/React.createElement(React.Fragment, null, "Es exclusivo para atenciones en la ", /*#__PURE__*/React.createElement("b", null, "Red ", partner.name), ".")]
  })), /*#__PURE__*/React.createElement(FichaFooter, {
    assetBase: "../../assets/",
    partnerLogo: partner.logo,
    partnerName: partner.name,
    allianceLine: `Alianza MetLife · ${partner.name}`
  }));
}
Object.assign(window, {
  Ficha
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ficha-producto/ficha-view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ficha-producto/kit-app.jsx
try { (() => {
const PARTNER = {
  name: 'Interclínica',
  logo: '../../assets/logo-interclinica.png'
};
const PRODUCTS = [{
  id: 'ambulatorio',
  label: 'Seguro Ambulatorio'
}, {
  id: 'catastrofico',
  label: 'Seguro Catastrófico'
}];
const chromeStyles = {
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 5,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 16px',
    background: 'var(--blue-950)',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: 12
  },
  tab: on => ({
    padding: '6px 14px',
    borderRadius: 999,
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,.35)',
    background: on ? 'var(--green-300)' : 'transparent',
    color: on ? 'var(--blue-950)' : '#fff',
    font: '500 12px/1 var(--font-body)',
    transition: 'background .15s ease, color .15s ease'
  }),
  desk: {
    background: '#DCE1E6',
    padding: '28px 0 48px',
    minHeight: '100vh'
  },
  sheet: {
    boxShadow: '0 10px 30px rgba(0,54,82,.18)'
  }
};
function App() {
  const [id, setId] = React.useState('catastrofico');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: chromeStyles.bar
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .7,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      fontSize: 10
    }
  }, "Ficha de producto"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, PRODUCTS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    style: chromeStyles.tab(p.id === id),
    onClick: () => setId(p.id)
  }, p.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      opacity: .7
    }
  }, "675,12 pt de ancho \xB7 una sola p\xE1gina")), /*#__PURE__*/React.createElement("div", {
    style: chromeStyles.desk
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--page-width)',
      margin: '0 auto',
      ...chromeStyles.sheet
    }
  }, React.createElement(window.Ficha, {
    data: window.FICHAS[id],
    partner: PARTNER
  }))));
}

// El montaje lo dispara index.html, no el top level: este archivo tambien queda dentro del
// bundle del design system y ahi no debe tomar el #root de la pagina anfitriona.
window.mountFichaKit = () => ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ficha-producto/kit-app.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BulletGrid = __ds_scope.BulletGrid;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.FichaFooter = __ds_scope.FichaFooter;

__ds_ns.FichaHeader = __ds_scope.FichaHeader;

__ds_ns.FichaPage = __ds_scope.FichaPage;

__ds_ns.FichaBody = __ds_scope.FichaBody;

__ds_ns.GeneralConditions = __ds_scope.GeneralConditions;

__ds_ns.IntroParagraph = __ds_scope.IntroParagraph;

__ds_ns.KeyDataGrid = __ds_scope.KeyDataGrid;

__ds_ns.LegalNotes = __ds_scope.LegalNotes;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BrandIcon = __ds_scope.BrandIcon;

__ds_ns.KeyDataCard = __ds_scope.KeyDataCard;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

})();
