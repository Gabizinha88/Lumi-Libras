import React from 'react';
import { X, Eye, Volume2, Type, Moon, Sun, Sparkles } from 'lucide-react';
import { UserStats } from '../../types';
import { playSound } from '../../utils/sound';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onToggleSound: () => void;
  onToggleHighContrast: () => void;
  onToggleDarkMode: () => void;
  onToggleFontSize: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  stats,
  onToggleSound,
  onToggleHighContrast,
  onToggleDarkMode,
  onToggleFontSize
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden text-left transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Recursos de Acessibilidade
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Personalize sua experiência de aprendizagem
            </p>
          </div>
        </div>

        <div className="space-y-3.5 my-6">
          {/* Dark Mode (Modo Noturno) Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
                {stats.darkMode ? <Moon className="w-5 h-5 fill-indigo-300" /> : <Sun className="w-5 h-5 text-amber-500 fill-amber-300" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <span>Modo Noturno (Dark Mode)</span>
                  {stats.darkMode && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                      Ativado
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Cores suaves e fundo escuro para conforto visual
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                playSound.pop(stats.soundEnabled);
                onToggleDarkMode();
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                stats.darkMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
              title="Ativar/desativar modo noturno"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  stats.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 transition-colors">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-slate-600 dark:text-slate-300 ml-2" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">Alto Contraste</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Realça bordas e contraste visual</div>
              </div>
            </div>
            <button
              onClick={() => {
                playSound.pop(stats.soundEnabled);
                onToggleHighContrast();
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                stats.highContrast ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  stats.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Font Size Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 transition-colors">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-slate-600 dark:text-slate-300 ml-2" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">Tamanho do Texto</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {stats.fontSize === 'large' ? 'Fonte Ampliada' : 'Fonte Padrão'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                playSound.pop(stats.soundEnabled);
                onToggleFontSize();
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer"
            >
              {stats.fontSize === 'large' ? 'Grande (Ativo)' : 'Padrão'}
            </button>
          </div>

          {/* Sound & Speech Effects */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 transition-colors">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-slate-600 dark:text-slate-300 ml-2" />
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-white">Sons e Efeitos de Áudio</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Toques lúdicos e narração em voz alta</div>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
              }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                stats.soundEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  stats.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
        >
          Pronto, Salvar Preferências
        </button>
      </div>
    </div>
  );
};
