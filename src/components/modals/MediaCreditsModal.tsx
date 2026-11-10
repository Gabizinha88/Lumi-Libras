import React from 'react';
import { X, ShieldCheck, ExternalLink, BookOpen, Heart, Sparkles, Award } from 'lucide-react';
import { CREDITS_DATA } from '../../data/librasMediaData';

interface MediaCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MediaCreditsModal: React.FC<MediaCreditsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>TRANSPARÊNCIA & ÉTICA EDUCACIONAL</span>
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Créditos das Mídias, Fotos e Vídeos em Libras
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            O Lumi Libras foi concebido como uma iniciativa educacional, inclusiva e aberta. Todas as referências anatômicas de mãos, fotografias e vídeos de sinalização respeitam as diretrizes de atribuição acadêmica e licenças de uso livre:
          </p>
        </div>

        {/* List of Educational Sources */}
        <div className="space-y-4 mb-6">
          {CREDITS_DATA.map((credit, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black text-blue-700 dark:text-sky-400 uppercase tracking-wide">
                  {credit.institution}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                  {credit.license}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {credit.project}
              </h4>

              {'authors' in credit && (
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Autoria: {(credit as any).authors}
                </p>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {credit.description}
              </p>

              <div className="pt-1 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-sky-400">
                <a
                  href={credit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <span>Visitar portal institucional</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note about Character & Assets */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200 font-medium">
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Mascote Lumi & Conteúdo Interativo:</strong> O personagem Lumi, sua história e a trilha de desafios foram criados para promover o encantamento de crianças surdas e ouvintes pela cultura surda com respeito e alegria.
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
