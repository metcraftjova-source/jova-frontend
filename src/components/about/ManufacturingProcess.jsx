import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import CpuSVG from './AnimatedSVG/CpuSVG';
import LayersSVG from './AnimatedSVG/LayersSVG';
import FactorySVG from './AnimatedSVG/FactorySVG';
import ShieldSVG from './AnimatedSVG/ShieldSVG';
import TruckSVG from './AnimatedSVG/TruckSVG';

/* ============================================================
   BRAND
   Change the product name here and it updates everywhere
   (copy, poster letters, film titles).
   ============================================================ */

const BRAND = 'TEHTER';

/* ============================================================
   SMALL HELPERS
   ============================================================ */

const getReduced = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function useReducedMotion() {
  const [reduced, setReduced] = useState(getReduced);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

/* ============================================================
   PROCESS STEPS
   ============================================================ */

const processSteps = [
  { id: '01', title: 'Suppliers', description: 'Verified raw material is received from approved suppliers.', IconComponent: LayersSVG },
  { id: '02', title: 'Store', description: 'Material is checked, stored and prepared for production.', IconComponent: FactorySVG },
  { id: '03', title: 'Cutting', description: `${BRAND} prepares the cutting data automatically, with less waste.`, IconComponent: CpuSVG },
  { id: '04', title: 'Transport', description: 'Cut components are transferred safely to assembly.', IconComponent: TruckSVG },
  { id: '05', title: 'Assembly / Welding', description: 'Components are positioned, assembled and welded.', IconComponent: FactorySVG },
  { id: '06', title: 'QC Inspection', description: 'The completed assembly is inspected before finishing.', IconComponent: ShieldSVG },
  { id: '07', title: 'Painting', description: 'The approved assembly receives its specified coating.', IconComponent: LayersSVG },
  { id: '08', title: 'Loading', description: 'Finished and verified products are loaded for dispatch.', IconComponent: TruckSVG },
  { id: '09', title: 'Delivery', description: 'The completed job leaves the facility for delivery.', IconComponent: TruckSVG },
];

/* ============================================================
   PROCESS CARD
   ============================================================ */

function ProcessStepCard({ step, reducedMotion }) {
  const [isHovered, setIsHovered] = useState(false);
  const SvgComponent = step.IconComponent;

  return (
    <div
      className="min-w-[170px] flex-1 flex flex-col items-center text-center group snap-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="mb-8 relative">
        <div className="w-24 h-24 xl:w-28 xl:h-28 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl border-t border-gray-700 shadow-2xl flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-14 h-14 relative z-20 pointer-events-none">
            <SvgComponent isHovered={isHovered} reducedMotion={reducedMotion} />
          </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-orange-500/25 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="w-11 h-11 rounded-full bg-[#111] border-2 border-gray-800 text-orange-500 font-bold flex items-center justify-center mb-5 relative z-10 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors duration-300 shadow-[0_0_15px_rgba(249,115,22,0)] group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]">
        {step.id}
      </div>

      <h3 className="text-white font-bold text-base xl:text-lg mb-2 px-2 group-hover:text-orange-400 transition-colors">
        {step.title}
      </h3>

      <p className="text-gray-400 text-xs xl:text-sm leading-relaxed px-2 max-w-[220px]">
        {step.description}
      </p>
    </div>
  );
}

/* ============================================================
   ARROW
   ============================================================ */

function StepArrow({ index = 0 }) {
  return (
    <div className="flex items-start justify-center pt-12 shrink-0" aria-hidden="true">
      <svg
        width="26"
        height="18"
        viewBox="0 0 32 20"
        fill="none"
        className="text-orange-500/70 animate-arrow-flow"
        style={{ animationDelay: `${index * 0.18}s` }}
      >
        <path d="M1 10 H24 M17 3 L26 10 L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */

export default function ManufacturingProcess() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#111315] py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1650px] mx-auto">
        <div className="text-center mb-20 relative z-10">
          <h4 className="text-orange-500 font-semibold tracking-wider text-sm uppercase mb-3">
            OUR MANUFACTURING PROCESS
          </h4>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            From Concept to <span className="text-orange-500">Completion</span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Every stage runs through{' '}
            <span className="text-orange-500 font-semibold">{BRAND}</span>, your whole shop floor
            in one place. See every part, order and document in one system.
          </p>
        </div>

        <div className="relative w-full">
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }

            @keyframes arrow-flow {
              0%, 100% { transform: translateX(0); opacity: 0.6; }
              50% { transform: translateX(6px); opacity: 1; }
            }

            .animate-arrow-flow { animation: arrow-flow 1.4s ease-in-out infinite; }

            @media (prefers-reduced-motion: reduce) {
              .animate-arrow-flow { animation: none; }
            }
          `}</style>

          {/* pt-6 keeps the hover lift / glow from being clipped by the scroll container */}
          <div
            className="flex flex-nowrap items-start overflow-x-auto pt-6 pb-12 snap-x hide-scrollbar relative z-10 gap-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {processSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <ProcessStepCard step={step} reducedMotion={reducedMotion} />
                {index < processSteps.length - 1 && <StepArrow index={index} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <TEHTERShowcase />
      </div>
    </section>
  );
}

/* ============================================================
   TEHTER CONTENT
   ============================================================ */

const tehterPoints = [
  {
    label: 'One system',
    text: `${BRAND} brings production, quality, dispatch, purchasing and quotes into one place, so you stop chasing paperwork.`,
  },
  {
    label: 'Instant part lookup',
    text: 'Find any part and see its status, drawings and history in seconds.',
  },
  {
    label: 'Cutting preparation',
    text: 'Cutting programs are prepared automatically, which means less programming time and less wasted material.',
  },
  {
    label: 'Live production view',
    text: 'See what is in progress, what is inspected and what is ready to ship, without asking around.',
  },
  {
    label: 'Documents ready to print',
    text: 'Quality reports, dispatch requests, delivery challans and packing lists are generated for you.',
  },
  {
    label: 'Quotes, purchasing, overview',
    text: 'Quotations and purchasing are prepared and tracked in the same system, and management gets a clear picture of the business.',
  },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/\\';

const labelFor = (index) =>
  `${String(index + 1).padStart(2, '0')} / ${String(tehterPoints.length).padStart(2, '0')} — ${tehterPoints[index].label}`;

/* ============================================================
   TEHTER SHOWCASE
   ============================================================ */

function TEHTERShowcase() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const isAnimating = useRef(false);
  const tlRef = useRef(null);
  const textRef = useRef(null);
  const labelRef = useRef(null);
  const scanRef = useRef(null);

  const isLast = activeIndex === tehterPoints.length - 1;

  // Stop any running animation if the section unmounts mid-scramble.
  useEffect(
    () => () => {
      tlRef.current?.kill();
      isAnimating.current = false;
    },
    []
  );

  const goTo = (nextIndex) => {
    if (isAnimating.current || nextIndex === activeIndex) return;

    const finalText = tehterPoints[nextIndex].text;
    const finalLabel = labelFor(nextIndex);

    if (reducedMotion) {
      setActiveIndex(nextIndex);
      return;
    }

    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setActiveIndex(nextIndex);
      },
    });
    tlRef.current = tl;

    tl.to(labelRef.current, { opacity: 0, y: -6, duration: 0.15, ease: 'power2.in' });
    tl.set(scanRef.current, { opacity: 1, x: '-100%' });
    tl.to(scanRef.current, { x: '400%', duration: 0.7, ease: 'power1.inOut' }, '<');
    tl.set(scanRef.current, { opacity: 0 }, '>-0.05');

    tl.call(
      () => {
        if (labelRef.current) labelRef.current.textContent = finalLabel;
      },
      null,
      '-=0.55'
    );

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '<');

    tl.to(
      {},
      {
        duration: 2,
        ease: 'none',
        onUpdate() {
          const revealCount = Math.floor(this.progress() * finalText.length);
          let out = '';
          for (let i = 0; i < finalText.length; i++) {
            if (i < revealCount || finalText[i] === ' ') {
              out += finalText[i];
            } else {
              out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
          }
          if (textRef.current) textRef.current.textContent = out;
        },
        onComplete() {
          if (textRef.current) textRef.current.textContent = finalText;
        },
      },
      '-=0.5'
    );
  };

  const handleNext = () => goTo((activeIndex + 1) % tehterPoints.length);

  return (
    <div className="mt-28 pt-16 border-t border-white/5 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Meet <span className="text-orange-500">{BRAND}</span>
        </h2>

        <p className="text-orange-500 font-semibold tracking-wider text-xs uppercase mt-3 mb-4">
          Your Whole Shop Floor In One Place
        </p>

        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Stop chasing paperwork. See every part, order and document in one system.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-8">
          {tehterPoints.map((point, i) => (
            <button
              key={point.label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1}: ${point.label}`}
              aria-current={i === activeIndex}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === activeIndex ? 'w-8 bg-orange-500' : 'w-1.5 bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="relative w-full min-h-[220px] flex flex-col items-center justify-center px-4 py-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-orange-500/40" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-orange-500/40" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-orange-500/40" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-orange-500/40" />

          <div
            ref={scanRef}
            className="absolute inset-y-0 left-0 w-24 pointer-events-none opacity-0"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(249,115,22,0.35), rgba(249,115,22,0.9), rgba(249,115,22,0.35), transparent)',
              filter: 'blur(1px)',
            }}
          />

          {/* Single string children on purpose: GSAP rewrites textContent while
              animating, and React must be able to reconcile it afterwards. */}
          <span
            ref={labelRef}
            className="text-orange-500 font-mono text-xs tracking-widest uppercase mb-4"
          >
            {labelFor(activeIndex)}
          </span>

          <p
            ref={textRef}
            aria-live="polite"
            className="text-white text-lg md:text-2xl font-medium leading-relaxed max-w-2xl"
          >
            {tehterPoints[activeIndex].text}
          </p>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label={isLast ? 'Restart' : 'Next'}
          className="mt-10 w-16 h-16 rounded-full bg-[#111] border-2 border-orange-500/40 hover:border-orange-500 flex items-center justify-center group transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] cursor-pointer"
        >
          {isLast ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-orange-500 group-hover:rotate-180 transition-transform duration-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-orange-500 group-hover:translate-x-1 transition-transform duration-300"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>

      <FabricationFilm />
    </div>
  );
}

/* ============================================================
   FILM HELPERS
   ============================================================ */

const POSTER_COLORS = ['#22d3ee', '#c084fc', '#f97316', '#34d399', '#fbbf24', '#38bdf8', '#f472b6'];
const POSTER_LETTERS = [...BRAND].map((letter, i) => [letter, POSTER_COLORS[i % POSTER_COLORS.length]]);

class FilmBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(err) {
    console.error(`${BRAND} film error:`, err);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black z-20">
        <p className="text-sm">The 3D film could not start on this device.</p>
        <button
          type="button"
          onClick={this.props.onReset}
          className="px-5 py-2 rounded-lg bg-orange-500 text-black font-bold text-sm"
        >
          Back
        </button>
      </div>
    );
  }
}

/* ============================================================
   FABRICATION FILM (UI shell)
   ============================================================ */

function FabricationFilm() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const cvRef = useRef(null);
  const autoStarted = useRef(false);

  // Shared, mutable playback clock. The 3D scene reads and writes it every frame.
  const clock = useRef({ t: 0, playing: false, snap: false }).current;

  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hud, setHud] = useState({ t: 0, playing: false });

  /* ---------- fullscreen state ---------- */
  useEffect(() => {
    const onFs = () =>
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));

    document.addEventListener('fullscreenchange', onFs);
    document.addEventListener('webkitfullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      document.removeEventListener('webkitfullscreenchange', onFs);
    };
  }, []);

  /* ---------- pause offscreen, auto-start once when mostly in view ---------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);

        if (entry.intersectionRatio >= 0.35 && !autoStarted.current && !reducedMotion) {
          autoStarted.current = true;
          clock.t = 0;
          clock.snap = true;
          clock.playing = true;
          setStarted(true);
        }
      },
      { threshold: [0.05, 0.35] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [clock, reducedMotion]);

  /* ---------- HUD sync ---------- */
  useEffect(() => {
    if (!started) return undefined;
    const id = setInterval(() => setHud({ t: clock.t, playing: clock.playing }), 80);
    return () => clearInterval(id);
  }, [started, clock]);

  const syncHud = () => setHud({ t: clock.t, playing: clock.playing });

  const start = () => {
    clock.t = 0;
    clock.snap = true;
    clock.playing = true;
    syncHud();
    setStarted(true);
  };

  const reset = () => {
    clock.playing = false;
    clock.t = 0;
    clock.snap = true;
    setHud({ t: 0, playing: false });
    setStarted(false);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    const request = el.requestFullscreen || el.webkitRequestFullscreen;
    const exit = document.exitFullscreen || document.webkitExitFullscreen;

    try {
      // Safari's older API returns undefined instead of a promise.
      const result = fsEl ? exit?.call(document) : request?.call(el);
      result?.catch?.((err) => console.error('Fullscreen error:', err));
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  const ch = CHAPTERS.find((c) => hud.t >= c[0] && hud.t < c[1]) || CHAPTERS[CHAPTERS.length - 1];
  const ci = CHAPTERS.indexOf(ch);

  /* ---------- per-chapter camera "hit" ---------- */
  useEffect(() => {
    const el = cvRef.current;
    if (!el || reducedMotion) return;

    const fx = [
      'tcZoomBlur .9s ease-out',
      'tcWhip .8s ease-out',
      'tcPush .9s ease-out',
      'tcRgb .55s steps(8)',
      'tcZoomBlur 1s ease-out',
      'tcWhip .9s cubic-bezier(.2,.8,.2,1)',
      'tcPush 1s ease-out',
      'tcRgb .65s steps(8)',
      'tcZoomBlur .9s ease-out',
    ];

    el.style.animation = 'none';
    void el.offsetWidth; // restart the animation
    el.style.animation = fx[ci % fx.length];
  }, [ci, started, reducedMotion]);

  /* ---------- workflow HUD ---------- */
  const weldsDone = Math.max(0, Math.min(4, Math.floor((hud.t - WELD_START) / WELD_STEP)));
  let verified = null;

  if (hud.t >= 2.6 && hud.t < 5) verified = 'Purchase order matched to material received';
  else if (hud.t >= 5 && hud.t < 12) verified = 'Part lookup: status, drawings, history';
  else if (hud.t >= 12 && hud.t < 19) verified = 'Cutting prep generated automatically: less waste';
  else if (hud.t >= 19 && hud.t < WELD_START) verified = 'Live view: 4 parts in progress';
  else if (hud.t >= WELD_START && hud.t < 33)
    verified = `Weld log: ${weldsDone} of 4 joints recorded against operator`;
  else if (hud.t >= 33 && hud.t < 36) verified = 'Quality report generated';
  else if (hud.t >= 36 && hud.t < 39) verified = 'Status updated: inspected, now painting';
  else if (hud.t >= 39 && hud.t < 41.8) verified = 'Dispatch request and packing list printed';
  else if (hud.t >= 41.8) verified = 'Delivery challan generated: ready to ship';

  const btn =
    'px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors';

  return (
    <div className="max-w-[1650px] mx-auto mt-20 relative px-4">
      <p
        className="text-center text-orange-400 text-base md:text-lg font-bold tracking-wide mb-2"
        style={{ textShadow: '0 0 18px rgba(249,115,22,0.45)' }}
      >
        Your Whole Shop Floor, Start to Finish.
      </p>

      <p className="text-center text-gray-400 text-xs md:text-sm tracking-wider uppercase mb-8">
        Watch a job run from raw steel to delivery
      </p>

      <div
        ref={containerRef}
        className={`relative w-full mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-black select-none ${
          isFullscreen ? 'h-screen rounded-none border-none' : 'h-[560px] md:h-[720px]'
        }`}
      >
        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play the ${BRAND} fabrication film`}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 cursor-pointer group"
            style={{ background: 'radial-gradient(ellipse at center, #1a1206 0%, #000 70%)' }}
          >
            <div className="flex items-center gap-3 md:gap-5">
              {POSTER_LETTERS.map(([letter, color], i) => (
                <span
                  key={i}
                  className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center font-mono text-xl md:text-4xl font-black transition-transform duration-300 group-hover:-translate-y-2"
                  style={{
                    color,
                    borderColor: color,
                    backgroundColor: `${color}20`,
                    boxShadow: `0 0 28px ${color}88`,
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <span className="px-6 py-3 rounded-full bg-orange-500 text-black font-bold text-sm md:text-base group-hover:bg-orange-400 transition-colors">
              ▶ Play fabrication film
            </span>
          </button>
        )}

        {started && (
          <FilmBoundary onReset={reset}>
            <div ref={cvRef} className="absolute inset-0">
              <Canvas
                shadows
                onCreated={({ gl }) => {
                  gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
                }}
                dpr={[1, 1.75]}
                frameloop={visible ? 'always' : 'never'}
                camera={{ fov: 42, near: 0.1, far: 300, position: [-24, 4, 10] }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
              >
                <Scene clock={clock} />
              </Canvas>
            </div>

            {/* Cinematic bars */}
            <div className="absolute inset-x-0 top-0 h-[6%] bg-black pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black pointer-events-none" />

            {/* Chapter transitions */}
            <div
              key={`transition-${ci}`}
              className={`absolute inset-0 pointer-events-none overflow-hidden z-20 ${
                reducedMotion ? 'hidden' : ''
              }`}
            >
              {ci === 0 && (
                <div
                  className="absolute inset-0 bg-white"
                  style={{ animation: 'tcFlash .6s ease-out forwards' }}
                />
              )}

              {ci === 1 && (
                <div
                  className="absolute inset-y-0 left-0 w-[60%]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #f97316, #fff, #f97316, transparent)',
                    animation: 'tcWipe .8s cubic-bezier(.7,0,.3,1) forwards',
                  }}
                />
              )}

              {ci === 2 && (
                <div
                  className="absolute left-1/2 top-1/2 w-[300%] aspect-square rounded-full"
                  style={{
                    background: 'radial-gradient(circle, transparent 28%, #000 29%)',
                    animation: 'tcIris .9s cubic-bezier(.6,0,.2,1) forwards',
                  }}
                />
              )}

              {ci === 3 && (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, rgba(34,211,238,.35) 0 2px, transparent 2px 6px)',
                    animation: 'tcGlitch .55s steps(6) forwards',
                  }}
                />
              )}

              {ci === 4 &&
                Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 h-full bg-black"
                    style={{
                      left: `${i * 12.5}%`,
                      width: '12.7%',
                      transformOrigin: 'right',
                      animation: `tcBlind .7s ease-in-out ${i * 60}ms forwards`,
                    }}
                  />
                ))}

              {ci === 5 && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ animation: 'tcQcText 1.15s ease-out forwards' }}
                >
                  <div className="text-center px-6">
                    <div
                      className="text-cyan-300 text-xs md:text-sm font-mono tracking-[0.4em] uppercase"
                      style={{ textShadow: '0 0 18px rgba(34,211,238,.8)' }}
                    >
                      {BRAND} QUALITY
                    </div>
                    <div
                      className="text-white text-3xl md:text-5xl font-black tracking-wider mt-3"
                      style={{ textShadow: '0 0 30px rgba(34,211,238,.45)' }}
                    >
                      REPORT READY
                    </div>
                    <div className="text-gray-400 text-sm md:text-base mt-3">
                      Dimensions · Welds · Alignment
                    </div>
                  </div>
                </div>
              )}

              {ci === 6 && (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(249,115,22,.25), transparent 35%, rgba(249,115,22,.35))',
                    animation: 'tcPaint 1.1s ease-out forwards',
                  }}
                />
              )}

              {ci === 7 && (
                <>
                  <div
                    className="absolute inset-y-0 left-0 w-1/2 bg-black"
                    style={{ animation: 'tcSplitL .85s cubic-bezier(.7,0,.2,1) forwards' }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 w-1/2 bg-black"
                    style={{ animation: 'tcSplitR .85s cubic-bezier(.7,0,.2,1) forwards' }}
                  />
                  <div
                    className="absolute inset-y-0 left-1/2 w-0.5 bg-orange-400"
                    style={{ animation: 'tcFlash .85s ease-out forwards', boxShadow: '0 0 20px #f97316' }}
                  />
                </>
              )}

              {ci === 8 && (
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
                  {Array.from({ length: 72 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{ animation: `tcTile .5s ease-out ${((i * 37) % 72) * 9}ms forwards` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Opening title */}
            {hud.t < 2.6 && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 pointer-events-none"
                style={{ opacity: 1 - seg(hud.t, 1.6, 2.6) }}
              >
                <div
                  className="text-white text-5xl md:text-8xl font-black tracking-[0.3em]"
                  style={{ textShadow: '0 0 40px rgba(249,115,22,.8)' }}
                >
                  {BRAND}
                </div>
                <div className="text-orange-400 mt-4 text-base md:text-lg">
                  Stop chasing paperwork. One system for every part and order.
                </div>
              </div>
            )}

            {/* Final title */}
            {hud.t > 44 && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/85 pointer-events-none"
                style={{ opacity: seg(hud.t, 44, 47) }}
              >
                <div
                  className="text-white text-4xl md:text-7xl font-black tracking-[0.3em]"
                  style={{ textShadow: '0 0 40px rgba(249,115,22,.8)' }}
                >
                  {BRAND}
                </div>
                <div className="text-emerald-300 mt-4 text-base md:text-lg">
                  Your whole shop floor in one place
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3 px-6 text-xs md:text-sm text-gray-300 font-mono">
                  <span>One login per department</span>
                  <span>·</span>
                  <span>Every action recorded against a name</span>
                  <span>·</span>
                  <span>Installs like any Windows program</span>
                </div>
              </div>
            )}

            {/* Chapter HUD */}
            <div
              key={ch[2]}
              className="absolute top-[8%] left-6 max-w-md pointer-events-none"
              style={{ animation: 'tcIn .6s ease-out' }}
            >
              <div className="text-orange-400 text-sm font-semibold">
                {ci + 1}/{CHAPTERS.length} · {ch[2]}
              </div>
              <div className="text-white text-xl md:text-3xl font-bold mt-1 leading-snug">{ch[3]}</div>
              <div
                className="h-0.5 bg-orange-500 mt-3 origin-left"
                style={{ animation: 'tcLine .9s ease-out forwards' }}
              />
            </div>

            {/* Workflow HUD */}
            {verified && (
              <div
                className={`absolute top-[22%] right-6 px-4 py-2 rounded-lg border text-sm pointer-events-none ${
                  hud.t >= 33 && hud.t < 36
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
                    : hud.t >= 36 && hud.t < 39
                    ? 'border-orange-400/50 bg-orange-400/10 text-orange-300'
                    : 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                }`}
              >
                {BRAND}: {verified}
              </div>
            )}

            {/* Controls */}
            <div className="absolute top-[7%] right-4 z-30 flex items-center gap-2 bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
              <button type="button" onClick={reset} className={btn}>
                Close film
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs font-mono transition-colors"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>

            {/* Timeline */}
            <div className="absolute bottom-[8%] left-6 right-6 z-30 flex items-center gap-3">
              <button
                type="button"
                className={btn}
                onClick={() => {
                  if (clock.t >= T - 0.05) {
                    clock.t = 0;
                    clock.snap = true;
                    clock.playing = true;
                  } else {
                    clock.playing = !clock.playing;
                  }
                  syncHud();
                }}
              >
                {hud.playing ? 'Pause' : 'Play'}
              </button>

              <button
                type="button"
                className={btn}
                onClick={() => {
                  clock.t = 0;
                  clock.playing = true;
                  clock.snap = true;
                  syncHud();
                }}
              >
                Replay
              </button>

              <input
                type="range"
                min={0}
                max={T}
                step={0.05}
                value={hud.t}
                className="flex-1 accent-orange-500"
                aria-label="Timeline"
                onChange={(e) => {
                  clock.t = +e.target.value;
                  clock.snap = true;
                  syncHud();
                }}
              />
            </div>

            <style>{`
              @keyframes tcIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
              @keyframes tcFlash { from { opacity: .55; } to { opacity: 0; } }
              @keyframes tcWipe { from { transform: translateX(-120%) skewX(-12deg); } to { transform: translateX(280%) skewX(-12deg); } }
              @keyframes tcIris { from { transform: translate(-50%,-50%) scale(.05); } to { transform: translate(-50%,-50%) scale(1); } }
              @keyframes tcGlitch {
                0% { opacity: .9; transform: translateX(-10px); }
                30% { opacity: 0; }
                50% { opacity: .7; transform: translateX(8px); }
                100% { opacity: 0; }
              }
              @keyframes tcZoomBlur { from { transform: scale(1.28); filter: blur(12px) brightness(2); } to { transform: scale(1); filter: none; } }
              @keyframes tcWhip { from { transform: translateX(-7%) skewX(-8deg); filter: blur(16px); } to { transform: none; filter: none; } }
              @keyframes tcPush { from { transform: scale(.86) rotate(-1.5deg); filter: blur(8px) brightness(.4); } to { transform: none; filter: none; } }
              @keyframes tcRgb {
                0% { filter: hue-rotate(70deg) saturate(2.4) contrast(1.5); transform: translateX(-14px); }
                40% { filter: hue-rotate(-60deg) saturate(2) contrast(1.4); transform: translateX(12px); }
                100% { filter: none; transform: none; }
              }
              @keyframes tcBlind { from { transform: scaleX(1); } to { transform: scaleX(0); } }
              @keyframes tcSplitL { from { transform: translateX(0); } to { transform: translateX(-100%); } }
              @keyframes tcSplitR { from { transform: translateX(0); } to { transform: translateX(100%); } }
              @keyframes tcTile { from { opacity: 1; } to { opacity: 0; } }
              @keyframes tcLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
              @keyframes tcPaint {
                from { opacity: 0; transform: translateX(-15%) scale(1.05); }
                35% { opacity: .8; }
                to { opacity: 0; transform: translateX(15%) scale(1); }
              }
              @keyframes tcQcText {
                0% { opacity: 0; transform: scale(1.12); filter: blur(12px); }
                30% { opacity: 1; transform: scale(1); filter: blur(0); }
                70% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(.98); filter: blur(4px); }
              }
            `}</style>
          </FilmBoundary>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   TIMELINE MATH
   ============================================================ */

const T = 47;

const cl = (x) => Math.min(1, Math.max(0, x));

const sm = (x) => {
  const k = cl(x);
  return k * k * (3 - 2 * k);
};

const seg = (t, a, b) => sm((t - a) / (b - a));
const mix = (a, b, k) => a + (b - a) * k;
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

/** Smooth piecewise value: eases between consecutive [time, value] keys. */
const track = (t, keys) => {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1];
      const [t1, v1] = keys[i];
      return mix(v0, v1, sm((t - t0) / (t1 - t0)));
    }
  }
  return keys[keys.length - 1][1];
};

/* ============================================================
   LAYOUT CONSTANTS  (metres, roughly)
   ============================================================ */

const CART_Y = 1.13; // rod centre while resting on the cart deck
const BAR_H = 0.16; // steel bar cross-section
const TOP = CART_Y + BAR_H / 2; // top face of the bar on the cart
const SLING = 0.45; // hook height above the load's centre

const REST = V(-16, 0.65, -3); // top bar on the supplier rack
const JIG = V(10, 0.9, -4); // frame centre while sitting in the assembly jig

const PIECE_LEN = [2.4, 2.4, 1.6, 1.6];
const PIECE_C = [-2.8, -0.4, 1.6, 3.2]; // offsets along the uncut bar
const STOPS = [-1.6, 0.8, 2.4]; // laser cut positions along the bar

// [dx, dy, dz, rotY] of each piece inside the finished frame.
// The short members sit 6 mm lower so their top face never z-fights the long ones.
const JIG_REL = [
  [0, 0, -0.8, 0],
  [0, 0, 0.8, 0],
  [-1.2, -0.006, 0, Math.PI / 2],
  [1.2, -0.006, 0, Math.PI / 2],
];

const WELD_POINTS = [
  [-1.2, -0.8],
  [1.2, -0.8],
  [1.2, 0.8],
  [-1.2, 0.8],
];

const WELD_START = 29.8;
const WELD_STEP = 0.8;
const WELD_BEAD = { w: 0.24, h: 0.025, d: 0.075 };

/* ============================================================
   OVERHEAD BRIDGE CRANE
   One crane does the whole job: rack → cart, cart → jig, jig → truck.
   Every load hangs from the hook, so nothing floats.
   ============================================================ */

const CRANE_X = [[0, -16], [3.3, -16], [4.5, -14], [6.4, -14], [9, -16], [18, -16], [22.5, 10], [26.2, 10], [38.5, 10], [39.5, 10], [41.0, 17.5], [47, 17.5]];
const CRANE_Z = [[0, -3], [3.3, -3], [4.5, 0], [6.4, 0], [9, -3], [18, -3], [22.5, 0], [26.2, 0], [27.6, -4], [39.5, -4], [41.0, 4], [47, 4]];
const CRANE_HY = [
  [0, 4.2], [1.6, 1.1], [2.1, 1.1], [3.3, 3.4], [3.6, 3.4], [4.6, 1.58], [5.2, 1.58], [6.4, 4.2],
  [22.5, 4.2], [24.8, 1.58], [25.2, 1.58], [26.2, 3.4], [27.7, 3.4], [28.6, 1.35], [29.0, 1.35], [30.0, 4.2],
  [37.3, 4.2], [38.5, 1.35], [39.0, 1.35], [39.9, 3.9], [40.5, 3.9], [41.6, 1.62], [42.0, 1.62], [43.0, 4.2], [47, 4.2],
];

const craneX = (t) => track(t, CRANE_X);
const craneZ = (t) => track(t, CRANE_Z);
const craneHY = (t) => track(t, CRANE_HY);

const ROD_ATTACHED = (t) => t >= 2.1 && t < 5.0;
const BUNDLE_ATTACHED = (t) => t >= 25.0 && t < 28.8;
const FRAME_ATTACHED = (t) => t >= 38.9 && t < 41.8;
const isAttached = (t) => ROD_ATTACHED(t) || BUNDLE_ATTACHED(t) || FRAME_ATTACHED(t);

const underHook = (t) => V(craneX(t), craneHY(t) - SLING, craneZ(t));

/* ============================================================
   POSITIONS
   ============================================================ */

const cartX = (t) => -14 + 14 * seg(t, 5, 12) + 10 * seg(t, 19, 24);

const TRUCK_DEPART = 42.4;

const truckPos = (t) => {
  const d = Math.max(0, t - TRUCK_DEPART);
  return V(18 + 1.6 * d * d, 0, 4);
};

const truckTop = (t) => truckPos(t).add(V(-0.5, 1.17, 0));

/** Where the steel (bar → cut pieces → hanging bundle) is centred. */
const stockCenter = (t) => {
  if (t < 2.1) return REST.clone();
  if (t < 5.0) return underHook(t);
  if (t < 25.0) return V(cartX(t), CART_Y, 0);
  return underHook(t);
};

const frameCenter = (t) => {
  if (t < 38.9) return JIG.clone();
  if (t < 41.8) return underHook(t);
  return truckTop(t);
};

const subject = (t) => (t < 29 ? stockCenter(t) : frameCenter(t));

/* ============================================================
   CUTTING
   ============================================================ */

const cutDone = (t, k) => seg(t, 14.2 + 2 * k, 14.8 + 2 * k);

const plunge = (t) => {
  let p = 0;
  for (let k = 0; k < 3; k++) {
    p = Math.max(p, sm((t - 13.2 - 2 * k) / 0.3) * (1 - sm((t - 14.4 - 2 * k) / 0.3)));
  }
  return p;
};

const gantryX = (t) => {
  let x = mix(-8, STOPS[0], seg(t, 12, 13.2));
  for (let k = 0; k < 2; k++) {
    x += (STOPS[k + 1] - STOPS[k]) * seg(t, 14.7 + 2 * k, 15.2 + 2 * k);
  }
  // Park back at the start so it never blocks the crane path to the jig.
  return x + (-8 - STOPS[2]) * seg(t, 18.4, 19.6);
};

/** Gap that opens between pieces as each cut finishes. */
const sepOffset = (t, i) => {
  let d = 0;
  for (let k = 0; k < i; k++) d += 0.15 * cutDone(t, k);
  const total = cutDone(t, 0) + cutDone(t, 1) + cutDone(t, 2);
  return d - 0.075 * total;
};

/* ============================================================
   PIECE POSE
   ============================================================ */

const piecePose = (t, i) => {
  const sep = sepOffset(t, i);
  const j = JIG_REL[i];

  if (t < 25.0) {
    const c = stockCenter(t);
    return { p: V(c.x + PIECE_C[i] + sep, c.y, c.z), r: 0 };
  }

  if (t < 28.8) {
    // Hanging from the hook, then spreading into the frame layout as it lowers.
    const c = stockCenter(t);
    const k = seg(t, 27.7, 28.6);
    return {
      p: V(c.x + mix(PIECE_C[i] + sep, j[0], k), c.y + mix(0, j[1], k), c.z + mix(0, j[2], k)),
      r: mix(0, j[3], k),
    };
  }

  const f = frameCenter(t);
  return { p: V(f.x + j[0], f.y + j[1], f.z + j[2]), r: j[3] };
};

/* ============================================================
   PAINT
   ============================================================ */

const PAINT_SPAN = [[-1.5, 1.5], [-1.5, 1.5], [-1.58, -0.82], [0.82, 1.58]];
const paintSweep = (t) => mix(-2.6, 2.6, seg(t, 36, 39)); // gun x relative to the frame
const paintAmt = (t, i) => sm((paintSweep(t) - PAINT_SPAN[i][0]) / (PAINT_SPAN[i][1] - PAINT_SPAN[i][0]));

/* ============================================================
   CAMERA SHOTS  [start, end, from, to, look-at, look-follow, relative-to-subject]
   ============================================================ */

const SHOTS = [
  [0, 5, V(-24, 4, 10), V(-19, 2.6, 4), V(-16, 1.6, -2), 0.25, false],
  [5, 12, V(-6, 2, 8), V(6, 3.5, 7), V(0, 0, 0), 1, true],
  [12, 19, V(3, 1.5, 4), V(-1, 1, 3.2), V(0, 0, 0), 1, true],
  [19, 24, V(-4, 3, 7), V(4, 5, 8), V(0, 0, 0), 1, true],
  [24, 33, V(7, 5, 5), V(-7, 3.5, 5), V(0, 0, 0), 1, true],
  [33, 36, V(6, 4.5, 8), V(9, 2.5, -4), V(0, 0, 0), 1, true],
  [36, 39, V(4, 3, 8), V(11, 4, 7), V(0, 0, 0), 1, true],
  [39, 41, V(12, 4, 9), V(18, 3.5, 7), V(0, 0, 0), 1, true],
  [41, 47, V(-9, 2, 7), V(-16, 6, 10), V(0, 0, 0), 1, true],
];

/* ============================================================
   CHAPTERS
   ============================================================ */

const CHAPTERS = [
  [0, 5, 'Suppliers', 'A bridge crane lifts the ordered steel, matched to its purchase order.'],
  [5, 12, 'Store', 'Look up any part instantly while the cart carries stock to the laser cell.'],
  [12, 19, 'Production · Cutting', 'Cutting is prepared automatically, so there is less programming and less waste.'],
  [19, 24, 'Production · Transport', 'Cut pieces ride the cart to assembly, visible in the live production view.'],
  [24, 33, 'Production · Assembly / Welding', 'A robot welds each corner, and every action is recorded against a name.'],
  [33, 36, 'Production · QC Inspection', 'The assembly is inspected and the quality report is generated.'],
  [36, 39, 'Production · Painting', 'The inspected frame is painted and its status updates automatically.'],
  [39, 41, 'Delivery · Loading', 'The finished frame is loaded, and the dispatch request and packing list are printed.'],
  [41, 47, 'Delivery · Dispatch', 'The delivery challan is ready and the job leaves the facility.'],
];

/* ============================================================
   3D HELPERS
   ============================================================ */

const _up = V(0, 1, 0);
const _dir = V();
const _a = V();
const _b = V();

/** Stretch a unit-height cylinder between two points. */
const limb = (mesh, a, b) => {
  if (!mesh) return;
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.scale.set(1, a.distanceTo(b), 1);
  mesh.quaternion.setFromUnitVectors(_up, _dir.copy(b).sub(a).normalize());
};

/** Two-link arm: the elbow point between base B and target P. */
const elbow = (B, P, L) => {
  const dir = _dir.copy(P).sub(B);
  const dist = Math.min(dir.length(), 2 * L - 0.05);
  dir.normalize();
  const h = Math.sqrt(Math.max(0, L * L - (dist / 2) ** 2));
  const up = V(0, 1, 0).addScaledVector(dir, -dir.y).normalize();
  return B.clone().addScaledVector(dir, dist / 2).addScaledVector(up, h);
};

const ARM_BASE = V(JIG.x, 1, JIG.z - 4.6);
const ARM_HOME = V(JIG.x + 1.6, 2.4, JIG.z - 2.0);
const ARM_LINK = 3.3;

const NEON = (c, i = 3) => new THREE.Color(c).multiplyScalar(i);

const STEEL = new THREE.Color('#9aa4b2');
const PAINT = new THREE.Color('#f97316');
const WELD_COLD = new THREE.Color('#4a3f36');
const WELD_HOT = new THREE.Color('#ffa347');

const SH = { castShadow: true, receiveShadow: true };

/* ============================================================
   ENVIRONMENT (reflections for the metal)
   ============================================================ */

function Environment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    let pmrem;
    let envScene;
    let target;

    try {
      pmrem = new THREE.PMREMGenerator(gl);
      envScene = new RoomEnvironment();
      target = pmrem.fromScene(envScene, 0.04);
      scene.environment = target.texture;
      if ('environmentIntensity' in scene) scene.environmentIntensity = 0.45;
    } catch (err) {
      console.warn('Environment map unavailable, continuing without it.', err);
    }

    return () => {
      scene.environment = null;
      target?.dispose();
      pmrem?.dispose();
      envScene?.dispose?.();
    };
  }, [gl, scene]);

  return null;
}

/* ============================================================
   SCENE
   ============================================================ */

function Scene({ clock }) {
  const pieces = useRef([]);
  const poses = useRef([V(), V(), V(), V()]);
  const rots = useRef([0, 0, 0, 0]);

  // crane
  const bridge = useRef();
  const trolley = useRef();
  const cable = useRef();
  const hookGrp = useRef();
  const spreadX = useRef();
  const spreadZ = useRef();
  const slings = useRef([]);
  const pads = useRef([]);

  // cutting cell
  const cart = useRef();
  const gantry = useRef();
  const head = useRef();
  const shaft = useRef();
  const beam = useRef();
  const spot = useRef();
  const kerf = useRef([]);
  const cutLight = useRef();
  const sparks = useRef();

  // welding
  const welds = useRef([]);
  const torch = useRef();
  const arc = useRef();
  const torchLight = useRef();
  const weldSparks = useRef();
  const arm1 = useRef();
  const arm2 = useRef();
  const joints = useRef([]);
  const torchPos = useRef(ARM_HOME.clone());

  // QC
  const portal = useRef();
  const marks = useRef([]);

  // paint
  const gun = useRef();
  const cone = useRef();
  const paintLight = useRef();
  const mist = useRef();

  // delivery
  const truck = useRef();
  const straps = useRef();

  const dust = useRef();
  const lastT = useRef(0);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const look = useMemo(() => V(0, 0, 0), []);

  const dustGeo = useMemo(() => {
    const arr = new Float32Array(450);
    for (let i = 0; i < 450; i++) {
      arr[i] = (Math.random() - 0.5) * (i % 3 === 0 ? 90 : i % 3 === 1 ? 10 : 30);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame(({ camera }, dt) => {
    /* ---------- clock ---------- */
    if (clock.playing) {
      clock.t = Math.min(T, clock.t + Math.min(dt, 0.05));
      if (clock.t >= T) {
        clock.t = T;
        clock.playing = false;
      }
    }

    const t = clock.t;
    const snap = clock.snap || Math.abs(t - lastT.current) > 0.5;
    clock.snap = false;
    lastT.current = t;

    /* ---------- steel pieces + paint ---------- */
    for (let i = 0; i < 4; i++) {
      const m = pieces.current[i];
      if (!m) continue;

      const { p, r } = piecePose(t, i);
      poses.current[i] = p;
      rots.current[i] = r;

      m.position.copy(p);
      m.rotation.y = r;

      const pa = paintAmt(t, i);
      m.material.color.copy(STEEL).lerp(PAINT, pa);
      m.material.metalness = mix(0.85, 0.15, pa);
      m.material.roughness = mix(0.35, 0.5, pa);
    }

    /* ---------- cart ---------- */
    if (cart.current) cart.current.position.x = cartX(t);

    /* ---------- overhead crane ---------- */
    const cx = craneX(t);
    const cz = craneZ(t);
    const hy = craneHY(t);
    const attached = isAttached(t);

    if (bridge.current) bridge.current.position.x = cx;
    if (trolley.current) trolley.current.position.set(cx, 6.0, cz);
    if (hookGrp.current) hookGrp.current.position.set(cx, hy, cz);

    if (cable.current) {
      const top = 5.83;
      const bottom = hy + 0.32;
      cable.current.scale.y = Math.max(0.01, top - bottom);
      cable.current.position.set(cx, (top + bottom) / 2, cz);
    }

    let minX = 1e9;
    let maxX = -1e9;
    let minZ = 1e9;
    let maxZ = -1e9;

    if (attached) {
      for (let i = 0; i < 4; i++) {
        const p = poses.current[i];
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minZ = Math.min(minZ, p.z);
        maxZ = Math.max(maxZ, p.z);
      }
    }

    if (spreadX.current) {
      spreadX.current.position.set(attached ? (minX + maxX) / 2 : cx, hy - 0.03, cz);
      spreadX.current.scale.x = attached ? Math.max(0.6, maxX - minX + 0.5) : 5;
    }

    if (spreadZ.current) {
      const showZ = attached && maxZ - minZ > 0.3;
      spreadZ.current.visible = showZ;
      spreadZ.current.position.set(cx, hy - 0.03, showZ ? (minZ + maxZ) / 2 : cz);
      spreadZ.current.scale.z = showZ ? maxZ - minZ + 0.4 : 0.2;
    }

    for (let i = 0; i < 4; i++) {
      const s = slings.current[i];
      const pd = pads.current[i];
      if (!s || !pd) continue;

      s.visible = attached;
      pd.visible = attached;
      if (!attached) continue;

      const p = poses.current[i];
      limb(s, _a.set(p.x, hy - 0.05, p.z), _b.set(p.x, p.y + 0.115, p.z));
      pd.position.set(p.x, p.y + 0.11, p.z);
      pd.rotation.y = rots.current[i];
    }

    /* ---------- laser cutting ---------- */
    const gx = gantryX(t);
    const pl = plunge(t);

    if (gantry.current) gantry.current.position.x = gx;

    let beamOn = false;
    for (let k = 0; k < 3; k++) {
      if (t > 13.5 + 2 * k && t < 14.4 + 2 * k) beamOn = true;
    }

    const yh = 2.8 - 1.44 * pl;

    if (head.current) {
      head.current.position.set(0, yh, beamOn ? Math.sin(t * 45) * 0.025 : 0);
    }

    if (shaft.current) {
      shaft.current.scale.y = Math.max(0.05, 4.85 - (yh + 1.0));
      shaft.current.position.y = (4.85 + yh + 1.0) / 2;
    }

    const blen = Math.max(0.05, yh - TOP);

    if (beam.current) {
      beam.current.visible = beamOn;
      beam.current.scale.y = blen;
      beam.current.position.y = -blen / 2;
    }

    if (spot.current) {
      spot.current.visible = beamOn;
      spot.current.position.y = -blen;
      spot.current.scale.setScalar(0.8 + Math.random() * 0.6);
    }

    if (cutLight.current) {
      cutLight.current.position.y = -blen + 0.25;
      cutLight.current.intensity = beamOn ? 14 + Math.random() * 14 : 0;
    }

    const barX = cartX(t);

    for (let k = 0; k < 3; k++) {
      const kg = kerf.current[k];
      if (!kg) continue;

      const heat =
        t < 14.4 + 2 * k
          ? seg(t, 13.5 + 2 * k, 14.2 + 2 * k)
          : 1 - seg(t, 14.4 + 2 * k, 17 + 2 * k);

      kg.visible = t > 13.5 + 2 * k && t < 21 && heat > 0.02;
      kg.position.set(barX + STOPS[k], CART_Y, 0);
      kg.material.color.copy(NEON('#ff7a1a', 0.2 + 3 * heat));
    }

    if (sparks.current) {
      for (let j = 0; j < 80; j++) {
        const ph = (t * 2.6 + j * 0.0713) % 1;
        const a = j * 2.399;
        const sp = 0.6 + (j % 5) * 0.35;
        const y = Math.max(0.15, TOP + (j % 3 === 0 ? 1.2 : 0.3) * ph - 2.6 * ph * ph);

        dummy.position.set(gx + Math.cos(a) * ph * sp * 1.3, y, Math.sin(a) * ph * sp * 1.5);
        dummy.scale.setScalar(beamOn ? 0.045 * (1 - ph) : 0);
        dummy.updateMatrix();
        sparks.current.setMatrixAt(j, dummy.matrix);
      }
      sparks.current.instanceMatrix.needsUpdate = true;
    }

    /* ---------- welding ---------- */
    const f = frameCenter(t);
    const wk = (t - WELD_START) / WELD_STEP;
    const active = wk >= 0 && wk < 4 ? Math.floor(wk) : -1;

    WELD_POINTS.forEach((c, k) => {
      const w = welds.current[k];
      if (!w) return;

      const start = WELD_START + k * WELD_STEP;
      const started = t >= start;
      const prog = seg(t, start, start + WELD_STEP);
      const heat = active === k ? 1 : started ? 1 - 0.85 * seg(t, start + WELD_STEP, start + 3.2) : 0;

      w.visible = started;
      w.position.set(f.x + c[0], f.y + BAR_H / 2 + WELD_BEAD.h / 2, f.z + c[1]);
      w.scale.set(0.6 + 0.4 * prog, 1, 0.6 + 0.4 * prog);
      w.material.color.copy(WELD_COLD).lerp(WELD_HOT, heat);
      w.material.emissiveIntensity = 0.1 + 2.2 * heat;
    });

    const torchTarget =
      active >= 0 ? V(f.x + WELD_POINTS[active][0], f.y + 0.11, f.z + WELD_POINTS[active][1]) : ARM_HOME;

    if (snap) torchPos.current.copy(torchTarget);
    else torchPos.current.lerp(torchTarget, 1 - Math.exp(-9 * dt));

    if (torch.current) torch.current.position.copy(torchPos.current);
    if (arc.current) arc.current.visible = active >= 0;
    if (torchLight.current) torchLight.current.intensity = active >= 0 ? 6 + Math.random() * 8 : 0;

    const wrist = torchPos.current.clone().add(V(0, 0.58, 0));
    const elb = elbow(ARM_BASE, wrist, ARM_LINK);

    limb(arm1.current, ARM_BASE, elb);
    limb(arm2.current, elb, wrist);
    if (joints.current[0]) joints.current[0].position.copy(elb);
    if (joints.current[1]) joints.current[1].position.copy(wrist);

    if (weldSparks.current) {
      const tp = torchPos.current;
      for (let j = 0; j < 50; j++) {
        const ph = (t * 3.1 + j * 0.0937) % 1;
        const a = j * 2.399;
        const sp = 0.25 + (j % 4) * 0.12;

        dummy.position.set(
          tp.x + Math.cos(a) * ph * sp,
          Math.max(0.05, tp.y + 0.15 * ph - 1.4 * ph * ph),
          tp.z + Math.sin(a) * ph * sp
        );
        dummy.scale.setScalar(active >= 0 ? 0.03 * (1 - ph) : 0);
        dummy.updateMatrix();
        weldSparks.current.setMatrixAt(j, dummy.matrix);
      }
      weldSparks.current.instanceMatrix.needsUpdate = true;
    }

    /* ---------- QC scan ---------- */
    const scanning = t >= 32.9 && t < 36.2;
    const portalX = f.x + mix(-2.2, 2.2, seg(t, 33.3, 35.3));

    if (portal.current) {
      portal.current.visible = scanning;
      portal.current.position.set(portalX, 0, f.z);
    }

    WELD_POINTS.forEach((c, k) => {
      const mk = marks.current[k];
      if (!mk) return;
      mk.visible = t >= 33 && t < 36.6 && portalX > f.x + c[0];
      mk.position.set(f.x + c[0], f.y + BAR_H / 2 + 0.04, f.z + c[1]);
    });

    /* ---------- painting ---------- */
    const painting = t >= 36 && t < 39;
    const sprayX = JIG.x + paintSweep(t);

    if (gun.current) gun.current.position.x = sprayX;
    if (cone.current) cone.current.visible = painting;
    if (paintLight.current) paintLight.current.intensity = painting ? 8 + Math.sin(t * 18) * 3 : 0;

    if (mist.current) {
      const gunY = 1.75;
      const gunZ = -2.2;

      for (let j = 0; j < 100; j++) {
        const phase = (t * 2.2 + j * 0.043) % 1;
        const angle = j * 2.399;
        const spread = 0.05 + phase * 0.45;

        dummy.position.set(
          sprayX + Math.cos(angle) * spread,
          gunY - phase * 0.75 + Math.sin(angle) * spread * 0.7,
          gunZ - 0.35 - phase * 0.8
        );
        dummy.scale.setScalar(painting ? 0.035 * (1 - phase) : 0);
        dummy.updateMatrix();
        mist.current.setMatrixAt(j, dummy.matrix);
      }
      mist.current.instanceMatrix.needsUpdate = true;
    }

    /* ---------- truck ---------- */
    if (truck.current) truck.current.position.copy(truckPos(t));
    if (straps.current) straps.current.visible = t >= 41.9;

    /* ---------- ambient dust ---------- */
    if (dust.current) {
      dust.current.rotation.y = t * 0.02;
      dust.current.position.y = 6 + Math.sin(t * 0.3);
    }

    /* ---------- camera director ---------- */
    const sh = SHOTS.find((s) => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1];
    const k = sm((t - sh[0]) / (sh[1] - sh[0]));
    const sub = subject(t);

    const pos = sh[2].clone().lerp(sh[3], k);
    if (sh[6]) pos.add(sub);

    const tgt = sh[4].clone().lerp(sub, sh[5]);

    // gentle handheld drift + a short shake at the start of each shot
    pos.x += Math.sin(t * 1.7) * 0.05;
    pos.y += Math.sin(t * 2.3) * 0.04;

    const st = t - sh[0];
    pos.x += Math.sin(t * 70) * 0.18 * (1 - sm(st / 0.5));
    pos.y += Math.cos(t * 63) * 0.12 * (1 - sm(st / 0.5));

    camera.position.lerp(pos, snap ? 1 : 1 - Math.exp(-3.2 * dt));
    look.lerp(tgt, snap ? 1 : 1 - Math.exp(-5 * dt));
    camera.lookAt(look);

    const punch = plunge(t) * 6 + (t > 0.5 ? (1 - sm((t - sh[0]) / 0.8)) * 16 : 0);
    camera.fov = mix(camera.fov, 42 - punch, 0.1);
    camera.updateProjectionMatrix();
  });

  const M = (color, o = {}) => <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} {...o} />;

  const craneColumns = [-22, -9, 3, 16, 24];

  return (
    <>
      <color attach="background" args={['#05070b']} />
      <fog attach="fog" args={['#05070b', 35, 120]} />

      <Environment />

      <hemisphereLight args={['#a9bdd6', '#1a1410', 0.45]} />
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[8, 24, 12]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={24}
        shadow-camera-bottom={-24}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />

      <pointLight position={[0, 6, 2]} color="#7dd3fc" intensity={40} distance={30} />
      <pointLight position={[10, 5, -4]} color="#ffb070" intensity={40} distance={25} />

      {/* ==================== BUILDING ==================== */}

      <mesh rotation-x={-Math.PI / 2} position={[10, -0.01, 0]} receiveShadow>
        <planeGeometry args={[220, 80]} />
        <meshStandardMaterial color="#161b22" metalness={0.25} roughness={0.7} />
      </mesh>

      {/* safety lanes along the cart track */}
      {[-1.3, 1.3].map((z) => (
        <mesh key={z} position={[10, 0.005, z]}>
          <boxGeometry args={[80, 0.01, 0.08]} />
          <meshBasicMaterial color="#b8860b" />
        </mesh>
      ))}

      {/* safety border around the assembly jig */}
      {[
        [0, -2.6, 5.6, 0.08],
        [0, 2.6, 5.6, 0.08],
        [-2.8, 0, 0.08, 5.2],
        [2.8, 0, 0.08, 5.2],
      ].map(([x, z, w, d], i) => (
        <mesh key={i} position={[JIG.x + x, 0.005, JIG.z + z]}>
          <boxGeometry args={[w, 0.01, d]} />
          <meshBasicMaterial color="#b8860b" />
        </mesh>
      ))}

      {/* back wall + columns */}
      <mesh position={[10, 6, -14]} receiveShadow>
        <planeGeometry args={[220, 12]} />
        <meshStandardMaterial color="#10151c" roughness={0.9} metalness={0.2} />
      </mesh>

      {[-26, -14, -2, 10, 22, 34, 46].map((x) => (
        <mesh key={x} position={[x, 6, -13.6]}>
          <boxGeometry args={[0.6, 12, 0.6]} />
          {M('#1b2430', { metalness: 0.5, roughness: 0.6 })}
        </mesh>
      ))}

      {/* high-bay lamps */}
      {[-18, -6, 6, 18, 30].flatMap((x) =>
        [-6, 4].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 8.6, z]}>
            <boxGeometry args={[2.2, 0.08, 0.5]} />
            <meshBasicMaterial color={NEON('#fff1d6', 1.6)} toneMapped={false} />
          </mesh>
        ))
      )}

      {/* ==================== OVERHEAD BRIDGE CRANE ==================== */}

      {[-9.5, 6.5].map((z) => (
        <mesh key={z} position={[0, 6.05, z]}>
          <boxGeometry args={[48, 0.25, 0.3]} />
          {M('#1e293b')}
        </mesh>
      ))}

      {craneColumns.flatMap((x) =>
        [-9.5, 6.5].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 3, z]}>
            <boxGeometry args={[0.4, 6, 0.4]} />
            {M('#243044', { roughness: 0.55 })}
          </mesh>
        ))
      )}

      <group ref={bridge} position={[-16, 0, 0]}>
        <mesh position={[0, 6.35, -1.5]} castShadow>
          <boxGeometry args={[0.5, 0.35, 16.5]} />
          {M('#f59e0b', { metalness: 0.3, roughness: 0.5 })}
        </mesh>
        {[-9.5, 6.5].map((z) => (
          <mesh key={z} position={[0, 6.2, z]}>
            <boxGeometry args={[0.9, 0.3, 0.6]} />
            {M('#1e293b')}
          </mesh>
        ))}
      </group>

      <mesh ref={trolley} castShadow>
        <boxGeometry args={[0.9, 0.35, 0.7]} />
        {M('#334155')}
      </mesh>

      <mesh ref={cable}>
        <cylinderGeometry args={[0.025, 0.025, 1, 6]} />
        <meshBasicMaterial color="#94a3b8" />
      </mesh>

      <group ref={hookGrp}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <boxGeometry args={[0.3, 0.32, 0.3]} />
          {M('#f59e0b', { metalness: 0.3, roughness: 0.5 })}
        </mesh>
        <mesh position={[0, -0.08, 0]} rotation={[Math.PI, 0, 0]}>
          <torusGeometry args={[0.1, 0.028, 8, 16, Math.PI * 1.5]} />
          {M('#94a3b8')}
        </mesh>
      </group>

      {/* spreader beams + slings + magnet pads */}
      <mesh ref={spreadX} castShadow>
        <boxGeometry args={[1, 0.1, 0.1]} />
        {M('#475569')}
      </mesh>
      <mesh ref={spreadZ} visible={false} castShadow>
        <boxGeometry args={[0.1, 0.1, 1]} />
        {M('#475569')}
      </mesh>

      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <mesh ref={(el) => (slings.current[i] = el)} visible={false}>
            <cylinderGeometry args={[0.018, 0.018, 1, 6]} />
            <meshBasicMaterial color="#cbd5e1" />
          </mesh>
          <mesh ref={(el) => (pads.current[i] = el)} visible={false} castShadow>
            <boxGeometry args={[0.32, 0.07, 0.22]} />
            {M('#1e293b')}
          </mesh>
        </React.Fragment>
      ))}

      {/* ==================== SUPPLIER RACK ==================== */}

      <group position={[REST.x, 0, REST.z]}>
        {[-2.8, 2.8].map((x) => (
          <mesh key={x} position={[x, 0.125, 0]} {...SH}>
            <boxGeometry args={[0.3, 0.25, 2]} />
            {M('#334155')}
          </mesh>
        ))}

        {[0.33, 0.49].flatMap((y) =>
          [-0.36, 0, 0.36].map((z) => (
            <mesh key={`${y}${z}`} position={[0, y, z]} {...SH}>
              <boxGeometry args={[7.8, BAR_H, BAR_H]} />
              {M('#7d8794', { metalness: 0.85, roughness: 0.4 })}
            </mesh>
          ))
        )}
      </group>

      {/* ==================== LASER CUTTING CELL ==================== */}

      <group ref={gantry} position={[-8, 0, 0]}>
        {[-1.6, 1.6].map((z) => (
          <mesh key={z} position={[0, 2.5, z]} {...SH}>
            <boxGeometry args={[0.3, 5, 0.3]} />
            {M('#1e293b')}
          </mesh>
        ))}

        <mesh position={[0, 5, 0]} {...SH}>
          <boxGeometry args={[0.5, 0.3, 3.5]} />
          {M('#334155')}
        </mesh>

        <mesh ref={shaft}>
          <boxGeometry args={[0.16, 1, 0.16]} />
          {M('#334155')}
        </mesh>

        <group ref={head} position={[0, 2.8, 0]}>
          <mesh position={[0, 0.65, 0]} castShadow>
            <boxGeometry args={[0.42, 0.7, 0.42]} />
            {M('#1e293b', { metalness: 0.7 })}
          </mesh>

          <mesh position={[0, 0.65, 0.215]}>
            <boxGeometry args={[0.3, 0.08, 0.01]} />
            <meshBasicMaterial color={NEON('#22d3ee', 2.5)} toneMapped={false} />
          </mesh>

          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.16, 0.035, 0.32, 20]} />
            {M('#94a3b8', { metalness: 0.95, roughness: 0.2 })}
          </mesh>

          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
            {M('#b45309', { metalness: 0.9 })}
          </mesh>

          <mesh ref={beam} visible={false}>
            <cylinderGeometry args={[0.014, 0.014, 1, 8]} />
            <meshBasicMaterial color={NEON('#ff3050', 5)} toneMapped={false} />
          </mesh>

          <mesh ref={spot} visible={false}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshBasicMaterial color={NEON('#ffd9a0', 6)} toneMapped={false} />
          </mesh>

          <pointLight ref={cutLight} position={[0, -0.3, 0]} color="#ffa040" distance={7} intensity={0} />
        </group>
      </group>

      <instancedMesh ref={sparks} args={[null, null, 80]} frustumCulled={false}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={NEON('#ffb347', 4)} toneMapped={false} />
      </instancedMesh>

      {[0, 1, 2].map((k) => (
        <mesh key={k} ref={(el) => (kerf.current[k] = el)} visible={false}>
          <boxGeometry args={[0.05, 0.2, 0.22]} />
          <meshBasicMaterial toneMapped={false} />
        </mesh>
      ))}

      {/* control cabinet */}
      <group position={[0, 0, -3.2]}>
        <mesh position={[0, 1, 0]} {...SH}>
          <boxGeometry args={[2.2, 2, 1.3]} />
          {M('#0f172a')}
        </mesh>
        <mesh position={[0, 1.6, 0.66]}>
          <boxGeometry args={[1.6, 0.06, 0.02]} />
          <meshBasicMaterial color={NEON('#22d3ee', 2.5)} toneMapped={false} />
        </mesh>
      </group>

      {/* ==================== TRANSPORT CART ==================== */}

      <group ref={cart} position={[-14, 0, 0]}>
        <mesh position={[0, 0.95, 0]} {...SH}>
          <boxGeometry args={[9.4, 0.2, 1.3]} />
          {M('#1e293b')}
        </mesh>

        <mesh position={[0, 0.6, 0]} {...SH}>
          <boxGeometry args={[9, 0.3, 0.6]} />
          {M('#0f172a')}
        </mesh>

        {[-4, 4].flatMap((x) =>
          [-0.6, 0.6].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.3, z]} rotation-x={Math.PI / 2} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
              {M('#111827')}
            </mesh>
          ))
        )}

        <mesh position={[0, 0.86, 0.66]}>
          <boxGeometry args={[9.4, 0.04, 0.03]} />
          <meshBasicMaterial color={NEON('#f97316', 2.5)} toneMapped={false} />
        </mesh>
      </group>

      {/* ==================== ASSEMBLY JIG ==================== */}

      <mesh position={[JIG.x, 0.4, JIG.z]} {...SH}>
        <boxGeometry args={[3.8, 0.8, 2.8]} />
        {M('#1e293b')}
      </mesh>

      <mesh position={[JIG.x, 0.81, JIG.z]}>
        <boxGeometry args={[3.7, 0.02, 2.7]} />
        <meshBasicMaterial color={NEON('#22d3ee', 1.5)} toneMapped={false} />
      </mesh>

      {/* locating pins at the four corners */}
      {[-1.5, 1.5].flatMap((x) =>
        [-1.1, 1.1].map((z) => (
          <mesh key={`${x}${z}`} position={[JIG.x + x, 0.92, JIG.z + z]} castShadow>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            {M('#64748b', { metalness: 0.8, roughness: 0.3 })}
          </mesh>
        ))
      )}

      {/* weld beads: thin flat beads lying on the joints */}
      {WELD_POINTS.map(([x, z], i) => (
        <mesh
          key={i}
          ref={(el) => (welds.current[i] = el)}
          visible={false}
          position={[JIG.x + x, JIG.y + BAR_H / 2, JIG.z + z]}
        >
          <boxGeometry args={[WELD_BEAD.w, WELD_BEAD.h, WELD_BEAD.d]} />
          <meshStandardMaterial
            color="#ff8a1e"
            metalness={0.6}
            roughness={0.45}
            emissive="#ff5a00"
            emissiveIntensity={0.25}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* ==================== WELDING ROBOT ==================== */}

      <mesh position={[ARM_BASE.x, 0.5, ARM_BASE.z]} {...SH}>
        <cylinderGeometry args={[0.5, 0.65, 1, 20]} />
        {M('#1e293b')}
      </mesh>

      <mesh position={[ARM_BASE.x, ARM_BASE.y, ARM_BASE.z]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        {M('#334155')}
      </mesh>

      <mesh ref={arm1} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 1, 12]} />
        {M('#f97316', { metalness: 0.3 })}
      </mesh>

      <mesh ref={arm2} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1, 12]} />
        {M('#f97316', { metalness: 0.3 })}
      </mesh>

      {[0.18, 0.13].map((r, i) => (
        <mesh key={i} ref={(el) => (joints.current[i] = el)} castShadow>
          <sphereGeometry args={[r, 14, 14]} />
          {M('#334155')}
        </mesh>
      ))}

      <group ref={torch} position={[ARM_HOME.x, ARM_HOME.y, ARM_HOME.z]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.09, 0.5, 10]} />
          {M('#475569', { metalness: 0.8, roughness: 0.3 })}
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.14, 10]} />
          {M('#b45309', { metalness: 0.9 })}
        </mesh>
        <mesh ref={arc} visible={false}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color={NEON('#bfe9ff', 6)} toneMapped={false} />
        </mesh>
        <pointLight ref={torchLight} color="#8fd3ff" distance={10} intensity={0} />
      </group>

      <instancedMesh ref={weldSparks} args={[null, null, 50]} frustumCulled={false}>
        <sphereGeometry args={[1, 5, 5]} />
        <meshBasicMaterial color={NEON('#ffd18a', 5)} toneMapped={false} />
      </instancedMesh>

      {/* ==================== QC SCAN PORTAL ==================== */}

      <group ref={portal} visible={false}>
        {[-1.6, 1.6].map((z) => (
          <mesh key={z} position={[0, 0.85, z]} castShadow>
            <boxGeometry args={[0.14, 1.7, 0.14]} />
            {M('#334155')}
          </mesh>
        ))}

        <mesh position={[0, 1.7, 0]}>
          <boxGeometry args={[0.14, 0.14, 3.34]} />
          {M('#334155')}
        </mesh>

        <mesh position={[0, JIG.y + 0.35, 0]}>
          <boxGeometry args={[0.02, 0.7, 3.1]} />
          <meshBasicMaterial color={NEON('#22d3ee', 2)} transparent opacity={0.4} depthWrite={false} toneMapped={false} />
        </mesh>
      </group>

      {WELD_POINTS.map((_, k) => (
        <mesh key={k} ref={(el) => (marks.current[k] = el)} rotation-x={Math.PI / 2} visible={false}>
          <torusGeometry args={[0.16, 0.025, 8, 24]} />
          <meshBasicMaterial color={NEON('#34d399', 3)} toneMapped={false} />
        </mesh>
      ))}

      {/* ==================== PAINT BOOTH ==================== */}

      {[JIG.x - 3.6, JIG.x + 3.6].map((x) => (
        <mesh key={x} position={[x, 1.31, -2.2]} castShadow>
          <boxGeometry args={[0.18, 2.62, 0.18]} />
          {M('#334155')}
        </mesh>
      ))}

      <mesh position={[JIG.x, 2.69, -2.2]} castShadow>
        <boxGeometry args={[7.4, 0.14, 0.14]} />
        {M('#334155')}
      </mesh>

      <group ref={gun} position={[JIG.x - 2.6, 0, -2.2]}>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.3]} />
          {M('#1e293b')}
        </mesh>

        <mesh position={[0, 2.13, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.74, 8]} />
          {M('#64748b')}
        </mesh>

        <mesh position={[0, 1.75, 0]} castShadow>
          <boxGeometry args={[0.24, 0.22, 0.5]} />
          {M('#334155', { metalness: 0.8, roughness: 0.25 })}
        </mesh>

        <mesh position={[0, 1.75, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.14, 12]} />
          <meshBasicMaterial color={NEON('#f97316', 4)} toneMapped={false} />
        </mesh>

        <mesh ref={cone} visible={false} position={[0, 1.75, -0.95]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.4, 1.3, 20, 1, true]} />
          <meshBasicMaterial
            color={NEON('#f97316', 1.8)}
            transparent
            opacity={0.16}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        <pointLight ref={paintLight} position={[0, 1.75, -1]} color="#f97316" distance={8} intensity={0} />
      </group>

      <instancedMesh ref={mist} args={[null, null, 100]} frustumCulled={false}>
        <sphereGeometry args={[1, 5, 5]} />
        <meshBasicMaterial
          color={NEON('#fb923c', 2)}
          transparent
          opacity={0.5}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>

      {/* ==================== STEEL PIECES ==================== */}

      {PIECE_LEN.map((len, i) => (
        <mesh key={i} ref={(el) => (pieces.current[i] = el)} castShadow receiveShadow>
          <boxGeometry args={[len - 0.02, BAR_H, BAR_H]} />
          <meshStandardMaterial metalness={0.85} roughness={0.35} />
        </mesh>
      ))}

      {/* ==================== DELIVERY TRUCK ==================== */}

      <group ref={truck} position={[18, 0, 4]}>
        {/* bed */}
        <mesh position={[-0.5, 0.9, 0]} {...SH}>
          <boxGeometry args={[5, 0.25, 2.6]} />
          {M('#1e293b')}
        </mesh>

        {/* bed liner, flush with the deck */}
        <mesh position={[-0.5, 1.06, 0]} receiveShadow>
          <boxGeometry args={[4.2, 0.06, 2.2]} />
          {M('#334155', { metalness: 0.3, roughness: 0.7 })}
        </mesh>

        {/* cab */}
        <mesh position={[2.6, 1.4, 0]} {...SH}>
          <boxGeometry args={[1.7, 1.8, 2.4]} />
          {M('#0f766e', { metalness: 0.4, roughness: 0.35 })}
        </mesh>

        <mesh position={[3.46, 1.6, 0]}>
          <boxGeometry args={[0.02, 0.7, 2.0]} />
          <meshBasicMaterial color={NEON('#67e8f9', 1.5)} toneMapped={false} />
        </mesh>

        {/* headlights + tail lights */}
        {[-0.8, 0.8].map((z) => (
          <React.Fragment key={z}>
            <mesh position={[3.46, 0.85, z]}>
              <boxGeometry args={[0.03, 0.14, 0.3]} />
              <meshBasicMaterial color={NEON('#fff5d6', 3)} toneMapped={false} />
            </mesh>
            <mesh position={[-3.02, 0.9, z]}>
              <boxGeometry args={[0.04, 0.12, 0.3]} />
              <meshBasicMaterial color={NEON('#ff2a2a', 3)} toneMapped={false} />
            </mesh>
          </React.Fragment>
        ))}

        {/* wheels */}
        {[-2, 0.6, 2.6].flatMap((x) =>
          [-1.3, 1.3].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.4, z]} rotation-x={Math.PI / 2} castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 18]} />
              {M('#0b0f16', { metalness: 0.2, roughness: 0.8 })}
            </mesh>
          ))
        )}

        {/* tie-down straps, shown once the frame is secured */}
        <group ref={straps} visible={false}>
          {[-0.7, 0.7].map((dx) => (
            <mesh key={dx} position={[-0.5 + dx, 1.27, 0]}>
              <boxGeometry args={[0.07, 0.035, 2.4]} />
              {M('#f59e0b', { metalness: 0.1, roughness: 0.8 })}
            </mesh>
          ))}
        </group>
      </group>

      {/* ==================== DUST ==================== */}

      <points ref={dust} position={[10, 6, 0]} geometry={dustGeo} frustumCulled={false}>
        <pointsMaterial size={0.06} color="#7dd3fc" transparent opacity={0.4} depthWrite={false} />
      </points>

      {/* ==================== POST PROCESSING ==================== */}

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.2} />
        <Vignette darkness={0.6} offset={0.3} />
      </EffectComposer>
    </>
  );
}