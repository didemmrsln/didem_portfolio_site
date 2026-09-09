import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight, ExternalLink, Tag, FileText, Presentation, Video, Code2, Download } from 'lucide-react';
import { BootcampCategory } from '../types';

interface BootcampCategoryModalProps {
  category: BootcampCategory | null;
  onClose: () => void;
}

export const BootcampCategoryModal: React.FC<BootcampCategoryModalProps> = ({
  category,
  onClose,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [category]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (category) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [category, onClose]);

  if (!category) return null;

  const getDeliverableIcon = (format?: string, type?: string) => {
    if (format === 'PPTX' || type === 'presentation') return <Presentation className="w-4 h-4 text-[#C8442C]" />;
    if (format === 'VIDEO' || type === 'video') return <Video className="w-4 h-4 text-[#B8976C]" />;
    if (format === 'CODE' || type === 'repo' || type === 'github') return <Code2 className="w-4 h-4 text-[#8E867E]" />;
    return <FileText className="w-4 h-4 text-[#EDE8E1]" />;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bootcamp-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#161514] rounded-sm border border-[#38322C] shadow-2xl flex flex-col overflow-hidden select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="shrink-0 bg-[#161514] px-6 py-4 border-b border-[#262220] flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <span className="font-mono-code text-xs text-[#B8976C] font-semibold">
              {category.categoryNumber}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38322C]" />
            <span className="inline-flex items-center space-x-1 text-[#EDE8E1] text-[11px] font-mono-code">
              <CheckCircle2 className="w-3 h-3 text-[#C8442C]" />
              <span>{category.completedProjects.length} Projects Completed</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#221F1D] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body - Scrollable Container */}
        <div 
          ref={contentRef}
          key={category?.id ?? 'empty'}
          className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-10 space-y-8"
        >
          {/* Section A: Category Title, Description & Tags */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {category.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 bg-[#1F1C1B] border border-[#2F2A26] text-[#A8A096] text-[11px] font-mono-code rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h2
              id="bootcamp-modal-title"
              className="font-display text-3xl sm:text-4xl text-[#EDE8E1] tracking-tight"
            >
              {category.categoryTitle}
            </h2>

            <p className="text-sm sm:text-base text-[#A8A096] font-sans leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Section B: Projects Completed List */}
          <div className="space-y-4 pt-6 border-t border-[#262220]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#B8976C]" />
                <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#B8976C] font-semibold">
                  Projects Completed
                </h3>
              </div>
              <span className="text-[11px] font-mono-code text-[#736B63]">
                {category.completedProjects.length} exercises cataloged
              </span>
            </div>

            <div className="bg-[#121110] border border-[#262220] rounded-sm p-4 sm:p-5">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {category.completedProjects.map((projectName, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#8E867E] font-mono-code flex items-start space-x-2.5 leading-relaxed py-0.5"
                  >
                    <span className="text-[#C8442C] select-none font-bold text-xs mt-0.5">
                      ›
                    </span>
                    <span className="text-[#A8A096]">{projectName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section C: Featured Projects */}
          <div className="space-y-4 pt-6 border-t border-[#262220]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C8442C]" />
              <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#C8442C] font-semibold">
                Featured Highlights
              </h3>
            </div>

            <div className="space-y-4">
              {category.featuredProjects.map((featured, idx) => (
                <div
                  key={idx}
                  className="bg-[#121110] border border-[#2B2724] hover:border-[#3E3833] rounded-sm p-5 space-y-3 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-display text-base sm:text-lg font-semibold text-[#EDE8E1] group-hover:text-white leading-snug">
                      {featured.title}
                    </h4>
                    <span className="font-mono-code text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#1C1A18] text-[#B8976C] border border-[#2E2925] rounded-xs shrink-0">
                      Featured
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9E968D] font-sans leading-relaxed">
                    {featured.description}
                  </p>

                  {/* Tags & Methods */}
                  {((featured.methods && featured.methods.length > 0) || (featured.tags && featured.tags.length > 0)) && (
                    <div className="space-y-2 pt-3 border-t border-[#201D1A]">
                      <span className="text-xs font-mono-code text-[#8E867E] uppercase tracking-wider block">
                        Tags & Methods
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(featured.methods || featured.tags)?.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 bg-[#1C1A18] text-[#C5BEB5] text-xs font-mono-code border border-[#2E2925] rounded-sm"
                          >
                            {tag.startsWith('[') ? tag : `#${tag}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured Project Deliverables / Links or Placeholder */}
                  <div className="pt-4 border-t border-[#201D1A] space-y-3">
                    {featured.links && featured.links.length > 0 ? (
                      <div className="space-y-2.5">
                        <span className="text-[11px] font-mono-code text-[#8E867E] uppercase tracking-wider block">
                          Associated Deliverables & Sources (PDF / Code)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {featured.links.map((link, lIdx) => {
                            const isPdf = link.url.endsWith('.pdf');

                            return (
                              <div
                                key={lIdx}
                                className="flex items-start justify-between p-3 bg-[#141312] border border-[#302B27] hover:border-[#B8976C] rounded-sm transition-colors group/item"
                              >
                                <div
                                  className="flex items-start space-x-3 cursor-pointer flex-1"
                                  onClick={() => {
                                    window.open(link.url, '_blank', 'noopener,noreferrer');
                                  }}
                                >
                                  <div className="mt-0.5">{getDeliverableIcon(link.format, link.type)}</div>
                                  <div>
                                    <div className="text-xs font-mono-code text-[#EDE8E1] group-hover/item:text-white flex items-center space-x-2">
                                      <span className="font-semibold">{link.label}</span>
                                      {link.format && (
                                        <span className="px-1.5 py-0.2 bg-[#201D1A] text-[9px] text-[#B8976C] border border-[#332D28] rounded-xs font-normal">
                                          {link.format}
                                        </span>
                                      )}
                                    </div>
                                    {link.description ? (
                                      <p className="text-[11px] text-[#7E776F] pt-0.5 line-clamp-2">
                                        {link.description}
                                      </p>
                                    ) : (
                                      <p className="text-[11px] text-[#7E776F] pt-0.5 line-clamp-2">
                                        Access project {link.label}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center space-x-1.5 ml-2 shrink-0">
                                  {isPdf && (
                                    <a
                                      href={link.url}
                                      download={link.url.replace('/', '')}
                                      className="p-1 text-[#7A726A] hover:text-[#B8976C] transition-colors"
                                      title="Download PDF"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </a>
                                  )}
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 text-[#C8442C] opacity-70 group-hover/item:opacity-100 transition-opacity"
                                    title="Open in new tab"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="inline-flex items-center space-x-1.5 text-xs font-mono-code text-[#B8976C] hover:text-[#EDE8E1] transition-colors"
                          title="Project artifact in preparation"
                        >
                          <span>View Project</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C8442C] group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <span className="text-[10px] font-mono-code text-[#6E665E]">
                          Notebook / Artifact
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 bg-[#141312] border-t border-[#262220] px-6 py-4 flex items-center justify-between z-20">
          <span className="text-xs font-mono-code text-[#736B63]">
            Curriculum Specimen // {category.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#201D1B] hover:bg-[#2A2623] text-[#EDE8E1] border border-[#302B27] rounded-sm font-mono-code text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
