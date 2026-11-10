import React from 'react';

interface LumiMascotProps {
  size?: 'avatar' | 'compact' | 'medium' | 'hero' | 'large';
  showSparkles?: boolean;
  className?: string;
  isHappy?: boolean;
  onClick?: () => void;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({
  size = 'hero',
  showSparkles = true,
  className = '',
  isHappy = true,
  onClick
}) => {
  const sizeClasses = {
    avatar: 'w-10 h-10',
    compact: 'w-14 h-14',
    medium: 'w-24 h-24',
    hero: 'w-52 h-52 sm:w-60 sm:h-60',
    large: 'w-64 h-64 sm:w-72 sm:h-72'
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ userSelect: 'none' }}
    >
      {/* Background celestial radial glow */}
      {size === 'hero' && (
        <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-tr from-cyan-400/30 via-sky-300/40 to-blue-500/20 blur-xl animate-pulse" />
      )}

      {/* Floating Sparkles */}
      {showSparkles && size === 'hero' && (
        <>
          <span className="absolute -top-3 right-6 text-amber-300 text-xl animate-sparkle-slow">✦</span>
          <span className="absolute top-1/2 -left-4 text-cyan-200 text-lg animate-sparkle-slow" style={{ animationDelay: '1.2s' }}>✧</span>
          <span className="absolute -bottom-2 right-12 text-yellow-300 text-base animate-sparkle-slow" style={{ animationDelay: '0.6s' }}>✦</span>
        </>
      )}

      {/* Lumi Character Mascot - High Quality 3D Mascot Image with Open Arms */}
      <div className={`${sizeClasses} relative flex items-center justify-center animate-float-gentle transition-transform duration-300 hover:scale-105 active:scale-95`}>
        <img
          src="/assets/mascot_stitch.png"
          alt="Lumi, o monstrinho azul sorridente segurando a estrela dourada"
          className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none"
          loading="eager"
        />
      </div>
    </div>
  );
};
