
export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  type: 'VIDEO' | 'QUIZ' | 'READING';
  isLocked?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  modules: Module[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PerformanceRecord {
  subjectId: string;
  subjectName: string;
  topic: string;
  score: number;
  total: number;
  timestamp: number;
  type: 'PRACTICE' | 'TRYOUT';
}

export interface PerformanceAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  actionPlan: string;
}

export interface Recommendation {
  title: string;
  description: string;
  actionLabel: string;
  type: 'LESSON' | 'PRACTICE';
  reason: string;
  targetTopic: string;
}

export enum AppState {
  DASHBOARD = 'DASHBOARD',
  COURSE_DETAIL = 'COURSE_DETAIL',
  LESSON_VIDEO = 'LESSON_VIDEO',
  PRACTICE = 'PRACTICE',
  TRYOUT = 'TRYOUT',
  RESULTS = 'RESULTS'
}
