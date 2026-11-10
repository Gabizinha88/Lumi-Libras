import React from 'react';
import { Accessibility, Sparkles } from 'lucide-react';

interface LandingScreenProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenAccessibility: () => void;
  onExploreAsGuest?: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onOpenLogin,
  onOpenRegister,
  onOpenAccessibility,
  onExploreAsGuest
}) => {
  return (
    <div className="bg-white dark:bg-[#0A1128] text-slate-800 dark:text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-[#2952E3] selection:text-white transition-colors overflow-x-hidden">
      {/* ======================================================== */}
      {/* 1. SITE HEADER                                           */}
      {/* ======================================================== */}
      <header className="w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#0E172E]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 group focus:outline-none rounded-xl p-1 select-none shrink-0">
            {/* Playful waving hand badge */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform overflow-hidden shadow-2xs">
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
            <span className="text-xl sm:text-3xl font-black tracking-tight text-[#2952E3] dark:text-sky-400 font-outfit">
              lumi<span className="text-[#FFC800]">libras</span>
            </span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Accessibility Button on Top Header */}
            <button
              onClick={onOpenAccessibility}
              className="flex items-center gap-1.5 py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#2952E3] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold cursor-pointer"
              title="Opções de Acessibilidade (Alto contraste, fontes, libras)"
              aria-label="Abrir Acessibilidade"
            >
              <Accessibility className="w-4 h-4 text-[#2952E3] dark:text-sky-400" />
              <span className="hidden sm:inline">Acessibilidade</span>
            </button>

            {/* Header Auth Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={onOpenLogin}
                className="py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 hover:text-[#2952E3] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-wider cursor-pointer"
                type="button"
              >
                Entrar
              </button>

              <button
                onClick={onOpenRegister}
                className="btn-3d py-1.5 px-3 sm:py-2.5 sm:px-5 rounded-xl border-2 border-[#2952E3]/30 text-[#2952E3] dark:text-sky-300 hover:bg-[#2952E3] hover:text-white transition-all text-xs sm:text-sm font-black uppercase tracking-wider shadow-xs hover:shadow-md cursor-pointer"
                type="button"
              >
                Cadastrar-se
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT (HERO)                                   */}
      {/* ======================================================== */}
      <main className="flex-grow flex flex-col justify-center">
        {/* Hero Section Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[520px]">
            {/* Visual Column with Exact Mascot and Floating Badges */}
            <div className="lg:col-span-6 flex justify-center items-center relative order-1">
              {/* Background Glow Effect behind Mascot */}
              <div className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-cyan-200/50 dark:bg-cyan-500/20 filter blur-3xl star-glow pointer-events-none"></div>

              {/* Main Composition Container */}
              <div className="relative w-full max-w-[340px] sm:max-w-[460px] aspect-square flex items-center justify-center">
                {/* Floating Badge: Friendly Tag */}
                <div className="absolute -top-2 left-2 sm:-top-3 sm:left-4 z-20 anim-float bg-white/95 dark:bg-[#111C35]/95 backdrop-blur-sm border-2 border-slate-100 dark:border-slate-700 shadow-md rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[11px] sm:text-xs font-black tracking-wide text-slate-700 dark:text-slate-100 font-outfit">
                    Aprenda Libras Brincando! 👋
                  </span>
                </div>

                {/* Floating Sign 1: 'Eu Te Amo' (ILY Hand Sign) */}
                <div className="absolute top-6 right-1 sm:top-10 sm:right-2 z-20 anim-float-alt bg-white dark:bg-[#111C35] border border-slate-200/90 dark:border-slate-700 shadow-lg rounded-2xl p-2 sm:p-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-black text-xs sm:text-sm">
                    🤟
                  </div>
                  <div className="text-[10px] sm:text-[11px] leading-tight font-extrabold text-slate-600 dark:text-slate-300">
                    Sinal: <span className="text-purple-600 dark:text-purple-400 font-black">Amor</span>
                  </div>
                </div>

                {/* Floating Sign 2: 'Oi' / Paz & Amor */}
                <div className="absolute bottom-8 left-1 sm:bottom-12 sm:-left-2 z-20 anim-float bg-white dark:bg-[#111C35] border border-slate-200/90 dark:border-slate-700 shadow-lg rounded-2xl p-2 sm:p-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center font-black text-xs sm:text-sm">
                    ✌️
                  </div>
                  <div className="text-[10px] sm:text-[11px] leading-tight font-extrabold text-slate-600 dark:text-slate-300">
                    Sinal: <span className="text-amber-600 dark:text-amber-400 font-black">Paz</span>
                  </div>
                </div>

                {/* Floating Sign 3: Letra 'L' / Libras */}
                <div className="absolute -bottom-2 right-4 sm:-bottom-4 sm:right-12 z-20 anim-float-alt bg-white dark:bg-[#111C35] border border-slate-200/90 dark:border-slate-700 shadow-lg rounded-2xl p-2 sm:p-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#2952E3] dark:text-sky-300 flex items-center justify-center font-black text-xs">
                    👆 L
                  </div>
                  <div className="text-[10px] sm:text-[11px] leading-tight font-extrabold text-slate-600 dark:text-slate-300">
                    Alfabeto <span className="text-[#2952E3] dark:text-sky-400 font-black">Manual</span>
                  </div>
                </div>

                {/* Floating Mini Stars */}
                <span className="absolute top-28 left-6 text-[#FFC800] text-xl anim-float select-none">
                  ✨
                </span>
                <span className="absolute bottom-32 right-0 text-[#FFC800] text-2xl anim-float-alt select-none">
                  ⭐
                </span>

                {/* Center Mascot: Turquoise Monster Lumi hugging Star (Exact asset from Stitch zip) */}
                <div className="relative z-10 w-full h-full flex items-center justify-center transform transition-transform hover:scale-105 duration-300">
                  <img
                    alt="Lumi, o monstrinho azul turquesa sorridente e peludo abraçando uma estrela amarela"
                    className="w-full max-w-[390px] h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
                    src="/assets/mascot_stitch.png"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuDKPdbTWvdNwK1kZbi5HXTYbzW9c1YrSa9wzFMSE7ttwaK_VP5d1p8AfX9QZzktVTfpQMfRMV0OVtclqvh1H5XnyemVVQ0FoLNBUN31A9dVkTThTdT-s3dk1z-OLCODPAk8jy9uNIQw-beVrCdU7mgY-y0gVFD3RRp5CfbIn9TgX68f4FlQzzK2m9t-GUCFSKKvLfhIxyuhxMAidq060LAMNRLmSIcXLw77FjzazeCzTUTb67BpdOH9OdR9MHRagjPucIc';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hero CTA Column */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 max-w-xl mx-auto lg:mx-0">
              <div className="space-y-6 max-w-lg">
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] font-outfit">
                  O jeito <span className="text-[#2952E3] dark:text-sky-400">grátis</span>, divertido e
                  eficaz de aprender{' '}
                  <span className="text-[#D49D00] dark:text-[#FFC800] relative inline-block">
                    Libras!
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-md">
                  Aprenda a Língua Brasileira de Sinais com lições interativas, práticas e visuais
                  projetadas para todas as idades.
                </p>
              </div>

              <div className="w-full max-w-sm mt-8 flex flex-col gap-4">
                <button
                  onClick={onOpenRegister}
                  className="btn-3d btn-primary-3d w-full py-4 px-6 rounded-2xl text-white font-black text-base tracking-widest uppercase text-center block shadow-lg hover:shadow-xl transition-all cursor-pointer font-outfit"
                  type="button"
                >
                  Começar Agora
                </button>

                <div className="flex items-center justify-center gap-2 pt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <span>Já tem uma conta?</span>
                  <button
                    onClick={onOpenLogin}
                    className="font-black text-[#2952E3] dark:text-sky-400 hover:text-blue-700 hover:underline uppercase text-xs tracking-wider transition-colors cursor-pointer"
                    type="button"
                  >
                    Fazer Login
                  </button>
                </div>

                {/* Quick explore as guest option */}
                {onExploreAsGuest && (
                  <div className="pt-2 text-center">
                    <button
                      onClick={onExploreAsGuest}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ou experimente como visitante</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. TRUST BANNER (3 FEATURES)                             */}
        {/* ======================================================== */}
        <section className="border-t border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0A1128] py-10 mt-auto transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-[#D49D00] dark:text-amber-300 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white font-outfit">
                    Eficaz e Divertido
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Lições em formato de microjogos rápidos de 5 minutos que mantêm você motivado
                    todos os dias.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-[#2952E3] dark:text-sky-300 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white font-outfit">
                    Baseado em Evidências
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Desenvolvido com educadores e especialistas surdos para garantir sinais naturais e
                    contextuais.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white font-outfit">
                    Acessível para Todos
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Ideal para crianças, familiares, educadores e curiosos que desejam criar pontes de
                    comunicação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
