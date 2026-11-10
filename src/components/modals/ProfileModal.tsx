import React from 'react';
import { X, Star, Flame, Sparkles, LogOut, UserCheck } from 'lucide-react';
import { UserStats } from '../../types';
import { UserAccount } from '../../utils/auth';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  currentUser?: UserAccount | null;
  onLogout?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  currentUser,
  onLogout
}) => {
  if (!isOpen) return null;

  const currentLevelMinXp = (stats.level - 1) * 50;
  const nextLevelXp = stats.level * 50;
  const xpInCurrentLevel = Math.max(0, stats.xp - currentLevelMinXp);
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / 50) * 100));
  const xpNeeded = Math.max(0, nextLevelXp - stats.xp);

  const roleLabel = 'Aluno Lumi 🌟';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden text-center transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex justify-center mb-3">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-4xl">
              {currentUser?.avatar || '🧒'}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-amber-400 rounded-full text-white text-xs font-black shadow-xs">
              ⭐
            </div>
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          {currentUser?.name || stats.levelTitle}
        </h3>
        <p className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-2">
          Nível {stats.level} • {stats.levelTitle}
        </p>

        {currentUser?.email && (
          <div className="flex flex-col items-center gap-1.5 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>{currentUser.email}</span>
              <span className="text-slate-400">•</span>
              <span className="font-bold text-blue-600 dark:text-sky-400">{roleLabel}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>☁️</span> Sincronizado no Firebase
            </span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 mx-auto mb-1" />
            <div className="text-lg font-black text-amber-950 dark:text-amber-200">{stats.stars}</div>
            <div className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
              Estrelas
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-900/50">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-400 mx-auto mb-1" />
            <div className="text-lg font-black text-orange-950 dark:text-orange-200">{stats.streakDays}</div>
            <div className="text-[10px] font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wide">
              Dias Seguidos
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50">
            <Sparkles className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-black text-blue-950 dark:text-blue-200">{stats.xp}</div>
            <div className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wide">
              XP Total
            </div>
          </div>
        </div>

        {/* Next Level Progress */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-left mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
            <span>Progresso para Nível {stats.level + 1}</span>
            <span className="text-blue-600 dark:text-sky-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-2 font-medium">
            {xpNeeded > 0
              ? `Faltam apenas ${xpNeeded} XP para desbloquear o Nível ${stats.level + 1} e novos adesivos do Lumi!`
              : 'Nível máximo atingido nesta unidade! Parabéns!'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex-1 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-[#2952E3] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
