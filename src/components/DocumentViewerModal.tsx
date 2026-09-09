import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Presentation, 
  Download, 
  ExternalLink,
  Sparkles,
  Database,
  AlertCircle
} from 'lucide-react';

interface DocumentViewerModalProps {
  type: 'report' | 'presentation' | null;
  project?: 'moma' | 'dose';
  onClose: () => void;
  initialSlide?: number;
}

// 15 Slides strictly matching the official Capstone Presentation Deck (all in English)
export const MOMA_SLIDES = [
  {
    id: 1,
    title: "WHO GETS RECOGNIZED, AND WHEN?",
    subtitle: "A Data Study of MoMA's Acquisition Patterns",
    category: "Title & Overview",
    content: {
      type: "title",
      headline: "A Data Study of MoMA's Acquisition Patterns",
      event: "Workintech Data Science Bootcamp — Capstone Project",
      author: "Didem Arslan Yenihayat",
      meta: "160,699 artworks · 15,932 artists · BigQuery + dbt + Python · Wikidata enrichment",
      tagline: "Examining when, how, and why artists enter the permanent collection of the Museum of Modern Art."
    }
  },
  {
    id: 2,
    title: "Research Question and Data",
    subtitle: "Who does a modern art museum collect, and when?",
    category: "Foundations",
    content: {
      type: "text_highlight",
      definition: {
        formula: "Date = year work made, DateAcquired = year entered collection, acquisition lag = DateAcquired − Date",
        explanation: "The core target variable measuring the time elapsed between an artwork's creation and its entry into MoMA's collection."
      },
      mainQuestion: "This project asks which groups of artists and movements MoMA recognized faster, and which later; and whether that difference is real, or just a chronological illusion.",
      pipeline: [
        { label: "160,699 Artworks & 15,932 Artists", desc: "MoMA GitHub dataset + Wikidata SPARQL enrichment (movement, geography)" },
        { label: "Layered BigQuery + dbt Architecture", desc: "Staging, intermediate, and analysis-ready data marts" },
        { label: "Analysis in Python (Colab)", desc: "EDA, hypothesis testing, autocorrelation, and career regression" }
      ]
    }
  },
  {
    id: 3,
    title: "Overview",
    subtitle: "Before the hypotheses: what does the overall picture show?",
    category: "Collection Profile",
    content: {
      type: "stats_overview",
      stats: [
        { label: "Total Artworks", value: "160,699", sub: "Cataloged records (1929–2020)" },
        { label: "Total Artists", value: "15,932", sub: "Individual & collective creators" },
        { label: "Median Acquisition Lag", value: "21 Years", sub: "Mean: 29.3 years across collection" }
      ],
      trendSummary: "Number of Artworks by Decade (1920–2020): Median lag stayed stable (7–10 yrs) between 1970–1990 during active contemporary collecting and rose continuously post-2000 as historical gaps were addressed.",
      callout: "1964 & 1968: large bulk-gift years (97%+ Western male artists)"
    }
  },
  {
    id: 4,
    title: "So what does this general behavior depend on?",
    subtitle: "We tested four hypotheses — each follows the same framework: question → raw finding → statistical validation",
    category: "Methodology",
    content: {
      type: "framework_grid",
      description: "We tested four hypotheses — each follows the same framework: question → raw finding → statistical validation.",
      hypotheses: [
        { code: "H1", topic: "Gender", question: "Does acquisition lag differ between female and male artists?", status: "Lag gap closed (p=0.418)" },
        { code: "H2", topic: "Geography", question: "Is the gap between Western and non-Western artists permanent or temporary?", status: "Permanent disparity (p<0.001)" },
        { code: "H3", topic: "Art Movement", question: "Which movements did MoMA recognize early, and which late?", status: "Correlation inverted: r=-0.64 to +0.73" },
        { code: "H4", topic: "Temporal Consistency", question: "Is MoMA's behavior predictable, or random?", status: "Strong autocorrelation (r=0.855, p=0.0016)" }
      ]
    }
  },
  {
    id: 5,
    title: "H1 · Gender — Overall Distribution",
    subtitle: "Gender composition of the collection",
    category: "Hypothesis 1",
    content: {
      type: "distribution_analysis",
      centerLabel: "160.7K Works",
      distribution: [
        { label: "Male Artists", share: "83.0%", count: "123,378 works", color: "#C8442C", percentNum: 83.0 },
        { label: "Female Artists", share: "14.2%", count: "21,828 works", color: "#B8976C", percentNum: 14.2 },
        { label: "Unknown", share: "2.8%", count: "4,400+ works", color: "#5A524A", percentNum: 2.8 }
      ],
      generalObservation: "The vast majority of the collection (83%) is by male artists. This is the overall distribution — the real question is how this ratio has changed over time, and whether acquisition behavior differs by gender.",
      nextQuestion: "Does acquisition lag differ by gender? And is that difference a real behavioral gap, or simply a result of works by female artists being more recent on average?"
    }
  },
  {
    id: 6,
    title: "H1 · Gender — From Raw Finding to Verified Result",
    subtitle: "Controlling for a confounding variable reversed the picture",
    category: "Hypothesis 1",
    content: {
      type: "table_verification",
      rawTrap: "Raw finding (uncontrolled): works by female artists appear acquired FASTER but misleading (more recent on average).",
      controlledInsight: "Controlled finding (period-matched): female artists' works historically acquired SLOWER.",
      tableData: [
        { period: "1950–1970", femaleMed: "39 years", maleMed: "11 years", pValue: "< 0.001", result: "Significant" },
        { period: "1970–1990", femaleMed: "27 years", maleMed: "18 years", pValue: "< 0.001", result: "Significant" },
        { period: "1990–2010", femaleMed: "5 years", maleMed: "5 years", pValue: "p = 0.418", result: "Not significant" }
      ],
      robustness: "Robustness check: excluding 1960 bulk-gift year, gap shrank 28→25 years but held."
    }
  },
  {
    id: 7,
    title: "H1 · Gender — Artwork Count Projection",
    subtitle: "The lag closed, but representation is still unbalanced",
    category: "Hypothesis 1",
    content: {
      type: "projection_chart",
      currentCounts: "As of 2020: 21,828 works by female artists, 123,378 works by male artists",
      crossoverYear: "2097",
      methodology: "Method: compound (exponential) growth model based on period growth rates — year-by-year crossover simulation.",
      conclusion: "The lag behavior corrected itself (H1), but numerical parity is expected to require ~80 more years at the current trend."
    }
  },
  {
    id: 8,
    title: "H2 · Geography — Overall Distribution",
    subtitle: "Geographic composition of the collection",
    category: "Hypothesis 2",
    content: {
      type: "distribution_analysis",
      centerLabel: "160.7K Works",
      distribution: [
        { label: "Western Artists", share: "85.3%", count: "127,205 works", color: "#C8442C", percentNum: 85.3 },
        { label: "Non-Western Artists", share: "13.9%", count: "18,969 works", color: "#B8976C", percentNum: 13.9 },
        { label: "Unknown", share: "0.8%", count: "1,200+ works", color: "#5A524A", percentNum: 0.8 }
      ],
      generalObservation: "The vast majority of the collection (85.3%) is by Western artists. Unlike H1, the production-year gap here is small (~9 years) — suggesting the lag gap can't be explained by chronology.",
      nextQuestion: "Is the lag gap between Western and non-Western artists permanent or temporary? Does it close over time like H1, or does it behave differently?"
    }
  },
  {
    id: 9,
    title: "H2 · Geography — From Raw Finding to Verified Result",
    subtitle: "A persistent pattern between Western and non-Western artists",
    category: "Hypothesis 2",
    content: {
      type: "table_verification",
      rawTrap: "UNLIKE H1: the production-year gap is small (~9 years) — the lag gap can't be explained by chronology.",
      controlledInsight: "Across all periods, non-Western artists faced persistent, statistically significant acquisition lag delays.",
      tableData: [
        { period: "1950–1970", westMed: "11 years", nonWestMed: "39 years", pValue: "< 0.001", result: "Significant" },
        { period: "1970–1990", westMed: "15 years", nonWestMed: "33 years", pValue: "< 0.001", result: "Significant" },
        { period: "1990–2010", westMed: "4 years", nonWestMed: "9 years", pValue: "< 0.001", result: "Significant" }
      ],
      robustness: "Key Finding: The lag gap narrowed from 28 to 5 years, but remained statistically significant across all periods."
    }
  },
  {
    id: 10,
    title: "H2 · Geography — Projection",
    subtitle: "Two inequalities, two different dynamics",
    category: "Hypothesis 2",
    content: {
      type: "projection_chart",
      currentCounts: "As of 2020: 18,969 non-Western works, 127,205 Western works",
      crossoverYear: "~2089",
      methodology: "Estimated crossover year: ~2089, Non-Western ~71% growth, Western stagnant.",
      conclusion: "The gap in lag behavior is narrowing but not closing. Numerical parity is expected to require ~70 more years at the current trend."
    }
  },
  {
    id: 11,
    title: "H3 · Art Movement — Early and Late Recognition",
    subtitle: "Which movements did MoMA recognize early, and which late?",
    category: "Hypothesis 3",
    content: {
      type: "movement_deviations",
      description: "Deviation from Expected Lag (years): Expressionism -19, Neues Bauen -16, modernism -11, surrealism -3, abstract art +12, abstract expr. +2, feminist art +12, Minimalism +19.",
      earlyMovements: [
        { name: "Expressionism", deviation: "-19 yrs", note: "Recognized early: movement MoMA championed during its founding era." },
        { name: "Neues Bauen", deviation: "-16 yrs", note: "Recognized early: Bauhaus architecture and design focus." },
        { name: "Modernism", deviation: "-11 yrs", note: "Recognized early: core canonical foundation." },
        { name: "Surrealism", deviation: "-3 yrs", note: "Recognized early: contemporary connection." }
      ],
      lateMovements: [
        { name: "Abstract Expressionism", deviation: "+2 yrs", note: "Moderate lag adjustment." },
        { name: "Abstract Art", deviation: "+12 yrs", note: "Recognized late: main candidate in catch-up process." },
        { name: "Feminist Art", deviation: "+12 yrs", note: "Recognized late: retrospective catch-up acquisition." },
        { name: "Minimalism", deviation: "+19 yrs", note: "Recognized late: most belatedly recognized canonical movement." }
      ]
    }
  },
  {
    id: 12,
    title: "H3 · Art Movement — The Catch-Up Period",
    subtitle: "'Recognize early / collect heavily' flipped direction over time",
    category: "Hypothesis 3",
    content: {
      type: "correlation_shift",
      metric: "Deviation × Collection Weight Correlation by period",
      phases: [
        { period: "1940–1970", r: "r = -0.64", label: "Contemporaries Focus", desc: "Early-recognized movements were collected heavily — MoMA focused on its own contemporaries." },
        { period: "1970–2000", r: "r = +0.14", label: "Transition Window", desc: "Correlation neutralizes as collecting policies diversified." },
        { period: "2000–2030", r: "r = +0.73", label: "Catch-Up Process", desc: "The picture reversed: movements once overlooked (Minimalism, feminist art...) are now gaining weight." }
      ],
      takeaway: "MoMA focused on its contemporaries during its founding era; in later periods, it collects in a way that makes up for past gaps."
    }
  },
  {
    id: 13,
    title: "H4 · Temporal Consistency",
    subtitle: "Can one period's lag predict the next — or is the behavior random?",
    category: "Hypothesis 4",
    content: {
      type: "autocorrelation",
      metric: "Scatter chart: Average lag, current vs previous period",
      stats: {
        r: "0.855",
        pValue: "0.0016",
        sample: "n = 10"
      },
      interpretation: "A strong, statistically significant relationship — one period's lag largely predicts the next.",
      equilibrium: "MoMA is not random or unpredictable — it shows consistent, stable institutional behavior. The 2100 projection shows the lag approaching equilibrium at around 45 years."
    }
  },
  {
    id: 14,
    title: "Bonus Model · Early-Death Artist Projection",
    subtitle: "How well does the first 8 years of output predict a full career?",
    category: "Bonus Model",
    content: {
      type: "regression_model",
      formula: "log(total+1) = 1.057 × log(first8years+1) + 0.182",
      performance: {
        r2: "0.705",
        dataset: "8-year threshold · log-transformed regression · n=5,656 artists",
        target: "Estimate works missing from MoMA collection due to premature death"
      },
      validation: [
        { artist: "Keith Haring", actual: "49 works", pred: "48.8 works", delta: "Near-perfect validation (predicted 48.8)" },
        { artist: "Jean-Michel Basquiat", actual: "12 works", pred: "17.0 works", delta: "+5 'lost potential'" }
      ],
      topLostPotential: [
        { name: "Gordon Matta-Clark", age: "35", lost: "+42" },
        { name: "Rudolf Schwarzkogler", age: "28", lost: "+34" },
        { name: "Alberto Greco", age: "34", lost: "+30" },
        { name: "Robert Smithson", age: "35", lost: "+24" },
        { name: "Alfred Jarry", age: "34", lost: "+21" }
      ]
    }
  },
  {
    id: 15,
    title: "Conclusion",
    subtitle: "Summary of empirical findings and institutional insights",
    category: "Conclusion",
    content: {
      type: "takeaways",
      bullets: [
        "MoMA's gender lag gap has closed statistically — but numerical parity still needs ~80 more years.",
        "Geographic inequality narrowed over time but never lost statistical significance — a more persistent pattern.",
        "MoMA's movement preference reversed over time: it focused on its contemporaries at founding, and is now making up for its past.",
        "The institution's acquisition behavior isn't random — it shows strong temporal consistency (r=0.855).",
        "Detailed statistical methodology, limitations, and methodological notes are in the accompanying report and dashboard."
      ],
      closing: "Thank you — Questions?"
    }
  }
];

export const DOSE_SLIDES = [
  {
    id: 1,
    title: "DOSE OF REALITY",
    subtitle: "Overlap Deceives, Exceedance Is Real",
    category: "Title & Overview",
    content: {
      type: "title",
      headline: "A Dietary Supplement Usage Analysis Using NHANES 1999–2023 Data",
      event: "Workintech Data Science Bootcamp — Capstone Project #2",
      author: "Didem Arslan Yenihayat",
      meta: "46,388 person-cycle observations · 10 NHANES cycles · BigQuery + dbt + Python · svy (design-based statistics)",
      tagline: "This project asks to what extent overlap actually leads to real dose exceedance."
    }
  },
  {
    id: 2,
    title: "Research Question and Data",
    subtitle: "What happens when multiple supplements contain the same nutrient?",
    category: "Foundations",
    content: {
      type: "text_highlight",
      definition: {
        formula: "Overlap = same ingredient from >1 product · Exceedance = total intake exceeds the official safe Upper Limit (UL)",
        explanation: "This project asks to what extent overlap actually leads to real dose exceedance — and whether that risk is evenly distributed across the population."
      },
      mainQuestion: "This project began with a personal observation: taking more than one supplement may cause unknowing overlap of the same vitamin or mineral, pushing total intake past the official Tolerable Upper Intake Level (UL).",
      pipeline: [
        { label: "CDC NHANES, 1999–2023 (10 cycles, 24 years)", desc: "Demographic data + 30-day supplement use + product-ingredient reference table" },
        { label: "Layered BigQuery + dbt (ELT) Architecture", desc: "Raw → Staging → Intermediate → analysis-ready Mart tables" },
        { label: "Python (pandas, svy design-based statistics)", desc: "Design-based t-tests, Kruskal-Wallis rank tests, one-sample proportion tests" }
      ]
    }
  },
  {
    id: 3,
    title: "Overview",
    subtitle: "Before the hypotheses: what does the overall picture show?",
    category: "Study Profile",
    content: {
      type: "stats_overview",
      stats: [
        { label: "Person-Cycle Observations", value: "46,388", sub: "Across 10 NHANES cycles" },
        { label: "NHANES Cycles", value: "10", sub: "1999–2023 (24 years)" },
        { label: "Ingredients Examined", value: "6", sub: "Vitamin D, Iron, Magnesium, Niacin, Zinc, Vitamin A" }
      ],
      trendSummary: "Six ingredients exceeding a 2% population exceedance threshold in preliminary analysis were included, evaluated with design-based statistical methods (Python's svy package) that account for NHANES's complex survey design.",
      callout: "Overall usage rose steadily from 1999 to 2020 (51.7% → 57.7%), then dropped to 34.3% in 2021–2023 — while multi-product use among remaining users rose from 55.4% to 61.7%."
    }
  },
  {
    id: 4,
    title: "So What Does This Behavior Depend On?",
    subtitle: "Four questions, tested with four findings",
    category: "Methodology",
    content: {
      type: "framework_grid",
      description: "Each hypothesis follows the same framework: question → raw finding → statistical validation.",
      hypotheses: [
        { code: "H1", topic: "Gender", question: "Do overlap and exceedance differ between women and men?", status: "Consistent 24-year gap (p < 0.0001)" },
        { code: "H2", topic: "Age Group", question: "Does risk increase with age?", status: "Strongest factor (F=584.79, p<0.0001)" },
        { code: "H3", topic: "Ethnicity", question: "Which group stands out for which ingredient?", status: "Weakest but significant (F=12.69, p<0.0001)" },
        { code: "H4", topic: "Pandemic Effect", question: "How large is the 2021–2023 deviation, really?", status: "−20.9 points vs. pre-pandemic projection" }
      ]
    }
  },
  {
    id: 5,
    title: "H1 · Gender — From Raw Finding to Verified Result",
    subtitle: "Applying NHANES's official weighting rule didn't change the result — it strengthened it",
    category: "Hypothesis 1",
    content: {
      type: "table_verification",
      testLabel: "Design-Based T-Test",
      rawTrap: "Unweighted finding: overlap 44.7% in women vs. 35.1% in men. Women have consistently shown higher usage, overlap, and UL exceedance than men across 24 years — the gap has been structural since 1999 (in the 7.6–10.3 point range for overall usage).",
      controlledInsight: "Applying NHANES's official survey weighting held the result almost unchanged, confirming it: Female 44.2% vs. Male 34.3% overlap (pooled across 24 years).",
      tableData: [
        { period: "Overlap (24 yrs, pooled)", femaleMed: "44.2%", maleMed: "34.3%", pValue: "t = −13.76, p < 0.0001", result: "Significant" }
      ],
      robustness: "UL exceedance also differs significantly by gender (t = −9.25, p < 0.0001). The gender gap in exceedance has widened systematically since 2017, driven by women's rising multi-product (overlap) behavior."
    }
  },
  {
    id: 6,
    title: "H2 · Age Group — The Strongest Factor",
    subtitle: "Usage, overlap, and exceedance all rise monotonically with age",
    category: "Hypothesis 2",
    content: {
      type: "stats_overview",
      stats: [
        { label: "Overlap × Age (Kruskal-Wallis F)", value: "584.79", sub: "p < 0.0001" },
        { label: "UL Exceedance × Age (F)", value: "531.62", sub: "p < 0.0001" }
      ],
      trendSummary: "The 65+ group shows the highest usage, overlap, and exceedance rate in every cycle. This monotonic pattern became clear from 2011 onward; before that (1999–2010) the ranking was more volatile.",
      callout: "Age group is the strongest predictor tested — stronger than gender or ethnicity."
    }
  },
  {
    id: 7,
    title: "H3 · Ethnicity — A Shifting Hierarchy",
    subtitle: "The Non-Hispanic Black group overtook the White group in UL exceedance in 2021–2023",
    category: "Hypothesis 3",
    content: {
      type: "stats_overview",
      stats: [
        { label: "Overlap × Ethnicity (F)", value: "114.37", sub: "p < 0.0001" },
        { label: "UL Exceedance × Ethnicity (F)", value: "12.69", sub: "p < 0.0001 — weakest of the three factors, still significant" }
      ],
      trendSummary: "The Non-Hispanic White group has consistently led in overlap. In UL exceedance, however, the Non-Hispanic Black group converged starting in 2015–2016 and overtook the White group in 2021–2023 — timing consistent with (though not proof of) anemia prevalence disparities reported elsewhere (Black women 31.4% vs. White women 8.3%, NCHS Data Brief No. 519).",
      callout: "Presented as a hypothesis, not a proven causal link — this is an observational, cross-sectional study."
    }
  },
  {
    id: 8,
    title: "Source of Exceedance — Overlap or Single Product?",
    subtitle: "Across the population, exceedance stems systematically from overlap — not by chance",
    category: "Mechanism",
    content: {
      type: "distribution_analysis",
      centerLabel: "64.2%",
      centerSubLabel: "From Overlap",
      distribution: [
        { label: "From Product Overlap", share: "64.2%", count: "t = 21.37, p < 0.0001", color: "#C8442C", percentNum: 64.2 },
        { label: "From Single-Product Dosage", share: "35.8%", count: "One-sample test vs. 50%", color: "#B8976C", percentNum: 35.8 }
      ],
      generalObservation: "Exceedance stems systematically from product overlap, not by chance (one-sample test against 50%, t=21.37, p<0.0001). But each ingredient carries its own mechanism: for Vitamin D, risk comes almost entirely from overlap; for Iron and Niacin, it comes largely from single-product dosage.",
      nextQuestion: "Vitamin D and Zinc show a similar recent rise — but do they share the same underlying risk mechanism?"
    }
  },
  {
    id: 9,
    title: "Vitamin D vs. Zinc — Two Different Risk Stories",
    subtitle: "Same apparent 'pandemic jump', but the underlying mechanisms are polar opposites",
    category: "Ingredient Deep-Dive",
    content: {
      type: "stats_overview",
      stats: [
        { label: "Vitamin D UL Exceedance", value: "27.5%", sub: "2021–2023, up from 0.0–0.1% in 1999–2006" },
        { label: "Zinc UL Exceedance", value: "9.4%", sub: "2021–2023, flat at 3–4% for the prior 20+ years" }
      ],
      trendSummary: "Vitamin D shows a gradual, uninterrupted rise since low-awareness 1999–2006. Zinc stayed flat for two decades before a sudden jump only after the pandemic. Niacin and Vitamin A, unlike these four ingredients, show a general decline over 24 years — a trend independent of the pandemic.",
      callout: "A single public-health message isn't enough — each ingredient needs its own framing."
    }
  },
  {
    id: 10,
    title: "Counterfactual Analysis — Pinning Down the Pandemic Effect",
    subtitle: "Instead of forecasting the future directly: 'what if the trend had continued?'",
    category: "Hypothesis 4",
    content: {
      type: "stats_overview",
      stats: [
        { label: "Overall Usage Deviation", value: "−20.9 pts", sub: "Actual 34.3% vs. pre-pandemic-trend projection" },
        { label: "Vitamin D & Zinc Exceedance", value: "Above Projection", sub: "Despite falling usage, remaining users intensified" }
      ],
      trendSummary: "A model built on the 1999–2020 pre-pandemic trend produced a 'what if the trend had continued' projection for 2021–2023, which was then compared against the actual observed value.",
      callout: "The pandemic effect and a concurrent survey-mode change (in-person to telephone) occurred simultaneously in 2021–2023; their relative contributions cannot be fully disentangled with this data."
    }
  },
  {
    id: 11,
    title: "Statistical Significance Tests — Summary",
    subtitle: "7 of 8 tests at p<0.0001, all design-based (svy)",
    category: "Validation",
    content: {
      type: "framework_grid",
      description: "Design-based tests, accounting for NHANES's complex survey design, were applied throughout.",
      hypotheses: [
        { code: "t = −13.76", topic: "Gender × Overlap", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "t = −9.25", topic: "Gender × UL Exceedance", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "F = 584.79", topic: "Age Group × Overlap", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "F = 531.62", topic: "Age Group × UL Exceedance", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "F = 114.37", topic: "Ethnicity × Overlap", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "F = 12.69", topic: "Ethnicity × UL Exceedance", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "t = 21.37", topic: "Overlap vs. Single-Product (vs. 50%)", question: "24 years, pooled", status: "p < 0.0001" },
        { code: "t = 1.33", topic: "Iron × Perimenopausal Subgroup (n=15)", question: "2021–2023 only", status: "p = 0.2049 — not significant" }
      ]
    }
  },
  {
    id: 12,
    title: "Conclusion",
    subtitle: "Summary of empirical findings",
    category: "Conclusion",
    content: {
      type: "takeaways",
      bullets: [
        "Overall usage rose from 1999–2020 and fell in 2021–2023 — yet overlap and exceedance trends kept rising; most of the exceedance stems from overlap.",
        "64.2% of exceedance comes from overlap — statistically proven (p < 0.0001).",
        "Gender, age, and ethnicity effects are strong and significant across 24 years (10 of 11 tests at p < 0.0001).",
        "Each ingredient carries its own risk mechanism — a single message isn't enough."
      ],
      closing: "Increased usage does not mean more conscious use — using multiple products raises the risk of exceedance."
    }
  }
];

// 5 Comprehensive Report Chapters based on the official Capstone Paper (Purely English)
export const MOMA_REPORT_SECTIONS = [
  {
    id: 0,
    titleEn: "Chapter 0: Abstract & Research Question",
    readTime: "4 min read",
    sections: [
      {
        heading: "Executive Abstract",
        text: `This study examines the acquisition behavior of the Museum of Modern Art (MoMA) using its open collection dataset. The core analytical metric is "acquisition lag": the difference between the year a work was produced and the year it entered the MoMA collection. The MoMA GitHub dataset of 160,699 artworks and 15,932 artists was enriched with movement and geography metadata via Wikidata SPARQL queries, and processed through a layered dbt architecture on Google BigQuery.

Four primary hypotheses were formulated and tested:
(H1) Gender disparity in acquisition lag,
(H2) Geographic origin disparity (Western vs. non-Western),
(H3) Art movement timing and institutional catch-up, and
(H4) Temporal consistency of institutional acquisition behavior.

All descriptive findings were filtered through period-based confounding controls and inferential statistical tests (Mann-Whitney U, Pearson correlation). In addition, a log-linear regression model (R²=0.705) was constructed to predict lifetime collection output from an artist's first 8 years of production, quantifying the "lost potential" for 187 artists who died young.`
      },
      {
        heading: "Introduction & Research Question",
        text: `A museum collection is not a neutral mirror of art history; it is the physical accumulation of sequential institutional decisions. A museum cannot acquire every artwork created—every acquisition is a conscious commitment regarding who, when, and from where to collect.

The central research question is: "Who does a modern art museum collect, and when?"

This project asks which groups of artists and movements MoMA recognized faster, and which later; and whether that difference is real, or just a chronological illusion.

Target Metric Definition:
Date = year work made
DateAcquired = year entered collection
Acquisition Lag = DateAcquired − Date

This metric directly reflects institutional response latency across three critical dimensions:
1. Response Velocity: Overall distribution and evolution of acquisition lag across MoMA's history.
2. Representation & Equity: Whether acquisition velocity systematically differs by gender, geographic provenance, or art movement.
3. Institutional Rhythm: Whether MoMA behaves with temporal stability or fluctuates randomly across decades.`
      },
      {
        heading: "Hypothesis Matrix (H1–H4)",
        table: {
          headers: ["Code", "Topic", "Core Hypothesis Question", "Empirical Outcome"],
          rows: [
            ["H1", "Gender Disparity", "Does acquisition lag differ between female and male artists?", "Historically slower for women (p<0.001); parity achieved in 1990–2010 (p=0.418)."],
            ["H2", "Geographic Origin", "Is the gap between Western and non-Western artists permanent or temporary?", "Persistent disparity across all eras (p<0.001); narrowed from 28 to 5 yrs."],
            ["H3", "Art Movement", "Which movements did MoMA recognize early, and which late?", "Correlation inverted: r=-0.64 (1940–70) to r=+0.73 (2000–30) reflecting catch-up."],
            ["H4", "Temporal Consistency", "Is MoMA's behavior predictable, or random?", "Strong institutional memory (r=0.855 autocorrelation, p=0.0016)."]
          ]
        }
      }
    ]
  },
  {
    id: 1,
    titleEn: "Chapter 1: Data Architecture & dbt Pipeline",
    readTime: "5 min read",
    sections: [
      {
        heading: "Data Sources & Wikidata Enrichment",
        text: `The core data sources are MoMA's open collection tables on GitHub:
• Artworks.csv — 160,699 records including Title, Production Date (Date), Acquisition Date (DateAcquired), Medium, Classification, and Department.
• Artists.csv — 15,932 records including DisplayName, Nationality, Gender, Birth/Death Years, and Wikidata QID.

Wikidata SPARQL Enrichment:
To enable art movement and granular birthplace analysis, SPARQL queries extracted metadata for 3,224 artists with valid QIDs, producing an enrichment table of 4,877 rows (moma_raw.wikidata_enrichment):
• P135: Art Movement (Cubism, Surrealism, Bauhaus, Minimalism, etc.)
• P19: Place of Birth (City and country coordinates)
• P27: Country of Citizenship`
      },
      {
        heading: "Data Cleaning & Normalization",
        text: `Data Cleaning Pipeline:
1. Date Parsing: The free-text artwork Date column was standardized using iterative BigQuery regex patterns, resolving approximate years ("c. 1960"), spans ("1962-64"), and printing dates.
2. Gender Standardization: Reduced 428 raw string variants to 5 clean categories (Male, Female, Non-Binary, Unknown, Organization).
3. Nationality Resolution: Normalized 145 nationality demonyms and mapped artists to geographic regions (Western vs. Non-Western).

Tools & Environment:
• BigQuery: Cloud data warehouse engine
• dbt: SQL transformations, modular modeling, and testing
• Python / Google Colab: Exploratory data analysis, statistical modeling, and regressions
• GitHub: Version control and open data distribution`
      },
      {
        heading: "Layered dbt Architecture",
        text: `The warehouse pipeline follows dimensional modeling best practices:
• staging layer: Standardized raw sources, cast datatypes, normalized gender categories and nationalities (stg_artworks, stg_artists, stg_wikidata_enrichment, stg_nationality_geo_dict).
• intermediate layer: Exploded multi-artist collaborations via SPLIT+UNNEST (8,109 multi-artist records expanded to 176,340 artwork-artist links) and built movement bridges (int_artwork_artist_link, int_artwork_artist_detail, int_artwork_artist_movement).
• marts layer: Final analysis-ready marts (mart_acquisition_lag, mart_gender_analysis, mart_geography_analysis, mart_movement_analysis).`
      }
    ]
  },
  {
    id: 2,
    titleEn: "Chapter 2: H1: Gender Disparity & Parity",
    readTime: "5 min read",
    sections: [
      {
        heading: "Overall Acquisition Lag & Gender Distribution",
        text: `Across the 151,146 artworks with valid temporal records:
• Median Acquisition Lag: 21 years (Mean = 29.3 years)
• Gender Distribution: Male 83.0% (123,378 works), Female 14.2% (21,828 works), Unknown 2.8% (4,400+ works).

Bulk-Gift Anomaly:
In 1964 and 1968, massive bulk donations composed of 97%+ Western male artists created an unprecedented volume peak.`
      },
      {
        heading: "Confounding Variable Control & Period-Matched Analysis",
        text: `Raw finding (uncontrolled): works by female artists appeared acquired faster, but this was a misleading artifact because works by women in the collection were produced ~23 years more recently on average.

Controlled finding (period-matched): female artists' works were historically acquired significantly slower during the mid-20th century before achieving parity.`
      },
      {
        heading: "Period-Controlled Mann-Whitney U Test Results (Table 1)",
        table: {
          headers: ["Period (Creation)", "Female Median Lag", "Male Median Lag", "Mann-Whitney p-value", "Statistical Interpretation"],
          rows: [
            ["1950–1970", "39 years", "11 years", "p < 0.001", "Significant (28-year gap)"],
            ["1970–1990", "27 years", "18 years", "p < 0.001", "Significant (9-year gap)"],
            ["1990–2010", "5 years", "5 years", "p = 0.418", "Not Significant (Parity reached)"]
          ]
        }
      },
      {
        heading: "Robustness Check & Parity Projection",
        text: `Robustness Check: Excluding the 1960s bulk-gift years, the 1950–1970 gap shrank from 28 to 25 years but held strong statistical significance (p < 0.001).

Artwork Count Projection (2097 Crossover):
As of 2020: 21,828 works by female artists vs. 123,378 works by male artists.
Method: Compound (exponential) growth model based on period growth rates — year-by-year crossover simulation.
Conclusion: The lag behavior corrected itself (H1), but numerical parity is expected to require ~80 more years at the current trend.`
      }
    ]
  },
  {
    id: 3,
    titleEn: "Chapter 3: H2: Geography, H3: Movements & H4: Consistency",
    readTime: "6 min read",
    sections: [
      {
        heading: "H2 · Geographic Disparity & Projection",
        text: `Geographic Breakdown: Western 85.3% (127,205 works), Non-Western 13.9% (18,969 works), Unknown 0.8% (1,200+ works).

Unlike H1, the production-year gap between Western and non-Western artists is small (~9 years) — the lag gap cannot be explained away by chronology.`
      },
      {
        heading: "Period-Controlled Geographic Test Results (Table 2)",
        table: {
          headers: ["Period (Creation)", "Western Median Lag", "Non-Western Median Lag", "Mann-Whitney p-value", "Statistical Interpretation"],
          rows: [
            ["1950–1970", "11 years", "39 years", "p < 0.001", "Significant (28-year gap)"],
            ["1970–1990", "15 years", "33 years", "p < 0.001", "Significant (18-year gap)"],
            ["1990–2010", "4 years", "9 years", "p < 0.001", "Significant (5-year gap)"]
          ]
        }
      },
      {
        heading: "H2 Projection (2089 Crossover)",
        text: `As of 2020: 18,969 non-Western works vs. 127,205 Western works.
Estimated crossover year: ~2089, with Non-Western sustaining ~71% period growth while Western acquisition stabilizes.
Conclusion: The gap in lag behavior is narrowing but not closing. Numerical parity is expected to require ~70 more years at the current trend.`
      },
      {
        heading: "H3 · Art Movement Lag Deviations & Catch-Up Inversion",
        text: `Deviation from Expected Lag (years):
• Expressionism: -19 years (Recognized early: championed at founding)
• Neues Bauen: -16 years (Recognized early: Bauhaus design focus)
• Modernism: -11 years (Recognized early: canonical foundation)
• Surrealism: -3 years (Recognized early: contemporary connection)
• Abstract Art: +12 years (Recognized late: catch-up process)
• Abstract Expressionism: +2 years (Moderate lag)
• Feminist Art: +12 years (Recognized late: catch-up process)
• Minimalism: +19 years (Recognized late: catch-up process)

Correlation Shift (Deviation × Collection Weight):
• 1940–1970: r = -0.64 ("Early-recognized movements were collected heavily — MoMA focused on its own contemporaries.")
• 1970–2000: r = +0.14
• 2000–2030: r = +0.73 ("The picture reversed: movements once overlooked are now gaining weight.")
Interpretation: MoMA focused on its contemporaries during its founding era; in later periods, it collects in a way that makes up for past gaps.`
      },
      {
        heading: "H4 · Temporal Consistency & Autocorrelation",
        text: `Autocorrelation Analysis:
Can one period's lag predict the next — or is the behavior random?
• Autocorrelation Coefficient: r = 0.855
• Significance: p = 0.0016 (n = 10 decade intervals)

Conclusion:
A strong, statistically significant relationship — one period's lag largely predicts the next. MoMA is not random or unpredictable — it shows consistent, stable institutional behavior. The 2100 projection shows the lag approaching equilibrium at around 45 years.`
      }
    ]
  },
  {
    id: 4,
    titleEn: "Chapter 4: Lost Potential Model & Conclusion",
    readTime: "5 min read",
    sections: [
      {
        heading: "Bonus Model · Early-Death Artist Career Projection",
        text: `How well does the first 8 years of output predict a full career?
Model Specification:
log(total+1) = 1.057 × log(first8years+1) + 0.182
• Performance: R² = 0.705 (8-year threshold, log-transformed regression, n=5,656 artists)

Model Validation:
• Keith Haring: actual 49 → predicted 48.8 (near-perfect)
• Jean-Michel Basquiat: actual 12 → predicted 17 (+5 "lost potential")`
      },
      {
        heading: "Top Estimated 'Lost Potential' Artists (Table 5)",
        table: {
          headers: ["Artist Name", "Lifespan & Age at Death", "Estimated Lost Potential (works)"],
          rows: [
            ["Gordon Matta-Clark", "1943–1978 (Age 35)", "+42.3"],
            ["Rudolf Schwarzkogler", "1940–1969 (Age 28)", "+34.3"],
            ["Alberto Greco", "1931–1965 (Age 34)", "+30.1"],
            ["Robert Smithson", "1938–1973 (Age 35)", "+24.3"],
            ["Alfred Jarry", "1873–1907 (Age 34)", "+20.8"]
          ]
        }
      },
      {
        heading: "Discussion: Anomalies, Methodological Lessons & Limitations",
        text: `1. 1964 & 1968 Bulk-Gift Anomaly: Large donation peaks (97%+ Western male artists) heavily skewed unconditioned metrics, reinforcing the necessity of robustness testing.
2. Confounding Variable Discipline: Uncontrolled cultural metrics can invert true institutional dynamics (as proven in H1).
3. Wikidata Coverage Limitations: Enrichment is subject to SPARQL entity completeness (~43.4% of cataloged works linked to movement data).`
      },
      {
        heading: "Conclusion & Synthesis",
        text: `• MoMA's gender lag gap has closed statistically — but numerical parity still needs ~80 more years.
• Geographic inequality narrowed over time but never lost statistical significance — a more persistent pattern.
• MoMA's movement preference reversed over time: it focused on its contemporaries at founding, and is now making up for its past.
• The institution's acquisition behavior isn't random — it shows strong temporal consistency (r=0.855).
• Detailed statistical methodology, limitations, and methodological notes are in the accompanying report and dashboard.`
      }
    ]
  }
];

export const DOSE_REPORT_SECTIONS = [
  {
    id: 0,
    titleEn: "Chapter 0: Abstract & Research Question",
    readTime: "4 min read",
    sections: [
      {
        heading: "Executive Abstract",
        text: `This study examines dietary supplement usage behavior in the United States using NHANES (National Health and Nutrition Examination Survey) data spanning 1999–2023 — 24 years and 10 survey cycles, analyzed under NHANES's official survey-weighting rules. The project originated from a personal observation: people who take more than one supplement may unknowingly consume the same vitamin or mineral from multiple products, and this overlap may push their total intake past the official Tolerable Upper Intake Level (UL).

Across the six nutrients examined (Vitamin D, Iron, Magnesium, Niacin, Zinc, Vitamin A), overlap and UL exceedance were found to differ significantly by gender, age group, and ethnicity (10 of 11 tests at p<0.0001). 64.2% of exceedance cases (p<0.0001) were found to stem from overlap rather than a single product's own dosage. The COVID-19 pandemic period (2021–2023) was found to have driven overall usage 20.9 percentage points below what the pre-pandemic trend would have predicted, while simultaneously intensifying multi-product use among those who continued using supplements.

The findings suggest that public health messaging should combine both a 'watch for overlap across products' message and a 'read the single-product dosage label' message — and that these messages may need to be tailored by nutrient and by demographic group.`
      },
      {
        heading: "Research Questions & Scope",
        text: `(1) What is the level of dietary supplement use and multi-product overlap in the U.S. population, and how has it changed over time? (2) To what extent does overlap translate into actual dose exceedance? (3) Do these behavior and risk patterns differ significantly by gender, age, and ethnicity? (4) What was the effect of the COVID-19 pandemic on these patterns?

This project deliberately excludes drug-supplement interactions and individual clinical dosage advice; the goal is to produce a population-level picture of behavior and trends using open-source data.`
      }
    ]
  },
  {
    id: 1,
    titleEn: "Chapter 1: Data & Methods",
    readTime: "5 min read",
    sections: [
      {
        heading: "Data Source & Pipeline",
        text: `The analysis uses the CDC's NHANES dataset, covering 10 survey cycles from 1999 to 2023. The 1999–2002 period was combined into a single 4-year block per CDC's official recommendation (using the special WTINT4YR weight); 2017–2020 is a special cycle extended to 3.2 years due to the pandemic.

Data was processed through a layered ELT architecture using BigQuery and dbt: Raw (raw .xpt files) → Staging (code decoding, canonicalization) → Intermediate (joins, unit standardization) → Marts (analysis-ready summary tables). All code is version-controlled on GitHub.`
      },
      {
        heading: "The Product ID System Discontinuity",
        text: `Between 2016 and 2017, NHANES changed its product identification numbering system (DSDSUPID → DSDPID). A cross-mapping column within the current reference table (DSPI) was used to achieve a 90–98% match rate across all periods.`
      },
      {
        heading: "Weighting",
        text: `In accordance with NHANES's official analytic guidelines, interview weights were used, since the Dietary Supplement Questionnaire is administered as part of the household interview. When pooling multiple cycles, a duration-weighted formula consistent with NHANES's official 'combining cycles' rule was applied: combined_weight = (cycle duration / total duration) × the cycle's own weight.`
      },
      {
        heading: "UL Comparison & Statistical Method",
        text: `Official UL values from the Institute of Medicine / National Academy of Sciences (IOM/NAS) were used as reference. Six ingredients exceeding a 2% population exceedance threshold in preliminary analysis were included: Vitamin D, Iron, Magnesium, Niacin, Zinc, and Vitamin A. Statistical tests used design-based methods that account for NHANES's complex survey design (Python's svy package: t-tests, Kruskal-Wallis rank tests, one-sample proportion tests).`
      }
    ]
  },
  {
    id: 2,
    titleEn: "Chapter 2: Findings — Trends & Demographics",
    readTime: "6 min read",
    sections: [
      {
        heading: "Overall Usage Trend",
        text: `Overall usage rose steadily from 1999 to 2020 (51.7% → 57.7%). In 2021–2023, usage dropped to 34.3%, while multi-product use among users rose from 55.4% to 61.7% — fewer people were using supplements, but those who did were using them far more intensively.`
      },
      {
        heading: "Overlap and UL Exceedance by Ingredient",
        text: `Vitamin D shows a continuous, accelerating trend — from near-zero UL exceedance in 1999–2006 (0.0–0.1%) to 27.5% in 2021–2023. Zinc, by contrast, stayed flat (3–4%) for over two decades and only spiked to 9.4% in the most recent cycle — a new behavior rather than an accelerating one. Niacin and Vitamin A, unlike the other four ingredients, show a general decline over 24 years — a trend independent of the pandemic.`
      },
      {
        heading: "Source of Exceedance: Overlap or Single Product?",
        text: `Each ingredient carries its own risk mechanism: for Vitamin D, risk comes almost entirely from overlap; for Iron, risk comes largely from single-product dosage and peaked in 2017–2020 before receding. Niacin's 24-year decline is entirely driven by its single-product component. Population-wide, 64.2% of exceedance cases stem from overlap rather than single-product dosage (one-sample test against 50%, t=21.37, p<0.0001).`
      },
      {
        heading: "Demographic Breakdowns",
        text: `Gender: Women have consistently shown higher usage, overlap, and UL exceedance rates than men across 24 years (weighted overlap: Female 44.2% vs. Male 34.3%, t=−13.76, df=177, p<0.0001; UL exceedance t=−9.25, p<0.0001). The gender gap in UL exceedance has widened systematically since 2017, driven by women's rising multi-product (overlap) behavior.

Age Group: Usage, overlap, and exceedance rates rise monotonically with age (65+ is always highest); F=584.79 (overlap) / F=531.62 (UL exceedance), p<0.0001 — the strongest factor tested. This pattern was not yet fully established in 1999–2010 and became clear from 2011 onward.

Ethnicity: The Non-Hispanic White group has consistently led in overlap. In UL exceedance, however, the Non-Hispanic Black group converged starting in 2015–2016 and overtook the White group in 2021–2023 (F=114.37 overlap / F=12.69 exceedance, p<0.0001 — the weakest of the three factors, still significant). This timing is consistent with, but not proof of, anemia prevalence disparities reported by NCHS (Black women 31.4% vs. White women 8.3%).`
      }
    ]
  },
  {
    id: 3,
    titleEn: "Chapter 3: Counterfactual Analysis & Statistical Summary",
    readTime: "4 min read",
    sections: [
      {
        heading: "Counterfactual Analysis",
        text: `Rather than forecasting the future directly, a model built on the 1999–2020 pre-pandemic trend produced a 'what if the trend had continued' projection for 2021–2023, which was then compared against the actual observed value. Actual overall usage deviated −20.9 percentage points from this projection. For Vitamin D and Zinc specifically, exceedance came in above what the pre-pandemic trend would have predicted — despite falling usage, the remaining user base intensified.`
      },
      {
        heading: "Statistical Significance Tests",
        text: `Design-based tests, accounting for NHANES's complex survey design, were applied throughout. Seven of eight tests are significant at p<0.0001 (Gender × Overlap t=−13.76; Gender × UL Exceedance t=−9.25; Age Group × Overlap F=584.79; Age Group × UL Exceedance F=531.62; Ethnicity × Overlap F=114.37; Ethnicity × UL Exceedance F=12.69; Overlap vs. Single-Product t=21.37). The sole exception is a hypothesis about whether Iron exceedance is specific to the perimenopausal period, tested on a very small subgroup (n=15, t=1.33, p=0.2049) — a result indicating insufficient statistical power, not an invalid hypothesis.`
      }
    ]
  },
  {
    id: 4,
    titleEn: "Chapter 4: Discussion, Limitations & Conclusion",
    readTime: "5 min read",
    sections: [
      {
        heading: "Methodological Lessons",
        text: `An accidental 4x duplication in raw data loading was detected and corrected through cross-validation. Early analyses used unweighted statistics before switching to weighted analysis to comply with NHANES's official guidelines — the magnitude of this correction was small (<1 point) for conditional rates (e.g., overlap among users) but large (~25–29 points) for overall prevalence rates. The historical discontinuity in product ID numbering (1999–2016 vs. 2017–2023) was successfully bridged using a cross-mapping column embedded within the source table itself.`
      },
      {
        heading: "Limitations",
        text: `The pandemic effect and a concurrent survey-mode change (in-person to telephone) occurred simultaneously in 2021–2023; their relative contributions cannot be disentangled with this data. Large differences observed in small demographic subgroups (n<20) should be interpreted with caution; sample sizes are reported alongside every such finding. This is an observational cross-sectional/trend analysis; findings are correlational, not causal — the overlap between the ethnicity × Iron exceedance finding and known anemia prevalence disparities is presented as a hypothesis, not a proven causal link. Drug-supplement interactions and individual clinical dosage safety are outside this study's scope.`
      },
      {
        heading: "Conclusion & Closing Remarks",
        text: `This study shows that dietary supplement use in the U.S. rose between 1999 and 2023, but a substantial share of that trend is driven by multi-product overlap, and that overlap leads to statistically significant safe-upper-limit exceedance. Risk cannot be reduced to a single demographic group or a single mechanism — each nutrient carries its own risk profile. The COVID-19 pandemic materially disrupted overall usage behavior while simultaneously concentrating risk within the remaining user base.

Increased usage does not mean more conscious use — using multiple products raises the risk of exceedance. Future work could pursue full statistical interaction models (three-way demographic interactions) and larger targeted subgroup samples.`
      }
    ]
  }
];

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  type,
  project = 'moma',
  onClose,
  initialSlide = 0,
}) => {
  const activeSlides = project === 'dose' ? DOSE_SLIDES : MOMA_SLIDES;
  const activeReportSections = project === 'dose' ? DOSE_REPORT_SECTIONS : MOMA_REPORT_SECTIONS;

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(initialSlide);
  const [activeReportSection, setActiveReportSection] = useState<number>(0);

  useEffect(() => {
    if (initialSlide >= 0 && initialSlide < activeSlides.length) {
      setCurrentSlideIndex(initialSlide);
    }
  }, [initialSlide, activeSlides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (type === 'presentation') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          setCurrentSlideIndex((prev) => Math.min(prev + 1, activeSlides.length - 1));
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose, activeSlides.length]);

  if (!type) return null;

  const currentSlide: any = activeSlides[currentSlideIndex] || activeSlides[0];
  const pdfUrl = project === 'dose'
    ? (type === 'report' ? '/Dose_of_Reality_Report_EN.pdf' : '/Dose_of_Reality_Presentation_EN.pdf')
    : (type === 'report' ? '/MoMA_Capstone_Report_EN.pdf' : '/MoMA_Capstone_Presentation_EN.pdf');
  const fileName = project === 'dose'
    ? (type === 'report' ? 'Dose_of_Reality_Report_EN.pdf' : 'Dose_of_Reality_Presentation_EN.pdf')
    : (type === 'report' ? 'MoMA_Capstone_Report_EN.pdf' : 'MoMA_Capstone_Presentation_EN.pdf');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#141312] border border-[#3A332C] rounded-sm flex flex-col shadow-2xl overflow-hidden w-full max-w-6xl h-[92vh] sm:h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#181615] border-b border-[#262220] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            {type === 'report' ? (
              <FileText className="w-4 h-4 text-[#B8976C] shrink-0" />
            ) : (
              <Presentation className="w-4 h-4 text-[#C8442C] shrink-0" />
            )}
            <div className="flex items-center space-x-2 truncate">
              <span className="font-mono-code text-xs font-semibold text-[#EDE8E1] uppercase tracking-wider truncate">
                {type === 'report' ? 'Methodology Report & Paper' : 'Capstone Presentation Deck'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Direct Download Button */}
            <a
              href={pdfUrl}
              download={fileName}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
              title="Download Uploaded PDF File"
            >
              <Download className="w-3.5 h-3.5 text-[#B8976C]" />
              <span className="hidden md:inline">Download PDF</span>
            </a>

            {/* Open Raw in New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#C8442C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
              title="Open uploaded PDF file in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C8442C]" />
              <span className="hidden lg:inline">Open PDF in New Tab</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#8E867E] hover:text-white rounded-sm transition-colors ml-1"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto bg-[#100F0E] custom-scrollbar flex flex-col">
          {type === 'presentation' ? (
            /* ====================================================
               PRESENTATION SLIDE VIEWER (15 Slides in English)
               ==================================================== */
            <div className="flex-1 flex flex-col justify-between p-4 sm:p-8 max-w-5xl mx-auto w-full">
              {/* Slide Card */}
              <div className="bg-[#181614] border border-[#332C26] rounded-sm p-6 sm:p-10 shadow-lg flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Step Header */}
                  <div className="flex items-center justify-between border-b border-[#2A2521] pb-4 mb-6">
                    <span className="text-[11px] font-mono-code text-[#B8976C] uppercase tracking-widest flex items-center space-x-2">
                      <Presentation className="w-3.5 h-3.5 inline mr-1 text-[#C8442C]" />
                      {currentSlide.category}
                    </span>
                    <span className="text-xs font-mono-code text-[#8E867E]">
                      Slide {currentSlideIndex + 1} of {activeSlides.length}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#EDE8E1] font-bold tracking-tight mb-2">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#A89F95] font-mono-code mb-8">
                    {currentSlide.subtitle}
                  </p>

                  {/* Slide Content Renderers */}
                  <div className="space-y-6">
                    {/* Slide 1: Title */}
                    {currentSlide.content.type === 'title' && (
                      <div className="py-6 sm:py-10 space-y-6 text-center">
                        <div className="inline-block p-3 bg-[#241F1C] border border-[#3D352F] rounded-sm mb-2">
                          <Sparkles className="w-8 h-8 text-[#B8976C] mx-auto" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-serif text-[#EDE8E1] max-w-2xl mx-auto">
                          {currentSlide.content.headline}
                        </h3>
                        <div className="text-sm font-mono-code text-[#C8442C] font-semibold">
                          {currentSlide.content.event}
                        </div>
                        <div className="text-base text-[#EDE8E1] font-sans font-medium">
                          {currentSlide.content.author}
                        </div>
                        <div className="text-xs font-mono-code text-[#8E867E] max-w-xl mx-auto border-t border-[#2A2521] pt-4">
                          {currentSlide.content.meta}
                        </div>
                        <p className="text-xs italic text-[#A89F95] max-w-lg mx-auto">
                          "{currentSlide.content.tagline}"
                        </p>
                      </div>
                    )}

                    {/* Slide 2: Definition & Pipeline */}
                    {currentSlide.content.type === 'text_highlight' && (
                      <div className="space-y-6">
                        <div className="p-4 bg-[#211C18] border border-[#3E352D] rounded-sm">
                          <div className="text-xs font-mono-code text-[#B8976C] uppercase tracking-wider mb-1">
                            Operational Definition
                          </div>
                          <div className="text-sm sm:text-base font-mono-code font-bold text-[#EDE8E1] mb-2">
                            {currentSlide.content.definition?.formula}
                          </div>
                          <p className="text-xs text-[#A89F95] leading-relaxed">
                            {currentSlide.content.definition?.explanation}
                          </p>
                        </div>

                        <div className="p-4 bg-[#1B1917] border-l-2 border-[#C8442C] text-sm text-[#EDE8E1]">
                          {currentSlide.content.mainQuestion}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {currentSlide.content.pipeline?.map((step, idx) => (
                            <div key={idx} className="p-3 bg-[#151412] border border-[#2B2622] rounded-xs">
                              <div className="text-xs font-mono-code text-[#EDE8E1] font-semibold flex items-center space-x-1.5 mb-1">
                                <Database className="w-3.5 h-3.5 text-[#B8976C]" />
                                <span>{step.label}</span>
                              </div>
                              <div className="text-[11px] text-[#8E867E] font-sans">{step.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Slide 3: Stats Overview */}
                    {currentSlide.content.type === 'stats_overview' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {(currentSlide.content as any).stats?.map((stat: any, idx: number) => (
                            <div key={idx} className="p-4 bg-[#201C19] border border-[#38312B] rounded-sm text-center">
                              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE8E1] mb-1">
                                {stat.value}
                              </div>
                              <div className="text-xs font-mono-code text-[#B8976C] mb-1">{stat.label}</div>
                              <div className="text-[10px] text-[#8E867E]">{stat.sub}</div>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs sm:text-sm text-[#A89F95] leading-relaxed bg-[#151312] p-4 border border-[#2B2622] rounded-sm">
                          {currentSlide.content.trendSummary}
                        </p>

                        <div className="p-3 bg-[#241B18] border border-[#4D2820] text-xs text-[#E6A092] rounded-sm flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-[#C8442C] shrink-0 mt-0.5" />
                          <span>{currentSlide.content.callout}</span>
                        </div>
                      </div>
                    )}

                    {/* Slide 4: Framework Grid */}
                    {currentSlide.content.type === 'framework_grid' && (
                      <div className="space-y-4">
                        <p className="text-xs sm:text-sm text-[#A89F95]">
                          {currentSlide.content.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                          {currentSlide.content.hypotheses?.map((hypo, idx) => (
                            <div key={idx} className="p-4 bg-[#1E1B18] border border-[#332D27] rounded-sm hover:border-[#B8976C] transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <span className="px-2 py-0.5 bg-[#2B2520] text-xs font-mono-code font-bold text-[#C8442C] rounded-xs">
                                  {hypo.code}
                                </span>
                                <span className="text-xs font-mono-code text-[#B8976C] font-semibold">
                                  {hypo.topic}
                                </span>
                              </div>
                              <p className="text-xs text-[#EDE8E1] mb-3 leading-relaxed">
                                {hypo.question}
                              </p>
                              <div className="text-[11px] font-mono-code text-[#8E867E] bg-[#141312] px-2.5 py-1 rounded-xs border border-[#25211D]">
                                Result: <span className="text-[#EDE8E1]">{hypo.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Slide 5 & 8: Distribution Analysis with Dedicated Pie / Donut Chart */}
                    {currentSlide.content.type === 'distribution_analysis' && (
                      <div className="space-y-6">
                        {/* Interactive SVG Pie/Donut Chart Container */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-[#1B1815] border border-[#332C26] rounded-sm">
                          {/* Donut graphic */}
                          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#26221F"
                                strokeWidth="14"
                              />
                              {(() => {
                                const radius = 40;
                                const circumference = 2 * Math.PI * radius; // 251.327
                                let accumulatedPercent = 0;
                                return (currentSlide.content.distribution as any)?.map((item: any, idx: number) => {
                                  const strokeDasharray = `${(item.percentNum / 100) * circumference} ${circumference}`;
                                  const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
                                  accumulatedPercent += item.percentNum;
                                  return (
                                    <circle
                                      key={idx}
                                      cx="50"
                                      cy="50"
                                      r={radius}
                                      fill="transparent"
                                      stroke={item.color}
                                      strokeWidth="14"
                                      strokeDasharray={strokeDasharray}
                                      strokeDashoffset={strokeDashoffset}
                                      strokeLinecap="butt"
                                      className="transition-all duration-500 hover:opacity-90"
                                    />
                                  );
                                });
                              })()}
                            </svg>
                            {/* Center Badge */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                              <span className="text-xs font-mono-code font-bold text-[#EDE8E1]">
                                {(currentSlide.content as any).centerLabel || '160.7K'}
                              </span>
                              <span className="text-[9px] font-mono-code text-[#8E867E]">
                                {(currentSlide.content as any).centerSubLabel || 'Total Works'}
                              </span>
                            </div>
                          </div>

                          {/* Legend & Breakdown List */}
                          <div className="flex-1 w-full space-y-2.5">
                            {currentSlide.content.distribution?.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-2.5 bg-[#151312] border border-[#2B2622] rounded-xs">
                                <div className="flex items-center space-x-2.5">
                                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                  <div>
                                    <div className="text-xs font-mono-code text-[#EDE8E1] font-semibold">{item.label}</div>
                                    <div className="text-[10px] text-[#8E867E]">{item.count}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-lg font-serif font-bold text-[#EDE8E1]">{item.share}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-[#161412] border-l-2 border-[#B8976C] space-y-2 rounded-xs">
                          <div className="text-xs font-mono-code text-[#B8976C] uppercase font-semibold">
                            General Observation
                          </div>
                          <p className="text-xs sm:text-sm text-[#EDE8E1] leading-relaxed">
                            {currentSlide.content.generalObservation}
                          </p>
                        </div>

                        <div className="p-4 bg-[#1C1715] border border-[#3D2722] rounded-xs space-y-1.5">
                          <div className="text-xs font-mono-code text-[#C8442C] uppercase font-semibold">
                            Next Question & Hypothesis Focus
                          </div>
                          <p className="text-xs sm:text-sm text-[#E0D8D0] leading-relaxed">
                            {currentSlide.content.nextQuestion}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Slide 6 & 9: Table Verification */}
                    {currentSlide.content.type === 'table_verification' && (
                      <div className="space-y-4">
                        <div className="p-3 bg-[#241A17] border border-[#482820] text-xs text-[#E6A092] rounded-sm">
                          <span className="font-semibold text-[#C8442C] font-mono-code uppercase mr-1">Raw Finding Trap:</span>
                          {currentSlide.content.rawTrap}
                        </div>

                        <div className="p-3 bg-[#1B1E17] border border-[#2D3A20] text-xs text-[#C2D6A8] rounded-sm">
                          <span className="font-semibold text-[#8EB85C] font-mono-code uppercase mr-1">Controlled Insight:</span>
                          {currentSlide.content.controlledInsight}
                        </div>

                        <div className="overflow-x-auto border border-[#332C26] rounded-sm mt-3">
                          <table className="w-full text-left text-xs font-mono-code">
                            <thead className="bg-[#241F1B] text-[#B8976C] border-b border-[#332C26]">
                              <tr>
                                <th className="p-2.5">Period</th>
                                <th className="p-2.5">{(currentSlide.content as any).tableData?.[0]?.femaleMed ? 'Female Median' : 'Western Median'}</th>
                                <th className="p-2.5">{(currentSlide.content as any).tableData?.[0]?.maleMed ? 'Male Median' : 'Non-Western Median'}</th>
                                <th className="p-2.5">{(currentSlide.content as any).testLabel || 'Mann-Whitney p'}</th>
                                <th className="p-2.5">Conclusion</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2B2520] bg-[#171513] text-[#EDE8E1]">
                              {(currentSlide.content as any).tableData?.map((row: any, idx: number) => (
                                <tr key={idx} className="hover:bg-[#201D1A]">
                                  <td className="p-2.5 font-bold text-[#B8976C]">{row.period}</td>
                                  <td className="p-2.5">{row.femaleMed || row.westMed}</td>
                                  <td className="p-2.5">{row.maleMed || row.nonWestMed}</td>
                                  <td className="p-2.5 text-[#C8442C] font-semibold">{row.pValue}</td>
                                  <td className="p-2.5 text-[11px] text-[#A89F95]">{row.result}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="text-xs text-[#8E867E] italic pt-1">
                          {currentSlide.content.robustness}
                        </div>
                      </div>
                    )}

                    {/* Slide 7 & 10: Projection Charts */}
                    {currentSlide.content.type === 'projection_chart' && (
                      <div className="space-y-5">
                        <div className="p-4 bg-[#201C19] border border-[#3E342B] rounded-sm flex items-center justify-between">
                          <div>
                            <div className="text-xs font-mono-code text-[#B8976C] uppercase mb-1">Estimated Parity Crossover</div>
                            <div className="text-3xl font-serif font-bold text-[#EDE8E1]">{currentSlide.content.crossoverYear}</div>
                          </div>
                          <div className="text-right text-xs font-mono-code text-[#8E867E]">
                            <div>Status Quo:</div>
                            <div className="text-[#EDE8E1] font-semibold">{currentSlide.content.currentCounts}</div>
                          </div>
                        </div>

                        <div className="p-4 bg-[#161412] border border-[#2B2622] rounded-xs space-y-2 text-xs">
                          <div className="font-mono-code text-[#B8976C] font-semibold">Modeling Methodology:</div>
                          <p className="text-[#A89F95] leading-relaxed font-sans">{currentSlide.content.methodology}</p>
                        </div>

                        <div className="p-4 bg-[#1B1917] border-l-2 border-[#C8442C] text-xs sm:text-sm text-[#EDE8E1] leading-relaxed">
                          {currentSlide.content.conclusion}
                        </div>
                      </div>
                    )}

                    {/* Slide 11: Movement Deviations */}
                    {currentSlide.content.type === 'movement_deviations' && (
                      <div className="space-y-5">
                        <p className="text-xs text-[#A89F95]">{currentSlide.content.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Early */}
                          <div className="p-4 bg-[#1A1E17] border border-[#2B3820] rounded-sm space-y-3">
                            <div className="text-xs font-mono-code text-[#8EB85C] uppercase font-bold">
                              Recognized Early (Faster Lag)
                            </div>
                            <div className="space-y-2">
                              {currentSlide.content.earlyMovements?.map((m, idx) => (
                                <div key={idx} className="p-2 bg-[#141611] rounded-xs text-xs font-mono-code flex justify-between items-center">
                                  <span className="text-[#EDE8E1]">{m.name}</span>
                                  <span className="text-[#8EB85C] font-bold">{m.deviation}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Late */}
                          <div className="p-4 bg-[#231816] border border-[#482820] rounded-sm space-y-3">
                            <div className="text-xs font-mono-code text-[#C8442C] uppercase font-bold">
                              Recognized Late (Belated Lag)
                            </div>
                            <div className="space-y-2">
                              {currentSlide.content.lateMovements?.map((m, idx) => (
                                <div key={idx} className="p-2 bg-[#171211] rounded-xs text-xs font-mono-code flex justify-between items-center">
                                  <span className="text-[#EDE8E1]">{m.name}</span>
                                  <span className="text-[#C8442C] font-bold">{m.deviation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Slide 12: Correlation Shift */}
                    {currentSlide.content.type === 'correlation_shift' && (
                      <div className="space-y-4">
                        <div className="text-xs font-mono-code text-[#B8976C] mb-2">{currentSlide.content.metric}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentSlide.content.phases?.map((p, idx) => (
                            <div key={idx} className="p-4 bg-[#1E1B18] border border-[#332C26] rounded-sm">
                              <div className="text-xs font-mono-code text-[#8E867E] mb-1">{p.period}</div>
                              <div className="text-2xl font-serif font-bold text-[#EDE8E1] mb-1">{p.r}</div>
                              <div className="text-xs font-mono-code text-[#B8976C] font-semibold mb-2">{p.label}</div>
                              <p className="text-[11px] text-[#A89F95] leading-relaxed">{p.desc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 bg-[#1B1917] border-l-2 border-[#B8976C] text-xs text-[#EDE8E1]">
                          {currentSlide.content.takeaway}
                        </div>
                      </div>
                    )}

                    {/* Slide 13: Autocorrelation */}
                    {currentSlide.content.type === 'autocorrelation' && (
                      <div className="space-y-5">
                        <div className="text-xs font-mono-code text-[#B8976C]">{currentSlide.content.metric}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-[#201C18] border border-[#3D352B] rounded-sm text-center">
                            <div className="text-xs font-mono-code text-[#B8976C] mb-1">Autocorrelation (r)</div>
                            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#EDE8E1]">
                              r = {(currentSlide.content as any).stats?.r}
                            </div>
                            <div className="text-[10px] text-[#8E867E] mt-1">Strong institutional rhythm</div>
                          </div>
                          <div className="p-4 bg-[#201C18] border border-[#3D352B] rounded-sm text-center">
                            <div className="text-xs font-mono-code text-[#B8976C] mb-1">p-value</div>
                            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C8442C]">
                              p = {(currentSlide.content as any).stats?.pValue}
                            </div>
                            <div className="text-[10px] text-[#8E867E] mt-1">Statistically significant</div>
                          </div>
                        </div>

                        <div className="p-4 bg-[#161412] border border-[#2B2622] rounded-xs space-y-2 text-xs">
                          <p className="text-[#EDE8E1]">{currentSlide.content.interpretation}</p>
                          <p className="text-[#8E867E]">{currentSlide.content.equilibrium}</p>
                        </div>
                      </div>
                    )}

                    {/* Slide 14: Regression Model */}
                    {currentSlide.content.type === 'regression_model' && (
                      <div className="space-y-4">
                        <div className="p-3.5 bg-[#201C18] border border-[#3E342B] rounded-sm">
                          <div className="text-xs font-mono-code text-[#B8976C] mb-1">Log-Transformed OLS Model (R² = {currentSlide.content.performance?.r2})</div>
                          <div className="text-xs sm:text-sm font-mono-code font-bold text-[#EDE8E1]">
                            {currentSlide.content.formula}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentSlide.content.validation?.map((v, idx) => (
                            <div key={idx} className="p-3 bg-[#171513] border border-[#2B2622] rounded-sm text-xs font-mono-code">
                              <div className="text-[#B8976C] font-semibold mb-1">{v.artist}</div>
                              <div className="text-[#EDE8E1]">Actual: {v.actual} | Pred: {v.pred}</div>
                              <div className="text-[11px] text-[#8E867E] mt-0.5">{v.delta}</div>
                            </div>
                          ))}
                        </div>

                        <div className="border border-[#332C26] rounded-sm overflow-hidden mt-2">
                          <div className="px-3 py-2 bg-[#221D19] text-xs font-mono-code text-[#B8976C] font-semibold border-b border-[#332C26]">
                            Top 5 "Lost Potential" Estimates (Premature Death Cohort, n=187)
                          </div>
                          <div className="divide-y divide-[#2B2522] bg-[#151412] text-xs font-mono-code">
                            {currentSlide.content.topLostPotential?.map((item, idx) => (
                              <div key={idx} className="p-2.5 flex justify-between items-center text-[#EDE8E1] hover:bg-[#1C1A17]">
                                <span>{item.name} (died age {item.age})</span>
                                <span className="text-[#C8442C] font-bold">{item.lost}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Slide 15: Conclusion */}
                    {currentSlide.content.type === 'takeaways' && (
                      <div className="space-y-4">
                        <div className="space-y-2.5">
                          {currentSlide.content.bullets?.map((b, idx) => (
                            <div key={idx} className="p-3 bg-[#1B1816] border-l-2 border-[#B8976C] rounded-xs text-xs sm:text-sm text-[#EDE8E1] leading-relaxed">
                              {b}
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-[#2B2622] text-center">
                          <p className="text-xs font-mono-code text-[#A89F95] mb-2">
                            {currentSlide.content.closing}
                          </p>
                          <div className="text-base font-serif font-bold text-[#EDE8E1]">
                            Thank you — Questions & Discussion
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slide Navigation Controls */}
                <div className="mt-8 pt-4 border-t border-[#2A2521] flex items-center justify-between">
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentSlideIndex === 0}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#201C19] hover:bg-[#2B2622] disabled:opacity-30 disabled:cursor-not-allowed border border-[#38312B] text-xs font-mono-code text-[#EDE8E1] rounded-xs transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Dot navigation */}
                  <div className="hidden sm:flex items-center space-x-1.5">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlideIndex === idx 
                            ? 'w-6 bg-[#C8442C]' 
                            : 'bg-[#3A332C] hover:bg-[#5A524A]'
                        }`}
                        title={`Go to Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, activeSlides.length - 1))}
                    disabled={currentSlideIndex === activeSlides.length - 1}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#201C19] hover:bg-[#2B2622] disabled:opacity-30 disabled:cursor-not-allowed border border-[#38312B] text-xs font-mono-code text-[#EDE8E1] rounded-xs transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ====================================================
               REPORT CHAPTER VIEWER (Comprehensive Chapters - Purely English)
               ==================================================== */
            <div className="flex-1 flex flex-col md:flex-row">
              {/* Left Sidebar: Chapter List */}
              <div className="w-full md:w-80 bg-[#161413] border-b md:border-b-0 md:border-r border-[#262220] p-4 shrink-0 flex md:flex-col overflow-x-auto md:overflow-y-auto space-x-2 md:space-x-0 md:space-y-2">
                <div className="hidden md:block text-[11px] font-mono-code text-[#8E867E] uppercase tracking-wider mb-2 px-2">
                  Report Chapters
                </div>
                {activeReportSections.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveReportSection(idx)}
                    className={`text-left p-3 rounded-sm text-xs font-mono-code transition-all shrink-0 md:shrink border ${
                      activeReportSection === idx
                        ? 'bg-[#221D1A] border-[#B8976C] text-[#EDE8E1] shadow-sm'
                        : 'border-transparent text-[#8E867E] hover:text-[#EDE8E1] hover:bg-[#1B1816]'
                    }`}
                  >
                    <div className="font-semibold mb-0.5 truncate">
                      {ch.titleEn}
                    </div>
                    <div className="text-[10px] text-[#6A635B]">{ch.readTime}</div>
                  </button>
                ))}
              </div>

              {/* Right Content: Selected Chapter Content */}
              <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto space-y-8 overflow-y-auto">
                {/* Chapter Header */}
                <div className="border-b border-[#2A2521] pb-4">
                  <div className="text-xs font-mono-code text-[#B8976C] uppercase tracking-wider mb-1">
                    {project === 'dose' ? 'Dose of Reality Methodology Paper' : 'MoMA Capstone Research Paper'}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#EDE8E1]">
                    {activeReportSections[activeReportSection]?.titleEn}
                  </h1>
                </div>

                {/* Chapter Subsections */}
                <div className="space-y-8">
                  {activeReportSections[activeReportSection]?.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h2 className="text-base sm:text-lg font-serif font-bold text-[#EDE8E1] flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-[#C8442C] rounded-full inline-block" />
                        <span>{sec.heading}</span>
                      </h2>

                      {sec.text && (
                        <p className="text-xs sm:text-sm text-[#C4BCB3] leading-relaxed whitespace-pre-line font-sans">
                          {sec.text}
                        </p>
                      )}

                      {sec.table && (
                        <div className="overflow-x-auto border border-[#332C26] rounded-sm mt-3">
                          <table className="w-full text-left text-xs font-mono-code">
                            <thead className="bg-[#241F1B] text-[#B8976C] border-b border-[#332C26]">
                              <tr>
                                {sec.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-2.5">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2B2520] bg-[#171513] text-[#EDE8E1]">
                              {sec.table.rows.map((r, rIdx) => (
                                <tr key={rIdx} className="hover:bg-[#201D1A]">
                                  {r.map((cell, cIdx) => (
                                    <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold text-[#B8976C]' : ''}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chapter Pagination */}
                <div className="pt-6 border-t border-[#2A2521] flex justify-between items-center text-xs font-mono-code">
                  <button
                    onClick={() => setActiveReportSection((prev) => Math.max(prev - 1, 0))}
                    disabled={activeReportSection === 0}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#1B1816] hover:bg-[#25211E] disabled:opacity-30 disabled:cursor-not-allowed border border-[#332C26] text-[#EDE8E1] rounded-xs"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Chapter</span>
                  </button>

                  <span className="text-[#8E867E]">
                    Chapter {activeReportSection + 1} of {activeReportSections.length}
                  </span>

                  <button
                    onClick={() => setActiveReportSection((prev) => Math.min(prev + 1, activeReportSections.length - 1))}
                    disabled={activeReportSection === activeReportSections.length - 1}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#1B1816] hover:bg-[#25211E] disabled:opacity-30 disabled:cursor-not-allowed border border-[#332C26] text-[#EDE8E1] rounded-xs"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#181615] border-t border-[#262220] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code shrink-0">
          <div className="flex items-center space-x-3 text-[#7A726A]">
            <span>File: {fileName}</span>
            <span>•</span>
            <span className="text-[#B8976C]">Verified Deliverable</span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={pdfUrl}
              download={fileName}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1B18] hover:bg-[#2A2622] border border-[#3A332C] hover:border-[#B8976C] text-[#EDE8E1] text-xs font-mono-code rounded-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#B8976C]" />
              <span>Download</span>
            </a>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-[#C8442C] hover:bg-[#D94E35] text-white rounded-sm transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
