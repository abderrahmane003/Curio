import React from 'react';
import { Brain, Award, Sparkles, Volume2, Moon, RotateCcw, Smartphone, Sliders } from 'lucide-react';
import { UserProfile } from '../../types';
import { sound } from '../../lib/audio';

interface ProfileViewProps {
  profile: UserProfile;
  dueCardsCount: number;
  totalCardsCount: number;
  onStartSM2Review: () => void;
  onReopenOnboarding: () => void;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onResetProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  dueCardsCount,
  totalCardsCount,
  onStartSM2Review,
  onReopenOnboarding,
  onToggleSound,
  onToggleTheme,
  onResetProfile
}) => {
  const accuracy = profile.answeredCount > 0
    ? Math.round((profile.correctCount / profile.answeredCount) * 100)
    : 0;

  const badges = [
    { id: 'streak_3', title: 'Flamme Débutante', icon: '🔥', desc: '3 jours de suite', unlocked: profile.streakDays >= 3 },
    { id: 'level_5', title: 'Grand Curieux', icon: '⚡', desc: 'Atteindre le niveau 5', unlocked: profile.level >= 5 },
    { id: 'answers_50', title: 'Dévoreur de Savoirs', icon: '📚', desc: '50 questions explorées', unlocked: profile.answeredCount >= 50 },
    { id: 'accuracy_80', title: 'Tir Précis', icon: '🎯', desc: 'Précision supérieure à 75%', unlocked: accuracy >= 75 && profile.answeredCount >= 10 }
  ];

  return (
    <div className="flex flex-col gap-4 pb-safe-nav animate-fadeIn">
      
      {/* CARTE PROFIL */}
      <section className="p-5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-3xl shadow-xs shrink-0">
            {profile.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 truncate">
              {profile.displayName}
            </h2>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block truncate">
              {profile.title}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1 tabular-nums">
              <span>Niveau {profile.level}</span>
              <span>·</span>
              <span>{profile.xp.toLocaleString('fr-FR')} XP</span>
            </div>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
          <div className="p-2">
            <span className="text-base font-bold tabular-nums text-slate-900 dark:text-slate-100 block">
              {profile.streakDays} j.
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Série active
            </span>
          </div>
          <div className="p-2">
            <span className="text-base font-bold tabular-nums text-blue-600 dark:text-blue-400 block">
              {accuracy} %
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Précision
            </span>
          </div>
          <div className="p-2">
            <span className="text-base font-bold tabular-nums text-emerald-600 dark:text-emerald-400 block">
              {profile.answeredCount}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Questions
            </span>
          </div>
        </div>
      </section>

      {/* BOÎTE SM-2 (SUPERMEMO) */}
      <section className="p-5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Boîte de Répétition Espacée (SM-2)
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            {totalCardsCount} cartes
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
          Algorithme scientifique calculant l’intervalle optimal de révision pour ancrer chaque anecdote dans la mémoire à long terme.
        </p>

        {dueCardsCount > 0 ? (
          <button
            onClick={() => {
              sound.playTap();
              onStartSM2Review();
            }}
            className="w-full min-h-[52px] h-[52px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
          >
            <span>Réviser {dueCardsCount} question{dueCardsCount > 1 ? 's' : ''} prêtes</span>
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-slate-800 text-xs text-center text-slate-500 dark:text-slate-400">
            ✅ Toutes vos cartes mémoires sont à jour pour aujourd'hui !
          </div>
        )}
      </section>

      {/* BADGES & EXPLOITS */}
      <section className="p-5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Badges d'érudition
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map(b => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 ${
                b.unlocked
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                  : 'bg-slate-50 dark:bg-[#090D16] border-slate-200 dark:border-slate-800 opacity-50'
              }`}
            >
              <span className="text-2xl shrink-0 mt-0.5">{b.icon}</span>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate">
                  {b.title}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                  {b.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRÉFÉRENCES & PARAMÈTRES */}
      <section className="p-5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
          Préférences & Paramètres
        </h3>

        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {/* Réajuster Onboarding */}
          <button
            onClick={() => {
              sound.playTap();
              onReopenOnboarding();
            }}
            className="min-h-[48px] py-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-400" />
              Modifier mes domaines préférés & niveau
            </span>
            <span className="text-slate-400">Modifier →</span>
          </button>

          {/* Son */}
          <div className="min-h-[48px] py-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-slate-400" />
              Effets sonores (Web Audio synthétisé)
            </span>
            <button
              onClick={onToggleSound}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                profile.soundEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white block transition-transform absolute top-0.5 ${
                  profile.soundEnabled ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Thème */}
          <div className="min-h-[48px] py-2 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-slate-400" />
              Mode sombre OLED
            </span>
            <button
              onClick={onToggleTheme}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                profile.theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white block transition-transform absolute top-0.5 ${
                  profile.theme === 'dark' ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Réinitialiser pour test */}
          <button
            onClick={onResetProfile}
            className="min-h-[48px] py-2 flex items-center gap-2 text-xs text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser ma progression (pour tests)
          </button>
        </div>
      </section>

    </div>
  );
};
