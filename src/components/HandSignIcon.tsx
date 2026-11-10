import React from 'react';

interface HandSignIconProps {
  letterOrSign: string;
  size?: number;
  className?: string;
  color?: string;
}

export const HandSignIcon: React.FC<HandSignIconProps> = ({
  letterOrSign,
  size = 56,
  className = '',
  color = '#2563EB'
}) => {
  const code = letterOrSign.toUpperCase();

  return (
    <div
      className={`inline-flex items-center justify-center p-2 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/80 shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
      title={`Sinal de ${letterOrSign} em Libras`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Render stylized hand anatomy corresponding to the Libras configuration */}
        {code === 'A' && (
          // Punho fechado, polegar ereto ao lado
          <g fill="#FDE047" fillOpacity="0.25">
            <rect x="35" y="38" width="36" height="42" rx="12" />
            <path d="M 35 48 C 24 45 22 30 30 24 C 36 19 43 28 41 42" fill="#FDE047" fillOpacity="0.4" />
            <line x1="44" y1="38" x2="44" y2="58" />
            <line x1="53" y1="38" x2="53" y2="58" />
            <line x1="62" y1="38" x2="62" y2="58" />
            <path d="M 40 80 L 40 92 L 66 92 L 66 80" />
          </g>
        )}

        {code === 'B' && (
          // 4 dedos eretos juntos, polegar dobrado na frente
          <g fill="#FDE047" fillOpacity="0.25">
            <rect x="30" y="16" width="38" height="52" rx="8" />
            <line x1="40" y1="16" x2="40" y2="54" />
            <line x1="49" y1="16" x2="49" y2="54" />
            <line x1="58" y1="16" x2="58" y2="54" />
            <path d="M 28 54 Q 38 64 56 62" fill="#FDE047" fillOpacity="0.5" />
            <path d="M 34 68 L 34 90 L 64 90 L 64 68" />
          </g>
        )}

        {code === 'C' && (
          // Formato circular de C
          <g fill="#FDE047" fillOpacity="0.25">
            <path d="M 68 28 C 45 18 24 35 24 54 C 24 73 45 88 68 80 C 65 72 50 72 40 64 C 34 58 34 48 42 42 C 50 36 64 36 68 28 Z" fill="#FDE047" fillOpacity="0.35" />
            <line x1="45" y1="90" x2="55" y2="90" />
          </g>
        )}

        {code === 'D' && (
          // Indicador para cima, outros dedos em círculo com polegar
          <g fill="#FDE047" fillOpacity="0.25">
            <line x1="42" y1="14" x2="42" y2="56" strokeWidth="4.5" />
            <circle cx="56" cy="56" r="18" fill="#FDE047" fillOpacity="0.3" />
            <path d="M 38 72 L 38 90 L 60 90 L 60 72" />
          </g>
        )}

        {code === 'E' && (
          // Dedos curvados para baixo na ponta
          <g fill="#FDE047" fillOpacity="0.25">
            <rect x="32" y="35" width="36" height="35" rx="6" />
            <line x1="41" y1="35" x2="41" y2="50" />
            <line x1="50" y1="35" x2="50" y2="50" />
            <line x1="59" y1="35" x2="59" y2="50" />
            <line x1="30" y1="62" x2="68" y2="62" strokeWidth="4" />
            <path d="M 36 70 L 36 90 L 64 90 L 64 70" />
          </g>
        )}

        {code === 'F' && (
          // Indicador dobrado, polegar por FORA, outros 3 dedos eretos
          <g fill="#FDE047" fillOpacity="0.25">
            <line x1="48" y1="16" x2="48" y2="54" />
            <line x1="57" y1="16" x2="57" y2="54" />
            <line x1="66" y1="18" x2="66" y2="54" />
            <circle cx="34" cy="46" r="10" fill="#FDE047" fillOpacity="0.5" />
            {/* Polegar por fora */}
            <path d="M 22 44 C 20 54 32 60 40 56" strokeWidth="4" />
            <path d="M 38 68 L 38 90 L 64 90 L 64 68" />
          </g>
        )}

        {code === 'L' && (
          // Formato L
          <g fill="#FDE047" fillOpacity="0.25">
            <line x1="40" y1="16" x2="40" y2="62" strokeWidth="4.5" />
            <line x1="40" y1="62" x2="76" y2="62" strokeWidth="4.5" />
            <rect x="42" y="44" width="22" height="22" rx="4" />
            <path d="M 36 70 L 36 90 L 56 90 L 56 70" />
          </g>
        )}

        {code === 'I' && (
          // Apenas mindinho erguido
          <g fill="#FDE047" fillOpacity="0.25">
            <line x1="66" y1="18" x2="66" y2="54" strokeWidth="4" />
            <rect x="28" y="45" width="36" height="30" rx="8" />
            <path d="M 34 75 L 34 92 L 60 92 L 60 75" />
          </g>
        )}

        {code === 'V' && (
          // V com indicador e médio
          <g fill="#FDE047" fillOpacity="0.25">
            <line x1="38" y1="18" x2="46" y2="56" strokeWidth="4" />
            <line x1="62" y1="18" x2="54" y2="56" strokeWidth="4" />
            <rect x="36" y="52" width="28" height="25" rx="6" />
            <path d="M 40 77 L 40 92 L 60 92 L 60 77" />
          </g>
        )}

        {/* Fallback general icon for other signs or letters */}
        {!['A', 'B', 'C', 'D', 'E', 'F', 'L', 'I', 'V'].includes(code) && (
          <g fill="#38BDF8" fillOpacity="0.2">
            <circle cx="50" cy="50" r="32" />
            <path d="M 38 60 C 35 45 42 30 50 30 C 58 30 65 45 62 60" />
            <text x="50" y="58" textAnchor="middle" fill={color} fontSize="24" fontWeight="bold" fontFamily="sans-serif">
              {code.slice(0, 3)}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
