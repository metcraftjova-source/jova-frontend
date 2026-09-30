import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

/*
  Premium vertical sidebar — dark brushed-metal body, glassy layered "3D"
  icon buttons (depth via stacked shadow layer + raised gradient face,
  subtle tilt-on-hover), bronze glow on the active item.

  The logo is an inline SVG (not an external image import) so a wrong
  asset path can never cause a silent render failure / blank block.
*/

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    )
  },
  {
    to: '/about',
    label: 'About',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
      </>
    )
  },
  {
    to: '/capabilities',
    label: 'Capabilities',
    icon: (
      <>
        <circle cx="12" cy="12" r="2.8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 13.5a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V19.5a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H4.5a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V4.5a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H19.5a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </>
    ),
    children: [
      { to: '/capabilities#engineering-design', label: 'Engineering & Design' },
      { to: '/capabilities#architectural-interior', label: 'Architectural & Interior' },
      { to: '/capabilities#facade', label: 'Façade' },
      { to: '/capabilities#precision-fabrication', label: 'Precision Fabrication' },
      { to: '/capabilities#structural-steel', label: 'Structural Steel' },
      { to: '/capabilities#surface-treatment', label: 'Surface Treatment' },
    ]
  },
  {
    to: '/products',
    label: 'Products',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" />
    ),
    children: [
      { to: '/products#train-platform-doors', label: 'Train Platform Doors' },
      { to: '/products#fixed-panels', label: 'Fixed Panels' },
      { to: '/products#aluminium-metal-doors', label: 'Aluminium & Metal Doors' },
      { to: '/products#interior-cladding', label: 'Interior Cladding' },
      { to: '/products#decorative-panels', label: 'Decorative Panels' },
      { to: '/products#curved-aluminium-profiles', label: 'Curved Aluminium Profiles' },
    ]
  },
  {
    to: '/projects',
    label: 'Projects',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    )
  },
  {
    to: '/industries',
    label: 'Industries',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V8l6-4 6 4v13M9 21v-6h4v6M9 12h.01M13 12h.01M9 8h.01M13 8h.01" />
    )
  },
  {
    to: '/quality',
    label: 'Quality',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-5.5 3 1.4-6.1L3 7.6l6.2-.5L12 1.5l2.8 5.6 6.2.5-4.9 4.3 1.4 6.1z" />
    )
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    )
  }
];

// Inline SVG shield — same silhouette as the brand mark, no external file
// to break. Bronze-gradient fill so it reads as "premium metal" on its own.
const ShieldMark = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F0C888" />
        <stop offset="55%" stopColor="#FF6B00" />
        <stop offset="100%" stopColor="#8a5f2e" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l7 3v6c0 5-3.2 8.7-7 10-3.8-1.3-7-5-7-10V5l7-3z"
      fill="url(#shieldGrad)"
      stroke="#5c3d1c"
      strokeWidth="0.5"
    />
    <path
      d="M9 12.2l2 2 4-4.4"
      stroke="#1a1310"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const N = navItems.length; // 5 — the spark visits N evenly-spaced stops
const PERIOD_MS = 7000; // one full lap, top to bottom
const DWELL_FRAC = 0.62; // fraction of each stop's time-slice spent "arrived" vs traveling to the next

const PremiumSidebar = () => {
  const { pathname } = useLocation();
  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = useRef(null);

  const asideRef = useRef(null);
  const railRef = useRef(null);
  const sparkRef = useRef(null);
  const itemRefs = useRef([]);
  const igniteRefs = useRef([]);
  const stopsRef = useRef([]); // measured pixel Y of each icon's center, top to bottom
  const litIndexRef = useRef(-1); // which icon is currently lit, so DOM is only touched on change

  useEffect(() => {
    const markScrolling = () => {
      setIsIdle(false);
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 400);
    };

    window.addEventListener('wheel', markScrolling, { passive: true });
    window.addEventListener('touchmove', markScrolling, { passive: true });
    window.addEventListener('scroll', markScrolling, { passive: true });
    return () => {
      window.removeEventListener('wheel', markScrolling);
      window.removeEventListener('touchmove', markScrolling);
      window.removeEventListener('scroll', markScrolling);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Cinematic camera parallax: the atmosphere subtly follows the pointer,
  // making the sidebar feel like a physical layered object rather than a flat UI.
  useEffect(() => {
    const root = asideRef.current;
    if (!root) return;
    const onPointerMove = (event) => {
      const rect = root.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      root.style.setProperty('--cam-x', `${nx * 4}px`);
      root.style.setProperty('--cam-y', `${ny * 6}px`);
      root.style.setProperty('--cam-rx', `${ny * -1.5}deg`);
      root.style.setProperty('--cam-ry', `${nx * 1.5}deg`);
    };
    const onPointerLeave = () => {
      root.style.setProperty('--cam-x', '0px');
      root.style.setProperty('--cam-y', '0px');
      root.style.setProperty('--cam-rx', '0deg');
      root.style.setProperty('--cam-ry', '0deg');
    };
    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave, { passive: true });
    return () => {
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  // Measure each icon's real vertical center relative to the sidebar, so
  // the rail and the traveling dot line up with Home/About/Product/
  // Services/Contact exactly as laid out — not a guessed fixed spacing
  // that drifts whenever the flex layout sizes differently.
  useEffect(() => {
    const measure = () => {
      const asideTop = asideRef.current?.getBoundingClientRect().top ?? 0;
      stopsRef.current = itemRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - asideTop + r.height / 2;
      });

      // Draw the rail spanning exactly from the first to the last icon
      // center, instead of a hardcoded height.
      if (railRef.current && stopsRef.current.length > 1) {
        const first = stopsRef.current[0];
        const last = stopsRef.current[stopsRef.current.length - 1];
        railRef.current.style.top = `${first}px`;
        railRef.current.style.height = `${last - first}px`;
      }
    };

    measure();
    window.addEventListener('resize', measure);

    // The initial measurement can fire before the flex layout has fully
    // settled (e.g. right after mount, or after fonts/icons finish
    // painting), leaving stale pixel positions that no longer match
    // where the icons actually ended up. A ResizeObserver keeps the
    // stops in sync with real layout changes, and a couple of short
    // delayed re-measures catch any late settling right after mount.
    const ro = new ResizeObserver(() => measure());
    if (asideRef.current) ro.observe(asideRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));

    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 300);

    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Drives only the spark dot's position along the rail — it travels
  // down through the REAL measured icon positions in order (Home first,
  // Contact last), dwells briefly at each one, then continues. It does
  // not trigger any glow/ignite effect on the icons it passes.
  useEffect(() => {
    let rafId;

    const tick = (now) => {
      const stops = stopsRef.current;
      if (stops.length < 2 || !sparkRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const n = stops.length;
      const cycle = (now % PERIOD_MS) / PERIOD_MS; // 0..1 over one lap
      const stopSpan = 1 / n;
      const stopIndex = Math.min(n - 1, Math.floor(cycle / stopSpan));
      const localT = (cycle - stopIndex * stopSpan) / stopSpan; // 0..1 within this stop's slice

      const isDwelling = localT < DWELL_FRAC;
      const isLastStop = stopIndex === n - 1;

      let topPx;
      let opacity = 1;

      if (isDwelling) {
        topPx = stops[stopIndex];
      } else if (isLastStop) {
        // Reached Contact and dwelled — fade out, then the next lap
        // restarts back at Home.
        topPx = stops[n - 1];
        const fadeT = (localT - DWELL_FRAC) / (1 - DWELL_FRAC);
        opacity = 1 - fadeT;
      } else {
        // Traveling from this stop to the next one, in order.
        const travelT = (localT - DWELL_FRAC) / (1 - DWELL_FRAC);
        topPx = stops[stopIndex] + (stops[stopIndex + 1] - stops[stopIndex]) * travelT;
      }

      sparkRef.current.style.top = `${topPx}px`;
      sparkRef.current.style.opacity = opacity;

      // Glow the icon the dot is currently sitting on — and only that
      // one. For every stop except the last, this matches the dwell
      // window exactly. For the last stop (Contact), keep it lit through
      // the fade-out too, so it visibly glows the whole time the spark
      // is sitting on/near it, right up until the spark disappears.
      const nextLit = isDwelling ? stopIndex : (isLastStop && opacity > 0 ? stopIndex : -1);
      if (nextLit !== litIndexRef.current) {
        // Force every icon's glow state to match reality on each change,
        // instead of only touching the single previously-tracked index.
        // This makes it self-correcting: it can never get stuck lit on
        // the wrong module even if a render/route-change/race causes a
        // single removal to be missed.
        igniteRefs.current.forEach((el, i) => {
          if (!el) return;
          if (i === nextLit) el.classList.add('is-lit');
          else el.classList.remove('is-lit');
        });
        litIndexRef.current = nextLit;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <aside
      ref={asideRef}
      className={`hidden lg:flex fixed left-0 top-0 h-screen w-[84px] z-50 flex-col items-center py-3 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${
        isIdle ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-full pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(165deg, #16191c 0%, #0a0c0f 48%, #030405 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.03), 8px 0 30px rgba(0,0,0,0.5)'
      }}
    >
      {/* CINEMATIC INDUSTRIAL ATMOSPHERE
          Lightweight DOM/CSS effects only: no external assets or libraries. */}
      <div className="cinematic-atmosphere" aria-hidden="true">
        <div className="ca-vignette" />
        <div className="ca-depth-glow" />
        <div className="ca-grid" />
        <div className="ca-blueprint ca-blueprint-a" />
        <div className="ca-blueprint ca-blueprint-b" />
        <div className="ca-beam ca-beam-a" />
        <div className="ca-beam ca-beam-b" />
        <div className="ca-scan ca-scan-a" />
        <div className="ca-scan ca-scan-b" />
        <div className="ca-particle ca-p1" />
        <div className="ca-particle ca-p2" />
        <div className="ca-particle ca-p3" />
        <div className="ca-particle ca-p4" />
        <div className="ca-particle ca-p5" />
        <div className="ca-orbit ca-orbit-a" />
        <div className="ca-orbit ca-orbit-b" />
      </div>

      <style>{`
        /* ============================================================
           CINEMATIC INDUSTRIAL ATMOSPHERE
           Designed to feel like a miniature architectural machine:
           technical grid + scanning light + particles + orbital depth.
           ============================================================ */
        .cinematic-atmosphere {
          transform: translate3d(var(--cam-x,0px), var(--cam-y,0px), 0);
          transition: transform 900ms cubic-bezier(.2,.8,.2,1);
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          opacity: 1;
        }

        .ca-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 22%, rgba(255,107,0,.16), transparent 20%),
            radial-gradient(circle at 50% 78%, rgba(255,107,0,.07), transparent 25%),
            linear-gradient(90deg, rgba(0,0,0,.45), transparent 32%, transparent 68%, rgba(0,0,0,.55));
          z-index: 0;
        }

        .ca-depth-glow {
          position: absolute;
          width: 150px;
          height: 520px;
          left: 50%;
          top: 48%;
          transform: translate(calc(-50% + var(--cam-x, 0px)), calc(-50% + var(--cam-y, 0px)));
          background: radial-gradient(ellipse, rgba(255,107,0,.12), transparent 62%);
          filter: blur(18px);
          animation: ca-depth 6s ease-in-out infinite;
        }

        @keyframes ca-depth {
          0%,100% { opacity: .45; transform: translate(calc(-50% + var(--cam-x, 0px)), calc(-50% + var(--cam-y, 0px))) scale(.92); }
          50% { opacity: 1; transform: translate(calc(-50% + var(--cam-x, 0px)), calc(-50% + var(--cam-y, 0px))) scale(1.08); }
        }

        .ca-blueprint {
          position: absolute;
          width: 110px;
          height: 110px;
          left: 50%;
          border: 1px solid rgba(255,255,255,.08);
          transform: translateX(-50%) rotate(45deg) scale(.72);
          box-shadow: inset 0 0 0 10px rgba(255,107,0,.018), 0 0 30px rgba(255,107,0,.035);
          opacity: .7;
        }
        .ca-blueprint::before, .ca-blueprint::after {
          content: '';
          position: absolute;
          inset: 15px;
          border: 1px solid rgba(255,107,0,.14);
        }
        .ca-blueprint::after {
          inset: 50%;
          width: 160%;
          height: 1px;
          border: 0;
          background: rgba(255,255,255,.12);
          transform: translate(-50%,-50%) rotate(-45deg);
        }
        .ca-blueprint-a { top: 24%; animation: blueprint-a 12s linear infinite; }
        .ca-blueprint-b { bottom: 19%; width: 78px; height: 78px; opacity: .45; animation: blueprint-b 9s linear infinite reverse; }
        @keyframes blueprint-a { to { transform: translateX(-50%) rotate(405deg) scale(.72); } }
        @keyframes blueprint-b { to { transform: translateX(-50%) rotate(-315deg) scale(.72); } }

        .ca-beam {
          position: absolute;
          width: 4px;
          height: 140%;
          top: -20%;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,.75), rgba(255,107,0,.85), transparent);
          filter: blur(2px);
          box-shadow: 0 0 25px rgba(255,107,0,.42);
          opacity: 0;
          transform-origin: center;
        }
        .ca-beam-a { left: 24%; transform: rotate(18deg); animation: beam-pass 8s ease-in-out infinite; }
        .ca-beam-b { left: 74%; transform: rotate(18deg); animation: beam-pass 8s ease-in-out 3.8s infinite; }
        @keyframes beam-pass {
          0%,12% { opacity: 0; transform: translateX(-45px) rotate(18deg); }
          25% { opacity: .18; }
          45% { opacity: .75; }
          62% { opacity: .12; }
          78%,100% { opacity: 0; transform: translateX(45px) rotate(18deg); }
        }

        .ca-grid {
          position: absolute;
          inset: -35%;
          background-image:
            linear-gradient(rgba(255,255,255,.075) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 14px 14px;
          transform: perspective(420px) rotateX(calc(12deg + var(--cam-rx, 0deg))) rotateY(var(--cam-ry, 0deg)) translate3d(var(--cam-x, 0px), var(--cam-y, 0px), 0) scale(1.15);
          mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          opacity: .58;
          animation: ca-grid-drift 12s linear infinite;
        }

        .ca-grid::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 20%, rgba(255,107,0,.10), transparent 25%),
            linear-gradient(90deg, transparent, rgba(255,255,255,.035), transparent);
          animation: ca-breathe 5s ease-in-out infinite;
        }

        @keyframes ca-grid-drift {
          from { transform: perspective(420px) rotateX(12deg) translateY(0) scale(1.15); }
          to   { transform: perspective(420px) rotateX(12deg) translateY(18px) scale(1.15); }
        }

        @keyframes ca-breathe {
          0%,100% { opacity: .35; }
          50% { opacity: 1; }
        }

        .ca-scan {
          position: absolute;
          left: -35%;
          width: 170%;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,107,0,.2) 20%, rgba(255,255,255,.95) 50%, rgba(255,107,0,.65) 72%, transparent 100%);
          filter: blur(.25px);
          box-shadow: 0 0 6px rgba(255,255,255,.45), 0 0 18px rgba(255,107,0,.8);
          transform: rotate(-8deg);
          opacity: 0;
        }

        .ca-scan-a {
          top: 18%;
          animation: ca-scan-a 4.5s cubic-bezier(.4,0,.2,1) infinite;
        }

        .ca-scan-b {
          top: 72%;
          animation: ca-scan-b 6s cubic-bezier(.4,0,.2,1) 2.4s infinite;
        }

        @keyframes ca-scan-a {
          0%, 8% { transform: translateY(-80px) rotate(-8deg); opacity: 0; }
          20% { opacity: .75; }
          52% { opacity: .28; }
          72%,100% { transform: translateY(520px) rotate(-8deg); opacity: 0; }
        }

        @keyframes ca-scan-b {
          0%, 10% { transform: translateY(420px) rotate(-8deg); opacity: 0; }
          28% { opacity: .45; }
          56% { opacity: .18; }
          76%,100% { transform: translateY(-420px) rotate(-8deg); opacity: 0; }
        }

        .ca-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,.75);
          box-shadow: 0 0 5px rgba(255,255,255,.8), 0 0 12px rgba(255,107,0,.95);
          opacity: 0;
        }

        .ca-p1 { left: 20%; top: 14%; animation: ca-p 4.8s ease-in-out 0s infinite; }
        .ca-p2 { left: 72%; top: 27%; animation: ca-p 6.2s ease-in-out 1.1s infinite; }
        .ca-p3 { left: 34%; top: 48%; animation: ca-p 5.4s ease-in-out 2s infinite; }
        .ca-p4 { left: 78%; top: 64%; animation: ca-p 7s ease-in-out .6s infinite; }
        .ca-p5 { left: 16%; top: 82%; animation: ca-p 5.8s ease-in-out 3s infinite; }

        @keyframes ca-p {
          0%,100% { opacity: 0; transform: translate3d(0,12px,0) scale(.5); }
          25% { opacity: .55; }
          55% { opacity: .9; transform: translate3d(5px,-8px,0) scale(1); }
          78% { opacity: .18; }
        }

        .ca-orbit {
          position: absolute;
          left: 50%;
          width: 64px;
          height: 64px;
          margin-left: -32px;
          border: 1px solid rgba(255,107,0,.28);
          border-radius: 50%;
          transform: rotateX(65deg);
          box-shadow: 0 0 18px rgba(255,107,0,.12);
        }

        .ca-orbit-a {
          top: 12%;
          animation: ca-orbit 11s linear infinite;
        }

        .ca-orbit-b {
          bottom: 10%;
          width: 46px;
          height: 46px;
          margin-left: -23px;
          animation: ca-orbit 8s linear reverse infinite;
        }

        @keyframes ca-orbit {
          to { transform: rotateX(65deg) rotateZ(360deg); }
        }

        /* Metallic edge illumination makes the rail feel machined rather
           than like a normal web-navigation line. */
        .sb-rail::before {
          content: '';
          position: absolute;
          inset: 0;
          width: 1px;
          margin: auto;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(255,255,255,.18) 18%,
            rgba(255,107,0,.75) 50%,
            rgba(255,255,255,.12) 82%,
            transparent
          );
          box-shadow: 0 0 8px rgba(255,107,0,.25);
          animation: rail-energy 3.5s ease-in-out infinite;
        }

        @keyframes rail-energy {
          0%,100% { opacity: .35; }
          50% { opacity: 1; }
        }

        /* Cinematic hover: a controlled light sweep rather than a generic
           button hover. */
        .sb-icon-3d:hover .sb-face {
          transform: rotateX(10deg) rotateY(-12deg) translateZ(7px) scale(1.035);
          border-color: rgba(255,107,0,.7) !important;
          box-shadow:
            0 10px 24px rgba(0,0,0,.55),
            0 0 24px rgba(255,107,0,.16),
            inset 0 1px 1px rgba(255,255,255,.18);
        }

        .sb-icon-3d:hover .sb-sheen {
          animation-duration: 1.2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .ca-grid,
          .ca-beam,
          .ca-blueprint,
          .ca-depth-glow,
          .ca-scan,
          .ca-particle,
          .ca-orbit,
          .sb-sheen,
          .sb-orbit-ring,
          .sb-logo-pulse,
          .sb-rail::before {
            animation: none !important;
          }
        }

        .cinematic-atmosphere::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255,255,255,.22) 18%,
            rgba(255,107,0,.75) 50%,
            rgba(255,255,255,.16) 82%,
            transparent
          );
          box-shadow: 0 0 12px rgba(255,107,0,.35);
          animation: edge-light 4s ease-in-out infinite;
        }

        @keyframes edge-light {
          0%,100% { opacity: .3; }
          50% { opacity: 1; }
        }

        .sb-icon-3d {
          transform-style: preserve-3d;
          perspective: 300px;
        }
        .sb-icon-3d .sb-face {
          transition: transform 350ms cubic-bezier(0.34,1.5,0.64,1), box-shadow 350ms ease;
        }
        .sb-icon-3d:hover .sb-face {
          transform: rotateX(12deg) rotateY(-12deg) translateZ(4px);
        }
        .sb-icon-3d:active .sb-face {
          transform: rotateX(4deg) rotateY(-4deg) translateZ(1px) scale(0.96);
        }

        /* Idle float — each icon gently bobs, staggered so they never sync,
           giving the whole rail a living, motion-graphics feel at rest. */
        @keyframes sb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .sb-float-wrap {
          animation: none;
        }

        /* Rotating conic light sweep behind the active icon — reads like a
           scanning metallic glow orbiting the button. */
        @keyframes sb-orbit {
          to { transform: rotate(360deg); }
        }
        .sb-orbit-ring {
          position: absolute;
          inset: -3px;
          border-radius: 1rem;
          background: conic-gradient(from 0deg, transparent 0%, rgba(255,107,0,0.9) 15%, transparent 30%, transparent 100%);
          animation: sb-orbit 2.4s linear infinite;
          filter: blur(1px);
        }

        /* Specular sheen sweeping diagonally across each glass face on a
           loop — like light catching brushed metal. */
        @keyframes sb-sheen {
          0% { transform: translateX(-120%) translateY(-120%) rotate(25deg); opacity: 0; }
          8% { opacity: 0.5; }
          22% { opacity: 0; }
          100% { transform: translateX(120%) translateY(120%) rotate(25deg); opacity: 0; }
        }
        .sb-sheen {
          position: absolute;
          inset: -50%;
          background: linear-gradient(75deg, transparent 45%, rgba(255,255,255,0.35) 50%, transparent 55%);
          animation: sb-sheen 5s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
        }

        /* Slow ambient pulse on the logo, like a heartbeat glow. */
        @keyframes sb-logo-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(255,107,0,0.15), inset 0 1px 1px rgba(255,255,255,0.08); }
          50% { box-shadow: 0 0 28px rgba(255,107,0,0.35), inset 0 1px 1px rgba(255,255,255,0.12); }
        }
        .sb-logo-pulse {
          animation: sb-logo-pulse 3s ease-in-out infinite;
        }

        /* ===== Traveling current — the spark runs down the spine
           connecting every icon and dwells briefly at each stop, purely
           as a decorative "energy flowing through the system" cue. It
           does NOT trigger any glow/ignite change on the icons it visits
           — their appearance is unaffected as the dot passes. ===== */
        .sb-rail {
          position: absolute;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(255,107,0,0.05), rgba(255,107,0,0.18), rgba(255,107,0,0.05));
          z-index: 0;
        }
        .sb-spark {
          position: absolute;
          left: 50%;
          top: 0px;
          width: 8px;
          height: 8px;
          margin-left: -4px;
          margin-top: -4px;
          border-radius: 999px;
          background: #fff;
          z-index: 3;
          box-shadow:
            0 0 4px 2px rgba(255,255,255,.95),
            0 0 12px 4px rgba(255,107,0,.95),
            0 0 30px 9px rgba(255,107,0,.45);
        }

        .sb-spark::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 76px;
          transform: translate(-50%, -6px);
          transform-origin: top;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,.95),
            rgba(255,107,0,.7) 28%,
            rgba(255,107,0,.18) 72%,
            transparent
          );
          filter: blur(.3px);
        }

        .sb-spark::after {
          content: '';
          position: absolute;
          inset: -9px;
          border-radius: 50%;
          border: 1px solid rgba(255,107,0,.65);
          animation: spark-pulse 1.2s ease-out infinite;
        }

        @keyframes spark-pulse {
          0% { transform: scale(.55); opacity: .9; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        /* Per-icon glow ring — dim by default, brightens only while the
           dot is really dwelling on that exact icon (JS-toggled .is-lit,
           driven from the same tick as the dot's own position). A soft
           radial halo (::before) plus a bright border ring together make
           the effect clearly visible on every stop, including the last
           one (Contact). */
        .sb-ignite-ring {
          position: absolute;
          inset: -4px;
          border-radius: 1.1rem;
          border: 1px solid rgba(255,107,0,.78);
          pointer-events: none;
          opacity: 0;
          transform: scale(1);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        .sb-ignite-ring::before {
          content: '';
          position: absolute;
          inset: -7px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,107,0,0.32) 0%, transparent 72%);
          filter: blur(6px);
          z-index: -1;
        }
        .sb-ignite-ring.is-lit {
          opacity: 1;
          transform: scale(1.15);
          box-shadow: 0 0 12px 2px rgba(255,107,0,0.45), 0 0 26px 6px rgba(255,107,0,0.16);
        }
      `}</style>

      {/* Connecting spine + traveling spark, sits behind the icon column */}
      <div ref={railRef} className="sb-rail" />
      <div ref={sparkRef} className="sb-spark" />

      {/* Logo */}
      <div
        className="sb-logo-pulse relative z-10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 shrink-0 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #2a2118, #0f0c09)',
          border: '1px solid rgba(255,107,0,0.35)'
        }}
      >
        <div className="sb-sheen" />
        <ShieldMark />
      </div>

      {/* Nav items */}
      <nav className="relative z-20 flex flex-col items-center flex-1 justify-between py-1 w-full">
        {navItems.map((item, idx) => {
          const active = isActive(item.to);
          const hasChildren = !!item.children?.length;
          const content = (
            <div className="relative flex flex-col items-center group cursor-pointer sb-icon-3d">
              {active && (
                <span
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,107,0,0.4) 0%, transparent 70%)',
                    filter: 'blur(8px)'
                  }}
                />
              )}

              {/* Layered "3D" button: base shadow layer + raised glass face,
                  idle-floating as a group so it feels animated at rest */}
              <div
                ref={(el) => (itemRefs.current[idx] = el)}
                className="sb-float-wrap relative w-9 h-9"
                style={{ animationDelay: `${idx * 0.35}s` }}
              >
                {/* Glow ring — brightens only while the dot is actually
                    dwelling on this exact icon */}
                <div
                  ref={(el) => (igniteRefs.current[idx] = el)}
                  className="sb-ignite-ring"
                />

                {/* Rotating orbit glow ring — only on the active item */}
                {active && <div className="sb-orbit-ring" />}

                {/* Depth shadow layer, sits behind, offset down-right */}
                <div
                  className="absolute inset-0 rounded-2xl translate-y-1 translate-x-0.5"
                  style={{ background: 'rgba(0,0,0,0.55)', filter: 'blur(2px)' }}
                />

                {/* Raised face */}
                <div
                  className="sb-face relative w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden"
                  style={
                    active
                      ? {
                          background: 'linear-gradient(145deg, #4a3a22, #1a1310)',
                          border: '1.5px solid #FF6B00',
                          boxShadow:
                            '0 0 16px rgba(255,107,0,0.55), 0 0 32px rgba(255,107,0,0.25), inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.4)'
                        }
                      : {
                          background: 'linear-gradient(145deg, var(--metal-700), var(--metal-900))',
                          border: '1px solid var(--metal-600)',
                          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -2px 3px rgba(0,0,0,0.5)'
                        }
                  }
                >
                  <div className="sb-sheen" style={{ animationDelay: `${idx * 0.6}s` }} />
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={active ? '#FF6B00' : 'var(--metal-400)'}
                    strokeWidth="1.8"
                    className="relative z-10"
                    style={{ filter: active ? 'drop-shadow(0 0 4px rgba(255,107,0,0.6))' : 'none' }}
                  >
                    {item.icon}
                  </svg>
                </div>
              </div>

              <span
                className={`mt-0.5 text-[6px] font-semibold tracking-wide transition-colors duration-300 leading-none ${
                  active ? 'text-[#FF6B00]' : 'text-gray-500 group-hover:text-gray-300'
                }`}
              >
                {item.label}
              </span>

              {/* Flyout submenu — appears to the right of the icon on
                  hover/focus for items that declare children (Capabilities,
                  Products). Pure CSS visibility toggle, no extra state. */}
              {hasChildren && (
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 min-w-[220px] py-2 rounded-xl opacity-0 invisible translate-x-[-6px] group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-200 z-30"
                  style={{
                    background: 'linear-gradient(160deg, #1a1512 0%, #0c0a08 100%)',
                    border: '1px solid rgba(255,107,0,0.25)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.55)'
                  }}
                >
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.to}
                      className="block px-4 py-2 text-[12px] font-medium text-gray-300 hover:text-[#FF6B00] hover:bg-white/5 whitespace-nowrap transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );

          return item.to.startsWith('/#') ? (
            <a key={item.label} href={item.to}>{content}</a>
          ) : (
            <Link key={item.label} to={item.to}>{content}</Link>
          );
        })}
      </nav>

      {/* Bottom tagline */}
      <div className="relative z-10 mt-auto pt-1 px-3 text-center">
        <div
          className="w-5 h-[2px] mx-auto mb-1.5 rounded-full"
          style={{ background: '#FF6B00' }}
        />
        <p className="text-[6px] font-bold tracking-[0.1em] text-gray-500 uppercase leading-tight">
          Concept To<br />Completion
        </p>
      </div>
    </aside>
  );
};

export default PremiumSidebar;