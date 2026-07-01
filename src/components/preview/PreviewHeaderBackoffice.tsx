interface Props {
  backgroundColor: string;
  borderRadius: string;
  fontFamily: string;
  name: string;
  logo?: string;
}

export function PreviewHeaderBackoffice({ backgroundColor, borderRadius, fontFamily, name, logo }: Props) {
  return (
    <div style={{
      backgroundColor,
      borderRadius,
      fontFamily,
      minHeight: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 12,
      paddingRight: 12,
    }}>
      {/* Left: logo + brand name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {logo ? (
          <img src={logo} alt="logo" style={{ height: 30, objectFit: 'contain' }} />
        ) : (
          <svg height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="28" height="28" rx="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
            <path d="M9 21l4.5-5 3 3.5 2-2.5 4.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8"/>
            <circle cx="11" cy="11" r="2" fill="white" fillOpacity="0.7"/>
          </svg>
        )}
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>{name}</span>
      </div>

      {/* Right: hamburger */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </div>
  );
}
