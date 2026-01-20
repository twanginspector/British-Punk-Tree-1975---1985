
export type NodeType = 'band' | 'person';

export interface PunkNode {
  id: string;
  name: string;
  type: NodeType;
  description?: string;
  activeYears?: string;
  websiteUrl?: string;
  imageUrl?: string;
  links?: PunkLink[];
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface PunkLink {
  source: string;
  target: string;
  role?: string;
}

export interface PunkData {
  nodes: PunkNode[];
  links: PunkLink[];
}

export interface AnalysisResult {
  text: string;
  type: 'image' | 'video' | 'audio';
}
