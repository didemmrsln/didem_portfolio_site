import React, { useMemo } from 'react';
import { FeaturedProject } from '../types';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { CuratedProjectCard } from './CuratedProjectCard';
import { isSkillMatchingProject } from '../utils/skillMatcher';
import { Search, X, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: FeaturedProject) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  selectedSkill?: string | null;
  onSelectSkill?: (skill: string | null) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onSelectProject,
  searchQuery = '',
  onClearSearch,
  selectedSkill = null,
  onSelectSkill,
}) => {
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return FEATURED_PROJECTS;

    return FEATURED_PROJECTS.filter((project) => {
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSubtitle = project.subtitle?.toLowerCase().includes(q) ?? false;
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTags = project.tags.some(tag => tag.toLowerCase().includes(q));
      const matchCatalog = project.catalogNo?.toLowerCase().includes(q) ?? false;

      return matchTitle || matchSubtitle || matchDesc || matchTags || matchCatalog;
    });
  }, [searchQuery]);

  const isFiltering = Boolean(searchQuery.trim());

  // Count matching projects for selected skill
  const matchingSkillCount = useMemo(() => {
    if (!selectedSkill) return 0;
    return filteredProjects.filter(p => isSkillMatchingProject(p, selectedSkill)).length;
  }, [filteredProjects, selectedSkill]);

  return (
    <section id="featured-work" className="py-24 md:py-36 bg-[#100F0E] relative border-b border-[#24211E] transition-colors duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#262220] gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Selected Research & Applied Works
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#EDE8E1] tracking-tight">
              Featured Work
            </h2>
            <p className="font-serif-luxury text-xl text-[#A8A096] italic leading-relaxed font-light">
              Pieces arranged in an asymmetric gallery wall layout, balancing empirical rigor with aesthetic clarity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 font-mono-code text-xs">
            {/* Search Filter Pill */}
            {isFiltering && (
              <div className="flex items-center space-x-2 bg-[#1C1917] border border-[#38302A] px-3 py-1.5 rounded-sm">
                <span className="text-[#8E867E]">Search:</span>
                <span className="text-[#C8442C] font-semibold truncate max-w-[140px]">
                  "{searchQuery}"
                </span>
                {onClearSearch && (
                  <button
                    onClick={onClearSearch}
                    className="text-[#8E867E] hover:text-[#EDE8E1] ml-1 cursor-pointer"
                    aria-label="Clear filter"
                    title="Clear filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Selected Skill Highlight Pill */}
            {selectedSkill && (
              <div className="flex items-center space-x-2 bg-[#221816] border border-[#C8442C]/50 px-3 py-1.5 rounded-sm shadow-[0_0_12px_rgba(200,68,44,0.15)]">
                <Sparkles className="w-3 h-3 text-[#C8442C]" />
                <span className="text-[#8E867E]">Skill:</span>
                <span className="text-[#EDE8E1] font-semibold truncate max-w-[160px]">
                  {selectedSkill}
                </span>
                <span className="text-[10px] text-[#C8442C] bg-[#C8442C]/15 px-1.5 py-0.2 rounded-sm font-semibold">
                  {matchingSkillCount} matched
                </span>
                {onSelectSkill && (
                  <button
                    onClick={() => onSelectSkill(null)}
                    className="text-[#8E867E] hover:text-[#EDE8E1] ml-1 p-0.5 rounded hover:bg-[#33201D] transition-colors cursor-pointer"
                    aria-label="Clear skill highlight"
                    title="Clear skill highlight"
                  >
                    <X className="w-3 h-3 text-[#C8442C]" />
                  </button>
                )}
              </div>
            )}

            <div className="text-[#8E867E] self-start sm:self-auto py-1">
              <span>
                {isFiltering
                  ? `${filteredProjects.length} of ${FEATURED_PROJECTS.length} Works`
                  : `${FEATURED_PROJECTS.length} Works Curated`}
              </span>
            </div>
          </div>
        </div>

        {/* Asymmetric Curated Gallery Wall Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => {
              const isHighlighted = selectedSkill
                ? isSkillMatchingProject(project, selectedSkill)
                : false;
              const isDimmed = selectedSkill ? !isHighlighted : false;

              return (
                <CuratedProjectCard
                  key={project.id}
                  project={project}
                  onSelect={onSelectProject}
                  index={index}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  selectedSkill={selectedSkill}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 px-8 text-center bg-[#161413] border border-[#2B2622] rounded-sm max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#201D1A] text-[#8E867E] border border-[#302B27] flex items-center justify-center mx-auto">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl text-[#EDE8E1]">No Works Found</h3>
            <p className="text-sm text-[#9E968D] font-sans leading-relaxed">
              No cataloged projects match &ldquo;<span className="text-[#C8442C]">{searchQuery}</span>&rdquo;. Try searching for Python, SQL, Survival Analysis, MoMA, or Biostatistics.
            </p>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-[#262220] hover:bg-[#C8442C] text-[#EDE8E1] hover:text-white font-mono-code text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                <span>Reset Search Filter</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

