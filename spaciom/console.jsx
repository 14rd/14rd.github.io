// Team Console — Spaciom franchise dashboard (animated)
function TeamConsole() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [cursorPos, setCursorPos] = React.useState({ x: 400, y: 200 });
  const [cursorVisible, setCursorVisible] = React.useState(true);
  const [stats, setStats] = React.useState({
    spaces: 42310, moments: 186000, drops: 7, retention: 61,
    peak: 3200, session: 42, sellThrough: 94,
  });

  const tabs = ['Dashboard', 'Spaces', 'Drops', 'Moments', 'Audience'];
  const tabTargets = [
    { x: 100, y: 160 },
    { x: 100, y: 184 },
    { x: 100, y: 208 },
    { x: 100, y: 232 },
    { x: 100, y: 256 },
  ];

  React.useEffect(() => {
    const jitter = setInterval(() => {
      setStats(s => ({
        spaces: s.spaces + Math.floor((Math.random() - 0.3) * 40),
        moments: s.moments + Math.floor(Math.random() * 200),
        drops: Math.max(5, Math.min(12, s.drops + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        retention: Math.max(55, Math.min(68, s.retention + (Math.random() - 0.5) * 2)),
        peak: s.peak + Math.floor((Math.random() - 0.4) * 30),
        session: Math.max(35, Math.min(55, s.session + (Math.random() - 0.5) * 3)),
        sellThrough: Math.max(88, Math.min(99, s.sellThrough + (Math.random() - 0.5) * 2)),
      }));
    }, 2000);
    return () => clearInterval(jitter);
  }, []);

  React.useEffect(() => {
    let tabIdx = 0;
    const sequence = () => {
      tabIdx = (tabIdx + 1) % tabs.length;
      const target = tabTargets[tabIdx];
      setCursorPos({ x: target.x + Math.random() * 20, y: target.y + Math.random() * 6 });
      setTimeout(() => {
        setActiveTab(tabIdx);
      }, 600);
    };
    const interval = setInterval(sequence, 3200);
    return () => clearInterval(interval);
  }, []);

  const fmtNum = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return Math.round(n).toString();
  };

  const activities = [
    [
      { t: '0:42', ev: 'Drop "OT Game 7 — Signed" pushed to ' + fmtNum(stats.spaces) + ' spaces', tag: 'DROP' },
      { t: '1:18', ev: 'Brunson 3PT moment saved by ' + fmtNum(stats.peak) + ' fans', tag: 'MOMENT' },
      { t: '2:55', ev: '"Bench Cam" exclusive opened for premium', tag: 'EXCLUSIVE' },
    ],
    [
      { t: '0:12', ev: fmtNum(stats.spaces) + ' fans currently inside spaces', tag: 'SPACES' },
      { t: '0:45', ev: 'New space created: "Section 112 Crew"', tag: 'CREATE' },
      { t: '1:30', ev: 'Peak concurrent: ' + fmtNum(stats.peak) + ' at tip-off', tag: 'PEAK' },
    ],
    [
      { t: '0:08', ev: '"Signed Brunson" — ' + Math.round(stats.sellThrough) + '% sold through', tag: 'DROP' },
      { t: '0:22', ev: '"Behind the Scenes" drop scheduled for Saturday', tag: 'SCHEDULED' },
      { t: '0:55', ev: stats.drops + ' drops currently live', tag: 'LIVE' },
    ],
    [
      { t: '0:15', ev: fmtNum(stats.moments) + ' moments saved this season', tag: 'MOMENT' },
      { t: '0:38', ev: 'Top moment: Brunson Game 7 OT buzzer beater', tag: 'TRENDING' },
      { t: '1:02', ev: 'Average ' + Math.round(stats.session) + ' moments saved per fan', tag: 'AVG' },
    ],
    [
      { t: '0:05', ev: Math.round(stats.retention) + '% year-round retention rate', tag: 'RETENTION' },
      { t: '0:20', ev: fmtNum(stats.peak) + ' peak concurrent tonight', tag: 'AUDIENCE' },
      { t: '0:48', ev: 'Fan demographics: 18-34 primary segment', tag: 'SEGMENT' },
    ],
  ];

  const headings = [
    'Tonight at a glance',
    'Active fan spaces',
    'Live drops & editions',
    'Moment highlights',
    'Audience insights',
  ];

  const sidebarItem = (label, active = false) => (
    <div style={{
      padding: '8px 12px', borderRadius: 6, fontSize: 12.5,
      color: active ? '#f3eee2' : 'rgba(243,238,226,0.55)',
      background: active ? 'rgba(232,200,122,0.08)' : 'transparent',
      borderLeft: active ? '2px solid #e8c87a' : '2px solid transparent',
      display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.005em',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ width: 4, height: 4, borderRadius: 99, background: active ? '#e8c87a' : 'rgba(243,238,226,0.35)', transition: 'background 0.3s' }} />
      {label}
    </div>
  );

  const stat = (label, value, delta, deltaPositive = true) => (
    <div style={{
      background: '#081428', border: '1px solid rgba(243,238,226,0.06)',
      borderRadius: 10, padding: '20px 22px 22px',
      display: 'flex', flexDirection: 'column', minHeight: 130,
    }}>
      <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)', marginBottom: 16 }}>{label}</div>
      <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: '#f3eee2', transition: 'opacity 0.3s' }}>{value}</div>
      <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 12, color: deltaPositive ? '#a3d4a3' : 'rgba(243,238,226,0.55)', letterSpacing: '-0.005em' }}>{delta}</div>
    </div>
  );

  return (
    <div style={{
      width: 1080, maxWidth: '100%', borderRadius: 14, overflow: 'hidden',
      background: '#040a16', border: '1px solid rgba(243,238,226,0.08)',
      boxShadow: '0 50px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,200,122,0.06)',
      fontFamily: 'Geist, system-ui, sans-serif', color: '#f3eee2',
      position: 'relative',
    }}>
      {/* Animated cursor */}
      <div style={{
        position: 'absolute', zIndex: 100, pointerEvents: 'none',
        left: cursorPos.x, top: cursorPos.y,
        transition: 'left 0.8s cubic-bezier(0.23, 1, 0.32, 1), top 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        opacity: cursorVisible ? 1 : 0,
      }}>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path d="M1 1L1 18L5.5 13.5L9.5 21L12 20L8 12.5L14 12L1 1Z" fill="white" stroke="rgba(0,0,0,0.5)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Title bar */}
      <div style={{
        height: 44, padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(243,238,226,0.06)', background: '#030812',
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
        <div style={{ width: 200, padding: '20px 12px', borderRight: '1px solid rgba(243,238,226,0.06)', background: '#030a18' }}>
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
            {tabs.map((t, i) => sidebarItem(t, i === activeTab))}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.18em', color: 'rgba(243,238,226,0.45)', transition: 'opacity 0.3s' }}>
                {tabs[activeTab].toUpperCase()} · STATISTICS
              </div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.025em', marginTop: 6, transition: 'opacity 0.3s' }}>{headings[activeTab]}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ fontSize: 11.5, color: 'rgba(243,238,226,0.6)', padding: '8px 12px', border: '1px solid rgba(243,238,226,0.1)', borderRadius: 6, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em' }}>LAST 90D</div>
              <div style={{ fontSize: 11.5, color: '#1a1408', padding: '8px 14px', background: '#e8c87a', borderRadius: 6, fontFamily: 'Geist, sans-serif', fontWeight: 500 }}>Push a drop</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {stat('ACTIVE SPACES', fmtNum(stats.spaces), '↗ +18% vs last home')}
            {stat('MOMENTS SAVED', fmtNum(stats.moments), '↗ +34% game-over-game')}
            {stat('DROPS LIVE', stats.drops.toString(), 'Avg sell-through ' + Math.round(stats.sellThrough) + '%')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginTop: 12 }}>
            <div style={{
              background: '#081428', border: '1px solid rgba(243,238,226,0.06)',
              borderRadius: 10, padding: '20px 22px', minHeight: 160,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)' }}>ENGAGEMENT · LIVE</div>
                <div style={{ fontSize: 11, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace' }}>Q4 · 2:14</div>
              </div>
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
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{(stats.peak / 1000).toFixed(1)}K</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>PEAK CONCURRENT</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{Math.round(stats.session)} min</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>AVG SESSION</div>
                </div>
              </div>
            </div>
            {stat('YEAR-ROUND ACTIVE', Math.round(stats.retention) + '%', 'Off-season retention')}
          </div>

          <div style={{ marginTop: 18, background: '#081428', border: '1px solid rgba(243,238,226,0.06)', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)' }}>LIVE ACTIVITY</div>
              <div style={{ fontSize: 11, color: '#a3d4a3', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>● STREAMING</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(activities[activeTab] || activities[0]).map((r, i) => (
                <div key={activeTab + '-' + i} style={{ display: 'grid', gridTemplateColumns: '50px 80px 1fr', alignItems: 'center', padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(243,238,226,0.05)', transition: 'opacity 0.4s', animation: 'fadeIn 0.4s ease' }}>
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
