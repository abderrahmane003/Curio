export type DomainId =
  | 'histoire_civilisations'
  | 'geographie_peuples'
  | 'sciences_univers'
  | 'arts_architecture'
  | 'litterature_philosophie'
  | 'musique_spectacle'
  | 'cinema_series'
  | 'inventions_technologies'
  | 'nature_vivant'
  | 'sports_exploits'
  | 'gastronomie_terroirs'
  | 'langues_mythologies';

export interface DomainInfo {
  id: DomainId;
  label: string;
  icon: string;
  description: string;
  colorName: string;
}

export type StarterLevel = 'curieux' | 'erudit' | 'encyclopediste';
export type DailyGoal = 3 | 5 | 10;

export interface Question {
  id: string;
  domainId: DomainId;
  domainLabel: string;
  difficulty: 1 | 2 | 3;
  questionText: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string; // "Le saviez-vous ?"
  source: string;      // Référence bibliographique / historique
  tags: string[];
}

export interface SM2Card {
  questionId: string;
  domainId: DomainId;
  repetitions: number;
  interval: number; // en jours
  easeFactor: number; // minimum 1.3
  nextReviewDate: string; // ISO string
  lastReviewedDate?: string;
  lastQuality?: number; // 0-5
}

export interface UserProfile {
  uid: string;
  displayName: string;
  title: string; // Ex: 'Curieux Passionné', 'Érudit', 'Encyclopédiste'
  avatar: string;
  xp: number;
  level: number;
  streakDays: number;
  lastPlayedDate: string | null;
  preferredDomains: DomainId[];
  starterLevel: StarterLevel;
  dailyGoalMinutes: DailyGoal;
  isOnboarded: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  theme: 'dark' | 'light';
  answeredCount: number;
  correctCount: number;
  domainProgress: Record<DomainId, { answered: number; correct: number; level: number }>;
  sm2Cards: Record<string, SM2Card>;
  dailyCompletedDate: string | null;
}

export type TabKey = 'decouvrir' | 'jouer' | 'domaines' | 'ligues' | 'profil';

export type GameMode = 'daily' | 'speed' | 'survival' | 'domain' | 'leitner' | 'flash' | 'infinite';

export interface LeagueMember {
  uid: string;
  displayName: string;
  title: string;
  avatar: string;
  xp: number;
  streak: number;
  isUser?: boolean;
}

export interface QuestionReport {
  id: string;
  questionId: string;
  questionText: string;
  reason: 'inaccuracy' | 'typo' | 'disputed_source' | 'other';
  comment?: string;
  timestamp: string;
  userId: string;
}
