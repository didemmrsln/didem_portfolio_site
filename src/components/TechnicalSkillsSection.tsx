import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface SkillCategory {
  number: string;
  title: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: '01',
    title: 'Programming & Analysis',
    skills: [
      'Python (pandas, NumPy, scikit-learn, matplotlib, seaborn, Plotly)',
      'SQL',
    ],
  },
  {
    number: '02',
    title: 'Data Engineering & Pipelines',
    skills: [
      'BigQuery',
      'dbt',
      'Fivetran',
      'Git / GitHub',
    ],
  },
  {
    number: '03',
    title: 'Visualization & BI',
    skills: [
      'Power BI (DAX)',
      'Looker Studio',
    ],
  },
  {
    number: '04',
    title: 'Analytical Methods',
    skills: [
      'Hypothesis Testing',
      'Regression Modeling',
      'Clustering',
      'Classification',
    ],
  },
];

interface TechnicalSkillsSectionProps {
  selectedSkill?: string | null;
  onSelectSkill?: (skill: string | null) => void;
}

export const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({
  selectedSkill = null,
  onSelectSkill,
}) => {
  const handleSkillClick = (skill: string) => {
    if (!onSelectSkill) return;
    if (selectedSkill === skill) {
      onSelectSkill(null);
    } else {
      onSelectSkill(skill);
    }
  };

  return (
    <section
      id="technical-skills"
      className="py-24 md:py-32 bg-[#171615] border-b border-[#24211E] relative transition-colors duration-500 ease-in-out"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Curatorial Section Header */}
        <div className="pb-10 border-b border-[#262220] mb-14 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Toolkit & Methodology
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#EDE8E1] tracking-tight">
              Technical Skills
            </h2>
            <p className="text-sm sm:text-base text-[#9E968D] font-sans leading-relaxed pt-1">
              Core tools and methods across the full analytics lifecycle — from raw data to statistical inference.
              <span className="hidden sm:inline text-[#736B63] ml-2">
                Click any skill to highlight related projects in Featured Work.
              </span>
            </p>
          </div>

          {/* Active Highlight Indicator Pill */}
          {selectedSkill && (
            <div className="flex items-center space-x-2 bg-[#221816] border border-[#C8442C]/50 px-3.5 py-2 rounded-sm self-start md:self-auto shadow-[0_0_16px_rgba(200,68,44,0.18)]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8442C] animate-pulse" />
              <span className="font-mono-code text-xs text-[#9E968D]">Highlighting:</span>
              <span className="font-mono-code text-xs text-[#EDE8E1] font-semibold max-w-[150px] sm:max-w-[200px] truncate">
                {selectedSkill}
              </span>
              <button
                onClick={() => onSelectSkill?.(null)}
                className="text-[#8E867E] hover:text-[#EDE8E1] ml-1 p-0.5 hover:bg-[#33201D] rounded transition-colors cursor-pointer"
                aria-label="Clear active skill highlight"
                title="Clear highlight"
              >
                <X className="w-3.5 h-3.5 text-[#C8442C]" />
              </button>
            </div>
          )}
        </div>

        {/* 4-Column Minimalist Typography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.number}
              id={`skills-col-${category.number}`}
              className="space-y-4 flex flex-col"
            >
              {/* Column Title */}
              <h3 className="font-display text-xl sm:text-2xl text-[#EDE8E1] leading-snug">
                {category.title}
              </h3>

              {/* Thin Divider */}
              <div className="w-full h-[1px] bg-[#262220] my-1" />

              {/* Interactive Skills List */}
              <ul className="space-y-2 pt-1">
                {category.skills.map((skill, idx) => {
                  const isSelected = selectedSkill === skill;

                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => handleSkillClick(skill)}
                        aria-pressed={isSelected}
                        className={`w-full text-left px-3 py-2 rounded-sm text-sm font-sans leading-relaxed flex items-start space-x-2.5 transition-all duration-300 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#221816] border-[#C8442C]/80 text-[#EDE8E1] shadow-[0_0_14px_rgba(200,68,44,0.18)] translate-x-0.5'
                            : 'bg-transparent border-transparent hover:bg-[#1E1C1A] hover:border-[#2C2724] text-[#9E968D] hover:text-[#EDE8E1]'
                        }`}
                      >
                        <span
                          className={`font-mono-code select-none mt-0.5 text-xs transition-colors duration-300 ${
                            isSelected ? 'text-[#C8442C] scale-125' : 'text-[#C8442C]'
                          }`}
                        >
                          •
                        </span>
                        <span className="flex-1">
                          {skill}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono-code text-[#14110F] bg-[#B8976C] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider self-center shadow-sm">
                            Active
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

