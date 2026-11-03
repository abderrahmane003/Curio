import React from 'react';
import { Trophy, Flame, ChevronUp, Shield } from 'lucide-react';
import { UserProfile, LeagueMember } from '../../types';

interface LeaguesViewProps {
  profile: UserProfile;
}

export const LeaguesView: React.FC<LeaguesViewProps> = ({ profile }) => {
  // Membres simulés de la ligue hebdomadaire (compétition stimulante)
  const members: LeagueMember[] = [
    { uid: 'm1', displayName: 'Alexandre D.', title: 'Maître Érudit', avatar: '🏛️', xp: 2840, streak: 14 },
    { uid: 'm2', displayName: 'Sophie M.', title: 'Érudit Confirmé', avatar: '🔬', xp: 2610, streak: 8 },
    { uid: 'm3', displayName: 'Marc V.', title: 'Encyclopédiste', avatar: '📚', xp: 2490, streak: 21 },
    { uid: 'user', displayName: profile.displayName + ' (Vous)', title: profile.title, avatar: profile.avatar, xp: profile.xp + 1500, streak: profile.streakDays, isUser: true },
    { uid: 'm4', displayName: 'Clara B.', title: 'Curieux Passionné', avatar: '🎨', xp: 1980, streak: 3 },
    { uid: 'm5', displayName: 'Thomas L.', title: 'Curieux Passionné', avatar: '💡', xp: 1820, streak: 2 },
    { uid: 'm6', displayName: 'Éléonore K.', title: 'Érudit', avatar: '🌿', xp: 1650, streak: 5 },
    { uid: 'm7', displayName: 'Julien R.', title: 'Curieux', avatar: '⚽', xp: 1400, streak: 1 }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="flex flex-col gap-4 pb-safe-nav animate-fadeIn">
      
      {/* BANDEAU LIGUE */}
      <section className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              Ligue Argent · Division 4
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-300 tabular-nums bg-white/10 px-2.5 py-1 rounded-full">
            Fin dans 2j 14h
          </span>
        </div>
        <p className="text-xs text-slate-300">
          Les 3 premiers accèdent à la <strong>Ligue Or</strong> dimanche à minuit.
        </p>
      </section>

      {/* LISTE DU CLASSEMENT */}
      <section className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-3xl p-2 shadow-xs transition-colors">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex justify-between border-b border-slate-100 dark:border-slate-800/80">
          <span>Rang & Érudit</span>
          <span>XP Hebdo</span>
        </div>

        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/60">
          {members.map((member, index) => {
            const rank = index + 1;
            const isPromotion = rank <= 3;
            const isCurrentUser = member.isUser;

            return (
              <div
                key={member.uid}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 transition-colors ${
                  isCurrentUser
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border border-blue-500/30'
                    : ''
                }`}
              >
                {/* Rank & Avatar & Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-6 text-center text-xs font-bold tabular-nums shrink-0 ${
                      rank === 1
                        ? 'text-amber-500 text-sm'
                        : rank === 2
                        ? 'text-slate-400'
                        : rank === 3
                        ? 'text-amber-700'
                        : 'text-slate-500'
                    }`}
                  >
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#090D16] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm shrink-0">
                    {member.avatar}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {member.displayName}
                      </span>
                      {isPromotion && (
                        <span title="Zone de promotion">
                          <ChevronUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 truncate block">
                      {member.title} · 🔥 {member.streak} j.
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    {member.xp.toLocaleString('fr-FR')} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RÈGLES DES LIGUES */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3">
        <Shield className="w-5 h-5 text-blue-600 shrink-0" />
        <span>
          Les points d’expérience sont attribués à chaque bonne réponse et bonus quotidiens.
        </span>
      </div>

    </div>
  );
};
