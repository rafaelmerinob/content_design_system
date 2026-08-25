Lienzo y cuerpo de una ficha. El orden de bloques es fijo: header, parrafo introductorio, tarjetas de datos clave, tablas, CONDICIONES GENERALES, footer.

```jsx
<FichaPage>
  <FichaHeader ... />
  <FichaBody>
    <IntroParagraph>...</IntroParagraph>
    <KeyDataGrid items={[...]} />
    <SectionTitle>Reembolsa prestaciones</SectionTitle>
    <DataTable ... />
    <GeneralConditions items={[...]} />
  </FichaBody>
  <FichaFooter ... />
</FichaPage>
```

Regla de oro: no se agregan elementos, textos ni bloques que no esten pedidos en el brief de contenido.
