import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Clock, ArrowRight, FileText, Presentation, Video, Code2, Download, BookOpen, Maximize2 } from 'lucide-react';
import { FeaturedProject } from '../types';
import { ArtworkCanvas } from './ArtworkCanvas';
import { DocumentViewerModal } from './DocumentViewerModal';
import { MoMAInteractiveExplorer } from './MoMAInteractiveExplorer';
import { DoseOfRealityExplorer } from './DoseOfRealityExplorer';
import { ImageLightboxModal } from './ImageLightboxModal';

interface ProjectModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeDocModal, setActiveDocModal] = useState<'report' | 'presentation' | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !activeDocModal && !isLightboxOpen) onClose();
    };

    if (project) {
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
  }, [project, onClose, activeDocModal, isLightboxOpen]);

  if (!project) return null;

  const isComplete = project.status === 'Complete';

  const getDeliverableIcon = (format?: string, type?: string) => {
    if (format === 'PPTX' || type === 'presentation') return <Presentation className="w-4 h-4 text-[#C8442C]" />;
    if (format === 'VIDEO' || type === 'video') return <Video className="w-4 h-4 text-[#B8976C]" />;
    if (format === 'CODE' || type === 'github') return <Code2 className="w-4 h-4 text-[#8E867E]" />;
    return <FileText className="w-4 h-4 text-[#EDE8E1]" />;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        ref={contentRef}
        key={project?.id ?? 'empty'}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#161514] rounded-sm border border-[#38322C] shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-[#161514]/95 backdrop-blur-md px-6 py-4 border-b border-[#262220] flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <span className="font-mono-code text-xs text-[#B8976C] font-semibold">
              {project.catalogNo}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#38322C]" />
            {isComplete ? (
              <span className="inline-flex items-center space-x-1 text-[#EDE8E1] text-[11px] font-mono-code">
                <CheckCircle2 className="w-3 h-3 text-[#C8442C]" />
                <span>Complete</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-[#A8A096] text-[11px] font-mono-code">
                <Clock className="w-3 h-3 text-[#B8976C]" />
                <span>In Progress</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#221F1D] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Visual Header with Lightbox Expansion */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="rounded-sm overflow-hidden border border-[#2B2724] hover:border-[#B8976C] relative min-h-[220px] bg-[#100F0E] cursor-pointer group transition-all duration-300 shadow-md"
            title="Click to expand full-screen lightbox"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsLightboxOpen(true);
              }
            }}
          >
            <ArtworkCanvas type={project.visualType} isHovered={true} />
            <div className="absolute bottom-3 left-3 flex items-center space-x-2">
              <span className="px-3 py-1 bg-[#141414]/90 border border-[#332D28] text-xs font-mono-code text-[#B8976C] rounded-sm">
                {project.title}
              </span>
            </div>

            {/* Hover Expand Overlay Badge */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#141414]/90 backdrop-blur-sm border border-[#B8976C]/60 text-xs font-mono-code text-[#EDE8E1] rounded-sm shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-[#B8976C]" />
                <span>Expand Visual</span>
              </div>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDE8E1] tracking-tight">
              {project.title}
            </h2>
            <p className="font-serif-luxury text-xl text-[#B8976C] italic leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3 text-sm sm:text-base text-[#A8A096] font-sans leading-relaxed">
            <h3 className="font-mono-code text-xs text-[#8E867E] uppercase tracking-wider">
              Overview & Scope
            </h3>
            <p className="leading-relaxed">{project.description}</p>
          </div>

          {/* Key Findings (if available) */}
          {project.keyFindings && (
            <div className="space-y-3">
              <h3 className="font-mono-code text-xs text-[#8E867E] uppercase tracking-wider">
                Key Empirical Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#121110] border border-[#262220] rounded-sm">
                {project.keyFindings.map((finding, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[11px] font-mono-code text-[#8E867E] truncate">{finding.label}</div>
                    <div className="font-display text-2xl text-[#EDE8E1]">{finding.value}</div>
                    <div className="text-[10px] text-[#736B63] leading-tight">{finding.subtext}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="space-y-2">
            <span className="text-xs font-mono-code text-[#8E867E] uppercase tracking-wider block">
              Tags & Methods
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#1C1A18] text-[#C5BEB5] text-xs font-mono-code border border-[#2E2925] rounded-sm"
                >
                  {tag.startsWith('[') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links / Deliverables */}
          <div className="space-y-3">
            <span className="text-xs font-mono-code text-[#8E867E] uppercase tracking-wider block">
              Associated Deliverables & Sources (PPT / Word / Video / Pipeline)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.links.map((link, idx) => {
                const isPdf = link.url.endsWith('.pdf');
                const isReport = isPdf && link.url.includes('Report');
                const isPresentation = isPdf && (link.url.includes('Presentation') || link.type === 'presentation');

                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 bg-[#141312] border border-[#302B27] hover:border-[#B8976C] rounded-sm transition-colors group"
                  >
                    <div 
                      className="flex items-start space-x-3 cursor-pointer flex-1"
                      onClick={() => {
                        if (isReport) {
                          setActiveDocModal('report');
                        } else if (isPresentation) {
                          setActiveDocModal('presentation');
                        } else if (link.url.startsWith('#')) {
                          onClose();
                          const el = document.querySelector(link.url);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else if (link.url.startsWith('http')) {
                          window.open(link.url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      <div className="mt-0.5">{getDeliverableIcon(link.format, link.type)}</div>
                      <div>
                        <div className="text-xs font-mono-code text-[#EDE8E1] group-hover:text-white flex items-center space-x-2">
                          <span>{link.label}</span>
                          {link.format && (
                            <span className="px-1.5 py-0.2 bg-[#201D1A] text-[9px] text-[#B8976C] border border-[#332D28] rounded-xs">
                              {link.format}
                            </span>
                          )}
                        </div>
                        {link.description && (
                          <p className="text-[11px] text-[#7E776F] pt-0.5 line-clamp-2">{link.description}</p>
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
                      {isPdf ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-[#C8442C] opacity-70 group-hover:opacity-100 transition-opacity"
                          title="Open PDF in new tab"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            if (link.url.startsWith('http')) window.open(link.url, '_blank', 'noopener,noreferrer');
                          }}
                          className="p-1 text-[#C8442C] opacity-70 group-hover:opacity-100 transition-opacity"
                          title="Open Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive MoMA Explorer Section (Exclusive to The Recognition Lag) */}
          {project.id === 'recognition-lag' && (
            <div className="pt-6 border-t border-[#262220] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono-code text-[#B8976C] uppercase tracking-wider block">
                    Interactive Empirical Analysis
                  </span>
                  <h3 className="font-display text-xl text-[#EDE8E1] pt-1">
                    Explore the Interactive Study & Data Models
                  </h3>
                </div>
              </div>
              <div className="rounded-sm overflow-hidden border border-[#2B2724] bg-[#121110]">
                <MoMAInteractiveExplorer />
              </div>
            </div>
          )}

          {project.id === 'dose-of-reality' && (
            <div className="pt-6 border-t border-[#262220] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono-code text-[#B8976C] uppercase tracking-wider block">
                    Interactive Empirical Analysis
                  </span>
                  <h3 className="font-display text-xl text-[#EDE8E1] pt-1">
                    Explore the Interactive Study & Data Models
                  </h3>
                </div>
              </div>
              <div className="rounded-sm overflow-hidden border border-[#2B2724] bg-[#121110]">
                <DoseOfRealityExplorer />
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="sticky bottom-0 bg-[#161514]/95 backdrop-blur-md px-6 py-4 border-t border-[#262220] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {project.interactiveAvailable && (
              <a
                href={project.id === 'dose-of-reality' ? '#dose-explorer' : '#moma-explorer'}
                onClick={onClose}
                className="inline-flex items-center space-x-2 text-xs font-mono-code uppercase tracking-wider text-white bg-[#C8442C] hover:bg-[#D94E35] px-4 py-2.5 rounded-sm transition-colors"
              >
                <span>Launch Interactive Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono-code text-[#8E867E] hover:text-[#EDE8E1] px-3 py-2"
          >
            Close (ESC)
          </button>
        </div>
      </div>

      {/* Embedded In-App Viewer for PDF & Slides */}
      <DocumentViewerModal
        type={activeDocModal}
        project={project.id === 'dose-of-reality' ? 'dose' : 'moma'}
        onClose={() => setActiveDocModal(null)}
      />

      {/* Full-Screen Gallery Image Lightbox */}
      <ImageLightboxModal
        project={project}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
};

