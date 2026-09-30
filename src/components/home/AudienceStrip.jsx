import React from 'react';
import { useLenis } from 'lenis/react';
import { PencilRuler, Cog, HardHat, ClipboardCheck, ArrowRight, FileUp } from 'lucide-react';
import { openEnquiry } from './enquiry';

// Answers "is this for me?" within seconds for each type of buyer, then puts
// the two conversion paths (project enquiry / drawing upload) right there.
const audiences = [
  {
    icon: PencilRuler,
    title: 'Architects & Designers',
    text: 'Façade, cladding and decorative metalwork engineered from your design intent.',
  },
  {
    icon: Cog,
    title: 'OEMs & Manufacturers',
    text: 'Precision fabrication and finishing, built to your drawings and specifications.',
  },
  {
    icon: HardHat,
    title: 'Contractors & Developers',
    text: 'Doors, façades and structural fabrication, coordinated through one partner.',
  },
  {
    icon: ClipboardCheck,
    title: 'Procurement Teams',
    text: 'One accountable partner from engineering through inspection to delivery.',
  },
];

const AudienceStrip = () => {
  const lenis = useLenis();

  return (
    <section className="relative w-full bg-black pb-16 sm:pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[#FF6B00] text-xs font-bold tracking-[0.3em] uppercase mb-8">
          Who we work with
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[#FF6B00]/50"
            >
              <div className="w-11 h-11 rounded-xl border border-[#FF6B00]/25 bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-5">
                <Icon size={20} />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openEnquiry('enquiry', lenis)}
            className="h-12 sm:h-14 inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 rounded-full text-sm font-semibold uppercase tracking-wide transition-transform duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(145deg, #FF7A00, #FF6B00)',
              color: '#1a1310',
              boxShadow: '0 8px 24px rgba(255,107,0,0.35)',
            }}
          >
            Start a Project Enquiry
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => openEnquiry('upload', lenis)}
            className="h-12 sm:h-14 inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 rounded-full text-sm font-semibold uppercase tracking-wide border border-white/40 text-white transition-colors duration-200 hover:border-[#FF6B00] hover:text-[#FF6B00]"
          >
            <FileUp size={16} />
            Upload Drawings
          </button>
        </div>
      </div>
    </section>
  );
};

export default AudienceStrip;