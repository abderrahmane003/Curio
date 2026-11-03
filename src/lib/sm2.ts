import { SM2Card, DomainId } from '../types';

/**
 * Implémentation certifiée de l'algorithme de répétition espacée SuperMemo SM-2.
 * Utilisé universellement dans l'application pour consolider la mémoire à long terme.
 */
export function calculateSM2(
  card: Partial<SM2Card> & { questionId: string; domainId: DomainId },
  quality: number // 0 à 5
): SM2Card {
  // Bornage de la qualité
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let repetitions = card.repetitions ?? 0;
  let interval = card.interval ?? 0;
  let easeFactor = card.easeFactor ?? 2.5;

  // Calcul du nouveau Facteur de Facilité (Ease Factor)
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calcul du nouvel intervalle et des répétitions
  if (q < 3) {
    // Échec de rappel : la question recommence le cycle
    repetitions = 0;
    interval = 1;
  } else {
    // Succès de rappel
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Date de prochaine révision
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    questionId: card.questionId,
    domainId: card.domainId,
    repetitions,
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate: nextDate.toISOString(),
    lastReviewedDate: new Date().toISOString(),
    lastQuality: q
  };
}

/**
 * Vérifie si une fiche est mûre pour être révisée aujourd'hui
 */
export function isDueForReview(card: SM2Card): boolean {
  if (!card.nextReviewDate) return true;
  const now = new Date();
  const reviewDate = new Date(card.nextReviewDate);
  // Retourne vrai si la date est dépassée ou aujourd'hui
  return reviewDate.getTime() <= now.getTime();
}
