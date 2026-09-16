import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, X } from 'lucide-react';
import { AUTOR_INFO } from '../data/poemas';
import type { Poema } from '../data/poemas';

interface AudioPlayerProps {
  currentPoem: Poema | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextPoem: () => void;
  onPrevPoem: () => void;
  onClose: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentPoem,
  isPlaying,
  onTogglePlay,
  onNextPoem,
  onPrevPoem,
  onClose
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // El navegador puede requerir interacción previa del usuario
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentPoem]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      audioRef.current.currentTime = pct * duration;
      setCurrentTime(pct * duration);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentPoem) return null;

  return (
    <div className="floating-audio-player" role="region" aria-label="Reproductor de voz poética">
      <audio
        ref={audioRef}
        src={currentPoem.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNextPoem}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Barra de progreso superior integrada (estilo miniplayer móvil) */}
      <div className="audio-mobile-top-bar" onClick={handleSeek}>
        <div 
          className="audio-mobile-top-fill" 
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      <div className="audio-track-info">
        <div className="audio-track-avatar">
          <img src={AUTOR_INFO.fotoAutorUrl} alt={AUTOR_INFO.nombre} />
        </div>
        <div className="audio-track-text">
          <div className="audio-track-title">{currentPoem.title}</div>
          <div className="audio-track-artist">Voz: {AUTOR_INFO.nombre}</div>
        </div>
      </div>

      <div className="audio-controls">
        <button 
          className="btn-audio-close" 
          onClick={onPrevPoem}
          title="Poema anterior"
        >
          <SkipBack size={18} />
        </button>

        <button 
          className="btn-audio-play" 
          onClick={onTogglePlay}
          title={isPlaying ? "Pausar declamación" : "Escuchar declamación"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
        </button>

        <button 
          className="btn-audio-close" 
          onClick={onNextPoem}
          title="Siguiente poema"
        >
          <SkipForward size={18} />
        </button>

        <div className="audio-timeline-box">
          <span className="audio-time-current">{formatTime(currentTime)}</span>
          <div className="audio-progress-bar" onClick={handleSeek}>
            <div 
              className="audio-progress-fill" 
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="audio-time-duration">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="audio-extra-actions">
        <button 
          className="btn-audio-close" 
          onClick={toggleMute}
          title={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button 
          className="btn-audio-close" 
          onClick={onClose}
          title="Ocultar reproductor"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
