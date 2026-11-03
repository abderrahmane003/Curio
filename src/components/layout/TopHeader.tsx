import React from 'react';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../../types';
import { sound } from '../../lib/audio';

interface TopHeaderProps {
  profile: UserProfile;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenProfile: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  onToggleSound,
  onToggleTheme,
  onOpenProfile
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F8FAFC]/90 dark:bg-[#090D16]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between gap-2" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        {/* Brand wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            ÉRUDIT
          </span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:inline">
            Savoir
          </span>
        </div>

        {/* Status badges & Controls */}
        <div className="flex items-center gap-2">
          {/* Streak indicator */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-700 dark:text-amber-400 text-xs font-semibold tabular-nums"
            title="Série de jours consécutifs"
          >
            <span>🔥</span>
            <span>{profile.streakDays} j.</span>
          </div>

          {/* XP indicator */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-700 dark:text-blue-400 text-xs font-semibold tabular-nums"
            title="Points d'expérience"
          >
            <span>⚡</span>
            <span>{profile.xp.toLocaleString('fr-FR')}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sound.playTap();
              onToggleSound();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg"
            aria-label={profile.soundEnabled ? 'Désactiver le son' : 'Activer le son'}
            title={profile.soundEnabled ? 'Son activé' : 'Son coupé'}
          >
            {profile.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400 dark:text-slate-600" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              sound.playTap();
              onToggleTheme();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors rounded-lg"
            aria-label="Basculer le thème"
            title="Changer de thème"
          >
            {profile.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Avatar button */}
          <button
            onClick={() => {
              sound.playTap();
              onOpenProfile();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:ring-2 ring-blue-500/40 transition-all text-base"
            aria-label="Accéder au profil"
          >
            <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shadow-xs border border-slate-300 dark:border-slate-700">
              {profile.avatar}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
