import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0C0B] text-[#8E867E] py-16 border-t border-[#24211E] transition-colors duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#221F1D]">
          <div className="space-y-2">
            <span className="font-display text-2xl text-[#EDE8E1]">
              {PERSONAL_INFO.name}
            </span>
            <p className="font-serif-luxury italic text-sm text-[#B8976C]">
              Data Scientist & Creative Researcher
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono-code text-xs text-[#A8A096]">
            <a href="#about" className="hover:text-[#C8442C] transition-colors">About</a>
            <a href="#featured-work" className="hover:text-[#C8442C] transition-colors">Featured Work</a>
            <a href="#bootcamp-projects" className="hover:text-[#C8442C] transition-colors">Bootcamp Projects</a>
            <a href="#contact" className="hover:text-[#C8442C] transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-code text-xs text-[#736B63]">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
            <span className="text-[#3A332E]">|</span>
            <a
              href="https://github.com/didemmrsln"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-[#A8A096] hover:text-[#EDE8E1] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5 text-[#B8976C]" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/didem-arslan-yenihayat-24303688"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-[#A8A096] hover:text-[#EDE8E1] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#B8976C]" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <span>Portfolio & Atelier Archive</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-[#EDE8E1] hover:text-[#C8442C] transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
