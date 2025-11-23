export enum Page {
  HOME = 'HOME',
  PRE_TEST = 'PRE_TEST',
  CONTENT = 'CONTENT',
  POST_TEST = 'POST_TEST',
  EVALUATION = 'EVALUATION',
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswerId: string;
}

export interface UserProfile {
  age: string;
  education: string;
  experience: string;
  deliveryMethod: string;
}

export interface LikertQuestion {
  id: number;
  text: string;
}

export interface EvaluationData {
  ratings: Record<number, number>; // questionId -> rating (1-5)
  impression: string;
  suggestion: string;
}