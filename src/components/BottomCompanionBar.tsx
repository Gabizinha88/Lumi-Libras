import React from 'react';
import { LumiMascot } from './LumiMascot';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { playSound } from '../utils/sound';

interface BottomCompanionBarProps {
  onOpenTip: () => void;
  onContinueTrail: () => void;
  soundEnabled: boolean;
}

export const BottomCompanionBar: React.FC<BottomCompanionBarProps> = ({
  onOpenTip,
  onContinueTrail,
  soundEnabled
}) => {
  return (
    <div className="sticky bottom-3 sm:bottom-4 z-20 mx-2.5 sm:mx-8 my-3 sm:my-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#111C35]/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-black/50 transition-colors">
        {/* Companion Avatar & Encouragement */}
        <div className="flex items-center gap-3 w-full sm:w-auto text-left">
          <div className="relative shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-cyan-100 to-sky-200 dark:from-cyan-900/60 dark:to-blue-900/60 border border-sky-300/40 dark:border-sky-500/30 flex items-center justify-center overflow-hidden shadow-xs">
              <LumiMascot size="compact" showSparkles={false} />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5 truncate">
              <span>Lumi está com você</span> <span className="text-amber-400">✦</span>
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
              Uma descoberta de cada vez. Sem pressa e com muita alegria.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto shrink-0">
          <button
            onClick={() => {
              playSound.pop(soundEnabled);
              onOpenTip();
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-bold border border-indigo-100 dark:border-indigo-800/60 transition-all cursor-pointer shadow-2xs whitespace-nowrap active:scale-95"
          >
            <span>Dica do Lumi</span>
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-300" />
          </button>

          <button
            onClick={() => {
              playSound.pop(soundEnabled);
              onContinueTrail();
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-500/25 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Continuar trilha</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
