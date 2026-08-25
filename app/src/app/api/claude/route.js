import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `Eres un experto en el Design System de Fichas de Producto MetLife Chile.
Tu trabajo es recibir un brief de contenido y devolver un JSON estructurado que se usará para renderizar la ficha.

REGLAS ESTRICTAS:
- Las cifras, tramos, porcentajes y edades se transcriben LITERALES de la fuente
- Los legales NUNCA se inventan ni se adaptan
- Formato chileno para números: coma decimal, punto de miles (UF 0,5 · UF 10.000)
- Unidad antes de cifra: "UF 100", no "100 UF"
- Si falta un legal referenciado con (1), (2), etc., incluir el aviso "⚠️ Falta legal (N)"
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
  "conditions": ["Condición general 1...", "Condición general 2..."],
  "partnerName": "Nombre de la clínica",
  "partnerLogo": "logo-interclinica.png"
}

ICONOS DISPONIBLES: ShieldProtection (protección/cobertura), FinancialStrength (dinero/monto), Stethoscope (consulta clínica), Heart (salud general), Family (titular + cargas), HelpingTheElderly (adultos mayores).

Responde SOLO con el JSON, sin markdown, sin explicación.`;

export async function POST(request) {
  try {
    const { brief, productName, clinicName, fichaType } = await request.json();

    if (!brief) {
      return NextResponse.json({ error: 'Brief de contenido requerido' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your-api-key-here') {
      // Return demo data when no API key is configured
      return NextResponse.json({
        ficha: buildDemoFicha(productName, clinicName),
        source: 'demo',
      });
    }

    const client = new Anthropic({ apiKey });

    const userMessage = [
      `Tipo de ficha: ${fichaType || 'clinica'}`,
      productName ? `Producto: ${productName}` : '',
      clinicName ? `Clínica: ${clinicName}` : '',
      `\nBRIEF DE CONTENIDO:\n${brief}`,
    ].filter(Boolean).join('\n');

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const responseText = message.content[0]?.text || '';

    // Parse JSON from response
    let ficha;
    try {
      // Try to extract JSON from possible markdown code block
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, responseText];
      ficha = JSON.parse(jsonMatch[1].trim());
    } catch (parseErr) {
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

function buildDemoFicha(productName, clinicName) {
  return {
    title: productName || 'Seguro Ambulatorio',
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
    partnerName: clinicName || 'Interclínica',
    partnerLogo: 'logo-interclinica.png',
  };
}
