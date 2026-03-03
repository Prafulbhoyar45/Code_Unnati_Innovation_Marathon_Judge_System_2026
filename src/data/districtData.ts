export interface SchoolPerformance {
  id: string;
  name: string;
  totalTeams: number;
  averageScore: number;
  highestScore: number;
  status: 'Excellent' | 'Good' | 'Developing';
}

export interface TopProject {
  id: string;
  title: string;
  schoolName: string;
  score: number;
  rank: number;
}

export interface ScoreDistribution {
  category: string;
  averageScore: number;
}

export const districtStats = {
  totalSchools: 45,
  totalTeams: 135,
  averageInnovationScore: 8.4,
  topPerformingSchool: 'Govt. Model High School, Sector 10'
};

export const schoolPerformances: SchoolPerformance[] = [
  { id: 'S1', name: 'Govt. Model High School, Sector 10', totalTeams: 5, averageScore: 36.5, highestScore: 39, status: 'Excellent' },
  { id: 'S2', name: 'District Public School, Central', totalTeams: 4, averageScore: 34.2, highestScore: 37, status: 'Excellent' },
  { id: 'S3', name: 'Rural Innovation Academy', totalTeams: 6, averageScore: 29.8, highestScore: 35, status: 'Good' },
  { id: 'S4', name: 'City Girls Senior Secondary', totalTeams: 3, averageScore: 31.5, highestScore: 34, status: 'Good' },
  { id: 'S5', name: 'Suburban Tech High', totalTeams: 4, averageScore: 24.5, highestScore: 28, status: 'Developing' },
];

export const topProjects: TopProject[] = [
  { id: 'P1', title: 'Smart Water Monitoring System', schoolName: 'Govt. Model High School, Sector 10', score: 39, rank: 1 },
  { id: 'P2', title: 'AI Crop Disease Detector', schoolName: 'Rural Innovation Academy', score: 38, rank: 2 },
  { id: 'P3', title: 'Solar-Powered Smart Classroom', schoolName: 'District Public School, Central', score: 37, rank: 3 },
  { id: 'P4', title: 'Waste Segregation Automation', schoolName: 'City Girls Senior Secondary', score: 36, rank: 4 },
  { id: 'P5', title: 'Women Safety Alert App', schoolName: 'Govt. Model High School, Sector 10', score: 35, rank: 5 },
];

export const scoreDistributions: ScoreDistribution[] = [
  { category: 'Innovation & Originality', averageScore: 8.4 },
  { category: 'Technical Feasibility', averageScore: 7.6 },
  { category: 'Social/Business Impact', averageScore: 8.9 },
  { category: 'Presentation & UX', averageScore: 7.2 },
];
