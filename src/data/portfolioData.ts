import { FeaturedProject, BootcampCategory, MoMAEraData, MovementDeviation, LostPotentialArtist } from '../types';

export const PERSONAL_INFO = {
  name: 'Didem Arslan Yenihayat',
  tagline: 'I look for the pattern before I look for the proof — then I build the thing that makes it visible.',
  aboutParagraphs: [
    'That curiosity started early — in books, long before I had a name for it. Later, as a chemical engineer, I found it again in the lab: small moments that were always saying something.',
    'Eventually I carried that same instinct into a richer field — numbers and data. I believe numbers tell a story, if you\'re paying attention — and revealing it is the part I actually love.',
  ],
  contactEmail: 'didemmrsln@gmail.com',
  profilePhotoUrl: '/profile_photo_optimized.jpg',
  links: {
    email: 'didemmrsln@gmail.com',
    github: 'https://github.com/didemmrsln',
    githubProject: 'https://github.com/didemmrsln/moma_capstone',
    linkedin: 'https://www.linkedin.com/in/didem-arslan-yenihayat-24303688',
  },
};

export const MOMA_OVERVIEW = {
  title: 'The Recognition Lag',
  subtitle: 'Who Gets Recognized, and When?',
  author: 'Didem Arslan Yenihayat',
  bootcamp: 'Workintech Data Science Bootcamp — Capstone Project',
  totalArtworks: 160699,
  totalArtists: 15932,
  medianAcquisitionLag: 21,
  bulkGiftYears: '1960s: large bulk gift years (1964, 1968)',
  methodologyStack: 'BigQuery + dbt + Python + Wikidata (SPARQL, CC0)',
  tests: 'Mann-Whitney U (α=0.05), Pearson correlation, lag-1 autocorrelation (r=0.855), Log-linear regression',
};

export const MOMA_DECADE_ACQUISITIONS: { decade: string; works: number | string; note: string }[] = [
  { decade: '1920s', works: 9, note: 'Founding decade — earliest catalogued acquisitions' },
  { decade: '1930s', works: 1799, note: 'Early institutional collection' },
  { decade: '1940s', works: 7418, note: 'Wartime acquisitions' },
  { decade: '1950s', works: 6315, note: 'Post-war expansion' },
  { decade: '1960s', works: 43107, note: 'Bulk gift peaks (1964, 1968: ~43,107 works)' },
  { decade: '1970s', works: 13459, note: 'Canon consolidation' },
  { decade: '1980s', works: 10157, note: 'Institutional stabilization' },
  { decade: '1990s', works: 11547, note: 'Contemporary pivot' },
  { decade: '2000s', works: 23959, note: 'Second major expansion wave' },
  { decade: '2010s', works: 25034, note: 'Global & pluralist acquisitions' },
  { decade: '2020s', works: 8348, note: 'Current ongoing cataloging' },
];

export const MOMA_ERA_DATA: MoMAEraData[] = [
  {
    era: '1950 — 1970 (Post-War Canon)',
    period: '1950-1970',
    totalWorks: 49100,
    femaleLag: 39,
    maleLag: 11,
    nonWesternLag: 39,
    westernLag: 11,
    lagGapClosed: false,
    pValueText: 'p < 0.001',
    notableInsight: 'Extreme institutional delay for female and non-Western artists (median 39-year wait vs. 11 years for Western males).',
  },
  {
    era: '1970 — 1990 (Institutional Pivot)',
    period: '1970-1990',
    totalWorks: 23250,
    femaleLag: 27,
    maleLag: 18,
    nonWesternLag: 33,
    westernLag: 15,
    lagGapClosed: false,
    pValueText: 'p < 0.001',
    notableInsight: 'Lag gap began narrowing as contemporary collecting accelerated, but geographic and gender disparities remained statistically significant.',
  },
  {
    era: '1990 — 2010 (Modern Contemporary Era)',
    period: '1990-2010',
    totalWorks: 40100,
    femaleLag: 5,
    maleLag: 5,
    nonWesternLag: 9,
    westernLag: 4,
    lagGapClosed: true,
    pValueText: 'p = 0.418 (Gender Closed) / p < 0.001 (Geography Persists)',
    notableInsight: 'The gender lag gap completely closed (p=0.418), though geographic delay persisted (p<0.001). Artwork-count parity remains ~80 years away.',
  },
];

export const MOMA_MOVEMENT_DEVIATIONS: MovementDeviation[] = [
  // Fast-tracked (negative deviation in years)
  { name: 'Expressionism', deviationYears: -19.3, category: 'fast-tracked' },
  { name: 'Neues Bauen', deviationYears: -15.8, category: 'fast-tracked' },
  { name: 'Symbolism', deviationYears: -14.0, category: 'fast-tracked' },
  { name: 'Orientalism', deviationYears: -12.2, category: 'fast-tracked' },
  { name: 'Modernism', deviationYears: -10.7, category: 'fast-tracked' },
  { name: 'Surrealism', deviationYears: -3.2, category: 'fast-tracked' },

  // Overlooked / Catch-up (positive deviation in years)
  { name: 'Art Nouveau', deviationYears: 1.8, category: 'overlooked-catchup' },
  { name: 'Abstract Expressionism', deviationYears: 2.1, category: 'overlooked-catchup' },
  { name: 'Romanticism', deviationYears: 2.3, category: 'overlooked-catchup' },
  { name: 'Rococo', deviationYears: 5.7, category: 'overlooked-catchup' },
  { name: 'Contemporary Art', deviationYears: 7.8, category: 'overlooked-catchup' },
  { name: 'Abstract Art', deviationYears: 11.6, category: 'overlooked-catchup' },
  { name: 'Feminist Art', deviationYears: 11.8, category: 'overlooked-catchup' },
  { name: 'Literary Realism', deviationYears: 13.5, category: 'overlooked-catchup' },
  { name: 'Minimalism', deviationYears: 18.5, category: 'overlooked-catchup' },
];

export const MOMA_CORRELATION_WEIGHTS = [
  { era: '1940-1970', r: -0.64, direction: 'neg', label: 'Favored own contemporaries; negative correlation with historical weight' },
  { era: '1970-2000', r: 0.14, direction: 'pos', label: 'Transitional rebalancing period' },
  { era: '2000-2030', r: 0.73, direction: 'pos', label: 'Active institutional catch-up on previously overlooked movements' },
];

export const MOMA_LOST_POTENTIAL_REGRESSION = {
  model: 'Log-linear regression on first 8 career years',
  rSquared: 0.705,
  sampleSize: 5656,
  pacePredictabilityR: 0.855,
  caseStudies: [
    {
      name: 'Keith Haring',
      actual: 49,
      predicted: 48.8,
      delta: -0.2,
      evaluation: 'Near-perfect match with log-linear model projection',
    },
    {
      name: 'Jean-Michel Basquiat',
      actual: 12,
      predicted: 17.0,
      delta: 5.0,
      evaluation: 'Lost potential: career cut short at model threshold (+5 predicted works)',
    },
  ],
};

export const MOMA_LOST_POTENTIAL_TOP10: LostPotentialArtist[] = [
  { name: 'Gordon Matta-Clark', lostPotential: 42.3, lifespan: '1943–1978 (Age 35)' },
  { name: 'Rudolf Schwarzkogler', lostPotential: 34.3, lifespan: '1940–1969 (Age 28)' },
  { name: 'Alberto Greco', lostPotential: 30.1, lifespan: '1931–1965 (Age 34)' },
  { name: 'Robert Smithson', lostPotential: 24.3, lifespan: '1938–1973 (Age 35)' },
  { name: 'Alfred Jarry', lostPotential: 20.8, lifespan: '1873–1907 (Age 34)' },
  { name: 'Robert Adamson', lostPotential: 18.6, lifespan: '1821–1848 (Age 27)' },
  { name: 'John B. Greene', lostPotential: 18.1, lifespan: '1832–1856 (Age 24)' },
  { name: 'Blinky Palermo', lostPotential: 17.0, lifespan: '1943–1977 (Age 33)' },
  { name: 'Wilhelm Lehmbruck', lostPotential: 16.5, lifespan: '1881–1919 (Age 38)' },
  { name: 'Felix Gonzalez-Torres', lostPotential: 16.0, lifespan: '1957–1996 (Age 38)' },
];

export const DOSE_OVERVIEW = {
  title: 'Dose of Reality',
  subtitle: 'Overlap Deceives, Exceedance Is Real',
  author: 'Didem Arslan Yenihayat',
  bootcamp: 'Workintech Data Science Bootcamp — Capstone Project #2',
  totalObservations: 46388,
  cycles: 10,
  yearsSpan: '1999–2023 (24 years)',
  ingredientsExamined: 6,
  methodologyStack: 'BigQuery + dbt (ELT) + Python (pandas, svy design-based statistics)',
  tests: 'Design-based t-tests, Kruskal-Wallis rank tests, one-sample proportion tests (svy)',
};

export const DOSE_GENDER_COMPARISON = {
  unweighted: { female: 44.7, male: 35.1 },
  weighted: { female: 44.2, male: 34.3 },
  overlapTest: { statistic: 't = −13.76', df: 177, pValue: 'p < 0.0001' },
  exceedanceTest: { statistic: 't = −9.25', pValue: 'p < 0.0001' },
  note: "Applying NHANES's official survey weighting held the result almost unchanged — it confirmed the unweighted finding rather than reversing it. The gender gap in UL exceedance has widened systematically since 2017, driven by women's rising multi-product (overlap) behavior."
};

export const DOSE_INGREDIENT_MECHANISM = [
  { ingredient: 'Vitamin D', mechanism: 'Overlap-Driven', overlapDrivenPct: 20.6, singleProductPct: 6.9, note: 'By 2021–2023, 20.6% of the population exceeded UL via overlap vs. 6.9% via a single product — risk is overwhelmingly overlap-driven, and this gap has widened every cycle since 2007–2008.' },
  { ingredient: 'Iron', mechanism: 'Single-Product-Driven', overlapDrivenPct: 5.2, singleProductPct: 11.9, note: 'Single-product exceedance (11.9%) more than doubles overlap-driven exceedance (5.2%) in 2021–2023; single-product risk peaked at 15.3% in 2017–2020 before receding.' },
  { ingredient: 'Niacin', mechanism: 'Single-Product-Driven (Declining)', overlapDrivenPct: 6.2, singleProductPct: 5.5, note: "The 24-year decline in Niacin exceedance is driven almost entirely by the single-product component, which fell from 14.1% (1999–2002) to 5.5% (2021–2023), while the overlap-driven share stayed roughly flat (6–8%) throughout." },
  { ingredient: 'Zinc', mechanism: 'Overlap-Driven (Recent Shift)', overlapDrivenPct: 5.9, singleProductPct: 3.6, note: 'Both components were flat and low for two decades; the 2021–2023 spike is disproportionately overlap-driven (5.9% vs. 3.6% single-product) — a new pattern, not an extension of a prior trend.' },
  { ingredient: 'Magnesium', mechanism: 'Mixed, Slightly Overlap-Leaning', overlapDrivenPct: 7.5, singleProductPct: 6.4, note: 'The two sources track closely across all 24 years and rise together; by 2021–2023 overlap (7.5%) is only modestly ahead of single-product (6.4%).' },
  { ingredient: 'Vitamin A', mechanism: 'Mixed, Both Declining', overlapDrivenPct: 1.1, singleProductPct: 0.9, note: 'Both sources are low and falling in parallel (from ~3% each in 1999–2002 to ~1% each in 2021–2023) — the only ingredient where population-wide exceedance risk is receding on both fronts.' },
];

export const DOSE_INGREDIENT_COUNTERFACTUAL = {
  overlap: {
    'Vitamin D': { projected: 27.7, actual: 31.3, diff: 3.6 },
    'Iron':      { projected: 6.4,  actual: 10.7, diff: 4.3 },
    'Magnesium': { projected: 15.3, actual: 17.7, diff: 2.4 },
    'Niacin':    { projected: 8.6,  actual: 9.6,  diff: 1.0 },
    'Zinc':      { projected: 7.5,  actual: 15.5, diff: 8.0 },
    'Vitamin A': { projected: 7.0,  actual: 5.8,  diff: -1.2 }
  },
  exceedance: {
    'Vitamin D': { projected: 21.3, actual: 27.5, diff: 6.2 },
    'Iron':      { projected: 17.7, actual: 17.1, diff: -0.6 },
    'Magnesium': { projected: 12.4, actual: 13.9, diff: 1.5 },
    'Niacin':    { projected: 16.1, actual: 11.7, diff: -4.4 },
    'Zinc':      { projected: 3.9,  actual: 9.4,  diff: 5.5 },
    'Vitamin A': { projected: 2.4,  actual: 1.9,  diff: -0.5 }
  }
};

export const DOSE_PANDEMIC_EFFECT = {
  actualUsage2021_23: 34.3,
  usage2017_20: 57.7,
  deviationPts: -20.9,
  projectedUsage2021_23Approx: 55.2,
  projectedNote: "Derived from the reported −20.9 point deviation applied to the actual 34.3% (34.3 + 20.9 ≈ 55.2%) — the report states the deviation directly; this approximate projected figure is a simple back-calculation, not a separately reported value.",
  vitaminD: { exceedance2021_23: 27.5, baseline: '0.0–0.1% (1999–2006)' },
  zinc: { exceedance2021_23: 9.4, baseline: '3–4% (flat for 20+ years)' },
  overallSourceOfExceedance: { overlap: 64.2, singleProduct: 35.8, test: 't = 21.37, p < 0.0001 (one-sample test vs. 50%)' }
};

export const DOSE_CYCLE_ORDER = [
  '1999-2002', '2003-2004', '2005-2006', '2007-2008', '2009-2010',
  '2011-2012', '2013-2014', '2015-2016', '2017-2020', '2021-2023'
];

export const DOSE_COHORT_TRENDS = {
  sourceNote: "Survey-weighted design-based percentages computed directly from the author's BigQuery/dbt analysis pipeline (mean across the six focus ingredients: Vitamin D, Iron, Magnesium, Niacin, Zinc, Vitamin A).",
  gender: {
    overlap: {
      'Female': [9.6, 9.6, 10.5, 11.0, 9.2, 11.5, 10.8, 13.6, 13.2, 16.9],
      'Male':   [6.4, 6.5, 6.6, 7.0, 6.0, 7.3, 7.7, 9.9, 9.6, 12.8]
    },
    exceedance: {
      'Female': [7.8, 6.8, 6.5, 7.2, 6.7, 8.2, 10.6, 11.5, 13.6, 15.0],
      'Male':   [6.2, 6.2, 5.7, 5.2, 5.6, 6.6, 8.9, 9.7, 10.8, 11.7]
    }
  },
  ageGroup: {
    overlap: {
      '0-17':  [1.8, 3.7, 3.8, 2.8, 2.6, 2.4, 3.3, 6.0, 3.4, 8.3],
      '18-34': [6.2, 6.5, 7.1, 9.2, 5.5, 7.0, 7.1, 8.4, 8.3, 10.4],
      '35-49': [9.7, 9.0, 9.2, 7.9, 6.3, 8.7, 7.6, 11.8, 11.1, 13.1],
      '50-64': [12.4, 10.3, 11.0, 12.2, 10.6, 12.8, 12.0, 14.5, 13.8, 15.4],
      '65+':   [10.2, 10.8, 12.4, 13.4, 12.6, 15.7, 14.2, 15.7, 16.0, 20.5]
    },
    exceedance: {
      '0-17':  [1.6, 1.8, 0.8, 1.2, 1.0, 1.7, 3.0, 2.9, 4.2, 4.7],
      '18-34': [7.4, 6.6, 6.7, 6.7, 5.5, 6.2, 7.1, 9.4, 10.5, 9.2],
      '35-49': [8.6, 7.5, 6.0, 6.1, 5.5, 7.3, 9.4, 10.3, 13.5, 10.7],
      '50-64': [9.0, 7.3, 6.8, 6.7, 8.0, 10.2, 11.5, 11.4, 12.8, 16.2],
      '65+':   [8.0, 8.6, 10.1, 10.7, 10.4, 11.2, 15.6, 15.6, 16.9, 18.2]
    }
  },
  ethnicity: {
    overlap: {
      'Mexican American':               [5.5, 6.1, 4.8, 5.9, 6.7, 7.4, 5.6, 8.2, 9.7, 15.6],
      'Other Hispanic':                 [6.1, 7.6, 7.0, 6.4, 4.6, 8.1, 9.4, 9.4, 10.7, 10.0],
      'Non-Hispanic White':             [8.9, 8.9, 9.4, 10.2, 8.5, 10.7, 10.0, 13.4, 12.4, 15.7],
      'Non-Hispanic Black':             [5.2, 5.0, 6.3, 6.2, 5.2, 6.1, 9.0, 7.5, 9.0, 14.3],
      'Other Race (incl. Multiracial)': [5.9, 4.1, 8.8, 6.5, 6.1, 7.4, 8.5, 10.3, 10.5, 14.5]
    },
    exceedance: {
      'Mexican American':               [5.4, 5.0, 5.6, 4.4, 5.2, 6.1, 6.2, 8.3, 10.0, 10.7],
      'Other Hispanic':                 [6.6, 4.6, 4.8, 5.9, 5.6, 6.4, 8.8, 9.5, 10.5, 12.5],
      'Non-Hispanic White':             [7.4, 6.6, 6.3, 6.7, 6.5, 7.8, 10.6, 11.2, 13.2, 13.9],
      'Non-Hispanic Black':             [5.8, 6.7, 6.9, 5.1, 6.4, 7.4, 9.0, 11.3, 12.1, 14.4],
      'Other Race (incl. Multiracial)': [6.2, 8.2, 4.6, 4.4, 4.8, 6.7, 8.0, 8.7, 10.4, 12.9]
    }
  },
  ingredient: {
    overlap: {
      'Vitamin D':  [11.7, 12.7, 14.0, 16.7, 18.5, 21.5, 21.4, 22.5, 24.1, 31.3],
      'Iron':       [5.6, 5.0, 6.7, 6.9, 4.5, 5.5, 4.1, 9.1, 5.6, 10.7],
      'Magnesium':  [10.2, 9.1, 9.6, 11.5, 8.8, 11.3, 11.7, 14.8, 15.1, 17.7],
      'Niacin':     [7.1, 8.1, 8.3, 7.5, 5.2, 7.9, 7.8, 8.2, 9.4, 9.6],
      'Zinc':       [9.5, 8.8, 7.7, 8.0, 5.6, 6.7, 6.7, 9.0, 9.2, 15.5],
      'Vitamin A':  [5.4, 5.9, 6.6, 5.1, 4.4, 5.6, 5.3, 8.5, 6.7, 5.8]
    },
    exceedance: {
      'Vitamin D':  [0.0, 0.0, 0.1, 0.7, 3.0, 6.8, 13.0, 16.0, 18.5, 27.5],
      'Iron':       [7.2, 6.5, 4.7, 7.2, 8.9, 8.3, 11.6, 14.1, 18.4, 17.1],
      'Magnesium':  [6.2, 5.8, 4.7, 5.4, 4.1, 5.0, 8.0, 11.7, 13.6, 13.9],
      'Niacin':     [20.1, 18.6, 19.1, 16.8, 15.3, 18.3, 19.3, 16.4, 16.8, 11.7],
      'Zinc':       [3.1, 3.4, 3.3, 3.7, 3.2, 3.6, 3.5, 3.3, 4.1, 9.4],
      'Vitamin A':  [6.2, 4.9, 5.3, 4.2, 3.1, 3.7, 4.1, 3.0, 3.7, 1.9]
    }
  }
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'recognition-lag',
    catalogNo: 'No. 01 / CAPSTONE STUDY',
    title: 'The Recognition Lag',
    subtitle: 'Who Gets Recognized, and When?',
    status: 'Complete',
    description:
      "A data study of MoMA's acquisition patterns across 160,699 cataloged artworks and 15,932 artists. This capstone investigation explores \"acquisition lag\" (the time elapsed between artwork creation and collection entry), testing gender (H1), geography (H2), artistic movements (H3), and collection pace predictability (H4) against rigorous statistical significance (Mann-Whitney U, Pearson correlation, and log-linear regression).",
    tags: ['BigQuery', 'dbt', 'Python', 'Wikidata SPARQL', 'Statistical Testing', 'Log-Linear Regression'],
    links: [
      { 
        label: 'Methodology Report (PDF)', 
        url: '/MoMA_Capstone_Report_EN.pdf', 
        type: 'report', 
        format: 'PDF',
        description: 'Complete capstone report with methodology, formulas, hypothesis tests & robustness checks',
        isPlaceholder: false 
      },
      { 
        label: 'Presentation Slides (PDF)', 
        url: '/MoMA_Capstone_Presentation_EN.pdf', 
        type: 'presentation', 
        format: 'PDF',
        description: 'English presentation slide deck detailing the research questions, findings & models',
        isPlaceholder: false 
      },
      { 
        label: 'View Dashboard (Looker Studio)', 
        url: 'https://datastudio.google.com/reporting/a1599e07-6755-49e3-8e67-4b60500d3114', 
        type: 'dashboard', 
        format: 'WEB',
        description: 'Interactive Google Looker Studio dashboard with public viewer access',
        isPlaceholder: false 
      },
      { 
        label: 'Watch Video Summary (AI-narrated, NotebookLM)', 
        url: 'https://drive.google.com/file/d/1ajOTI4usEU5237Vu3-4RtvExgalb5sj_/view?usp=share_link', 
        type: 'video', 
        format: 'VIDEO',
        description: 'AI-narrated video summary generated by Google NotebookLM from source research documents',
        isPlaceholder: false 
      },
      { 
        label: 'View Code (GitHub)', 
        url: 'https://github.com/didemmrsln/moma_capstone', 
        type: 'github', 
        format: 'CODE',
        description: 'SQL staging models, layered dbt transformation models, and Python statistical notebooks',
        isPlaceholder: false 
      },
    ],
    layoutSpan: 'hero-gallery',
    visualType: 'moma-topology',
    interactiveAvailable: true,
    keyFindings: [
      {
        label: 'Collection Scope',
        value: '160,699',
        subtext: 'Cataloged artworks & 15,932 artists analyzed',
      },
      {
        label: 'Acquisition Lag',
        value: '21 Years',
        subtext: 'Overall median delay from creation to accession',
      },
      {
        label: 'Gender Lag Gap',
        value: 'Closed (p=0.418)',
        subtext: 'Eliminated by 1990–2010 (count parity ~2097)',
      },
      {
        label: 'Lost Potential Model',
        value: 'R² = 0.705',
        subtext: 'Log-linear regression on 8-year early career',
      },
    ],
  },
  {
    id: 'dose-of-reality',
    catalogNo: 'No. 02 / CAPSTONE STUDY',
    title: 'Dose of Reality',
    subtitle: 'Overlap Deceives, Exceedance Is Real',
    status: 'Complete',
    description:
      "A population-level data study of U.S. dietary supplement use, testing whether taking multiple supplements at once causes nutrient overlap that pushes total intake past official Tolerable Upper Intake Levels (UL). Built on 24 years of CDC NHANES data (1999–2023, 10 survey cycles, 46,388 person-cycle observations) across six commonly-overlapping nutrients, testing gender (H1), age group (H2), ethnicity (H3), and pandemic-era deviation (H4) against design-based statistical significance (svy: t-tests, Kruskal-Wallis rank tests, one-sample proportion tests).",
    tags: ['NHANES', 'BigQuery', 'dbt', 'Python', 'Design-Based Statistics (svy)', 'Public Health Data'],
    links: [
      {
        label: 'Methodology Report (PDF)',
        url: '/Dose_of_Reality_Report_EN.pdf',
        type: 'report',
        format: 'PDF',
        description: 'Complete capstone report with methodology, weighting rules, hypothesis tests & limitations',
        isPlaceholder: false
      },
      {
        label: 'Presentation Slides (PDF)',
        url: '/Dose_of_Reality_Presentation_EN.pdf',
        type: 'presentation',
        format: 'PDF',
        description: 'Slide deck covering research question, hypotheses, and key findings',
        isPlaceholder: false
      },
      {
        label: 'View Dashboard (Looker Studio) — Coming Soon',
        url: '#',
        type: 'dashboard',
        format: 'WEB',
        description: 'Interactive Looker Studio dashboard (link to be added once published)',
        isPlaceholder: true
      },
      {
        label: 'Watch Video Summary (AI-narrated, NotebookLM)',
        url: 'https://drive.google.com/file/d/1Q9-42b-Aue8TZS1yXjlc7bWH6I7K32kV/view?usp=share_link',
        type: 'video',
        format: 'VIDEO',
        description: 'AI-narrated video summary generated by Google NotebookLM from source research documents',
        isPlaceholder: false
      },
      {
        label: 'View Code (GitHub)',
        url: 'https://github.com/didemmrsln/dose-of-reality',
        type: 'github',
        format: 'CODE',
        description: 'BigQuery/dbt ELT pipeline and Python svy statistical notebooks',
        isPlaceholder: false
      },
    ],
    layoutSpan: 'hero-gallery',
    visualType: 'dose-reality',
    interactiveAvailable: true,
    keyFindings: [
      {
        label: 'Study Scope',
        value: '46,388',
        subtext: 'Person-cycle observations across 10 NHANES cycles (1999–2023)',
      },
      {
        label: 'Usage vs. Overlap',
        value: '34.3%',
        subtext: '2021–2023 usage rate — down from 57.7% in 2017–2020, even as overlap kept rising',
      },
      {
        label: 'Exceedance Source',
        value: '64.2%',
        subtext: 'of UL exceedance traced to product overlap, not single-product dosage (p<0.0001)',
      },
      {
        label: 'Strongest Factor',
        value: 'Age Group',
        subtext: 'F=584.79, p<0.0001 — stronger predictor than gender or ethnicity',
      },
    ],
  },
  {
    id: 'reading-the-green-line',
    catalogNo: 'No. 03 / IN PROGRESS',
    title: 'Reading the Green Line',
    subtitle: 'Tracking Climate Pledges vs. Empirical Trajectories',
    status: 'In Progress',
    description:
      'Tracking national and EU sustainability pledges against actual emissions progress, projecting whether 2030 net-zero targets will be met on current industrial trajectories.',
    tags: ['Python', 'BigQuery', 'Predictive Modeling', 'Climate Analytics'],
    links: [
      { label: 'Methodology Framework', url: '#', type: 'report', format: 'PDF', isPlaceholder: true },
    ],
    layoutSpan: 'wide-landscape',
    visualType: 'green-line',
    interactiveAvailable: false,
  },
  {
    id: 'brick-by-brick',
    catalogNo: 'No. 04 / IN PROGRESS',
    title: 'Brick by Brick',
    subtitle: 'LEGO Set Complexity, Color & Commercial Lifespan',
    status: 'In Progress',
    description: 'A data investigation into how LEGO set complexity, color palettes, and commercial lifespan have evolved over time — and how these factors predict pricing and set success. Built on the Rebrickable dataset, enriched with Google Trends demand signals and secondary-market price data (BrickEconomy / BrickLink) for retired sets.',
    tags: ['Python', 'Regression', 'Google Trends API', 'Rebrickable'],
    links: [
      { label: 'Research Scope & Hypotheses', url: '#', type: 'report', format: 'PDF', isPlaceholder: true },
    ],
    layoutSpan: 'salon-portrait',
    visualType: 'abstract-topology',
    interactiveAvailable: false,
  },
  {
    id: 'multiverses-character-survival-analysis',
    catalogNo: 'No. 05 / IN PROGRESS',
    title: 'Multiverses',
    subtitle: 'Character Survival Analysis Across Five Fictional Universes',
    status: 'In Progress',
    description: 'A survival-analysis study of character longevity across Game of Thrones, The Lord of the Rings, Marvel, Harry Potter, and Star Wars — applying Kaplan-Meier estimation and Cox regression within a shared methodology, universe by universe, with a final cross-universe comparison.',
    tags: ['Python', 'Kaplan-Meier', 'Cox Regression', 'Survival Analysis'],
    links: [
      { label: 'Research Scope & Hypotheses', url: '#', type: 'report', format: 'PDF', isPlaceholder: true },
    ],
    layoutSpan: 'wide-landscape',
    visualType: 'abstract-topology',
    interactiveAvailable: false,
  },
];

// Backward compatibility alias for any component referencing PROJECTS
export const PROJECTS = FEATURED_PROJECTS;

export const BOOTCAMP_PROJECTS: BootcampCategory[] = [
  {
    id: 'machine-learning',
    categoryNumber: 'TRACK // 01',
    categoryTitle: 'Machine Learning',
    tags: ['Python', 'Scikit-learn', 'PyCaret'],
    description: 'Supervised and unsupervised learning exercises covering classification, regression, and clustering on real-world datasets.',
    completedProjects: [
      'First Regression Experiment',
      'First Classification Experiment',
      'Instagram Like Prediction',
      'Complex Linear Regression',
      'Troll User Detection',
      'Greenweez Customer Clustering',
      'Spotify Data Clustering',
    ],
    featuredProjects: [
      {
        title: 'Troll User Detection — Automated Classification Pipeline',
        description: 'An end-to-end PyCaret workflow — comparing multiple model families with compare_models, selecting Logistic Regression as the top performer, refining it with tune_model, and evaluating results with plot_model.',
      },
      {
        title: 'Spotify Listener Segmentation — Comparative Clustering',
        description: 'A comparison of centroid-based (KMeans) and density-based (DBSCAN) clustering to identify listener segments in Spotify data.',
      },
    ],
  },
  {
    id: 'statistical-analysis',
    categoryNumber: 'TRACK // 02',
    categoryTitle: 'Statistical Analysis',
    tags: ['Python', 'Pandas', 'SciPy'],
    description: 'Data wrangling, exploratory analysis, and hypothesis testing across structured business datasets.',
    completedProjects: [
      'Data Structures',
      'Travel Agency Project',
      'Load & Save Different Formats',
      'Querying Databases',
      '1 - Shapr Marketing Analysis',
      '2 - Sumup Order Analysis',
      'Visualization with Plotly',
      'Financial Data Analysis',
      'Olist Data Analysis Project',
    ],
    featuredProjects: [
      {
        title: 'Statistical Hypothesis Testing on E-Commerce Behavior (Olist)',
        description: 'Four hypothesis tests across product, payment, and seller axes on the Olist Brazilian e-commerce dataset — Pearson correlation and one-way ANOVA. Delivery time showed the strongest relationship with customer satisfaction (r=–0.30, p<0.001); payment method showed statistical but not practical significance, illustrating the distinction between the two.',
        methods: ['Python', 'Pandas', 'SciPy', 'Pearson Correlation', 'One-Way ANOVA'],
        links: [
          {
            label: 'Presentation Slides (PDF)',
            url: '/Olist_Analysis_EN.pdf',
            type: 'presentation',
            format: 'PDF',
            description: 'Slide deck covering methodology, hypothesis tests, and key findings from the Olist analysis',
            isPlaceholder: false,
          },
          {
            label: 'View Code (GitHub)',
            url: 'https://github.com/didemmrsln/bootcamp-projects/tree/main/statistical-analysis',
            type: 'repo',
            format: 'CODE',
            description: 'Notebook and presentation source files',
            isPlaceholder: false,
          },
        ],
      },
    ],
  },
  {
    id: 'data-engineering',
    categoryNumber: 'TRACK // 03',
    categoryTitle: 'Data Engineering & Pipelines',
    tags: ['dbt', 'BigQuery', 'Fivetran', 'REST APIs'],
    description: 'Building automated data pipelines and layered warehouse architectures — from raw ingestion to analysis-ready models.',
    completedProjects: [
      'Greenweez Finance – Data Lineage & Orchestration',
      'BigQuery: Query Cost Analysis & Optimization',
      'dbt Setup',
      'Connecting BigQuery Sources with dbt',
      'Building Staging Models with dbt',
      'Intermediate Models with dbt',
      'Building Mart Models',
      'dbt Cloud: Production Job Scheduling',
      'Ad Campaign Analysis with dbt',
      'Intro to Stock Market APIs',
      'News API: GET Requests, Query Parameters & Authentication',
      'Mapbox Geocoding & API Integration',
      'Fivetran: Google Sheets to BigQuery Integration',
      'Fivetran: Schema Management & Synchronization',
    ],
    featuredProjects: [
      {
        title: 'Layered dbt Pipeline on E-Commerce Data (Olist)',
        description: 'A staging → intermediate → mart dbt architecture built on the Olist e-commerce dataset, connected to BigQuery — covering model materialization strategy and scheduled production jobs.',
      },
      {
        title: 'Automated ELT Pipeline: Google Sheets to BigQuery',
        description: 'An automated data pipeline using Fivetran to sync data from Google Sheets into BigQuery, including schema management and sync scheduling.',
      },
      {
        title: 'Geocoding & REST API Integration',
        description: 'Working with REST APIs and the Mapbox geocoding service — sending requests, handling authentication and query parameters, and parsing geographic data.',
      },
    ],
  },
  {
    id: 'bi-visualization',
    categoryNumber: 'TRACK // 04',
    categoryTitle: 'BI & Visualization',
    tags: ['Power BI', 'DAX', 'Looker Studio'],
    description: 'Building interactive dashboards and data models for business intelligence reporting.',
    completedProjects: [
      'Power BI Setup & Virtual Machine Access',
      'Data Cleaning & Merging with Power BI',
      'Power BI: Cleaning & Visualizing Website Rankings',
      'Power BI: Tallest Buildings — Data Cleaning & Visualization',
      'Regional Population Visualization with Donut Chart in Power BI',
      'DAX: Core Functions & Best Practices',
      'Power BI: Movie Data Modeling & Visualization with DAX',
      'Power BI Sales Analysis with DAX Time Intelligence',
      'Returns & Sales Analysis with Looker Studio',
      'TechShop Analysis with Drill-down & Breakdown (Looker Studio)',
    ],
    featuredProjects: [
      {
        title: '1 - Power BI ile E-ticaret Veri Analizi ve İçgörü Çıkarma',
        description: 'An advanced Power BI project combining data modeling, DAX measures, and interactive dashboards to extract e-commerce business insights.',
      },
    ],
  },
  {
    id: 'automation-git',
    categoryNumber: 'TRACK // 05',
    categoryTitle: 'Automation & Version Control',
    tags: ['Git', 'GitHub', 'Zapier'],
    description: 'No-code automation workflows and collaborative version control practices.',
    completedProjects: [
      'Getting Started with Git: VS Code & GitHub Desktop Setup',
      'Git Fundamentals: VS Code, BigQuery SQL & First Commit',
      'Creating Your First Pull Request',
      'Working with Branches',
      'No-Code Automation & Advanced Workflows with Zapier',
    ],
    featuredProjects: [
      {
        title: 'Feature Branch Workflow: Creation & Remote Push',
        description: 'A standard collaborative Git workflow in VS Code — creating a feature branch, committing changes, and pushing to a remote repository ahead of a pull request.',
      },
      {
        title: 'No-Code Delivery Tracking Automation (Zapier)',
        description: 'A no-code automation workflow built in Zapier to track delivery status and trigger downstream actions without custom backend code.',
      },
    ],
  },
];

