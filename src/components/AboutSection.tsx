import React from 'react';
import { Sparkles, ArrowUpRight, FileDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-36 bg-[#181716] border-b border-[#24211E] relative transition-colors duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#262220] gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Background & Philosophy
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#EDE8E1] tracking-tight">
              About
            </h2>
          </div>

          <div className="font-mono-code text-xs text-[#8E867E]">
            <span>{PERSONAL_INFO.name}</span>
          </div>
        </div>

        {/* Layout: Profile Photo placed alongside the text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Photo Specimen - B&W by default, smoothly transitions to full color on hover */}
          <div className="lg:col-span-5">
            <div className="group relative bg-[#181615] border border-[#2B2724] hover:border-[#B8976C] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85),0_0_24px_rgba(184,151,108,0.2)] transition-all duration-700 rounded-sm p-4 space-y-3">
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm bg-[#100F0E] border border-[#282421] group-hover:border-[#B8976C]/80 group-hover:ring-1 group-hover:ring-[#B8976C]/40 transition-all duration-700">
                {/* Decorative Gold Frame Corner Accents */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#B8976C] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#B8976C] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#B8976C] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#B8976C] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none" />

                {/* Inner Bronze Hairline Matting */}
                <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[#B8976C]/30 transition-all duration-700 z-10" />

                {/* Profile Photo - B&W by default, smoothly transitions to full color on hover */}
                <img
                  src={PERSONAL_INFO.profilePhotoUrl || "/profile_photo_optimized.jpg"}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_top] filter grayscale contrast-[1.05] brightness-[0.96] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent pointer-events-none z-10" />

                {/* Bottom Label */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                  <div className="px-2.5 py-1 bg-[#141414]/90 border border-[#302B27] group-hover:border-[#B8976C]/50 rounded-sm backdrop-blur-md transition-colors">
                    <span className="font-mono-code text-[11px] text-[#EDE8E1] group-hover:text-[#B8976C] transition-colors">
                      {PERSONAL_INFO.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-caption */}
              <div className="flex items-center justify-between px-1 text-[11px] font-mono-code text-[#7A726A]">
                <span>Portrait</span>
                <span className="text-[#B8976C]">Data Scientist & Researcher</span>
              </div>
            </div>
          </div>

          {/* Narrative Text Column - Exactly as specified */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-[#C5BEB5] font-sans text-lg sm:text-xl leading-relaxed font-light">
              {PERSONAL_INFO.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-[#262220] flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#B8976C]">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#C8442C]" />
                <span className="text-[#EDE8E1]">Chemical Engineering Background → Data Science</span>
              </div>

              <a
                href="/Didem_Arslan_Yenihayat_CV.pdf"
                download="Didem_Arslan_Yenihayat_CV.pdf"
                className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#181615] hover:bg-[#221F1D] border border-[#2E2925] hover:border-[#B8976C] text-[#EDE8E1] rounded-sm transition-all"
                aria-label="Download CV (PDF)"
                title="Download Curriculum Vitae (PDF)"
              >
                <FileDown className="w-3.5 h-3.5 text-[#C8442C]" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
