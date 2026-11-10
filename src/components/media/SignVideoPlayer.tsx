import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, Repeat, Volume2, Sparkles, Maximize2, ShieldCheck, Info } from 'lucide-react';

interface SignVideoPlayerProps {
  title: string;
  categoryLabel?: string;
  videoUrl?: string;
  photoUrl?: string;
  sourceAttribution?: string;
  signerNote?: string;
  slowMotionGuide?: string;
  facialExpression?: string;
  onClose?: () => void;
  autoPlay?: boolean;
}

export const SignVideoPlayer: React.FC<SignVideoPlayerProps> = ({
  title,
  categoryLabel = 'Sinal em Libras',
  videoUrl,
  photoUrl,
  sourceAttribution = 'Libras ON / UFSM & UFV/CEAD',
  signerNote = 'Observe a posição da palma e os dedos estendidos com atenção ao movimento.',
  slowMotionGuide = 'Pratique em velocidade lenta (0.5x) para memorizar a trajetória exata da mão.',
  facialExpression = 'Expressão neutra ou afirmativa correspondente ao sentido do sinal.',
  onClose,
  autoPlay = true
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.75);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'video' | 'detalhes'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync playback rate with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const speeds = [0.5, 0.75, 1.0];

  return (
    <div className="bg-white dark:bg-[#111C35] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden transition-all text-left">
      {/* Top Header Bar */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="text-sm font-black tracking-tight flex items-center gap-2">
            <span>Vídeo Demonstrativo Real:</span>
            <span className="text-[#FDE047]">{title}</span>
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-sky-200">
            {categoryLabel}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
            >
              Fechar
            </button>
          )}
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-video sm:aspect-16/10 bg-slate-950 flex items-center justify-center overflow-hidden">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={photoUrl}
            loop={isLooping}
            autoPlay={autoPlay}
            playsInline
            muted
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 4)}
            className="w-full h-full object-contain"
          />
        ) : (
          /* High-Quality Real Hand Sign Demonstration Stage */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900">
            {photoUrl ? (
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white dark:bg-slate-800 p-4 flex items-center justify-center shadow-2xl border border-slate-700">
                <img
                  src={photoUrl}
                  alt={`Sinal da mão em Libras: ${title}`}
                  className="w-full h-full object-contain filter dark:invert"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
                <span className="text-6xl">🤟</span>
              </div>
            )}

            {/* Simulated Real Motion Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Sinalizador Real (Libras)</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white text-left pointer-events-none">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Movimento & Expressão:</span>
              </div>
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                {signerNote}
              </p>
            </div>
          </div>
        )}

        {/* Big Center Play Overlay when Paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer z-10"
            title="Reproduzir vídeo"
          >
            <Play className="w-7 h-7 fill-white translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="p-4 bg-slate-50 dark:bg-[#0E172E] border-t border-slate-200 dark:border-slate-800/80 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Play/Pause & Restart */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Reproduzir</span>
                </>
              )}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              title="Reiniciar sinal do começo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                isLooping
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
              title="Repetir o gesto continuamente"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Loop</span>
            </button>
          </div>

          {/* Speed Selector (Câmera Lenta 0.5x, 0.75x, 1.0x) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-extrabold uppercase px-2 text-slate-400">
              Velocidade:
            </span>
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  playbackSpeed === s
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={s === 0.5 ? 'Câmera lenta (ideal para aprender)' : `Velocidade ${s}x`}
              >
                {s === 0.5 ? '0.5x Lento' : `${s}x`}
              </button>
            ))}
          </div>
        </div>

        {/* Anatomical Details and Grammatical Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <span className="font-extrabold text-blue-700 dark:text-sky-400 block mb-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Dica para Treino Motor:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {slowMotionGuide}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50">
            <span className="font-extrabold text-amber-800 dark:text-amber-300 block mb-0.5">
              Expressão Facial (Gramática):
            </span>
            <p className="text-amber-900/80 dark:text-amber-200/90 leading-relaxed font-medium">
              {facialExpression}
            </p>
          </div>
        </div>

        {/* Attribution Footnote */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Fonte de Referência: <strong>{sourceAttribution}</strong></span>
          </span>
          <span>Pratique diante do espelho</span>
        </div>
      </div>
    </div>
  );
};
