import React from 'react';
import { Star, Flame, Volume2, VolumeX, Accessibility, Moon, Sun, ShieldCheck, Menu } from 'lucide-react';
import { UserStats } from '../types';
import { playSound } from '../utils/sound';

interface HeaderProps {
  stats: UserStats;
  currentUser?: {
    name: string;
    avatar: string;
    role?: string;
  } | null;
  onToggleSound: () => void;
  onToggleDarkMode?: () => void;
  onOpenAccessibility: () => void;
  onOpenProfile: () => void;
  onOpenMediaCredits?: () => void;
  onOpenMobileMenu?: () => void;
  onToggleDesktopSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  currentUser,
  onToggleSound,
  onToggleDarkMode,
  onOpenAccessibility,
  onOpenProfile,
  onOpenMediaCredits,
  onOpenMobileMenu,
  onToggleDesktopSidebar,
  isSidebarCollapsed = false,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-2.5 sm:px-8 py-2 sm:py-3.5 bg-white/90 dark:bg-[#0E172E]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/90 transition-colors flex-nowrap w-full">
      {/* Left Badges: Hamburger Menu Button, Stars & Daily Streak */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 flex-nowrap">
        {/* Unified hamburger toggle button (handles mobile open & desktop collapse toggle) */}
        <button
          onClick={() => {
            playSound.pop(stats.soundEnabled);
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
              if (onOpenMobileMenu) onOpenMobileMenu();
            } else {
              if (onToggleDesktopSidebar) onToggleDesktopSidebar();
            }
          }}
          className="p-1.5 sm:p-2 rounded-xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-sky-400 transition-colors shadow-2xs shrink-0 cursor-pointer active:scale-95 flex items-center gap-1.5"
          title={isSidebarCollapsed ? "Expandir menu lateral" : "Recolher menu lateral (tela cheia)"}
          aria-label="Alternar menu lateral"
        >
          <Menu className="w-5 h-5" />
          {isSidebarCollapsed && (
            <span className="text-xs font-bold hidden md:inline text-blue-600 dark:text-sky-400 pr-0.5">
              Menu
            </span>
          )}
        </button>

        {/* Star Badge */}
        <div
          onClick={() => playSound.star(stats.soundEnabled)}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/60 shadow-2xs cursor-pointer hover:bg-amber-100/70 dark:hover:bg-amber-900/50 transition-colors shrink-0 select-none"
          title="Suas estrelas acumuladas"
        >
          <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-500 shrink-0" />
          <span className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 leading-none">
            {stats.stars} <span className="font-semibold text-amber-700 dark:text-amber-300 text-xs hidden md:inline">Estrelas</span>
          </span>
        </div>

        {/* Streak Flame Badge */}
        <div
          onClick={() => playSound.pop(stats.soundEnabled)}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-700/60 shadow-2xs cursor-pointer hover:bg-orange-100/70 dark:hover:bg-orange-900/50 transition-colors shrink-0 select-none"
          title="Dias seguidos de treino"
        >
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-orange-500 text-orange-500 animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-black text-orange-900 dark:text-orange-200 leading-none">
            {stats.streakDays} <span className="font-semibold text-orange-700 dark:text-orange-300 text-xs hidden md:inline">Dias</span>
          </span>
        </div>
      </div>

      {/* Right Controls: Audio, Quick Theme, Accessibility, Profile */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 flex-nowrap">
        {/* Sound Toggle - Available on screen or inside mobile sidebar */}
        <button
          onClick={onToggleSound}
          className="p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-slate-800 transition-all cursor-pointer hidden xs:inline-flex"
          title={stats.soundEnabled ? 'Silenciar áudio' : 'Ativar áudio'}
          aria-label="Controle de Som"
        >
          {stats.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          )}
        </button>

        {/* Quick Night Mode toggle */}
        {onToggleDarkMode && (
          <button
            onClick={() => {
              playSound.pop(stats.soundEnabled);
              onToggleDarkMode();
            }}
            className="p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title={stats.darkMode ? 'Mudar para modo claro' : 'Mudar para modo noturno'}
            aria-label="Modo Noturno"
          >
            {stats.darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            )}
          </button>
        )}

        {/* Accessibility Button - Always visible on top */}
        <button
          onClick={onOpenAccessibility}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-sky-300 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
          title="Recursos de Acessibilidade (Contraste, Fontes, Libras)"
          aria-label="Acessibilidade"
        >
          <Accessibility className="w-4 h-4 text-[#2952E3] dark:text-sky-400 shrink-0" />
          <span className="text-xs font-bold hidden md:inline">Acessibilidade</span>
        </button>

        {/* Media Credits Button */}
        {onOpenMediaCredits && (
          <button
            onClick={onOpenMediaCredits}
            className="p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/60 dark:hover:bg-slate-800 transition-all cursor-pointer hidden lg:inline-flex"
            title="Fontes e Créditos das Mídias Reais (UFSM, UFV, UTFPR)"
            aria-label="Créditos e Fontes"
          >
            <ShieldCheck className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          </button>
        )}

        {/* User Profile Pill */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-1.5 sm:gap-2 p-0.5 sm:pl-2.5 sm:pr-1.5 sm:py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-all cursor-pointer group"
          title="Ver perfil e progresso"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight">
              {currentUser?.name || stats.levelTitle}
            </div>
            <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 leading-tight">
              Nível {stats.level} ✦ {stats.levelTitle}
            </div>
          </div>

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-0.5 shadow-xs shrink-0">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
              <span className="text-xs sm:text-sm">{currentUser?.avatar || '🌟'}</span>
            </div>
          </div>
        </button>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-xs font-bold cursor-pointer hidden sm:inline-flex items-center gap-1"
            title="Sair da conta e voltar ao início"
            aria-label="Sair"
          >
            <span>Sair</span>
          </button>
        )}
      </div>
    </header>
  );
};
