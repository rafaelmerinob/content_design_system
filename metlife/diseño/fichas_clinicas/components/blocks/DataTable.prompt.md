Tabla de una ficha de producto (coberturas, primas, montos por tramo de edad).

```jsx
<DataTable
  columns={[{ key: 'p', label: 'Prestaciones' }, { key: 'r', label: 'Reembolso maximo por prestacion' }]}
  groups={[{ label: 'Ambulatorio', rows: [{ p: 'Consulta medica (2)', r: '50%' }] }]}
  notes={['(2) Considera consulta urgencia.']}
/>
```

- Encabezado Blue 950 con texto blanco, centrado verticalmente. Fila alternada `#F5F6F8`.
- Rotulo de categoria **siempre horizontal**, nunca rotado 90 grados.
- Orden fijo multi-categoria: Blue 200 (Hospitalario) -> Teal 200 (Ambulatorio) -> Warm Gray 200 (Otros). Una sola categoria: gris neutro claro.
- Las notas van inmediatamente debajo, al ancho de la tabla, en formato `(n)` en linea — nunca superindice.
