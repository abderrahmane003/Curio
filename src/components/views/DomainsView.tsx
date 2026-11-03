import React from 'react';
import { ChevronRight } from 'lucide-react';
import { UserProfile, DomainId } from '../../types';
import { DOMAINS } from '../../data/domains';
import { sound } from '../../lib/audio';

interface DomainsViewProps {
  profile: UserProfile;
  onSelectDomain: (domainId: DomainId, domainTitle: string) => void;
}

export const DomainsView: React.FC<DomainsViewProps> = ({ profile, onSelectDomain }) => {
  return (
    <div className="flex flex-col gap-4 pb-safe-nav animate-fadeIn">
      <div className="px-1 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            Les 12 Domaines du Savoir
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Explorez chaque branche encyclopédique et gagnez des niveaux.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {DOMAINS.map((domain) => {
          const stats = profile.domainProgress[domain.id] || { answered: 0, correct: 0, level: 1 };
          const percent = stats.answered > 0
            ? Math.round((stats.correct / stats.answered) * 100)
            : 0;

          return (
            <button
              key={domain.id}
              onClick={() => {
                sound.playTap();
                onSelectDomain(domain.id, domain.label);
              }}
              className="p-3.5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl text-left shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-all active:scale-[0.98] flex items-center gap-3.5"
            >
              <span className="text-2xl shrink-0 p-2 bg-slate-100 dark:bg-[#090D16] rounded-xl border border-slate-200 dark:border-slate-800">
                {domain.icon}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {domain.label}
                  </h3>
                  <span className="text-xs font-semibold tabular-nums text-blue-600 dark:text-blue-400 shrink-0">
                    Niv. {stats.level}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {domain.description}
                </p>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (stats.correct % 5) * 20 || (stats.correct > 0 ? 20 : 0))}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 tabular-nums">
                    {stats.correct} bonnes
                  </span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
