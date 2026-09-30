import React, { useEffect, useRef } from 'react';
import {
  Building2,
  TrainFront,
  Building,
  Hotel,
  Store,
  Factory,
  Cog,
  Network,
  Mountain,
  Zap,
  Wrench,
  HardHat,
  ArrowUpRight,
} from 'lucide-react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { GlassIcon } from '../services/icons/GlassIcon';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   IMAGE REFERENCES

   These are atmospheric/reference images.
   They are NOT presented as Jova project photography.
============================================================ */

const images = {
  architecture:
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=82',

  rail:
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=82',

  commercial:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82',

  hospitality:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=82',

  interior:
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=82',

  industrial:
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=82',

  engineering:
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=82',

  infrastructure:
    'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=82',

  mining:
    'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=82',

  energy:
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=82',

  equipment:
    'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=82',

  construction:
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=82',
};

/* ============================================================
   DATA
============================================================ */

const industries = [
  {
    num: '01',
    title: 'Architecture & Façade',
    short: 'Architectural Systems',
    description:
      'Curtain wall systems, façade cladding and bespoke architectural metalwork for architects and design teams.',
    icon: Building2,
    image: images.architecture,
  },
  {
    num: '02',
    title: 'Rail & Transportation',
    short: 'Transit Infrastructure',
    description:
      'Platform screen door systems, transit infrastructure and rail-grade fabricated components.',
    icon: TrainFront,
    image: images.rail,
  },
  {
    num: '03',
    title: 'Commercial Buildings',
    short: 'Built Environment',
    description:
      'Structural steel, façade cladding and interior metalwork for office and commercial developments.',
    icon: Building,
    image: images.commercial,
  },
  {
    num: '04',
    title: 'Hospitality',
    short: 'Hospitality Spaces',
    description:
      'Decorative metalwork, feature walls and architectural finishes for hotels and hospitality spaces.',
    icon: Hotel,
    image: images.hospitality,
  },
  {
    num: '05',
    title: 'Interior & Retail',
    short: 'Interior Architecture',
    description:
      'Feature walls, ceilings and fit-out metalwork for retail environments and interior design projects.',
    icon: Store,
    image: images.interior,
  },
  {
    num: '06',
    title: 'Industrial Manufacturing',
    short: 'Industrial Systems',
    description:
      'Machine frames, equipment structures and production-line fabrication built to duty specification.',
    icon: Factory,
    image: images.industrial,
  },
  {
    num: '07',
    title: 'Engineering & OEM',
    short: 'Precision Engineering',
    description:
      'Precision components and custom assemblies engineered and fabricated to OEM specifications.',
    icon: Cog,
    image: images.engineering,
  },
  {
    num: '08',
    title: 'Infrastructure',
    short: 'Public Infrastructure',
    description:
      'Structural steel and fabricated systems supporting public infrastructure and civic projects.',
    icon: Network,
    image: images.infrastructure,
  },
  {
    num: '09',
    title: 'Mining',
    short: 'Heavy Industry',
    description:
      'Heavy-duty structures, platforms and equipment fabrication engineered for mining operations.',
    icon: Mountain,
    image: images.mining,
  },
  {
    num: '10',
    title: 'Energy',
    short: 'Energy Systems',
    description:
      'Structural and equipment fabrication for power, utility and energy-sector installations.',
    icon: Zap,
    image: images.energy,
  },
  {
    num: '11',
    title: 'Equipment Manufacturing',
    short: 'Equipment Systems',
    description:
      'Custom-fabricated frames, enclosures and structural components for equipment builders.',
    icon: Wrench,
    image: images.equipment,
  },
  {
    num: '12',
    title: 'Construction',
    short: 'Construction Systems',
    description:
      'Structural steel, staircases and site-fabricated metalwork for general construction projects.',
    icon: HardHat,
    image: images.construction,
  },
];

/* ============================================================
   INDUSTRY CARD
============================================================ */

const IndustryCard = ({ industry, index }) => {
  const Icon = industry.icon;
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const handleMouseMove = (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      gsap.to(imageRef.current, {
        x: (px - 0.5) * -18,
        y: (py - 0.5) * -14,
        scale: 1.08,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to(glowRef.current, {
        x: (px - 0.5) * 120,
        y: (py - 0.5) * 80,
        opacity: 0.7,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.to(glowRef.current, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="
        industry-card
        group
        relative
        min-h-[430px]
        lg:min-h-[500px]
        overflow-hidden
        rounded-[30px]
        border
        border-white/[0.08]
        bg-[#090909]
        opacity-0
        cursor-default
      "
    >
      {/* ====================================================
          IMAGE
      ==================================================== */}

      <div className="
        absolute
        inset-0
        overflow-hidden
      ">
        <div
          ref={imageRef}
          className="
            absolute
            -inset-5
            bg-cover
            bg-center
            transition-[filter]
            duration-1000
            grayscale-[0.55]
            group-hover:grayscale-0
          "
          style={{
            backgroundImage: `url(${industry.image})`,
          }}
        />

        {/* image dark grade */}

        <div className="
          absolute
          inset-0
          bg-black/55
          group-hover:bg-black/35
          transition-all
          duration-700
        " />

        <div className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/35
          to-black/10
        " />

        {/* orange grade */}

        <div className="
          absolute
          inset-0
          bg-gradient-to-br
          from-orange-600/15
          via-transparent
          to-transparent
          opacity-40
          group-hover:opacity-80
          transition-opacity
          duration-700
        " />
      </div>

      {/* ====================================================
          MOUSE GLOW
      ==================================================== */}

      <div
        ref={glowRef}
        className="
          absolute
          -top-24
          -left-24
          w-48
          h-48
          rounded-full
          bg-orange-500/30
          blur-[70px]
          opacity-0
          pointer-events-none
        "
      />

      {/* ====================================================
          TECHNICAL GRID
      ==================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-1000
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.12) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* ====================================================
          LIGHT SWEEP
      ==================================================== */}

      <div className="
        absolute
        -left-[80%]
        top-0
        w-[35%]
        h-full
        rotate-[15deg]
        bg-gradient-to-r
        from-transparent
        via-white/15
        to-transparent
        blur-xl
        group-hover:left-[150%]
        transition-[left]
        duration-[1600ms]
        ease-out
        pointer-events-none
      " />

      {/* ====================================================
          TOP META
      ==================================================== */}

      <div className="
        absolute
        top-6
        left-6
        right-6
        z-20
        flex
        items-center
        justify-between
      ">
        <div className="
          flex
          items-center
          gap-3
        ">
          <span className="
            text-orange-400
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
          ">
            {industry.short}
          </span>

          <span className="
            w-8
            h-px
            bg-white/20
          " />
        </div>

        <span className="
          text-white/25
          text-3xl
          font-black
          tracking-[-0.08em]
        ">
          {industry.num}
        </span>
      </div>

      {/* ====================================================
          ICON
      ==================================================== */}

      <div className="
        absolute
        top-20
        left-6
        z-20
        w-16
        h-16
        rounded-2xl
        border
        border-white/15
        bg-black/35
        backdrop-blur-md
        flex
        items-center
        justify-center
        group-hover:border-orange-500/50
        group-hover:bg-orange-500/10
        group-hover:scale-105
        transition-all
        duration-700
      ">
        <Icon
          className="
            w-7
            h-7
            text-orange-400
            group-hover:text-orange-300
            transition-colors
            duration-500
          "
          strokeWidth={1.4}
        />
      </div>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="
        absolute
        left-6
        right-6
        bottom-6
        z-20
      ">
        <div className="
          mb-4
          h-px
          w-12
          bg-orange-500
          group-hover:w-24
          transition-all
          duration-700
          shadow-[0_0_15px_rgba(255,100,0,.7)]
        " />

        <h3 className="
          max-w-[90%]
          text-2xl
          lg:text-3xl
          font-black
          tracking-[-0.035em]
          leading-[0.95]
          text-white
          group-hover:text-orange-100
          transition-colors
          duration-500
        ">
          {industry.title}
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
          {industry.description}
        </p>

        <div className="
          mt-6
          flex
          items-center
          justify-between
        ">
          <span className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/25
          ">
            ENGINEERED METALWORK
          </span>

          <span className="
            w-9
            h-9
            rounded-full
            border
            border-white/15
            flex
            items-center
            justify-center
            text-white/40
            group-hover:bg-orange-500
            group-hover:text-black
            group-hover:border-orange-500
            group-hover:rotate-45
            transition-all
            duration-500
          ">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* ====================================================
          BORDER LIGHT
      ==================================================== */}

      <div className="
        absolute
        left-0
        bottom-0
        h-[2px]
        w-0
        bg-gradient-to-r
        from-orange-500
        via-orange-300
        to-transparent
        group-hover:w-full
        transition-all
        duration-1000
      " />
    </article>
  );
};

/* ============================================================
   MAIN
============================================================ */

const IndustriesGrid = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.industry-card');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.09,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.industry-heading',
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="industries-grid"
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#050505]
        py-24
        lg:py-36
        text-white
      "
    >
      {/* ====================================================
          BACKGROUND
      ==================================================== */}

      <div className="
        absolute
        -top-[300px]
        -left-[250px]
        w-[700px]
        h-[700px]
        rounded-full
        bg-orange-600/[0.055]
        blur-[160px]
        pointer-events-none
      " />

      <div className="
        absolute
        top-[45%]
        -right-[350px]
        w-[750px]
        h-[750px]
        rounded-full
        bg-orange-500/[0.04]
        blur-[180px]
        pointer-events-none
      " />

      {/* grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          pointer-events-none
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.7) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.7) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '90px 90px',
        }}
      />

      {/* grain */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          pointer-events-none
          mix-blend-screen
        "
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.8%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="
        relative
        z-10
        max-w-[1500px]
        mx-auto
        px-5
        md:px-10
        lg:px-20
      ">

        {/* ==================================================
            HEADING
        ================================================== */}

        <div className="
          industry-heading
          opacity-0
          mb-16
          lg:mb-24
          grid
          grid-cols-1
          lg:grid-cols-[1fr_420px]
          gap-10
          items-end
        ">
          <div>

            <div className="
              flex
              items-center
              gap-4
              mb-8
            ">
              <span className="
                text-orange-500
                text-[10px]
                font-bold
                uppercase
                tracking-[0.35em]
              ">
                Sectors We Serve
              </span>

              <span className="
                w-20
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
                12 SECTORS
              </span>
            </div>

            <h2 className="
              text-5xl
              md:text-6xl
              lg:text-[6.5rem]
              font-black
              tracking-[-0.065em]
              leading-[0.82]
            ">
              Precision
              <br />

              <span className="text-white/20">
                without
              </span>{' '}

              <span className="text-orange-500">
                limits.
              </span>
            </h2>

          </div>

          <div>
            <p className="
              text-sm
              md:text-base
              text-white/40
              leading-relaxed
              max-w-md
            ">
              Engineering, fabrication and finishing capability applied
              wherever precision metalwork is needed — from architectural
              environments to demanding industrial systems.
            </p>

            <div className="
              mt-7
              flex
              items-center
              gap-3
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/20
            ">
              <span className="
                w-1.5
                h-1.5
                rounded-full
                bg-orange-500
                shadow-[0_0_12px_rgba(255,100,0,.8)]
              " />

              Reference imagery used where project photography
              is unavailable
            </div>
          </div>
        </div>

        {/* ==================================================
            GRID
        ================================================== */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          lg:gap-6
        ">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.num}
              industry={industry}
              index={index}
            />
          ))}
        </div>

        {/* ==================================================
            BOTTOM STATEMENT
        ================================================== */}

        <div className="
          mt-20
          lg:mt-28
          pt-10
          border-t
          border-white/[0.07]
          grid
          grid-cols-1
          md:grid-cols-3
          gap-10
          items-end
        ">

          <div>
            <div className="
              text-6xl
              lg:text-7xl
              font-black
              tracking-[-0.08em]
              text-white
            ">
              12
            </div>

            <div className="
              mt-2
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/25
            ">
              Sectors
            </div>
          </div>

          <div>
            <div className="
              text-6xl
              lg:text-7xl
              font-black
              tracking-[-0.08em]
              text-orange-500
            ">
              01
            </div>

            <div className="
              mt-2
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/25
            ">
              Integrated workflow
            </div>
          </div>

          <p className="
            max-w-md
            text-sm
            text-white/30
            leading-relaxed
          ">
            From engineering and fabrication to finishing and installation,
            every capability is connected through one controlled production
            workflow.
          </p>

        </div>

      </div>

      {/* ====================================================
          SECTION EDGE
      ==================================================== */}

      <div className="
        absolute
        bottom-0
        left-0
        right-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-orange-500/30
        to-transparent
      " />
    </section>
  );
};

export default IndustriesGrid;
