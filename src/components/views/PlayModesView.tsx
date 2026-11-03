import React from 'react';
import { Zap, Heart, Brain, Calendar, Infinity as InfinityIcon, ArrowRight } from 'lucide-react';
import { GameMode } from '../../types';
import { sound } from '../../lib/audio';

interface PlayModesViewProps {
  dueCardsCount: number;
  onSelectMode: (mode: GameMode, title: string) => void;
}

export const PlayModesView: React.FC<PlayModesViewProps> = ({ dueCardsCount, onSelectMode }) => {
  const modes = [
    {
      id: 'speed' as GameMode,
      title: 'Quiz Éclair (Chrono)',
      tag: '60 secondes',
      desc: 'Répondez au maximum de questions avant l’écoulement du sablier. Idéal pour stimuler la vivacité mentale.',
      icon: Zap,
      color: 'amber'
    },
    {
      id: 'survival' as GameMode,
      title: 'Mode Survie',
      tag: '3 vies',
      desc: 'Chaque erreur vous coûte un cœur. Jusqu’où votre culture générale vous portera-t-elle ?',
      icon: Heart,
      color: 'rose'
    },
    {
      id: 'leitner' as GameMode,
      title: 'Révision Espacée (SM-2)',
      tag: `${dueCardsCount} en attente`,
      desc: 'Réactivez les questions qui commencent à s’estomper dans votre mémoire à long terme selon l’algorithme SM-2.',
      icon: Brain,
      color: 'emerald',
      disabled: dueCardsCount === 0
    },
    {
      id: 'daily' as GameMode,
      title: 'Défi Quotidien',
      tag: '+100 XP',
      desc: '3 questions renouvelées chaque matin pour maintenir votre série (streak) active.',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 'infinite' as GameMode,
      title: 'Marathon Érudit',
      tag: 'Sans limite',
      desc: 'Enchaînement fluide de questions sans chrono. Apprenez à votre rythme avec les anecdotes associées.',
      icon: InfinityIcon,
      color: 'indigo'
    }
  ];

  return (
    <div className="flex flex-col gap-4 pb-safe-nav animate-fadeIn">
      <div className="px-1">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          Modes d'entraînement
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Choisissez votre style d’apprentissage ou de défi.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              disabled={mode.disabled}
              onClick={() => {
                sound.playTap();
                onSelectMode(mode.id, mode.title);
              }}
              className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all active:scale-[0.98] ${
                mode.disabled
                  ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-[#131B2E]/40 border-slate-200 dark:border-slate-800'
                  : 'bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#090D16] border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {mode.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                    {mode.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {mode.desc}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 self-center shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
