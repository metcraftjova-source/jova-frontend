import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Phone,
  ArrowUpRight,
  MoveUpRight,
  Crosshair,
  Factory,
  Layers3,
  Ruler,
  Settings2,
  Triangle,
  Wrench,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.fromTo(
        '.cta-main-visual',
        {
          scale: 1.15,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        }
      )
        .fromTo(
          '.cta-content',
          {
            y: 55,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
          '-=1'
        )
        .fromTo(
          '.cta-item',
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.55'
        );

      gsap.to('.orbit-main', {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.orbit-secondary', {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.technical-scan', {
        x: '120vw',
        duration: 5,
        repeat: -1,
        ease: 'power1.inOut',
      });

      gsap.to('.orange-pulse', {
        opacity: 0.45,
        scale: 1.12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.floating-marker', {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        min-h-[780px]
        md:min-h-[850px]
        overflow-hidden
        bg-[#020304]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0">

        {/* Black / graphite base */}

        <div className="absolute inset-0 bg-[#030405]" />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_75%_45%,rgba(255,92,15,0.20),transparent_28%)]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_80%,rgba(255,70,10,0.10),transparent_25%)]
          "
        />

        {/* =================================================
            LARGE ORANGE LIGHT SOURCE
        ================================================== */}

        <div
          className="
            orange-pulse
            absolute
            right-[8%]
            top-[20%]
            w-[360px]
            h-[360px]
            rounded-full
            bg-orange-500/20
            blur-[90px]
          "
        />

        <div
          className="
            absolute
            right-[17%]
            top-[30%]
            w-[160px]
            h-[160px]
            rounded-full
            bg-orange-400/20
            blur-[50px]
          "
        />

        {/* =================================================
            BLUEPRINT GRID
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.12]
          "
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.32) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.32) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
          }}
        />

        {/* Larger blueprint grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.06]
          "
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,120,40,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,120,40,.6) 1px, transparent 1px)
            `,
            backgroundSize: '275px 275px',
          }}
        />

        {/* =================================================
            DIAGONAL INDUSTRIAL GRAPHICS
        ================================================== */}

        <div
          className="
            absolute
            right-[-8%]
            top-[8%]
            w-[760px]
            h-[650px]
            rotate-[-10deg]
            border
            border-white/10
          "
        />

        <div
          className="
            absolute
            right-[0%]
            top-[15%]
            w-[650px]
            h-[540px]
            rotate-[-10deg]
            border
            border-orange-500/30
          "
        />

        <div
          className="
            absolute
            right-[8%]
            top-[22%]
            w-[540px]
            h-[430px]
            rotate-[-10deg]
            border
            border-white/10
          "
        />

        {/* =================================================
            STEEL STRUCTURE
        ================================================== */}

        <div className="absolute inset-0 pointer-events-none">

          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={`vertical-${i}`}
              className="
                absolute
                top-[8%]
                bottom-[8%]
                w-[3px]
                bg-gradient-to-b
                from-transparent
                via-white/20
                to-transparent
              "
              style={{
                right: `${7 + i * 8}%`,
                transform: 'rotate(-10deg)',
              }}
            />
          ))}

          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`horizontal-${i}`}
              className="
                absolute
                right-[2%]
                w-[63%]
                h-[3px]
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
              "
              style={{
                top: `${20 + i * 12}%`,
                transform: 'rotate(-10deg)',
              }}
            />
          ))}

          {/* Orange structural accents */}

          {[0, 1, 2, 3].map((i) => (
            <div
              key={`orange-${i}`}
              className="
                absolute
                right-[12%]
                w-[38%]
                h-[2px]
                bg-gradient-to-r
                from-transparent
                via-orange-500
                to-transparent
                shadow-[0_0_15px_rgba(249,115,22,.8)]
              "
              style={{
                top: `${30 + i * 14}%`,
                transform: 'rotate(-10deg)',
              }}
            />
          ))}
        </div>

        {/* =================================================
            BIG ENGINEERING CIRCLE
        ================================================== */}

        <div
          className="
            cta-main-visual
            absolute
            right-[8%]
            top-1/2
            -translate-y-1/2
            w-[470px]
            h-[470px]
            opacity-0
          "
        >
          {/* Outer glow */}

          <div
            className="
              absolute
              inset-[35px]
              rounded-full
              bg-orange-500/10
              blur-[60px]
            "
          />

          {/* Main ring */}

          <div
            className="
              orbit-main
              absolute
              inset-0
              rounded-full
              border-[2px]
              border-white/20
            "
          />

          {/* Orange ring */}

          <div
            className="
              orbit-secondary
              absolute
              inset-[38px]
              rounded-full
              border-[2px]
              border-dashed
              border-orange-500/60
            "
          />

          {/* Inner ring */}

          <div
            className="
              absolute
              inset-[90px]
              rounded-full
              border
              border-white/15
            "
          />

          {/* Orange inner circle */}

          <div
            className="
              absolute
              inset-[130px]
              rounded-full
              border
              border-orange-500/50
              shadow-[0_0_50px_rgba(249,115,22,.18)]
            "
          />

          {/* Crosshair horizontal */}

          <div
            className="
              absolute
              top-1/2
              left-0
              right-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-orange-500/60
              to-transparent
            "
          />

          {/* Crosshair vertical */}

          <div
            className="
              absolute
              left-1/2
              top-0
              bottom-0
              w-px
              bg-gradient-to-b
              from-transparent
              via-orange-500/60
              to-transparent
            "
          />

          {/* Center */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-32
              h-32
              rounded-full
              bg-[#050505]
              border-2
              border-orange-500
              flex
              items-center
              justify-center
              shadow-[0_0_70px_rgba(249,115,22,.35)]
            "
          >
            <Crosshair
              size={46}
              className="text-orange-500"
              strokeWidth={1}
            />
          </div>

          {/* Center glow */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-20
              h-20
              rounded-full
              bg-orange-500/20
              blur-xl
              pointer-events-none
            "
          />

          {/* Technical markers */}

          <div className="floating-marker absolute top-[12%] left-[18%] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)]" />
            <span className="text-[8px] font-mono tracking-[0.3em] text-white/60">
              AXIS 01
            </span>
          </div>

          <div className="floating-marker absolute bottom-[16%] right-[12%] flex items-center gap-2">
            <span className="text-[8px] font-mono tracking-[0.3em] text-orange-400">
              STRUCTURE
            </span>
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)]" />
          </div>

          <div className="absolute top-[48%] -right-[75px] text-[8px] font-mono tracking-[0.35em] text-white/30 rotate-90">
            PRECISION / 001
          </div>

          <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-[0.35em] text-orange-500/60">
            JM ENGINEERING SYSTEM
          </div>
        </div>

        {/* =================================================
            TECHNICAL CALLOUTS
        ================================================== */}

        <div className="absolute right-[38%] top-[17%] hidden xl:flex items-center gap-3">
          <Ruler size={15} className="text-orange-500" />

          <span className="text-[9px] font-mono tracking-[0.3em] text-white/50">
            01 / DESIGN
          </span>

          <div className="w-24 h-px bg-orange-500/40" />
        </div>

        <div className="absolute right-[33%] bottom-[25%] hidden xl:flex items-center gap-3">
          <div className="w-24 h-px bg-orange-500/40" />

          <span className="text-[9px] font-mono tracking-[0.3em] text-white/50">
            02 / FABRICATION
          </span>

          <Settings2 size={15} className="text-orange-500" />
        </div>

        {/* =================================================
            MOVING SCAN
        ================================================== */}

        <div
          className="
            technical-scan
            absolute
            left-[-25vw]
            top-0
            w-[180px]
            h-full
            rotate-[12deg]
            bg-gradient-to-r
            from-transparent
            via-orange-500/20
            to-transparent
            blur-[25px]
            pointer-events-none
          "
        />

        {/* =================================================
            TOP ORANGE LINE
        ================================================== */}

        <div className="
          absolute
          top-0
          left-0
          right-0
          h-[3px]
          bg-gradient-to-r
          from-orange-600
          via-orange-400
          to-transparent
          shadow-[0_0_25px_rgba(249,115,22,.5)]
        " />

        {/* =================================================
            STRONG CINEMATIC GRADING
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#020304]
            via-[#020304]/90
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-transparent
            to-black/40
          "
        />

        {/* Vignette */}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 180px rgba(0,0,0,.95)',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          max-w-[1450px]
          mx-auto
          min-h-[780px]
          md:min-h-[850px]
          px-6
          md:px-12
          lg:px-20
          py-28
          flex
          items-center
        "
      >
        <div className="cta-content max-w-3xl opacity-0">

          {/* Label */}

          <div className="cta-item flex items-center gap-4 mb-8">
            <span
              className="
                flex
                items-center
                gap-2
                text-orange-400
                text-[10px]
                md:text-[11px]
                font-bold
                uppercase
                tracking-[0.4em]
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-orange-500
                  shadow-[0_0_15px_rgba(249,115,22,1)]
                  animate-pulse
                "
              />

              JOVA METCRAFT
            </span>

            <span className="hidden sm:block w-20 h-px bg-orange-500/70" />

            <span className="text-white/35 text-[9px] font-mono">
              JM / 07
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              cta-item
              text-[clamp(3.4rem,8vw,8rem)]
              font-black
              uppercase
              tracking-[-0.07em]
              leading-[0.82]
            "
          >
            Let's
            <br />

            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-orange-300
                via-orange-500
                to-orange-700
              "
            >
              Engineer.
            </span>
          </h2>

          {/* Divider */}

          <div className="cta-item mt-8 flex items-center gap-4">
            <div className="w-20 h-[3px] bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,.8)]" />

            <span className="text-[9px] font-mono tracking-[0.3em] text-orange-400">
              BUILT FOR PRECISION
            </span>
          </div>

          {/* Description */}

          <p
            className="
              cta-item
              mt-8
              max-w-xl
              text-sm
              md:text-base
              lg:text-lg
              leading-relaxed
              text-white/65
            "
          >
            Share your drawing, concept or project requirement
            with our engineering team. From design and fabrication
            through finishing and installation, every stage is
            connected.
          </p>

          {/* =================================================
              BUTTONS
          ================================================== */}

          <div className="cta-item mt-10 flex flex-col sm:flex-row gap-4">

            {/* Primary */}

            <Link
              to="/contact"
              className="
                group
                relative
                overflow-hidden
                inline-flex
                items-center
                justify-center
                gap-3
                px-8
                py-4
                rounded-lg
                bg-orange-500
                text-black
                font-bold
                text-sm
                shadow-[0_0_35px_rgba(249,115,22,.35)]
                hover:shadow-[0_0_70px_rgba(249,115,22,.55)]
                hover:bg-orange-400
                transition-all
                duration-500
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  bg-white
                  translate-x-[-120%]
                  skew-x-[-15deg]
                  group-hover:translate-x-[120%]
                  transition-transform
                  duration-700
                "
              />

              <span className="relative z-10">
                Start a Project
              </span>

              <ChevronRight
                size={18}
                className="
                  relative
                  z-10
                  group-hover:translate-x-1
                  transition-transform
                "
              />
            </Link>

            {/* Secondary */}

            <Link
              to="/contact"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                px-8
                py-4
                rounded-lg
                border
                border-white/20
                bg-white/[0.04]
                backdrop-blur-xl
                text-white
                font-semibold
                text-sm
                hover:border-orange-500
                hover:bg-orange-500/10
                transition-all
                duration-500
              "
            >
              <Phone
                size={16}
                className="
                  text-orange-500
                  group-hover:scale-110
                  transition-transform
                "
              />

              Contact Jova

              <ArrowUpRight
                size={16}
                className="
                  text-white/40
                  group-hover:text-orange-500
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                  transition-all
                "
              />
            </Link>
          </div>

          {/* =================================================
              PROCESS
          ================================================== */}

          <div
            className="
              cta-item
              mt-14
              flex
              flex-wrap
              items-center
              gap-x-7
              gap-y-4
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/45
            "
          >
            <div className="flex items-center gap-2">
              <Factory size={14} className="text-orange-500" />
              Engineering
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            <div className="flex items-center gap-2">
              <Layers3 size={14} className="text-orange-500" />
              Fabrication
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            <div className="flex items-center gap-2">
              <Triangle size={12} className="text-orange-500" />
              Finishing
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            <div className="flex items-center gap-2">
              <Wrench size={14} className="text-orange-500" />
              Installation
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM DATA BAR
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-20
          border-t
          border-white/10
          bg-black/70
          backdrop-blur-xl
        "
      >
        <div
          className="
            max-w-[1450px]
            mx-auto
            px-6
            md:px-12
            lg:px-20
            py-4
            flex
            items-center
            gap-5
            overflow-hidden
          "
        >
          <span className="text-orange-500 text-[9px] animate-pulse">
            ●
          </span>

          <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/40">
            JM / Precision Engineering
          </span>

          <span className="ml-auto hidden sm:block text-orange-500/80 text-[8px] font-mono tracking-widest">
            SYSTEM READY
          </span>

          <MoveUpRight
            size={12}
            className="text-orange-500"
          />
        </div>
      </div>

      {/* =====================================================
          FILM GRAIN
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          z-30
          pointer-events-none
          opacity-[0.045]
        "
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%22.8%22/%3E%3C/svg%3E")',
        }}
      />

      {/* =====================================================
          ANIMATED ORANGE EDGE
      ====================================================== */}

      <div
        className="
          absolute
          z-30
          left-0
          top-0
          bottom-0
          w-[2px]
          bg-gradient-to-b
          from-transparent
          via-orange-500
          to-transparent
          shadow-[0_0_20px_rgba(249,115,22,.8)]
        "
      />

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .orbit-main,
          .orbit-secondary,
          .technical-scan,
          .orange-pulse,
          .floating-marker {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}