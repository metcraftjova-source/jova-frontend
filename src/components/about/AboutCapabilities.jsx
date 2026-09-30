import React, { useEffect, useRef } from 'react';
import {
  Compass,
  Factory,
  Users,
  Flame,
  Layers,
  ShieldCheck,
  Workflow,
  ArrowUpRight,
  ScanLine,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   CINEMATIC IMAGE SOURCES

   These are temporary reference images.
   Replace them later with Jova's actual factory/project photos.
============================================================ */

const images = {
  engineering:
    'https://images.unsplash.com/photo-1600965581129-eef8a214ec9d?auto=format&fit=crop&w=2200&q=85',

  manufacturing:
    'https://oculargroup.in/assets/cap-fabrication-BpNBeP8Z.jpg',

  workforce:
    'https://www.manpowersupply.ae/_next/image?q=85&url=https%3A%2F%2Fdash.manpowersupply.ae%2Fuploads%2Fsteel_fixer_2_result_39d0840449.jpg&w=1600',

  welding:
    'https://jeffandsimon.com/_astro/home-hero-poster.CmALvsXj_Z1eHvam.webp',

  materials:
    'https://images.unsplash.com/photo-1600965581129-eef8a214ec9d?auto=format&fit=crop&w=2200&q=85',

  quality:
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2200&q=85',

  workflow:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=85',
};

/* ============================================================
   DATA
============================================================ */

const capabilities = [
  {
    num: '01',
    title: 'Engineering Capability',
    eyebrow: 'ENGINEERING',
    description:
      'Engineering-led detailing, coordination and production planning connecting design intent with fabrication reality.',
    icon: Compass,
    image: images.engineering,
    meta: 'DESIGN / DETAIL / COORDINATION',
  },

  {
    num: '02',
    title: 'Manufacturing Infrastructure',
    eyebrow: 'MANUFACTURING',
    description:
      'A controlled manufacturing environment built around precision fabrication, repeatability and production discipline.',
    icon: Factory,
    image: images.manufacturing,
    meta: 'FABRICATION / PRODUCTION',
  },

  {
    num: '03',
    title: 'Skilled Workforce',
    eyebrow: 'WORKFORCE',
    description:
      'Experienced fabrication teams combining technical knowledge, practical judgement and project-focused execution.',
    icon: Users,
    image: images.workforce,
    meta: 'PEOPLE / EXPERIENCE',
  },

  {
    num: '04',
    title: 'Certified Welders',
    eyebrow: 'WELDING',
    description:
      'Welding capability supporting structural, architectural and industrial fabrication requirements.',
    icon: Flame,
    image: images.welding,
    meta: 'WELDING / STRUCTURAL',
  },

  {
    num: '05',
    title: 'Multi-Material Expertise',
    eyebrow: 'MATERIALS',
    description:
      'Experience across aluminium, steel and architectural metal systems, with finishing considered from the outset.',
    icon: Layers,
    image: images.materials,
    meta: 'STEEL / ALUMINIUM / METAL',
  },

  {
    num: '06',
    title: 'Quality-Focused Manufacturing',
    eyebrow: 'QUALITY',
    description:
      'Controlled inspection and production processes designed to maintain dimensional accuracy and finish quality.',
    icon: ShieldCheck,
    image: images.quality,
    meta: 'INSPECTION / CONTROL',
  },

  {
    num: '07',
    title: 'End-to-End Project Responsibility',
    eyebrow: 'DELIVERY',
    description:
      'Engineering, fabrication, finishing and installation connected through one accountable project workflow.',
    icon: Workflow,
    image: images.workflow,
    meta: 'ENGINEERING → INSTALLATION',
  },
];

/* ============================================================
   IMAGE PRELOADER
============================================================ */

const preloadImages = () => {
  Object.values(images).forEach((src) => {
    const image = new Image();
    image.src = src;
  });
};

/* ============================================================
   CINEMATIC IMAGE CARD
============================================================ */

const CinematicCard = ({ item, index }) => {
  const Icon = item.icon;

  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    const enter = () => {
      gsap.to(image, {
        scale: 1.12,
        duration: 1.8,
        ease: 'power3.out',
      });
    };

    const leave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);

    return () => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className={`
        cinematic-card
        group
        relative
        overflow-hidden
        rounded-[30px]
        border border-white/[0.08]
        bg-[#0a0b0c]
        ${
          index === 0
            ? 'lg:col-span-2 lg:row-span-2 min-h-[620px]'
            : 'min-h-[390px]'
        }
      `}
    >
      {/* ====================================================
          IMAGE
      ==================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={item.image}
          alt={item.title}
          loading={index < 3 ? 'eager' : 'lazy'}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            scale-[1.01]
            transition-transform
            duration-1000
          "
        />

        {/* black cinematic grade */}

        <div className="
          absolute
          inset-0
          bg-black/35
          transition-all
          duration-700
          group-hover:bg-black/20
        " />

        {/* orange cinematic tint */}

        <div className="
          absolute
          inset-0
          bg-gradient-to-tr
          from-orange-950/70
          via-transparent
          to-black/20
          mix-blend-multiply
        " />

        {/* bottom cinema gradient */}

        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/35
          to-transparent
        " />

        {/* left shadow */}

        <div className="
          absolute
          inset-y-0
          left-0
          w-1/2
          bg-gradient-to-r
          from-black/65
          to-transparent
        " />
      </div>

      {/* ====================================================
          FILM GRAIN
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.08]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%22.6%22/%3E%3C/svg%3E")',
        }}
      />

      {/* ====================================================
          CINEMATIC LIGHT SWEEP
      ==================================================== */}

      <div className="
        absolute
        -left-[40%]
        top-0
        w-[25%]
        h-full
        rotate-[18deg]
        bg-gradient-to-r
        from-transparent
        via-orange-400/[0.16]
        to-transparent
        blur-2xl
        transition-all
        duration-[1800ms]
        group-hover:left-[130%]
      " />

      {/* ====================================================
          TOP HUD
      ==================================================== */}

      <div className="absolute left-6 right-6 top-6 z-20 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="
            w-10
            h-10
            rounded-xl
            border
            border-white/15
            bg-black/35
            backdrop-blur-xl
            flex
            items-center
            justify-center
          ">
            <Icon
              className="w-4 h-4 text-orange-400"
              strokeWidth={1.5}
            />
          </div>

          <div>
            <div className="
              text-[8px]
              uppercase
              tracking-[0.32em]
              font-bold
              text-orange-400
            ">
              {item.eyebrow}
            </div>

            <div className="
              mt-1
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/35
            ">
              JOVA METCRAFT
            </div>
          </div>
        </div>

        <div className="
          w-9
          h-9
          rounded-full
          border
          border-white/10
          bg-black/25
          backdrop-blur-md
          flex
          items-center
          justify-center
        ">
          <ArrowUpRight className="
            w-4
            h-4
            text-white/50
            group-hover:text-orange-400
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            transition-all
          " />
        </div>
      </div>

      {/* ====================================================
          BIG NUMBER
      ==================================================== */}

      <div className="
        absolute
        top-16
        right-6
        text-[100px]
        md:text-[130px]
        font-black
        leading-none
        tracking-[-0.09em]
        text-white/[0.08]
        select-none
        transition-all
        duration-700
        group-hover:text-orange-500/[0.12]
      ">
        {item.num}
      </div>

      {/* ====================================================
          BOTTOM CONTENT
      ==================================================== */}

      <div className="
        absolute
        left-6
        right-6
        bottom-6
        z-20
      ">
        <div className="
          flex
          items-center
          gap-3
          mb-3
        ">
          <span className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-orange-400
            font-bold
          ">
            {item.meta}
          </span>

          <span className="
            h-px
            w-10
            bg-orange-500/50
          " />
        </div>

        <h3 className="
          text-2xl
          md:text-3xl
          lg:text-4xl
          font-black
          tracking-[-0.035em]
          text-white
          leading-[0.95]
          max-w-xl
          group-hover:text-orange-100
          transition-colors
          duration-500
        ">
          {item.title}
        </h3>

        <p className="
          mt-4
          max-w-xl
          text-xs
          md:text-sm
          leading-relaxed
          text-white/45
          group-hover:text-white/65
          transition-colors
          duration-500
        ">
          {item.description}
        </p>

        <div className="
          mt-5
          flex
          items-center
          gap-3
        ">
          <div className="
            h-px
            flex-1
            bg-gradient-to-r
            from-orange-500/60
            to-transparent
          " />

          <span className="
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-white/25
          ">
            Explore
          </span>
        </div>
      </div>

      {/* ====================================================
          ORANGE EDGE
      ==================================================== */}

      <div className="
        absolute
        left-0
        top-0
        bottom-0
        w-[2px]
        bg-gradient-to-b
        from-transparent
        via-orange-500
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-500
      " />

      {/* ====================================================
          SCAN LINE
      ==================================================== */}

      <div className="
        absolute
        left-0
        right-0
        top-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-orange-400
        to-transparent
        opacity-0
        group-hover:opacity-100
        group-hover:top-full
        transition-all
        duration-[1800ms]
      " />
    </article>
  );
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const AboutCapabilities = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    preloadImages();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.capability-intro',
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.capability-intro',
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.cinematic-card',
        {
          opacity: 0,
          y: 100,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cinematic-grid',
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.to('.floating-orbit', {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#050606]
        text-white
        py-24
        md:py-32
        lg:py-40
      "
    >
      {/* ====================================================
          BACKGROUND
      ==================================================== */}

      <div className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_15%_20%,rgba(227,74,18,.09),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(227,74,18,.06),transparent_35%)]
      " />

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
        }}
      />

      <div className="
        absolute
        -top-[300px]
        -left-[250px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-orange-600/[0.06]
        blur-[150px]
      " />

      <div className="
        absolute
        -bottom-[350px]
        -right-[250px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-orange-500/[0.05]
        blur-[150px]
      " />

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-5
        md:px-10
        lg:px-16
      ">
        {/* ==================================================
            INTRO
        ================================================== */}

        <div className="
          capability-intro
          grid
          lg:grid-cols-[1.1fr_.9fr]
          gap-12
          items-end
          mb-16
          lg:mb-20
        ">
          <div>
            <div className="
              flex
              items-center
              gap-4
              mb-7
            ">
              <span className="
                text-orange-500
                text-[9px]
                font-bold
                uppercase
                tracking-[0.35em]
              ">
                About Jova
              </span>

              <span className="
                w-16
                h-px
                bg-gradient-to-r
                from-orange-500
                to-transparent
              " />

              <span className="
                text-[9px]
                font-mono
                text-white/20
              ">
                01 / 07
              </span>
            </div>

            <h2 className="
              text-5xl
              md:text-6xl
              lg:text-[82px]
              font-black
              tracking-[-0.065em]
              leading-[0.86]
            ">
              Engineering.
              <br />

              <span className="text-white/20">
                Manufacturing.
              </span>

              <br />

              <span className="text-orange-500">
                Responsibility.
              </span>
            </h2>
          </div>

          <div className="relative">
            <p className="
              max-w-xl
              text-sm
              md:text-base
              leading-relaxed
              text-white/40
            ">
              Behind every Jova Metcraft project is a connected
              process — engineering, fabrication, finishing,
              quality control and installation working as one.
            </p>

            <div className="
              mt-8
              flex
              items-center
              gap-4
            ">
              <div className="
                relative
                w-12
                h-12
                rounded-full
                border
                border-orange-500/30
                flex
                items-center
                justify-center
              ">
                <div className="
                  floating-orbit
                  absolute
                  -inset-1
                  rounded-full
                  border
                  border-dashed
                  border-orange-500/25
                " />

                <ScanLine className="
                  w-4
                  h-4
                  text-orange-500
                " />
              </div>

              <div>
                <div className="
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-white/25
                ">
                  Integrated capability
                </div>

                <div className="
                  mt-1
                  text-xs
                  text-white/50
                ">
                  Design → Fabrication → Installation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            CINEMATIC IMAGE GRID
        ================================================== */}

        <div className="
          cinematic-grid
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
        ">
          {capabilities.map((item, index) => (
            <CinematicCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* ==================================================
            BOTTOM
        ================================================== */}

        <div className="
          mt-16
          lg:mt-20
          pt-10
          border-t
          border-white/[0.07]
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-8
        ">
          <div className="
            flex
            items-center
            gap-5
          ">
            <div className="
              text-6xl
              font-black
              tracking-[-0.08em]
              text-white
            ">
              07
            </div>

            <div>
              <div className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-orange-500
              ">
                Core capabilities
              </div>

              <div className="
                mt-1
                text-[10px]
                text-white/25
              ">
                One connected production system
              </div>
            </div>
          </div>

          <p className="
            max-w-xl
            text-sm
            leading-relaxed
            text-white/30
          ">
            From the first drawing to the final installation,
            Jova Metcraft connects people, machinery and
            engineering into one controlled workflow.
          </p>
        </div>
      </div>

      {/* ====================================================
          GLOBAL ANIMATION
      ==================================================== */}

      <style>{`
        .cinematic-card {
          transform-style: preserve-3d;
        }

        @media (prefers-reduced-motion: reduce) {
          .cinematic-card,
          .cinematic-card img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutCapabilities;
