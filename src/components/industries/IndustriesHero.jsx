import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2200&q=85';

const IndustriesHero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const metaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      });

      tl.fromTo(
        imageRef.current,
        {
          scale: 1.18,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
        }
      )
        .fromTo(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          '-=1'
        )
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
            skewY: 3,
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.15,
          },
          '-=0.45'
        )
        .fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.65'
        )
        .fromTo(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            duration: 1,
          },
          '-=0.5'
        )
        .fromTo(
          metaRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = heroRef.current;

    if (!section) return;

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      gsap.to(imageRef.current, {
        x: x * -12,
        y: y * -8,
        duration: 1.4,
        ease: 'power3.out',
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToIndustries = () => {
    const target = document.getElementById('industries-grid');

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={heroRef}
      className="
        relative
        min-h-[88dvh]
        w-full
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        ref={imageRef}
        className="
          absolute
          -inset-8
          bg-cover
          bg-center
          will-change-transform
        "
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
        }}
      />

      {/* image darkening */}

      <div className="
        absolute
        inset-0
        bg-black/55
      " />

      {/* cinematic gradient */}

      <div className="
        absolute
        inset-0
        bg-gradient-to-r
        from-black
        via-black/70
        to-black/20
      " />

      <div className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black
        via-transparent
        to-black/40
      " />

      {/* orange atmosphere */}

      <div className="
        absolute
        -right-[15%]
        top-[5%]
        w-[55vw]
        h-[55vw]
        max-w-[800px]
        max-h-[800px]
        rounded-full
        bg-orange-600/10
        blur-[140px]
        pointer-events-none
      " />

      {/* =====================================================
          GRID
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
          pointer-events-none
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
          backgroundSize: '90px 90px',
        }}
      />

      {/* =====================================================
          FILM GRAIN
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.045]
          pointer-events-none
          mix-blend-screen
        "
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%22.8%22/%3E%3C/svg%3E")',
        }}
      />

      {/* =====================================================
          CINEMATIC LIGHT BEAM
      ===================================================== */}

      <div className="
        absolute
        -left-[20%]
        top-[-30%]
        w-[25%]
        h-[180%]
        rotate-[22deg]
        bg-gradient-to-b
        from-transparent
        via-orange-500/20
        to-transparent
        blur-2xl
        animate-[heroBeam_7s_ease-in-out_infinite]
        pointer-events-none
      " />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="
        relative
        z-10
        min-h-[88dvh]
        max-w-[1500px]
        mx-auto
        px-6
        md:px-12
        lg:px-20
        flex
        items-end
        pb-16
        lg:pb-24
      ">
        <div className="w-full">

          {/* eyebrow */}

          <div
            ref={eyebrowRef}
            className="
              flex
              items-center
              gap-4
              mb-7
              opacity-0
            "
          >
            <span className="
              w-2
              h-2
              rounded-full
              bg-orange-500
              shadow-[0_0_20px_rgba(255,100,0,.9)]
            " />

            <span className="
              text-orange-400
              text-[10px]
              md:text-xs
              font-bold
              uppercase
              tracking-[0.35em]
            ">
              Where We Work
            </span>

            <span className="
              hidden
              sm:block
              text-white/20
              text-[10px]
              font-mono
            ">
              01 — 12
            </span>
          </div>

          {/* title */}

          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="
                opacity-0
                max-w-6xl
                text-[13vw]
                sm:text-7xl
                md:text-8xl
                lg:text-[8.5rem]
                xl:text-[9.5rem]
                font-black
                uppercase
                tracking-[-0.07em]
                leading-[0.78]
              "
            >
              Solutions
              <br />

              <span className="text-white/25">
                Across
              </span>{' '}

              <span className="
                text-orange-500
                drop-shadow-[0_0_35px_rgba(255,100,0,.18)]
              ">
                Industries
              </span>
            </h1>
          </div>

          {/* bottom information */}

          <div className="
            mt-10
            grid
            grid-cols-1
            lg:grid-cols-[1fr_auto]
            gap-8
            items-end
          ">
            <div>

              <div
                ref={lineRef}
                className="
                  w-full
                  max-w-2xl
                  h-px
                  bg-gradient-to-r
                  from-orange-500
                  via-white/20
                  to-transparent
                  mb-6
                "
              />

              <p
                ref={textRef}
                className="
                  opacity-0
                  max-w-2xl
                  text-sm
                  md:text-base
                  lg:text-lg
                  text-white/55
                  leading-relaxed
                "
              >
                Engineered metal fabrication and façade solutions built
                to the standards each sector demands — from architectural
                precision to heavy industrial duty.
              </p>
            </div>

            {/* CTA */}

            <button
              ref={metaRef}
              onClick={scrollToIndustries}
              className="
                opacity-0
                group
                flex
                items-center
                gap-4
                text-left
                hover:text-orange-400
                transition-colors
              "
            >
              <span className="
                flex
                items-center
                justify-center
                w-12
                h-12
                rounded-full
                border
                border-white/20
                group-hover:border-orange-500
                group-hover:bg-orange-500
                group-hover:text-black
                transition-all
                duration-500
              ">
                <ArrowDown className="
                  w-4
                  h-4
                  group-hover:translate-y-1
                  transition-transform
                " />
              </span>

              <span className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/45
              ">
                Explore
                <br />
                sectors
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          CORNER METADATA
      ===================================================== */}

      <div className="
        absolute
        top-32
        right-6
        md:right-12
        lg:right-20
        z-20
        hidden
        md:flex
        flex-col
        items-end
        gap-2
        text-[8px]
        uppercase
        tracking-[0.25em]
        text-white/25
      ">
        <span>JOVA METCRAFT</span>

        <span className="flex items-center gap-2">
          ENGINEERED
          <span className="w-8 h-px bg-orange-500/60" />
          FABRICATED
        </span>
      </div>

      {/* =====================================================
          BOTTOM BORDER
      ===================================================== */}

      <div className="
        absolute
        bottom-0
        left-0
        right-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-orange-500/50
        to-transparent
      " />

      <style>{`
        @keyframes heroBeam {
          0% {
            transform: translateX(-20%) rotate(22deg);
            opacity: 0;
          }

          20% {
            opacity: .8;
          }

          70% {
            opacity: .35;
          }

          100% {
            transform: translateX(500%) rotate(22deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default IndustriesHero;
