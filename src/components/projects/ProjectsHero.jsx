import React from 'react';

const ProjectsHero = () => {
  return (
    <div className="relative w-full min-h-[60dvh] flex flex-col justify-center bg-[#111315] overflow-hidden pt-32 pb-20 px-6 md:px-12 lg:px-24">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6b00]/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-4xl relative z-10">
        <span className="text-[#ff6b00] font-bold text-[11px] tracking-widest uppercase mb-4 block">
          Our Work
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white uppercase tracking-wide leading-tight mb-6">
          Selected <span className="text-[#ff6b00]">Projects</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
          From platform door systems to architectural façades, structural steel to decorative
          metalwork — a look at how we take a project from engineering through to finished
          installation.
        </p>
      </div>
    </div>
  );
};

export default ProjectsHero;