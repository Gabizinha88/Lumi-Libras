import React, { useState } from 'react';
import { REAL_ALPHABET_MEDIA } from '../../data/librasMediaData';
import { ZoomIn } from 'lucide-react';

interface RealHandSignImageProps {
  letterOrSign: string;
  size?: number | string;
  className?: string;
  showBadge?: boolean;
  onOpenZoom?: () => void;
  altText?: string;
}

export const RealHandSignImage: React.FC<RealHandSignImageProps> = ({
  letterOrSign,
  size = 120,
  className = '',
  showBadge = false,
  onOpenZoom,
  altText
}) => {
  const code = letterOrSign.toUpperCase();
  const media = REAL_ALPHABET_MEDIA[code];
  const [imageError, setImageError] = useState(false);

  // Directly load the verified Libras 2016 hand image
  const photoUrl = media?.photoUrl || `/signs/${code}.png`;
  const dimensionStyle = typeof size === 'number' ? { width: size, height: size } : { width: size, height: size };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs group select-none transition-all ${className}`}
      style={dimensionStyle}
      title={`Sinal de mão real em Libras: Letra ${code}`}
    >
      {!imageError ? (
        <div className="relative w-full h-full flex items-center justify-center p-1.5">
          <img
            src={photoUrl}
            alt={altText || `Sinal real da mão em Libras para ${code}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain filter transition-transform duration-300 group-hover:scale-105 dark:brightness-125 dark:invert"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-1.5 pointer-events-none">
            <span className="text-[10px] font-black text-white px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-xs">
              Mão {code}
            </span>
            {onOpenZoom && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenZoom();
                }}
                className="p-1 rounded-md bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-white cursor-pointer pointer-events-auto"
                title="Ampliar sinal da mão"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Direct Font Glyph Fallback (Libras 2016) */
        <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-50 dark:bg-slate-800">
          <span 
            className="text-4xl sm:text-5xl text-slate-900 dark:text-white select-none leading-none"
            style={{ fontFamily: "'Libras2016', sans-serif" }}
          >
            {code}
          </span>
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 mt-1">
            Letra {code}
          </span>
        </div>
      )}

      {showBadge && media?.palmOrientation && (
        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[9px] font-bold text-white tracking-tight pointer-events-none">
          {media.palmOrientation.includes('frente') ? 'Palma Frente' : 'Palma Perfil'}
        </div>
      )}
    </div>
  );
};
