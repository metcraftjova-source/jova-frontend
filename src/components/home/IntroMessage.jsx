import React from 'react';
import { BRAND_STORY } from './brandStory';

// Brand-story strip that sits directly beneath the Hero: the supporting
// statement, the approved overview paragraph, and the quality statement.
// Deliberately plain — no video/canvas/scroll-scrub.
const IntroMessage = () => {
  const { supporting, quality } = BRAND_STORY;

  return (
    <section className="relative w-full bg-black py-16 sm:py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="w-12 h-[2px] mx-auto mb-8 rounded-full"
          style={{ background: '#FF6B00' }}
        />

        {/* Supporting statement — the middle beat carries the brand orange */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-white mb-10">
          {supporting.map((line, i) => (
            <span
              key={line}
              className={`block ${i === 1 ? 'text-[#FF6B00]' : ''}`}
            >
              {line}
            </span>
          ))}
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white/85">
          From concept design and engineering to precision fabrication, architectural
          metalwork, façade solutions, doors, structural fabrication and surface
          treatment—Jova Metcraft brings the complete metalwork process under one roof.
        </p>

        {/* Quality statement */}
        <div
          className="mt-10 inline-flex items-center gap-3 rounded-full px-6 py-3 border"
          style={{ borderColor: 'rgba(255,107,0,0.45)', background: 'rgba(255,107,0,0.06)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3z" />
            <path d="M8.5 12l2.5 2.5 4.5-5" />
          </svg>
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/90">
            {quality}
          </span>
        </div>
      </div>
    </section>
  );
};

export default IntroMessage;