import React, { useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { Question } from '../../types';
import { saveQuestionReport } from '../../lib/storage';
import { sound } from '../../lib/audio';

interface ReportModalProps {
  question: Question;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ question, onClose }) => {
  const [reason, setReason] = useState<'inaccuracy' | 'typo' | 'disputed_source' | 'other'>('inaccuracy');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTap();
    saveQuestionReport({
      questionId: question.id,
      questionText: question.questionText,
      reason,
      comment: comment.trim() || undefined,
      userId: 'guest'
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-2xl p-5 shadow-2xl relative transition-colors">
        <button
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 flex flex-col items-center text-center">
            <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Signalement enregistré
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Merci pour votre contribution à l’exigence d’Érudit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Signaler une imprécision
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 italic">
              « {question.questionText} »
            </p>

            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Type de signalement :
            </label>
            <div className="flex flex-col gap-1.5 mb-3">
              {[
                { id: 'inaccuracy', label: 'Inexactitude historique ou scientifique' },
                { id: 'disputed_source', label: 'Source contestée ou obsolète' },
                { id: 'typo', label: 'Faute d’orthographe ou ambiguïté' },
                { id: 'other', label: 'Autre remarque' }
              ].map(opt => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={opt.id}
                    checked={reason === opt.id}
                    onChange={() => setReason(opt.id as any)}
                    className="text-blue-600"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Commentaire ou source complémentaire (optionnel) :
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ex: Selon les archives de..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500 mb-4"
            />

            <button
              type="submit"
              className="w-full min-h-[52px] h-[52px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center transition-all active:scale-[0.98]"
            >
              Envoyer le signalement
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
