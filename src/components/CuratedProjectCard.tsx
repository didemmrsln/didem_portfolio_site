import React, { useState, useEffect, useRef } from 'react';
import { FeaturedProject } from '../types';
import { ArtworkCanvas } from './ArtworkCanvas';
import { isTagMatchingSkill } from '../utils/skillMatcher';
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface CuratedProjectCardProps {
  project: FeaturedProject;
  onSelect: (project: FeaturedProject) => void;
  index: number;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  selectedSkill?: string | null;
}

export const CuratedProjectCard: React.FC<CuratedProjectCardProps> = ({ 
  project, 
  onSelect, 
  index,
  isHighlighted = false,
  isDimmed = false,
  selectedSkill = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timeout = setTimeout(() => {
            setIsInView(true);
          }, Math.min(index * 90, 450));
          if (cardRef.current) observer.unobserve(cardRef.current);
          return () => clearTimeout(timeout);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [index]);

  // Layout span classes for asymmetric salon / gallery wall display
  const getSpanClass = () => {
    switch (project.layoutSpan) {
      case 'hero-gallery':
        return 'col-span-1 md:col-span-2 lg:col-span-12';
      case 'salon-portrait':
        return 'col-span-1 md:col-span-1 lg:col-span-6';
      case 'wide-landscape':
        return 'col-span-1 md:col-span-2 lg:col-span-6';
      case 'curated-square':
      default:
        return 'col-span-1 md:col-span-1 lg:col-span-6';
    }
  };

  const isComplete = project.status === 'Complete';

  return (
    <article
      ref={cardRef}
      id={`project-card-${project.id}`}
      className={`group relative bg-[#181716] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isInView ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-8 blur-[1.5px]'
      } ${
        isHighlighted
          ? 'border-2 border-[#C8442C] ring-1 ring-[#C8442C]/40 shadow-[0_16px_40px_-10px_rgba(200,68,44,0.3),0_0_24px_rgba(200,68,44,0.18)] -translate-y-1'
          : isDimmed
          ? 'border border-[#23201E] opacity-40 grayscale-[40%] hover:opacity-100 hover:grayscale-0 hover:border-[#B8976C]'
          : 'border border-[#2B2724] hover:border-[#B8976C] hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.85),0_0_28px_rgba(184,151,108,0.16)] hover:-translate-y-1'
      } ${getSpanClass()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Subtle Gold / Bronze Frame Accent (smoothly fades in on hover) */}
      <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#B8976C]/50 transition-colors duration-700 z-30" />

      {/* Decorative Gold Corner Brackets on Hover or Highlight */}
      <div className={`absolute top-2 left-2 w-2.5 h-2.5 border-t border-l ${isHighlighted ? 'border-[#C8442C] opacity-100' : 'border-[#B8976C] opacity-0 group-hover:opacity-100'} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30`} />
      <div className={`absolute top-2 right-2 w-2.5 h-2.5 border-t border-r ${isHighlighted ? 'border-[#C8442C] opacity-100' : 'border-[#B8976C] opacity-0 group-hover:opacity-100'} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30`} />
      <div className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l ${isHighlighted ? 'border-[#C8442C] opacity-100' : 'border-[#B8976C] opacity-0 group-hover:opacity-100'} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30`} />
      <div className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r ${isHighlighted ? 'border-[#C8442C] opacity-100' : 'border-[#B8976C] opacity-0 group-hover:opacity-100'} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30`} />

      {/* Top Header: Catalog No & Status Indicator */}
      <div className="p-6 md:p-8 pb-4 flex items-center justify-between border-b border-[#262220] z-20 bg-[#181716]/90 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <span className="font-mono-code text-xs tracking-widest text-[#B8976C] font-medium">
            {project.catalogNo}
          </span>
          {isHighlighted && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-[#C8442C]/15 border border-[#C8442C]/50 text-[#EDE8E1] text-[10px] font-mono-code rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8442C] animate-ping" />
              <span>Skill Matched</span>
            </span>
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {isComplete ? (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#C8442C]/15 border border-[#C8442C]/40 text-[#EDE8E1] text-[11px] font-mono-code rounded-sm">
              <CheckCircle2 className="w-3 h-3 text-[#C8442C]" />
              <span>Complete</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#262220] border border-[#3A332E] text-[#A8A096] text-[11px] font-mono-code rounded-sm">
              <Clock className="w-3 h-3 text-[#B8976C]" />
              <span>In Progress</span>
            </span>
          )}

          <div className="w-7 h-7 rounded-full border border-[#3A332E] group-hover:border-[#B8976C] group-hover:bg-[#201D1A] flex items-center justify-center transition-all duration-300 ml-2">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5BEB5] group-hover:text-[#B8976C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Main Visual Presentation */}
      <div className="flex-1 flex flex-col justify-between p-6 md:p-8 relative">
        <div className="relative w-full rounded-sm overflow-hidden border border-[#23201E] group-hover:border-[#B8976C]/70 group-hover:ring-1 group-hover:ring-[#B8976C]/30 my-2 min-h-[190px] md:min-h-[220px] transition-all duration-700 bg-[#111010]">
          <div className="w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <ArtworkCanvas type={project.visualType} isHovered={isHovered} />
          </div>

          <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#B8976C]/30 transition-all duration-700 z-10" />

          {project.interactiveAvailable && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#C8442C] text-white text-[10px] font-mono-code tracking-wider uppercase rounded-sm shadow-lg">
                <Sparkles className="w-3 h-3" />
                <span>Interactive Study</span>
              </span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="mt-4 space-y-1.5">
          <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1] group-hover:text-white transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <p className="font-serif-luxury italic text-lg md:text-xl text-[#B8976C] leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="mt-4 text-[#A8A096] font-sans text-sm md:text-base leading-relaxed">
          <p>{project.description}</p>
        </div>

        {/* Key Findings Preview (if available) */}
        {project.keyFindings && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[#262220]">
            {project.keyFindings.map((finding, fIdx) => (
              <div key={fIdx} className="p-2.5 bg-[#141414] border border-[#282421] rounded-sm">
                <span className="text-[10px] font-mono-code text-[#8E867E] block truncate">
                  {finding.label}
                </span>
                <span className="font-display text-base sm:text-lg text-[#EDE8E1] font-medium block">
                  {finding.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tags & Links */}
        <div className="mt-6 pt-4 border-t border-[#262220] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tIdx) => {
              const isTagHighlighted = isTagMatchingSkill(tag, selectedSkill);

              return (
                <span
                  key={tIdx}
                  className={`px-2.5 py-1 text-xs font-mono-code rounded-sm transition-all duration-300 ${
                    isTagHighlighted
                      ? 'bg-[#C8442C]/25 border border-[#C8442C] text-[#EDE8E1] font-semibold shadow-[0_0_10px_rgba(200,68,44,0.3)]'
                      : 'bg-[#1F1D1B] border border-[#2B2724] text-[#C5BEB5]'
                  }`}
                >
                  {tag.startsWith('[') ? tag : `#${tag}`}
                </span>
              );
            })}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.links.map((link, lIdx) => (
              <span
                key={lIdx}
                className="inline-flex items-center space-x-1 text-xs font-mono-code text-[#B8976C] group-hover:underline underline-offset-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3 text-[#C8442C]" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle bottom gold/rust bar */}
      <div className={`h-[2px] w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHighlighted
          ? 'bg-gradient-to-r from-[#C8442C] via-[#B8976C] to-[#C8442C]'
          : 'bg-[#262220] group-hover:bg-gradient-to-r group-hover:from-[#B8976C] group-hover:via-[#C8442C] group-hover:to-[#B8976C]'
      }`} />
    </article>
  );
};

