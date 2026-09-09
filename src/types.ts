export type ProjectStatus = 'Complete' | 'In Progress';

export type DeliverableType = 'report' | 'presentation' | 'video' | 'dashboard' | 'github' | 'dataset' | 'placeholder';

export interface ProjectLink {
  label: string;
  url: string;
  type?: DeliverableType;
  format?: 'PDF' | 'PPTX' | 'DOCX' | 'VIDEO' | 'AUDIO' | 'CODE' | 'WEB';
  description?: string;
  isPlaceholder?: boolean;
}

export interface FeaturedProject {
  id: string;
  catalogNo: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  description: string;
  tags: string[];
  links: ProjectLink[];
  layoutSpan: 'hero-gallery' | 'salon-portrait' | 'wide-landscape' | 'curated-square';
  visualType: 'moma-topology' | 'green-line' | 'dose-reality' | 'abstract-topology';
  interactiveAvailable?: boolean;
  videoUrl?: string;
  presentationUrl?: string;
  reportUrl?: string;
  keyFindings?: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

// Backward compatibility alias
export type Project = FeaturedProject;

export interface BootcampProjectLink {
  label: string;
  url: string;
  type?: string;
  format?: string;
  description?: string;
  isPlaceholder?: boolean;
}

export interface BootcampFeaturedProject {
  title: string;
  description: string;
  methods?: string[];
  tags?: string[];
  links?: BootcampProjectLink[];
}

export interface BootcampCategory {
  id: string;
  categoryNumber: string;
  categoryTitle: string;
  tags: string[];
  description: string;
  completedProjects: string[];
  featuredProjects: BootcampFeaturedProject[];
}

// Backward compatibility alias
export type BootcampProject = BootcampCategory;

export interface MoMAEraData {
  era: string;
  period: string;
  totalWorks: number;
  femaleLag: number;
  maleLag: number;
  nonWesternLag: number;
  westernLag: number;
  lagGapClosed: boolean;
  pValueText: string;
  notableInsight: string;
}

export interface MovementDeviation {
  name: string;
  deviationYears: number; // negative = fast-tracked, positive = caught up later
  category: 'fast-tracked' | 'overlooked-catchup';
}

export interface LostPotentialArtist {
  name: string;
  lostPotential: number;
  lifespan?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  organization?: string;
}


