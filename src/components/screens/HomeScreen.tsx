import React from 'react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Check, 
  Lock, 
  Gift, 
  Trophy, 
  Star, 
  Flame, 
  Gamepad2, 
  Users, 
  ShieldCheck, 
  Route, 
  Lightbulb,
  WholeWord
} from 'lucide-react';
import { LumiMascot } from '../LumiMascot';
import { TabType, UserStats } from '../../types';
import { playSound } from '../../utils/sound';
import { ALPHABET_TRAIL_STAGES } from '../../data/librasTrailAlphabetData';

interface HomeScreenProps {
  stats: UserStats;
  completedTrailNodes?: string[];
  onNavigateTab: (tab: TabType) => void;
  onOpenLesson: (nodeId?: string) => void;
  onOpenHighFive: () => void;
  onOpenTipModal: () => void;
  onStartExpressGame: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stats,
  completedTrailNodes = [],
  onNavigateTab,
  onOpenLesson,
  onOpenHighFive,
  onOpenTipModal,
  onStartExpressGame
}) => {
  // Calculate completed stages for the new trail
  const completedStagesCount = completedTrailNodes.filter(id => 
    ALPHABET_TRAIL_STAGES.some(s => s.id === id) || ['node-1', 'node-2'].includes(id)
  ).length;
  const totalTrailStages = ALPHABET_TRAIL_STAGES.length;
  const trailProgressPercent = Math.min(100, Math.round((completedStagesCount / totalTrailStages) * 100));

  // ==========================================
  // REAL & DYNAMIC WEEKLY MISSION CALCULATION
  // ==========================================
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  // Convert to Monday-first index: Seg=0, Ter=1, Qua=2, Qui=3, Sex=4, Sáb=5, Dom=6
  const currentMondayIndex = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  
  const mondayDate = new Date(now);
  mondayDate.setDate(now.getDate() - currentMondayIndex);
  mondayDate.setHours(0, 0, 0, 0);

  const weekDays = [
    { label: 'Seg', offset: 0 },
    { label: 'Ter', offset: 1 },
    { label: 'Qua', offset: 2 },
    { label: 'Qui', offset: 3 },
    { label: 'Sex', offset: 4 },
    { label: 'Sáb', offset: 5 },
    { label: 'Dom', offset: 6 },
  ].map((item) => {
    const d = new Date(mondayDate.getTime() + item.offset * 86400000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const isToday = item.offset === currentMondayIndex;
    const isPast = item.offset < currentMondayIndex;
    const isFuture = item.offset > currentMondayIndex;
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Um dia futuro NUNCA pode ser marcado como concluído
    const isTrained = !isFuture && (
      (stats.weeklyTrainedDates || []).filter(d => d <= todayStr).includes(dateStr) || 
      (isToday && stats.todayCompleted)
    );

    return {
      label: isToday ? 'Hoje' : item.label,
      dateStr,
      isToday,
      isTrained,
      isPast,
      isFuture
    };
  });

  const trainedDaysCount = weekDays.filter(d => d.isTrained).length;
  const isTodayTrained = weekDays.some(d => d.isToday && d.isTrained);

  return (
    <div className="space-y-8 pb-8 text-left transition-colors">
      {/* ======================================================== */}
      {/* 1. HERO BLUE BANNER WITH LUMI MASCOT                     */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-800 dark:via-blue-700 dark:to-indigo-900 text-white p-6 sm:p-10 shadow-xl shadow-blue-500/15">
        {/* Subtle decorative background stars */}
        <div className="absolute top-4 left-1/3 text-sky-300/40 text-lg">✦</div>
        <div className="absolute top-10 right-1/4 text-amber-300/50 text-xl">✦</div>
        <div className="absolute bottom-6 left-1/4 text-sky-200/30 text-sm">✧</div>
        <div className="absolute bottom-12 right-12 text-yellow-300/40 text-lg">✦</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Heading, intro & buttons */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-100 font-outfit">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>SUA PRÓXIMA DESCOBERTA COMEÇA AQUI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.12] font-outfit">
              Pequenas mãos. <br />
              <span className="text-[#FDE047] drop-shadow-sm">Grandes descobertas.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-blue-100 max-w-xl font-medium leading-relaxed">
              Eu sou o Lumi, seu companheiro de aventuras! Vamos descobrir Libras, brincar e comemorar cada novo passo juntos? No seu ritmo. Do seu jeito. Juntos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('trail');
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FDE047] hover:bg-[#FACC15] active:scale-95 text-slate-950 font-black text-sm shadow-md shadow-amber-400/25 transition-transform cursor-pointer font-outfit"
              >
                <span>Abrir Trilha de Libras</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={onOpenHighFive}
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white dark:bg-slate-100 hover:bg-slate-50 active:scale-95 text-blue-900 font-extrabold text-sm shadow-md shadow-black/5 transition-transform cursor-pointer font-outfit"
              >
                <span className="text-base">✋</span>
                <span>Toca aqui!</span>
              </button>

              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onOpenTipModal();
                }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm border border-white/25 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Ver abertura</span>
              </button>
            </div>

            {/* Footer tags */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-blue-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                Conteúdo pedagógico inclusivo
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span>🪶</span>
                Acessível e visual
              </span>
            </div>
          </div>

          {/* Right Column: Character Speech Bubble + Lumi Mascot Circle */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <div className="w-full max-w-xs bg-white dark:bg-[#111C35] text-slate-800 dark:text-slate-100 p-4 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700/80 relative mb-4 text-left transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xs font-black text-blue-950 dark:text-white flex items-center gap-1 font-outfit">
                  Oi! Eu sou o Lumi! <span className="text-amber-400">✦</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                  100% Grátis
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug font-medium mb-2.5">
                Vou acompanhar você em cada descoberta. Vamos brincar de aprender Libras?
              </p>
              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onOpenTipModal();
                }}
                className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 flex items-center gap-1 cursor-pointer font-outfit"
              >
                <span>Me conta mais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white dark:bg-[#111C35] rotate-45 border-r border-b border-blue-100 dark:border-slate-700/80" />
            </div>

            {/* Circular Portal with Lumi Monster Character */}
            <div className="relative flex flex-col items-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-sky-400/40 via-cyan-300/30 to-blue-200/40 dark:from-sky-500/20 dark:via-cyan-400/20 dark:to-blue-600/20 p-2.5 backdrop-blur-xs border-2 border-white/40 dark:border-white/20 shadow-inner flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2B86C5]/60 to-[#104880]/90 dark:from-[#1b4e75]/80 dark:to-[#0b2848]/90 overflow-hidden flex items-center justify-center relative">
                  <LumiMascot size="hero" />
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#111C35] text-slate-800 dark:text-slate-100 text-[11px] font-black uppercase tracking-wider shadow-md border border-slate-100 dark:border-slate-700 font-outfit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>SEU COMPANHEIRO DE DESCOBERTAS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CATEGORY DISCOVERY CARDS ("Escolha e vem brincar!")  */}
      {/* ======================================================== */}
      <section className="space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <span className="text-[11px] font-black tracking-wider text-blue-600 dark:text-sky-400 uppercase font-outfit">
              QUAL VAI SER A DESCOBERTA DE HOJE?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-outfit">
              Escolha e vem brincar!
            </h2>
          </div>
          <button
            onClick={() => {
              playSound.pop(stats.soundEnabled);
              onNavigateTab('trail');
            }}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 cursor-pointer font-outfit"
          >
            <span>Ver Trilha Completa</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Trilha de Aprendizado (NOVO DESTAQUE) */}
          <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100/90 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                  <Route className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider font-outfit">
                  TRILHA A-Z
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors font-outfit">
                O Caminho das Letras
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                9 etapas completas de A a Z com observação guiada e desafios para conquistar estrelas!
              </p>
            </div>
            <div className="pt-5">
              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('trail');
                }}
                className="btn-3d btn-primary-3d w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-white text-xs font-black transition-colors cursor-pointer font-outfit"
              >
                <span>Acessar Trilha</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Alfabeto Manual */}
          <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-100/90 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black text-base group-hover:scale-105 transition-transform font-outfit">
                  Aa
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                  ALFABETO
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors font-outfit">
                Alfabeto em Libras
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Conheça as 26 letras com fotos reais em alta definição e vídeos em câmera lenta (0.5x).
              </p>
            </div>
            <div className="pt-5">
              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('alphabet');
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer font-outfit"
              >
                <span>Ver fotos e vídeos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Sinais do Dia a Dia */}
          <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-amber-300 dark:hover:border-amber-500 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/90 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                  👋
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                  VÍDEOS REAIS
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors font-outfit">
                Sinais do Dia a Dia
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Vídeos com sinalizadores reais em Libras (UFV/CEAD) para cumprimentos, família, escola e emoções.
              </p>
            </div>
            <div className="pt-5">
              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('daily-signs');
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-bold transition-colors cursor-pointer font-outfit"
              >
                <span>Assistir aos sinais</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Jogo da Memória */}
          <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-purple-300 dark:hover:border-purple-500 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-100/90 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                  <Gamepad2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                  DIVERSÃO
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-outfit">
                Jogo da Memória
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Vire as cartas e encontre a mão que faz par com a letra certa em 3D.
              </p>
            </div>
            <div className="pt-5">
              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('memory-game');
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors cursor-pointer font-outfit"
              >
                <span>Quero jogar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. TWO-COLUMN: DASHBOARD HIGHLIGHTS & COMPANION WIDGETS   */}
      {/* ======================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Learning Overview & Quick Trail Jump */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Main Trail Progress Card */}
          <div className="rounded-3xl bg-white dark:bg-[#111C35] p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs relative overflow-hidden transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-black uppercase text-blue-600 dark:text-sky-400 tracking-wider font-outfit">
                  SUA TRILHA DE LIBRAS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit mt-0.5">
                  O Caminho das Letras (A-Z)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Avance pelas 9 etapas com o mascote Lumi, observe os sinais e teste seus conhecimentos!
                </p>
              </div>

              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('trail');
                }}
                className="btn-3d btn-primary-3d px-6 py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer font-outfit shrink-0"
              >
                <span>Abrir Trilha</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-indigo-950 dark:text-indigo-200 font-outfit">
                  Progresso na Trilha
                </span>
                <span className="text-indigo-700 dark:text-sky-400 font-black font-outfit">
                  {completedStagesCount} de {totalTrailStages} Etapas ({trailProgressPercent}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700/60 overflow-hidden">
                <div 
                  className="h-full bg-[#008272] rounded-full transition-all duration-500 shadow-xs" 
                  style={{ width: `${trailProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Next Stage Teaser */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-emerald-500 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-outfit">
                    Etapa recomendada para você
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {ALPHABET_TRAIL_STAGES[Math.min(completedStagesCount, totalTrailStages - 1)]?.title || 'Todas as etapas concluídas!'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playSound.pop(stats.soundEnabled);
                  onNavigateTab('trail');
                }}
                className="text-xs font-black text-blue-600 dark:text-sky-400 hover:text-blue-700 flex items-center gap-1 cursor-pointer font-outfit"
              >
                <span>Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Practice Card: Dica de Libras */}
          <div className="rounded-3xl bg-gradient-to-br from-[#F5F8FF] to-[#E9F0FE] dark:from-[#131F3F] dark:to-[#0C152B] p-6 border border-indigo-100 dark:border-indigo-950 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-sm">
                <Lightbulb className="w-7 h-7 fill-amber-300 text-amber-950" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 font-outfit">
                  DICA DO MESTRE LUMI
                </span>
                <h4 className="text-base font-black text-slate-900 dark:text-white font-outfit">
                  A Expressão Facial é Gramática!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium max-w-md mt-0.5">
                  Ao fazer perguntas em Libras, incline levemente a cabeça e erga as sobrancelhas. Seu rosto dá vida às mãos!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound.pop(stats.soundEnabled);
                onNavigateTab('daily-signs');
              }}
              className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-700 dark:text-sky-300 text-xs font-bold border border-blue-200 dark:border-slate-700 transition-all shadow-2xs whitespace-nowrap cursor-pointer font-outfit"
            >
              Ver Sinais com Expressão
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Weekly Mission & Side Widgets */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 text-left">
          {/* Card 1: MISSÃO DA SEMANA (100% REAL E DINÂMICA) */}
          <div className="bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-outfit">
                  Missão da Semana
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-[10px] font-black font-outfit">
                Meta: 5 dias
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-4">
              Treine seus sinais todos os dias para abrir o Baú de Estrelas Douradas!
            </p>

            {/* Streak Day Circles (Real Weekly Days Seg-Dom) */}
            <div className="flex items-center justify-between gap-1 mb-4">
              {weekDays.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      item.isTrained
                        ? 'bg-[#008272] text-white shadow-2xs ring-2 ring-[#008272]/30'
                        : item.isToday
                        ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300 ring-offset-2 dark:ring-offset-slate-900 animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.isTrained ? (
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    ) : item.isToday ? (
                      <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">•</span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold ${
                    item.isToday 
                      ? 'text-amber-600 dark:text-amber-400 font-extrabold font-outfit' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Reward Subcard */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="text-left text-xs">
                  <div className="font-extrabold text-indigo-950 dark:text-indigo-200 font-outfit">
                    Recompensa: 50 Estrelas
                  </div>
                  <div className="text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]">
                    {trainedDaysCount >= 5
                      ? 'Meta semanal atingida! Parabéns!'
                      : isTodayTrained
                      ? 'Sessão de hoje concluída! Volte amanhã.'
                      : 'Falta apenas 1 sessão hoje!'}
                  </div>
                </div>
              </div>

              {!isTodayTrained && (
                <button
                  onClick={() => {
                    playSound.pop(stats.soundEnabled);
                    onNavigateTab('trail');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold cursor-pointer font-outfit shrink-0"
                >
                  Treinar
                </button>
              )}
            </div>
          </div>

          {/* Card 2: DESAFIO RÁPIDO */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 dark:from-indigo-800 dark:via-indigo-700 dark:to-purple-900 text-white p-5 shadow-md relative overflow-hidden">
            <span className="text-[10px] font-black uppercase text-indigo-200 tracking-wider font-outfit">
              DESAFIO RÁPIDO
            </span>
            <h4 className="text-base font-black text-white mt-0.5 mb-2 font-outfit">
              Jogo da Memória Express
            </h4>
            <p className="text-xs text-indigo-100 leading-relaxed font-medium mb-4">
              Combine 4 pares de sinais em menos de 1 minuto para dobrar seus pontos de hoje!
            </p>

            <button
              onClick={onStartExpressGame}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#FDE047] hover:bg-[#FACC15] active:scale-95 text-slate-950 font-black text-xs shadow-md transition-transform cursor-pointer font-outfit"
            >
              <Gamepad2 className="w-4 h-4 text-slate-900" />
              <span>Jogar 1 Partida Rápida</span>
            </button>
          </div>

          {/* Card 3: Fontes & Curiosidades de Libras */}
          <div
            onClick={() => {
              playSound.pop(stats.soundEnabled);
              onNavigateTab('credits-curiosities');
            }}
            className="bg-white dark:bg-[#111C35] rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-slate-800/40 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-outfit">
                  Fontes & Curiosidades
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  5 fatos sobre Libras e fontes oficiais
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. FAMILY CONNECTION BANNER                             */}
      {/* ======================================================== */}
      <section className="rounded-3xl bg-blue-50/80 dark:bg-[#111C35] border border-blue-100/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-left transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDE047] text-amber-950 flex items-center justify-center shrink-0 shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-sky-400 font-outfit">
              APRENDER CONECTA A GENTE
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-outfit">
              Aprender fica ainda melhor em companhia
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-lg mt-0.5">
              Convide alguém da família ou um amigo para descobrir as curiosidades e praticar os sinais com você!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playSound.pop(stats.soundEnabled);
            onNavigateTab('credits-curiosities');
          }}
          className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all shadow-2xs whitespace-nowrap cursor-pointer font-outfit"
        >
          <span>Curiosidades & Fontes</span> ➔
        </button>
      </section>
    </div>
  );
};
