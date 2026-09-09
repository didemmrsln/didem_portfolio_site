import React, { useState } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { 
  BarChart3, 
  Clock, 
  Users, 
  Globe2, 
  Sparkles, 
  Layers, 
  Sliders, 
  Info,
  TrendingDown,
  TrendingUp,
  Activity,
  FileText,
  Presentation,
  Video,
  ExternalLink,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  LayoutDashboard,
  Github,
  BookOpen
} from 'lucide-react';
import { 
  MOMA_OVERVIEW, 
  MOMA_DECADE_ACQUISITIONS, 
  MOMA_ERA_DATA, 
  MOMA_MOVEMENT_DEVIATIONS, 
  MOMA_CORRELATION_WEIGHTS, 
  MOMA_LOST_POTENTIAL_REGRESSION, 
  MOMA_LOST_POTENTIAL_TOP10 
} from '../data/portfolioData';
import { DocumentViewerModal } from './DocumentViewerModal';

export const MoMAInteractiveExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'hypotheses' | 'movements' | 'lost-potential' | 'simulator' | 'deliverables'>('overview');
  const [selectedHypothesisPeriod, setSelectedHypothesisPeriod] = useState<number>(2); // Default to 1990-2010
  const [selectedMovementCategory, setSelectedMovementCategory] = useState<'all' | 'fast' | 'catchup'>('all');
  
  // Document Viewer Modal State (for in-app reading of PDF Report & Slides)
  const [activeDocModal, setActiveDocModal] = useState<'report' | 'presentation' | null>(null);

  // Empirical Simulator state: Compare by Gender (H1) or Geography (H2) independently
  const [simCompareBy, setSimCompareBy] = useState<'gender' | 'geography'>('gender');
  const [simPeriod, setSimPeriod] = useState<'1950-1970' | '1970-1990' | '1990-2010'>('1990-2010');
  const [simGender, setSimGender] = useState<'Female' | 'Male'>('Female');
  const [simOrigin, setSimOrigin] = useState<'Western' | 'Non-Western'>('Non-Western');

  // Calculate dynamic empirical simulation directly from real MOMA_ERA_DATA for H1 or H2
  const getSimulatedEraData = () => {
    return MOMA_ERA_DATA.find(e => e.period === simPeriod) || MOMA_ERA_DATA[2];
  };

  const getSimulatedLagResult = () => {
    const era = getSimulatedEraData();
    if (simCompareBy === 'gender') {
      const lag = simGender === 'Female' ? era.femaleLag : era.maleLag;
      const baseline = simGender === 'Female' ? era.maleLag : era.femaleLag;
      const delta = Math.round((lag - baseline) * 10) / 10;
      const hypothesis = 'H1 (Gender Recognition Lag)';
      const significance = simPeriod === '1990-2010' 
        ? 'Mann-Whitney U: p = 0.418 (Gender lag disparity closed in contemporary era)' 
        : 'Mann-Whitney U: p < 0.001 (Statistically significant delay for female artists)';
      const targetLabel = simGender === 'Female' ? 'Female Artists' : 'Male Artists';
      const benchmarkLabel = simGender === 'Female' ? 'Male Baseline' : 'Female Baseline';
      return { lag, baseline, delta, hypothesis, significance, targetLabel, benchmarkLabel, era };
    } else {
      const lag = simOrigin === 'Non-Western' ? era.nonWesternLag : era.westernLag;
      const baseline = simOrigin === 'Non-Western' ? era.westernLag : era.nonWesternLag;
      const delta = Math.round((lag - baseline) * 10) / 10;
      const hypothesis = 'H2 (Geographic Origin Lag)';
      const significance = 'Mann-Whitney U: p < 0.001 (Persistent geographic delay across all historical eras)';
      const targetLabel = simOrigin === 'Non-Western' ? 'Non-Western Origin' : 'Western Origin';
      const benchmarkLabel = simOrigin === 'Non-Western' ? 'Western Baseline' : 'Non-Western Baseline';
      return { lag, baseline, delta, hypothesis, significance, targetLabel, benchmarkLabel, era };
    }
  };

  const filteredMovements = MOMA_MOVEMENT_DEVIATIONS.filter(m => {
    if (selectedMovementCategory === 'fast') return m.category === 'fast-tracked';
    if (selectedMovementCategory === 'catchup') return m.category === 'overlooked-catchup';
    return true;
  });

  const currentEra = MOMA_ERA_DATA[selectedHypothesisPeriod];
  const { formatted: formattedTotalArtworks, ref: totalArtworksRef } = useCountUp(
    MOMA_OVERVIEW.totalArtworks,
    { duration: 1100 }
  );

  return (
    <section id="moma-explorer" className="py-24 md:py-36 bg-[#11100F] border-b border-[#24211E] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header with Empirical Scope */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#262220] gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Data Study // MoMA Collection Analysis
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#EDE8E1] tracking-tight">
              The Recognition <span className="font-serif-luxury italic text-[#C8442C]">Lag</span>
            </h2>
            <p className="font-serif-luxury text-xl text-[#B8976C] italic leading-relaxed font-light">
              Who Gets Recognized, and When?
            </p>
            <p className="text-sm text-[#8E867E] font-sans pt-1 leading-relaxed">
              A statistical study of institutional acquisition patterns, lag dynamics, and posthumous recognition across {MOMA_OVERVIEW.totalArtworks.toLocaleString()} cataloged artworks.
            </p>
            <div className="text-xs font-mono-code text-[#7A726A] pt-1">
              By {MOMA_OVERVIEW.author} · {MOMA_OVERVIEW.bootcamp}
            </div>
          </div>

          {/* Metric Highlights Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm">
              <div className="text-[10px] font-mono-code text-[#8E867E]">Total Artworks</div>
              <div ref={totalArtworksRef} className="font-display text-xl text-[#EDE8E1]">
                {formattedTotalArtworks}
              </div>
            </div>
            <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm">
              <div className="text-[10px] font-mono-code text-[#8E867E]">Total Artists</div>
              <div className="font-display text-xl text-[#EDE8E1]">{MOMA_OVERVIEW.totalArtists.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono-code text-[#B8976C]">Acquisition Lag</div>
              <div className="font-display text-xl text-[#C8442C] leading-tight">
                {MOMA_OVERVIEW.medianAcquisitionLag}
              </div>
              <div className="text-xs font-serif-luxury italic text-[#8E867E] mt-0.5">
                Years
              </div>
            </div>
          </div>
        </div>

        {/* Study Exploration Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[#161514] border border-[#262220] rounded-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            1. Collection Scale (1920–2020s)
          </button>
          <button
            onClick={() => setActiveTab('hypotheses')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'hypotheses'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            2. H1 & H2 (Gender & Geography)
          </button>
          <button
            onClick={() => setActiveTab('movements')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'movements'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            3. H3 & H4 (Movements & Pace)
          </button>
          <button
            onClick={() => setActiveTab('lost-potential')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'lost-potential'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            4. Lost Potential (R²=0.705)
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all flex items-center space-x-1.5 ${
              activeTab === 'simulator'
                ? 'bg-[#B8976C] text-black font-semibold shadow-sm'
                : 'text-[#B8976C] hover:text-white hover:bg-[#201D1A]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all flex items-center space-x-1.5 ${
              activeTab === 'deliverables'
                ? 'bg-[#EDE8E1] text-black font-semibold'
                : 'text-[#C5BEB5] hover:text-white hover:bg-[#201D1A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PPT / Word / Video Hub</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & COLLECTION SCALE (Slide 2) */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Slide 02 // Overview
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  The Scale of the Collection & Acquisition Shifts
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  How {MOMA_OVERVIEW.totalArtworks.toLocaleString()} artworks entered MoMA's collection across 10 decades
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-[#121110] border border-[#262220] text-xs font-mono-code text-[#B8976C] rounded-sm">
                Source: MoMA Collection Dataset (CC0)
              </div>
            </div>

            {/* Decades Acquisition Visual Curve */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#8E867E]">
                <span>Artworks Acquired Per Decade</span>
                <span className="text-[#C8442C]">Bulk Gift Peak: 1964, 1968 (~43k)</span>
              </div>

              {/* Bar visualization */}
              <div className="grid grid-cols-11 gap-1.5 sm:gap-2 items-end h-56 p-4 bg-[#121110] border border-[#262220] rounded-sm pt-8">
                {MOMA_DECADE_ACQUISITIONS.map((d, idx) => {
                  const numWorks = Number(d.works);
                  const maxVal = 45000;
                  const heightPercent = Math.max(8, (numWorks / maxVal) * 100);
                  const isPeak = d.decade === '1960s';
                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-[#1C1A18] border border-[#3E3A36] text-[10px] font-mono-code text-[#EDE8E1] px-2.5 py-1 rounded-sm whitespace-nowrap z-10 pointer-events-none shadow-xl">
                        <div className="font-semibold text-white">{d.decade}: {numWorks.toLocaleString()} works</div>
                        <div className="text-[#8E867E] text-[9px]">{d.note}</div>
                      </div>

                      <span className="text-[9px] sm:text-[10px] font-mono-code text-[#8E867E] mb-1 group-hover:text-white">
                        {numWorks >= 1000 ? `${(numWorks / 1000).toFixed(numWorks >= 10000 ? 0 : 1)}k` : numWorks}
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-xs transition-all duration-500 ${
                          isPeak
                            ? 'bg-[#C8442C] group-hover:bg-[#E0523A]'
                            : 'bg-[#2E2925] group-hover:bg-[#B8976C]'
                        }`}
                      />
                      <span className="text-[9px] sm:text-[10px] font-mono-code text-[#736B63] mt-2 group-hover:text-[#EDE8E1]">
                        {d.decade.replace('s', '')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#141312] border border-[#262220] rounded-sm">
                  <span className="text-[10px] font-mono-code text-[#C8442C] uppercase block mb-1">The 1960s Surge (43,107 Works)</span>
                  <p className="text-xs text-[#A8A096] font-sans leading-relaxed">
                    1964 and 1968 represent major bulk gift years in MoMA's archive, accessioning over 43,000 prints, illustrations, and design objects in that decade.
                  </p>
                </div>
                <div className="p-4 bg-[#141312] border border-[#262220] rounded-sm">
                  <span className="text-[10px] font-mono-code text-[#B8976C] uppercase block mb-1">The Contemporary Wave (48,993 Works)</span>
                  <p className="text-xs text-[#A8A096] font-sans leading-relaxed">
                    The 2000s (23,959 works) and 2010s (25,034 works) represent a dual-decade expansion driven by global pluralism, digital media, and retrospective canon catch-up.
                  </p>
                </div>
              </div>

              {/* Methodological footnote */}
              <div className="p-3 bg-[#100F0E] border-l-2 border-[#B8976C] border-y border-r border-[#221F1D] rounded-r-sm flex items-start space-x-2.5">
                <Info className="w-3.5 h-3.5 text-[#B8976C] shrink-0 mt-0.5" />
                <p className="text-[11px] font-sans text-[#8E867E] leading-relaxed">
                  Reflects the <strong className="text-[#C5BEB5]">151,146 works</strong> with computable acquisition-year data (94% of the 160,699-work collection); see Methodology Report for date-parsing details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: H1 (GENDER) & H2 (GEOGRAPHY) (Slide 3) */}
        {/* ========================================================================= */}
        {activeTab === 'hypotheses' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Slide 03 // Hypotheses 1 & 2
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Who Gets Recognized, and Does It Change?
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Gender and geography effects on acquisition lag, tested for statistical significance (Mann-Whitney U, α=0.05).
                </p>
              </div>

              {/* Period Selectors */}
              <div className="flex items-center space-x-1.5 bg-[#121110] p-1 rounded-sm border border-[#262220]">
                {MOMA_ERA_DATA.map((era, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedHypothesisPeriod(idx)}
                    className={`px-3 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                      selectedHypothesisPeriod === idx
                        ? 'bg-[#C8442C] text-white font-medium'
                        : 'text-[#8E867E] hover:text-[#EDE8E1]'
                    }`}
                  >
                    {era.period}
                  </button>
                ))}
              </div>
            </div>

            {/* Side-by-Side Hypothesis Visualizers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* H1: Gender Effect */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8442C]" />
                    <h4 className="font-display text-lg text-[#EDE8E1]">H1 · Gender Effect on Lag</h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#B8976C] px-2 py-0.5 bg-[#201D1A] rounded-sm border border-[#332D28]">
                    {currentEra.period}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Female Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-code">
                      <span className="text-[#C8442C] font-medium">Female Artists</span>
                      <span className="text-[#EDE8E1]">{currentEra.femaleLag} Years Median</span>
                    </div>
                    <div className="h-3 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                      <div
                        style={{ width: `${(currentEra.femaleLag / 45) * 100}%` }}
                        className="h-full bg-[#C8442C] rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Male Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-code">
                      <span className="text-[#8E867E]">Male Artists</span>
                      <span className="text-[#EDE8E1]">{currentEra.maleLag} Years Median</span>
                    </div>
                    <div className="h-3 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                      <div
                        style={{ width: `${(currentEra.maleLag / 45) * 100}%` }}
                        className="h-full bg-[#8E867E] rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Statistical Finding Box */}
                <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm text-xs font-sans space-y-1">
                  <div className="font-mono-code text-[11px] text-[#B8976C] flex items-center justify-between">
                    <span>1990–2010 Lag Gap:</span>
                    <span className="text-[#4E9F3D] font-bold">Closed (p = 0.418)</span>
                  </div>
                  <p className="text-[#9E968D] text-[11px] leading-relaxed">
                    Female and male median acquisition lags converged to ~5 years. However, total artwork count crossover is projected at <strong className="text-[#EDE8E1]">~2097</strong> (still ~80 years away).
                  </p>
                </div>
              </div>

              {/* H2: Geography Effect */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#B8976C]" />
                    <h4 className="font-display text-lg text-[#EDE8E1]">H2 · Geography Effect on Lag</h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-[#B8976C] px-2 py-0.5 bg-[#201D1A] rounded-sm border border-[#332D28]">
                    {currentEra.period}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Non-Western Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-code">
                      <span className="text-[#C8442C] font-medium">Non-Western (Batı-dışı)</span>
                      <span className="text-[#EDE8E1]">{currentEra.nonWesternLag} Years Median</span>
                    </div>
                    <div className="h-3 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                      <div
                        style={{ width: `${(currentEra.nonWesternLag / 45) * 100}%` }}
                        className="h-full bg-[#C8442C] rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Western Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono-code">
                      <span className="text-[#8E867E]">Western (Batı)</span>
                      <span className="text-[#EDE8E1]">{currentEra.westernLag} Years Median</span>
                    </div>
                    <div className="h-3 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                      <div
                        style={{ width: `${(currentEra.westernLag / 45) * 100}%` }}
                        className="h-full bg-[#8E867E] rounded-full transition-all duration-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Statistical Finding Box */}
                <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm text-xs font-sans space-y-1">
                  <div className="font-mono-code text-[11px] text-[#B8976C] flex items-center justify-between">
                    <span>1990–2010 Lag Gap:</span>
                    <span className="text-[#E0523A] font-bold">Persists (p &lt; 0.001)</span>
                  </div>
                  <p className="text-[#9E968D] text-[11px] leading-relaxed">
                    While the geographic gap narrowed across decades (39y → 33y → 9y), it remains statistically significant across all periods. Artwork count crossover: <strong className="text-[#EDE8E1]">~2089</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Comparison Matrix from Slide 3 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-[#2B2724] text-xs font-sans">
                <thead className="bg-[#C8442C] text-white font-mono-code text-[11px]">
                  <tr>
                    <th className="p-3">Hypothesis Metric</th>
                    <th className="p-3">H1 · Gender</th>
                    <th className="p-3">H2 · Geography</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262220] bg-[#141312] text-[#C5BEB5]">
                  <tr>
                    <td className="p-3 font-mono-code text-[#EDE8E1]">Lag Gap (1990–2010)</td>
                    <td className="p-3 text-[#4E9F3D] font-medium">Closed (p = 0.418)</td>
                    <td className="p-3 text-[#E0523A] font-medium">Persists (p &lt; 0.001)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code text-[#EDE8E1]">Trend Over Time</td>
                    <td className="p-3">Fully disappeared</td>
                    <td className="p-3">Narrowed, not closed</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code text-[#EDE8E1]">Artwork Count Crossover</td>
                    <td className="p-3 font-mono-code text-[#B8976C]">~2097</td>
                    <td className="p-3 font-mono-code text-[#B8976C]">~2089</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono-code text-[#EDE8E1]">Interpretation</td>
                    <td className="p-3 text-[#EDE8E1]">Structural improvement</td>
                    <td className="p-3 text-[#EDE8E1]">Persistent pattern</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: H3 (MOVEMENTS) & H4 (PREDICTABILITY) (Slide 4) */}
        {/* ========================================================================= */}
        {activeTab === 'movements' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Slide 04 // Hypotheses 3 & 4
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Which Movements, and How Consistently?
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Movement-level recognition lag deviations and the period-to-period predictability of MoMA's acquisition behavior (r=0.855).
                </p>
              </div>

              {/* Movement Filter */}
              <div className="flex items-center space-x-1.5 bg-[#121110] p-1 rounded-sm border border-[#262220]">
                <button
                  onClick={() => setSelectedMovementCategory('all')}
                  className={`px-3 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                    selectedMovementCategory === 'all' ? 'bg-[#C8442C] text-white' : 'text-[#8E867E]'
                  }`}
                >
                  All (15)
                </button>
                <button
                  onClick={() => setSelectedMovementCategory('fast')}
                  className={`px-3 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                    selectedMovementCategory === 'fast' ? 'bg-[#C8442C] text-white' : 'text-[#8E867E]'
                  }`}
                >
                  Fast-Tracked (6)
                </button>
                <button
                  onClick={() => setSelectedMovementCategory('catchup')}
                  className={`px-3 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                    selectedMovementCategory === 'catchup' ? 'bg-[#C8442C] text-white' : 'text-[#8E867E]'
                  }`}
                >
                  Catch-Up (9)
                </button>
              </div>
            </div>

            {/* Movement Deviation Chart */}
            <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-[#8E867E]">
                <span className="text-[#E5A93C]">← Fast-Tracked Lag (Negative Years)</span>
                <span>Movement Deviation from Median Lag</span>
                <span className="text-[#C8442C]">Catch-Up / Overlooked Lag (+ Years) →</span>
              </div>

              <div className="space-y-2.5 pt-2">
                {filteredMovements.map((mov, idx) => {
                  const isNegative = mov.deviationYears < 0;
                  const absVal = Math.abs(mov.deviationYears);
                  const barWidth = (absVal / 22) * 50; // max 50% width on each side

                  return (
                    <div key={idx} className="flex items-center text-xs font-mono-code">
                      <div className="w-36 sm:w-44 text-right pr-3 truncate text-[#C5BEB5]">
                        {mov.name}
                      </div>
                      
                      {/* Zero axis split bar */}
                      <div className="flex-1 flex items-center h-5 bg-[#191716] rounded-xs relative border-x border-[#2B2724]">
                        {/* Center line (0 years) */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#403B36] z-10" />

                        {isNegative ? (
                          <div className="w-1/2 flex justify-end">
                            <div
                              style={{ width: `${barWidth * 2}%` }}
                              className="h-3.5 bg-[#E5A93C] rounded-l-xs flex items-center justify-start pl-1 text-[10px] text-black font-semibold"
                            >
                              {mov.deviationYears}y
                            </div>
                          </div>
                        ) : (
                          <div className="w-1/2 ml-auto flex justify-start">
                            <div
                              style={{ width: `${barWidth * 2}%` }}
                              className="h-3.5 bg-[#C8442C] rounded-r-xs flex items-center justify-end pr-1 text-[10px] text-white font-semibold"
                            >
                              +{mov.deviationYears}y
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recognition-Weight Correlation Shift & Predictability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Correlation shift */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
                <h4 className="font-display text-lg text-[#EDE8E1]">Recognition-Weight Correlation Over Time</h4>
                <p className="text-xs text-[#8E867E] leading-relaxed">
                  How MoMA's acquisition focus evolved from negative historical correlation to positive catch-up rebalancing.
                </p>

                <div className="space-y-3 pt-2">
                  {MOMA_CORRELATION_WEIGHTS.map((item, i) => (
                    <div key={i} className="p-3 bg-[#1A1817] border border-[#262220] rounded-sm flex items-center justify-between">
                      <div>
                        <div className="font-mono-code text-xs text-[#EDE8E1]">{item.era}</div>
                        <div className="text-[10px] text-[#8E867E]">{item.label}</div>
                      </div>
                      <div className={`font-mono-code text-sm font-bold px-2 py-1 rounded-xs ${
                        item.direction === 'neg' ? 'bg-[#2A2318] text-[#E5A93C]' : 'bg-[#2A1815] text-[#C8442C]'
                      }`}>
                        r = {item.r > 0 ? `+${item.r}` : item.r}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Is MoMA's pace predictable? */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
                <h4 className="font-display text-lg text-[#EDE8E1]">Is MoMA's Pace Predictable?</h4>
                <div className="flex items-center space-x-3 p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm">
                  <TrendingUp className="w-5 h-5 text-[#C8442C]" />
                  <div>
                    <div className="font-mono-code text-xs text-[#B8976C]">Lag-1 Autocorrelation</div>
                    <div className="font-display text-2xl text-[#EDE8E1]">r = 0.855</div>
                  </div>
                </div>
                <p className="text-xs text-[#9E968D] leading-relaxed">
                  MoMA's acquisition pace is <strong className="text-[#EDE8E1]">predictable, not random</strong>. Strong period-to-period consistency creates an empirical baseline that enables testing which artists' acquisitions fell short of expected career output.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LOST POTENTIAL & REGRESSION MODEL (Slide 5) */}
        {/* ========================================================================= */}
        {activeTab === 'lost-potential' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Slide 05 // Lost Potential Model
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Lost Potential: What Might Have Been?
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Model: Log-linear regression on first 8 career years (R² = 0.705, n = 5,656 artists).
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-[#121110] border border-[#262220] text-xs font-mono-code text-[#C8442C] rounded-sm">
                R² = 0.705 (Statistical Fit)
              </div>
            </div>

            {/* Case Studies Comparison (Keith Haring vs Basquiat) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Keith Haring */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl text-[#EDE8E1]">Keith Haring</h4>
                  <span className="text-xs font-mono-code text-[#4E9F3D] px-2 py-0.5 bg-[#142214] border border-[#223E22] rounded-sm">
                    Δ = -0.2 (Near-Perfect Match)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#23201E]">
                  <div>
                    <div className="text-[10px] font-mono-code text-[#8E867E]">Actual Artworks</div>
                    <div className="font-display text-3xl text-[#EDE8E1]">49</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-[#B8976C]">Predicted Output</div>
                    <div className="font-display text-3xl text-[#B8976C]">48.8</div>
                  </div>
                </div>
                <p className="text-xs text-[#9E968D] leading-relaxed">
                  Haring's high-volume studio output in his first 8 active years matched the predictive curve almost exactly.
                </p>
              </div>

              {/* Jean-Michel Basquiat */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl text-[#EDE8E1]">Jean-Michel Basquiat</h4>
                  <span className="text-xs font-mono-code text-[#C8442C] px-2 py-0.5 bg-[#261412] border border-[#40201C] rounded-sm">
                    Δ = +5.0 (Lost Potential)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#23201E]">
                  <div>
                    <div className="text-[10px] font-mono-code text-[#8E867E]">Actual Artworks</div>
                    <div className="font-display text-3xl text-[#EDE8E1]">12</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-[#C8442C]">Predicted Output</div>
                    <div className="font-display text-3xl text-[#C8442C]">17.0</div>
                  </div>
                </div>
                <p className="text-xs text-[#9E968D] leading-relaxed">
                  Career tragically cut short at age 27; model identifies +5.0 predicted artworks representing unfulfilled institutional presence.
                </p>
              </div>
            </div>

            {/* Top 10 Lost Potential Ranking */}
            <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg text-[#EDE8E1]">Lost Potential — Top 10 Artists</h4>
                <span className="text-xs font-mono-code text-[#8E867E]">Ranked by uncollected potential artworks</span>
              </div>

              <div className="space-y-3 pt-2">
                {MOMA_LOST_POTENTIAL_TOP10.map((artist, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono-code">
                      <span className="text-[#EDE8E1]">
                        <strong className="text-[#B8976C] mr-2">#{idx + 1}</strong> {artist.name} <span className="text-[#736B63] font-normal">({artist.lifespan})</span>
                      </span>
                      <span className="text-[#C8442C] font-semibold">+{artist.lostPotential.toFixed(1)} Works</span>
                    </div>
                    <div className="h-2 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#262220]">
                      <div
                        style={{ width: `${(artist.lostPotential / 45) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#B8976C] to-[#C8442C] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PARAMETRIC INTERACTIVE SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'simulator' && (() => {
          const simResult = getSimulatedLagResult();
          return (
            <div className="p-6 sm:p-10 bg-[#181615] border border-[#2B2724] rounded-sm shadow-xl space-y-8 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono-code text-[#C8442C] uppercase tracking-widest mb-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Empirical Hypothesis Test Matrix</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Simulate Acquisition Lag Across Study Variables
                </h3>
                <p className="text-sm text-[#9E968D] font-sans pt-1 max-w-2xl leading-relaxed">
                  Select an acquisition era and evaluate either <strong className="text-[#EDE8E1]">Gender (H1)</strong> or <strong className="text-[#EDE8E1]">Geography (H2)</strong> independently to observe exact empirical median delays from the collection findings.
                </p>
              </div>

              {/* 1. Compare By: Single Dimension Segmented Control */}
              <div className="p-4 bg-[#131211] border border-[#2B2724] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono-code text-[#B8976C] uppercase tracking-wider block">
                    Compare by:
                  </span>
                  <span className="text-xs text-[#8E867E]">
                    {simCompareBy === 'gender' ? 'Testing H1: Gender-based recognition delay' : 'Testing H2: Geographic origin disparity (Western vs. Non-Western)'}
                  </span>
                </div>

                <div className="inline-flex p-1 bg-[#0D0C0B] border border-[#262220] rounded-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => setSimCompareBy('gender')}
                    className={`px-4 py-2 text-xs font-mono-code rounded-xs transition-all flex items-center space-x-2 ${
                      simCompareBy === 'gender'
                        ? 'bg-[#C8442C] text-white shadow-md font-medium'
                        : 'text-[#8E867E] hover:text-[#EDE8E1]'
                    }`}
                  >
                    <span>Gender Disparity (H1)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimCompareBy('geography')}
                    className={`px-4 py-2 text-xs font-mono-code rounded-xs transition-all flex items-center space-x-2 ${
                      simCompareBy === 'geography'
                        ? 'bg-[#C8442C] text-white shadow-md font-medium'
                        : 'text-[#8E867E] hover:text-[#EDE8E1]'
                    }`}
                  >
                    <span>Geographic Origin (H2)</span>
                  </button>
                </div>
              </div>

              {/* 2. Controls: Common Era Axis + Active Single Dimension */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-[#B8976C] mb-2 uppercase tracking-wider">
                    Acquisition Era (Common Axis)
                  </label>
                  <select
                    value={simPeriod}
                    onChange={(e) => setSimPeriod(e.target.value as any)}
                    className="w-full bg-[#121110] border border-[#302B27] focus:border-[#C8442C] text-xs font-mono-code text-[#EDE8E1] rounded-sm px-3.5 py-2.5 outline-none cursor-pointer"
                  >
                    <option value="1950-1970">1950–1970 (Post-War Canon)</option>
                    <option value="1970-1990">1970–1990 (Institutional Pivot)</option>
                    <option value="1990-2010">1990–2010 (Modern Contemporary)</option>
                  </select>
                </div>

                {simCompareBy === 'gender' ? (
                  <div>
                    <label className="block text-xs font-mono-code text-[#B8976C] mb-2 uppercase tracking-wider">
                      Artist Gender Cohort (H1)
                    </label>
                    <select
                      value={simGender}
                      onChange={(e) => setSimGender(e.target.value as any)}
                      className="w-full bg-[#121110] border border-[#302B27] focus:border-[#C8442C] text-xs font-mono-code text-[#EDE8E1] rounded-sm px-3.5 py-2.5 outline-none cursor-pointer"
                    >
                      <option value="Female">Female Artist (Kadın Sanatçı)</option>
                      <option value="Male">Male Artist (Erkek Sanatçı)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono-code text-[#B8976C] mb-2 uppercase tracking-wider">
                      Geographic Origin Cohort (H2)
                    </label>
                    <select
                      value={simOrigin}
                      onChange={(e) => setSimOrigin(e.target.value as any)}
                      className="w-full bg-[#121110] border border-[#302B27] focus:border-[#C8442C] text-xs font-mono-code text-[#EDE8E1] rounded-sm px-3.5 py-2.5 outline-none cursor-pointer"
                    >
                      <option value="Non-Western">Non-Western (Batı-dışı)</option>
                      <option value="Western">Western (Batı)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 3. Calculated Output Display */}
              <div className="p-6 bg-[#121110] border border-[#2B2724] rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono-code text-[#8E867E] uppercase tracking-wider">
                    Empirical Median Acquisition Lag ({simResult.targetLabel})
                  </span>
                  <div className="font-display text-4xl text-[#C8442C] flex items-baseline space-x-2">
                    <span>{simResult.lag}</span>
                    <span className="text-xl font-serif-luxury italic text-[#EDE8E1]">Years</span>
                  </div>
                  <div className="text-xs font-mono-code text-[#A8A096] pt-1">
                    vs. {simResult.benchmarkLabel}: <strong className="text-[#EDE8E1]">{simResult.baseline} yrs</strong>{' '}
                    <span className={simResult.delta > 0 ? 'text-[#C8442C]' : simResult.delta < 0 ? 'text-[#5A9E6F]' : 'text-[#8E867E]'}>
                      ({simResult.delta === 0 ? '0 yrs disparity' : `${simResult.delta > 0 ? `+${simResult.delta}` : simResult.delta} yrs`})
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[#9E968D] lg:max-w-md font-sans leading-relaxed border-t lg:border-t-0 lg:border-l border-[#262220] pt-4 lg:pt-0 lg:pl-6 space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-[#1F1C1A] border border-[#3A332E] rounded-xs font-mono-code text-[10px] text-[#B8976C]">
                    <span>{simResult.hypothesis}</span>
                  </div>
                  <div className="text-xs text-[#C5BEB5] font-sans">
                    <strong className="text-[#EDE8E1]">Statistical Finding:</strong> {simResult.significance}
                  </div>
                  <div className="text-[11px] text-[#8E867E]">
                    <strong className="text-[#A8A096]">Era Note ({simResult.era.period}):</strong> {simResult.era.notableInsight}
                  </div>
                </div>
              </div>

              {/* 4. Independent Hypothesis Methodological Note */}
              <div className="p-3.5 bg-[#100F0E] border-l-2 border-[#B8976C] border-y border-r border-[#221F1D] rounded-r-sm flex items-start space-x-3">
                <Info className="w-4 h-4 text-[#B8976C] shrink-0 mt-0.5" />
                <p className="text-xs font-sans text-[#8E867E] leading-relaxed">
                  <strong className="text-[#C5BEB5]">Methodological Note:</strong> Gender and geography effects were tested independently (H1, H2); this tool does not represent their combined/interaction effect, which was not part of the original analysis.
                </p>
              </div>
            </div>
          );
        })()}

        {/* ========================================================================= */}
        {/* TAB 6: DELIVERABLES & MEDIA HUB (PDF / PPT / LOOKER / VIDEO / CODE) */}
        {/* ========================================================================= */}
        {activeTab === 'deliverables' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-wider block mb-1">
                Research Deliverables // Multimedia & Source Documents
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                Study Artifacts, Presentation Deck & NotebookLM Video
              </h3>
              <p className="text-xs text-[#8E867E] font-sans pt-1 max-w-2xl">
                Explore the complete technical methodology paper, presentation slide deck, interactive Looker Studio dashboard, AI-narrated walkthrough video, and the open-source BigQuery pipeline repository.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Methodology Paper */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C] rounded-sm transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#B8976C]">
                    <FileText className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Methodology Paper (PDF)</span>
                  </div>
                  <h4 className="font-display text-lg text-[#EDE8E1]">Technical Methodology & Robustness Checks</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    Full mathematical specifications, Mann-Whitney U test formulas, log-linear regression specifications (n=5,656), and Wikidata SPARQL query documentation.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    onClick={() => setActiveDocModal('report')}
                    className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#B8976C] hover:bg-[#C9A97E] text-black font-semibold text-xs font-mono-code rounded-sm transition-colors shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Paper (In-App)</span>
                  </button>
                  <a
                    href="/MoMA_Capstone_Report_EN.pdf"
                    download="MoMA_Capstone_Report_EN.pdf"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                    title="Download Original PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B8976C]" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href="/MoMA_Capstone_Report_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#A8A096] hover:text-[#EDE8E1] rounded-sm transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 2. Presentation Deck */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C] rounded-sm transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#C8442C]">
                    <Presentation className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Presentation Slides (PDF)</span>
                  </div>
                  <h4 className="font-display text-lg text-[#EDE8E1]">Who Gets Recognized, and When? (15 Slides)</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    The complete capstone slide deck containing collection scale, H1 & H2 significance tests, movement deviations, and the lost potential regression model.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    onClick={() => setActiveDocModal('presentation')}
                    className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#C8442C] hover:bg-[#D94E35] text-white font-semibold text-xs font-mono-code rounded-sm transition-colors shadow-sm"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>View Slides (Interactive)</span>
                  </button>
                  <a
                    href="/MoMA_Capstone_Presentation_EN.pdf"
                    download="MoMA_Capstone_Presentation_EN.pdf"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#C8442C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                    title="Download Original PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C8442C]" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href="/MoMA_Capstone_Presentation_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#C8442C] text-[#A8A096] hover:text-[#EDE8E1] rounded-sm transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 3. Interactive Dashboard (Looker Studio) */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C] rounded-sm transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#B8976C]">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Interactive BI Dashboard</span>
                  </div>
                  <h4 className="font-display text-lg text-[#EDE8E1]">Google Looker Studio Interactive Dashboard</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    Live multi-page exploratory dashboard connected to BigQuery datamarts with real-time cohort filters across time periods, art movements, and demographics.
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href="https://datastudio.google.com/reporting/a1599e07-6755-49e3-8e67-4b60500d3114"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                  >
                    <span>View Dashboard (Looker Studio)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8976C]" />
                  </a>
                </div>
              </div>

              {/* 4. AI-narrated Video Summary (NotebookLM) */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C] rounded-sm transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#B8976C]">
                    <Video className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Video Walkthrough (AI-narrated)</span>
                  </div>
                  <h4 className="font-display text-lg text-[#EDE8E1]">NotebookLM Video Walkthrough</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    AI-narrated video overview generated by Google NotebookLM from source research documents, synthesizing key findings, methodologies, and visualizations.
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href="https://drive.google.com/file/d/1ajOTI4usEU5237Vu3-4RtvExgalb5sj_/view?usp=share_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                  >
                    <span>Watch Video Summary (AI-narrated, NotebookLM)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8976C]" />
                  </a>
                </div>
              </div>

              {/* 5. BigQuery + dbt Pipeline Repo (GitHub) */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C] rounded-sm transition-all flex flex-col justify-between space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#B8976C]">
                    <Github className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Data Pipeline & GitHub Repo</span>
                  </div>
                  <h4 className="font-display text-lg text-[#EDE8E1]">BigQuery, dbt Models & Python Statistical Notebooks</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    Reproducible transformation pipelines, SQL data models, staging layers, and statistical evaluation scripts powering the entire study.
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href="https://github.com/didemmrsln/moma_capstone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                  >
                    <span>View Code (GitHub)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8976C]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* In-App Document and Slide Deck Viewer Modal */}
        <DocumentViewerModal
          type={activeDocModal}
          onClose={() => setActiveDocModal(null)}
        />
      </div>
    </section>
  );
};
