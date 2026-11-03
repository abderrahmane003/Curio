import React from 'react';
import { Sparkles, Zap, BookOpen, Flame, ArrowRight, Brain } from 'lucide-react';
import { UserProfile, Question } from '../../types';
import { DOMAINS_MAP } from '../../data/domains';
import { sound } from '../../lib/audio';

interface DiscoverViewProps {
  profile: UserProfile;
  dailyQuestion: Question;
  anecdoteQuestion: Question;
  dueCardsCount: number;
  onStartDaily: () => void;
  onStartAnecdote: () => void;
  onStartSpeedQuiz: () => void;
  onStartSM2Review: () => void;
  onSelectDomain: (domainId: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  profile,
  dailyQuestion,
  anecdoteQuestion,
  dueCardsCount,
  onStartDaily,
  onStartAnecdote,
  onStartSpeedQuiz,
  onStartSM2Review,
  onSelectDomain
}) => {
  const favoriteDomain = profile.preferredDomains[0]
    ? DOMAINS_MAP[profile.preferredDomains[0]]
    : null;

  return (
    <div className="flex flex-col gap-5 pb-safe-nav animate-fadeIn">
      
      {/* BANNER DÉFI DU JOUR */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-5 shadow-lg shadow-blue-600/15 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200">
              Défi Quotidien · {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-tight">
              +100 XP Bonus
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold leading-tight mb-1 text-white">
            {dailyQuestion.domainLabel}
          </h2>
          <p className="text-xs text-blue-100 line-clamp-2 mb-4 opacity-90">
            {dailyQuestion.questionText}
          </p>

          <button
            onClick={() => {
              sound.playTap();
              onStartDaily();
            }}
            className="w-full min-h-[52px] h-[52px] bg-white text-blue-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <span>Relever le défi du jour</span>
            <ArrowRight className="w-4 h-4 text-blue-800" />
          </button>
        </div>

        {/* Décoration sobre */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
      </section>

      {/* BOÎTE SM-2 (RÉVISION ESPACÉE) SI DES CARTES SONT EN ATTENTE */}
      {dueCardsCount > 0 && (
        <section className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>{dueCardsCount} question{dueCardsCount > 1 ? 's' : ''} à consolider</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold rounded">SM-2</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Consolidez votre mémoire avant l’oubli naturel.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playTap();
              onStartSM2Review();
            }}
            className="min-h-[44px] px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs shrink-0 active:scale-[0.98] transition-all"
          >
            Réviser
          </button>
        </section>
      )}

      {/* CARTE LE SAVIEZ-VOUS ? (ANECDOTE DU JOUR) */}
      <section className="p-5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs transition-colors">
        <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-500" />
            Le Saviez-vous ?
          </span>
          <span className="text-[11px] font-normal text-slate-400">
            Lecture 30s
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
          {anecdoteQuestion.domainLabel}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif-quote line-clamp-3 mb-3">
          « {anecdoteQuestion.explanation} »
        </p>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
            {anecdoteQuestion.source}
          </span>
          <button
            onClick={() => {
              sound.playTap();
              onStartAnecdote();
            }}
            className="min-h-[44px] px-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Tester ma mémoire</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* MODES RAPIDES */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Actions rapides
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              sound.playTap();
              onStartSpeedQuiz();
            }}
            className="min-h-[64px] p-4 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl text-left shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-all active:scale-[0.98] flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                Quiz Éclair
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                60 secondes chrono
              </span>
            </div>
          </button>

          {favoriteDomain && (
            <button
              onClick={() => {
                sound.playTap();
                onSelectDomain(favoriteDomain.id);
              }}
              className="min-h-[64px] p-4 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl text-left shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-all active:scale-[0.98] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-lg shrink-0">
                {favoriteDomain.icon}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate">
                  {favoriteDomain.label}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Votre favori
                </span>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* STATUT ÉRUDITION */}
      <section className="p-4 bg-slate-100 dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-lg">🦉</span>
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              {profile.title}
            </span>
            <span className="text-[11px] text-slate-500">
              Niveau {profile.level} · {profile.answeredCount} questions explorées
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-bold text-blue-600 dark:text-blue-400 tabular-nums">
            {profile.correctCount > 0 ? Math.round((profile.correctCount / profile.answeredCount) * 100) : 0} %
          </span>
          <span className="block text-[10px] text-slate-400">
            Précision
          </span>
        </div>
      </section>

    </div>
  );
};
