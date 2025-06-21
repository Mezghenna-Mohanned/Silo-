export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  hints: { [key: number]: number };
  startTime: number;
  totalScore: number;
}

export interface Level {
  id: number;
  title: string;
  theme: string;
  cipher: string;
  description: string;
  solution: string;
  hints: string[];
  maxScore: number;
}

export interface CipherChallenge {
  encoded: string;
  solution: string;
  key?: string | number;
  additionalData?: any;
}