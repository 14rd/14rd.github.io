// Team Console — Spaciom franchise dashboard
function TeamConsole() {
  const stat = (label, value, delta, deltaPositive = true) => (
    <div style={{
      background: '#0a1a30',
      border: '1px solid rgba(243,238,226,0.06)',
      borderRadius: 10,
      padding: '20px 22px 22px',
      display: 'flex', flexDirection: 'column',
      minHeight: 130,
    }}>
      <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)', marginBottom: 16 }}>{label}</div>
      <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: '#f3eee2' }}>{value}</div>
      <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 12, color: deltaPositive ? '#a3d4a3' : 'rgba(243,238,226,0.55)', letterSpacing: '-0.005em' }}>
        {delta}
      </div>
    </div>
  );

  const sidebarItem = (label, active = false) => (
    <div style={{
      padding: '8px 12px',
      borderRadius: 6,
      fontSize: 12.5,
      color: active ? '#f3eee2' : 'rgba(243,238,226,0.55)',
      background: active ? 'rgba(232,200,122,0.08)' : 'transparent',
      borderLeft: active ? '2px solid #e8c87a' : '2px solid transparent',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 10,
      letterSpacing: '-0.005em',
    }}>
      <div style={{ width: 4, height: 4, borderRadius: 99, background: active ? '#e8c87a' : 'rgba(243,238,226,0.35)' }} />
      {label}
    </div>
  );

  return (
    <div style={{
      width: 1080, maxWidth: '100%',
      borderRadius: 14,
      overflow: 'hidden',
      background: '#070f1e',
      border: '1px solid rgba(243,238,226,0.08)',
      boxShadow: '0 50px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,200,122,0.06)',
      fontFamily: 'Geist, system-ui, sans-serif',
      color: '#f3eee2',
    }}>
      {/* Title bar */}
      <div style={{
        height: 44, padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(243,238,226,0.06)',
        background: '#050b18',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 7 }}>
            <div style={{ width: 11, height: 11, borderRadius: 999, background: 'rgba(243,238,226,0.18)' }} />
            <div style={{ width: 11, height: 11, borderRadius: 999, background: 'rgba(243,238,226,0.18)' }} />
            <div style={{ width: 11, height: 11, borderRadius: 999, background: 'rgba(243,238,226,0.18)' }} />
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(243,238,226,0.08)', margin: '0 10px' }} />
          <div style={{ fontSize: 11.5, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em', color: 'rgba(243,238,226,0.6)' }}>
            console.spaciom.io <span style={{ color: 'rgba(243,238,226,0.35)' }}>/ knicks</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(243,238,226,0.55)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em' }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: '#a3d4a3' }} />
            LIVE · GAME 4
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 460 }}>
        {/* Sidebar */}
        <div style={{ width: 200, padding: '20px 12px', borderRight: '1px solid rgba(243,238,226,0.06)', background: '#060e1c' }}>
          <div style={{ padding: '0 12px 18px' }}>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.18em', color: 'rgba(243,238,226,0.4)', marginBottom: 10 }}>FRANCHISE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: '#1f3c8a' }} />
              <div>
                <div style={{ fontSize: 13, letterSpacing: '-0.005em' }}>New York</div>
                <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)' }}>Active · 18 spaces</div>
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(243,238,226,0.06)', margin: '0 0 14px' }} />
          <div style={{ padding: '0 12px 10px', fontSize: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.2em', color: 'rgba(243,238,226,0.4)' }}>OVERVIEW</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sidebarItem('Dashboard', true)}
            {sidebarItem('Spaces')}
            {sidebarItem('Drops')}
            {sidebarItem('Moments')}
            {sidebarItem('Audience')}
          </div>
          <div style={{ padding: '20px 12px 10px', fontSize: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.2em', color: 'rgba(243,238,226,0.4)' }}>OPERATE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sidebarItem('Live Layer')}
            {sidebarItem('Schedule')}
            {sidebarItem('Insights')}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '24px 28px 28px' }}>
          {/* breadcrumb / heading */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.18em', color: 'rgba(243,238,226,0.45)' }}>OVERVIEW · STATISTICS</div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.025em', marginTop: 6 }}>Tonight at a glance</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ fontSize: 11.5, color: 'rgba(243,238,226,0.6)', padding: '8px 12px', border: '1px solid rgba(243,238,226,0.1)', borderRadius: 6, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em' }}>LAST 90D</div>
              <div style={{ fontSize: 11.5, color: '#1a1408', padding: '8px 14px', background: '#e8c87a', borderRadius: 6, fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>Push a drop</div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {stat('ACTIVE SPACES', '42,310', '↗ +18% vs last home')}
            {stat('MOMENTS SAVED', '186K', '↗ +34% game-over-game')}
            {stat('DROPS LIVE', '7', 'Avg sell-through 94%')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginTop: 12 }}>
            <div style={{
              background: '#0a1a30',
              border: '1px solid rgba(243,238,226,0.06)',
              borderRadius: 10,
              padding: '20px 22px',
              minHeight: 160,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)' }}>ENGAGEMENT · LIVE</div>
                <div style={{ fontSize: 11, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace' }}>Q4 · 2:14</div>
              </div>
              {/* chart */}
              <svg viewBox="0 0 400 80" style={{ width: '100%', height: 80 }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e8c87a" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#e8c87a" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M 0 60 L 30 56 L 60 58 L 90 50 L 120 52 L 150 38 L 180 42 L 210 26 L 240 30 L 270 20 L 300 14 L 330 22 L 360 10 L 400 16 L 400 80 L 0 80 Z" fill="url(#cf)"/>
                <path d="M 0 60 L 30 56 L 60 58 L 90 50 L 120 52 L 150 38 L 180 42 L 210 26 L 240 30 L 270 20 L 300 14 L 330 22 L 360 10 L 400 16" fill="none" stroke="#e8c87a" strokeWidth="1.5"/>
              </svg>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 24, paddingTop: 12, borderTop: '1px solid rgba(243,238,226,0.05)' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>3.2K</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>PEAK CONCURRENT</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>42 min</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>AVG SESSION</div>
                </div>
              </div>
            </div>
            {stat('YEAR-ROUND ACTIVE', '61%', 'Off-season retention')}
          </div>

          {/* recent activity */}
          <div style={{ marginTop: 18, background: '#0a1a30', border: '1px solid rgba(243,238,226,0.06)', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)' }}>LIVE ACTIVITY</div>
              <div style={{ fontSize: 11, color: '#a3d4a3', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>● STREAMING</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { t: '0:42', ev: 'Drop "OT Game 7 — Signed" pushed to 18,420 spaces', tag: 'DROP' },
                { t: '1:18', ev: 'Brunson 3PT moment saved by 2,103 fans', tag: 'MOMENT' },
                { t: '2:55', ev: '"Bench Cam" exclusive opened for premium', tag: 'EXCLUSIVE' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 80px 1fr', alignItems: 'center', padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(243,238,226,0.05)' }}>
                  <span style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace', color: 'rgba(243,238,226,0.5)' }}>{r.t}</span>
                  <span style={{ fontSize: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.16em', color: '#e8c87a' }}>{r.tag}</span>
                  <span style={{ fontSize: 13, letterSpacing: '-0.005em' }}>{r.ev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TeamConsole });
