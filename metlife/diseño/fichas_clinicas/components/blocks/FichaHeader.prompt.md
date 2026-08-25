Primer bloque de toda ficha de producto: alto fijo de 366 pt, foto clinica a sangre bajo un degradado Blue 950 desde la izquierda.

```jsx
<FichaHeader assetBase="../../assets/"
  badge="Capital UF 10.000 por asegurado"
  title={'Seguro Catastrofico\nInterclinica'}
  photo="../../assets/photo-header-clinica.jpg"
  photoPosition="70% bottom" />
```

- El titulo va en la display serif, blanco, maximo 2 lineas; el salto se escribe con `\n`.
- El logo MetLife blanco va arriba a la izquierda; nunca se reemplaza por texto.
- El alto del header es fijo aunque el titulo sea de una sola linea.
- **Encuadre de la foto (obligatorio)**: el texto ocupa el tercio izquierdo. Antes de dar por
  cerrado un header, revisar que ningun rostro ni la accion principal de la foto queden bajo el
  badge o el titular. Si ocurre, desplazar la foto hacia la derecha con `photoPosition`
  (`'60% bottom'`, `'70% bottom'`, `'right bottom'`) hasta liberar esa zona.
  Si la foto tiene una relacion de aspecto parecida a la del header (16:9, 3:2), no sobra ancho y
  `photoPosition` sola no mueve nada: hay que acercar con `photoZoom` usando `photoPosition` como
  origen. Ejemplo real (foto 3:2 con dos rostros a la izquierda):
  `photoZoom={1.6} photoPosition="left center"`. Nunca se deforma la foto: solo se reencuadra.
