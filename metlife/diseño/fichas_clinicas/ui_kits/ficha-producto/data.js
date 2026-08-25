// Contenido real extraído de fichas ya aprobadas por cliente (guía de diseño, páginas 3-10).
window.FICHAS = {
  ambulatorio: {
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
        { key: 'a', label: 'Tope máximo anual por beneficiario', width: '13.6%' },
      ],
      groups: [{ label: 'Ambulatorio', rows: [
        { p: 'Consulta médica (2)', r: '50%', s: '0%', t: 'UF 1', a: '\u2014' },
        { p: 'Cirugía ambulatoria', r: '50%', s: '0%', t: '\u2014', a: '\u2014' },
        { p: 'Exámenes imagenología amb., laboratorio amb. e imagenología amb. alto costo', r: '50%', s: '0%', t: '\u2014', a: '\u2014' },
        { p: 'Procedimientos de diagnóstico (3)', r: '50%', s: '0%', t: '\u2014', a: '\u2014' },
        { p: 'Procedimientos quirúrgicos (3)', r: '50%', s: '0%', t: '\u2014', a: '\u2014' },
        { p: 'Procedimientos terapéuticos', r: '50%', s: '0%', t: 'UF 0,8', a: 'UF 8' },
      ] }],
      notes: [
        '(1) Una vez presentada la nota de reembolso de $0 emitida por la Isapre o Fonasa, o el documento en el que se indique "no cubierto".',
        '(2) Considera consulta urgencia.',
        '(3) Se incluyen los medicamentos suministrados en la atención de urgencias dentro de la Red Interclínica.',
      ],
    }],
  },

  catastrofico: {
    title: ['Seguro Catastrófico', 'Interclínica'],
    badge: 'Capital UF 10.000 por asegurado',
    intro: 'Un seguro que te entrega un respaldo económico ante gastos médicos de alto costo, hospitalarios y ambulatorios, para enfrentar con mayor tranquilidad los eventos de salud más complejos.',
    keyData: [
      { icon: 'ShieldProtection', value: 'UF 10.000', label: 'Capital asegurado por asegurado' },
      { icon: 'FinancialStrength', value: 'UF 40', label: 'Deducible hasta los 69 años' },
    ],
    tables: [{
      title: null,
      columns: [
        { key: 'e', label: 'Edad hasta', width: '46%' },
        { key: 'm', label: 'Monto máximo de reembolso (UF)', align: 'right' },
        { key: 'd', label: 'Deducible (UF)', align: 'right' },
      ],
      groups: [{ rows: [
        { e: '69 años', m: '10.000', d: '40' },
        { e: '70 - 74 años', m: '3.500', d: '150' },
        { e: '75 - 79 años', m: '3.500', d: '250' },
        { e: '80 años en adelante (*)', m: '3.500', d: '350' },
      ] }],
      notes: [],
    }, {
      title: 'Reembolsa prestaciones',
      columns: [
        { key: 'p', label: 'Prestaciones', width: '23.9%' },
        { key: 'c', label: 'Cobertura con bonificación ISAPRE/FONASA', width: '20%' },
        { key: 's', label: 'Cobertura sin bonificación ISAPRE/FONASA (0)', width: '24.1%' },
        { key: 't', label: 'Tope por prestación', width: '15.1%' },
      ],
      groups: [
        { label: 'Hospitalario', rows: [
          { p: 'Día Cama Medicina; UTI; UCI; Intermedio; Recuperación', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Servicio Hospitalario (1)', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Honorarios Médico Quirúrgicos', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Cirugía Dental por Accidente', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Cirugía Plástica por Accidente', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Hospitalización Domiciliaria', c: '100%', s: '50%', t: 'Arancel dia cama Red Interclínica' },
          { p: 'Servicio privado de enfermera', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Servicio de Ambulancia (2)', c: '100%', s: '50%', t: 'UF 10 si el asegurado es hospitalizado' },
        ] },
        { label: 'Ambulatorio', rows: [
          { p: 'Consultas Médicas', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Cirugía Ambulatoria', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Exámenes de Laboratorio e imagenes', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Prótesis y Ortesis Ambulatoria', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Procedimientos de Diagnósticos y Terapéuticos', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Medicina física y rehabilitación ambulatoria', c: '100%', s: '50%', t: 'Sin Tope' },
        ] },
        { label: 'Otros', rows: [
          { p: 'Medicamentos Ambulatorios (3)', c: '50%', s: '25%', t: 'Sin Tope' },
          { p: 'Complicaciones del Embarazo (4)', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Kinesiología Ambulatoria', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Beneficio en el Extranjero', c: '50%', s: '0%', t: 'Sin Tope' },
          { p: 'Obesidad Mórbida No Preexistente', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Atención por Radioterapia, Quimioterapia y Diálisis', c: '100%', s: '50%', t: 'Sin Tope' },
          { p: 'Gastos médicos derivados de SIDA', c: '100%', s: '25%', t: 'Sin Tope' },
        ] },
      ],
      notes: [],
    }],
  },
};

window.CONDICIONES = [
  'Todos los asegurados deberán completar el formulario "Propuesta de Seguro" o "Solicitud de Incorporación al Seguro", y una DPS (Declaración Personal de Salud).',
  'La compañía aseguradora establecerá restricciones y limitaciones de cobertura respecto a situaciones o enfermedades preexistentes declaradas.',
  'La póliza no cubre situaciones y enfermedades preexistentes.',
];
