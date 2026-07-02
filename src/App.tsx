import { useState, useEffect, useRef } from 'react';
import { BrandsProvider } from './context/BrandsContext';
import { BrandList } from './components/BrandList';
import { BrandEditor } from './components/BrandEditor';
import { ComponentPreview } from './components/ComponentPreview';
import { CSSPreview } from './components/CSSPreview';
import './App.css';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

type SheetState = 'mini' | 'peek' | 'full';

const MINI_H = 64;
const getPeekH = () => Math.round(window.innerHeight * 0.6);
const getFullH = () => window.innerHeight - 54;

export default function App() {
  const isMobile  = useMediaQuery('(max-width: 860px)');
  const isNarrow  = useMediaQuery('(max-width: 1360px)') && !isMobile;
  const [showTokens, setShowTokens] = useState(() => window.innerWidth > 860);
  const [showBrandDrawer, setShowBrandDrawer] = useState(false);
  const [sheetState, setSheetState] = useState<SheetState>('mini');
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);

  return (
    <BrandsProvider>
      <div className="app-shell">
        <div className="main-area">
          <header className="topbar">
            <div className="topbar-title">
              <h1>UI Brand Manager</h1>
              <span className="beta-pill">BETA</span>
              <span className="status-dot" />
              <span className="status-text">Live Preview</span>
            </div>
            <div className="topbar-actions">
              <button
                className={`tokens-toggle ${showTokens ? 'active' : ''}`}
                onClick={() => setShowTokens(v => !v)}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                {isMobile ? 'Props' : 'Props Panel'}
              </button>
              {isMobile && (
                <button
                  className="hamburger-btn"
                  onClick={() => setShowBrandDrawer(v => !v)}
                  aria-label="Open brands"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </header>

          <div
            className="workspace"
            style={{
              gridTemplateColumns: isMobile
                ? '1fr'
                : isNarrow
                  ? '180px 300px 1fr'
                  : showTokens
                    ? '180px 400px minmax(526px, 5fr) 260px'
                    : '180px 400px minmax(526px, 5fr)',
            }}
          >
            {!isMobile && <BrandList />}

            {!isMobile && (
              <div className="editor-panel">
                <div className="panel-header">
                  <span className="panel-title">Style Editor</span>
                </div>
                <BrandEditor />
              </div>
            )}

            <div className={`preview-panel${isMobile ? ' preview-panel-mobile' : ''}${isNarrow ? ' preview-panel-scroll' : ''}`}>
              <ComponentPreview />
            </div>

            {!isMobile && !isNarrow && showTokens && <CSSPreview />}
          </div>

          {/* ---- Narrow desktop: Props Panel drawer ---- */}
          {isNarrow && showTokens && (
            <>
              <div className="props-drawer-backdrop" onClick={() => setShowTokens(false)} />
              <div className="props-drawer">
                <CSSPreview mobile />
              </div>
            </>
          )}

          {/* ---- Mobile overlays ---- */}
          {isMobile && (
            <>
              {/* Bottom Sheet: Style Editor */}
              {(() => {
                const baseH  = sheetState === 'full' ? getFullH() : sheetState === 'peek' ? getPeekH() : MINI_H;
                const liveH  = Math.max(MINI_H, Math.min(getFullH(), baseH - dragOffset));
                const showBody = sheetState !== 'mini';

                const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
                  isDragging.current = true;
                  dragStartY.current = e.clientY;
                  setDragOffset(0);
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                };
                const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
                  if (!isDragging.current) return;
                  setDragOffset(e.clientY - dragStartY.current);
                };
                const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
                  if (!isDragging.current) return;
                  isDragging.current = false;
                  const delta = e.clientY - dragStartY.current;
                  setDragOffset(0);
                  const peekH = getPeekH();
                  if (sheetState === 'mini') {
                    if (-delta >= 20) setSheetState('peek');
                  } else if (sheetState === 'peek') {
                    const liveH = Math.max(0, Math.min(getFullH(), peekH - delta));
                    if (liveH >= window.innerHeight * 0.8) setSheetState('full');
                    else if (delta >= 40) setSheetState('mini');
                  } else if (sheetState === 'full') {
                    const peekTravel = getFullH() - peekH;
                    const liveH = Math.max(0, Math.min(getFullH(), getFullH() - delta));
                    if (liveH < peekH - 40) setSheetState('mini');
                    else if (delta >= peekTravel * 0.45) setSheetState('peek');
                  }
                };

                return (
                  <div
                    className={`bottom-sheet sheet-${sheetState}`}
                    style={dragOffset !== 0 ? { height: liveH, transition: 'none' } : undefined}
                  >
                    <div
                      className="sheet-drag-handle"
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      onPointerCancel={onPointerUp}
                    >
                      <div className="sheet-drag-bar" />
                    </div>
                    <div className="sheet-header">
                      <span className="panel-title">Style Editor</span>
                      <div className="sheet-controls">
                        <button
                          className="sheet-ctrl-btn"
                          onClick={() => setSheetState(s => s === 'full' ? 'peek' : s === 'peek' ? 'mini' : 'peek')}
                        >
                          {sheetState === 'full' ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 8l-4-4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {sheetState === 'full' ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                    </div>
                    <div className={`sheet-body${showBody ? '' : ' sheet-body-hidden'}`}>
                      <BrandEditor />
                    </div>
                  </div>
                );
              })()}

              {/* Props Panel full-screen overlay */}
              {showTokens && (
                <div className="mobile-overlay">
                  <div className="mobile-overlay-header">
                    <span className="panel-title">Props Panel</span>
                    <button className="overlay-close-btn" onClick={() => setShowTokens(false)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                  <div className="mobile-overlay-body">
                    <CSSPreview mobile />
                  </div>
                </div>
              )}

              {/* Brand Drawer */}
              {showBrandDrawer && (
                <>
                  <div className="drawer-backdrop" onClick={() => setShowBrandDrawer(false)} />
                  <div className="brand-drawer">
                    <BrandList />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </BrandsProvider>
  );
}
