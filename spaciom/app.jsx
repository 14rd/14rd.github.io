// ─────────────────────────────────────────────────────────────
// Spaciom — main page
// ─────────────────────────────────────────────────────────────

// ─── Custom Cursor ──────────────────────────────────────────
function CustomCursor() {
  const glowRef = React.useRef(null);
  const dotRef = React.useRef(null);
  const trailRefs = React.useRef([]);
  const mouse = React.useRef({ x: -100, y: -100 });
  const glowPos = React.useRef({ x: -100, y: -100 });
  const trailPositions = React.useRef(Array(6).fill({ x: -100, y: -100 }));

  React.useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const onOver = (e) => {
      const t = e.target.closest('a, button, [data-tilt]');
      if (t && glowRef.current) glowRef.current.classList.add('hovering');
    };
    const onOut = (e) => {
      const t = e.target.closest('a, button, [data-tilt]');
      if (t && glowRef.current) glowRef.current.classList.remove('hovering');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    let frame;
    const animate = () => {
      const gp = glowPos.current;
      gp.x += (mouse.current.x - gp.x) * 0.12;
      gp.y += (mouse.current.y - gp.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.left = gp.x + 'px';
        glowRef.current.style.top = gp.y + 'px';
      }
      const tp = trailPositions.current;
      for (let i = 0; i < tp.length; i++) {
        const prev = i === 0 ? mouse.current : tp[i - 1];
        tp[i] = {
          x: tp[i].x + (prev.x - tp[i].x) * (0.08 - i * 0.008),
          y: tp[i].y + (prev.y - tp[i].y) * (0.08 - i * 0.008),
        };
        const el = trailRefs.current[i];
        if (el) {
          el.style.left = tp[i].x + 'px';
          el.style.top = tp[i].y + 'px';
          el.style.opacity = (0.35 - i * 0.05);
          el.style.width = el.style.height = (14 - i * 1.5) + 'px';
        }
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <div className="cursor-dot" ref={dotRef} />
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="cursor-trail" ref={el => trailRefs.current[i] = el} />
      ))}
    </>
  );
}

// ─── Scroll Reveal Hook ─────────────────────────────────────
function useScrollReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-scale');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── 3D Tilt Hook ───────────────────────────────────────────
function useTiltCards() {
  React.useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) return;

    const state = new Map();
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
      state.set(card, { targetX: 0, targetY: 0, currentX: 0, currentY: 0, scale: 1, targetScale: 1 });
    });

    let running = false;
    const animate = () => {
      let anyMoving = false;
      state.forEach((s, card) => {
        s.currentX += (s.targetX - s.currentX) * 0.06;
        s.currentY += (s.targetY - s.currentY) * 0.06;
        s.scale += (s.targetScale - s.scale) * 0.06;
        card.style.transform = 'perspective(800px) rotateX(' + s.currentX.toFixed(3) + 'deg) rotateY(' + s.currentY.toFixed(3) + 'deg) scale(' + s.scale.toFixed(4) + ')';
        if (Math.abs(s.currentX - s.targetX) > 0.005 || Math.abs(s.currentY - s.targetY) > 0.005 || Math.abs(s.scale - s.targetScale) > 0.0005) {
          anyMoving = true;
        }
      });
      if (anyMoving) {
        requestAnimationFrame(animate);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (!running) { running = true; requestAnimationFrame(animate); }
    };

    const onMove = (e) => {
      const card = e.currentTarget;
      const s = state.get(card);
      if (!s) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      s.targetX = ((y - cy) / cy) * -4;
      s.targetY = ((x - cx) / cx) * 4;
      s.targetScale = 1.015;
      const shine = card.querySelector('.tilt-shine');
      if (shine) {
        shine.style.setProperty('--shine-x', (x / rect.width * 100) + '%');
        shine.style.setProperty('--shine-y', (y / rect.height * 100) + '%');
      }
      kick();
    };

    const onLeave = (e) => {
      const card = e.currentTarget;
      const s = state.get(card);
      if (s) {
        s.targetX = 0;
        s.targetY = 0;
        s.targetScale = 1;
        kick();
      }
    };

    cards.forEach(c => {
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });
    return () => cards.forEach(c => {
      c.removeEventListener('mousemove', onMove);
      c.removeEventListener('mouseleave', onLeave);
    });
  }, []);
}

// ─── Living Gradient Background ─────────────────────────────
function ParallaxBackground() {
  const layerRef = React.useRef(null);
  const mouse = React.useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = React.useRef({ x: 0.5, y: 0.5 });

  React.useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    const onMove = (e) => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    if (!isMobile) document.addEventListener('mousemove', onMove, { passive: true });

    let frame;
    const animate = () => {
      if (!layerRef.current) { frame = requestAnimationFrame(animate); return; }
      const sm = smoothMouse.current;
      sm.x += (mouse.current.x - sm.x) * 0.03;
      sm.y += (mouse.current.y - sm.y) * 0.03;
      const y = window.scrollY;
      const grads = layerRef.current.querySelectorAll('.living-grad');
      const speeds = [0.12, -0.08, 0.06, -0.1, 0.04];
      const cursorStrength = [60, -40, 50, -30, 45];
      const scrollBrightness = [0.15, 0.12, 0.18, 0.10, 0.14];
      const pageH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = pageH > 0 ? y / pageH : 0;
      grads.forEach((g, i) => {
        const sy = y * (speeds[i] || 0);
        const cx = (sm.x - 0.5) * (cursorStrength[i] || 0);
        const cy = (sm.y - 0.5) * (cursorStrength[i] || 0) * 0.6;
        const extraScale = 1 + Math.sin(scrollPct * Math.PI + i * 1.2) * (scrollBrightness[i] || 0);
        g.style.transform = 'translate(' + cx + 'px, ' + (sy + cy) + 'px) scale(' + extraScale.toFixed(3) + ')';
      });
      const grid = layerRef.current.querySelector('.parallax-grid');
      if (grid) grid.style.transform = 'translateY(' + (y * -0.02) + 'px)';
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      if (!isMobile) document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="parallax-layer" ref={layerRef}>
      <div className="living-grad living-grad-1" />
      <div className="living-grad living-grad-2" />
      <div className="living-grad living-grad-3" />
      <div className="living-grad living-grad-4" />
      <div className="living-grad living-grad-5" />
      <div className="parallax-grid" />
    </div>
  );
}

function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Smooth scroll (Lenis) ───────────────────────────────────
function useLenisScroll() {
  React.useEffect(() => {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.__lenis = lenis;

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const rect = target.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const offset =
        rect.height < window.innerHeight
          ? absoluteTop - (window.innerHeight - rect.height) / 2
          : absoluteTop - 80;
      lenis.scrollTo(offset, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
    };
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);
}

// ─── Header ──────────────────────────────────────────────────
function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#top" className="logo">
          <span className="mark"></span>
          SPACIOM
        </a>
        <nav className="nav">
          <a href="#vision">VISION</a>
          <a href="#product">PRODUCT</a>
          <a href="#moments">MOMENTS</a>
          <a href="#team">TEAM</a>
        </nav>
        <a href="contact.html" className="btn-gold">Get in touch <ArrowRight /></a>
      </div>
    </header>
  );
}

// ─── Reveal wrapper ─────────────────────────────────────────
function Reveal({ children, className = '', delay = 0, scale = false }) {
  const cls = (scale ? 'reveal-scale' : 'reveal') + (delay ? ' reveal-delay-' + delay : '') + (className ? ' ' + className : '');
  return <div className={cls}>{children}</div>;
}

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero container" id="top" data-screen-label="01 Hero">
      <Reveal><div className="hero-eyebrow"><span className="pulse"></span>SPATIAL FANDOM EXPERIENCE</div></Reveal>
      <Reveal delay={1}><h1>Expand <span className="italic">your</span> fandom.</h1></Reveal>
      <Reveal delay={2}><p className="hero-body">
        The infrastructure layer for fan engagement. Phone. Desktop. Headset. We're building the place where fandom lives — and pays — year-round.
      </p></Reveal>
      <Reveal delay={3}><div className="hero-actions">
        <a href="contact.html" className="btn-gold">Build with us <ArrowRight /></a>
        <a href="#vision" className="btn-ghost">See the product</a>
      </div></Reveal>

      <div className="stats-row">
        <Reveal delay={1}><div className="stat" data-tilt><div className="tilt-shine"></div>
          <div className="stat-idx">01 / OWNERSHIP</div>
          <div className="stat-big gold">Yours.</div>
          <div className="stat-label">Every moment, kept forever.</div>
        </div></Reveal>
        <Reveal delay={2}><div className="stat" data-tilt><div className="tilt-shine"></div>
          <div className="stat-idx">02 / SURFACES</div>
          <div className="stat-big">3 <span style={{ fontSize: 28, color: 'var(--ink-mute)', letterSpacing: '-0.02em' }}>Layers</span></div>
          <div className="stat-label">Phone. Desktop. Headset.</div>
        </div></Reveal>
        <Reveal delay={3}><div className="stat" data-tilt><div className="tilt-shine"></div>
          <div className="stat-idx">03 / CADENCE</div>
          <div className="stat-big">365 <span style={{ fontSize: 28, color: 'var(--ink-mute)', letterSpacing: '-0.02em' }}>Days</span></div>
          <div className="stat-label">Of fandom — not seventeen.</div>
        </div></Reveal>
      </div>
    </section>
  );
}

// ─── Vision — full-viewport editorial statement ─────────────
function Vision() {
  return (
    <section className="section-big" id="vision" data-screen-label="02 The Vision">
      <div className="container">
        <Reveal><div className="big-grid">
          <div className="big-eyebrow">01 <span className="slash">/</span> THE VISION</div>
          <div>
            <h2 className="big-statement">
              Build an <span className="italic">unforgettable</span> experience for your team. Create memories for you, your friends, and your family.
            </h2>
          </div>
        </div></Reveal>
        <div className="big-foot">
          <div className="big-foot-item">
            <div className="k">A place for everything</div>
            <div className="v">A persistent home for every game, every signing, every Sunday — not another feed to scroll.</div>
          </div>
          <div className="big-foot-item">
            <div className="k">Built around the moment</div>
            <div className="v">The kind of moments fans tell their kids about — captured, owned, and lived in.</div>
          </div>
          <div className="big-foot-item">
            <div className="k">Made to be passed down</div>
            <div className="v">Fandom is generational. The system that holds it should be too.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product — big statement ────────────────────────────────
function Product() {
  return (
    <section className="section-big" id="product" data-screen-label="03 The Product">
      <div className="container">
        <Reveal><div className="big-grid">
          <div className="big-eyebrow">02 <span className="slash">/</span> THE PRODUCT</div>
          <div>
            <h2 className="big-statement">
              The fan app, the live layer, the <span className="italic">drop platform.</span>
            </h2>
            <p style={{ marginTop: 40, fontFamily: 'var(--sans)', fontSize: 19, color: 'var(--ink-soft)', maxWidth: 640, lineHeight: 1.55, letterSpacing: '-0.005em' }}>
              <span style={{ color: 'var(--ink)' }}>Three surfaces, one spatial layer.</span> What fans hold in hand, what they live in during the game, and what teams use to deliver the experience.
            </p>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}

// ─── Surfaces — phone trio ──────────────────────────────────
function Surfaces() {
  return (
    <section className="container" style={{ paddingBottom: 120 }} data-screen-label="04 Surfaces">
      <div className="phones">
        <Reveal delay={1}><div>
          <IOSDevice width={300} height={650} dark time="7:28 PM" battery={84}>
            <PhoneHome />
          </IOSDevice>
          <div className="phone-cap"><span className="num">01</span>· Fan App · Home</div>
        </div></Reveal>
        <Reveal delay={2}><div>
          <IOSDevice width={300} height={650} dark time="8:42 PM" battery={61}>
            <PhoneLive />
          </IOSDevice>
          <div className="phone-cap"><span className="num">02</span>· Live Layer · In-Game</div>
        </div></Reveal>
        <Reveal delay={3}><div>
          <IOSDevice width={300} height={650} dark time="9:15 PM" battery={37}>
            <PhoneDrops />
          </IOSDevice>
          <div className="phone-cap"><span className="num">03</span>· Drops · Locker</div>
        </div></Reveal>
      </div>
    </section>
  );
}

// ─── Console section ────────────────────────────────────────
function ConsoleSection() {
  return (
    <section className="container" style={{ paddingBottom: 200 }} data-screen-label="05 Team Console">
      <Reveal scale><div className="console-wrap">
        <div>
          <TeamConsole />
          <div className="console-cap">04 · Team Console · Overview & Statistics</div>
        </div>
      </div></Reveal>
    </section>
  );
}

// ─── Animated Moment icons ──────────────────────────────────
function MomentIllo({ kind }) {
  if (kind === 'moments') return (
    <svg width="240" height="100" viewBox="0 0 240 100">
      {[0,1,2,3,4].map(i => (
        <rect key={i} className="illo-bar"
              x={i*48 + 8} y={70 - i*8}
              width={36} height={20 + i*8}
              rx="2" fill="rgba(232,200,122,0.18)"
              stroke="rgba(232,200,122,0.65)" strokeWidth="1"/>
      ))}
    </svg>
  );
  if (kind === 'connected') return (
    <svg width="240" height="100" viewBox="0 0 240 100">
      {[30, 100, 170].map((x, i) => (
        i < 2 && <line key={`l${i}`} className="illo-flow"
                       x1={x+15} y1="50" x2={x+55} y2="50"
                       stroke="rgba(232,200,122,0.6)" strokeWidth="1.2"/>
      ))}
      {[30, 100, 170].map((x) => (
        <circle key={`c${x}`} className="illo-node"
                cx={x} cy="50" r="14"
                fill="rgba(232,200,122,0.12)"
                stroke="rgba(232,200,122,0.7)" strokeWidth="1.2"/>
      ))}
      {[30, 100, 170].map((x) => (
        <circle key={`d${x}`} cx={x} cy="50" r="3" fill="#e8c87a"/>
      ))}
    </svg>
  );
  if (kind === 'owned') return (
    <svg width="240" height="100" viewBox="0 0 240 100">
      <rect x="30" y="18" width="180" height="64" rx="4"
            fill="rgba(232,200,122,0.05)"
            stroke="rgba(232,200,122,0.55)" strokeWidth="1.2"/>
      <rect className="illo-cert"
            x="42" y="30" width="156" height="40" rx="2"
            fill="rgba(232,200,122,0.15)"
            stroke="rgba(232,200,122,0.4)" strokeWidth="1"/>
      <text x="120" y="54" textAnchor="middle"
            fontFamily="Geist Mono, monospace" fontSize="10"
            fill="rgba(243,238,226,0.75)" letterSpacing="3">CERT · #00184</text>
      <line className="illo-scan"
            x1="42" y1="50" x2="198" y2="50"
            stroke="#e8c87a" strokeWidth="1" strokeOpacity="0.7"/>
    </svg>
  );
  if (kind === 'live') return (
    <svg width="240" height="100" viewBox="0 0 240 100">
      <circle className="illo-ring" cx="120" cy="50" r="32"
              fill="none" stroke="rgba(232,200,122,0.5)" strokeWidth="1"/>
      <circle className="illo-ring r2" cx="120" cy="50" r="32"
              fill="none" stroke="rgba(232,200,122,0.5)" strokeWidth="1"/>
      <circle cx="120" cy="50" r="14" fill="none" stroke="rgba(232,200,122,0.85)" strokeWidth="1.2"/>
      <circle className="illo-dot" cx="120" cy="50" r="5" fill="#e8c87a"/>
    </svg>
  );
  if (kind === 'forever') return (
    <svg width="240" height="100" viewBox="0 0 240 100" className="illo-wave">
      <path d="M 10 50 C 40 20, 80 80, 120 50 C 160 20, 200 80, 230 50"
            stroke="rgba(232,200,122,0.6)" strokeWidth="1.2" fill="none"/>
      {[10, 65, 120, 175, 230].map((x, i) => (
        <circle key={i} className="illo-tick" cx={x} cy="50" r="3" fill="#e8c87a"/>
      ))}
    </svg>
  );
  if (kind === 'exclusives') return (
    <svg width="240" height="100" viewBox="0 0 240 100">
      <g className="illo-star-outer" style={{ transformOrigin: '120px 50px' }}>
        <polygon points="120,12 138,38 168,42 144,62 152,90 120,76 88,90 96,62 72,42 102,38"
                 fill="none" stroke="rgba(232,200,122,0.55)" strokeWidth="1"/>
      </g>
      <g className="illo-star-inner" style={{ transformOrigin: '120px 50px' }}>
        <polygon points="120,26 130,42 146,44 134,54 138,68 120,60 102,68 106,54 94,44 110,42"
                 fill="rgba(232,200,122,0.18)" stroke="rgba(232,200,122,0.5)" strokeWidth="1"/>
      </g>
      <circle className="illo-sparkle" cx="60"  cy="22" r="2" fill="#e8c87a"/>
      <circle className="illo-sparkle" cx="190" cy="32" r="2" fill="#e8c87a"/>
      <circle className="illo-sparkle" cx="200" cy="78" r="2" fill="#e8c87a"/>
    </svg>
  );
  return null;
}

function Moments() {
  const items = [
    { t: 'Moments Based',  b: 'Because your time deserves lasting memories — not another scroll.', tag: 'Replaces the time-feed', illo: 'moments' },
    { t: 'Connected',      b: "Your circle, in the same space — even when you're three time zones apart.", tag: 'Built for who you watch with', illo: 'connected' },
    { t: 'Owned',          b: 'Every moment yours to keep, gift, or pass down. Real ownership, not a rental.', tag: 'Marketplace ready', illo: 'owned' },
    { t: 'Live',           b: 'The game in your seat, your living room, anywhere — with stats and replays at your fingertips.', tag: 'Stats + replays · in-frame', illo: 'live' },
    { t: 'Forever',        b: "Your fandom doesn't reset at the final whistle. Your space keeps every season.", tag: 'Persistent identity', illo: 'forever' },
    { t: 'Exclusives',     b: 'Drops, behind the scenes, and signed editions — available only to fans in the space.', tag: 'From your team to you', illo: 'exclusives' },
  ];
  return (
    <section className="section container" id="moments" data-screen-label="06 Moments">
      <div className="section-head">
        <div className="section-num">03</div>
        <div>
          <div className="section-kicker">MOMENTS</div>
          <h2 className="section-title">Ways your fandom <span className="serif-italic" style={{ color: 'var(--gold)' }}>lives forward.</span></h2>
          <p style={{ marginTop: 28, fontSize: 18, color: 'var(--ink-soft)', maxWidth: 620, lineHeight: 1.55, letterSpacing: '-0.005em' }}>
            Every feature ladders up to one promise — your time, your team, your memories. Kept.
          </p>
        </div>
      </div>

      <div className="moments-grid">
        {items.map((it, i) => (
          <Reveal delay={Math.min(i % 3 + 1, 4)} key={it.t}>
            <div className="moment tilt-card" data-tilt style={{ position: 'relative' }}>
              <div className="tilt-shine"></div>
              <div className="moment-illo"><MomentIllo kind={it.illo} /></div>
              <div className="m-title">{it.t}.</div>
              <div className="m-body">{it.b}</div>
              <div className="m-tag">{it.tag}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── For Teams & Brands ──────────────────────────────────────
function TeamsAndBrands() {
  const items = [
    { l: 'A', t: 'Your Space, Branded', b: "White-labeled, on-brand, fan-first. Your franchise's voice and visual identity, in three dimensions.", meta: 'Identity layer' },
    { l: 'B', t: 'Drop Anything, Anytime', b: "Limited moments, signed editions, behind-the-scenes — pushed straight into your fans' spaces, on game day or any day.", meta: 'Commerce primitive' },
    { l: 'C', t: 'Own The Year-Round Fan', b: "Engagement that doesn't disappear after the final whistle. The off-season becomes another season.", meta: '365-day retention' },
    { l: 'D', t: "Insights You Can't Get Elsewhere", b: 'Spatial signals: which moments fans return to, share, and treasure. The data of devotion.', meta: 'Proprietary signals' },
  ];
  return (
    <section className="section container" data-screen-label="07 For Teams & Brands">
      <Reveal><div className="section-head">
        <div className="section-num">04</div>
        <div>
          <div className="section-kicker">FOR TEAMS &amp; BRANDS</div>
          <h2 className="section-title">The infrastructure <span className="serif-italic" style={{ color: 'var(--gold)' }}>for fan engagement.</span></h2>
          <p style={{ marginTop: 28, fontSize: 18, color: 'var(--ink-soft)', maxWidth: 720, lineHeight: 1.55, letterSpacing: '-0.005em' }}>
            We don't build a campaign. We build the layer underneath your fan relationship — so every game, season, and signing compounds the connection instead of resetting it.
          </p>
        </div>
      </div></Reveal>

      <div>
        {items.map((it, i) => (
          <Reveal delay={Math.min(i + 1, 4)} key={it.l}>
            <div className="tb-block">
              <div className="tb-letter">{it.l}.</div>
              <div className="tb-title">{it.t}</div>
              <div className="tb-body">{it.b}</div>
              <div className="tb-meta">{it.meta}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Why Spaciom ─────────────────────────────────────────────
function WhySpaciom() {
  return (
    <section className="section container" data-screen-label="08 Why Spaciom">
      <div className="section-head">
        <div className="section-num">05</div>
        <div>
          <div className="section-kicker">WHY SPACIOM</div>
          <h2 className="why-lead">
            The fan economy is being rebuilt — and <span className="serif-italic gold">there's no infrastructure layer.</span>
          </h2>
          <p className="why-sub">
            Teams have apps. Leagues have feeds. Sponsors have campaigns. None of them own the spatial fan relationship. We do — and we license it back to the people whose fans they really are.
          </p>
        </div>
      </div>

      <div className="why-grid">
        <Reveal delay={1}><div className="why-card tilt-card" data-tilt style={{ position: 'relative' }}>
          <div className="tilt-shine"></div>
          <div className="wc-num">01 / WHY NOW</div>
          <div className="wc-title">Headsets <span className="italic">are real.</span></div>
          <div className="wc-body">Apple Vision Pro and Meta Quest cleared the credibility bar. The next decade of fandom is spatial. We're building for phone today and headset tomorrow — same platform.</div>
        </div></Reveal>
        <Reveal delay={2}><div className="why-card tilt-card" data-tilt style={{ position: 'relative' }}>
          <div className="tilt-shine"></div>
          <div className="wc-num">02 / WHY US</div>
          <div className="wc-title">Infrastructure plays <span className="italic">compound.</span></div>
          <div className="wc-body">Apps come and go. Layers stay. Sign one team, and the relationship deepens for a decade — not a season. Every drop, every space, every moment compounds.</div>
        </div></Reveal>
        <Reveal delay={3}><div className="why-card tilt-card" data-tilt style={{ position: 'relative' }}>
          <div className="tilt-shine"></div>
          <div className="wc-num">03 / WHY SPACIOM</div>
          <div className="wc-title">We're <span className="italic">fans first.</span></div>
          <div className="wc-body">This isn't a tech demo looking for a use case. It's a use case fans have already had for fifty years — they just never had a place to keep it. Now they will.</div>
        </div></Reveal>
      </div>
    </section>
  );
}

// ─── Team ────────────────────────────────────────────────────
function Team() {
  const people = [
    { n: 'Timothy Parker',  r: 'Chief Executive Officer',    tag: 'CEO',         img: 'team/tim.png' },
    { n: 'Bayo Okusanya',   r: 'Co-Chief Executive Officer', tag: 'Co-CEO',      img: 'team/bayo.png' },
    { n: 'Tyrice Johnson',  r: 'Chief Business Development Officer', tag: 'CBDO', img: 'team/tyrice.png' },
    { n: 'Jeremie Joncas',  r: 'Chief Operating Officer',    tag: 'COO',         img: 'team/jeremie.png' },
    { n: 'Jose Gomez',      r: 'Chief Financial Officer',    tag: 'CFO',         img: 'team/jose.png' },
    { n: 'James Jefferys',  r: 'Chief Creative Officer',     tag: 'CCO' },
    { n: 'Tiffanye Paige',  r: 'Executive Creative Officer', tag: 'Creative',    img: 'team/tiffanye.png' },
    { n: 'Zach Pouge',      r: 'CTO Strategic Advisor',      tag: 'CTO Advisor' },
  ];
  return (
    <section className="section container" id="team" data-screen-label="09 Team">
      <div className="section-head">
        <div className="section-num">06</div>
        <div>
          <div className="section-kicker">THE TEAM</div>
          <h2 className="section-title">The team that <span className="serif-italic" style={{ color: 'var(--gold)' }}>walks in first.</span></h2>
          <p style={{ marginTop: 28, fontSize: 18, color: 'var(--ink-soft)', maxWidth: 720, lineHeight: 1.55, letterSpacing: '-0.005em' }}>
            The leadership building the place where fandom lives forward — every day, not just Sunday.
          </p>
        </div>
      </div>

      <div className="team-grid">
        {people.map((p, i) => (
          <Reveal delay={Math.min((i % 4) + 1, 4)} key={p.n}>
            <div className="team-card tilt-card" data-tilt style={{ position: 'relative' }}>
              <div className="tilt-shine"></div>
              {p.img ? (
                <div className="team-photo" style={{ backgroundImage: 'url(' + p.img + ')', backgroundSize: 'cover', backgroundPosition: 'center top' }}></div>
              ) : (
                <div className="team-photo"></div>
              )}
              <div>
                <div className="team-tag">{p.tag}</div>
                <div className="team-name">{p.n}</div>
                <div className="team-role">{p.r}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="cta-section container" id="contact" data-screen-label="10 Step Inside">
      <Reveal><div className="section-kicker" style={{ marginBottom: 24 }}>STEP INSIDE</div></Reveal>
      <Reveal delay={1}><h2>Let's build the <span className="italic">experience.</span></h2></Reveal>
      <Reveal delay={2}><p>
        For partners, franchises, and the people ready to own the next era of fandom — let's talk about what we're building, and what's possible together.
      </p></Reveal>
      <Reveal delay={3}><div style={{ display: 'flex', gap: 12 }}>
        <a href="contact.html" className="btn-gold">Get in touch <ArrowRight /></a>
        <a href="#vision" className="btn-ghost">Read the vision</a>
      </div></Reveal>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-big">Spaciom.</div>
            <div className="brand-tag">The Spatial Fandom Experience ✦</div>
          </div>
          <div>
            <h4>Get In Touch</h4>
            <ul>
              <li><a href="contact.html">info@spaciom.io</a></li>
              <li>Winston-Salem, NC</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Owner Website</a></li>
              <li>Spaciom Inc.</li>
              <li style={{ color: 'var(--ink-faint)', fontFamily: 'Geist Mono, monospace', fontSize: 11, letterSpacing: '0.1em' }}>v1.0</li>
            </ul>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              <li><a href="#vision">Vision</a></li>
              <li><a href="#product">Product</a></li>
              <li><a href="#moments">Moments</a></li>
              <li><a href="#team">Team</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2021 — 2026 SPACIOM INC. ALL RIGHTS RESERVED.</span>
          <span>SPATIAL FANDOM EXPERIENCE</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────
function App() {
  useLenisScroll();
  useScrollReveal();
  useTiltCards();
  return (
    <>
      <CustomCursor />
      <ParallaxBackground />
      <Header />
      <main>
        <Hero />
        <Vision />
        <Product />
        <Surfaces />
        <ConsoleSection />
        <Moments />
        <TeamsAndBrands />
        <WhySpaciom />
        <Team />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
