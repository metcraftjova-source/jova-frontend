import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const founder = {
  name: "SAHAYA GERALD",
  role: "Founder & Managing Director",
  image: "/images/founder_sahaya.webp",

  highlights: [
    { value: "1997", label: "Journey Began", featured: true },
    { value: "14 YRS", badge: "VP", label: "Schüco · Vice President", featured: true },
    { value: "28+ YRS", label: "Industry Experience", featured: true },
  ],

  paragraphs: [
    "Leads Jova Metcraft with nearly three decades of hands-on experience in manufacturing, engineering, aluminium and façade industries.",
    "Started in Singapore in 1997 and grew into senior leadership roles in India, including 14 years with Schüco as Vice President, managing large-scale factory operations, projects and teams.",
    "That depth in production, QA/QC and project execution shapes how Jova Metcraft engineers, fabricates and delivers every project.",
  ],
};

export default function Founders() {
  const cardRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMouse({
      x: x * 10,
      y: y * 10,
    });
  };

  const handleMouseLeave = () => {
    setMouse({
      x: 0,
      y: 0,
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#f3f2ef] px-4 py-24 md:px-10 lg:px-16">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mx-auto mb-14 max-w-[1180px]">

        <div
          className={`
            mb-5 flex items-center gap-3
            transition-all duration-1000
            ${visible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
          `}
        >
          <span className="h-[1px] w-12 bg-orange-500" />

          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-orange-500">
            Leadership
          </span>
        </div>

        <h2
          className={`
            text-[clamp(3rem,6vw,6rem)]
            font-black
            leading-[0.8]
            tracking-[-0.075em]
            text-[#111]
            transition-all
            duration-[1200ms]
            ease-[cubic-bezier(.16,1,.3,1)]
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }
          `}
        >
          THE FOUNDER
          <span className="text-orange-500">.</span>
        </h2>

      </div>

      {/* =====================================================
          CARD
      ====================================================== */}

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          group relative mx-auto max-w-[1180px]
          overflow-hidden rounded-[32px]
          bg-[#080808]
          shadow-[0_45px_140px_rgba(0,0,0,0.30)]
          transition-all
          duration-[1400ms]
          ease-[cubic-bezier(.16,1,.3,1)]
          ${
            visible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-24 scale-[0.94] opacity-0"
          }
        `}
        style={{
          transform:
            visible
              ? `perspective(1600px) rotateX(${-mouse.y * 0.12}deg) rotateY(${mouse.x * 0.12}deg)`
              : undefined,
        }}
      >

        {/* =====================================================
            CINEMATIC LIGHT SWEEP
        ====================================================== */}

        <div
          className={`
            pointer-events-none
            absolute
            -left-[70%]
            top-[-20%]
            z-40
            h-[160%]
            w-[35%]
            rotate-[18deg]
            bg-gradient-to-r
            from-transparent
            via-orange-400/[0.20]
            to-transparent
            blur-2xl
            transition-all
            duration-[1800ms]
            ease-[cubic-bezier(.16,1,.3,1)]
            ${visible ? "left-[140%]" : ""}
          `}
        />

        {/* =====================================================
            SECOND LIGHT SWEEP
        ====================================================== */}

        <div
          className={`
            pointer-events-none
            absolute
            -left-[40%]
            top-0
            z-30
            h-full
            w-[20%]
            skew-x-[-18deg]
            bg-white/[0.035]
            blur-xl
            transition-all
            duration-[2200ms]
            delay-[300ms]
            ease-out
            ${visible ? "left-[130%]" : ""}
          `}
        />

        {/* =====================================================
            AMBIENT ORANGE LIGHT
        ====================================================== */}

        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[650px] w-[650px] rounded-full bg-orange-600/[0.14] blur-[150px] transition-transform duration-1000"
          style={{
            transform: `translate(${mouse.x * 2}px, ${mouse.y * 2}px)`,
          }}
        />

        <div
          className="pointer-events-none absolute -bottom-60 -right-40 h-[600px] w-[600px] rounded-full bg-orange-500/[0.08] blur-[150px]"
        />

        {/* =====================================================
            GRAIN
        ====================================================== */}

        <div
          className="pointer-events-none absolute inset-0 z-50 opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* =====================================================
            TOP BAR
        ====================================================== */}

        <div className="relative z-20 flex items-center justify-between border-b border-white/[0.08] px-6 py-4 md:px-9">

          <div
            className={`
              flex items-center gap-3
              transition-all
              duration-1000
              delay-[700ms]
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }
            `}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-orange-500/60" />
              <span className="relative h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_15px_#f97316]" />
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/40">
              Jova Metcraft / Leadership
            </span>
          </div>

          <span
            className={`
              text-[9px] uppercase tracking-[0.35em] text-white/20
              transition-all
              duration-1000
              delay-[800ms]
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }
            `}
          >
            01 — 01
          </span>

        </div>

        {/* =====================================================
            BODY
        ====================================================== */}

        <div className="relative z-10 grid md:grid-cols-[48%_52%]">

          {/* ===================================================
              IMAGE
          ==================================================== */}

          <div className="relative min-h-[540px] overflow-hidden md:min-h-[700px]">

            {/* Image */}
            <div
              className={`
                absolute
                -inset-5
                transition-all
                duration-[1800ms]
                ease-[cubic-bezier(.16,1,.3,1)]
                ${
                  visible
                    ? "scale-100 translate-x-0"
                    : "scale-[1.18] translate-x-[-30px]"
                }
              `}
              style={{
                transform: `
                  scale(${visible ? 1.04 : 1.18})
                  translate(${mouse.x}px, ${mouse.y}px)
                `,
              }}
            >
              <img
                src={founder.image}
                alt={founder.name}
                className="
                  h-full
                  w-full
                  object-cover
                  object-top
                  grayscale-[15%]
                  contrast-[1.08]
                  saturate-[0.88]
                  transition-all
                  duration-[1500ms]
                  group-hover:grayscale-0
                  group-hover:saturate-100
                "
              />
            </div>

            {/* Image dark grade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]" />

            {/* Orange image glow */}
            <div
              className="
                absolute
                -left-20
                top-[40%]
                h-52
                w-52
                rounded-full
                bg-orange-500/20
                blur-[90px]
                transition-all
                duration-1000
                group-hover:bg-orange-500/40
              "
            />

            {/* =================================================
                PORTRAIT LABEL
            ================================================== */}

            <div
              className={`
                absolute
                left-7
                top-7
                z-20
                flex
                items-center
                gap-3
                transition-all
                duration-1000
                delay-[900ms]
                ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }
              `}
            >
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/50">
                Portrait
              </span>

              <span className="h-px w-8 bg-white/20" />

              <span className="text-[9px] text-white/30">
                01
              </span>
            </div>

            {/* =================================================
                SINCE
            ================================================== */}

            <div
              className={`
                absolute
                bottom-8
                left-8
                z-20
                flex
                items-end
                gap-4
                transition-all
                duration-1000
                delay-[1100ms]
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >
              <div className="h-16 w-px bg-gradient-to-t from-orange-500 to-transparent" />

              <div>
                <div className="text-[8px] uppercase tracking-[0.35em] text-white/35">
                  Since
                </div>

                <div className="mt-1 text-3xl font-bold tracking-[-0.04em] text-white">
                  1997
                </div>
              </div>
            </div>

            {/* Corner */}
            <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-white/25" />

            <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-white/25" />

          </div>

          {/* ===================================================
              CONTENT
          ==================================================== */}

          <div className="relative flex flex-col justify-between px-7 py-10 md:px-11 md:py-12 lg:px-14">

            {/* =================================================
                ROLE
            ================================================== */}

            <div>

              <div
                className={`
                  mb-8
                  flex
                  items-center
                  gap-3
                  transition-all
                  duration-1000
                  delay-[500ms]
                  ${
                    visible
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  }
                `}
              >
                <span className="h-px w-10 bg-orange-500 shadow-[0_0_12px_#f97316]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-orange-500">
                  Founder & Managing Director
                </span>
              </div>

              {/* =================================================
                  NAME REVEAL
              ================================================== */}

              <div className="overflow-hidden">

                <h3 className="text-[clamp(3.2rem,5.5vw,6rem)] font-black leading-[0.76] tracking-[-0.08em]">

                  <span
                    className={`
                      block
                      text-white
                      transition-all
                      duration-[1100ms]
                      delay-[650ms]
                      ease-[cubic-bezier(.16,1,.3,1)]
                      ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-[120%] opacity-0"
                      }
                    `}
                  >
                    SAHAYA
                  </span>

                  <span
                    className={`
                      mt-3
                      block
                      text-white
                      transition-all
                      duration-[1100ms]
                      delay-[800ms]
                      ease-[cubic-bezier(.16,1,.3,1)]
                      ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-[120%] opacity-0"
                      }
                    `}
                  >
                    GERALD
                  </span>

                </h3>

              </div>

              {/* =================================================
                  ACCENT LINE
              ================================================== */}

              <div className="relative mt-10 h-px w-full bg-white/[0.08]">

                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    h-[2px]
                    bg-orange-500
                    shadow-[0_0_15px_#f97316]
                    transition-all
                    duration-[1200ms]
                    delay-[1100ms]
                    ease-[cubic-bezier(.16,1,.3,1)]
                    ${
                      visible
                        ? "w-32"
                        : "w-0"
                    }
                  `}
                />

              </div>

              {/* =================================================
                  STATS
              ================================================== */}

              <div className="mt-8 grid grid-cols-3 gap-2">

                {founder.highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className={`
                      group/stat
                      relative
                      overflow-hidden
                      border
                      ${
                        item.featured
                          ? "border-orange-500/50 bg-orange-500/[0.08]"
                          : "border-white/[0.08] bg-white/[0.025]"
                      }
                      px-3
                      py-5
                      transition-all
                      duration-700
                      hover:-translate-y-1
                      hover:border-orange-500/40
                      hover:bg-orange-500/[0.07]
                      ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }
                    `}
                    style={{
                      transitionDelay: `${1200 + index * 130}ms`,
                    }}
                  >

                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 shadow-[0_0_10px_#f97316] transition-all duration-500 group-hover/stat:w-full" />

                    <div className="mb-3 flex h-6 items-center justify-between">
                      <span className="text-[8px] text-white/20">
                        0{index + 1}
                      </span>

                      {item.badge && (
                        <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] leading-none font-black tracking-[0.15em] text-black shadow-[0_0_14px_rgba(249,115,22,.6)]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-lg font-bold tracking-[-0.03em] text-orange-500 md:text-xl">
                      {item.value}
                    </div>

                    <div className="mt-1 text-[8px] uppercase leading-tight tracking-[0.12em] text-white/35">
                      {item.label}
                    </div>

                  </div>
                ))}

              </div>

              {/* =================================================
                  BIO
              ================================================== */}

              <div className="mt-9 space-y-5">

                {founder.paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className={`
                      flex
                      gap-4
                      transition-all
                      duration-1000
                      ease-[cubic-bezier(.16,1,.3,1)]
                      ${
                        visible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-10 opacity-0"
                      }
                    `}
                    style={{
                      transitionDelay: `${1600 + index * 180}ms`,
                    }}
                  >

                    <div className="mt-2 flex shrink-0 flex-col items-center">

                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />

                      {index !== founder.paragraphs.length - 1 && (
                        <span className="mt-2 h-full w-px bg-white/[0.07]" />
                      )}

                    </div>

                    <p className="max-w-xl text-[13px] leading-[1.85] text-white/45 transition-colors duration-500 hover:text-white/75">
                      {paragraph}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            {/* =================================================
                FOOTER
            ================================================== */}

            <div
              className={`
                mt-10
                flex
                items-center
                justify-between
                border-t
                border-white/[0.08]
                pt-6
                transition-all
                duration-1000
                delay-[2200ms]
                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }
              `}
            >

              <div>

                <div className="text-[8px] uppercase tracking-[0.35em] text-white/20">
                  Manufacturing
                </div>

                <div className="mt-1 text-[8px] uppercase tracking-[0.35em] text-white/20">
                  Engineering / Precision
                </div>

              </div>

              <button
                type="button"
                aria-label="Founder"
                className="
                  group/button
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  border-white/10
                  transition-all
                  duration-500
                  hover:border-orange-500
                "
              >

                <span className="
                  absolute
                  inset-0
                  translate-y-full
                  rounded-full
                  bg-orange-500
                  transition-transform
                  duration-500
                  group-hover/button:translate-y-0
                " />

                <ArrowUpRight
                  size={18}
                  className="
                    relative
                    z-10
                    text-white/60
                    transition-all
                    duration-500
                    group-hover/button:translate-x-1
                    group-hover/button:-translate-y-1
                    group-hover/button:text-black
                  "
                />

              </button>

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div
          className={`
            relative
            z-20
            flex
            items-center
            justify-between
            border-t
            border-white/[0.08]
            px-6
            py-4
            transition-all
            duration-1000
            delay-[2400ms]
            md:px-9
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
        >

          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">
            Jova Metcraft
          </span>

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-orange-500/60" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">
              Built on experience
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          CSS ANIMATION
      ====================================================== */}

      <style>{`
        @keyframes cinematicScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </section>
  );
}