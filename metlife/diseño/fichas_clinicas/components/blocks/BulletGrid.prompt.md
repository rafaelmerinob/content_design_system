Para una nomina cerrada que la fuente entrega como lista de nombres, sin datos por fila: **no va como tabla**, va como tarjeta warm gray con vinetas verdes en columnas.

```jsx
<SectionTitle>Enfermedades con deducible UF 0</SectionTitle>
<BulletGrid items={['Cáncer', 'Infarto al miocardio', 'Accidente vascular cerebral', 'Insuficiencia renal crónica']} />
```

- **Cuando usarlo**: el Word trae una enumeracion (enfermedades cubiertas, exclusiones, prestaciones sin tope) donde cada linea es solo un nombre. Una tabla de una sola columna se ve vacia y desalineada; esta tarjeta resuelve el mismo contenido.
- **Cuando NO usarlo**: si cada item trae porcentaje, tope o monto, es una `DataTable`.
- Se lee por filas, de izquierda a derecha, en el **orden exacto de la fuente**: no se alfabetiza ni se agrupa por tipo.
- `columns={3}` por defecto; bajar a 2 si los nombres se parten en tres o mas lineas.
- La tarjeta usa el warm gray `#F5F2ED` (el mismo del rotulo "Otros"), no el verde de las tarjetas de datos clave: no es un dato destacado, es un anexo.
