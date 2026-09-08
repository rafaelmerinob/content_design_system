import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import mammoth from 'mammoth';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const SYSTEM_PROMPT = `Eres un experto en el Design System de Fichas de Producto MetLife Chile.
Tu trabajo es recibir un brief de contenido extraído de un documento Word y devolver un JSON estructurado que se usará para renderizar la ficha.

DEBES DEDUCIR:
- "title": El título principal del producto (ej: Seguro Catastrófico Interclínica). Si es muy largo, puedes separarlo en un array de dos líneas: ["Seguro Catastrófico", "Interclínica"].
- "partnerName": El nombre de la clínica (ej: Interclínica). Si no es explícito, puedes dejarlo como "MetLife" o vacío.

REGLAS ESTRICTAS:
- Las cifras, tramos, porcentajes y edades se transcriben LITERALES de la fuente
- Los legales NUNCA se inventan ni se adaptan
- Formato chileno para números: coma decimal, punto de miles (UF 0,5 · UF 10.000)
- Unidad antes de cifra: "UF 100", no "100 UF"
- Capitalización: Usar SIEMPRE "Sentence case" (solo mayúscula inicial) en todos los encabezados, subtítulos y categorías (ej. "Cobertura ambulatoria", NO "Cobertura Ambulatoria").
- Valores nulos/vacíos: Usar EXCLUSIVAMENTE la raya larga o em-dash ("—") para celdas vacías. JAMÁS usar el guion corto ("-"). Nunca dejar celdas sin datos (escribir "Sin Tope" o "0%" si corresponde).
- Si falta un legal referenciado en la tabla (ej. con (1)) pero no está en el texto original, incluir OBLIGATORIAMENTE el aviso "⚠️ Falta legal (1)" en el array de "notes". Las llamadas deben ir en línea, no en superíndice.
- PROHIBICIÓN ABSOLUTA: Cero emojis, cero signos de exclamación en todo el documento.
- Las cajas de beneficios principales ("keyData") DEBEN extraerse estrictamente del brief. NO INVENTAR NI INFERIR datos.
- Su cantidad DEBE COINCIDIR EXACTAMENTE con las cifras destacadas explícitamente en el encabezado o viñetas principales del brief (generalmente son solo 2: Capital y Deducible). NUNCA agregues un tercer o cuarto elemento si el documento fuente no lo destaca en su cabecera principal.
- Las listas de nombres sin datos (ej. exclusiones, enfermedades, sin topes) van en "bulletGrids", NUNCA en "tables" de una columna.
- Agrupación de tablas: Si el brief tiene múltiples sub-tablas bajo un mismo tema (ej. Cobertura Catastrófica dividida en Hospitalaria, Ambulatoria, Ampliación) y comparten las mismas columnas, agrúpalas OBLIGATORIAMENTE en UNA SOLA "table" usando el array "groups" (ej. label: "Hospitalario", label: "Ambulatorio"). No crees 3 tablas separadas.
- En "tables", asigna anchos ("width") proporcionales y coherentes a las columnas que SUMEN EXACTAMENTE 100% (ej. 40%, 30%, 30%), de lo contrario la tabla se romperá.
- No agregar elementos que no estén en el brief
- El párrafo introductorio habla de "tú" al asegurado
- Las condiciones generales usan tercera persona institucional
- Tono sobrio, tranquilizador, sin venta dura

FORMATO DE RESPUESTA (JSON estricto):
{
  "title": "Nombre del Producto" | ["Línea 1", "Línea 2"],
  "badge": "Capital UF X.XXX por asegurado",
  "intro": "Párrafo introductorio...",
  "keyData": [
    { "icon": "ShieldProtection|FinancialStrength|Stethoscope|Heart|Family|HelpingTheElderly", "value": "UF X.XXX", "label": "Descripción" }
  ],
  "tables": [
    {
      "title": "Título de sección" | null,
      "columns": [{ "key": "col_id", "label": "Encabezado", "width": "XX%", "align": "left|right" }],
      "groups": [
        { "label": "Categoría" | null, "rows": [{ "col_id": "valor" }] }
      ],
      "notes": ["(1) Texto del legal..."]
    }
  ],
  "bulletGrids": [
    {
      "title": "Título de sección" | null,
      "items": ["Elemento 1", "Elemento 2"]
    }
  ],
  "conditions": ["Condición general 1...", "Condición general 2..."],
  "partnerName": "Nombre de la clínica"
}

ICONOS DISPONIBLES: ShieldProtection (protección/cobertura), FinancialStrength (dinero/monto), Stethoscope (consulta clínica), Heart (salud general), Family (titular + cargas), HelpingTheElderly (adultos mayores).

Responde SOLO con el JSON, sin markdown, sin explicación.`;

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const briefFile = formData.get('briefFile');
    const photoFile = formData.get('photoFile');
    const logoFile = formData.get('logoFile');
    const fichaType = formData.get('fichaType');
    
    let providedTitle = null;
    const titleStr = formData.get('title');
    if (titleStr) {
      try { providedTitle = JSON.parse(titleStr); } catch(e) {}
    }

    if (!briefFile) {
      return NextResponse.json({ error: 'Brief de contenido (Word) requerido' }, { status: 400 });
    }

    // 1. Process Word document
    const buffer = Buffer.from(await briefFile.arrayBuffer());
    const result = await mammoth.extractRawText({ buffer });
    const briefText = result.value;

    // 2. Save Images locally (in public/uploads)
    let headerPhoto = null;
    let partnerLogo = null;
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // Create uploads dir if it doesn't exist (optional, but assumed to exist or we can just try to write)
    const fs = require('fs');
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (photoFile && photoFile.name) {
      const ext = photoFile.name.split('.').pop();
      const filename = `photo-${Date.now()}.${ext}`;
      const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
      await writeFile(join(uploadDir, filename), photoBuffer);
      headerPhoto = `/uploads/${filename}`;
    }

    if (logoFile && logoFile.name) {
      const ext = logoFile.name.split('.').pop();
      const filename = `logo-${Date.now()}.${ext}`;
      const logoBuffer = Buffer.from(await logoFile.arrayBuffer());
      await writeFile(join(uploadDir, filename), logoBuffer);
      partnerLogo = `/uploads/${filename}`;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your-api-key-here') {
      // Return demo data when no API key is configured
      return NextResponse.json({
        ficha: buildDemoFicha(headerPhoto, partnerLogo),
        source: 'demo',
      });
    }

    const client = new Anthropic({ apiKey });

    const userMessage = [
      `Tipo de ficha: ${fichaType || 'clinica'}`,
      providedTitle ? `TÍTULO OBLIGATORIO DE LA FICHA A USAR: ${JSON.stringify(providedTitle)}` : '',
      `\nBRIEF EXTRAÍDO DEL DOCUMENTO WORD:\n${briefText}`,
    ].filter(Boolean).join('\n');

    const models = [
      'claude-3-5-sonnet-20241022',
      'claude-sonnet-5',
      'claude-opus-5',
      'claude-fable-5',
      'claude-haiku-4-5',
      'claude-3-5-sonnet-20240620'
    ];
    let message;
    for (const model of models) {
      try {
        message = await client.messages.create({
          model: model,
          max_tokens: 20000,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userMessage }],
        });
        break;
      } catch (err) {
        if (err.status === 404 && model !== models[models.length - 1]) {
          console.warn(`Model ${model} not found, falling back...`);
          continue;
        }
        throw err;
      }
    }

    const textBlock = message.content.find(block => block.type === 'text');
    const responseText = textBlock ? textBlock.text : '';

    // Parse JSON from response
    let ficha;
    try {
      let jsonString = responseText;
      const firstBrace = jsonString.indexOf('{');
      const lastBrace = jsonString.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonString = jsonString.slice(firstBrace, lastBrace + 1);
      }
      ficha = JSON.parse(jsonString);
      
      // Inject user overrides and uploaded images
      if (providedTitle) ficha.title = providedTitle;
      if (headerPhoto) ficha.headerPhoto = headerPhoto;
      if (partnerLogo) ficha.partnerLogo = partnerLogo;
      
    } catch (parseErr) {
      console.error('FAILED TO PARSE CLAUDE RESPONSE:', responseText);
      console.error('FULL MESSAGE OBJECT:', JSON.stringify(message, null, 2));
      return NextResponse.json({
        error: 'Error al parsear la respuesta de Claude',
        raw: responseText,
      }, { status: 500 });
    }

    return NextResponse.json({ ficha, source: 'claude' });

  } catch (err) {
    console.error('Claude API error:', err);
    return NextResponse.json({
      error: err.message || 'Error interno del servidor',
    }, { status: 500 });
  }
}

function buildDemoFicha(headerPhoto, partnerLogo) {
  return {
    title: 'Seguro Ambulatorio',
    badge: 'Capital UF 100 por asegurado',
    intro: 'Un seguro que te entrega respaldo económico para tus consultas médicas, cirugías y exámenes ambulatorios, reembolsando parte de tu gasto para que puedas cuidar tu salud con mayor tranquilidad.',
    keyData: [
      { icon: 'ShieldProtection', value: 'UF 100', label: 'Capital asegurado por asegurado' },
      { icon: 'FinancialStrength', value: 'UF 0,5', label: 'Deducible por asegurado' },
    ],
    tables: [{
      title: 'Reembolsa prestaciones',
      columns: [
        { key: 'p', label: 'Prestaciones', width: '20.6%' },
        { key: 'r', label: 'Reembolso máximo por prestación', width: '15.1%' },
        { key: 's', label: 'Cobertura sin bonificación ISAPRE/FONASA (1)', width: '19.5%' },
        { key: 't', label: 'Tope por prestación por asegurado', width: '14.4%' },
      ],
      groups: [{ label: 'Ambulatorio', rows: [
        { p: 'Consulta médica (2)', r: '50%', s: '0%', t: 'UF 1' },
        { p: 'Cirugía ambulatoria', r: '50%', s: '0%', t: '\u2014' },
        { p: 'Exámenes imagenología amb., laboratorio amb.', r: '50%', s: '0%', t: '\u2014' },
      ] }],
      notes: [
        '(1) Una vez presentada la nota de reembolso de $0 emitida por la Isapre o Fonasa.',
        '(2) Considera consulta urgencia.',
      ],
    }],
    conditions: [
      'Todos los asegurados deberán completar el formulario "Propuesta de Seguro" o "Solicitud de Incorporación al Seguro", y una DPS.',
      'La compañía aseguradora establecerá restricciones y limitaciones de cobertura respecto a situaciones o enfermedades preexistentes declaradas.',
      'La póliza no cubre situaciones y enfermedades preexistentes.',
    ],
    partnerName: 'Interclínica',
    partnerLogo: partnerLogo || 'logo-interclinica.png',
    headerPhoto: headerPhoto || null,
  };
}
