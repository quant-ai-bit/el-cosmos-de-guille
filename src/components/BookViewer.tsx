import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sparkles, BookOpen } from 'lucide-react';
import type { Poema } from '../data/poemas';

interface BookViewerProps {
  poema: Poema;
}

export const BookViewer: React.FC<BookViewerProps> = ({ poema }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const hasPages = poema.notebookPages && poema.notebookPages.length > 0;
  const totalPages = hasPages ? poema.notebookPages.length : 0;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const toggleZoom = () => {
    setZoomLevel(prev => (prev === 1 ? 1.4 : 1));
  };

  // Si no tiene páginas escaneadas directas, mostramos las escenas ilustradas tipo libreta de autor
  if (!hasPages) {
    return (
      <div className="notebook-viewer-container">
        <div className="notebook-controls">
          <div className="notebook-page-indicator">
            <BookOpen size={16} style={{ display: 'inline', marginRight: 6 }} />
            Cuaderno Escénico & Visual
          </div>
          <div className="badge-tag has-notebook">
            <Sparkles size={12} />
            Desglose Cinematográfico del Autor
          </div>
        </div>

        <div className="notebook-canvas" style={{ minHeight: 'auto', padding: '2rem' }}>
          <div style={{ maxWidth: '720px', width: '100%', color: '#ede8dc' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--gold-light)', marginBottom: '2rem', textAlign: 'center' }}>
              «Este poema fue concebido con una visión visual y escénica dividida en secuencias para Google Vids y videoarte.»
            </p>
            {poema.scenes && poema.scenes.map(s => (
              <div key={s.scene} className="scene-block" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '0.6rem' }}>
                <div className="scene-num">Escena {s.scene}</div>
                <div className="scene-verse">{s.text}</div>
                {s.prompt && (
                  <div className="scene-vision">
                    <strong>Visión visual:</strong> {s.prompt}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notebook-viewer-container">
      {/* Controles de página y zoom */}
      <div className="notebook-controls">
        <button 
          className="btn-notebook-nav" 
          onClick={prevPage} 
          disabled={currentPage === 0}
        >
          <ChevronLeft size={18} />
          <span>Página anterior</span>
        </button>

        <div className="notebook-page-indicator">
          Lámina {currentPage + 1} de {totalPages}
        </div>

        <div className="notebook-actions">
          <button 
            className="btn-notebook-nav" 
            onClick={toggleZoom}
            title={zoomLevel > 1 ? "Reducir zoom" : "Ampliar lámina"}
          >
            {zoomLevel > 1 ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            <span>{zoomLevel > 1 ? "Normal" : "Zoom"}</span>
          </button>

          <button 
            className="btn-notebook-nav" 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1}
          >
            <span>Siguiente</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Lienzo del Cuaderno */}
      <div className="notebook-canvas">
        <div 
          className="notebook-leaf"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          <img 
            src={poema.notebookPages[currentPage]} 
            alt={`Página ${currentPage + 1} de ${poema.title} en el cuaderno de Guillermo Baena Restrepo`}
            loading="eager"
          />
        </div>
      </div>

      {/* Selector rápido de miniaturas */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}>
        {poema.notebookPages.map((pageUrl, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            style={{
              width: '3.5rem',
              height: '4.8rem',
              borderRadius: '0.35rem',
              overflow: 'hidden',
              border: currentPage === idx ? '2px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.15)',
              background: '#000',
              cursor: 'pointer',
              opacity: currentPage === idx ? 1 : 0.6,
              transition: 'var(--transition-smooth)'
            }}
          >
            <img 
              src={pageUrl} 
              alt={`Miniatura ${idx + 1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};
