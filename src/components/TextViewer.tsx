import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import type { Poema } from '../data/poemas';

interface TextViewerProps {
  poema: Poema;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const TextViewer: React.FC<TextViewerProps> = ({ poema, isPlaying, onTogglePlay }) => {
  const [theme, setTheme] = useState<'dark' | 'parchment' | 'light'>('dark');
  const [fontSize, setFontSize] = useState<number>(1.35); // rem
  const [showPrompts, setShowPrompts] = useState<boolean>(false);

  return (
    <div className={`text-reader-card ${theme === 'parchment' ? 'theme-parchment' : ''}`} style={theme === 'light' ? { background: '#ffffff', color: '#1a1816', borderColor: '#e2dcd0' } : {}}>
      {/* Barra de herramientas del lector */}
      <div className="reader-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? "Pausar Declamación" : "Escuchar al Poeta"}</span>
          </button>

          {poema.scenes && poema.scenes.length > 0 && (
            <button
              className="btn btn-outline"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              onClick={() => setShowPrompts(!showPrompts)}
            >
              {showPrompts ? "Ocultar Notas Visuales" : "Ver Guion de Escenas"}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Ajuste de tamaño de letra */}
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setFontSize(prev => Math.max(1.1, prev - 0.1))}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.2rem 0.4rem', opacity: 0.8 }}
              title="Reducir tamaño"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize(prev => Math.min(1.8, prev + 0.1))}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.2rem 0.4rem', fontWeight: 'bold' }}
              title="Aumentar tamaño"
            >
              A+
            </button>
          </div>

          {/* Selector de Ambiente de Lectura */}
          <div className="reader-theme-toggle">
            <button
              className="theme-pill dark"
              onClick={() => setTheme('dark')}
              title="Modo Noche Cósmica"
            />
            <button
              className="theme-pill parchment"
              onClick={() => setTheme('parchment')}
              title="Modo Pergamino Clásico"
            />
          </div>
        </div>
      </div>

      {/* Contenido Poético */}
      {showPrompts && poema.scenes ? (
        <div>
          {poema.scenes.map(s => (
            <div key={s.scene} className="scene-block">
              <div className="scene-num">Secuencia {s.scene}</div>
              <div className="scene-verse" style={{ fontSize: `${fontSize}rem`, color: theme === 'dark' ? '#fff' : '#1a1816' }}>
                {s.text}
              </div>
              {s.prompt && (
                <div className="scene-vision" style={theme === 'parchment' ? { background: '#ebe4d3', color: '#554f46' } : {}}>
                  <strong>Visión Cinematográfica:</strong> {s.prompt}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="poem-body-text" style={{ fontSize: `${fontSize}rem` }}>
          {poema.fullText}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '3.5rem', opacity: 0.6, fontSize: '0.9rem', fontStyle: 'italic' }}>
        — Guillermo Baena Restrepo —
      </div>
    </div>
  );
};
