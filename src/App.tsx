import React, { useState, useEffect } from 'react';
import { TabKey, GameMode, DomainId, Question, UserProfile } from './types';
import { loadProfile, saveProfile, getDefaultProfile } from './lib/storage';
import { INITIAL_QUESTIONS, getRandomQuestions, getQuestionsByDomain } from './data/questions';
import { isDueForReview } from './lib/sm2';
import { sound } from './lib/audio';

import { TopHeader } from './components/layout/TopHeader';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { QuizModal } from './components/quiz/QuizModal';

import { DiscoverView } from './components/views/DiscoverView';
import { PlayModesView } from './components/views/PlayModesView';
import { DomainsView } from './components/views/DomainsView';
import { LeaguesView } from './components/views/LeaguesView';
import { ProfileView } from './components/views/ProfileView';

export default function App() {
  const [profile, setProfile] = useState(loadProfile);
  const [activeTab, setActiveTab] = useState<TabKey>('decouvrir');
  const [showOnboarding, setShowOnboarding] = useState(!profile.isOnboarded);
  
  // Quiz Active State
  const [activeQuiz, setActiveQuiz] = useState<{
    questions: Question[];
    mode: GameMode;
    title: string;
  } | null>(null);

  // Sync profile from storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(loadProfile());
    };
    window.addEventListener('erudit_profile_updated', handleStorageUpdate);
    return () => window.removeEventListener('erudit_profile_updated', handleStorageUpdate);
  }, []);

  // Sync dark mode class on documentElement
  useEffect(() => {
    if (profile.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);

  // Synchronisation du son
  const toggleSound = () => {
    const next = !profile.soundEnabled;
    sound.setSoundEnabled(next);
    const updated = { ...profile, soundEnabled: next };
    setProfile(updated);
    saveProfile(updated);
  };

  // Synchronisation du thème
  const toggleTheme = () => {
    const next: 'dark' | 'light' = profile.theme === 'dark' ? 'light' : 'dark';
    const updated: UserProfile = { ...profile, theme: next };
    setProfile(updated);
    saveProfile(updated);
  };

  // Cartes SM-2 dues
  const dueCards = Object.values(profile.sm2Cards).filter(isDueForReview);
  const totalCardsCount = Object.keys(profile.sm2Cards).length;

  // Lancement de différents quiz
  const startQuiz = (questions: Question[], mode: GameMode, title: string) => {
    setActiveQuiz({
      questions: questions.length > 0 ? questions : getRandomQuestions(5),
      mode,
      title
    });
  };

  const handleStartDaily = () => {
    startQuiz(getRandomQuestions(3), 'daily', 'Défi du Jour');
  };

  const handleStartAnecdote = () => {
    startQuiz([INITIAL_QUESTIONS[0]], 'flash', 'Le Saviez-vous ?');
  };

  const handleStartSpeedQuiz = () => {
    startQuiz(getRandomQuestions(10), 'speed', 'Quiz Éclair (60s)');
  };

  const handleStartSurvivalQuiz = () => {
    startQuiz(getRandomQuestions(15), 'survival', 'Mode Survie (3 Vies)');
  };

  const handleStartDomainQuiz = (domainId: string, title?: string) => {
    const questions = getQuestionsByDomain(domainId);
    startQuiz(questions.length > 0 ? questions : getRandomQuestions(5), 'domain', title || 'Quiz par Domaine');
  };

  const handleStartSM2Review = () => {
    const dueQuestionIds = dueCards.map(c => c.questionId);
    const questionsToReview = INITIAL_QUESTIONS.filter(q => dueQuestionIds.includes(q.id));
    startQuiz(
      questionsToReview.length > 0 ? questionsToReview : getRandomQuestions(3),
      'leitner',
      'Révision Espacée SM-2'
    );
  };

  const handleSelectMode = (mode: GameMode, title: string) => {
    if (mode === 'daily') handleStartDaily();
    else if (mode === 'speed') handleStartSpeedQuiz();
    else if (mode === 'survival') handleStartSurvivalQuiz();
    else if (mode === 'leitner') handleStartSM2Review();
    else startQuiz(getRandomQuestions(10), 'infinite', title);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Conteneur principal mobile-first centré */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col min-h-screen relative shadow-2xl shadow-black/10 border-x border-slate-200/60 dark:border-slate-800/60 bg-[#F8FAFC] dark:bg-[#090D16]">
        
        {/* Top Header unifié */}
        <TopHeader
          profile={profile}
          onToggleSound={toggleSound}
          onToggleTheme={toggleTheme}
          onOpenProfile={() => setActiveTab('profil')}
        />

        {/* Vue active */}
        <main className="flex-1 px-4 pt-4">
          {activeTab === 'decouvrir' && (
            <DiscoverView
              profile={profile}
              dailyQuestion={INITIAL_QUESTIONS[0]}
              anecdoteQuestion={INITIAL_QUESTIONS[0]}
              dueCardsCount={dueCards.length}
              onStartDaily={handleStartDaily}
              onStartAnecdote={handleStartAnecdote}
              onStartSpeedQuiz={handleStartSpeedQuiz}
              onStartSM2Review={handleStartSM2Review}
              onSelectDomain={handleStartDomainQuiz}
            />
          )}

          {activeTab === 'jouer' && (
            <PlayModesView
              dueCardsCount={dueCards.length}
              onSelectMode={handleSelectMode}
            />
          )}

          {activeTab === 'domaines' && (
            <DomainsView
              profile={profile}
              onSelectDomain={handleStartDomainQuiz}
            />
          )}

          {activeTab === 'ligues' && (
            <LeaguesView
              profile={profile}
            />
          )}

          {activeTab === 'profil' && (
            <ProfileView
              profile={profile}
              dueCardsCount={dueCards.length}
              totalCardsCount={totalCardsCount}
              onStartSM2Review={handleStartSM2Review}
              onReopenOnboarding={() => setShowOnboarding(true)}
              onToggleSound={toggleSound}
              onToggleTheme={toggleTheme}
              onResetProfile={() => {
                const fresh = getDefaultProfile();
                saveProfile(fresh);
                setProfile(fresh);
                setShowOnboarding(true);
              }}
            />
          )}
        </main>

        {/* Bottom Tab Bar fixe 5 destinations */}
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

      </div>

      {/* Modal Quiz interactif plein écran */}
      {activeQuiz && (
        <QuizModal
          questions={activeQuiz.questions}
          mode={activeQuiz.mode}
          modeTitle={activeQuiz.title}
          onClose={() => setActiveQuiz(null)}
          onFinish={() => {
            // Actualiser l'état
            setProfile(loadProfile());
          }}
        />
      )}

      {/* Modal Onboarding */}
      {showOnboarding && (
        <OnboardingModal
          initialProfile={profile}
          onComplete={(prefs) => {
            const updated = {
              ...profile,
              preferredDomains: prefs.preferredDomains,
              starterLevel: prefs.starterLevel,
              dailyGoalMinutes: prefs.dailyGoalMinutes,
              isOnboarded: true
            };
            setProfile(updated);
            saveProfile(updated);
            setShowOnboarding(false);
          }}
        />
      )}

    </div>
  );
}
