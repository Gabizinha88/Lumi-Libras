import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LumiMascot } from '../LumiMascot';
import { X, Sparkles, Star } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface HighFiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardStars: (amount: number) => void;
  soundEnabled: boolean;
}

export const HighFiveModal: React.FC<HighFiveModalProps> = ({
  isOpen,
  onClose,
  onRewardStars,
  soundEnabled
}) => {
  useEffect(() => {
    if (isOpen) {
      playSound.highFive(soundEnabled);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
      onRewardStars(3);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-100 dark:border-slate-800 text-center overflow-hidden transition-colors">
        {/* Background glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-200/50 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-200/50 dark:bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot High-five */}
        <div className="my-2 flex justify-center">
          <div className="relative">
            <LumiMascot size="medium" isHappy={true} />
            <span className="absolute -top-2 -right-2 text-3xl animate-bounce">✋</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Toca Aqui! +3 Estrelas
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
          Que energia boa! 🎉
        </h3>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          Você deu um toca aqui no Lumi! Aprender Libras com alegria faz cada sinal ficar guardado no coração e na memória.
        </p>

        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs">
              <Star className="w-6 h-6 fill-white text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800 dark:text-white">Recompensa de Parceria</div>
              <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold">+3 Estrelas douradas adicionadas!</div>
            </div>
          </div>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400">⭐ +3</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 transition-transform active:scale-95 cursor-pointer"
        >
          Continuar Brincando 🚀
        </button>
      </div>
    </div>
  );
};
