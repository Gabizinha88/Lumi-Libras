import React, { useState } from 'react';
import { 
  Sparkles, 
  Globe2, 
  ScrollText, 
  Smile, 
  HelpCircle, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  HeartHandshake,
  Layers,
  GraduationCap
} from 'lucide-react';
import { UserStats } from '../../types';

interface CreditsCuriositiesScreenProps {
  stats: UserStats;
  onOpenAccessibility: () => void;
  onOpenMediaCredits?: () => void;
}

export const CreditsCuriositiesScreen: React.FC<CreditsCuriositiesScreenProps> = ({
  stats,
  onOpenAccessibility,
  onOpenMediaCredits
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'curiosities' | 'sources' | 'parameters'>('all');

  const curiosities = [
    {
      id: 1,
      badge: 'Fato #1',
      title: 'Libras não é universal!',
      icon: <Globe2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      color: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900',
      description: 'Assim como quem mora na França fala francês e quem mora no Japão fala japonês, cada país tem sua própria língua de sinais! No Brasil é a Libras, nos Estados Unidos a ASL, em Portugal a LGP e na França a LSF.'
    },
    {
      id: 2,
      badge: 'Fato #2',
      title: 'Libras é uma língua de verdade, não é mímica!',
      icon: <ScrollText className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      color: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900',
      description: 'Libras é reconhecida como meio legal de comunicação no Brasil pela Lei Federal nº 10.436/2002. Ela tem gramática própria, sintaxe, regras, gírias, poesias e sotaques regionais!'
    },
    {
      id: 3,
      badge: 'Fato #3',
      title: 'O Sinal de Batismo (Seu nome em Libras)',
      icon: <Smile className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900',
      description: 'Ninguém precisa soletrar o nome letra por letra sempre! Na comunidade surda, você ganha um "sinal pessoal" (batismo), criado por uma pessoa surda com base em um traço marcante do seu rosto, cabelo ou personalidade.'
    },
    {
      id: 4,
      badge: 'Fato #4',
      title: 'O Rosto também fala (Expressões Não-Manuais)',
      icon: <Smile className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      color: 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900',
      description: 'As expressões faciais em Libras não servem só para demonstrar sentimento: elas fazem parte da gramática! Levantar a sobrancelha indica uma pergunta, e a inclinação da cabeça muda o sentido da frase.'
    },
    {
      id: 5,
      badge: 'Fato #5',
      title: 'Alfabeto manual vs. Sinais completos',
      icon: <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      color: 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900',
      description: 'O alfabeto manual (datilologia) é usado principalmente para soletrar nomes próprios, endereços e termos novos. No dia a dia, a comunicação flui através de sinais que representam ideias e conceitos inteiros!'
    }
  ];

  const institutionalSources = [
    {
      institution: 'Universidade Federal de Santa Maria (UFSM)',
      project: 'Libras ON · Núcleo de Tecnologia Educacional (NTE)',
      role: 'Vídeos didáticos e registros em movimento do alfabeto manual e sinais.',
      license: 'Licença Creative Commons Atribuição-NãoComercial-CompartilhaIgual (CC BY-NC-SA 4.0)',
      url: 'https://ntetube.nte.ufsm.br/v/1527000916',
      tag: 'Vídeos Oficiais'
    },
    {
      institution: 'Universidade Federal de Viçosa (UFV)',
      project: 'Centro de Educação Aberta e a Distância (CEAD)',
      role: 'Dicionário Digital de Libras, parâmetros visuais e ilustrações base de datilologia.',
      license: 'Material didático de uso público educacional',
      url: 'https://www.cead.ufv.br/',
      tag: 'Ilustrações & Dicionário'
    },
    {
      institution: 'Universidade Tecnológica Federal do Paraná (UTFPR)',
      project: 'Projetos de Inclusão, Acessibilidade e Tecnologias Assistivas',
      role: 'Diretrizes de usabilidade infantil e acessibilidade digital para pessoas surdas.',
      license: 'Projetos acadêmicos de extensão e inclusão',
      url: 'http://www.utfpr.edu.br/',
      tag: 'Acessibilidade & Extensão'
    },
    {
      institution: 'Legislação Brasileira de Inclusão',
      project: 'Lei nº 10.436/2002 e Decreto nº 5.626/2005',
      role: 'Reconhecimento oficial da Libras como língua oficial no Brasil e garantia de difusão nas escolas.',
      license: 'Legislação Federal Pública',
      url: 'http://www.planalto.gov.br/ccivil_03/leis/2002/l10436.htm',
      tag: 'Legislação Oficial'
    }
  ];

  return (
    <div className="space-y-8 text-left pb-12 transition-colors">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 dark:from-blue-900 dark:via-indigo-950 dark:to-sky-950 text-white p-6 sm:p-9 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black tracking-wider text-sky-100 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>CONHECIMENTO & TRANSPARÊNCIA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-outfit tracking-tight">
            Fontes, Créditos & Curiosidades
          </h1>
          <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-medium">
            Explore fatos fascinantes sobre a Língua Brasileira de Sinais, a cultura surda e conheça as universidades públicas e fontes oficiais que fundamentam este aplicativo.
          </p>
        </div>

        {/* Decorative background illustrations */}
        <div className="absolute -bottom-6 -right-6 opacity-15 pointer-events-none text-9xl select-none">
          🤟
        </div>
      </div>

      {/* Navigation Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'all'
              ? 'bg-[#2952E3] text-white shadow-xs'
              : 'bg-white dark:bg-[#111C35] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Ver Tudo
        </button>
        <button
          onClick={() => setActiveSection('curiosities')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'curiosities'
              ? 'bg-[#2952E3] text-white shadow-xs'
              : 'bg-white dark:bg-[#111C35] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Curiosidades de Libras (5)
        </button>
        <button
          onClick={() => setActiveSection('parameters')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'parameters'
              ? 'bg-[#2952E3] text-white shadow-xs'
              : 'bg-white dark:bg-[#111C35] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Os 5 Parâmetros
        </button>
        <button
          onClick={() => setActiveSection('sources')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'sources'
              ? 'bg-[#2952E3] text-white shadow-xs'
              : 'bg-white dark:bg-[#111C35] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Fontes Institucionais (UFSM, UFV, UTFPR)
        </button>
      </div>

      {/* Section 1: Curiosidades Fascinantes de Libras */}
      {(activeSection === 'all' || activeSection === 'curiosities') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-sky-400">
                VOCÊ SABIA?
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit">
                5 Curiosidades Incríveis sobre a Libras
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">5 fatos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {curiosities.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#111C35] rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      {item.badge}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-[#2952E3] dark:text-sky-400 flex items-center gap-1">
                  <span>Dica do Lumi</span> ✦
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Os 5 Parâmetros da Libras */}
      {(activeSection === 'all' || activeSection === 'parameters') && (
        <section className="bg-white dark:bg-[#111C35] rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                ESTRUTURA LINGUÍSTICA
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit">
                Os 5 Parâmetros Fundamentais da Libras
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Assim como as palavras faladas são formadas pela junção de letras e sons, todo sinal em Libras é formado pela combinação simultânea destes cinco parâmetros:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <div className="text-xs font-black text-blue-600 dark:text-sky-400 uppercase tracking-wide mb-1">
                1. CM
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                Configuração de Mão
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A forma e posição que os dedos e a mão assumem ao fazer o sinal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
                2. PA
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                Ponto de Articulação
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                O local no corpo (testa, queixo, peito) ou no espaço à frente onde o sinal acontece.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                3. M
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                Movimento
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                O sinal pode ter movimento em arco, circular, contínuo, toques ou ser estático.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <div className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
                4. O
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                Orientação
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A direção em que a palma da mão está virada (para cima, para frente, para dentro).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <div className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wide mb-1">
                5. ENM
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1.5">
                Expressões Não-Manuais
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Expressões do rosto, olhar e inclinação do tronco que dão significado e entonação.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Fontes Oficiais & Créditos Institucionais */}
      {(activeSection === 'all' || activeSection === 'sources') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                ORIGEM DOS MATERIAIS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit">
                Fontes Oficiais & Créditos Institucionais
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">Acesso público & educacional</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {institutionalSources.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#111C35] rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {item.tag}
                    </span>
                    <GraduationCap className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">
                    {item.institution}
                  </h3>
                  <div className="text-xs font-bold text-blue-600 dark:text-sky-400 mt-0.5 mb-2">
                    {item.project}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-3">
                    {item.role}
                  </p>

                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    {item.license}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2952E3] dark:text-sky-400 hover:underline"
                  >
                    <span>Visitar portal oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer Info Card: Acessibilidade & Direitos */}
      <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-[#2952E3] dark:text-sky-400 flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Compromisso com Acessibilidade e Inclusão Infantil
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Ambiente seguro para crianças de 8 a 15 anos, sem anúncios e com contraste acessível.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAccessibility}
          className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
        >
          Ajustes de Acessibilidade
        </button>
      </div>
    </div>
  );
};
