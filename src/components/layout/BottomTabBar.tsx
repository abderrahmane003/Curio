import React from 'react';
import { Compass, Gamepad2, Layers, Trophy, User } from 'lucide-react';
import { TabKey } from '../../types';
import { sound } from '../../lib/audio';

interface BottomTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

interface TabItem {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { key: 'decouvrir', label: 'Découvrir', icon: Compass },
  { key: 'jouer', label: 'Jouer', icon: Gamepad2 },
  { key: 'domaines', label: 'Domaines', icon: Layers },
  { key: 'ligues', label: 'Ligues', icon: Trophy },
  { key: 'profil', label: 'Profil', icon: User }
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                sound.playTap();
                onTabChange(tab.key);
              }}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center py-1 transition-all rounded-xl relative ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.75]'
                  }`}
                />
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
