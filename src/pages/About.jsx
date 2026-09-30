import React from 'react';

import ImageSequenceHero from '../components/about/ImageSequenceHero';
import AboutCapabilities from '../components/about/AboutCapabilities';
import VisionMission from '../components/about/VisionMission';
import Founders from '../components/about/Founders';
import AboutCTA from '../components/about/AboutCTA';

export default function About() {
  return (
    <main className="bg-[#050606] min-h-dvh text-white overflow-hidden">
      <ImageSequenceHero />

      <AboutCapabilities />

      <VisionMission />

      <Founders />

      <AboutCTA />
    </main>
  );
}
