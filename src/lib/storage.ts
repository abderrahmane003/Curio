import { UserProfile, SM2Card, DomainId, QuestionReport } from '../types';
import { DOMAINS } from '../data/domains';

const STORAGE_KEY = 'erudit_user_profile_v1';
const REPORTS_KEY = 'erudit_reports_v1';

export function getDefaultProfile(): UserProfile {
  const initialDomainProgress: Record<DomainId, { answered: number; correct: number; level: number }> = {} as any;
  DOMAINS.forEach(d => {
    initialDomainProgress[d.id] = { answered: 0, correct: 0, level: 1 };
  });

  return {
    uid: 'guest-' + Math.random().toString(36).substring(2, 9),
    displayName: 'Érudit Anonyme',
    title: 'Curieux Passionné',
    avatar: '🦉',
    xp: 0,
    level: 1,
    streakDays: 1,
    lastPlayedDate: null,
    preferredDomains: ['histoire_civilisations', 'sciences_univers', 'inventions_technologies'],
    starterLevel: 'erudit',
    dailyGoalMinutes: 5,
    isOnboarded: false,
    soundEnabled: true,
    hapticEnabled: true,
    theme: 'dark',
    answeredCount: 0,
    correctCount: 0,
    domainProgress: initialDomainProgress,
    sm2Cards: {},
    dailyCompletedDate: null
  };
}

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProfile();
    const parsed = JSON.parse(raw);
    return { ...getDefaultProfile(), ...parsed };
  } catch {
    return getDefaultProfile();
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    // Notifier les composants d'un changement
    window.dispatchEvent(new Event('erudit_profile_updated'));
  } catch (err) {
    console.error('Erreur sauvegarde profil:', err);
  }
}

/**
 * Met à jour le profil après une réponse de quiz
 */
export function recordAnswer(
  profile: UserProfile,
  domainId: DomainId,
  isCorrect: boolean,
  xpGain: number
): UserProfile {
  const updated = { ...profile };
  
  updated.answeredCount += 1;
  if (isCorrect) {
    updated.correctCount += 1;
    updated.xp += xpGain;
  }

  // Calcul du niveau (ex: niveau 2 à 100 XP, 3 à 250 XP...)
  const newLevel = Math.max(1, Math.floor(Math.sqrt(updated.xp / 25)) + 1);
  updated.level = newLevel;

  // Calcul du titre honorifique
  if (updated.level >= 15) {
    updated.title = 'Encyclopédiste Suprême';
  } else if (updated.level >= 8) {
    updated.title = 'Maître Érudit';
  } else if (updated.level >= 4) {
    updated.title = 'Érudit Confirmé';
  } else {
    updated.title = 'Curieux Passionné';
  }

  // Progression par domaine
  const currentDomain = updated.domainProgress[domainId] || { answered: 0, correct: 0, level: 1 };
  const domainAnswered = currentDomain.answered + 1;
  const domainCorrect = currentDomain.correct + (isCorrect ? 1 : 0);
  const domainLevel = Math.max(1, Math.floor(domainCorrect / 5) + 1);

  updated.domainProgress[domainId] = {
    answered: domainAnswered,
    correct: domainCorrect,
    level: domainLevel
  };

  // Streak de connexion quotidienne
  const today = new Date().toISOString().split('T')[0];
  if (updated.lastPlayedDate !== today) {
    if (updated.lastPlayedDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      if (updated.lastPlayedDate === yesterdayStr) {
        updated.streakDays += 1;
      } else {
        // Série rompue
        updated.streakDays = 1;
      }
    } else {
      updated.streakDays = 1;
    }
    updated.lastPlayedDate = today;
  }

  saveProfile(updated);
  return updated;
}

/**
 * Enregistrement d'une carte SM-2
 */
export function saveSM2Card(card: SM2Card): void {
  const profile = loadProfile();
  profile.sm2Cards[card.questionId] = card;
  saveProfile(profile);
}

/**
 * Signalement d'une erreur sur une question
 */
export function saveQuestionReport(report: Omit<QuestionReport, 'id' | 'timestamp'>): void {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    const reports: QuestionReport[] = raw ? JSON.parse(raw) : [];
    const newReport: QuestionReport = {
      ...report,
      id: 'rep-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    reports.push(newReport);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error('Erreur sauvegarde signalement:', err);
  }
}
