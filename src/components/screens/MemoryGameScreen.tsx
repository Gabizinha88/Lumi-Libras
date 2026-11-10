import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { UserStats } from '../../types';
import { playSound } from '../../utils/sound';
import { RotateCcw, Trophy, Sparkles, Check } from 'lucide-react';
import { RECOVERED_ALPHABET_DATA } from '../../data/librasRecoveredData';

interface MemoryGameScreenProps {
  stats: UserStats;
  onRewardStars: (amount: number) => void;
  initialMode?: 'express' | 'normal' | 'master';
}

interface MemoryCard {
  id: string;
  letter: string;
  kind: 'letter' | 'sign';
}

export const MemoryGameScreen: React.FC<MemoryGameScreenProps> = ({
  stats,
  onRewardStars,
  initialMode
}) => {
  const [pairsCount, setPairsCount] = useState<number>(initialMode === 'express' ? 4 : 4);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [openCardIds, setOpenCardIds] = useState<string[]>([]);
  const [matchedLetters, setMatchedLetters] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    'Vire duas cartas: uma letra e uma mão.'
  );

  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Available non-motion letters for easier pairing
  const availableLetters = RECOVERED_ALPHABET_DATA
    .filter((item) => !item.isMotion)
    .map((item) => item.letter);

  const startNewGame = (pairs: number = pairsCount) => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }

    // Shuffle and pick letters
    const shuffledPool = [...availableLetters].sort(() => Math.random() - 0.5);
    const chosenLetters = shuffledPool.slice(0, pairs);

    // Preload sign images immediately to prevent delay or blank cards
    chosenLetters.forEach((letter) => {
      const img1 = new Image();
      img1.src = `/assets/signs/${letter}.png`;
      const img2 = new Image();
      img2.src = `/signs/${letter}.png`;
    });

    // Create 2 cards per letter: one with text letter, one with hand sign
    const deck: MemoryCard[] = [];
    chosenLetters.forEach((letter) => {
      deck.push({ id: `${letter}-letter`, letter, kind: 'letter' });
      deck.push({ id: `${letter}-sign`, letter, kind: 'sign' });
    });

    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    setPairsCount(pairs);
    setCards(shuffledDeck);
    setOpenCardIds([]);
    setMatchedLetters([]);
    setMoves(0);
    setIsWon(false);
    setFeedbackMessage('Vire duas cartas: uma letra e uma mão.');
    setIsGameStarted(true);
  };

  const handleFlip = (card: MemoryCard) => {
    if (isWon) return;
    if (openCardIds.length >= 2) return;
    if (openCardIds.includes(card.id)) return;
    if (matchedLetters.includes(card.letter)) return;

    playSound.pop(stats.soundEnabled);

    const nextOpen = [...openCardIds, card.id];
    setOpenCardIds(nextOpen);

    if (nextOpen.length === 1) {
      setFeedbackMessage('Agora escolha a outra carta para tentar o par.');
    } else if (nextOpen.length === 2) {
      setMoves((m) => m + 1);

      const firstCard = cards.find((c) => c.id === nextOpen[0]);
      const secondCard = card;

      if (firstCard && firstCard.letter === secondCard.letter) {
        // MATCH!
        playSound.star(stats.soundEnabled);
        const nextMatched = [...matchedLetters, secondCard.letter];
        setMatchedLetters(nextMatched);
        setOpenCardIds([]);
        setFeedbackMessage('✓ Encontrou um par! Muito bem!');

        if (nextMatched.length === pairsCount) {
          // VICTORY!
          setIsWon(true);
          setFeedbackMessage('🎉 Parabéns! Você encontrou todos os pares!');
          onRewardStars(5);

          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch (e) {
            console.error(e);
          }
        }
      } else {
        // NO MATCH: give user time to observe, then flip back
        setFeedbackMessage('Cartas diferentes. Observe e tente outra vez!');
        flipTimeoutRef.current = setTimeout(() => {
          setOpenCardIds([]);
          setFeedbackMessage('Vire duas cartas: uma letra e uma mão.');
        }, 1100);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6 text-left pb-12 transition-colors">
      {/* Page Heading */}
      <div className="space-y-1">
        <span className="text-xs font-black tracking-widest text-[#2952E3] dark:text-sky-400 uppercase font-outfit">
          OLHE, LEMBRE E COMBINE
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
          Jogo da memória
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-2xl">
          Uma letra e uma mão formam um par. Sem pressa e sem perder vidas!
        </p>
      </div>

      {/* When Game Has Not Started: Welcome / Mode Selector Panel */}
      {!isGameStarted ? (
        <section className="bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center max-w-2xl mx-auto space-y-6">
          {/* Visual Pair Demo */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="w-20 h-28 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border-2 border-blue-200 dark:border-blue-800 flex items-center justify-center text-4xl font-black text-[#2952E3] dark:text-sky-400 shadow-sm font-outfit">
              A
            </div>
            <span className="text-2xl font-black text-slate-400">+</span>
            <div className="w-20 h-28 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center p-2 shadow-sm">
              <img
                src="/assets/signs/A.png"
                alt="Sinal da letra A"
                className="w-full h-full object-contain filter dark:invert"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit">
              Uma letra + uma mão = um par!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
              Vire duas cartas. Se combinarem, elas continuam abertas. Se forem diferentes, memorize a posição e tente novamente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => startNewGame(4)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#2952E3] text-white hover:bg-blue-700 font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            >
              ▷ Jogar com 4 pares
            </button>

            <button
              type="button"
              onClick={() => startNewGame(6)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-2 border-[#2952E3] text-[#2952E3] dark:text-sky-300 hover:bg-blue-50 dark:hover:bg-blue-950 font-black text-sm uppercase tracking-wider transition-all cursor-pointer active:scale-95"
            >
              Desafio: 6 pares →
            </button>
          </div>
        </section>
      ) : (
        /* Playing / Active Board Panel */
        <section className="bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
          {/* Header Controls */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-black text-[#2952E3] dark:text-sky-300">
              {matchedLetters.length} / {pairsCount} pares · {moves} jogadas
            </span>

            <button
              type="button"
              onClick={() => startNewGame(pairsCount)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nova partida</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div
            className={`grid gap-3 max-w-2xl mx-auto ${
              pairsCount === 4
                ? 'grid-cols-4'
                : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-4'
            }`}
          >
            {cards.map((card, index) => {
              const isMatched = matchedLetters.includes(card.letter);
              const isOpen = isMatched || openCardIds.includes(card.id);

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleFlip(card)}
                  disabled={isOpen || openCardIds.length >= 2 || isWon}
                  className="aspect-[3/4] rounded-2xl relative select-none cursor-pointer [perspective:1000px] outline-none group"
                  aria-label={
                    isMatched
                      ? `Par ${card.letter} encontrado`
                      : isOpen
                      ? `Carta ${card.letter} aberta`
                      : `Carta ${index + 1}`
                  }
                >
                  <div
                    className={`w-full h-full rounded-2xl relative transition-transform duration-300 [transform-style:preserve-3d] ${
                      isOpen ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* Card Back (Hidden / Face down - Official Logo from Image 3) */}
                    <div
                      className={`absolute inset-0 rounded-2xl [backface-visibility:hidden] flex flex-col items-center justify-center p-2 text-white border-2 border-[#b7c7fb] border-b-4 bg-[#3E63EA] dark:bg-[#2546C4] shadow-sm transition-all overflow-hidden ${
                        isOpen ? 'pointer-events-none' : 'group-hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                        <img
                          src="/assets/logo_recovered.png"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/assets/aistudio/image_55e3b101.png';
                          }}
                          alt="Lumi Libras Logo"
                          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
                          loading="eager"
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-white uppercase select-none drop-shadow-xs font-outfit mt-1">
                        LUMI LIBRAS
                      </span>
                    </div>

                    {/* Card Front (Revealed / Face up) */}
                    <div
                      className={`absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-2 border-2 transition-all ${
                        isMatched
                          ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                          : 'bg-white dark:bg-[#1A2644] border-blue-500 shadow-md ring-2 ring-blue-300 dark:ring-blue-600'
                      }`}
                    >
                      {card.kind === 'letter' ? (
                        <span className="text-4xl sm:text-5xl font-black text-[#2952E3] dark:text-sky-400 font-outfit select-none">
                          {card.letter}
                        </span>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-1">
                          <img
                            src={`/assets/signs/${card.letter}.png`}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = `/signs/${card.letter}.png`;
                            }}
                            alt={`Sinal da letra ${card.letter}`}
                            className="w-full h-full object-contain filter dark:invert"
                            draggable={false}
                          />
                        </div>
                      )}

                      {isMatched && (
                        <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Status Message */}
          <div
            className={`p-3 rounded-2xl text-center text-xs sm:text-sm font-bold border transition-colors ${
              isWon
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {feedbackMessage}
          </div>

          {/* Victory Celebration Card */}
          {isWon && (
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-amber-50 to-yellow-100/70 dark:from-amber-950/50 dark:to-yellow-900/40 border-2 border-amber-300 dark:border-amber-700 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-amber-400 text-white flex items-center justify-center mx-auto text-3xl shadow-md">
                🏆
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-100 font-outfit">
                  Memória de explorador!
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-bold mt-1">
                  Você completou o jogo em {moves} jogadas e ganhou +5 estrelas!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => startNewGame(pairsCount)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Jogar de novo
                </button>

                <button
                  type="button"
                  onClick={() => startNewGame(pairsCount === 4 ? 6 : 4)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-amber-600 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  {pairsCount === 4 ? 'Desafio: 6 pares →' : 'Modo 4 pares'}
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
