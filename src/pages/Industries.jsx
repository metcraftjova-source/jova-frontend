import React from 'react';
import IndustriesHero from '../components/industries/IndustriesHero';
import IndustriesGrid from '../components/industries/IndustriesGrid';
import AboutCTA from '../components/about/AboutCTA';

const Industries = () => {
  return (
    <div className="bg-white min-h-dvh">
      <IndustriesHero />
      <IndustriesGrid />
      <AboutCTA />
    </div>
  );
};

export default Industries;