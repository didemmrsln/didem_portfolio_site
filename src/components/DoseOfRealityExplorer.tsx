import React, { useState } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import {
  BarChart3,
  Users,
  Layers,
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
  LayoutDashboard,
  Github,
  BookOpen
} from 'lucide-react';
import {
  DOSE_OVERVIEW,
  DOSE_GENDER_COMPARISON,
  DOSE_INGREDIENT_MECHANISM,
  DOSE_INGREDIENT_COUNTERFACTUAL,
  DOSE_PANDEMIC_EFFECT,
  DOSE_CYCLE_ORDER,
  DOSE_COHORT_TRENDS,
  FEATURED_PROJECTS
} from '../data/portfolioData';
import { DocumentViewerModal, DOSE_SLIDES } from './DocumentViewerModal';

export const DoseOfRealityExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'scope' | 'hypotheses' | 'weighting' | 'exceedance' | 'pandemic' | 'cohort' | 'deliverables'
  >('scope');

  // Tab 3: Weighting toggle state (unweighted vs weighted)
  const [weightingMode, setWeightingMode] = useState<'unweighted' | 'weighted'>('weighted');

  // Cohort Trends state
  const [cohortFactor, setCohortFactor] = useState<'gender' | 'ageGroup' | 'ethnicity' | 'ingredient'>('gender');
  const [cohortMetric, setCohortMetric] = useState<'overlap' | 'exceedance'>('overlap');
  const [hoveredPoint, setHoveredPoint] = useState<{ series: string; idx: number } | null>(null);

  // Document Viewer Modal State (for in-app reading of PDF Report & Slides)
  const [activeDocModal, setActiveDocModal] = useState<'report' | 'presentation' | null>(null);

  const { formatted: formattedTotalObservations, ref: totalObsRef } = useCountUp(
    DOSE_OVERVIEW.totalObservations,
    { duration: 1100 }
  );

  // Extract the project from FEATURED_PROJECTS
  const doseProject = FEATURED_PROJECTS.find((p) => p.id === 'dose-of-reality');

  // Hypotheses data from DOSE_SLIDES[3]
  const hypotheses = DOSE_SLIDES[3]?.content?.hypotheses || [
    { code: "H1", topic: "Gender", question: "Do overlap and exceedance differ between women and men?", status: "Consistent 24-year gap (p < 0.0001)" },
    { code: "H2", topic: "Age Group", question: "Does risk increase with age?", status: "Strongest factor (F=584.79, p<0.0001)" },
    { code: "H3", topic: "Ethnicity", question: "Which group stands out for which ingredient?", status: "Weakest but significant (F=12.69, p<0.0001)" },
    { code: "H4", topic: "Pandemic Effect", question: "How large is the 2021–2023 deviation, really?", status: "−20.9 points vs. pre-pandemic projection" }
  ];

  const currentGenderData = weightingMode === 'weighted' 
    ? DOSE_GENDER_COMPARISON.weighted 
    : DOSE_GENDER_COMPARISON.unweighted;

  return (
    <section id="dose-explorer" className="py-24 md:py-36 bg-[#11100F] border-b border-[#24211E] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header with Empirical Scope */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#262220] gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Data Study // U.S. Supplement Usage Analysis
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#EDE8E1] tracking-tight">
              Dose of <span className="font-serif-luxury italic text-[#C8442C]">Reality</span>
            </h2>
            <p className="font-serif-luxury text-xl text-[#B8976C] italic leading-relaxed font-light">
              {DOSE_OVERVIEW.subtitle}
            </p>
            <p className="text-sm text-[#8E867E] font-sans pt-1 leading-relaxed">
              A design-based statistical study of dietary supplement overlap and safe-upper-limit exceedance across {DOSE_OVERVIEW.totalObservations.toLocaleString()} person-cycle observations.
            </p>
            <div className="text-xs font-mono-code text-[#7A726A] pt-1">
              By {DOSE_OVERVIEW.author} · {DOSE_OVERVIEW.bootcamp}
            </div>
          </div>

          {/* Metric Highlights Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm">
              <div className="text-[10px] font-mono-code text-[#8E867E]">Person-Cycle Obs.</div>
              <div ref={totalObsRef} className="font-display text-xl text-[#EDE8E1]">
                {formattedTotalObservations}
              </div>
            </div>
            <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm">
              <div className="text-[10px] font-mono-code text-[#8E867E]">NHANES Cycles</div>
              <div className="font-display text-xl text-[#EDE8E1]">{DOSE_OVERVIEW.cycles}</div>
              <div className="text-[10px] font-mono-code text-[#7A726A] mt-0.5">1999–2023</div>
            </div>
            <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono-code text-[#B8976C]">Ingredients Examined</div>
              <div className="font-display text-xl text-[#C8442C] leading-tight">
                {DOSE_OVERVIEW.ingredientsExamined}
              </div>
              <div className="text-xs font-serif-luxury italic text-[#8E867E] mt-0.5">
                Vit D, Fe, Mg, B3, Zn, Vit A
              </div>
            </div>
          </div>
        </div>

        {/* Study Exploration Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[#161514] border border-[#262220] rounded-sm">
          <button
            onClick={() => setActiveTab('scope')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'scope'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            1. Scope & Trend
          </button>
          <button
            onClick={() => setActiveTab('hypotheses')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'hypotheses'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            2. Four Hypotheses (H1–H4)
          </button>
          <button
            onClick={() => setActiveTab('weighting')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'weighting'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            3. H1 Deep-Dive: Weighting Effect
          </button>
          <button
            onClick={() => setActiveTab('cohort')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'cohort'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            Cohort Trends (Interactive)
          </button>
          <button
            onClick={() => setActiveTab('exceedance')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'exceedance'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            4. Source of Exceedance
          </button>
          <button
            onClick={() => setActiveTab('pandemic')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'pandemic'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            5. Pandemic Effect (H4)
          </button>
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-4 py-2 text-xs font-mono-code rounded-sm transition-all ${
              activeTab === 'deliverables'
                ? 'bg-[#C8442C] text-white shadow-sm'
                : 'text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#201D1A]'
            }`}
          >
            6. Report / Deck / Video Hub
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SCOPE & TREND */}
        {/* ========================================================================= */}
        {activeTab === 'scope' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Study Overview // Scope & Historical Trend
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  24-Year Population Architecture & Usage Trajectory
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Evaluating 46,388 person-cycle records across 10 CDC NHANES survey cycles under official survey-weighting guidelines.
                </p>
              </div>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#141312] border border-[#262220] rounded-sm space-y-1">
                <div className="text-[10px] font-mono-code text-[#8E867E] uppercase">Observations</div>
                <div className="font-display text-2xl text-[#EDE8E1]">46,388</div>
                <div className="text-xs text-[#7A726A] pt-1">10 cycles across 24 years (1999–2023)</div>
              </div>
              <div className="p-5 bg-[#141312] border border-[#262220] rounded-sm space-y-1">
                <div className="text-[10px] font-mono-code text-[#8E867E] uppercase">Data Pipeline</div>
                <div className="font-display text-2xl text-[#EDE8E1]">BigQuery + dbt</div>
                <div className="text-xs text-[#7A726A] pt-1">Raw → Staging → Intermediate → Marts</div>
              </div>
              <div className="p-5 bg-[#141312] border border-[#262220] rounded-sm space-y-1">
                <div className="text-[10px] font-mono-code text-[#8E867E] uppercase">Statistical Engine</div>
                <div className="font-display text-2xl text-[#EDE8E1]">Python svy</div>
                <div className="text-xs text-[#7A726A] pt-1">Design-based t, Kruskal-Wallis, 1-sample tests</div>
              </div>
              <div className="p-5 bg-[#141312] border border-[#262220] rounded-sm space-y-1">
                <div className="text-[10px] font-mono-code text-[#8E867E] uppercase">Key Nutrients</div>
                <div className="font-display text-2xl text-[#C8442C]">6 Nutrients</div>
                <div className="text-xs text-[#7A726A] pt-1">Vit D, Iron, Mg, Niacin, Zinc, Vit A</div>
              </div>
            </div>

            {/* 3-Point Verified Trend Comparison */}
            <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8442C]" />
                  <h4 className="font-display text-lg text-[#EDE8E1]">
                    Reported Population Usage Trend Points (Verified Values)
                  </h4>
                </div>
                <span className="text-[10px] font-mono-code text-[#B8976C] px-2 py-0.5 bg-[#201D1A] rounded-sm border border-[#332D28]">
                  3 Exact Benchmark Cycles
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Point 1: 1999-2002 */}
                <div className="p-5 bg-[#181615] border border-[#2B2724] rounded-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#8E867E]">1999–2002 Cycle</span>
                    <span className="text-[#B8976C] font-semibold">Baseline</span>
                  </div>
                  <div className="text-3xl font-display text-[#EDE8E1]">51.7%</div>
                  <div className="text-xs text-[#8E867E] leading-relaxed">
                    Initial 4-year survey block combined per CDC recommendation (WTINT4YR weight).
                  </div>
                  <div className="h-2 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                    <div style={{ width: '51.7%' }} className="h-full bg-[#8E867E] rounded-full" />
                  </div>
                </div>

                {/* Point 2: 2017-2020 */}
                <div className="p-5 bg-[#181615] border border-[#2B2724] rounded-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#8E867E]">2017–2020 Cycle</span>
                    <span className="text-[#4E9F3D] font-semibold">Pre-Pandemic Peak</span>
                  </div>
                  <div className="text-3xl font-display text-[#EDE8E1]">57.7%</div>
                  <div className="text-xs text-[#8E867E] leading-relaxed">
                    Peak of 20+ years of steady, uninterrupted population usage growth (+6.0 pts).
                  </div>
                  <div className="h-2 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                    <div style={{ width: '57.7%' }} className="h-full bg-[#4E9F3D] rounded-full" />
                  </div>
                </div>

                {/* Point 3: 2021-2023 */}
                <div className="p-5 bg-[#181615] border border-[#2B2724] rounded-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#8E867E]">2021–2023 Cycle</span>
                    <span className="text-[#C8442C] font-semibold">Drop & Intensification</span>
                  </div>
                  <div className="text-3xl font-display text-[#C8442C]">34.3%</div>
                  <div className="text-xs text-[#8E867E] leading-relaxed">
                    Usage fell to 34.3% — yet multi-product use among remaining users rose from <strong className="text-[#EDE8E1]">55.4% to 61.7%</strong>.
                  </div>
                  <div className="h-2 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                    <div style={{ width: '34.3%' }} className="h-full bg-[#C8442C] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Methodological Footnote */}
              <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm text-xs font-sans flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-[#B8976C] shrink-0 mt-0.5" />
                <p className="text-[#9E968D] text-[11px] leading-relaxed">
                  Only these three cycles have exact reported values in the source report; the other seven NHANES cycles are visualized in the source charts but not individually quantified in text, so they are not plotted here as precise figures.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: FOUR HYPOTHESES (H1–H4) */}
        {/* ========================================================================= */}
        {activeTab === 'hypotheses' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Empirical Evaluation // Hypotheses 1 to 4
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Core Hypotheses Tested Against Design-Based Statistics
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Each hypothesis follows the same rigorous pipeline: research question → raw unweighted finding → survey-weighted statistical validation.
                </p>
              </div>
            </div>

            {/* 4 Hypotheses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hypotheses.map((h, idx) => (
                <div key={idx} className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#C8442C]" />
                        <span className="font-mono-code text-xs text-[#B8976C] font-semibold">{h.code}</span>
                        <h4 className="font-display text-lg text-[#EDE8E1]">{h.topic}</h4>
                      </div>
                      <span className="text-[10px] font-mono-code text-[#8E867E] px-2 py-0.5 bg-[#1B1917] rounded-sm border border-[#2A2622]">
                        24-Year NHANES
                      </span>
                    </div>
                    <p className="text-sm text-[#EDE8E1] font-serif-luxury italic leading-relaxed">
                      "{h.question}"
                    </p>
                  </div>

                  <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm space-y-1">
                    <div className="text-[10px] font-mono-code text-[#B8976C] uppercase">Statistical Validation</div>
                    <div className="text-xs font-mono-code text-[#4E9F3D] font-bold">{h.status}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="p-4 bg-[#141312] border border-[#262220] rounded-sm text-xs text-[#8E867E] leading-relaxed flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-[#4E9F3D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#EDE8E1]">Statistical Uniformity:</strong> 7 of 8 design-based tests demonstrated high statistical significance at <span className="font-mono-code text-[#EDE8E1]">p &lt; 0.0001</span>. Age is the single strongest factor, followed by Gender and Ethnicity.
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: H1 DEEP-DIVE: WEIGHTING EFFECT (INTERACTIVE) */}
        {/* ========================================================================= */}
        {activeTab === 'weighting' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Hypothesis 1 Interactive Deep-Dive // Weighting Validation
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Gender Gap & Survey Weighting Effect
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Applying NHANES's official survey weighting rules didn't reverse or diminish the gender gap — it confirmed and strengthened it.
                </p>
              </div>

              {/* Weighting Toggle Button Pair */}
              <div className="flex items-center space-x-1.5 bg-[#121110] p-1 rounded-sm border border-[#262220]">
                <button
                  onClick={() => setWeightingMode('unweighted')}
                  className={`px-3.5 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                    weightingMode === 'unweighted'
                      ? 'bg-[#C8442C] text-white font-medium shadow-sm'
                      : 'text-[#8E867E] hover:text-[#EDE8E1]'
                  }`}
                >
                  Unweighted
                </button>
                <button
                  onClick={() => setWeightingMode('weighted')}
                  className={`px-3.5 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                    weightingMode === 'weighted'
                      ? 'bg-[#C8442C] text-white font-medium shadow-sm'
                      : 'text-[#8E867E] hover:text-[#EDE8E1]'
                  }`}
                >
                  Weighted (Official NHANES Rule)
                </button>
              </div>
            </div>

            {/* Interactive Bars Visualizer */}
            <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8442C]" />
                  <h4 className="font-display text-lg text-[#EDE8E1]">
                    H1 · Gender Overlap Rates ({weightingMode === 'weighted' ? 'Survey-Weighted' : 'Raw Unweighted'})
                  </h4>
                </div>
                <span className="text-[10px] font-mono-code text-[#B8976C] px-2 py-0.5 bg-[#201D1A] rounded-sm border border-[#332D28]">
                  24-Year Pooled Cohort
                </span>
              </div>

              <div className="space-y-5">
                {/* Female Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code">
                    <span className="text-[#C8442C] font-medium">Female Participants (Overlap Rate)</span>
                    <span className="text-[#EDE8E1] font-bold text-sm">{currentGenderData.female}%</span>
                  </div>
                  <div className="h-3.5 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                    <div
                      style={{ width: `${(currentGenderData.female / 60) * 100}%` }}
                      className="h-full bg-[#C8442C] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Male Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code">
                    <span className="text-[#8E867E]">Male Participants (Overlap Rate)</span>
                    <span className="text-[#EDE8E1] font-bold text-sm">{currentGenderData.male}%</span>
                  </div>
                  <div className="h-3.5 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724]">
                    <div
                      style={{ width: `${(currentGenderData.male / 60) * 100}%` }}
                      className="h-full bg-[#8E867E] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Statistical Finding & Significance Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#1B1917] border border-[#2E2925] rounded-sm space-y-1.5">
                  <div className="text-[10px] font-mono-code text-[#B8976C] uppercase">Design-Based T-Test (Overlap)</div>
                  <div className="text-sm font-mono-code text-[#4E9F3D] font-bold">
                    {DOSE_GENDER_COMPARISON.overlapTest.statistic}, df = {DOSE_GENDER_COMPARISON.overlapTest.df} ({DOSE_GENDER_COMPARISON.overlapTest.pValue})
                  </div>
                  <div className="text-xs text-[#8E867E]">Female overlap is significantly higher across 24 pooled years.</div>
                </div>

                <div className="p-4 bg-[#1B1917] border border-[#2E2925] rounded-sm space-y-1.5">
                  <div className="text-[10px] font-mono-code text-[#B8976C] uppercase">Design-Based T-Test (UL Exceedance)</div>
                  <div className="text-sm font-mono-code text-[#4E9F3D] font-bold">
                    {DOSE_GENDER_COMPARISON.exceedanceTest.statistic} ({DOSE_GENDER_COMPARISON.exceedanceTest.pValue})
                  </div>
                  <div className="text-xs text-[#8E867E]">Exceedance gap has widened systematically since 2017.</div>
                </div>
              </div>

              {/* Note Text */}
              <div className="p-3 bg-[#161514] border border-[#262220] rounded-sm text-xs font-sans text-[#A89F95] leading-relaxed">
                {DOSE_GENDER_COMPARISON.note}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COHORT TRENDS (INTERACTIVE) */}
        {/* ========================================================================= */}
        {activeTab === 'cohort' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Cohort Trends // All 10 NHANES Cycles
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Overlap & UL Exceedance by Cohort, 1999–2023
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Select a demographic factor and a metric to see the full 24-year trajectory for every group.
                </p>
              </div>
            </div>

            {/* Two-level selector */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-1.5 bg-[#121110] p-1 rounded-sm border border-[#262220]">
                {(['gender', 'ageGroup', 'ethnicity', 'ingredient'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setCohortFactor(f)}
                    className={`px-3.5 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                      cohortFactor === f
                        ? 'bg-[#C8442C] text-white font-medium shadow-sm'
                        : 'text-[#8E867E] hover:text-[#EDE8E1]'
                    }`}
                  >
                    {f === 'gender' ? 'Gender' : f === 'ageGroup' ? 'Age Group' : f === 'ethnicity' ? 'Ethnicity' : 'By Ingredient'}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-1.5 bg-[#121110] p-1 rounded-sm border border-[#262220]">
                {(['overlap', 'exceedance'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setCohortMetric(m)}
                    className={`px-3.5 py-1.5 text-xs font-mono-code rounded-sm transition-all ${
                      cohortMetric === m
                        ? 'bg-[#B8976C] text-black font-semibold shadow-sm'
                        : 'text-[#B8976C] hover:text-white'
                    }`}
                  >
                    {m === 'overlap' ? 'Overlap' : 'UL Exceedance'}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG multi-line chart */}
            {(() => {
              const seriesData = DOSE_COHORT_TRENDS[cohortFactor][cohortMetric] as Record<string, number[]>;
              const seriesNames = Object.keys(seriesData);
              const palette = ['#C8442C', '#B8976C', '#4E9F3D', '#2980B9', '#8E44AD', '#E8A33D'];
              const allValues = seriesNames.flatMap((s) => seriesData[s]);
              const maxVal = Math.ceil(Math.max(...allValues) / 5) * 5 + 5;
              const width = 900, height = 320, padL = 40, padR = 20, padT = 20, padB = 40;
              const plotW = width - padL - padR, plotH = height - padT - padB;
              const xStep = plotW / (DOSE_CYCLE_ORDER.length - 1);
              const yScale = (v: number) => padT + plotH - (v / maxVal) * plotH;
              const xScale = (i: number) => padL + i * xStep;

              return (
                <div className="p-4 sm:p-6 bg-[#121110] border border-[#262220] rounded-sm overflow-x-auto">
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[700px]" style={{ height: 'auto' }}>
                    {/* Y gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => (
                      <g key={i}>
                        <line
                          x1={padL} x2={width - padR}
                          y1={padT + plotH * (1 - frac)} y2={padT + plotH * (1 - frac)}
                          stroke="#2B2724" strokeWidth="1"
                        />
                        <text x={padL - 8} y={padT + plotH * (1 - frac) + 4} textAnchor="end" fontSize="9" fill="#7A726A" fontFamily="monospace">
                          {Math.round(maxVal * frac)}%
                        </text>
                      </g>
                    ))}
                    {/* X labels */}
                    {DOSE_CYCLE_ORDER.map((c, i) => (
                      <text key={c} x={xScale(i)} y={height - 8} textAnchor="middle" fontSize="8" fill="#7A726A" fontFamily="monospace">
                        {c.replace('20', "'")}
                      </text>
                    ))}
                    {/* Lines + points */}
                    {seriesNames.map((name, si) => {
                      const color = palette[si % palette.length];
                      const points = seriesData[name].map((v, i) => `${xScale(i)},${yScale(v)}`).join(' ');
                      return (
                        <g key={name}>
                          <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
                          {seriesData[name].map((v, i) => (
                            <circle
                              key={i}
                              cx={xScale(i)} cy={yScale(v)} r={hoveredPoint?.series === name && hoveredPoint?.idx === i ? 5 : 3}
                              fill={color}
                              stroke="#11100F" strokeWidth="1"
                              onMouseEnter={() => setHoveredPoint({ series: name, idx: i })}
                              onMouseLeave={() => setHoveredPoint(null)}
                              style={{ cursor: 'pointer' }}
                            />
                          ))}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {seriesNames.map((name, si) => (
                      <div key={name} className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette[si % palette.length] }} />
                        <span className="text-[10px] font-mono-code text-[#A8A096]">{name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover readout */}
                  {hoveredPoint && (
                    <div className="mt-3 p-2.5 bg-[#181615] border border-[#332D28] rounded-sm text-xs font-mono-code text-[#EDE8E1] inline-block">
                      {hoveredPoint.series} · {DOSE_CYCLE_ORDER[hoveredPoint.idx]}: {' '}
                      <span className="text-[#C8442C] font-bold">
                        {seriesData[hoveredPoint.series][hoveredPoint.idx]}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Source footnote */}
            <div className="p-3 bg-[#161514] border border-[#262220] rounded-sm text-xs font-sans text-[#8E867E] leading-relaxed flex items-start space-x-2.5">
              <Info className="w-3.5 h-3.5 text-[#B8976C] shrink-0 mt-0.5" />
              <span>{DOSE_COHORT_TRENDS.sourceNote}</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SOURCE OF EXCEEDANCE */}
        {/* ========================================================================= */}
        {activeTab === 'exceedance' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Mechanistic Breakdown // Multi-Product Overlap vs Single-Product Dose
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Where Does Safe-Upper-Limit Exceedance Come From?
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Testing whether exceedance stems systematically from stacking products rather than single-product dosages.
                </p>
              </div>
            </div>

            {/* Population-Wide Distribution Visualizer */}
            <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8442C]" />
                  <h4 className="font-display text-lg text-[#EDE8E1]">
                    Population-Wide Source of UL Exceedance
                  </h4>
                </div>
                <span className="text-[10px] font-mono-code text-[#4E9F3D] px-2 py-0.5 bg-[#1B281B] rounded-sm border border-[#2C482B]">
                  {DOSE_PANDEMIC_EFFECT.overallSourceOfExceedance.test}
                </span>
              </div>

              {/* Two-segment visual bar */}
              <div className="space-y-2">
                <div className="h-6 w-full bg-[#1A1817] rounded-full overflow-hidden border border-[#2B2724] flex">
                  <div
                    style={{ width: `${DOSE_PANDEMIC_EFFECT.overallSourceOfExceedance.overlap}%` }}
                    className="h-full bg-[#C8442C] transition-all flex items-center justify-center text-[10px] font-mono-code font-bold text-white"
                  >
                    Overlap: {DOSE_PANDEMIC_EFFECT.overallSourceOfExceedance.overlap}%
                  </div>
                  <div
                    style={{ width: `${DOSE_PANDEMIC_EFFECT.overallSourceOfExceedance.singleProduct}%` }}
                    className="h-full bg-[#B8976C] transition-all flex items-center justify-center text-[10px] font-mono-code font-bold text-black"
                  >
                    Single-Product: {DOSE_PANDEMIC_EFFECT.overallSourceOfExceedance.singleProduct}%
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-mono-code pt-1">
                  <span className="text-[#C8442C] flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#C8442C] inline-block" />
                    <span>64.2% Exceedance from Multi-Product Overlap</span>
                  </span>
                  <span className="text-[#B8976C] flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-[#B8976C] inline-block" />
                    <span>35.8% Exceedance from Single-Product Dosage</span>
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm text-xs text-[#9E968D] leading-relaxed">
                A one-sample test against 50% confirms that exceedance stems systematically from multi-product overlap rather than chance (<span className="font-mono-code text-[#EDE8E1]">t = 21.37, p &lt; 0.0001</span>).
              </div>
            </div>

            {/* 6 Ingredients Mechanism Grid */}
            <div className="space-y-4">
              <h4 className="font-display text-lg text-[#EDE8E1] flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#B8976C]" />
                <span>Nutrient-Specific Risk Profiles</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DOSE_INGREDIENT_MECHANISM.map((item, idx) => {
                  let badgeStyle = "bg-[#201D1A] text-[#8E867E] border-[#332D28]";
                  if (item.mechanism.startsWith('Overlap-Driven')) {
                    badgeStyle = "bg-[#1B281B] text-[#4E9F3D] border-[#2C482B]";
                  } else if (item.mechanism.startsWith('Single-Product-Driven')) {
                    badgeStyle = "bg-[#2A2318] text-[#D4A373] border-[#4A3D28]";
                  } else if (item.mechanism.startsWith('Mixed')) {
                    badgeStyle = "bg-[#1A232A] text-[#5DADE2] border-[#253846]";
                  }

                  return (
                    <div
                      key={idx}
                      className="p-5 bg-[#141312] border border-[#262220] hover:border-[#38312B] rounded-sm space-y-3 transition-colors flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-display text-base text-[#EDE8E1] font-semibold">{item.ingredient}</h5>
                          <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-sm border ${badgeStyle}`}>
                            {item.mechanism}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 pt-1">
                          <span className="text-[10px] font-mono-code text-[#C8442C]">Overlap-Driven: {item.overlapDrivenPct}%</span>
                          <span className="text-[10px] font-mono-code text-[#B8976C]">Single-Product: {item.singleProductPct}%</span>
                        </div>
                        <p className="text-xs text-[#A89F95] leading-relaxed font-sans">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PANDEMIC EFFECT (H4) */}
        {/* ========================================================================= */}
        {activeTab === 'pandemic' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Hypothesis 4 // Counterfactual Analysis
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Pandemic Era Deviation (2021–2023)
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Comparing actual observed 2021–2023 behavior against the counterfactual projection derived from 1999–2020 pre-pandemic trends.
                </p>
              </div>
            </div>

            {/* Two Main Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Overall Usage Deviation */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-xs text-[#C8442C] uppercase font-semibold">
                      Overall Usage Deviation
                    </span>
                    <span className="text-[10px] font-mono-code text-[#8E867E] px-2 py-0.5 bg-[#1B1917] rounded-sm border border-[#2A2622]">
                      Pre-Pandemic Baseline
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-3">
                    <div className="text-4xl sm:text-5xl font-display text-[#C8442C]">
                      {DOSE_PANDEMIC_EFFECT.deviationPts}
                    </div>
                    <div className="text-sm font-mono-code text-[#EDE8E1]">percentage points</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm">
                      <div className="text-[10px] font-mono-code text-[#8E867E]">Observed 2021–2023</div>
                      <div className="font-display text-xl text-[#EDE8E1]">{DOSE_PANDEMIC_EFFECT.actualUsage2021_23}%</div>
                    </div>
                    <div className="p-3 bg-[#181615] border border-[#2B2724] rounded-sm">
                      <div className="text-[10px] font-mono-code text-[#B8976C]">Approx. Projected</div>
                      <div className="font-display text-xl text-[#B8976C]">~{DOSE_PANDEMIC_EFFECT.projectedUsage2021_23Approx}%</div>
                    </div>
                  </div>

                  <p className="text-xs text-[#A89F95] leading-relaxed font-sans pt-1">
                    Overall supplement use fell dramatically below trend — however, multi-product use among remaining users jumped from 55.4% to 61.7%.
                  </p>
                </div>

                <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm text-[11px] font-mono-code text-[#8E867E] leading-relaxed">
                  {DOSE_PANDEMIC_EFFECT.projectedNote}
                </div>
              </div>

              {/* Card 2: Vitamin D vs Zinc Comparison */}
              <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-xs text-[#B8976C] uppercase font-semibold">
                      Vitamin D vs. Zinc Exceedance
                    </span>
                    <span className="text-[10px] font-mono-code text-[#8E867E] px-2 py-0.5 bg-[#1B1917] rounded-sm border border-[#2A2622]">
                      2021–2023 Spike
                    </span>
                  </div>

                  <div className="space-y-4 pt-1">
                    {/* Vitamin D */}
                    <div className="p-4 bg-[#181615] border border-[#2B2724] rounded-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base text-[#EDE8E1] font-semibold">Vitamin D UL Exceedance</span>
                        <span className="text-lg font-mono-code text-[#C8442C] font-bold">
                          {DOSE_PANDEMIC_EFFECT.vitaminD.exceedance2021_23}%
                        </span>
                      </div>
                      <div className="text-xs text-[#8E867E] leading-relaxed">
                        Baseline: {DOSE_PANDEMIC_EFFECT.vitaminD.baseline}. Represents a continuous, accelerating 24-year rise driven by overlap.
                      </div>
                    </div>

                    {/* Zinc */}
                    <div className="p-4 bg-[#181615] border border-[#2B2724] rounded-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base text-[#EDE8E1] font-semibold">Zinc UL Exceedance</span>
                        <span className="text-lg font-mono-code text-[#B8976C] font-bold">
                          {DOSE_PANDEMIC_EFFECT.zinc.exceedance2021_23}%
                        </span>
                      </div>
                      <div className="text-xs text-[#8E867E] leading-relaxed">
                        Baseline: {DOSE_PANDEMIC_EFFECT.zinc.baseline}. Represents a sudden, acute post-pandemic behavior jump.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#1B1917] border border-[#2E2925] rounded-sm text-xs text-[#A89F95] leading-relaxed">
                  <strong className="text-[#EDE8E1]">Takeaway:</strong> Even though both ingredients peaked in 2021–2023, Vitamin D is a chronic structural rise while Zinc is an acute pandemic reaction.
                </div>
              </div>
            </div>

            {/* Callout Box */}
            <div className="p-4 bg-[#161514] border border-[#2B2724] rounded-sm text-xs font-sans text-[#EDE8E1] leading-relaxed flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-[#B8976C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#B8976C] block mb-1 font-mono-code text-[11px] uppercase tracking-wider">
                  Cross-Nutrient Disparity
                </strong>
                <p className="text-[#A89F95]">
                  Zinc was the biggest surprise: overlap came in 8.0 points above the pre-pandemic projection and UL exceedance 5.5 points above — while Vitamin A came in under projection on both measures (−1.2 / −0.5 points). The pandemic's effect on supplement risk was not uniform across ingredients.
                </p>
              </div>
            </div>

            {/* 6-Row Counterfactual Comparison Table */}
            <div className="p-6 bg-[#141312] border border-[#262220] rounded-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#262220]">
                <div>
                  <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-0.5">
                    Empirical Model Projection vs. Reality
                  </span>
                  <h4 className="font-display text-lg text-[#EDE8E1]">
                    UL Exceedance: Pre-Pandemic Projection vs. Actual (2021–2023)
                  </h4>
                </div>
                <span className="text-[10px] font-mono-code text-[#8E867E] px-2 py-0.5 bg-[#1B1917] rounded-sm border border-[#2A2622]">
                  Sorted by |Deviation|
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono-code text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#2B2724] text-[#8E867E]">
                      <th className="py-2.5 pr-4 font-normal">Ingredient</th>
                      <th className="py-2.5 px-4 font-normal text-right">Projected (1999–2020 Model)</th>
                      <th className="py-2.5 px-4 font-normal text-right">Actual Observed (2021–2023)</th>
                      <th className="py-2.5 pl-4 font-normal text-right">Difference (Points)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#201D1B]">
                    {Object.entries(DOSE_INGREDIENT_COUNTERFACTUAL.exceedance)
                      .map(([name, data]) => ({ name, ...data }))
                      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
                      .map((row) => {
                        const isOver = row.diff > 0;
                        return (
                          <tr key={row.name} className="hover:bg-[#1A1817] transition-colors">
                            <td className="py-3 pr-4 font-sans text-sm font-medium text-[#EDE8E1]">
                              {row.name}
                            </td>
                            <td className="py-3 px-4 text-right text-[#8E867E]">
                              {row.projected}%
                            </td>
                            <td className="py-3 px-4 text-right text-[#EDE8E1] font-semibold">
                              {row.actual}%
                            </td>
                            <td className="py-3 pl-4 text-right">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold ${
                                  isOver
                                    ? 'bg-[#2A1B1A] text-[#C8442C] border border-[#482826]'
                                    : 'bg-[#1B281B] text-[#4E9F3D] border border-[#2C482B]'
                                }`}
                              >
                                {isOver ? `+${row.diff}` : row.diff} pts
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: REPORT / DECK / VIDEO HUB */}
        {/* ========================================================================= */}
        {activeTab === 'deliverables' && (
          <div className="bg-[#181615] border border-[#2B2724] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262220] gap-4">
              <div>
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider block mb-1">
                  Deliverables // Research Assets
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Capstone Research Hub & Artifacts
                </h3>
                <p className="text-xs text-[#8E867E] font-sans pt-1">
                  Access the full methodology report, interactive slide deck, AI-narrated walkthrough, and GitHub ELT pipelines.
                </p>
              </div>
            </div>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Methodology Report */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C] rounded-sm transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#B8976C]">
                    <FileText className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Methodology Paper (PDF)</span>
                  </div>
                  <h4 className="font-display text-lg text-[#EDE8E1]">Dose of Reality: Research Paper (5 Chapters)</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    Complete capstone research paper covering research questions, NHANES survey-weighting methodology, hypothesis validations, and discussion.
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
                    href="/Dose_of_Reality_Report_EN.pdf"
                    download="Dose_of_Reality_Report_EN.pdf"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                    title="Download Original PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B8976C]" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href="/Dose_of_Reality_Report_EN.pdf"
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
                  <h4 className="font-display text-lg text-[#EDE8E1]">Dose of Reality: Capstone Deck (12 Slides)</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    The complete capstone presentation deck covering overlap mechanisms, demographic factors, counterfactual analysis, and public health conclusions.
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
                    href="/Dose_of_Reality_Presentation_EN.pdf"
                    download="Dose_of_Reality_Presentation_EN.pdf"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#C8442C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
                    title="Download Original PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C8442C]" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href="/Dose_of_Reality_Presentation_EN.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#C8442C] text-[#A8A096] hover:text-[#EDE8E1] rounded-sm transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 3. Interactive Dashboard (Placeholder / Coming Soon) */}
              <div className="p-6 bg-[#141312] border border-[#2B2724] opacity-75 rounded-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#8E867E]">
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-mono-code text-xs uppercase font-medium">Interactive BI Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-display text-lg text-[#8E867E]">Google Looker Studio Dashboard</h4>
                    <span className="text-[10px] font-mono-code text-[#B8976C] px-2 py-0.5 bg-[#201D1A] rounded-sm border border-[#332D28]">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-[#7A726A] leading-relaxed">
                    Interactive multi-page exploratory dashboard connected to NHANES BigQuery datamarts with cohort and nutrient filters (link to be added once published).
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#1B1917] border border-[#2A2622] text-[#7A726A] text-xs font-mono-code rounded-sm cursor-not-allowed">
                    <span>Dashboard in Publication Pipeline</span>
                  </div>
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
                    href="https://drive.google.com/file/d/1Q9-42b-Aue8TZS1yXjlc7bWH6I7K32kV/view?usp=share_link"
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
                  <h4 className="font-display text-lg text-[#EDE8E1]">BigQuery, dbt Models & Python svy Statistical Notebooks</h4>
                  <p className="text-xs text-[#8E867E] leading-relaxed">
                    Layered ELT transformation models (Raw, Staging, Intermediate, Marts) and Python survey-weighted evaluation scripts.
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href="https://github.com/didemmrsln/dose-of-reality"
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
          project="dose"
          onClose={() => setActiveDocModal(null)}
        />
      </div>
    </section>
  );
};
