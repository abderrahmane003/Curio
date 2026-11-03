import React, { useState } from 'react';
import { Check, Sparkles, Target, BookOpen } from 'lucide-react';
import { DomainId, StarterLevel, DailyGoal, UserProfile } from '../../types';
import { DOMAINS } from '../../data/domains';
import { sound } from '../../lib/audio';

interface OnboardingModalProps {
  onComplete: (preferences: {
    preferredDomains: DomainId[];
    starterLevel: StarterLevel;
    dailyGoalMinutes: DailyGoal;
  }) => void;
  initialProfile?: UserProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, initialProfile }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDomains, setSelectedDomains] = useState<DomainId[]>(
    initialProfile?.preferredDomains || ['histoire_civilisations', 'sciences_univers', 'inventions_technologies']
  );
  const [starterLevel, setStarterLevel] = useState<StarterLevel>(
    initialProfile?.starterLevel || 'erudit'
  );
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>(
    initialProfile?.dailyGoalMinutes || 5
  );

  const toggleDomain = (id: DomainId) => {
    sound.playTap();
    if (selectedDomains.includes(id)) {
      if (selectedDomains.length > 1) {
        setSelectedDomains(selectedDomains.filter(d => d !== id));
      }
    } else {
      setSelectedDomains([...selectedDomains, id]);
    }
  };

  const handleNext = () => {
    sound.playTap();
    if (step === 1) {
      if (selectedDomains.length >= 3) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      sound.playStreak();
      onComplete({
        preferredDomains: selectedDomains,
        starterLevel,
        dailyGoalMinutes: dailyGoal
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col my-auto transition-colors">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Étape {step} sur 3
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(s => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-6 bg-blue-600 dark:bg-blue-500'
                    : s < step
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Choisir au moins 3 domaines */}
        {step === 1 && (
          <div className="flex flex-col animate-fadeIn">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Vos domaines de prédilection
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Choisissez au moins 3 domaines pour personnaliser vos premiers quiz.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1 py-1">
              {DOMAINS.map(domain => {
                const isSelected = selectedDomains.includes(domain.id);
                return (
                  <button
                    key={domain.id}
                    onClick={() => toggleDomain(domain.id)}
                    className={`min-h-[52px] p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-[#090D16] border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{domain.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold leading-tight truncate">
                        {domain.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {domain.description}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 self-center" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{selectedDomains.length} / 12 sélectionnés</span>
              {selectedDomains.length < 3 && (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  Encore {3 - selectedDomains.length} nécessaire(s)
                </span>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Niveau de départ */}
        {step === 2 && (
          <div className="flex flex-col animate-fadeIn">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Votre niveau de culture
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                L’application adaptera la difficulté et la profondeur des questions.
              </p>
            </div>

            <div className="flex flex-col gap-3 my-2">
              {[
                {
                  id: 'curieux' as StarterLevel,
                  title: 'Curieux Passionné',
                  badge: 'Accessible & Vivant',
                  desc: 'Questions stimulantes, anecdotes surprenantes et apprentissage décontracté.'
                },
                {
                  id: 'erudit' as StarterLevel,
                  title: 'Érudit Confirmé (Recommandé)',
                  badge: 'Équilibré & Pointu',
                  desc: 'Culture générale solide, détails historiques, sciences et littérature.'
                },
                {
                  id: 'encyclopediste' as StarterLevel,
                  title: 'Encyclopédiste',
                  badge: 'Exigeant & Précis',
                  desc: 'Dates précises, traités rares, vocabulaire d’expert et concepts avancés.'
                }
              ].map(level => {
                const isSelected = starterLevel === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => {
                      sound.playTap();
                      setStarterLevel(level.id);
                    }}
                    className={`min-h-[56px] p-3.5 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-1 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-[#090D16] border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {level.title}
                      </span>
                      <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">
                        {level.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {level.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Objectif quotidien */}
        {step === 3 && (
          <div className="flex flex-col animate-fadeIn">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Votre rythme quotidien
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                La régularité est le secret de la mémorisation durable avec la méthode SM-2.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-4">
              {[
                { min: 3 as DailyGoal, title: 'Dilettante', questions: '5 q/j' },
                { min: 5 as DailyGoal, title: 'Régulier', questions: '10 q/j' },
                { min: 10 as DailyGoal, title: 'Passionné', questions: '20 q/j' }
              ].map(goal => {
                const isSelected = dailyGoal === goal.min;
                return (
                  <button
                    key={goal.min}
                    onClick={() => {
                      sound.playTap();
                      setDailyGoal(goal.min);
                    }}
                    className={`min-h-[70px] p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-1 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-[#090D16] border-slate-300 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                      {goal.min} min
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                      {goal.title}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {goal.questions}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 dark:text-amber-300 mt-2">
              💡 <strong>Rétention saine</strong> : Le Défi du jour et les cartes de répétition espacée vous attendront chaque matin sans notification intrusive.
            </div>
          </div>
        )}

        {/* Bouton d'action principal strictly locked at 52px */}
        <div className="mt-6 pt-2">
          <button
            onClick={handleNext}
            disabled={step === 1 && selectedDomains.length < 3}
            className={`w-full min-h-[52px] h-[52px] rounded-xl font-semibold text-sm flex items-center justify-center transition-all active:scale-[0.98] shadow-md ${
              step === 1 && selectedDomains.length < 3
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
            }`}
          >
            {step === 3 ? 'Commencer l’aventure Érudit' : 'Continuer'}
          </button>
        </div>

      </div>
    </div>
  );
};
