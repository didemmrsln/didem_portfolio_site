import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Waves, Volume2, Pause, Play } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { atelierAudio, SoundscapeMode } from '../utils/audioEngine';

export const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<SoundscapeMode>('ambient-drone');

  useEffect(() => {
    const unsub = atelierAudio.subscribe((playing, _vol, currentMode) => {
      setIsPlaying(playing);
      setMode(currentMode);
    });
    return () => unsub();
  }, []);

  const handleToggleSound = () => {
    atelierAudio.togglePlay();
  };
  return (
    <section id="hero" className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden border-b border-[#24211E] bg-[#141414] transition-colors duration-500 ease-in-out">
      {/* Subtle background ambient texture & warm lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(#201D1B_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C8442C]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#B8976C]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Curatorial Header Badge */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#262220]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#C8442C] animate-pulse" />
            <span className="font-mono-code text-xs tracking-widest text-[#B8976C] uppercase">
              Data Science & Creative Research
            </span>
          </div>

          <div className="font-mono-code text-xs text-[#8E867E]">
            <span>Atelier Catalogue</span>
          </div>
        </div>

        {/* Name & Tagline */}
        <div className="space-y-10 max-w-4xl">
          <div className="space-y-3">
            <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-widest block">
              Portfolio
            </span>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#EDE8E1] tracking-tight leading-[1.05]">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          {/* Tagline */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C8442C] py-1">
            <p className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#EDE8E1] font-light leading-snug italic">
              "{PERSONAL_INFO.tagline}"
            </p>
          </div>
        </div>

        {/* Action Prompt & Ambient Soundtrack Trigger */}
        <div className="mt-16 pt-8 border-t border-[#24211E] flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleSound}
              className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#181615] hover:bg-[#201D1A] border border-[#2E2925] hover:border-[#B8976C] rounded-sm text-xs font-mono-code text-[#C5BEB5] hover:text-[#EDE8E1] transition-all"
              title={isPlaying ? 'Pause soundscape' : 'Listen to Generative Ambient soundscape'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C8442C]" />
                  <span>
                    Playing: {mode === 'ambient-drone' ? 'Warm Ambient Drone' : 'Nocturne in Dm'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8442C] animate-pulse ml-1" />
                </>
              ) : (
                <>
                  <Waves className="w-3.5 h-3.5 text-[#B8976C]" />
                  <span>Listen to Warm Ambient Soundscape</span>
                </>
              )}
            </button>

            <span className="hidden sm:inline-block text-xs font-mono-code text-[#736B63]">
              // Brian Eno & Hiroshi Yoshimura inspired
            </span>
          </div>

          <a
            href="#featured-work"
            className="group inline-flex items-center space-x-3 px-6 py-3.5 bg-[#C8442C] hover:bg-[#D94E35] text-white font-mono-code text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg shadow-[#C8442C]/10"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
