import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

/* ============================================================
   CINEMATIC QUALITY TIMELINE
   ============================================================ */

const ORANGE = '#ff7200';
const ORANGE_BRIGHT = '#ffb45c';

/* ============================================================
   SHARED SVG DEFS
   ============================================================ */

const Defs = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#ffc078" />
      <stop offset="35%" stopColor="#ff7a1a" />
      <stop offset="70%" stopColor="#e35d00" />
      <stop offset="100%" stopColor="#8d3000" />
    </linearGradient>

    <linearGradient id={`${id}-side`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#a94200" />
      <stop offset="100%" stopColor="#481600" />
    </linearGradient>

    <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </linearGradient>

    <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
    </radialGradient>

    <filter id={`${id}-glow`}>
      <feGaussianBlur stdDeviation="1.8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

const IconBase = ({ id, children, active }) => (
  <svg
    viewBox="0 0 64 64"
    className="w-10 h-10"
    style={{
      filter: active
        ? 'drop-shadow(0 0 10px rgba(255,130,30,.65))'
        : 'drop-shadow(0 6px 10px rgba(0,0,0,.5))',
      transition: 'filter 700ms ease',
    }}
  >
    <Defs id={id} />

    <ellipse
      cx="32"
      cy="55"
      rx="18"
      ry="4.5"
      fill={`url(#${id}-shadow)`}
    />

    {children}
  </svg>
);

/* ============================================================
   ICONS
   ============================================================ */

const IncomingIcon = ({ id = 'q-in', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M12 24l20-10 20 10-20 10-20-10z"
      fill={`url(#${id}-glass)`}
      stroke="#ffd9b3"
      strokeWidth="0.5"
    />

    <path
      d="M12 24v18l20 10V34L12 24z"
      fill={`url(#${id}-side)`}
      stroke="#fff2e0"
      strokeWidth="0.8"
      strokeOpacity=".6"
    />

    <path
      d="M52 24v18L32 52V34l20-10z"
      fill={`url(#${id}-body)`}
    />

    <path
      d="M12 24l20-10 20 10-20 10-20-10z"
      fill="none"
      stroke="#fff2e0"
      strokeWidth="1.2"
      strokeLinejoin="round"
      opacity=".8"
    />
  </IconBase>
);

const CuttingIcon = ({ id = 'q-cut', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M20 44L46 14"
      stroke={`url(#${id}-body)`}
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    <path
      d="M32 34L46 20"
      stroke={`url(#${id}-side)`}
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    <circle
      cx="18"
      cy="46"
      r="7"
      fill={`url(#${id}-body)`}
      stroke="#fff2e0"
      strokeWidth="1"
    />

    <circle
      cx="44"
      cy="18"
      r="6"
      fill={`url(#${id}-side)`}
      stroke="#fff2e0"
      strokeWidth="1"
    />
  </IconBase>
);

const FormingIcon = ({ id = 'q-form', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M14 40c0-13 10-23 23-23"
      fill="none"
      stroke={`url(#${id}-body)`}
      strokeWidth="6"
      strokeLinecap="round"
    />

    <path
      d="M31 12l8 5-8 5"
      fill={`url(#${id}-side)`}
    />

    <rect
      x="12"
      y="40"
      width="30"
      height="12"
      rx="3"
      fill={`url(#${id}-body)`}
    />

    <rect
      x="12"
      y="40"
      width="30"
      height="5"
      rx="2.5"
      fill={`url(#${id}-glass)`}
    />
  </IconBase>
);

const WeldingIcon = ({ id = 'q-weld', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M12 46l16-16"
      stroke={`url(#${id}-side)`}
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    <rect
      x="30"
      y="14"
      width="10"
      height="18"
      rx="2"
      transform="rotate(45 35 23)"
      fill={`url(#${id}-body)`}
    />

    <circle cx="24" cy="38" r="3" fill="#ffd9b3">
      <animate
        attributeName="opacity"
        values="1;0.2;1"
        dur=".8s"
        repeatCount="indefinite"
      />
    </circle>

    <circle cx="20" cy="34" r="2" fill="#ffb066">
      <animate
        attributeName="opacity"
        values=".3;1;.3"
        dur=".6s"
        repeatCount="indefinite"
      />
    </circle>

    <circle cx="28" cy="42" r="1.6" fill="#fff2e0">
      <animate
        attributeName="opacity"
        values="1;.2;1"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </IconBase>
);

const AssemblyIcon = ({ id = 'q-asm', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M32 8l19 11v18L32 48 13 37V19z"
      fill={`url(#${id}-body)`}
      stroke="#fff2e0"
      strokeWidth="1"
      strokeOpacity=".6"
      strokeLinejoin="round"
    />

    <path
      d="M32 8l19 11-19 11-19-11z"
      fill={`url(#${id}-glass)`}
      opacity=".6"
    />

    <circle
      cx="32"
      cy="30"
      r="8"
      fill="#0d0d0d"
      stroke="#fff2e0"
      strokeWidth="1.4"
      strokeOpacity=".7"
    />

    <circle
      cx="32"
      cy="30"
      r="8"
      fill={`url(#${id}-side)`}
      opacity=".85"
    />
  </IconBase>
);

const SealantIcon = ({ id = 'q-seal', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M32 10c8 11 13 18 13 26a13 13 0 01-26 0c0-8 5-15 13-26z"
      fill={`url(#${id}-body)`}
      stroke="#fff2e0"
      strokeWidth="1"
      strokeOpacity=".6"
    />

    <ellipse
      cx="27"
      cy="24"
      rx="4"
      ry="7"
      fill={`url(#${id}-glass)`}
      opacity=".7"
    />

    <ellipse
      cx="35"
      cy="34"
      rx="4"
      ry="6"
      fill="#6e2800"
      opacity=".4"
    />
  </IconBase>
);

const CoatingIcon = ({ id = 'q-coat', active }) => (
  <IconBase id={id} active={active}>
    <rect
      x="10"
      y="20"
      width="14"
      height="26"
      rx="2.5"
      fill={`url(#${id}-side)`}
      stroke="#fff2e0"
      strokeWidth="1"
      strokeOpacity=".6"
    />

    <rect
      x="10"
      y="20"
      width="14"
      height="8"
      rx="2.5"
      fill={`url(#${id}-glass)`}
    />

    <path
      d="M24 26h9a5 5 0 005-5v-4"
      fill="none"
      stroke={`url(#${id}-body)`}
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    <rect
      x="34"
      y="10"
      width="9"
      height="10"
      rx="1.5"
      fill={`url(#${id}-body)`}
    />

    <g stroke="#ffb066" strokeWidth="2" strokeLinecap="round">
      <path d="M17 32h3">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </path>

      <path d="M17 37h3">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.2s"
          begin=".25s"
          repeatCount="indefinite"
        />
      </path>

      <path d="M17 42h3">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1.2s"
          begin=".5s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </IconBase>
);

const FinalInspectionIcon = ({ id = 'q-fin', active }) => (
  <IconBase id={id} active={active}>
    <path
      d="M32 8l19 7v14c0 13-8.5 20-19 23-10.5-3-19-10-19-23V15z"
      fill={`url(#${id}-body)`}
      stroke="#fff2e0"
      strokeWidth="1"
      strokeOpacity=".6"
    />

    <path
      d="M32 8l19 7v5.5l-19-5-19 5V15z"
      fill={`url(#${id}-glass)`}
    />

    <path
      d="M23 30l7 7 13-14"
      stroke="#3a1400"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity=".35"
    />

    <path
      d="M23 30l7 7 13-14"
      stroke="#fff2e0"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </IconBase>
);

const DispatchIcon = ({ id = 'q-disp', active }) => (
  <IconBase id={id} active={active}>
    <rect
      x="8"
      y="24"
      width="26"
      height="17"
      rx="2"
      fill={`url(#${id}-side)`}
      stroke="#fff2e0"
      strokeWidth=".8"
      strokeOpacity=".6"
    />

    <rect
      x="8"
      y="24"
      width="26"
      height="6"
      rx="2"
      fill={`url(#${id}-glass)`}
    />

    <path
      d="M34 28h10l7 7v6H34z"
      fill={`url(#${id}-body)`}
    />

    <circle
      cx="18"
      cy="46"
      r="4.2"
      fill="#3a1400"
      stroke="#ffd9b3"
      strokeWidth="1.4"
    />

    <circle
      cx="43"
      cy="46"
      r="4.2"
      fill="#3a1400"
      stroke="#ffd9b3"
      strokeWidth="1.4"
    />
  </IconBase>
);

/* ============================================================
   DATA
   ============================================================ */

const qualityStages = [
  {
    id: '01',
    title: 'Incoming Material Inspection',
    description:
      'Every raw material is checked against specification before it enters production.',
    Icon: IncomingIcon,
  },
  {
    id: '02',
    title: 'Cutting & Dimensional Checks',
    description:
      'Cut parts are verified against drawings to hold tight dimensional tolerances.',
    Icon: CuttingIcon,
  },
  {
    id: '03',
    title: 'Forming & Fabrication Checks',
    description:
      'Formed and fabricated components are inspected for accuracy and consistency.',
    Icon: FormingIcon,
  },
  {
    id: '04',
    title: 'Welding Inspection',
    description:
      'Weld quality, penetration, and structural integrity are verified at every joint.',
    Icon: WeldingIcon,
  },
  {
    id: '05',
    title: 'Assembly Inspection',
    description:
      'Assembled units are checked for fit, alignment, and functional accuracy.',
    Icon: AssemblyIcon,
  },
  {
    id: '06',
    title: 'Structural Sealant Application Checks',
    description:
      'Sealant application is inspected for coverage and adhesion where applicable.',
    Icon: SealantIcon,
  },
  {
    id: '07',
    title: 'Surface Preparation & Coating Inspection',
    description:
      'Surfaces are prepared and coated to specification, then inspected for finish quality.',
    Icon: CoatingIcon,
  },
  {
    id: '08',
    title: 'Final Quality Inspection',
    description:
      'A comprehensive review confirms the finished product meets every requirement.',
    Icon: FinalInspectionIcon,
  },
  {
    id: '09',
    title: 'Final Dispatch Verification',
    description:
      'A last verification pass before dispatch ensures what ships is exactly what was ordered.',
    Icon: DispatchIcon,
  },
];

/* ============================================================
   PARTICLES
   ============================================================ */

const ParticleField = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-orange-300"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: 0.08,
            animation: `quality-particle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

/* ============================================================
   CINEMATIC CARD
   ============================================================ */

const StageCard = ({
  stage,
  index,
  align,
  isActive,
  isPast,
  registerCard,
  registerNode,
}) => {
  const Icon = stage.Icon;

  const leftSide = align === 'left';

  return (
    <div
      ref={registerCard}
      className={`
        quality-stage
        relative flex
        ${leftSide ? 'lg:justify-end' : 'lg:justify-start'}
      `}
      data-stage={index}
    >
      {/* Desktop checkpoint */}
      <div
        ref={registerNode}
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-40"
      >
        <div
          className={`
            quality-node
            relative
            w-3 h-3 rounded-full
            border
            transition-all duration-700
            ${isActive
              ? 'bg-orange-200 border-orange-100 shadow-[0_0_16px_6px_rgba(255,140,40,.9)]'
              : isPast
              ? 'bg-orange-700 border-orange-500'
              : 'bg-[#101010] border-white/15'}
          `}
        >
          {isActive && (
            <>
              <span className="absolute inset-[-10px] rounded-full border border-orange-400/40 animate-ping" />
              <span className="absolute inset-[-24px] rounded-full bg-orange-500/50 blur-lg" />
              <span className="absolute inset-[-40px] rounded-full bg-orange-500/20 blur-2xl" />
            </>
          )}
        </div>
      </div>

      {/* Connector */}
      <div
        className={`
          hidden lg:block
          absolute top-1/2
          -translate-y-1/2
          h-px
          z-10
          ${leftSide
            ? 'right-1/2 mr-2 w-16'
            : 'left-1/2 ml-2 w-16'}
        `}
      >
        <div
          className={`
            absolute inset-0
            transition-all duration-700
            ${
              isActive
                ? 'bg-gradient-to-r from-transparent via-orange-300 to-orange-500 shadow-[0_0_14px_3px_rgba(255,130,30,.85)]'
                : isPast
                ? 'bg-orange-700/30'
                : 'bg-white/5'
            }
          `}
        />

        {isActive && (
          <div
            className={`
              absolute top-1/2
              -translate-y-1/2
              w-12 h-1
              rounded-full
              blur-[3px]
              bg-orange-300
              ${leftSide ? 'animate-beam-right' : 'animate-beam-left'}
            `}
          />
        )}
      </div>

      {/* Card */}
      <article
        className={`
          quality-card
          group
          relative
          w-full
          lg:w-[calc(50%-5rem)]
          min-h-[180px]
          rounded-[22px]
          overflow-hidden
          border
          transition-all
          duration-700
          ease-out
          ${
            isActive
              ? 'border-orange-400'
              : 'border-white/[0.07] hover:border-orange-500/30'
          }
        `}
        style={{
          boxShadow: isActive
            ? '0 0 0 1px rgba(255,140,40,.55), 0 0 28px rgba(255,120,0,.55), 0 0 70px rgba(255,100,0,.40), 0 0 140px rgba(255,90,0,.25), inset 0 0 40px rgba(255,110,0,.12)'
            : '0 0 0 rgba(255,110,0,0)',
        }}
      >
        {/* Outer cinematic aura */}
        <div
          className={`
            absolute
            -inset-[1px]
            rounded-[22px]
            pointer-events-none
            transition-opacity
            duration-700
            ${
              isActive
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-60'
            }
          `}
          style={{
            background:
              'linear-gradient(120deg, rgba(255,105,0,.8), transparent 35%, transparent 65%, rgba(255,150,40,.35))',
            filter: 'blur(10px)',
            zIndex: -1,
          }}
        />

        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0b0c]" />

        <div
          className={`
            absolute inset-0
            transition-opacity
            duration-700
            ${
              isActive
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-50'
            }
          `}
          style={{
            background:
              'radial-gradient(circle at 15% 50%, rgba(255,110,0,.36), transparent 50%), radial-gradient(circle at 90% 100%, rgba(255,140,30,.18), transparent 45%), linear-gradient(135deg, rgba(255,255,255,.05), transparent 55%)',
          }}
        />

        {/* Top metallic highlight */}
        <div
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, transparent, rgba(255,180,100,.9), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent)',
          }}
        />

        {/* Moving cinematic sheen */}
        {isActive && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="quality-sheen absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-orange-200/25 to-transparent -skew-x-12" />
          </div>
        )}

        {/* Card content */}
        <div className="relative z-20 p-6 md:p-7">
          <div
            className={`
              flex items-start gap-5
              ${leftSide ? 'lg:flex-row-reverse lg:text-right' : ''}
            `}
          >
            {/* Icon */}
            <div
              className={`
                relative
                shrink-0
                w-[68px]
                h-[68px]
                rounded-2xl
                flex
                items-center
                justify-center
                border
                bg-[#0e0f10]
                transition-all
                duration-700
                ${
                  isActive
                    ? 'border-orange-400 shadow-[0_0_30px_rgba(255,120,0,.75),inset_0_0_20px_rgba(255,120,0,.3)] bg-[#1a0d05]'
                    : 'border-white/10'
                }
              `}
            >
              {isActive && (
                <div className="absolute inset-[-5px] rounded-2xl border border-orange-500/20 animate-border-pulse" />
              )}

              <div
                className={`
                  transition-transform
                  duration-700
                  ${
                    isActive
                      ? 'scale-110 rotate-[3deg]'
                      : 'scale-100'
                  }
                `}
              >
                <Icon active={isActive} />
              </div>
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div
                className={`
                  flex items-center gap-2 mb-2
                  ${leftSide ? 'lg:justify-end' : ''}
                `}
              >
                <span
                  className={`
                    font-mono text-[10px] tracking-[.25em]
                    ${
                      isActive
                        ? 'text-orange-300'
                        : 'text-orange-500/60'
                    }
                  `}
                >
                  CHECKPOINT {stage.id}
                </span>

                <span
                  className={`
                    h-px transition-all duration-700
                    ${
                      isActive
                        ? 'w-10 bg-orange-400'
                        : 'w-5 bg-orange-500/30'
                    }
                  `}
                />
              </div>

              <h3
                className={`
                  text-lg md:text-xl
                  font-semibold
                  leading-tight
                  mb-2
                  transition-colors duration-500
                  ${
                    isActive
                      ? 'text-orange-100'
                      : 'text-white'
                  }
                `}
                style={{
                  textShadow: isActive
                    ? '0 0 18px rgba(255,140,40,.85), 0 0 40px rgba(255,110,0,.5)'
                    : 'none',
                }}
              >
                {stage.title}
              </h3>

              <p
                className={`text-sm leading-6 transition-colors duration-700 ${
                  isActive ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {stage.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom status line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03]">
          <div
            className={`
              h-full
              transition-all
              duration-[1200ms]
              ${
                isActive
                  ? 'w-full bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_16px_3px_rgba(255,120,0,.9)]'
                  : isPast
                  ? 'w-1/3 bg-orange-700/30'
                  : 'w-0'
              }
            `}
          />
        </div>
      </article>
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

const Quality = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);
  const nodeRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [started, setStarted] = useState(false);

  /*
    Scroll-driven sequence:
    cards fade in once, then each checkpoint lights up
    as the reader scrolls it to the middle of the screen.
  */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      gsap.set(cards, {
        opacity: 0,
        y: 35,
        rotateX: 4,
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
        onComplete: () => setStarted(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ==========================================================
     SCROLL-DRIVEN CHECKPOINTS
     One checkpoint glows at a time, driven by scroll position
     (not by a timer). Scroll down: next one lights up.
     Scroll up: previous one lights up again.
     ========================================================== */

  const prevActiveRef = useRef(-1);

  useEffect(() => {
    if (!started) return;

    let raf = 0;

    const update = () => {
      raf = 0;

      // The "trigger line" sits a little below the middle of the screen.
      const line = window.innerHeight * 0.55;
      let next = -1;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        // a card becomes active once its upper part crosses the line
        if (rect.top + rect.height * 0.3 <= line) next = i;
      });

      setActiveIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [started]);

  /* Lift the newly active card, settle the previous one */

  useEffect(() => {
    if (!started) return;

    const prev = prevActiveRef.current;
    prevActiveRef.current = activeIndex;

    if (prev >= 0 && prev !== activeIndex && cardRefs.current[prev]) {
      gsap.to(cardRefs.current[prev], {
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    const card = cardRefs.current[activeIndex];
    if (!card) return;

    gsap
      .timeline()
      .to(card, {
        y: -8,
        rotateY: activeIndex % 2 === 0 ? -1.5 : 1.5,
        scale: 1.015,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      .to(card, {
        y: -3,
        rotateY: 0,
        scale: 1.005,
        duration: 0.9,
        ease: 'power2.out',
      });
  }, [activeIndex, started]);

  /* ==========================================================
     CENTER ENERGY BEAM
     ========================================================== */

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      const energy = timeline.querySelector('.quality-energy');
      const streak = timeline.querySelector('.quality-streak');

      if (!energy || !streak) return;

      gsap.fromTo(
        energy,
        {
          opacity: 0.2,
          scaleY: 0.3,
        },
        {
          opacity: 1,
          scaleY: 1,
          duration: 2.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        }
      );

      gsap.fromTo(
        streak,
        {
          yPercent: -120,
          opacity: 0,
        },
        {
          yPercent: 120,
          opacity: 1,
          duration: 3.5,
          ease: 'power1.inOut',
          repeat: -1,
        }
      );
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      <style>{`
        /* ======================================================
           CINEMATIC KEYFRAMES
           ====================================================== */

        @keyframes quality-particle {
          0%, 100% {
            transform: translate3d(0, 12px, 0);
            opacity: .02;
          }

          50% {
            transform: translate3d(0, -25px, 0);
            opacity: .28;
          }
        }

        @keyframes quality-sheen {
          0% {
            transform: translateX(-180%) skewX(-12deg);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          100% {
            transform: translateX(420%) skewX(-12deg);
            opacity: 0;
          }
        }

        @keyframes quality-border-pulse {
          0%, 100% {
            opacity: .15;
            transform: scale(1);
          }

          50% {
            opacity: .7;
            transform: scale(1.04);
          }
        }

        @keyframes quality-beam-left {
          0% {
            transform: translateX(70px);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          100% {
            transform: translateX(-70px);
            opacity: 0;
          }
        }

        @keyframes quality-beam-right {
          0% {
            transform: translateX(-70px);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          100% {
            transform: translateX(70px);
            opacity: 0;
          }
        }

        .quality-sheen {
          animation: quality-sheen 1.35s cubic-bezier(.2,.7,.2,1);
        }

        .animate-border-pulse {
          animation: quality-border-pulse 1.4s ease-in-out infinite;
        }

        .animate-beam-left {
          animation: quality-beam-left .7s ease-out forwards;
        }

        .animate-beam-right {
          animation: quality-beam-right .7s ease-out forwards;
        }

        .quality-stage {
          perspective: 1400px;
        }

        .quality-card {
          transform-style: preserve-3d;
          will-change: transform, opacity;
          box-shadow:
            0 25px 70px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.025);
        }

        .quality-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.035),
              transparent 25%,
              transparent 70%,
              rgba(255,110,0,.025)
            );
        }

        .quality-node {
          box-shadow:
            0 0 0 1px rgba(255,110,0,.05),
            0 0 20px rgba(255,100,0,.2);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative pt-36 pb-24 px-6 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 top-20 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[150px]"
            style={{
              background:
                'radial-gradient(circle, rgba(255,100,0,.10), transparent 65%)',
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-orange-500" />

              <span className="text-orange-500 font-semibold text-[11px] tracking-[.35em] uppercase">
                Our Standards
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold tracking-[-.04em] leading-[.9]">
              Quality
              <span className="block text-white/20">
                engineered in.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-gray-500 text-base md:text-lg leading-8">
              Rigorous inspection and quality assurance at every stage —
              from concept through delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          CINEMATIC TIMELINE
      ======================================================== */}

      <section
        ref={timelineRef}
        className="relative py-28 px-6 lg:px-12 bg-[#080909] overflow-hidden"
      >
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[180px]"
            style={{
              background:
                'radial-gradient(circle, rgba(255,90,0,.075), transparent 65%)',
            }}
          />

          <div
            className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[160px]"
            style={{
              background:
                'radial-gradient(circle, rgba(255,80,0,.035), transparent 65%)',
            }}
          />
        </div>

        {/* Fine technical grid */}
        <div
          className="absolute inset-0 opacity-[.035] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)
            `,
            backgroundSize: '70px 70px',
            maskImage:
              'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          }}
        />

        <ParticleField />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(255,130,0,.8)]" />

              <span className="text-orange-500 text-xs font-semibold tracking-[.3em] uppercase">
                Manufacturing Intelligence
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              Nine checkpoints.
              <span className="block text-orange-500">
                One uncompromising standard.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl mx-auto text-gray-500 leading-7">
              Quality inspection is integrated throughout the manufacturing
              process — not only at final dispatch.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* ==================================================
                CENTRAL SPINE
                ================================================== */}

            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
              {/* dark spine */}
              <div className="absolute inset-0 bg-white/[.07]" />

              {/* soft glow */}
              <div
                className="absolute -inset-2 blur-md"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(255,100,0,.15), transparent)',
                }}
              />

              {/* energy */}
              <div
                className="quality-energy absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] origin-top"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(255,100,0,.9), rgba(255,180,70,.35), transparent)',
                  boxShadow: '0 0 14px rgba(255,100,0,.55)',
                }}
              />

              {/* travelling vertical streak */}
              <div className="quality-streak absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-[180px] rounded-full blur-[2px] bg-gradient-to-b from-transparent via-orange-300 to-transparent" />
            </div>

            {/* Stage list */}
            <div className="relative flex flex-col gap-10 lg:gap-16">
              {qualityStages.map((stage, index) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  index={index}
                  align={index % 2 === 0 ? 'right' : 'left'}
                  isActive={index === activeIndex}
                  isPast={index < activeIndex}
                  registerCard={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  registerNode={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
          </div>

          {/* ====================================================
              END MESSAGE
              ==================================================== */}

          <div className="relative mt-28 pt-12 border-t border-white/[.06] text-center">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_18px_5px_rgba(255,110,0,.35)]" />
            </div>

            <p className="text-gray-500 text-sm md:text-base leading-7 max-w-2xl mx-auto">
              From the moment material arrives to the moment it leaves our
              dock, every stage is checked, recorded, and verified.
            </p>

            <div className="mt-4 text-orange-500 text-xs tracking-[.25em] uppercase font-semibold">
              Built in. Not bolted on.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quality;