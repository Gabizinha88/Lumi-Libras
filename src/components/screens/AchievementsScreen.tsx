import React from 'react';
import confetti from 'canvas-confetti';
import { ACHIEVEMENTS_DATA } from '../../data/librasData';
import { Achievement, UserStats } from '../../types';
import { Award, Star, Flame, Gift, CheckCircle2, Lock } from 'lucide-react';
import { playSound } from '../../utils/sound';

interface AchievementsScreenProps {
  stats: UserStats;
  completedTrailNodes?: string[];
  unlockedAchievements?: string[];
  unlockedStickers?: string[];
  onRewardStars: (amount: number) => void;
  onUnlockSticker?: (stickerId: string) => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  stats,
  completedTrailNodes = ['node-1'],
  unlockedAchievements = ['first-sign'],
  unlockedStickers = ['lumi-star', 'lumi-wave'],
  onRewardStars,
  onUnlockSticker
}) => {
  const stickersCollection = [
    { id: 'lumi-wave', name: 'Lumi Acenando', emoji: '👋✨', requiredStars: 0 },
    { id: 'lumi-star', name: 'Estrela Dourada', emoji: '⭐🎈', requiredStars: 10 },
    { id: 'lumi-heart', name: 'Amor em Libras', emoji: '🤟💖', requiredStars: 30 },
    { id: 'lumi-crown', name: 'Coroa de Mestre', emoji: '👑🌟', requiredStars: 50 },
    { id: 'lumi-glasses', name: 'Lumi Sabichão', emoji: '👓📚', requiredStars: 75 },
    { id: 'lumi-astronaut', name: 'Lumi Espacial', emoji: '🚀🪐', requiredStars: 100 }
  ];

  const handleUnlockStickerClick = (sticker: typeof stickersCollection[0]) => {
    if (stats.stars >= sticker.requiredStars && !unlockedStickers.includes(sticker.id)) {
      playSound.star(stats.soundEnabled);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      if (onUnlockSticker) {
        onUnlockSticker(sticker.id);
      }
    }
  };

  // Evaluate dynamic unlocks for achievements
  const evaluatedAchievements = ACHIEVEMENTS_DATA.map((item) => {
    let isUnlocked = unlockedAchievements.includes(item.id);

    if (item.id === 'first-sign') {
      isUnlocked = isUnlocked || completedTrailNodes.length > 0;
    } else if (item.id === 'alphabet-explorer') {
      isUnlocked = isUnlocked || (completedTrailNodes.includes('node-1') && completedTrailNodes.includes('node-2'));
    } else if (item.id === 'five-day-streak') {
      isUnlocked = isUnlocked || stats.streakDays >= 5;
    } else if (item.id === 'friendly-hands') {
      isUnlocked = isUnlocked || (completedTrailNodes.includes('node-3') && completedTrailNodes.includes('node-4'));
    } else if (item.id === 'lumi-best-friend') {
      isUnlocked = isUnlocked || completedTrailNodes.includes('node-5');
    }

    return {
      ...item,
      unlocked: isUnlocked
    };
  });

  return (
    <div className="space-y-8 text-left pb-10 transition-colors">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-amber-100">
            <Award className="w-3.5 h-3.5 text-yellow-200" />
            <span>GALERIA DE CONQUISTAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Conquistas & Estrelas Douradas
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
            Celebre cada vitória! Conforme você treina seus sinais na trilha e jogos, ganha estrelas para abrir o Baú Mágico e colecionar itens do Lumi.
          </p>
        </div>
        <div className="absolute -bottom-6 -right-6 opacity-20 pointer-events-none text-9xl">
          🏆
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.stars}</div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Estrelas Acumuladas</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.streakDays} Dias</div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Sequência Ativa</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{unlockedStickers.length} / {stickersCollection.length}</div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">Figurinhas do Baú</div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Medalhas de Descoberta
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evaluatedAchievements.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all ${
                item.unlocked
                  ? 'bg-white dark:bg-[#111C35] border-amber-300 dark:border-amber-700/60 shadow-xs ring-1 ring-amber-400/30'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl p-2 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800/60">
                  {item.icon}
                </div>
                {item.unlocked ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[3]" /> Conquistado
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Em Progresso
                  </span>
                )}
              </div>

              <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400">
                <span>Recompensa:</span>
                <span className="flex items-center gap-1 font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  +{item.rewardStars} Estrelas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Baú Mágico do Lumi (Sticker Album) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111C35] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Baú Mágico do Lumi: Álbum de Figurinhas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Colecione itens especiais usando suas estrelas reluzentes conquistadas na trilha!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stickersCollection.map((stk) => {
            const isUnlocked = unlockedStickers.includes(stk.id);
            const canUnlock = stats.stars >= stk.requiredStars;

            return (
              <div
                key={stk.id}
                onClick={() => !isUnlocked && canUnlock && handleUnlockStickerClick(stk)}
                className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-all select-none ${
                  isUnlocked
                    ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 shadow-2xs'
                    : canUnlock
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 shadow-xs cursor-pointer hover:scale-105 active:scale-95'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{stk.emoji}</div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-200 leading-tight">
                  {stk.name}
                </div>
                <div className="mt-1.5 text-[10px] font-bold">
                  {isUnlocked ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Colecionado</span>
                  ) : canUnlock ? (
                    <span className="text-amber-700 dark:text-amber-400 font-extrabold underline">Abrir! ({stk.requiredStars}⭐)</span>
                  ) : (
                    <span className="text-slate-400">Requer {stk.requiredStars}⭐</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
