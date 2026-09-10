import React, { useState } from 'react';
import { Play, ExternalLink, Film, Sparkles, MonitorPlay } from 'lucide-react';
import type { Poema } from '../data/poemas';

interface VideoPlayerProps {
  poema: Poema;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ poema }) => {
  const [embedMode, setEmbedMode] = useState<boolean>(false);

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
        ) : embedMode ? (
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
            <iframe
              src={poema.vidsUrl}
              title={`Película poética de ${poema.title}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen"
            />
          </div>
        ) : (
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
        )}

        <div className="theater-meta">
          <div className="theater-info">
            <h3>{poema.title} — Google Vids Oficial</h3>
            <p>Declamación por Guillermo Baena Restrepo • Producción Audiovisual Digital</p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <span className="badge-tag has-video">
              <Sparkles size={12} />
              Google Vids
            </span>
            <span className="badge-tag">
              1080p HD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
