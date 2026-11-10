import React, { useState, useEffect, useRef } from 'react';
import { 
  RECOVERED_ALPHABET_DATA, 
  AlphabetItem,
  MOTION_LETTERS,
  UFSM_ALPHABET_VIDEO_URL
} from '../../data/librasRecoveredData';
import { UserStats } from '../../types';
import { playSound } from '../../utils/sound';
import { Volume2, Play, ChevronLeft, ChevronRight, Check, X, ExternalLink, Sparkles, Gauge } from 'lucide-react';

interface AlphabetScreenProps {
  stats: UserStats;
  onRewardStars: (amount: number) => void;
  seenLetters?: string[];
  onUpdateSeenLetters?: (letters: string[]) => void;
}

export const AlphabetScreen: React.FC<AlphabetScreenProps> = ({
  stats,
  onRewardStars,
  seenLetters: propSeenLetters,
  onUpdateSeenLetters
}) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const seenLetters = propSeenLetters || ['A'];
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [videoPlaybackRate, setVideoPlaybackRate] = useState<number>(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentIndex = RECOVERED_ALPHABET_DATA.findIndex(
    (item) => item.letter === selectedLetter
  );
  const currentItem: AlphabetItem =
    RECOVERED_ALPHABET_DATA[currentIndex >= 0 ? currentIndex : 0];

  const handleSelectLetter = (letter: string) => {
    playSound.pop(stats.soundEnabled);
    setSelectedLetter(letter);

    if (!seenLetters.includes(letter)) {
      const nextSeen = [...seenLetters, letter];
      if (onUpdateSeenLetters) {
        onUpdateSeenLetters(nextSeen);
      }
      playSound.star(stats.soundEnabled);
      onRewardStars(1);
    }
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + RECOVERED_ALPHABET_DATA.length) % RECOVERED_ALPHABET_DATA.length;
    handleSelectLetter(RECOVERED_ALPHABET_DATA[prevIndex].letter);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % RECOVERED_ALPHABET_DATA.length;
    handleSelectLetter(RECOVERED_ALPHABET_DATA[nextIndex].letter);
  };

  const handleSpeak = () => {
    playSound.speakText(
      `Letra ${currentItem.letter}. ${currentItem.letter} de ${currentItem.example}.`,
      stats.soundEnabled
    );
  };

  return (
    <div className="space-y-6 text-left pb-12 transition-colors">
      {/* Page Heading */}
      <div className="space-y-1">
        <span className="text-xs font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase font-outfit">
          DE A A Z
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
          O alfabeto nas suas mãos
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl">
          Escolha uma letra, observe a mão e experimente fazer também. Cada nova letra explorada vale 1 estrela!
        </p>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Letter Selector Grid */}
        <section className="lg:col-span-6 bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <h2 className="text-lg font-black text-slate-800 dark:text-white font-outfit">
              Uma letra de cada vez
            </h2>
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-black text-[#2952E3] dark:text-sky-300">
              {seenLetters.length} / 26
            </span>
          </div>

          {/* Clean 6-col / 7-col Responsive Grid of Letters */}
          <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
            {RECOVERED_ALPHABET_DATA.map((item) => {
              const isSelected = item.letter === selectedLetter;
              const isExplored = seenLetters.includes(item.letter);

              return (
                <button
                  key={item.letter}
                  type="button"
                  onClick={() => handleSelectLetter(item.letter)}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center font-black text-base sm:text-lg transition-all cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? 'bg-[#2952E3] text-white shadow-md ring-4 ring-blue-300/40 dark:ring-blue-600/40'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80'
                  }`}
                  aria-pressed={isSelected}
                  title={`Letra ${item.letter}`}
                >
                  <span>{item.letter}</span>
                  {isExplored && (
                    <span
                      className={`text-[10px] leading-none mt-0.5 ${
                        isSelected ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tip Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
            <span>
              ★ Cada nova letra explorada vale <b>1 estrela</b>. Experimente fazer a mão também!
            </span>
          </div>

          {/* Button: Ver o alfabeto em movimento (UFSM video) */}
          <button
            type="button"
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border-2 border-[#2952E3] text-[#2952E3] dark:text-sky-300 hover:bg-[#2952E3] hover:text-white transition-all text-sm font-black uppercase tracking-wider cursor-pointer active:scale-98 shadow-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>▷ Ver o alfabeto em movimento</span>
          </button>
        </section>

        {/* Right Column: Prominent Letter & Sign Detail Display */}
        <section className="lg:col-span-6 bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <span className="text-xs font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase font-outfit">
              LETRA {currentItem.letter}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                currentItem.isMotion
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {currentItem.isMotion ? 'Com movimento ✦' : 'Observe a mão'}
            </span>
          </div>

          {/* Letter and Sign in Big Scale */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4 bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
            {/* Big Letter Character */}
            <span className="text-7xl sm:text-8xl font-black text-[#2952E3] dark:text-sky-400 font-outfit leading-none select-none">
              {currentItem.letter}
            </span>

            {/* Hand Sign Image from UTFPR Libras 2016 */}
            <div className="w-44 h-44 sm:w-56 sm:h-56 bg-white dark:bg-[#111C35] rounded-2xl p-2 shadow-xs border border-slate-200/80 dark:border-slate-700 flex items-center justify-center overflow-hidden">
              <img
                src={currentItem.imageSrc}
                alt={`Configuração da letra ${currentItem.letter} em Libras`}
                className="w-full h-full object-contain filter dark:invert dark:brightness-125"
                draggable={false}
              />
            </div>
          </div>

          {/* Word Example in Portuguese */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100/90 dark:border-blue-900/60">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl" aria-hidden="true">
                {currentItem.emoji}
              </span>
              <div>
                <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                  EM PORTUGUÊS
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-outfit">
                  {currentItem.letter} de {currentItem.example}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSpeak}
              className="p-2.5 rounded-xl border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
              title="Ouvir pronúncia"
              aria-label="Ouvir pronúncia"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Pedagogical Note */}
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center font-medium">
            A mão acima representa a letra do alfabeto manual, não o sinal da palavra inteira.
          </p>

          {/* Navigation Arrows Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="flex items-center gap-1 py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-black uppercase cursor-pointer"
              aria-label="Letra anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-black text-slate-500 dark:text-slate-400">
              {currentIndex + 1} de 26
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-black uppercase cursor-pointer"
              aria-label="Próxima letra"
            >
              <span>Próxima</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* Video Modal: Alfabeto em Movimento (UFSM / Libras ON) */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVideoModalOpen(false);
          }}
        >
          <div className="bg-white dark:bg-[#111C35] rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative text-left">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar vídeo"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase">
                ALFABETO COMPLETO EM MOVIMENTO
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit mt-0.5">
                Demonstração em Libras · UFSM
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Vídeo oficial do projeto Libras ON da Universidade Federal de Santa Maria (UFSM) sob licença CC BY-NC-SA 4.0.
              </p>
            </div>

            {/* Clean Native Video Player */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center shadow-inner border border-slate-800">
              <video
                ref={videoRef}
                src="https://ntetube.nte.ufsm.br/repositorio/1f20d80b2f6ed5c8b42d83891d1eeaf7/720p.mp4"
                controls
                playsInline
                autoPlay
                className="w-full h-full object-contain"
                onPlay={() => {
                  if (videoRef.current) {
                    videoRef.current.playbackRate = videoPlaybackRate;
                  }
                }}
              >
                Seu navegador não suporta a reprodução deste vídeo.
              </video>
            </div>

            {/* Video Speed & Helper Controls */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <Gauge className="w-4 h-4 text-[#2952E3] dark:text-sky-400" />
                <span className="font-bold">Velocidade:</span>
                {[0.5, 0.75, 1].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setVideoPlaybackRate(rate);
                      if (videoRef.current) {
                        videoRef.current.playbackRate = rate;
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      videoPlaybackRate === rate
                        ? 'bg-[#2952E3] text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {rate === 0.5 ? '0.5x (Câmera lenta)' : rate === 0.75 ? '0.75x' : '1x (Normal)'}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                Vídeo com sinais de A a Z
              </span>
            </div>

            {/* Video footer links */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
                Fonte oficial: NTE Tube / UFSM (Libras ON).
              </span>
              <a
                href={UFSM_ALPHABET_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#2952E3] dark:text-sky-400 hover:underline"
              >
                <span>Ver página do repositório UFSM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
