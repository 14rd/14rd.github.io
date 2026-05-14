// Team Console — Spaciom franchise dashboard (animated)
function TeamConsole() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [cursorPos, setCursorPos] = React.useState({ x: 400, y: 250 });
  const [clicking, setClicking] = React.useState(false);
  const containerRef = React.useRef(null);
  const tabRefs = React.useRef([]);
  const [stats, setStats] = React.useState({
    spaces: 42310, moments: 186000, drops: 7, retention: 61,
    peak: 3200, session: 42, sellThrough: 94,
    liveViewers: 18420, pastViewers: 312000, goodsSold: 4218,
    revenue: 842, avgWatch: 38, bounceRate: 12,
    gifted: 1840, resold: 620, avgPrice: 34,
    newFans: 2180, returning: 78, nps: 72,
  });

  const tabs = ['Dashboard', 'Spaces', 'Drops', 'Moments', 'Audience'];

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
        liveViewers: s.liveViewers + Math.floor((Math.random() - 0.4) * 80),
        pastViewers: s.pastViewers + Math.floor(Math.random() * 150),
        goodsSold: s.goodsSold + Math.floor(Math.random() * 8),
        revenue: Math.max(780, Math.min(920, s.revenue + (Math.random() - 0.5) * 12)),
        avgWatch: Math.max(30, Math.min(48, s.avgWatch + (Math.random() - 0.5) * 3)),
        bounceRate: Math.max(8, Math.min(18, s.bounceRate + (Math.random() - 0.5) * 1.5)),
        gifted: s.gifted + Math.floor((Math.random() - 0.3) * 12),
        resold: s.resold + Math.floor((Math.random() - 0.3) * 5),
        avgPrice: Math.max(28, Math.min(42, s.avgPrice + (Math.random() - 0.5) * 2)),
        newFans: s.newFans + Math.floor((Math.random() - 0.3) * 20),
        returning: Math.max(72, Math.min(86, s.returning + (Math.random() - 0.5) * 1.5)),
        nps: Math.max(65, Math.min(80, s.nps + (Math.random() - 0.5) * 2)),
      }));
    }, 2000);
    return () => clearInterval(jitter);
  }, []);

  React.useEffect(() => {
    let tabIdx = 0;
    let timeout;
    const sequence = () => {
      tabIdx = (tabIdx + 1) % tabs.length;
      const tabEl = tabRefs.current[tabIdx];
      const container = containerRef.current;
      if (tabEl && container) {
        const cRect = container.getBoundingClientRect();
        const tRect = tabEl.getBoundingClientRect();
        const x = tRect.left - cRect.left + 40 + Math.random() * 30;
        const y = tRect.top - cRect.top + tRect.height / 2 + (Math.random() - 0.5) * 4;
        setCursorPos({ x, y });
        timeout = setTimeout(() => {
          setClicking(true);
          setTimeout(() => {
            setActiveTab(tabIdx);
            setClicking(false);
          }, 150);
        }, 800);
      }
    };
    const interval = setInterval(sequence, 3500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const fmtNum = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return Math.round(n).toString();
  };

  const tabConfigs = [
    // Dashboard
    {
      heading: 'Tonight at a glance',
      eyebrow: 'DASHBOARD · OVERVIEW',
      actionLabel: 'LAST 90D',
      actionBtn: 'Push a drop',
      topStats: [
        { label: 'ACTIVE SPACES', value: fmtNum(stats.spaces), delta: '↗ +18% vs last home', positive: true },
        { label: 'MOMENTS SAVED', value: fmtNum(stats.moments), delta: '↗ +34% game-over-game', positive: true },
        { label: 'DROPS LIVE', value: stats.drops.toString(), delta: 'Avg sell-through ' + Math.round(stats.sellThrough) + '%', positive: true },
      ],
      chartLabel: 'ENGAGEMENT · LIVE',
      chartTime: 'Q4 · 2:14',
      chartPath: 'M 0 60 L 30 56 L 60 58 L 90 50 L 120 52 L 150 38 L 180 42 L 210 26 L 240 30 L 270 20 L 300 14 L 330 22 L 360 10 L 400 16',
      bottomLeft: [
        { val: (stats.peak / 1000).toFixed(1) + 'K', label: 'PEAK CONCURRENT' },
        { val: Math.round(stats.session) + ' min', label: 'AVG SESSION' },
      ],
      bottomRight: { label: 'YEAR-ROUND ACTIVE', value: Math.round(stats.retention) + '%', delta: 'Off-season retention', positive: true },
      activity: [
        { t: '0:42', ev: 'Drop "OT Game 7 — Signed" pushed to ' + fmtNum(stats.spaces) + ' spaces', tag: 'DROP' },
        { t: '1:18', ev: 'Brunson 3PT moment saved by ' + fmtNum(stats.peak) + ' fans', tag: 'MOMENT' },
        { t: '2:55', ev: '"Bench Cam" exclusive opened for premium', tag: 'EXCLUSIVE' },
      ],
      activityLabel: 'LIVE ACTIVITY',
      activityStatus: '● STREAMING',
      activityStatusColor: '#a3d4a3',
    },
    // Spaces
    {
      heading: 'Active fan spaces',
      eyebrow: 'SPACES · REAL-TIME',
      actionLabel: 'TONIGHT',
      actionBtn: 'Create space',
      topStats: [
        { label: 'LIVE VIEWERS', value: fmtNum(stats.liveViewers), delta: '↗ +22% vs tip-off', positive: true },
        { label: 'TOTAL SPACES', value: fmtNum(stats.spaces), delta: '18 franchise spaces active', positive: true },
        { label: 'AVG WATCH TIME', value: Math.round(stats.avgWatch) + 'm', delta: '↗ +8 min vs last game', positive: true },
      ],
      chartLabel: 'SPACE OCCUPANCY · LIVE',
      chartTime: 'GAME 4 · Q4',
      chartPath: 'M 0 70 L 30 64 L 60 55 L 90 48 L 120 40 L 150 35 L 180 28 L 210 32 L 240 25 L 270 22 L 300 18 L 330 20 L 360 15 L 400 12',
      bottomLeft: [
        { val: fmtNum(stats.peak), label: 'PEAK CONCURRENT' },
        { val: Math.round(stats.bounceRate) + '%', label: 'BOUNCE RATE' },
      ],
      bottomRight: { label: 'PAST VIEWERS', value: fmtNum(stats.pastViewers), delta: 'Lifetime across all spaces', positive: true },
      activity: [
        { t: '0:12', ev: fmtNum(stats.liveViewers) + ' fans currently inside spaces', tag: 'SPACES' },
        { t: '0:45', ev: 'New space created: "Section 112 Crew"', tag: 'CREATE' },
        { t: '1:30', ev: 'Peak concurrent: ' + fmtNum(stats.peak) + ' at tip-off', tag: 'PEAK' },
      ],
      activityLabel: 'SPACE EVENTS',
      activityStatus: '● LIVE',
      activityStatusColor: '#a3d4a3',
    },
    // Drops
    {
      heading: 'Live drops & editions',
      eyebrow: 'DROPS · COMMERCE',
      actionLabel: 'ALL TIME',
      actionBtn: 'New drop',
      topStats: [
        { label: 'GOODS SOLD', value: fmtNum(stats.goodsSold), delta: '↗ +412 tonight', positive: true },
        { label: 'SELL-THROUGH', value: Math.round(stats.sellThrough) + '%', delta: 'Avg across ' + stats.drops + ' drops', positive: true },
        { label: 'REVENUE', value: '$' + Math.round(stats.revenue) + 'K', delta: '↗ +26% vs projection', positive: true },
      ],
      chartLabel: 'DROP VELOCITY · PER HOUR',
      chartTime: 'GAME DAY',
      chartPath: 'M 0 65 L 30 60 L 60 52 L 90 58 L 120 30 L 150 22 L 180 18 L 210 24 L 240 20 L 270 28 L 300 34 L 330 40 L 360 45 L 400 50',
      bottomLeft: [
        { val: fmtNum(stats.gifted), label: 'GIFTED' },
        { val: fmtNum(stats.resold), label: 'RESOLD ON MARKET' },
      ],
      bottomRight: { label: 'AVG PRICE', value: '$' + Math.round(stats.avgPrice), delta: 'Per collectible drop', positive: true },
      activity: [
        { t: '0:08', ev: '"Signed Brunson" — ' + Math.round(stats.sellThrough) + '% sold through', tag: 'DROP' },
        { t: '0:22', ev: '"Behind the Scenes" drop scheduled for Saturday', tag: 'SCHEDULED' },
        { t: '0:55', ev: stats.drops + ' drops currently live', tag: 'LIVE' },
      ],
      activityLabel: 'DROP FEED',
      activityStatus: '● PROCESSING',
      activityStatusColor: '#e8c87a',
    },
    // Moments
    {
      heading: 'Moment highlights',
      eyebrow: 'MOMENTS · CAPTURES',
      actionLabel: 'THIS SEASON',
      actionBtn: 'Feature moment',
      topStats: [
        { label: 'MOMENTS SAVED', value: fmtNum(stats.moments), delta: '↗ +34% game-over-game', positive: true },
        { label: 'AVG PER FAN', value: Math.round(stats.session).toString(), delta: 'Moments saved per session', positive: true },
        { label: 'SHARES', value: fmtNum(Math.round(stats.moments * 0.18)), delta: '18% share rate', positive: true },
      ],
      chartLabel: 'MOMENT SAVES · TIMELINE',
      chartTime: 'GAME 4',
      chartPath: 'M 0 55 L 30 50 L 60 48 L 90 42 L 120 45 L 150 30 L 180 20 L 210 15 L 240 22 L 270 18 L 300 12 L 330 8 L 360 14 L 400 10',
      bottomLeft: [
        { val: '4.8★', label: 'AVG MOMENT RATING' },
        { val: '62%', label: 'KEPT > 30 DAYS' },
      ],
      bottomRight: { label: 'TRENDING MOMENT', value: '#1', delta: 'Brunson OT buzzer beater', positive: true },
      activity: [
        { t: '0:15', ev: fmtNum(stats.moments) + ' moments saved this season', tag: 'MOMENT' },
        { t: '0:38', ev: 'Top moment: Brunson Game 7 OT buzzer beater', tag: 'TRENDING' },
        { t: '1:02', ev: 'Average ' + Math.round(stats.session) + ' moments saved per fan', tag: 'AVG' },
      ],
      activityLabel: 'MOMENT STREAM',
      activityStatus: '● CAPTURING',
      activityStatusColor: '#a3d4a3',
    },
    // Audience
    {
      heading: 'Audience insights',
      eyebrow: 'AUDIENCE · ANALYTICS',
      actionLabel: 'LAST 30D',
      actionBtn: 'Export report',
      topStats: [
        { label: 'NEW FANS', value: fmtNum(stats.newFans), delta: '↗ +340 this week', positive: true },
        { label: 'RETURNING', value: Math.round(stats.returning) + '%', delta: 'Return within 7 days', positive: true },
        { label: 'FAN NPS', value: Math.round(stats.nps).toString(), delta: '↗ +6 pts vs last quarter', positive: true },
      ],
      chartLabel: 'FAN GROWTH · WEEKLY',
      chartTime: '12 WEEKS',
      chartPath: 'M 0 70 L 30 68 L 60 62 L 90 58 L 120 50 L 150 48 L 180 40 L 210 35 L 240 28 L 270 22 L 300 18 L 330 14 L 360 12 L 400 8',
      bottomLeft: [
        { val: '18–34', label: 'PRIMARY SEGMENT' },
        { val: '64%', label: 'MOBILE USERS' },
      ],
      bottomRight: { label: 'YEAR-ROUND RETENTION', value: Math.round(stats.retention) + '%', delta: 'Off-season active rate', positive: true },
      activity: [
        { t: '0:05', ev: Math.round(stats.retention) + '% year-round retention rate', tag: 'RETENTION' },
        { t: '0:20', ev: fmtNum(stats.newFans) + ' new fans acquired this week', tag: 'GROWTH' },
        { t: '0:48', ev: 'Fan demographics: 18-34 primary segment', tag: 'SEGMENT' },
      ],
      activityLabel: 'AUDIENCE SIGNALS',
      activityStatus: '● TRACKING',
      activityStatusColor: '#7ab8e8',
    },
  ];

  const cfg = tabConfigs[activeTab] || tabConfigs[0];

  const sidebarItem = (label, active, idx) => (
    <div ref={el => tabRefs.current[idx] = el} style={{
      padding: '8px 12px', borderRadius: 6, fontSize: 12.5,
      color: active ? '#f3eee2' : 'rgba(243,238,226,0.55)',
      background: active ? 'rgba(232,200,122,0.08)' : 'transparent',
      borderLeft: active ? '2px solid #e8c87a' : '2px solid transparent',
      display: 'flex', alignItems: 'center', gap: 10, letterSpacing: '-0.005em',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ width: 4, height: 4, borderRadius: 99, background: active ? '#e8c87a' : 'rgba(243,238,226,0.35)', transition: 'background 0.35s' }} />
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
    <div ref={containerRef} className="console-container" style={{
      width: 1080, maxWidth: '100%', borderRadius: 14, overflow: 'hidden',
      background: '#040a16', border: '1px solid rgba(243,238,226,0.08)',
      boxShadow: '0 50px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(232,200,122,0.06)',
      fontFamily: 'Geist, system-ui, sans-serif', color: '#f3eee2',
      position: 'relative',
    }}>
      {/* Animated cursor — hidden on mobile */}
      <div className="console-cursor" style={{
        position: 'absolute', zIndex: 100, pointerEvents: 'none',
        left: cursorPos.x, top: cursorPos.y,
        transition: 'left 0.9s cubic-bezier(0.23, 1, 0.32, 1), top 0.9s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: clicking ? 'scale(0.85)' : 'scale(1)',
      }}>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path d="M1 1L1 18L5.5 13.5L9.5 21L12 20L8 12.5L14 12L1 1Z" fill="white" stroke="rgba(0,0,0,0.5)" strokeWidth="1"/>
        </svg>
        {clicking && <div style={{
          position: 'absolute', top: -4, left: -4, width: 26, height: 26,
          borderRadius: '50%', border: '2px solid rgba(232,200,122,0.5)',
          animation: 'click-ring 0.3s ease-out forwards',
        }} />}
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
          <div className="console-url" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 1, height: 18, background: 'rgba(243,238,226,0.08)', margin: '0 10px' }} />
            <div style={{ fontSize: 11.5, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em', color: 'rgba(243,238,226,0.6)' }}>
              console.spaciom.io <span style={{ color: 'rgba(243,238,226,0.35)' }}>/ knicks</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(243,238,226,0.55)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em' }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: '#a3d4a3' }} />
            <span className="console-live-label">LIVE · GAME 4</span>
          </div>
        </div>
      </div>

      <div className="console-body" style={{ display: 'flex', minHeight: 460 }}>
        {/* Sidebar */}
        <div className="console-sidebar" style={{ width: 200, padding: '20px 12px', borderRight: '1px solid rgba(243,238,226,0.06)', background: '#030a18', flexShrink: 0 }}>
          <div style={{ padding: '0 12px 18px' }}>
            <div style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.18em', color: 'rgba(243,238,226,0.4)', marginBottom: 10 }}>FRANCHISE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: '#1f3c8a', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, letterSpacing: '-0.005em' }}>New York</div>
                <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)' }}>Active · 18 spaces</div>
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(243,238,226,0.06)', margin: '0 0 14px' }} />
          <div style={{ padding: '0 12px 10px', fontSize: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.2em', color: 'rgba(243,238,226,0.4)' }}>OVERVIEW</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tabs.map((t, i) => sidebarItem(t, i === activeTab, i))}
          </div>
          <div className="console-operate" style={{ padding: '20px 12px 10px', fontSize: 10, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.2em', color: 'rgba(243,238,226,0.4)' }}>OPERATE</div>
          <div className="console-operate-items" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sidebarItem('Live Layer', false, -1)}
            {sidebarItem('Schedule', false, -2)}
            {sidebarItem('Insights', false, -3)}
          </div>
        </div>

        {/* Main — completely changes per tab */}
        <div className="console-main" style={{ flex: 1, padding: '24px 28px 28px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.18em', color: 'rgba(243,238,226,0.45)', transition: 'opacity 0.3s' }}>
                {cfg.eyebrow}
              </div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.025em', marginTop: 6, transition: 'opacity 0.3s' }}>{cfg.heading}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ fontSize: 11.5, color: 'rgba(243,238,226,0.6)', padding: '8px 12px', border: '1px solid rgba(243,238,226,0.1)', borderRadius: 6, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em' }}>{cfg.actionLabel}</div>
              <div style={{ fontSize: 11.5, color: '#1a1408', padding: '8px 14px', background: '#e8c87a', borderRadius: 6, fontFamily: 'Geist, sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>{cfg.actionBtn}</div>
            </div>
          </div>

          <div className="console-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {cfg.topStats.map((s, i) => (
              <div key={activeTab + '-stat-' + i}>{stat(s.label, s.value, s.delta, s.positive)}</div>
            ))}
          </div>
          <div className="console-chart-row" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginTop: 12 }}>
            <div style={{
              background: '#081428', border: '1px solid rgba(243,238,226,0.06)',
              borderRadius: 10, padding: '20px 22px', minHeight: 160,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)' }}>{cfg.chartLabel}</div>
                <div style={{ fontSize: 11, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace' }}>{cfg.chartTime}</div>
              </div>
              <svg viewBox="0 0 400 80" style={{ width: '100%', height: 80 }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e8c87a" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#e8c87a" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={cfg.chartPath + ' L 400 80 L 0 80 Z'} fill="url(#cf)"/>
                <path d={cfg.chartPath} fill="none" stroke="#e8c87a" strokeWidth="1.5"/>
              </svg>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 24, paddingTop: 12, borderTop: '1px solid rgba(243,238,226,0.05)' }}>
                {cfg.bottomLeft.map((bl, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{bl.val}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(243,238,226,0.5)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>{bl.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {stat(cfg.bottomRight.label, cfg.bottomRight.value, cfg.bottomRight.delta, cfg.bottomRight.positive)}
          </div>

          <div style={{ marginTop: 18, background: '#081428', border: '1px solid rgba(243,238,226,0.06)', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, letterSpacing: '0.18em', color: 'rgba(243,238,226,0.5)' }}>{cfg.activityLabel}</div>
              <div style={{ fontSize: 11, color: cfg.activityStatusColor, fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em' }}>{cfg.activityStatus}</div>
            </div>
            <div className="console-activity" style={{ display: 'flex', flexDirection: 'column' }}>
              {cfg.activity.map((r, i) => (
                <div key={activeTab + '-' + i} className="console-activity-row" style={{ display: 'grid', gridTemplateColumns: '50px 80px 1fr', alignItems: 'center', padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(243,238,226,0.05)', animation: 'fadeIn 0.4s ease' }}>
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
