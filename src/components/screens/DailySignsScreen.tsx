import React, { useState, useRef, useEffect } from 'react';
import {
  RECOVERED_SIGN_CATEGORIES,
  RECOVERED_WORDS_DATA,
  WordSignItem,
  SignCategory
} from '../../data/librasRecoveredData';
import { UserStats } from '../../types';
import { playSound } from '../../utils/sound';
import { X, RotateCcw, ExternalLink, Check, Play, Sparkles } from 'lucide-react';

interface DailySignsScreenProps {
  stats: UserStats;
  onRewardStars: (amount: number) => void;
  practicedWords?: string[];
  onUpdatePracticedWords?: (words: string[]) => void;
}

export const DailySignsScreen: React.FC<DailySignsScreenProps> = ({
  stats,
  onRewardStars,
  practicedWords: propPracticedWords,
  onUpdatePracticedWords
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('cumprimentos');
  const [activeWord, setActiveWord] = useState<WordSignItem | null>(null);
  const practicedWords = propPracticedWords || [];

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoWatched, setVideoWatched] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentCategory: SignCategory =
    RECOVERED_SIGN_CATEGORIES.find((cat) => cat.id === selectedCategory) ||
    RECOVERED_SIGN_CATEGORIES[0];

  const categoryWords = RECOVERED_WORDS_DATA.filter(
    (w) => w.category === selectedCategory
  );

  const practicedInCategory = categoryWords.filter((w) =>
    practicedWords.includes(w.id)
  ).length;

  const handleOpenWord = (word: WordSignItem) => {
    playSound.pop(stats.soundEnabled);
    setActiveWord(word);
    setVideoWatched(practicedWords.includes(word.id));
    setVideoError(false);
    setPlaybackSpeed(1);
  };

  const handleCloseDialog = () => {
    setActiveWord(null);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleReplay = () => {
    playSound.pop(stats.soundEnabled);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMarkPractice = () => {
    if (!activeWord || practicedWords.includes(activeWord.id)) return;

    const nextPracticed = [...practicedWords, activeWord.id];
    if (onUpdatePracticedWords) {
      onUpdatePracticedWords(nextPracticed);
    }

    playSound.star(stats.soundEnabled);
    onRewardStars(1);
  };

  return (
    <div className="space-y-6 text-left pb-12 transition-colors">
      {/* Page Heading */}
      <div className="space-y-1">
        <span className="text-xs font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase font-outfit">
          PEQUENOS SINAIS, GRANDES CONVERSAS
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
          Sinais do dia a dia
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl">
          Escolha um tema para aprender sinais que fazem parte da sua vida cotidiana com vídeos oficiais da UFV.
        </p>
      </div>

      {/* 4 Thematic Categories Selector Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {RECOVERED_SIGN_CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedCategory;
          const wordsCount = RECOVERED_WORDS_DATA.filter((w) => w.category === cat.id).length;
          const practicedCount = RECOVERED_WORDS_DATA.filter(
            (w) => w.category === cat.id && practicedWords.includes(w.id)
          ).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                playSound.pop(stats.soundEnabled);
                setSelectedCategory(cat.id);
              }}
              className={`p-4 rounded-3xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'border-[#2952E3] bg-blue-50/80 dark:bg-blue-950/70 shadow-md ring-2 ring-blue-400/30'
                  : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111C35] hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-3xl" aria-hidden="true">
                  {cat.emoji}
                </span>
                {practicedCount > 0 && (
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {practicedCount}/{wordsCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit leading-snug">
                  {cat.title}
                </h2>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                  {wordsCount} sinais
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Category Vocabulary Panel */}
      <section className="bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase">
              {currentCategory.subtitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit mt-0.5">
              {currentCategory.title}
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-black text-[#2952E3] dark:text-sky-300 self-start sm:self-auto">
            {practicedInCategory} / {categoryWords.length} praticados
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
          {currentCategory.description}
        </p>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categoryWords.map((word) => {
            const isPracticed = practicedWords.includes(word.id);

            return (
              <button
                key={word.id}
                type="button"
                onClick={() => handleOpenWord(word)}
                className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/90 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-98"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-2xl sm:text-3xl" aria-hidden="true">
                    {word.emoji}
                  </span>
                  {isPracticed && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit group-hover:text-[#2952E3] dark:group-hover:text-sky-400 transition-colors">
                    {word.label}
                  </h3>
                  <span className="text-[11px] font-bold text-[#2952E3] dark:text-sky-300 mt-1 inline-flex items-center gap-1">
                    {isPracticed ? '✓ Rever sinal' : '▷ Ver o sinal'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Source and Linguistic Note */}
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium pt-2 border-t border-slate-100 dark:border-slate-800/80">
          Demonstrações: Dicionário de Libras da UFV. Há variações regionais de sinais. Os desenhos nos cartões ilustram o significado; o vídeo mostra o sinal real.
        </p>
      </section>

      {/* Video Modal: Real UFV Video Player */}
      {activeWord && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseDialog();
          }}
        >
          <div className="bg-white dark:bg-[#111C35] rounded-3xl w-full max-w-lg p-5 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 relative text-left max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseDialog}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Modal Heading */}
            <div className="mb-3 pr-8">
              <span className="text-[10px] font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase">
                VAMOS PRATICAR?
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit mt-0.5 flex items-center gap-2">
                <span>{activeWord.emoji}</span>
                <span>{activeWord.label}</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-1">
                {activeWord.context}
              </p>
            </div>

            {/* Video Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-inner my-3">
              <video
                ref={videoRef}
                src={activeWord.video}
                controls
                playsInline
                preload="metadata"
                onEnded={() => setVideoWatched(true)}
                onError={() => setVideoError(true)}
                className="w-full h-full object-contain"
                aria-label={`Demonstração em Libras: ${activeWord.label}`}
              />
            </div>

            {/* Fallback notice if video takes long or errors */}
            {videoError && (
              <p className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-800 dark:text-amber-200 mb-3">
                O vídeo está demorando para carregar da UFV. Você também pode assistir na página oficial pelo link abaixo.
              </p>
            )}

            {/* Video Controls: Speed & Replay */}
            <div className="flex items-center justify-between gap-3 py-2 border-y border-slate-100 dark:border-slate-800 my-3">
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repetir</span>
              </button>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Velocidade:</span>
                <select
                  value={playbackSpeed}
                  onChange={handleSpeedChange}
                  className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                >
                  <option value={1}>Normal (1x)</option>
                  <option value={0.75}>Mais devagar (0.75x)</option>
                  <option value={0.5}>Bem devagar (0.5x)</option>
                </select>
              </label>
            </div>

            {/* Practice Action Row */}
            <div className="space-y-2.5 pt-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Observe as mãos, o rosto e o movimento. Assista e pratique no seu ritmo.
              </p>

              <button
                type="button"
                onClick={handleMarkPractice}
                disabled={practicedWords.includes(activeWord.id) || !videoWatched}
                className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  practicedWords.includes(activeWord.id)
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 cursor-default'
                    : videoWatched
                    ? 'bg-[#2952E3] text-white hover:bg-blue-700 active:scale-98 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                {practicedWords.includes(activeWord.id) ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>✓ Já praticado!</span>
                  </>
                ) : videoWatched ? (
                  <>
                    <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Já pratiquei · +1 estrela</span>
                  </>
                ) : (
                  <span>Assista ao vídeo para marcar prática</span>
                )}
              </button>
            </div>

            {/* Source Attribution Link */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 leading-tight">
              <span>Vídeo original da Universidade Federal de Viçosa / CEAD (Dicionário de Libras). </span>
              <a
                href={activeWord.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#2952E3] dark:text-sky-400 hover:underline mt-1"
              >
                <span>Abrir na UFV</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
