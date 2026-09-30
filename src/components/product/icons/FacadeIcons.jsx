import React from 'react';

// 1. Solid Aluminum Wall Panels: layered aluminum sheets
export const SolidAluminumIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="20" y="30" width="60" height="50" rx="4" fill="url(#solid-grad-bg)" opacity="0.5"/>
    </g>
    <g className="layer-mid">
      <rect x="15" y="20" width="65" height="55" rx="4" fill="url(#solid-grad-mid)" opacity="0.8"/>
    </g>
    <g className="layer-fg">
      <rect x="10" y="10" width="70" height="60" rx="4" fill="url(#solid-grad-fg)"/>
      <path d="M10 14C10 11.7909 11.7909 10 14 10H76C78.2091 10 80 11.7909 80 14V30L10 20V14Z" fill="white" opacity="0.1"/>
    </g>
    <defs>
      <linearGradient id="solid-grad-bg" x1="20" y1="30" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.2"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="solid-grad-mid" x1="15" y1="20" x2="80" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.5"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="solid-grad-fg" x1="10" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9"/>
        <stop offset="0.5" stopColor="#e5e5e5"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.2"/>
      </linearGradient>
    </defs>
  </svg>
);

// 2. Insulated Metal Wall Panels: stacked insulated layers
export const InsulatedMetalIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <path d="M15 75 L85 75 L75 60 L25 60 Z" fill="url(#imp-grad-bg)"/>
    </g>
    <g className="layer-mid">
      <rect x="22" y="40" width="56" height="20" fill="#ff5c00" opacity="0.6"/>
      {/* Insulated core texture */}
      <circle cx="30" cy="50" r="2" fill="white" opacity="0.5"/>
      <circle cx="45" cy="45" r="3" fill="white" opacity="0.3"/>
      <circle cx="60" cy="52" r="2.5" fill="white" opacity="0.4"/>
      <circle cx="70" cy="48" r="1.5" fill="white" opacity="0.6"/>
    </g>
    <g className="layer-fg">
      <path d="M25 40 L75 40 L85 25 L15 25 Z" fill="url(#imp-grad-fg)"/>
      <path d="M15 25 L85 25 L80 32.5 L20 32.5 Z" fill="white" opacity="0.2"/>
    </g>
    <defs>
      <linearGradient id="imp-grad-bg" x1="50" y1="60" x2="50" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.6"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1"/>
      </linearGradient>
      <linearGradient id="imp-grad-fg" x1="50" y1="25" x2="50" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.5"/>
      </linearGradient>
    </defs>
  </svg>
);

// 3. Standing Seam Wall Panels: vertical seam geometry
export const StandingSeamIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="10" y="20" width="80" height="60" fill="url(#ss-grad-bg)"/>
    </g>
    <g className="layer-mid">
      <path d="M30 15 L35 25 L35 85 L30 75 Z" fill="url(#ss-grad-seam)"/>
      <path d="M50 15 L55 25 L55 85 L50 75 Z" fill="url(#ss-grad-seam)"/>
      <path d="M70 15 L75 25 L75 85 L70 75 Z" fill="url(#ss-grad-seam)"/>
    </g>
    <g className="layer-fg">
      <path d="M30 15 L32 15 L32 75 L30 75 Z" fill="#ff5c00" opacity="0.8"/>
      <path d="M50 15 L52 15 L52 75 L50 75 Z" fill="#ff5c00" opacity="0.8"/>
      <path d="M70 15 L72 15 L72 75 L70 75 Z" fill="#ff5c00" opacity="0.8"/>
      <rect x="10" y="20" width="80" height="15" fill="white" opacity="0.15"/>
    </g>
    <defs>
      <linearGradient id="ss-grad-bg" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05"/>
      </linearGradient>
      <linearGradient id="ss-grad-seam" x1="30" y1="15" x2="35" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
  </svg>
);

// 4. Cassette Panel Systems: folded modular square
export const CassettePanelIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="15" y="15" width="70" height="70" fill="#333333"/>
    </g>
    <g className="layer-mid">
      <path d="M25 25 L75 25 L85 15 L15 15 Z" fill="url(#cass-grad-top)"/>
      <path d="M75 25 L75 75 L85 85 L85 15 Z" fill="url(#cass-grad-right)"/>
      <path d="M15 85 L85 85 L75 75 L25 75 Z" fill="url(#cass-grad-bottom)"/>
      <path d="M15 15 L25 25 L25 75 L15 85 Z" fill="url(#cass-grad-left)"/>
    </g>
    <g className="layer-fg">
      <rect x="25" y="25" width="50" height="50" fill="url(#cass-grad-center)"/>
      <circle cx="32" cy="32" r="2" fill="#ff5c00"/>
      <circle cx="68" cy="32" r="2" fill="#ff5c00"/>
      <circle cx="32" cy="68" r="2" fill="#ff5c00"/>
      <circle cx="68" cy="68" r="2" fill="#ff5c00"/>
      <path d="M25 25 L75 25 L75 40 L25 55 Z" fill="white" opacity="0.1"/>
    </g>
    <defs>
      <linearGradient id="cass-grad-top" x1="50" y1="15" x2="50" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.4"/>
      </linearGradient>
      <linearGradient id="cass-grad-right" x1="85" y1="50" x2="75" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.2"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05"/>
      </linearGradient>
      <linearGradient id="cass-grad-bottom" x1="50" y1="85" x2="50" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.1"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="cass-grad-left" x1="15" y1="50" x2="25" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.6"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.2"/>
      </linearGradient>
      <linearGradient id="cass-grad-center" x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.5"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
  </svg>
);

// 5. Corrugated / Trapezoidal Metal Panels: flowing wave profile
export const CorrugatedPanelIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <path d="M10 30 L20 20 L30 30 L40 20 L50 30 L60 20 L70 30 L80 20 L90 30 L90 80 L80 70 L70 80 L60 70 L50 80 L40 70 L30 80 L20 70 L10 80 Z" fill="url(#corr-grad-bg)" opacity="0.4"/>
    </g>
    <g className="layer-mid">
      <path d="M10 25 L20 15 L30 25 L40 15 L50 25 L60 15 L70 25 L80 15 L90 25 L90 75 L80 65 L70 75 L60 65 L50 75 L40 65 L30 75 L20 65 L10 75 Z" fill="url(#corr-grad-mid)"/>
    </g>
    <g className="layer-fg">
      <path d="M20 15 L20 65" stroke="#ff5c00" strokeWidth="2" opacity="0.6"/>
      <path d="M40 15 L40 65" stroke="#ff5c00" strokeWidth="2" opacity="0.6"/>
      <path d="M60 15 L60 65" stroke="#ff5c00" strokeWidth="2" opacity="0.6"/>
      <path d="M80 15 L80 65" stroke="#ff5c00" strokeWidth="2" opacity="0.6"/>
      <path d="M10 25 L90 25 L90 40 L10 55 Z" fill="white" opacity="0.15"/>
    </g>
    <defs>
      <linearGradient id="corr-grad-bg" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="corr-grad-mid" x1="10" y1="15" x2="90" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.8"/>
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.3"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.7"/>
      </linearGradient>
    </defs>
  </svg>
);

// 6. Perforated Metal Façade Panels: perforated metal sheet
export const PerforatedPanelIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      {/* Orange glowing core visible through holes */}
      <rect x="25" y="25" width="50" height="50" fill="#ff5c00" filter="url(#perf-blur)" opacity="0.6"/>
    </g>
    <g className="layer-mid">
      <rect x="15" y="15" width="70" height="70" rx="4" fill="url(#perf-grad-sheet)" mask="url(#perf-mask)"/>
    </g>
    <g className="layer-fg">
      <rect x="15" y="15" width="70" height="30" fill="white" opacity="0.15" mask="url(#perf-mask)"/>
      {/* Highlight edge */}
      <rect x="15" y="15" width="70" height="70" rx="4" stroke="url(#perf-grad-edge)" strokeWidth="1"/>
    </g>
    <defs>
      <filter id="perf-blur" x="0" y="0" width="100" height="100">
        <feGaussianBlur stdDeviation="8"/>
      </filter>
      <linearGradient id="perf-grad-sheet" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9"/>
        <stop offset="1" stopColor="#888888" stopOpacity="0.6"/>
      </linearGradient>
      <linearGradient id="perf-grad-edge" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1"/>
      </linearGradient>
      
      <mask id="perf-mask">
        <rect x="15" y="15" width="70" height="70" fill="white"/>
        {/* Generate a grid of holes */}
        {Array.from({ length: 6 }).map((_, r) => 
          Array.from({ length: 6 }).map((_, c) => {
            // Offset alternate rows for a staggered pattern
            const offset = r % 2 === 0 ? 0 : 5;
            return <circle key={`${r}-${c}`} cx={22 + c * 11 + offset} cy={22 + r * 11} r="2.5" fill="black"/>
          })
        )}
      </mask>
    </defs>
  </svg>
);

// 7. Train Platform Doors: two sliding glass leaves framed in an aluminum track
export const TrainPlatformDoorIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="10" y="15" width="80" height="6" fill="url(#tpd-grad-track)"/>
      <rect x="10" y="79" width="80" height="6" fill="url(#tpd-grad-track)"/>
    </g>
    <g className="layer-mid">
      <rect x="16" y="21" width="30" height="58" fill="url(#tpd-grad-glass)"/>
      <rect x="54" y="21" width="30" height="58" fill="url(#tpd-grad-glass)"/>
    </g>
    <g className="layer-fg">
      <rect x="16" y="21" width="30" height="58" stroke="white" strokeOpacity="0.5" strokeWidth="2" fill="none"/>
      <rect x="54" y="21" width="30" height="58" stroke="white" strokeOpacity="0.5" strokeWidth="2" fill="none"/>
      <rect x="44" y="21" width="12" height="58" fill="#ff5c00" opacity="0.85"/>
      <rect x="16" y="21" width="30" height="14" fill="white" opacity="0.15"/>
      <rect x="54" y="21" width="30" height="14" fill="white" opacity="0.15"/>
    </g>
    <defs>
      <linearGradient id="tpd-grad-track" x1="10" y1="18" x2="90" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="tpd-grad-glass" x1="16" y1="21" x2="46" y2="79" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.5"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
  </svg>
);

// 8. Fixed Panels: a static, mullioned glazing panel (no operable parts)
export const FixedPanelIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="12" y="12" width="76" height="76" rx="2" fill="url(#fp-grad-frame)"/>
    </g>
    <g className="layer-mid">
      <rect x="18" y="18" width="64" height="64" fill="url(#fp-grad-glass)"/>
      <rect x="48" y="18" width="4" height="64" fill="#ff5c00" opacity="0.8"/>
      <rect x="18" y="48" width="64" height="4" fill="#ff5c00" opacity="0.8"/>
    </g>
    <g className="layer-fg">
      <rect x="18" y="18" width="30" height="26" fill="white" opacity="0.15"/>
    </g>
    <defs>
      <linearGradient id="fp-grad-frame" x1="12" y1="12" x2="88" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="fp-grad-glass" x1="18" y1="18" x2="82" y2="82" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.4"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
  </svg>
);

// 9. Aluminium & Metal Doors: a paneled door with handle
export const AluminiumMetalDoorIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="25" y="10" width="50" height="80" rx="2" fill="url(#amd-grad-door)"/>
    </g>
    <g className="layer-mid">
      <rect x="31" y="16" width="38" height="30" fill="white" opacity="0.12"/>
      <rect x="31" y="52" width="38" height="30" fill="white" opacity="0.08"/>
    </g>
    <g className="layer-fg">
      <rect x="25" y="10" width="50" height="80" rx="2" stroke="white" strokeOpacity="0.4" strokeWidth="2" fill="none"/>
      <rect x="64" y="46" width="4" height="10" rx="2" fill="#ff5c00"/>
    </g>
    <defs>
      <linearGradient id="amd-grad-door" x1="25" y1="10" x2="75" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.55"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.15"/>
      </linearGradient>
    </defs>
  </svg>
);

// 10. Interior Cladding: overlapping horizontal battens on a wall
export const InteriorCladdingIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="12" y="12" width="76" height="76" rx="2" fill="#222222"/>
    </g>
    <g className="layer-mid">
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x="18" y={18 + i * 13} width="64" height="9" rx="1.5" fill="url(#ic-grad-batten)"/>
      ))}
    </g>
    <g className="layer-fg">
      <rect x="18" y="31" width="64" height="9" rx="1.5" fill="#ff5c00" opacity="0.85"/>
    </g>
    <defs>
      <linearGradient id="ic-grad-batten" x1="18" y1="18" x2="82" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.7"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.25"/>
      </linearGradient>
    </defs>
  </svg>
);

// 11. Curved Aluminium Profiles: bent/rolled aluminium arc
export const CurvedAluminiumProfileIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <path d="M15 75 C15 35 85 35 85 75" stroke="url(#cap-grad-bg)" strokeWidth="14" fill="none"/>
    </g>
    <g className="layer-mid">
      <path d="M15 75 C15 35 85 35 85 75" stroke="url(#cap-grad-fg)" strokeWidth="8" fill="none"/>
    </g>
    <g className="layer-fg">
      <path d="M20 70 C20 40 80 40 80 70" stroke="#ff5c00" strokeWidth="2" opacity="0.8" fill="none"/>
    </g>
    <defs>
      <linearGradient id="cap-grad-bg" x1="15" y1="35" x2="85" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.25"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.05"/>
      </linearGradient>
      <linearGradient id="cap-grad-fg" x1="15" y1="35" x2="85" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
  </svg>
);

// 12. Custom Architectural Metal Assemblies: bespoke overlapping modular forms
export const CustomAssemblyIcon = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g className="layer-bg">
      <rect x="15" y="45" width="35" height="35" rx="3" fill="url(#ca-grad-a)"/>
    </g>
    <g className="layer-mid">
      <rect x="40" y="30" width="35" height="35" rx="3" fill="url(#ca-grad-b)"/>
    </g>
    <g className="layer-fg">
      <rect x="55" y="55" width="30" height="30" rx="3" fill="#ff5c00" opacity="0.85"/>
      <rect x="40" y="30" width="35" height="35" rx="3" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" fill="none"/>
    </g>
    <defs>
      <linearGradient id="ca-grad-a" x1="15" y1="45" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.6"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.15"/>
      </linearGradient>
      <linearGradient id="ca-grad-b" x1="40" y1="30" x2="75" y2="65" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
  </svg>
);