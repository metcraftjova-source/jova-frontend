import React, { useEffect } from 'react';
import {
  ArrowDownRight,
  Clock3,
  Crosshair,
  Factory,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const heroBadges = [
  {
    id: 'trusted',
    label: 'Trusted Engineering Partner',
    icon: ShieldCheck,
  },
  {
    id: 'quick',
    label: 'Quick Response',
    icon: Clock3,
  },
  {
    id: 'precision',
    label: 'Precision in Every Detail',
    icon: Crosshair,
  },
];

const ContactHero = () => {
  useEffect(() => {
    const style = document.createElement('style');

    style.id = 'jova-contact-hero-motion';

    style.innerHTML = `
      @keyframes heroGrid {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(70px, 70px);
        }
      }

      @keyframes heroRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes heroRotateReverse {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }

      @keyframes heroPulse {
        0%,
        100% {
          opacity: .2;
          transform: scale(.96);
        }
        50% {
          opacity: .8;
          transform: scale(1.04);
        }
      }

      @keyframes heroScan {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          transform: translateY(100%);
          opacity: 0;
        }
      }

      @keyframes heroBeam {
        0% {
          transform: translateX(-100%) rotate(-20deg);
        }
        100% {
          transform: translateX(200%) rotate(-20deg);
        }
      }

      @keyframes heroFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      .hero-grid {
        animation: heroGrid 18s linear infinite;
      }

      .hero-rotate {
        animation: heroRotate 28s linear infinite;
      }

      .hero-rotate-reverse {
        animation: heroRotateReverse 20s linear infinite;
      }

      .hero-pulse {
        animation: heroPulse 4s ease-in-out infinite;
      }

      .hero-scan {
        animation: heroScan 5s ease-in-out infinite;
      }

      .hero-beam {
        animation: heroBeam 7s ease-in-out infinite;
      }

      .hero-float {
        animation: heroFloat 5s ease-in-out infinite;
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  return (
    <section
      id="contact-hero"
      className="
        relative
        min-h-[620px]
        md:min-h-[680px]
        w-full
        overflow-hidden
        bg-[#030405]
        text-white
        border-b
        border-white/10
      "
    >
      {/* =====================================================
          CINEMATIC BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main orange atmosphere */}
        <div
          className="
            absolute
            -right-[15%]
            top-[-30%]
            w-[800px]
            h-[800px]
            rounded-full
            bg-orange-600/15
            blur-[160px]
            hero-pulse
          "
        />

        {/* Secondary glow */}
        <div
          className="
            absolute
            -left-[15%]
            bottom-[-50%]
            w-[700px]
            h-[700px]
            rounded-full
            bg-yellow-500/10
            blur-[150px]
          "
        />

        {/* Animated engineering grid */}
        <div
          className="
            absolute
            inset-[-200px]
            opacity-[0.09]
            hero-grid
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.25) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.25) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '70px 70px',
          }}
        />

        {/* Large blueprint diagonals */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] right-[20%] w-px h-[150%] bg-gradient-to-b from-transparent via-orange-500/30 to-transparent rotate-[30deg]" />

          <div className="absolute top-[-20%] right-[35%] w-px h-[150%] bg-gradient-to-b from-transparent via-white/10 to-transparent rotate-[30deg]" />

          <div className="absolute top-[-20%] right-[50%] w-px h-[150%] bg-gradient-to-b from-transparent via-orange-500/15 to-transparent rotate-[30deg]" />
        </div>

        {/* Horizontal technical lines */}
        <div className="absolute top-[28%] right-0 w-[65%] h-px bg-gradient-to-r from-transparent via-white/10 to-orange-500/30" />

        <div className="absolute top-[68%] right-0 w-[55%] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

        {/* Moving beam */}
        <div
          className="
            absolute
            top-[-20%]
            left-[45%]
            w-[120px]
            h-[150%]
            bg-gradient-to-b
            from-transparent
            via-orange-500/10
            to-transparent
            blur-2xl
            hero-beam
          "
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,transparent_15%,rgba(0,0,0,.35)_55%,rgba(0,0,0,.9)_100%)]" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 max-w-[1500px] mx-auto min-h-[620px] md:min-h-[680px] px-6 md:px-10 lg:px-16 flex items-center">
        <div className="w-full grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-7">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-60" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(255,107,0,.9)]" />
              </span>

              <span className="text-orange-400 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em]">
                Contact Our Engineering Team
              </span>

              <span className="hidden sm:block h-px w-20 bg-gradient-to-r from-orange-500 to-transparent" />
            </div>

            {/* Headline */}
            <h1
              className="
                text-[clamp(3.2rem,8vw,7.5rem)]
                font-black
                uppercase
                tracking-[-0.07em]
                leading-[0.82]
              "
            >
              Let's Build
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700">
                Something
              </span>

              <br />

              Together.
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-sm md:text-base text-white/45 leading-relaxed">
              Share your project requirements, drawings or concept.
              Our team connects engineering, fabrication, finishing
              and installation into one coordinated process.
            </p>

            {/* Badges */}
            <div className="mt-9 flex flex-wrap gap-5">
              {heroBadges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        flex
                        items-center
                        justify-center
                        text-orange-500
                        group-hover:bg-orange-500/10
                        group-hover:border-orange-500/40
                        transition-all
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <span className="max-w-[100px] text-[9px] font-bold uppercase tracking-[0.14em] leading-relaxed text-white/40 group-hover:text-white/70 transition-colors">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT GRAPHIC */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-[430px] h-[430px]">
              {/* outer ring */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-white/10
                  hero-rotate
                "
              >
                {/* ring marker */}
                <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_30px_rgba(255,107,0,.9)]" />
              </div>

              {/* dashed ring */}
              <div
                className="
                  absolute
                  inset-8
                  rounded-full
                  border
                  border-dashed
                  border-orange-500/25
                  hero-rotate-reverse
                "
              />

              {/* inner ring */}
              <div className="absolute inset-20 rounded-full border border-white/10" />

              {/* crosshair lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />

              {/* center */}
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
                  bg-black/80
                  border
                  border-orange-500/40
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_100px_rgba(255,107,0,.12)]
                  hero-float
                "
              >
                <div className="absolute inset-4 rounded-full border border-dashed border-orange-500/30 hero-rotate" />

                <Crosshair
                  size={45}
                  strokeWidth={1}
                  className="text-orange-500"
                />
              </div>

              {/* floating labels */}
              <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase tracking-[0.4em] text-white/30">
                ENGINEERING
              </span>

              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase tracking-[0.4em] text-orange-500/60">
                FABRICATION
              </span>

              <span className="absolute top-1/2 -left-16 -translate-y-1/2 text-[8px] font-mono uppercase tracking-[0.4em] text-white/20 -rotate-90">
                PRECISION
              </span>

              <span className="absolute top-1/2 -right-16 -translate-y-1/2 text-[8px] font-mono uppercase tracking-[0.4em] text-white/20 rotate-90">
                INSTALLATION
              </span>

              {/* floating technical cards */}
              <div className="absolute -top-5 -right-8 px-4 py-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Factory
                    size={13}
                    className="text-orange-500"
                  />

                  <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-white/40">
                    METAL SYSTEMS
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-8 px-4 py-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={13}
                    className="text-orange-500"
                  />

                  <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-white/40">
                    PRECISION
                  </span>
                </div>
              </div>

              {/* corner brackets */}
              <div className="absolute top-12 left-12 w-10 h-10 border-l border-t border-orange-500/50" />
              <div className="absolute top-12 right-12 w-10 h-10 border-r border-t border-orange-500/50" />
              <div className="absolute bottom-12 left-12 w-10 h-10 border-l border-b border-orange-500/50" />
              <div className="absolute bottom-12 right-12 w-10 h-10 border-r border-b border-orange-500/50" />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM DATA BAR
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center gap-5">
          <span className="text-orange-500 text-[9px]">●</span>

          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">
            CONTACT
          </span>

          <span className="w-px h-3 bg-white/10" />

          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">
            ENGINEERING
          </span>

          <span className="w-px h-3 bg-white/10" />

          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">
            FABRICATION
          </span>

          <span className="w-px h-3 bg-white/10" />

          <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">
            INSTALLATION
          </span>

          <span className="ml-auto text-orange-500/60 text-[8px] font-mono tracking-widest">
            JM / 2026
          </span>

          <ArrowDownRight
            size={13}
            className="text-orange-500/60"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
