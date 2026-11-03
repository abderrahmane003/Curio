import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, ArrowRight, RotateCcw, AlertTriangle, Check, BookOpen } from 'lucide-react';
import { Question, GameMode } from '../../types';
import { sound } from '../../lib/audio';
import { calculateSM2 } from '../../lib/sm2';
import { saveSM2Card, loadProfile, recordAnswer } from '../../lib/storage';
import { ReportModal } from './ReportModal';

interface QuizModalProps {
  questions: Question[];
  mode: GameMode;
  modeTitle: string;
  onClose: () => void;
  onFinish?: (results: { total: number; correct: number; xpEarned: number }) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  questions,
  mode,
  modeTitle,
  onClose,
  onFinish
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [soundActive, setSoundActive] = useState(sound.isEnabled());
  const [showReport, setShowReport] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(mode === 'speed' ? 60 : 15);
  const [lives, setLives] = useState(3);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Timer pour mode chrono
  useEffect(() => {
    if (isAnswered || isCompleted) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnswered, isCompleted]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    sound.playError();
    setIsAnswered(true);
    setSelectedOption(-1); // temps écoulé

    // SM-2 échec (qualité 0)
    const sm2 = calculateSM2({ questionId: currentQ.id, domainId: currentQ.domainId }, 0);
    saveSM2Card(sm2);

    const profile = loadProfile();
    recordAnswer(profile, currentQ.domainId, false, 0);

    if (mode === 'survival') {
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setIsCompleted(true);
      }
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    const profile = loadProfile();

    if (isCorrect) {
      sound.playSuccess();
      setScore(s => s + 1);
      const earnedXP = 15;
      recordAnswer(profile, currentQ.domainId, true, earnedXP);

      // SM-2 réussite
      const sm2 = calculateSM2({ questionId: currentQ.id, domainId: currentQ.domainId }, 5);
      saveSM2Card(sm2);
    } else {
      sound.playError();
      recordAnswer(profile, currentQ.domainId, false, 0);

      // SM-2 échec (qualité 1)
      const sm2 = calculateSM2({ questionId: currentQ.id, domainId: currentQ.domainId }, 1);
      saveSM2Card(sm2);

      if (mode === 'survival') {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          setIsCompleted(true);
        }
      }
    }
  };

  const handleNext = () => {
    sound.playTap();
    if (currentIndex + 1 < questions.length && !(mode === 'survival' && lives <= 0)) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimer(mode === 'speed' ? timer : 15);
    } else {
      setIsCompleted(true);
      sound.playStreak();
      if (onFinish) {
        onFinish({
          total: questions.length,
          correct: score + (selectedOption === currentQ.correctIndex ? 1 : 0),
          xpEarned: score * 15
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#090D16] flex flex-col text-slate-900 dark:text-slate-100 overflow-y-auto">
      {/* Top Header */}
      <div
        className="sticky top-0 z-20 bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))' }}
      >
        <button
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          aria-label="Quitter le quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress & Title */}
        <div className="flex flex-col items-center flex-1 mx-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {modeTitle}
            </span>
            <span className="text-xs text-slate-400 font-medium">·</span>
            <span className="text-xs font-bold tabular-nums text-blue-600 dark:text-blue-400">
              {currentIndex + 1}/{questions.length}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full max-w-[200px] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls (Sound & Timer/Vies) */}
        <div className="flex items-center gap-2">
          {mode === 'survival' ? (
            <div className="flex items-center gap-0.5 text-xs text-rose-500 font-bold tabular-nums">
              {'❤️'.repeat(lives)}
            </div>
          ) : (
            <div className="text-xs font-bold tabular-nums px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              ⏱️ {timer}s
            </div>
          )}

          <button
            onClick={() => {
              const next = !soundActive;
              sound.setSoundEnabled(next);
              setSoundActive(next);
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            aria-label={soundActive ? 'Désactiver le son' : 'Activer le son'}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-md w-full mx-auto px-4 py-5 flex flex-col justify-between">
        {!isCompleted ? (
          <div className="flex flex-col flex-1">
            
            {/* Domain & Difficulty Tag */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span className="tracking-wide uppercase">
                {currentQ.domainLabel}
              </span>
              <span className="tabular-nums">
                Niveau {currentQ.difficulty}/3
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 leading-snug my-2">
              {currentQ.questionText}
            </h2>

            {/* Answer Options */}
            <div className="flex flex-col gap-2.5 my-4">
              {currentQ.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                const isThisSelected = selectedOption === idx;
                const isThisCorrect = idx === currentQ.correctIndex;

                let stateClasses = 'bg-white dark:bg-[#131B2E] border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-slate-600 dark:hover:border-slate-400';

                if (isAnswered) {
                  if (isThisCorrect) {
                    stateClasses = 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/20';
                  } else if (isThisSelected && !isThisCorrect) {
                    stateClasses = 'bg-red-50/90 dark:bg-red-950/40 border-red-600 dark:border-red-500 text-red-950 dark:text-red-100 ring-1 ring-red-500/20';
                  } else {
                    stateClasses = 'opacity-50 border-slate-300 dark:border-slate-700 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`min-h-[56px] p-3.5 rounded-xl border-[1.5px] text-left flex items-center gap-3 transition-all active:scale-[0.98] ${stateClasses}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isAnswered && isThisCorrect
                          ? 'bg-emerald-600 text-white'
                          : isAnswered && isThisSelected && !isThisCorrect
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm font-medium leading-tight flex-1">
                      {option}
                    </span>
                    {isAnswered && isThisCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explication "Le saviez-vous ?" & Source */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-[#1C160C] border border-amber-300 dark:border-amber-800/60 my-2 animate-fadeIn">
                <div className="flex items-center gap-2 mb-2 text-amber-900 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Le saviez-vous ?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-amber-100/90 leading-relaxed font-serif-quote">
                  {currentQ.explanation}
                </p>

                <div className="mt-3 pt-2.5 border-t border-amber-200 dark:border-amber-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[200px]" title={currentQ.source}>
                    Source : {currentQ.source}
                  </span>
                  <button
                    onClick={() => setShowReport(true)}
                    className="min-h-[44px] px-2 flex items-center gap-1 text-slate-500 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Signaler</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Bilan de fin de session */
          <div className="flex flex-col items-center justify-center text-center py-8 flex-1 animate-fadeIn">
            <span className="text-5xl mb-3">🎓</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Session complétée !
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Votre savoir s’est enrichi de nouvelles connexions durables.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
              <div className="p-3.5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl">
                <span className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {score} / {questions.length}
                </span>
                <span className="block text-[11px] text-slate-500 mt-1 font-medium">
                  Réponses exactes
                </span>
              </div>
              <div className="p-3.5 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl">
                <span className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                  +{score * 15} XP
                </span>
                <span className="block text-[11px] text-slate-500 mt-1 font-medium">
                  Gain d’expérience
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mb-4">
              🧠 Les questions ratées ont été ajoutées à votre boîte de répétition espacée <strong>SM-2</strong>.
            </p>
          </div>
        )}

        {/* Sticky Action Button 52px */}
        <div className="mt-4 pt-2" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
          {isCompleted ? (
            <button
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              className="w-full min-h-[52px] h-[52px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all"
            >
              Retour à l’accueil
            </button>
          ) : isAnswered ? (
            <button
              onClick={handleNext}
              className="w-full min-h-[52px] h-[52px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 active:scale-[0.98] transition-all"
            >
              <span>{currentIndex + 1 < questions.length ? 'Question suivante' : 'Voir les résultats'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="h-[52px] flex items-center justify-center text-xs text-slate-400 font-medium">
              Choisissez une réponse ci-dessus
            </div>
          )}
        </div>
      </div>

      {/* Modal de signalement */}
      {showReport && (
        <ReportModal
          question={currentQ}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
};
