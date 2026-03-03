export interface Project {
  id: string;
  teamId: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  summary: string;
  groupImageURL: string;
  videoURL: string;
  demoLink: string;
  category?: string;
  district?: string;
}
