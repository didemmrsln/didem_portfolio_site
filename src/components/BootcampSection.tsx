import React from 'react';
import { BOOTCAMP_PROJECTS } from '../data/portfolioData';
import { BootcampCategory } from '../types';
import { useCountUp } from '../hooks/useCountUp';
import { Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

interface BootcampCardProps {
  category: BootcampCategory;
  onSelect: (category: BootcampCategory) => void;
}

const BootcampCard: React.FC<BootcampCardProps> = ({ category, onSelect }) => {
  const { formatted, ref } = useCountUp(category.completedProjects.length, {
    duration: 1000,
  });

  return (
    <div
      id={`bootcamp-card-${category.id}`}
      onClick={() => onSelect(category)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(category);
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative bg-[#161413] border border-[#282421] hover:border-[#B8976C] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7),0_0_18px_rgba(184,151,108,0.12)] transition-all duration-300 rounded-sm p-6 sm:p-7 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B8976C]"
      aria-label={`Open ${category.categoryTitle} project details`}
    >
      {/* Thin bronze/gold border hover transition */}
      <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#B8976C]/30 transition-colors duration-300 rounded-sm" />

      <div className="space-y-4">
        {/* Top Ledger: Track number + Tag pills */}
        <div className="flex items-center justify-between pb-3 border-b border-[#23201E] gap-2">
          <span className="font-mono-code text-[11px] text-[#C8442C] tracking-wider font-semibold">
            {category.categoryNumber}
          </span>
          <div className="flex flex-wrap items-center gap-1 justify-end">
            {category.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#1F1C1B] border border-[#2F2A26] text-[#A8A096] text-[10px] font-mono-code rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Category Title */}
        <h3 className="font-display text-xl sm:text-2xl text-[#EDE8E1] group-hover:text-white transition-colors duration-300">
          {category.categoryTitle}
        </h3>

        {/* Short Category Description (1-2 sentences) */}
        <p className="text-xs sm:text-sm text-[#9E968D] font-sans leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Bottom Footer: Completed Counter + "View Projects" indicator */}
      <div className="mt-8 pt-4 border-t border-[#23201E] flex items-center justify-between">
        <div
          ref={ref}
          className="flex items-center space-x-1.5 text-xs font-mono-code text-[#B8976C]"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8976C]" />
          <span>{formatted} projects completed</span>
        </div>

        <div className="inline-flex items-center space-x-1.5 text-xs font-mono-code text-[#EDE8E1] group-hover:text-[#C8442C] transition-colors">
          <span>View Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C8442C] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

interface BootcampSectionProps {
  onSelectCategory: (category: BootcampCategory) => void;
}

export const BootcampSection: React.FC<BootcampSectionProps> = ({ onSelectCategory }) => {
  const totalCompletedProjects = BOOTCAMP_PROJECTS.reduce(
    (acc, cat) => acc + cat.completedProjects.length,
    0
  );

  return (
    <section id="bootcamp-projects" className="py-24 md:py-32 bg-[#151413] border-b border-[#24211E] relative transition-colors duration-500 ease-in-out">
      {/* Grid texture for lab notebook vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1817_1px,transparent_1px),linear-gradient(to_bottom,#1A1817_1px,transparent_1px)] bg-[size:32px_32px] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Lab Notebook Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#262220] gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Lab Notebook // Exercises & Sprints
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDE8E1] tracking-tight">
              Bootcamp Projects
            </h2>
            <p className="text-sm sm:text-base text-[#9E968D] font-sans leading-relaxed">
              A structured log of targeted curriculum exercises, algorithmic benchmarks, and data science sprints across machine learning, pipelines, statistical analytics, and business intelligence.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#181615] border border-[#2B2724] text-xs font-mono-code text-[#8E867E] rounded-sm self-start md:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8976C]" />
            <span>{BOOTCAMP_PROJECTS.length} Focus Tracks ({totalCompletedProjects} Completed Projects)</span>
          </div>
        </div>

        {/* Compact Lab Notebook Grid (5 Compact Summary Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BOOTCAMP_PROJECTS.map((category) => (
            <BootcampCard
              key={category.id}
              category={category}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

