import React from 'react';
import { 
  Home, 
  Route, 
  WholeWord, 
  Users, 
  Gamepad2, 
  Award, 
  GraduationCap, 
  Lightbulb,
  X,
  Accessibility,
  ShieldCheck,
  LogOut,
  PanelLeftClose
} from 'lucide-react';
import { TabType } from '../types';
import { playSound } from '../utils/sound';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenTipModal: () => void;
  onOpenAccessibility?: () => void;
  onOpenMediaCredits?: () => void;
  soundEnabled: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenTipModal,
  onOpenAccessibility,
  onOpenMediaCredits,
  soundEnabled,
  isOpenMobile = false,
  onCloseMobile,
  onLogout,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Início',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'trail',
      label: 'Trilha de Libras',
      icon: <Route className="w-5 h-5" />
    },
    {
      id: 'alphabet',
      label: 'Alfabeto Manual',
      icon: <WholeWord className="w-5 h-5" />
    },
    {
      id: 'daily-signs',
      label: 'Sinais do Dia a Dia',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'memory-game',
      label: 'Jogo da Memória',
      icon: <Gamepad2 className="w-5 h-5" />
    },
    {
      id: 'achievements',
      label: 'Conquistas & Estrelas',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 'credits-curiosities',
      label: 'Fontes & Curiosidades',
      icon: <GraduationCap className="w-5 h-5" />
    }
  ];

  const handleTabClick = (tab: TabType) => {
    playSound.pop(soundEnabled);
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-20 h-screen bg-white dark:bg-[#0E172E] border-r border-slate-100 dark:border-slate-800/90 flex flex-col justify-between transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpenMobile 
            ? 'translate-x-0 w-64 p-4 shadow-2xl' 
            : isCollapsed
              ? '-translate-x-full md:-translate-x-full w-0 p-0 border-r-0 opacity-0 pointer-events-none md:hidden'
              : '-translate-x-full md:translate-x-0 w-64 p-4'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & App Title & Mobile/Desktop Collapse */}
          <div className="flex items-center justify-between px-2 py-3 mb-6 select-none">
            <div 
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <img
                  src="/assets/logo_stitch.png"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBW9N146_koeeKHAoTrsuhr2gb5lxr_2jLTF2q96K-l87-NHXh_QkFuHjLP7gDu2n8-cARGADgseE6myD9_Mz2TLiaZS1y7PwEA40289iy9k9CstyIHqZUBF5V2-aywlWkT3_IMC7Ppi_UzoXqgM4zyzdNSkj1VPruFClDXV-wZVVmNov4TfpxBVyeodhVkD-e_KJ_o6b0NWUQurU0I6FkpMJDammbpYGMpTwUzOreLYZtdZ6kS7blSM4PC957vbkod-zY';
                  }}
                  alt="Logo Lumi Libras"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#2952E3] dark:text-sky-400 font-outfit tracking-tight leading-none">
                  lumi<span className="text-[#FFC800]">libras</span>
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  Aprender Brincando
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Desktop collapse button */}
              {onToggleCollapse && (
                <button
                  type="button"
                  onClick={() => {
                    playSound.pop(soundEnabled);
                    onToggleCollapse();
                  }}
                  className="hidden md:flex p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Ocultar menu lateral (expandir tela)"
                  aria-label="Ocultar menu lateral"
                >
                  <PanelLeftClose className="w-5 h-5" />
                </button>
              )}

              {/* Mobile close (X) button */}
              {onCloseMobile && (
                <button
                  onClick={onCloseMobile}
                  className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Navegação Principal">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/90 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 dark:border dark:border-blue-800/60 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className={`${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Extra Links for Accessibility & Media Credits */}
          <div className="md:hidden pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
            {onOpenAccessibility && (
              <button
                onClick={() => {
                  playSound.pop(soundEnabled);
                  if (onCloseMobile) onCloseMobile();
                  onOpenAccessibility();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
              >
                <Accessibility className="w-4 h-4 text-slate-500" />
                <span>Acessibilidade & Daltonismo</span>
              </button>
            )}
            {onOpenMediaCredits && (
              <button
                onClick={() => {
                  playSound.pop(soundEnabled);
                  if (onCloseMobile) onCloseMobile();
                  onOpenMediaCredits();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Fontes & Créditos das Mídias</span>
              </button>
            )}
            {onLogout && (
              <button
                onClick={() => {
                  if (onCloseMobile) onCloseMobile();
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer mt-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Tip Card: Dica do Lumi */}
        <div className="pt-4">
          <div
            onClick={() => {
              playSound.pop(soundEnabled);
              onOpenTipModal();
            }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100/80 dark:border-blue-900/60 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400/90 flex items-center justify-center text-white shadow-xs group-hover:rotate-6 transition-transform">
              <Lightbulb className="w-5 h-5 text-amber-950 fill-amber-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Dica do Lumi
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                Treine 5 sinais hoje!
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
