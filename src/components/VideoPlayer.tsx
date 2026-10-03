import React from 'react';
import { Film, Sparkles, Clock } from 'lucide-react';
import type { Poema } from '../data/poemas';

interface VideoPlayerProps {
  poema: Poema;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ poema }) => {
  const hasVideo = Boolean(poema.vidsUrl && poema.vidsUrl.trim() !== '');

  return (
    <div className="audiovisual-container">
      <div className="theater-card">
        {hasVideo ? (
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              aspectRatio: '16/9', 
              background: '#0a0a0c', 
              borderRadius: '14px', 
              overflow: 'hidden', 
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.75), 0 0 30px rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}
          >
            <iframe
              src={poema.vidsUrl}
              title={`Película poética de ${poema.title}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="theater-screen-placeholder">
            <div className="theater-glow" />
            
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1rem' }}>
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
                La película poética para esta obra se encuentra en preparación. Puedes escuchar la declamación en audio o explorar los versos manuscritos mientras se publica la obra audiovisual.
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', fontSize: '0.85rem', color: 'var(--gold-light)' }}>
                <Sparkles size={14} />
                <span>Película oficial próximamente</span>
              </div>
            </div>
          </div>
        )}

        <div className="theater-meta">
          <div className="theater-info">
            <h3>{poema.title} — {hasVideo ? 'Película Poética Oficial' : 'Producción Audiovisual'}</h3>
            <p>Declamación por Guillermo Baena Restrepo • Producción Audiovisual Digital</p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {hasVideo ? (
              <>
                <span className="badge-tag has-video">
                  <Film size={12} />
                  Película Oficial
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
