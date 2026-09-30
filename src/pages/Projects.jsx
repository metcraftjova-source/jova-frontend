import React from 'react';
import ProjectsHero from '../components/projects/ProjectsHero';
import ProjectCategories from '../components/projects/ProjectCategories';
import AboutCTA from '../components/about/AboutCTA';
const Projects = () => {
return (
    <main className="min-h-dvh bg-[#050505] text-white overflow-hidden">
    <ProjectsHero />
    <ProjectCategories />
    <AboutCTA />
    </main>
);
};

export default Projects;
