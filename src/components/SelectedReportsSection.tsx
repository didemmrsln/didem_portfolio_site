import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Sparkles, CheckCircle2, BookOpen, ArrowRight, Github, Presentation } from 'lucide-react';
import { MOMA_OVERVIEW } from '../data/portfolioData';
import { DocumentViewerModal } from './DocumentViewerModal';

interface ReportItem {
  id: string;
  projectTitle: string;
  projectSubtitle: string;
  reportTitle: string;
  format: string;
  status: 'Completed' | 'In Progress';
  date: string;
  summary: string;
  keyMetrics: string[];
  docUrl?: string;
  githubUrl?: string;
  anchorLink?: string;
}

export const SelectedReportsSection: React.FC = () => {
  const [activeDocModal, setActiveDocModal] = useState<'report' | 'presentation' | null>(null);

  const reports: ReportItem[] = [
    {
      id: 'recognition-lag-methodology',
      projectTitle: 'The Recognition Lag',
      projectSubtitle: 'Who Gets Recognized, and When?',
      reportTitle: 'Methodology Report & Statistical Appendix',
      format: 'Word (.docx) / PDF',
      status: 'Completed',
      date: 'Capstone Archive',
      summary:
        `Comprehensive empirical framework documenting the data collection pipeline (BigQuery, dbt, Wikidata SPARQL), hypothesis testing (Mann-Whitney U tests for gender & geography at α=0.05), autocorrelation analysis (r=0.855 institutional rhythm), and log-linear career trajectory regression (R²=0.705) across ${MOMA_OVERVIEW.totalArtworks.toLocaleString()} cataloged artworks.`,
      keyMetrics: [`${MOMA_OVERVIEW.totalArtworks.toLocaleString()} Works`, `${MOMA_OVERVIEW.totalArtists.toLocaleString()} Artists`, 'Mann-Whitney U (α=0.05)', 'R² = 0.705 Regression'],
      docUrl: '/MoMA_Capstone_Report_EN.pdf',
      githubUrl: 'https://github.com/didemmrsln/moma_capstone',
      anchorLink: '#moma-explorer',
    },
  ];

  return (
    <section id="selected-reports" className="py-20 bg-[#0F0E0D] border-b border-[#24211E] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#221F1D] gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Research Archive // Papers & Technical Documentation
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#EDE8E1] tracking-tight">
              Selected Reports
            </h2>
            <p className="font-serif-luxury text-lg text-[#A8A096] italic leading-relaxed font-light">
              Complete methodology papers, statistical appendices, and research publications across all portfolio projects.
            </p>
          </div>

          <div className="font-mono-code text-xs text-[#8E867E]">
            <span>1 Active Report Published</span>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 sm:p-8 bg-[#141312] border border-[#2B2724] hover:border-[#B8976C]/60 rounded-sm transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group"
            >
              {/* Report Info */}
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 bg-[#1F1C1A] border border-[#3A332E] text-[11px] font-mono-code text-[#B8976C] rounded-sm flex items-center space-x-1.5">
                    <FileText className="w-3 h-3 text-[#C8442C]" />
                    <span>{report.format}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-mono-code text-[#EDE8E1]">
                    <CheckCircle2 className="w-3 h-3 text-[#C8442C]" />
                    <span>{report.status}</span>
                  </span>
                  <span className="text-xs font-mono-code text-[#736B63]">• {report.date}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono-code text-[#B8976C] uppercase tracking-wider">
                    {report.projectTitle} — <span className="italic normal-case">{report.projectSubtitle}</span>
                  </div>
                  <h3 className="font-display text-2xl text-[#EDE8E1] group-hover:text-white transition-colors">
                    {report.reportTitle}
                  </h3>
                </div>

                <p className="text-sm text-[#A8A096] font-sans leading-relaxed">
                  {report.summary}
                </p>

                {/* Key Metrics Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {report.keyMetrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#1A1817] border border-[#282421] text-[10px] font-mono-code text-[#C5BEB5] rounded-xs"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0 lg:w-60">
                <button
                  onClick={() => setActiveDocModal('report')}
                  className="px-4 py-2.5 bg-[#B8976C] hover:bg-[#C9A97E] text-black font-mono-code text-xs font-semibold uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Paper (In-App)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/MoMA_Capstone_Report_EN.pdf"
                    download="MoMA_Capstone_Report_EN.pdf"
                    className="px-3 py-2 bg-[#1C1A18] hover:bg-[#262320] border border-[#302B27] hover:border-[#B8976C] text-[#EDE8E1] font-mono-code text-xs rounded-sm transition-all text-center flex items-center justify-center space-x-1.5"
                    title="Download Report PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#B8976C]" />
                    <span>PDF</span>
                  </a>

                  <button
                    onClick={() => setActiveDocModal('presentation')}
                    className="px-3 py-2 bg-[#1C1A18] hover:bg-[#262320] border border-[#302B27] hover:border-[#C8442C] text-[#EDE8E1] font-mono-code text-xs rounded-sm transition-all text-center flex items-center justify-center space-x-1.5"
                    title="Open Presentation Slides"
                  >
                    <Presentation className="w-3.5 h-3.5 text-[#C8442C]" />
                    <span>Slides</span>
                  </button>
                </div>

                <a
                  href="#moma-explorer"
                  className="px-4 py-2 bg-[#141312] hover:bg-[#1E1B18] border border-[#2B2724] hover:border-[#B8976C] text-[#A8A096] hover:text-[#EDE8E1] font-mono-code text-xs rounded-sm transition-all text-center flex items-center justify-center space-x-2"
                >
                  <span>Study Hub</span>
                  <ArrowRight className="w-3 h-3 text-[#B8976C]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* In-App Document & Slides Viewer Modal */}
        <DocumentViewerModal
          type={activeDocModal}
          onClose={() => setActiveDocModal(null)}
        />
      </div>
    </section>
  );
};
