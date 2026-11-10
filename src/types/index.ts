export type TabType = 
  | 'home' 
  | 'trail'
  | 'alphabet' 
  | 'daily-signs' 
  | 'memory-game' 
  | 'achievements' 
  | 'credits-curiosities';

export interface UserStats {
  stars: number;
  streakDays: number;
  xp: number;
  level: number;
  levelTitle: string;
  todayCompleted: boolean;
  soundEnabled: boolean;
  highContrast: boolean;
  darkMode: boolean;
  fontSize: 'normal' | 'large';
  weeklyTrainedDates?: string[]; // Array de strings 'YYYY-MM-DD' dos treinos concluídos
}

export interface TrailStageLetter {
  letter: string;
  name: string;
  signImagePath: string;
  tip?: string;
}

export interface TrailStageQuestionOption {
  id: string;
  signImagePath: string;
  isCorrect: boolean;
}

export interface TrailStageQuestion {
  id: string;
  targetLetter: string;
  prompt: string;
  options: TrailStageQuestionOption[];
  hint?: string;
}

export interface TrailAlphabetStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  lettersSummary: string;
  letters: TrailStageLetter[];
  questions: TrailStageQuestion[];
  rewardStars: number;
  rewardXp: number;
}

export interface AlphabetLetter {
  letter: string;
  name: string;
  handShapeDescription: string;
  movementDescription: string;
  exampleWord: string;
  category: 'A-G' | 'H-N' | 'O-U' | 'V-Z';
  mastered: boolean;
  photoUrl?: string;
  videoUrl?: string;
  videoEmbedId?: string;
  orientation?: string;
  activeFingers?: string;
}

export interface SignItem {
  id: string;
  title: string;
  category: 'cumprimentos' | 'familia' | 'escola' | 'emocoes' | 'cores';
  categoryLabel: string;
  description: string;
  handConfig: string;
  location: string;
  movement: string;
  facialExpression: string;
  difficulty: 'fácil' | 'médio' | 'avançado';
  mastered?: boolean;
  photoUrl?: string;
  videoUrl?: string;
  videoEmbedId?: string;
  videoAuthor?: string;
  steps?: string[];
}

export interface MemoryCard {
  id: string;
  signId: string;
  type: 'word' | 'sign';
  label: string;
  sublabel?: string;
  iconName?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rewardStars: number;
  progress?: { current: number; total: number };
}

export interface TrailNode {
  id: string;
  title: string;
  subtitle?: string;
  type: 'completed' | 'current' | 'locked' | 'chest' | 'trophy';
  stars?: number;
  xp?: number;
  statusText?: string;
}
