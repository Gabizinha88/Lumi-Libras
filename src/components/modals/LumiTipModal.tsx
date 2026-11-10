import React, { useState } from 'react';
import { X, Volume2, Lightbulb, ChevronRight, ChevronLeft } from 'lucide-react';
import { LumiMascot } from '../LumiMascot';
import { LUMI_TIPS } from '../../data/librasData';
import { playSound } from '../../utils/sound';

interface LumiTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export const LumiTipModal: React.FC<LumiTipModalProps> = ({
  isOpen,
  onClose,
  soundEnabled
}) => {
  const [tipIndex, setTipIndex] = useState(0);

  if (!isOpen) return null;

  const currentTip = LUMI_TIPS[tipIndex];

  const handleNext = () => {
    playSound.pop(soundEnabled);
    setTipIndex((prev) => (prev + 1) % LUMI_TIPS.length);
  };

  const handlePrev = () => {
    playSound.pop(soundEnabled);
    setTipIndex((prev) => (prev - 1 + LUMI_TIPS.length) % LUMI_TIPS.length);
  };

  const handleSpeak = () => {
    playSound.speakText(`${currentTip.title}. ${currentTip.text}`, soundEnabled);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-100 dark:border-slate-800 text-center overflow-hidden transition-colors">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="my-2 flex justify-center">
          <LumiMascot size="medium" isHappy={true} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
          <Lightbulb className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          Dica do Lumi ({tipIndex + 1}/{LUMI_TIPS.length})
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
          {currentTip.title}
        </h3>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 mb-4 text-left">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentTip.text}
          </p>
          <div className="mt-3 pt-2.5 border-t border-amber-200/60 dark:border-amber-900/40 text-xs font-bold text-amber-900 dark:text-amber-300">
            {currentTip.tag}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Dica anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Próxima dica"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              title="Ouvir dica"
            >
              <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Ouvir</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Entendi! 👍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
