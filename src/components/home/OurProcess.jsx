import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlassIcon from "./GlassIcon";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: "01",
    title: " Consultation",
    desc: "Understanding your project requirements to recommend practical and efficient solutions.",
    color: "#60a5fa",
    hoverColor: "#93c5fd",
    glow: "rgba(96,165,250,0.9)",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Design & Planning",
    desc: "Developing clear designs and detailed plans to support smooth and efficient project execution.",
    color: "#c084fc",
    hoverColor: "#d8b4fe",
    glow: "rgba(192,132,252,0.9)",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20"></path>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Precision Manufacturing",
    desc: "Producing high-quality sheet metal and architectural façade solutions using advanced manufacturing processes.",
    color: "#ff6b00",
    hoverColor: "#ff8a3d",
    glow: "rgba(255,107,0,0.9)",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <path d="M21 15l-5-5L5 21"></path>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Quality Assurance",
    desc: "Conducting thorough quality checks to ensure durability, accuracy, and consistent performance",
    color: "#4ade80",
    hoverColor: "#86efac",
    glow: "rgba(74,222,128,0.9)",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    id: "05",
    title: "Delivery & Installation",
    desc: "Providing timely delivery and professional installation to ensure every project is completed successfully",
    color: "#fbbf24",
    hoverColor: "#fde047",
    glow: "rgba(251,191,36,0.9)",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
  },
];

const stats = [
  { value: "500+", label: "Successful Projects Delivered" },
  { value: "15+", label: "Years of Engineering Excellence" },
  { value: "250+", label: "Experienced Professionals" },
  { value: "25+", label: "Industry Sectors Served" },
  { value: "1M+", label: "Sq. Ft. Precision Fabricated" },
  { value: "98%", label: "Customer Satisfaction Rate" },
];

// Simple straight connector between two consecutive steps in the row.
function StepArrow({ index = 0 }) {
  return (
    <div className="hidden md:flex items-center justify-center pt-12 px-1 lg:px-2 shrink-0" aria-hidden="true">
      <svg
        width="32"
        height="20"
        viewBox="0 0 32 20"
        fill="none"
        className="text-[#ff6b00]/70 animate-arrow-flow"
        style={{ animationDelay: `${index * 0.18}s` }}
      >
        <path
          d="M1 10 H24 M17 3 L26 10 L17 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const OurProcess = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Parallax on title
      gsap.fromTo(
        ".process-title",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        },
      );

      // Create main sequence timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      const steps = gsap.utils.toArray(".process-step");
      const stepDuration = 0.5;

      steps.forEach((step, i) => {
        const startTime = i * stepDuration;

        // 1. Icon card pops in
        const glassContainer = step.querySelector(".glass-icon-container");
        tl.fromTo(
          glassContainer,
          { scale: 0.3, opacity: 0, rotationY: -15, rotationX: -5 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            ease: "elastic.out(1, 0.5)",
            duration: 0.6,
          },
          startTime,
        );

        // 2. Icon draws itself
        const svgPaths = step.querySelectorAll(
          ".icon-svg path, .icon-svg circle, .icon-svg rect, .icon-svg polyline",
        );
        svgPaths.forEach((path) => {
          const pathLength = path.getTotalLength ? path.getTotalLength() : 100;
          tl.fromTo(
            path,
            { strokeDashoffset: pathLength, opacity: 0 },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            startTime + 0.2,
          );
        });

        // 3. Reflection sweeps across
        const reflection = step.querySelector(".reflection-layer");
        tl.fromTo(
          reflection,
          { x: "-100%", y: "-100%", opacity: 0 },
          {
            x: "100%",
            y: "100%",
            opacity: 0.8,
            duration: 0.8,
            ease: "power1.inOut",
          },
          startTime + 0.3,
        );
        tl.to(reflection, { opacity: 0, duration: 0.2 }, startTime + 0.9);

        // 4. Text content fades in
        const textContent = step.querySelectorAll(".step-text");
        tl.fromTo(
          textContent,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          startTime + 0.4,
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#0a0a0a] text-white pt-20 border-t border-white/5 flex flex-col font-sans overflow-hidden"
    >
      {/* Top Section: Process Timeline */}
      <div className="max-w-[1500px] mx-auto w-full px-6 lg:px-12 flex flex-col xl:flex-row gap-12 xl:gap-8 items-start justify-between mb-24">
        {/* Left Title */}
        <div className="process-title flex flex-col items-start w-full xl:w-[25%] flex-shrink-0 relative z-20">
          <span className="text-[#ff6b00] font-bold text-[11px] tracking-widest uppercase mb-4 block">
            Our Proven Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white">
            From Vision
            <br />
            To <span className="text-[#ff6b00]">Reality</span>
          </h2>
        </div>

        {/* Right Timeline */}
        <div className="w-full xl:w-[75%] relative mt-8 xl:mt-0">
          <style>
            {`
              @keyframes arrow-flow {
                0%, 100% { transform: translateX(0); opacity: 0.6; }
                50% { transform: translateX(6px); opacity: 1; }
              }
              .animate-arrow-flow {
                animation: arrow-flow 1.4s ease-in-out infinite;
              }
            `}
          </style>

          <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-2 relative z-10 pb-8 pt-2">
            {processSteps.map((step, index) => (
              <React.Fragment key={`process-${step.id}`}>
                <div className="process-step flex flex-col items-center text-center w-full md:w-[170px] shrink-0">
                  <GlassIcon
                    icon={step.icon}
                    id={step.id}
                    index={index}
                    color={step.color}
                    hoverColor={step.hoverColor}
                    glow={step.glow}
                  />

                  <div className="mt-6 flex flex-col items-center">
                    <h3 className="step-text text-[13px] font-semibold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="step-text text-[11px] leading-[1.6] max-w-[150px] text-gray-400">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {index < processSteps.length - 1 && <StepArrow index={index} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Stats Bar */}
      {/* <div className="w-full bg-[#111111] border-y border-white/5 py-1 relative z-20">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-x-0 lg:divide-x divide-white/10 py-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center lg:justify-start gap-4 px-4">
                <div className="flex flex-col">
                  <span className="text-[#ff6b00] font-bold text-xl md:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-[#aaaaaa] text-[11px] uppercase tracking-wider">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default OurProcess;