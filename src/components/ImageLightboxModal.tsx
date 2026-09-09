import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, Sparkles, Tag } from 'lucide-react';
import { FeaturedProject } from '../types';
import { ArtworkCanvas } from './ArtworkCanvas';

interface ImageLightboxModalProps {
  project: FeaturedProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === '+' || e.key === '=') {
          setZoomLevel((prev) => Math.min(2.5, prev + 0.25));
        } else if (e.key === '-' || e.key === '_') {
          setZoomLevel((prev) => Math.max(0.75, prev - 0.25));
        } else if (e.key === '0') {
          setZoomLevel(1);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(2.5, prev + 0.25));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(0.75, prev - 0.25));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Lightbox View`}
    >
      {/* Lightbox Top Control Bar */}
      <div
        className="w-full bg-[#121110]/90 border-b border-[#262220] px-6 py-4 flex items-center justify-between z-30 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 truncate">
          <span className="font-mono-code text-xs text-[#B8976C] font-semibold tracking-wider">
            {project.catalogNo}
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#38322C]" />
          <h2 className="font-display text-base sm:text-lg text-[#EDE8E1] truncate">
            {project.title}
          </h2>
          <span className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 bg-[#1C1A18] text-[#8E867E] text-[10px] font-mono-code rounded border border-[#2E2925]">
            <Maximize2 className="w-2.5 h-2.5 text-[#B8976C]" />
            <span>Exhibition Lightbox</span>
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div className="flex items-center bg-[#1A1817] border border-[#2E2925] rounded-sm p-0.5">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.75}
              className="p-1.5 text-[#8E867E] hover:text-[#EDE8E1] disabled:opacity-30 transition-colors"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono-code text-[11px] text-[#A8A096] px-2 min-w-[48px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.5}
              className="p-1.5 text-[#8E867E] hover:text-[#EDE8E1] disabled:opacity-30 transition-colors"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-[#8E867E] hover:text-[#EDE8E1] border-l border-[#2E2925] transition-colors"
              title="Reset Zoom (0)"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setShowCaptions((prev) => !prev)}
            className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-sm font-mono-code text-xs transition-colors border ${
              showCaptions
                ? 'bg-[#24201D] text-[#EDE8E1] border-[#3E3833]'
                : 'bg-transparent text-[#8E867E] border-transparent hover:text-[#EDE8E1]'
            }`}
          >
            <span>Captions</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-[#1A1817] hover:bg-[#C8442C] text-[#EDE8E1] hover:text-white border border-[#2E2925] hover:border-[#C8442C] transition-colors"
            title="Close Lightbox (ESC)"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas View Area */}
      <div
        className="w-full flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative max-w-5xl w-full h-[60vh] sm:h-[68vh] bg-[#11100F] border border-[#2B2724] rounded-sm overflow-hidden shadow-2xl transition-transform duration-200 ease-out flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <ArtworkCanvas type={project.visualType} isHovered={true} />

          {/* Exhibition watermark overlay */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#59524A] bg-[#141312]/80 px-2.5 py-1 border border-[#262220] rounded-xs">
              Curated Specimen Visual
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Curatorial Caption Bar */}
      {showCaptions && (
        <div
          className="w-full bg-[#121110]/95 border-t border-[#262220] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-30 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="font-display text-sm font-semibold text-[#EDE8E1]">
                {project.title}
              </span>
              <span className="text-[#8E867E] font-mono-code text-xs">—</span>
              <span className="font-serif-luxury italic text-xs text-[#B8976C]">
                {project.subtitle}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[#1A1817] text-[#9E968D] text-[10px] font-mono-code rounded-xs border border-[#262220]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="font-mono-code text-[11px] text-[#736B63] flex items-center space-x-3 shrink-0">
            <span>Scroll / Drag to inspect</span>
            <span>•</span>
            <span>ESC to exit</span>
          </div>
        </div>
      )}
    </div>
  );
};
