import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BootcampSection } from './components/BootcampSection';
import { ContactSection } from './components/ContactSection';
import { SectionDivider } from './components/SectionDivider';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { BootcampCategoryModal } from './components/BootcampCategoryModal';
import { FadeInSection } from './components/FadeInSection';
import { AudioPlayer } from './components/AudioPlayer';
import { FeaturedProject, BootcampCategory } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [selectedBootcampCategory, setSelectedBootcampCategory] = useState<BootcampCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProject = (project: FeaturedProject) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#E5E0D8] flex flex-col selection:bg-[#C8442C] selection:text-white antialiased font-sans">
      {/* Top Fixed Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-[#24211E]/40"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      >
        <div
          className="h-full bg-gradient-to-r from-[#C8442C] via-[#D94E35] to-[#B8976C] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(200,68,44,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Fixed Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Floor */}
      <main className="flex-1">
        {/* 1. Hero: Name + Inquiry Statement */}
        <FadeInSection threshold={0.01} delay={40}>
          <HeroSection />
        </FadeInSection>

        <SectionDivider />

        {/* 2. About: Narrative & Profile Photo with Hover Treatment */}
        <FadeInSection threshold={0.08} delay={80}>
          <AboutSection />
        </FadeInSection>

        <SectionDivider />

        {/* 3. Technical Skills: Core tools and methods */}
        <FadeInSection threshold={0.08} delay={80}>
          <TechnicalSkillsSection
            selectedSkill={selectedSkill}
            onSelectSkill={setSelectedSkill}
          />
        </FadeInSection>

        <SectionDivider />

        {/* 4. Featured Work: Curated Gallery Wall */}
        <FadeInSection threshold={0.08} delay={80}>
          <ProjectsSection
            onSelectProject={handleOpenProject}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
            selectedSkill={selectedSkill}
            onSelectSkill={setSelectedSkill}
          />
        </FadeInSection>

        <SectionDivider />

        {/* 4. Bootcamp Projects: Lab Notebook Sprints */}
        <FadeInSection threshold={0.08} delay={80}>
          <BootcampSection onSelectCategory={setSelectedBootcampCategory} />
        </FadeInSection>

        <SectionDivider />

        {/* 5. Contact: Inquiries & Direct Outreach */}
        <FadeInSection threshold={0.08} delay={80}>
          <ContactSection />
        </FadeInSection>
      </main>

      {/* Footer */}
      <FadeInSection threshold={0.05} delay={50} direction="none">
        <Footer />
      </FadeInSection>

      {/* Floating Atelier Audio Player */}
      <AudioPlayer />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
      />

      {/* Bootcamp Category Modal */}
      <BootcampCategoryModal
        category={selectedBootcampCategory}
        onClose={() => setSelectedBootcampCategory(null)}
      />
    </div>
  );
}
