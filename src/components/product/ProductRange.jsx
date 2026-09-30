import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import ShapeGrid from '../ShapeGrid';
import AnimatedGlassIcon from './icons/AnimatedGlassIcon';
import {
  PerforatedPanelIcon,
  TrainPlatformDoorIcon,
  FixedPanelIcon,
  AluminiumMetalDoorIcon,
  InteriorCladdingIcon,
  CurvedAluminiumProfileIcon,
  CustomAssemblyIcon
} from './icons/FacadeIcons';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: '01',
    slug: 'train-platform-doors',
    title: 'Train Platform Doors',
    description: 'Precision-fabricated door systems with structural sealant application and project-specific assemblies for rail and metro platforms.',
    image: '/assets/solid_aluminum_1784535395272.png',
    icon: <TrainPlatformDoorIcon className="w-full h-full" />
  },
  {
    id: '02',
    slug: 'fixed-panels',
    title: 'Fixed Panels',
    description: 'Precision-fabricated panel systems with structural sealant application, engineered for project-specific platform and façade assemblies.',
    image: '/assets/insulated_metal_1784535405781.png',
    icon: <FixedPanelIcon className="w-full h-full" />
  },
  {
    id: '03',
    slug: 'aluminium-metal-doors',
    title: 'Aluminium & Metal Doors',
    description: 'Durable, precision-engineered aluminium and metal door systems built for demanding commercial and industrial environments.',
    image: '/assets/standing_seam_1784535461444.png',
    icon: <AluminiumMetalDoorIcon className="w-full h-full" />
  },
  {
    id: '04',
    slug: 'interior-cladding',
    title: 'Interior Cladding',
    description: 'Decorative and functional metal cladding systems that elevate interior walls, feature walls and ceilings with a refined finish.',
    image: '/assets/cassette_panel_1784535497827.png',
    icon: <InteriorCladdingIcon className="w-full h-full" />
  },
  {
    id: '05',
    slug: 'decorative-panels',
    title: 'Decorative & Perforated Panels',
    description: 'Custom hole patterns and decorative profiles that bring solar shading, acoustic control and visual character to any elevation.',
    image: '/assets/perforated_metal_1784535530626.png',
    icon: <PerforatedPanelIcon className="w-full h-full" />
  },
  {
    id: '06',
    slug: 'curved-aluminium-profiles',
    title: 'Curved Aluminium Profiles',
    description: 'Rolled and formed aluminium profiles engineered to precise curvature for distinctive architectural and façade geometries.',
    image: '/assets/corrugated_metal_1784535514187.png',
    icon: <CurvedAluminiumProfileIcon className="w-full h-full" />
  },
  {
    id: '07',
    slug: 'custom-architectural-assemblies',
    title: 'Custom Architectural Metal Assemblies',
    description: 'Bespoke, project-specific metal assemblies engineered and fabricated to meet unique architectural and structural requirements.',
    image: '/assets/solid_aluminum_1784535395272.png',
    icon: <CustomAssemblyIcon className="w-full h-full" />
  }
];

const ProductRange = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const { hash } = useLocation();
  const lenis = useLenis();
  const [highlightedSlug, setHighlightedSlug] = useState(null);

  // Scroll to and briefly highlight the matching card when arriving via a
  // Products submenu link, e.g. '/products#fixed-panels'.
  useEffect(() => {
    if (!hash) return;
    const slug = hash.replace('#', '');
    const timer = setTimeout(() => {
      const element = document.getElementById(slug);
      if (!element) return;
      setHighlightedSlug(slug);
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -100,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      const removeTimer = setTimeout(() => setHighlightedSlug(null), 3000);
      return () => clearTimeout(removeTimer);
    }, 100);
    return () => clearTimeout(timer);
  }, [hash, lenis]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.section-header', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards Staggered Animation using a single trigger on the grid
      gsap.fromTo('.product-card',
        { 
          y: 100, 
          opacity: 0,
          rotationX: 10
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );

      // Refresh ScrollTrigger to ensure accurate trigger calculations after render
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030303] py-32 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden">
      {/* Background SVG Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.03]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
          <polygon points="100,0 100,100 0,100" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="section-header flex flex-col items-center justify-center text-center mb-24 relative z-10">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-[1px] w-12 bg-[#ff5c00]"></div>
          <span className="text-[#ff5c00] font-bold tracking-widest text-sm uppercase">Specialised Products</span>
          <div className="h-[1px] w-12 bg-[#ff5c00]"></div>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
          Products That Deserve <br/> <span className="text-gray-500 font-light">Dedicated Visibility</span>
        </h2>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {products.map((product, i) => (
          <div 
            key={product.id} 
            id={product.slug}
            className={`product-card group relative h-[500px] w-full rounded-2xl overflow-hidden cursor-pointer bg-[#050505] shadow-2xl transition-all duration-500 ${
              highlightedSlug === product.slug ? 'ring-2 ring-[#ff5c00] scale-[1.02] z-10' : ''
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black opacity-100 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent h-2/3 bottom-0 top-auto"></div>
            </div>

            {/* Top Bar: Icon & Number */}
            <div className="absolute top-6 w-full px-8 flex justify-between items-start z-20">
              <AnimatedGlassIcon>
                {product.icon}
              </AnimatedGlassIcon>
              <span className="text-5xl font-black text-white/10 group-hover:text-white/30 transition-colors duration-500 font-sans tracking-tighter">
                {product.id}
              </span>
            </div>

            {/* Content (Bottom) */}
            <div className="absolute bottom-0 w-full p-8 z-20 flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#ff5c00] transition-colors duration-300 leading-tight drop-shadow-lg">
                {product.title}
              </h3>
              
              {/* Accordion Reveal using CSS Grid */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                  <div className="pt-2">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Glow Border */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-[#ff5c00]/50 z-30 transition-colors duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductRange;