import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Volume2, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Video, 
  Gift, 
  Trophy, 
  AlertCircle, 
  Check
} from 'lucide-react';
import { RealHandSignImage } from '../media/RealHandSignImage';
import { SignVideoPlayer } from '../media/SignVideoPlayer';
import { LumiMascot } from '../LumiMascot';
import { playSound } from '../../utils/sound';
import { TRAIL_LESSONS, TrailLessonData } from '../../data/librasTrailLessons';

interface LessonModalProps {
  isOpen: boolean;
  nodeId?: string;
  onClose: () => void;
  onCompleteLesson: (nodeId: string, starsReward: number, xpReward: number) => void;
  soundEnabled: boolean;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  nodeId = 'node-1',
  onClose,
  onCompleteLesson,
  soundEnabled
}) => {
  const lessonData: TrailLessonData = TRAIL_LESSONS[nodeId] || TRAIL_LESSONS['node-1'];

  const [step, setStep] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Chest interactive state for node-5
  const [chestOpened, setChestOpened] = useState<boolean>(false);

  // Challenge state for node-6
  const [challengeStep, setChallengeStep] = useState<number>(0);
  const [challengeSelected, setChallengeSelected] = useState<number | null>(null);
  const [challengeAnswers, setChallengeAnswers] = useState<boolean[]>([]);

  // Reset state whenever modal opens or nodeId changes
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setQuizAnswer(null);
      setIsQuizSubmitted(false);
      setIsQuizCorrect(false);
      setIsCompleted(false);
      setActiveVideoModal(null);
      setChestOpened(false);
      setChallengeStep(0);
      setChallengeSelected(null);
      setChallengeAnswers([]);
    }
  }, [isOpen, nodeId]);

  if (!isOpen) return null;

  const totalSteps = lessonData.type === 'lesson' 
    ? lessonData.steps.length + (lessonData.quiz ? 1 : 0)
    : 1;

  const isCurrentQuizStep = lessonData.type === 'lesson' && lessonData.quiz && step === lessonData.steps.length;

  const handleQuizOptionClick = (idx: number) => {
    if (isQuizSubmitted) return;
    playSound.pop(soundEnabled);
    setQuizAnswer(idx);
  };

  const handleSubmitQuiz = () => {
    if (quizAnswer === null || !lessonData.quiz) return;
    setIsQuizSubmitted(true);
    const correct = quizAnswer === lessonData.quiz.correctIndex;
    setIsQuizCorrect(correct);

    if (correct) {
      playSound.star(soundEnabled);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    } else {
      playSound.pop(soundEnabled);
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    playSound.star(soundEnabled);
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
    onCompleteLesson(lessonData.nodeId, lessonData.starsReward, lessonData.xpReward);
  };

  // Chest opener for node-5
  const handleOpenChest = () => {
    if (chestOpened) return;
    setChestOpened(true);
    playSound.star(soundEnabled);
    try {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    } catch {
      // ignore
    }
    setTimeout(() => {
      handleFinish();
    }, 1200);
  };

  // Challenge handler for node-6
  const handleChallengeNext = () => {
    if (challengeSelected === null || !lessonData.challengeQuizzes) return;
    const currentQ = lessonData.challengeQuizzes[challengeStep];
    const isCorr = challengeSelected === currentQ.correctIndex;
    const updatedAnswers = [...challengeAnswers, isCorr];
    setChallengeAnswers(updatedAnswers);

    if (challengeStep < lessonData.challengeQuizzes.length - 1) {
      setChallengeStep((s) => s + 1);
      setChallengeSelected(null);
      playSound.pop(soundEnabled);
    } else {
      // Finalized all challenge questions
      handleFinish();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-white dark:bg-[#111C35] rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col p-5 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors">
          {/* Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black">
                {lessonData.type === 'chest' ? '🎁' : lessonData.type === 'challenge' ? '🏆' : '✨'}
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-sky-400">
                  {lessonData.type === 'chest' ? 'BAÚ MÁGICO' : lessonData.type === 'challenge' ? 'DESAFIO DE MESTRE' : 'LIÇÃO EM LIBRAS'}
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {lessonData.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto py-4 text-center">
            {!isCompleted ? (
              <>
                {/* 1. STANDARD LESSON MODE (node-1, node-2, node-3, node-4) */}
                {lessonData.type === 'lesson' && (
                  <div>
                    {!isCurrentQuizStep ? (
                      /* Pedagogical Step with Real Hand Photo & Video */
                      <div className="space-y-4 text-left">
                        {(() => {
                          const currentStepData = lessonData.steps[step];
                          if (!currentStepData) return null;

                          return (
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                                <div className="relative shrink-0 flex flex-col items-center">
                                  <div className="p-2 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                                    <RealHandSignImage
                                      letterOrSign={currentStepData.signLetterOrId || 'A'}
                                      size={110}
                                      showBadge={false}
                                      className="rounded-xl overflow-hidden"
                                    />
                                  </div>
                                  {currentStepData.badgeText && (
                                    <span className="mt-2 px-3 py-0.5 rounded-full bg-blue-600 text-[11px] font-black text-white shadow-xs">
                                      {currentStepData.badgeText}
                                    </span>
                                  )}
                                </div>

                                <div className="flex-1 space-y-2 text-left">
                                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                                    {currentStepData.title}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                                    {currentStepData.mainInstruction}
                                  </p>

                                  <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                                    <span className="font-bold text-blue-900 dark:text-blue-300 block mb-0.5">
                                      Anatomia correta da mão:
                                    </span>
                                    {currentStepData.anatomicalNote}
                                  </div>

                                  {currentStepData.videoUrl && (
                                    <button
                                      onClick={() => setActiveVideoModal(currentStepData.videoUrl || null)}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-transform"
                                    >
                                      <Video className="w-3.5 h-3.5" />
                                      <span>Assistir Demonstração em Vídeo Real (0.5x)</span>
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Pro-Tip Box */}
                              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                                <span className="text-2xl">{currentStepData.tipEmoji || '💡'}</span>
                                <div>
                                  <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                                    Dica do Lumi:
                                  </div>
                                  <div className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                                    {currentStepData.tipText}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      /* Quiz Step */
                      <div className="space-y-5 text-left">
                        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
                          <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300 tracking-wider">
                            DESAFIO RÁPIDO DO LUMI
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                            {lessonData.quiz?.question}
                          </h3>
                        </div>

                        <div className="space-y-2.5">
                          {lessonData.quiz?.options.map((opt, idx) => {
                            const isSelected = quizAnswer === idx;
                            const isCorrect = idx === lessonData.quiz?.correctIndex;

                            let btnStyle = 'bg-white dark:bg-[#111C35] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400';
                            if (isQuizSubmitted) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                              } else if (isSelected && !isCorrect) {
                                btnStyle = 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-900 dark:text-rose-100';
                              }
                            } else if (isSelected) {
                              btnStyle = 'bg-blue-50 dark:bg-blue-950/70 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500 font-bold';
                            }

                            return (
                              <button
                                key={idx}
                                disabled={isQuizSubmitted}
                                onClick={() => handleQuizOptionClick(idx)}
                                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isQuizSubmitted && isCorrect && (
                                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Quiz Feedback */}
                        {isQuizSubmitted && (
                          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-medium ${
                            isQuizCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                              : 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                          }`}>
                            <div className="font-bold flex items-center gap-1.5 mb-1">
                              {isQuizCorrect ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Excelente resposta!</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-4 h-4 text-amber-600" />
                                  <span>Dica para memorizar:</span>
                                </>
                              )}
                            </div>
                            <p>{lessonData.quiz?.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CHEST MODE (node-5) */}
                {lessonData.type === 'chest' && (
                  <div className="py-6 space-y-6 text-center">
                    <div className="max-w-md mx-auto space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        Baú Mágico do Lumi!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        Você avançou bravamente pela trilha! Abra o baú dourado para coletar sua recompensa secreta.
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={handleOpenChest}
                        disabled={chestOpened}
                        className={`group relative p-8 rounded-3xl transition-transform cursor-pointer ${
                          chestOpened
                            ? 'scale-110'
                            : 'hover:scale-105 active:scale-95 animate-bounce'
                        }`}
                      >
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-2xl flex items-center justify-center text-6xl border-4 border-white dark:border-slate-800">
                          {chestOpened ? '🎉' : '🎁'}
                        </div>
                        <span className="mt-3 block text-xs font-black uppercase text-amber-600 dark:text-amber-400">
                          {chestOpened ? 'ABERTO!' : 'CLIQUE PARA ABRIR'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. FINAL CHALLENGE MODE (node-6) */}
                {lessonData.type === 'challenge' && (
                  <div className="space-y-5 text-left">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md">
                      <div className="text-[10px] font-black uppercase tracking-wider text-amber-100">
                        DESAFIO FINAL DA UNIDADE 1
                      </div>
                      <h3 className="text-lg font-black mt-1">
                        Pergunta {challengeStep + 1} de {lessonData.challengeQuizzes?.length || 3}
                      </h3>
                    </div>

                    {lessonData.challengeQuizzes && (
                      <div className="space-y-4">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">
                          {lessonData.challengeQuizzes[challengeStep].question}
                        </p>

                        <div className="space-y-2">
                          {lessonData.challengeQuizzes[challengeStep].options.map((opt, optIdx) => {
                            const isSel = challengeSelected === optIdx;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  playSound.pop(soundEnabled);
                                  setChallengeSelected(optIdx);
                                }}
                                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                  isSel
                                    ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500 font-bold text-blue-900 dark:text-blue-100'
                                    : 'bg-white dark:bg-[#111C35] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-300'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* VICTORY & SUMMARY SCREEN */
              <div className="py-6 space-y-4 text-center animate-in zoom-in-95 duration-200">
                <div className="flex justify-center">
                  <LumiMascot size="medium" isHappy={true} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Parabéns! Etapa Concluída! 🎉
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Você concluiu <strong>{lessonData.title}</strong> e a próxima fase da trilha foi desbloqueada com sucesso!
                </p>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center gap-6 max-w-xs mx-auto">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                    <span className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
                      +{lessonData.starsReward} Estrelas
                    </span>
                  </div>
                  <div className="h-6 w-px bg-amber-200 dark:bg-amber-800" />
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-extrabold text-blue-900 dark:text-blue-200">
                      +{lessonData.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {!isCompleted ? (
              <>
                {lessonData.type === 'lesson' && (
                  <>
                    <button
                      disabled={step === 0}
                      onClick={() => {
                        playSound.pop(soundEnabled);
                        setStep((s) => Math.max(0, s - 1));
                      }}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>

                    {!isCurrentQuizStep ? (
                      <button
                        onClick={() => {
                          playSound.pop(soundEnabled);
                          setStep((s) => s + 1);
                        }}
                        className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-transform active:scale-95 cursor-pointer"
                      >
                        Próximo
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : !isQuizSubmitted ? (
                      <button
                        disabled={quizAnswer === null}
                        onClick={handleSubmitQuiz}
                        className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-500/20 transition-transform active:scale-95 cursor-pointer"
                      >
                        Responder Quiz 🎯
                      </button>
                    ) : (
                      <button
                        onClick={handleFinish}
                        className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md shadow-emerald-500/20 transition-transform active:scale-95 cursor-pointer"
                      >
                        Concluir e Desbloquear ✨
                      </button>
                    )}
                  </>
                )}

                {lessonData.type === 'chest' && (
                  <button
                    onClick={onClose}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Fechar
                  </button>
                )}

                {lessonData.type === 'challenge' && (
                  <button
                    disabled={challengeSelected === null}
                    onClick={handleChallengeNext}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    Confirmar Resposta & Avançar 🏆
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-transform active:scale-95 cursor-pointer"
              >
                Continuar na Trilha Desbloqueada 🚀
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Real Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg">
            <SignVideoPlayer
              title={activeVideoModal === 'oi' ? 'Oi / Olá' : 'Tudo Bem?'}
              categoryLabel="Cumprimentos em Libras"
              photoUrl={
                activeVideoModal === 'oi'
                  ? '/signs/O.png'
                  : '/signs/B.png'
              }
              sourceAttribution="Dicionário de Libras UFV/CEAD"
              signerNote={
                activeVideoModal === 'oi'
                  ? 'Junte os dedos em O e abra o mindinho em I com aceno suave na altura do ombro.'
                  : 'Toque na boca com os dedos em concha e abra para a frente com polegar levantado.'
              }
              slowMotionGuide="Pratique em 0.5x observando a altura da mão em relação ao ombro e queixo."
              facialExpression={
                activeVideoModal === 'oi'
                  ? 'Sorriso acolhedor e olhar dirigido à outra pessoa.'
                  : 'Levante as sobrancelhas se estiver perguntando se tudo está bem!'
              }
              onClose={() => setActiveVideoModal(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};
