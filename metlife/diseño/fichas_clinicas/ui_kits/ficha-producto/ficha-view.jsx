// Nada de lectura del design system en el top level: este archivo tambien es barrido por el
// compilador del design system, donde window.DS no existe. Se resuelve dentro del componente.
function Ficha({ data, partner }) {
  const { FichaPage, FichaBody, FichaHeader, IntroParagraph, KeyDataGrid, SectionTitle, DataTable,
    GeneralConditions, FichaFooter } = window.DS || window.FichasMetLifeDesignSystem_6917a8;
  const title = Array.isArray(data.title)
    ? data.title.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)
    : data.title;
  return (
    <FichaPage>
      <FichaHeader assetBase="../../assets/" badge={data.badge} title={title} />
      <FichaBody>
        <IntroParagraph>{data.intro}</IntroParagraph>
        <KeyDataGrid assetBase="../../assets/" items={data.keyData} />
        {data.tables.map((t, i) => (
          <div key={i} style={{ display: 'grid', gap: 'var(--gap-section-title)' }}>
            {t.title && <SectionTitle>{t.title}</SectionTitle>}
            <DataTable columns={t.columns} groups={t.groups} notes={t.notes} />
          </div>
        ))}
        <GeneralConditions items={[...window.CONDICIONES, <>Es exclusivo para atenciones en la <b>Red {partner.name}</b>.</>]} />
      </FichaBody>
      <FichaFooter assetBase="../../assets/" partnerLogo={partner.logo} partnerName={partner.name}
        allianceLine={`Alianza MetLife · ${partner.name}`} />
    </FichaPage>
  );
}

Object.assign(window, { Ficha });
