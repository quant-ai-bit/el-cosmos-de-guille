import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Film, Sparkles, MonitorPlay, Clock, RotateCcw } from 'lucide-react';
import type { Poema } from '../data/poemas';

interface VideoPlayerProps {
  poema: Poema;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ poema }) => {
  const [embedMode, setEmbedMode] = useState<boolean>(false);
  const hasVideo = Boolean(poema.localVideoUrl || (poema.vidsUrl && poema.vidsUrl.trim() !== ''));

  useEffect(() => {
    setEmbedMode(false);
  }, [poema.id]);

  return (
    <div className="audiovisual-container">
      <div className="theater-card">
        {poema.localVideoUrl ? (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
            <video
              src={poema.localVideoUrl}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              poster="/images/portada.jpg"
            />
          </div>
        ) : embedMode && poema.vidsUrl ? (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src={poema.vidsUrl}
              title={`Película poética de ${poema.title}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen"
            />
            <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
              <a
                href={poema.vidsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '0.8rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Abrir en Google Vids</span>
                <ExternalLink size={14} />
              </a>
              <button
                onClick={() => setEmbedMode(false)}
                className="btn btn-outline"
                style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '0.8rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <RotateCcw size={14} />
                <span>Volver a la sala</span>
              </button>
            </div>
          </div>
        ) : hasVideo ? (
          <div className="theater-screen-placeholder">
            <div className="theater-glow" />
            
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div 
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                  marginBottom: '1.25rem',
                  boxShadow: '0 0 30px rgba(212, 175, 55, 0.25)'
                }}
              >
                <Film size={34} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
                Película Poética: {poema.title}
              </h3>
              
              <p style={{ color: 'var(--text-muted)', maxWidth: '28rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Obra audiovisual creada con Google Vids, uniendo la declamación original del autor con secuencias cinematográficas en alta definición.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a
                  href={poema.vidsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-vids-play"
                >
                  <Play size={20} fill="#121008" />
                  <span>Reproducir en Google Vids (HD)</span>
                  <ExternalLink size={16} />
                </a>

                <button
                  className="btn btn-outline"
                  onClick={() => setEmbedMode(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <MonitorPlay size={18} />
                  <span>Cargar en esta ventana</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="theater-screen-placeholder">
            <div className="theater-glow" />
            
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
              <div 
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px dashed var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-light)',
                  marginBottom: '1.25rem'
                }}
              >
                <Clock size={32} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
                Película en Producción: {poema.title}
              </h3>
              
              <p style={{ color: 'var(--text-muted)', maxWidth: '30rem', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                La película poética en Google Vids para esta obra se encuentra en preparación. Puedes escuchar la declamación en audio o explorar los versos manuscritos mientras se publica el enlace oficial.
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                <Sparkles size={14} />
                <span>Video oficial próximamente</span>
              </div>
            </div>
          </div>
        )}

        <div className="theater-meta">
          <div className="theater-info">
            <h3>{poema.title} — {hasVideo ? 'Google Vids Oficial' : 'Producción Audiovisual'}</h3>
            <p>Declamación por Guillermo Baena Restrepo • Producción Audiovisual Digital</p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {hasVideo ? (
              <>
                <span className="badge-tag has-video">
                  <Sparkles size={12} />
                  Google Vids
                </span>
                <span className="badge-tag">
                  1080p HD
                </span>
              </>
            ) : (
              <span className="badge-tag">
                <Clock size={12} />
                Próximamente
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
