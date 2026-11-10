import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Trophy, 
  RotateCcw, 
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALPHABET_TRAIL_STAGES } from '../../data/librasTrailAlphabetData';
import { TrailAlphabetStage, UserStats } from '../../types';
import { playSound } from '../../utils/sound';

interface TrailScreenProps {
  completedStages: string[];
  userStats: UserStats;
  soundEnabled: boolean;
  onCompleteStage: (stageId: string, rewardStars: number, rewardXp: number) => void;
  onOpenTip?: () => void;
  onNavigateToAlphabet?: () => void;
  onNavigateToMemoryGame?: () => void;
}

export const TrailScreen: React.FC<TrailScreenProps> = ({
  completedStages,
  userStats,
  soundEnabled,
  onCompleteStage,
  onOpenTip,
  onNavigateToAlphabet,
  onNavigateToMemoryGame
}) => {
  // Navigation states: 'list' | 'observe' | 'quiz' | 'celebration'
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [stageViewMode, setStageViewMode] = useState<'observe' | 'quiz'>('observe');
  
  // Quiz specific state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showTipBubble, setShowTipBubble] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const activeStage: TrailAlphabetStage | undefined = ALPHABET_TRAIL_STAGES.find(s => s.id === activeStageId);

  // Check if a stage is accessible: Stage 1 is always unlocked. Stage N requires Stage N-1 to be completed.
  const isStageUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevStage = ALPHABET_TRAIL_STAGES[index - 1];
    return completedStages.includes(prevStage.id);
  };

  const handleSelectStage = (stage: TrailAlphabetStage, index: number) => {
    if (!isStageUnlocked(index)) {
      playSound.error(soundEnabled);
      return;
    }
    playSound.pop(soundEnabled);
    setActiveStageId(stage.id);
    setStageViewMode('observe');
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setAnswerState('idle');
    setShowTipBubble(false);
  };

  const handleStartQuiz = () => {
    playSound.pop(soundEnabled);
    setStageViewMode('quiz');
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setAnswerState('idle');
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (answerState === 'correct') return; // already answered correctly

    setSelectedOptionId(optionId);
    if (isCorrect) {
      setAnswerState('correct');
      playSound.correct(soundEnabled);
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Confetti fallback
      }

      // Automatically advance or show success
      setTimeout(() => {
        if (!activeStage) return;
        if (currentQuestionIndex + 1 < activeStage.questions.length) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOptionId(null);
          setAnswerState('idle');
        } else {
          // Finished the stage!
          triggerStageCelebration(activeStage);
        }
      }, 1100);
    } else {
      setAnswerState('wrong');
      playSound.error(soundEnabled);
    }
  };

  const triggerStageCelebration = (stage: TrailAlphabetStage) => {
    playSound.celebrate(soundEnabled);
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
    setShowCelebrationModal(true);
    onCompleteStage(stage.id, stage.rewardStars, stage.rewardXp);
  };

  const completedCount = completedStages.filter(id => ALPHABET_TRAIL_STAGES.some(s => s.id === id)).length;
  const totalStages = ALPHABET_TRAIL_STAGES.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalStages) * 100));

  // ==========================================
  // VIEW 1: STAGE OBSERVATION (Image 2 format)
  // ==========================================
  if (activeStage && stageViewMode === 'observe') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
        {/* Main Observation Card */}
        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
          {/* Top Bar with Return Link and Stage Badge */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => {
                playSound.pop(soundEnabled);
                setActiveStageId(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar à trilha</span>
            </button>

            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-900/60">
              Etapa {activeStage.stageNumber} · {activeStage.title}
            </span>
          </div>

          {/* Section Kicker & Instructions */}
          <div className="space-y-1.5 mb-6 text-left">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase text-blue-600 dark:text-sky-400 tracking-wider font-outfit">
              1. OBSERVE AS MÃOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-outfit">
              {activeStage.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Veja a letra e a mão. Experimente fazer com a sua!
            </p>
          </div>

          {/* Letters & Hand Sign Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 my-8">
            {activeStage.letters.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-[#F4F1FD] dark:bg-[#181B38] p-3 sm:p-4 border border-indigo-100/70 dark:border-indigo-900/40 flex flex-col items-center transition-all hover:scale-102 hover:shadow-xs"
              >
                <span className="text-base sm:text-lg font-black text-indigo-700 dark:text-indigo-300 mb-2 font-outfit">
                  {item.letter}
                </span>

                <div className="w-full aspect-square bg-white dark:bg-[#11162B] rounded-xl p-2 flex items-center justify-center border border-indigo-100/50 dark:border-slate-800 shadow-2xs">
                  <img
                    src={item.signImagePath}
                    alt={`Sinal da letra ${item.letter} em Libras`}
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
                    loading="eager"
                  />
                </div>

                {item.tip && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center mt-2 line-clamp-2" title={item.tip}>
                    {item.tip}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action Row */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              Observe. Imite. Descubra.
            </span>

            <button
              onClick={handleStartQuiz}
              className="btn-3d btn-primary-3d w-full sm:w-auto px-8 py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer font-outfit"
            >
              <span>Vamos ao desafio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Lumi Companion Card (Image 2 & 3 format) */}
        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-4 text-left transition-colors">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 relative flex items-center justify-center">
            <img
              src="/assets/mascot_stitch.png"
              alt="Lumi Mascote"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
              Lumi está com você
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 line-clamp-2">
              Observe as mãos antes do desafio. Você pode rever as letras quando quiser.
            </p>
            <button
              onClick={() => setShowTipBubble(!showTipBubble)}
              className="mt-1 text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Me dá uma dica</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {showTipBubble && (
              <div className="mt-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-medium">
                💡 <strong>Dica do Lumi:</strong> Tente posicionar a mão na frente do seu peito ou rosto, imitando o mesmo formato da ilustração antes de clicar no desafio!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: QUIZ CHALLENGE (Image 3 format)
  // ==========================================
  if (activeStage && stageViewMode === 'quiz') {
    const currentQuestion = activeStage.questions[currentQuestionIndex];
    const totalQuestions = activeStage.questions.length;

    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6">
        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
          {/* Top Bar with Return Link and Stage Badge */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <button
              onClick={() => {
                playSound.pop(soundEnabled);
                setStageViewMode('observe');
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar à trilha</span>
            </button>

            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-100 dark:border-indigo-900/60">
              Etapa {activeStage.stageNumber} · {activeStage.title}
            </span>
          </div>

          {/* Section Kicker and Question Progress (Image 3: "2. ENCONTRE A MÃO" and "1 de 5") */}
          <div className="flex items-center justify-between text-xs font-extrabold uppercase text-blue-600 dark:text-sky-400 tracking-wider mb-2 font-outfit">
            <span>2. ENCONTRE A MÃO</span>
            <span className="text-slate-500 dark:text-slate-400 font-bold">
              {currentQuestionIndex + 1} de {totalQuestions}
            </span>
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-8">
            <div 
              className="bg-blue-600 dark:bg-sky-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Central Question Display */}
          <div className="text-center space-y-3 mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit">
              Qual mão combina com esta letra?
            </h3>

            {/* Big Target Letter in Purple */}
            <div className="py-2">
              <span className="text-6xl sm:text-7xl font-black text-[#5B3DF5] dark:text-[#8870FF] font-outfit tracking-tight select-none">
                {currentQuestion.targetLetter}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
              Toque na mão que representa <strong>{currentQuestion.targetLetter}</strong>.
            </p>
          </div>

          {/* 3 Hand Option Cards (Image 3 layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto my-6">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrectSelection = isSelected && answerState === 'correct';
              const isWrongSelection = isSelected && answerState === 'wrong';

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  disabled={answerState === 'correct'}
                  className={`relative p-5 rounded-3xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    isCorrectSelection
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/60 ring-2 ring-emerald-400 shadow-md'
                      : isWrongSelection
                      ? 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/50 animate-shake shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B33] hover:border-indigo-400 hover:shadow-md'
                  }`}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                    <img
                      src={opt.signImagePath}
                      alt={`Opção de sinal ${idx + 1}`}
                      className="w-full h-full object-contain pointer-events-none select-none transition-transform group-hover:scale-105"
                      loading="eager"
                    />
                  </div>

                  {/* Number Badge at bottom (1, 2, 3) */}
                  <span className={`mt-3 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                    isCorrectSelection
                      ? 'bg-emerald-500 text-white'
                      : isWrongSelection
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>

                  {isCorrectSelection && (
                    <span className="absolute top-2 right-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  )}
                  {isWrongSelection && (
                    <span className="absolute top-2 right-2 text-rose-500">
                      <XCircle className="w-5 h-5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Helper Message */}
          <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              {answerState === 'wrong' ? (
                <span className="text-rose-600 dark:text-rose-400 font-bold">
                  Ops! Quase lá. Tente outra mão com calma!
                </span>
              ) : answerState === 'correct' ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1.5 justify-center sm:justify-start">
                  <Check className="w-4 h-4 stroke-[3]" />
                  Mandou muito bem! Sinal correto!
                </span>
              ) : (
                <span>Você pode tentar quantas vezes quiser.</span>
              )}
            </div>

            <button
              onClick={() => {
                playSound.pop(soundEnabled);
                setStageViewMode('observe');
              }}
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 underline transition-colors cursor-pointer"
            >
              Rever as letras
            </button>
          </div>
        </div>

        {/* Bottom Lumi Companion Card */}
        <div className="bg-white dark:bg-[#111C35] rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-4 text-left transition-colors">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 relative flex items-center justify-center">
            <img
              src="/assets/mascot_stitch.png"
              alt="Lumi Mascote"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
              Lumi está com você
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 line-clamp-2">
              Observe as mãos antes do desafio. Pode rever as letras quando quiser.
            </p>
            {currentQuestion.hint && (
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-1">
                Dica: {currentQuestion.hint}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: MAIN TRAIL TIMELINE (Image 1 format)
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      {/* Header Section from Image 1 */}
      <div className="text-left space-y-1">
        <span className="text-[11px] sm:text-xs font-black uppercase text-blue-600 dark:text-sky-400 tracking-wider font-outfit">
          CADA PASSO É UMA DESCOBERTA
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
          Sua trilha de aprendizado
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
          Observe, pratique e conquiste estrelas. Você pode repetir quando quiser.
        </p>
      </div>

      {/* Grid: Left Column (Timeline) & Right Column (Lumi Progress Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: O caminho das letras (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-outfit">
              O caminho das letras
            </h2>
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-black border border-indigo-100 dark:border-indigo-900/60 font-outfit">
              {completedCount} / {totalStages} etapas
            </span>
          </div>

          {/* Vertical Timeline with Dotted Connector Line */}
          <div className="relative space-y-8 sm:space-y-10 pl-2">
            {ALPHABET_TRAIL_STAGES.map((stage, idx) => {
              const isCompleted = completedStages.includes(stage.id);
              const isUnlocked = isStageUnlocked(idx);
              const isCurrent = isUnlocked && !isCompleted;
              const isLast = idx === ALPHABET_TRAIL_STAGES.length - 1;

              return (
                <div key={stage.id} className="relative flex items-start gap-4 sm:gap-6 group text-left">
                  {/* Vertical Dotted Connector Line between nodes */}
                  {!isLast && (
                    <div 
                      className={`absolute left-[19px] sm:left-[23px] top-[42px] sm:top-[50px] bottom-[-32px] sm:bottom-[-40px] w-0.5 border-l-2 border-dashed ${
                        isCompleted 
                          ? 'border-emerald-300 dark:border-emerald-800' 
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    />
                  )}

                  {/* Circular Step Node */}
                  <button
                    onClick={() => handleSelectStage(stage, idx)}
                    disabled={!isUnlocked}
                    className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isUnlocked ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-not-allowed opacity-60'
                    } ${
                      isCompleted
                        ? 'bg-[#008272] text-white shadow-sm ring-4 ring-[#008272]/20'
                        : isCurrent
                        ? 'bg-[#2952E3] text-white shadow-md ring-4 ring-blue-300 dark:ring-blue-900/60 animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                    ) : isCurrent ? (
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                    ) : (
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>

                  {/* Stage Text Content */}
                  <div 
                    onClick={() => handleSelectStage(stage, idx)}
                    className={`flex-1 min-w-0 pt-0.5 ${isUnlocked ? 'cursor-pointer' : ''}`}
                  >
                    <span className="text-[10px] sm:text-[11px] font-black uppercase text-blue-600 dark:text-sky-400 tracking-wider font-outfit block">
                      ETAPA {stage.stageNumber}
                    </span>
                    <h3 className={`text-base sm:text-lg font-black font-outfit transition-colors ${
                      isUnlocked 
                        ? 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400' 
                        : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                      {stage.lettersSummary}
                    </p>
                  </div>

                  {/* Stage Reward Indicator */}
                  <div className="hidden sm:flex items-center gap-1 shrink-0 pt-1 text-xs font-bold text-amber-500 dark:text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>+{stage.rewardStars}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lumi Progress Card (Image 1 layout) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-gradient-to-b from-[#F3F6FF] to-[#E8EFFF] dark:from-[#131F3F] dark:to-[#0C1428] rounded-3xl p-6 border border-indigo-100 dark:border-indigo-950 flex flex-col items-center text-center shadow-xs">
            {/* Mascot Image */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 relative flex items-center justify-center my-2">
              <img
                src="/assets/mascot_stitch.png"
                alt="Lumi segurando uma estrela dourada"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl animate-float-gentle"
              />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-outfit mt-2">
              Cada descoberta conta!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Sem pressa. Você pode tentar quantas vezes quiser.
            </p>

            {/* Stage Progress Details */}
            <div className="w-full mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Progresso da Trilha</span>
                <span className="font-outfit text-blue-600 dark:text-sky-400">
                  {completedCount} de {totalStages} etapas
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#008272] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Three Reward Badges Row (Star, Grid, Trophy from Image 1) */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => onNavigateToAlphabet?.()}
                title="Ver todas as letras do Alfabeto"
                className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xs cursor-pointer"
              >
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </button>

              <button
                onClick={() => onNavigateToMemoryGame?.()}
                title="Jogar Jogo da Memória"
                className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xs cursor-pointer"
              >
                <Award className="w-5 h-5 text-amber-600" />
              </button>

              <div 
                title={`${userStats.stars} estrelas conquistadas`}
                className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center shadow-2xs"
              >
                <Trophy className="w-5 h-5 text-amber-600" />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-6">
              Seu progresso fica salvo na sua conta.
            </p>
          </div>
        </div>
      </div>

      {/* Stage Completed Celebration Modal */}
      {showCelebrationModal && activeStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scaleUp">
            <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
              <img
                src="/assets/mascot_stitch.png"
                alt="Lumi Comemorando"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl animate-bounce"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-500 tracking-wider">
                PARABÉNS! ETAPA CONCLUÍDA
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
                {activeStage.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Você dominou os sinais desta etapa e avançou no Caminho das Letras!
              </p>
            </div>

            <div className="py-3 px-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                <span>+{activeStage.rewardStars} Estrelas</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-sky-400 font-extrabold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>+{activeStage.rewardXp} XP</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  playSound.pop(soundEnabled);
                  setShowCelebrationModal(false);
                  setActiveStageId(null);
                }}
                className="btn-3d btn-primary-3d w-full py-3.5 px-6 rounded-2xl text-white font-black text-sm uppercase tracking-wider cursor-pointer font-outfit"
              >
                Continuar na Trilha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
