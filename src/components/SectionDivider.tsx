import React from 'react';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full flex items-center justify-center pointer-events-none relative py-1 ${className}`}
      aria-hidden="true"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2B2724] to-transparent" />
      </div>
    </div>
  );
};
