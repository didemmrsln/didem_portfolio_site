import React, { useState } from 'react';

interface ArtworkCanvasProps {
  type: 'moma-topology' | 'green-line' | 'dose-reality' | 'abstract-topology';
  isHovered?: boolean;
}

export const ArtworkCanvas: React.FC<ArtworkCanvasProps> = ({ type, isHovered = false }) => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Render MoMA Acquisition Lag Temporal Topology
  if (type === 'moma-topology') {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-[#111010] overflow-hidden flex items-center justify-center select-none">
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#2A2624_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 500 240" fill="none">
          {/* Baseline Step curve */}
          <path
            d="M 40 50 L 140 50 L 140 90 L 260 90 L 260 140 L 380 140 L 380 190 L 460 190"
            stroke="#2E2A28"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* Survival / Lag Trend Curve */}
          <path
            d="M 40 40 L 100 40 L 100 70 L 200 70 L 200 120 L 320 120 L 320 170 L 460 170"
            stroke="#C8442C"
            strokeWidth="2"
            className="transition-all duration-700"
            strokeOpacity={isHovered ? 0.95 : 0.75}
          />
          <path
            d="M 40 80 Q 180 110, 300 160 T 460 210"
            stroke="#B8976C"
            strokeWidth="1.5"
            strokeOpacity={isHovered ? 0.85 : 0.45}
            className="transition-all duration-500"
          />

          {/* Timeline Nodes */}
          {[
            { x: 100, y: 70, year: '1930', label: '24.2y' },
            { x: 200, y: 120, year: '1965', label: '19.5y' },
            { x: 320, y: 170, year: '1995', label: '14.2y' },
            { x: 440, y: 205, year: '2024', label: '9.8y' },
          ].map((node, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setActiveNode(i)} onMouseLeave={() => setActiveNode(null)}>
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered || activeNode === i ? 6 : 4}
                fill={i === 3 ? '#C8442C' : '#B8976C'}
                className="transition-all duration-300"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered || activeNode === i ? 14 : 9}
                stroke={i === 3 ? '#C8442C' : '#B8976C'}
                strokeWidth="1"
                strokeOpacity={isHovered || activeNode === i ? 0.6 : 0.25}
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y - 12}
                textAnchor="middle"
                fill="#E5E0D8"
                fontSize="10"
                fontFamily="JetBrains Mono"
                className={`transition-opacity duration-300 ${isHovered || activeNode === i ? 'opacity-90' : 'opacity-40'}`}
              >
                {node.year}
              </text>
            </g>
          ))}

          {/* Axis indicators */}
          <line x1="40" y1="220" x2="460" y2="220" stroke="#3A3532" strokeWidth="1" />
          <text x="40" y="235" fill="#88817B" fontSize="9" fontFamily="JetBrains Mono">
            T_0 (CREATION)
          </text>
          <text x="460" y="235" textAnchor="end" fill="#C8442C" fontSize="9" fontFamily="JetBrains Mono">
            T_ACQ (ACQUISITION)
          </text>
        </svg>

        {/* Ambient glow */}
        <div
          className={`absolute -bottom-10 -right-10 w-40 h-40 bg-[#C8442C]/15 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isHovered ? 'opacity-80' : 'opacity-20'
          }`}
        />
      </div>
    );
  }

  // Render Green Line: 2030 Sustainability Target vs Actual Trajectory
  if (type === 'green-line') {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-[#111010] overflow-hidden flex items-center justify-center select-none">
        <div className="absolute inset-0 bg-[radial-gradient(#262220_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
        <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 450 200" fill="none">
          {/* 2030 Target dashed reference line */}
          <line x1="50" y1="60" x2="400" y2="160" stroke="#B8976C" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.7" />
          <text x="400" y="155" textAnchor="end" fill="#B8976C" fontSize="9" fontFamily="JetBrains Mono">
            2030 PLEDGE TARGET
          </text>

          {/* Actual current trajectory curve */}
          <path
            d="M 50 60 C 130 65, 220 90, 310 115 S 400 135, 410 138"
            stroke="#C8442C"
            strokeWidth="2"
            className="transition-all duration-700"
            strokeOpacity={isHovered ? 0.95 : 0.65}
          />
          <text x="415" y="142" fill="#C8442C" fontSize="9" fontFamily="JetBrains Mono">
            ACTUAL TRAJECTORY
          </text>

          {/* Historical Data checkpoints */}
          {[
            { x: 50, y: 60, yr: '2015' },
            { x: 170, y: 78, yr: '2020' },
            { x: 290, y: 110, yr: '2025' },
          ].map((pt, idx) => (
            <g key={idx}>
              <circle cx={pt.x} cy={pt.y} r={isHovered ? 5 : 3.5} fill="#C8442C" />
              <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="#A8A096" fontSize="9" fontFamily="JetBrains Mono">
                {pt.yr}
              </text>
            </g>
          ))}

          <line x1="50" y1="180" x2="400" y2="180" stroke="#2B2724" strokeWidth="1" />
          <text x="50" y="194" fill="#7A726A" fontSize="8.5" fontFamily="JetBrains Mono">
            BASELINE (MtCO2e)
          </text>
          <text x="400" y="194" textAnchor="end" fill="#7A726A" fontSize="8.5" fontFamily="JetBrains Mono">
            2030 HORIZON
          </text>
        </svg>

        <div
          className={`absolute -top-10 -right-10 w-36 h-36 bg-[#B8976C]/10 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isHovered ? 'opacity-70' : 'opacity-15'
          }`}
        />
      </div>
    );
  }

  // Render Dose of Reality: Geometric Gaussian / Pharmacokinetics & Statistical Curves
  if (type === 'dose-reality') {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-[#111010] overflow-hidden flex items-center justify-center select-none">
        <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 320 220" fill="none">
          {/* Concentration-Time Curve */}
          <path
            d="M 30 180 C 60 180, 80 40, 120 40 C 160 40, 220 140, 290 180"
            stroke="#C8442C"
            strokeWidth="2"
            strokeOpacity={isHovered ? 0.95 : 0.7}
            className="transition-all duration-700"
          />

          {/* Threshold interval */}
          <line x1="30" y1="110" x2="290" y2="110" stroke="#B8976C" strokeWidth="1.2" strokeDasharray="4 3" strokeOpacity="0.6" />
          <text x="290" y="105" textAnchor="end" fill="#B8976C" fontSize="8.5" fontFamily="JetBrains Mono">
            THERAPEUTIC WINDOW
          </text>

          {/* Peak point */}
          <circle cx="120" cy="40" r={isHovered ? 6 : 4} fill="#B8976C" />
          <text x="120" y="28" textAnchor="middle" fill="#EDE8E1" fontSize="9" fontFamily="JetBrains Mono">
            C_max
          </text>

          {/* Axis */}
          <line x1="30" y1="180" x2="290" y2="180" stroke="#332E2A" strokeWidth="1" />
          <text x="30" y="196" fill="#7A726A" fontSize="8.5" fontFamily="JetBrains Mono">
            T_0
          </text>
          <text x="290" y="196" textAnchor="end" fill="#7A726A" fontSize="8.5" fontFamily="JetBrains Mono">
            TIME
          </text>
        </svg>

        <div
          className={`absolute bottom-0 left-0 w-32 h-32 bg-[#C8442C]/10 rounded-full blur-2xl transition-opacity duration-500 ${
            isHovered ? 'opacity-80' : 'opacity-20'
          }`}
        />
      </div>
    );
  }

  // Default Abstract Topology
  return (
    <div className="relative w-full h-full min-h-[220px] bg-[#111010] overflow-hidden flex items-center justify-center select-none">
      <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 300 200" fill="none">
        <path d="M 30 160 Q 100 130, 160 90 T 270 50" stroke="#884236" strokeWidth="1.5" strokeDasharray="3 3" />
        <path
          d="M 30 160 Q 90 90, 150 80 T 270 70"
          stroke="#C8442C"
          strokeWidth="2"
          strokeOpacity={isHovered ? 0.95 : 0.7}
          className="transition-all duration-500"
        />
        <circle cx="150" cy="80" r="5" fill="#B8976C" />
        <line x1="30" y1="170" x2="270" y2="170" stroke="#38322E" strokeWidth="1" />
      </svg>
    </div>
  );
};
