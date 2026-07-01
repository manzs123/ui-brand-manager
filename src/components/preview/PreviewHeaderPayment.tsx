interface Props {
  backgroundColor: string;
  borderRadius: string;
  fontFamily: string;
  logo?: string;
}

export function PreviewHeaderPayment({ backgroundColor, borderRadius, fontFamily, logo }: Props) {
  return (
    <div style={{
      backgroundColor,
      borderRadius,
      fontFamily,
      minHeight: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 12,
      paddingRight: 12,
    }}>
      {/* Left: logo */}
      {logo ? (
        <img src={logo} alt="logo" style={{ height: 30, objectFit: 'contain' }} />
      ) : (
        <svg height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="28" height="28" rx="4" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
          <path d="M9 21l4.5-5 3 3.5 2-2.5 4.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8"/>
          <circle cx="11" cy="11" r="2" fill="white" fillOpacity="0.7"/>
        </svg>
      )}

      {/* Right: language selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#fff', fontSize: 13, fontWeight: 500 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>EN</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
