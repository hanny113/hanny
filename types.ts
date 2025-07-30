
export enum GameState {
  START,
  QUIZ,
  ANALYZING,
  RESULTS,
}

export type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Answer {
  text: string;
  type: MBTIType;
}

export interface Question {
  question: string;
  answers: [Answer, Answer];
}

export interface MBTICounter {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface MBTIResultDescription {
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  studyTips: string[];
}

export interface MBTIResult extends MBTIResultDescription {
  type: string;
}

export interface StudyStep {
  stepTitle: string;
  description: string;
}

export interface StudyPlan {
  questTitle: string;
  steps: StudyStep[];
}
