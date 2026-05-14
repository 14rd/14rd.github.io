// Three iPhone screens for Spaciom
const phoneStyles = {
  screen: {
    height: '100%',
    background: 'linear-gradient(180deg, #0d1e36 0%, #050d1c 100%)',
    color: '#f3eee2',
    fontFamily: '-apple-system, "SF Pro", system-ui, sans-serif',
    paddingTop: 56,
    overflow: 'hidden',
    position: 'relative',
  },
};

// ─── 1) HOME ──────────────────────────────────────────────────
function PhoneHome() {
  return (
    <div style={phoneStyles.screen}>
      <div style={{ padding: '16px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#e8c87a', textTransform: 'uppercase', fontFamily: 'Geist Mono, monospace' }}>SPACIOM</div>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: 'linear-gradient(135deg,#e8c87a,#b8954a)' }} />
        </div>
      </div>

      <div style={{ padding: '20px 22px 8px' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', marginBottom: 6 }}>TONIGHT · 7:30 PM</div>
        <div style={{ fontSize: 30, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500 }}>
          Your space<br/><span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: '#e8c87a', fontWeight: 400 }}>is ready.</span>
        </div>
      </div>

      {/* Live tile */}
      <div style={{
        margin: '20px 22px 0',
        borderRadius: 18,
        background: 'linear-gradient(135deg,#1a3055 0%,#0a1830 100%)',
        border: '1px solid rgba(232,200,122,0.25)',
        padding: '18px 18px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, background: 'radial-gradient(circle, rgba(232,200,122,0.18), transparent 60%)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="phone-live-dot" style={{ width: 6, height: 6, borderRadius: 99, background: '#ff4444' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.18em', fontFamily: 'Geist Mono, monospace' }}>LIVE</span>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>Q2 · 8:42</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center' }} className="phone-score">
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#c4222a', marginBottom: 6 }} />
            <div style={{ fontSize: 9, letterSpacing: '0.12em', fontFamily: 'Geist Mono, monospace' }}>BOS</div>
            <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 4 }}>54</div>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(243,238,226,0.45)', fontFamily: 'Geist Mono, monospace' }}>—</div>
          <div style={{ textAlign: 'center' }} className="phone-score" >
            <div style={{ width: 36, height: 36, borderRadius: 999, background: '#1f3c8a', marginBottom: 6 }} />
            <div style={{ fontSize: 9, letterSpacing: '0.12em', fontFamily: 'Geist Mono, monospace' }}>NYK</div>
            <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 4 }}>61</div>
          </div>
        </div>
        <button style={{
          marginTop: 22, width: '100%', padding: '12px 0', borderRadius: 999, border: 'none',
          background: '#e8c87a', color: '#1a1408', fontWeight: 500, fontSize: 13, letterSpacing: '-0.005em',
        }}>Enter the Space →</button>
      </div>

      {/* Section heading */}
      <div style={{ padding: '24px 22px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace' }}>YOUR MOMENTS</span>
        <span style={{ fontSize: 11, color: '#e8c87a', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>186</span>
      </div>

      {/* Moments row */}
      <div style={{ padding: '0 22px', display: 'flex', gap: 10 }}>
        {[{ c: '#3a5a8c', n: '24' }, { c: '#8a5a3a', n: '23' }, { c: '#3a8a6a', n: '22' }].map((m, i) => (
          <div key={i} style={{
            flex: 1, aspectRatio: '1/1.3', borderRadius: 12,
            background: `linear-gradient(135deg, ${m.c} 0%, #0a1628 90%)`,
            border: '1px solid rgba(243,238,226,0.08)',
            position: 'relative', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', fontFamily: 'Geist Mono, monospace', color: '#e8c87a' }}>#{m.n}</div>
            <div style={{ fontSize: 9.5, letterSpacing: '0.04em', color: 'rgba(243,238,226,0.7)' }}>Game 7 · OT</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{
        position: 'absolute', bottom: 22, left: 16, right: 16,
        height: 56, borderRadius: 28, background: 'rgba(20,32,52,0.86)',
        backdropFilter: 'blur(20px)', border: '0.5px solid rgba(243,238,226,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 24px',
      }}>
        {['Home', 'Live', 'Drops', 'You'].map((t, i) => (
          <div key={t} style={{
            fontSize: 11, letterSpacing: '0.06em',
            color: i === 0 ? '#e8c87a' : 'rgba(243,238,226,0.5)',
            fontWeight: i === 0 ? 600 : 400,
          }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ─── 2) LIVE LAYER ──────────────────────────────────────────
function PhoneLive() {
  return (
    <div style={{ ...phoneStyles.screen, background: 'linear-gradient(180deg, #050d1c 0%, #050d1c 100%)' }}>
      {/* Court background */}
      <div style={{
        position: 'absolute', top: 56, left: 0, right: 0, bottom: 0,
        background:
          'radial-gradient(ellipse at center 30%, rgba(232,200,122,0.18), transparent 50%),' +
          'linear-gradient(180deg, #0a1830 0%, #050d1c 60%)',
      }} />
      {/* Court SVG */}
      <svg viewBox="0 0 400 500" style={{ position: 'absolute', top: 100, left: 0, right: 0, width: '100%', opacity: 0.6 }}>
        <defs>
          <linearGradient id="court" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c08a3a" stopOpacity="0.5"/>
            <stop offset="1" stopColor="#c08a3a" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <path d="M 80 60 L 320 60 L 360 440 L 40 440 Z" fill="url(#court)" stroke="rgba(232,200,122,0.4)" strokeWidth="1.5"/>
        <ellipse cx="200" cy="180" rx="60" ry="20" fill="none" stroke="rgba(232,200,122,0.35)" strokeWidth="1"/>
        <line x1="80" y1="250" x2="320" y2="250" stroke="rgba(232,200,122,0.3)" strokeWidth="1"/>
        <circle cx="200" cy="250" r="40" fill="none" stroke="rgba(232,200,122,0.3)" strokeWidth="1"/>
      </svg>

      {/* Live banner */}
      <div style={{ position: 'relative', padding: '16px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="phone-live-dot" style={{ width: 8, height: 8, borderRadius: 99, background: '#ff4444' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.18em', fontFamily: 'Geist Mono, monospace', fontWeight: 500 }}>LIVE · Q4 · 2:14</span>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(243,238,226,0.08)', backdropFilter: 'blur(10px)' }} />
      </div>

      {/* Score overlay */}
      <div style={{
        position: 'absolute', top: 88, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(10,20,40,0.7)', backdropFilter: 'blur(20px)',
        border: '0.5px solid rgba(243,238,226,0.12)',
        borderRadius: 16, padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: '#c4222a' }} />
          <span style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace' }}>BOS</span>
          <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>102</span>
        </div>
        <div style={{ width: 1, height: 18, background: 'rgba(243,238,226,0.18)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>108</span>
          <span style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace' }}>NYK</span>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: '#1f3c8a' }} />
        </div>
      </div>

      {/* Bottom action stack */}
      <div style={{ position: 'absolute', bottom: 86, left: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          background: 'rgba(10,20,40,0.7)', backdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(232,200,122,0.3)',
          borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', color: '#e8c87a', fontFamily: 'Geist Mono, monospace' }}>MOMENT CAPTURED</div>
            <div style={{ fontSize: 14, marginTop: 4, letterSpacing: '-0.01em' }}>Brunson — 3PT, 2:14</div>
          </div>
          <button style={{ background: '#e8c87a', color: '#1a1408', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 11, fontWeight: 500 }}>Save</button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { l: 'STATS', v: '32 PTS' },
            { l: 'REPLAY', v: '12 clips' },
            { l: 'CIRCLE', v: '4 here' },
          ].map((b) => (
            <div key={b.l} style={{
              flex: 1, background: 'rgba(20,32,52,0.7)', backdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(243,238,226,0.08)',
              borderRadius: 14, padding: '12px 12px',
            }}>
              <div style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(243,238,226,0.55)', fontFamily: 'Geist Mono, monospace' }}>{b.l}</div>
              <div style={{ fontSize: 12.5, marginTop: 4, letterSpacing: '-0.005em' }}>{b.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        position: 'absolute', bottom: 22, left: 16, right: 16,
        height: 56, borderRadius: 28, background: 'rgba(20,32,52,0.86)',
        backdropFilter: 'blur(20px)', border: '0.5px solid rgba(243,238,226,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 24px',
      }}>
        {['Home', 'Live', 'Drops', 'You'].map((t, i) => (
          <div key={t} style={{
            fontSize: 11, letterSpacing: '0.06em',
            color: i === 1 ? '#e8c87a' : 'rgba(243,238,226,0.5)',
            fontWeight: i === 1 ? 600 : 400,
          }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

// ─── 3) DROPS / LOCKER ──────────────────────────────────────
function PhoneDrops() {
  return (
    <div style={phoneStyles.screen}>
      <div style={{ padding: '16px 22px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#e8c87a', textTransform: 'uppercase', fontFamily: 'Geist Mono, monospace' }}>DROPS</div>
        <div style={{ fontSize: 11, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>7 LIVE</div>
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ fontSize: 30, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500 }}>
          Locker.<br/>
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: '#e8c87a', fontWeight: 400 }}>Yours.</span>
        </div>
      </div>

      {/* Featured drop */}
      <div style={{
        margin: '20px 22px 0',
        borderRadius: 18, overflow: 'hidden',
        border: '1px solid rgba(232,200,122,0.4)',
        background: 'linear-gradient(135deg,#2a1a08 0%,#1a0f04 100%)',
        position: 'relative',
      }}>
        <div style={{
          height: 140, position: 'relative', overflow: 'hidden',
          background:
            'radial-gradient(ellipse at center, rgba(232,200,122,0.5), transparent 60%),' +
            'linear-gradient(135deg, #c08a3a 0%, #4a3818 100%)',
        }}>
          <div className="phone-sheen" style={{ position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', top: 12, left: 14, fontSize: 10, letterSpacing: '0.18em', fontFamily: 'Geist Mono, monospace', color: '#1a1408', background: '#e8c87a', padding: '4px 8px', borderRadius: 4 }}>SIGNED</div>
          <div style={{ position: 'absolute', bottom: 14, right: 14, fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 32, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>JB · 11</div>
        </div>
        <div style={{ padding: '14px 16px 16px' }}>
          <div style={{ fontSize: 15, letterSpacing: '-0.01em', fontWeight: 500 }}>Brunson Game 7 OT — Signed</div>
          <div style={{ fontSize: 12, color: 'rgba(243,238,226,0.6)', marginTop: 4, lineHeight: 1.4 }}>Edition of 250 · From The Garden</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace' }}>CLAIM</div>
              <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>$249</div>
            </div>
            <button style={{ background: '#e8c87a', color: '#1a1408', border: 'none', borderRadius: 999, padding: '10px 18px', fontSize: 12, fontWeight: 500 }}>Claim →</button>
          </div>
        </div>
      </div>

      {/* Drop list */}
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', marginBottom: 12 }}>UP NEXT</div>
        {[
          { l: 'Behind The Scenes', s: 'Sat 8 PM · Open to all', tag: 'BTS' },
          { l: 'Bench Cam Editions', s: '12 of 50 left', tag: 'EDITION' },
        ].map((d) => (
          <div key={d.l} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0', borderTop: '1px solid rgba(243,238,226,0.08)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#3a5a8c,#1a2c4a)', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, letterSpacing: '-0.005em' }}>{d.l}</div>
              <div style={{ fontSize: 11, color: 'rgba(243,238,226,0.55)', marginTop: 2 }}>{d.s}</div>
            </div>
            <div style={{ fontSize: 9.5, letterSpacing: '0.16em', color: '#e8c87a', fontFamily: 'Geist Mono, monospace' }}>{d.tag}</div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{
        position: 'absolute', bottom: 22, left: 16, right: 16,
        height: 56, borderRadius: 28, background: 'rgba(20,32,52,0.86)',
        backdropFilter: 'blur(20px)', border: '0.5px solid rgba(243,238,226,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 24px',
      }}>
        {['Home', 'Live', 'Drops', 'You'].map((t, i) => (
          <div key={t} style={{
            fontSize: 11, letterSpacing: '0.06em',
            color: i === 2 ? '#e8c87a' : 'rgba(243,238,226,0.5)',
            fontWeight: i === 2 ? 600 : 400,
          }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PhoneHome, PhoneLive, PhoneDrops });
