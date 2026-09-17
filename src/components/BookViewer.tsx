import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  BookOpen, 
  Download, 
  Palette, 
  Wand2,
  History,
  Bookmark
} from 'lucide-react';
import type { Poema } from '../data/poemas';
import type { GeneratedNotebook } from '../data/notebookTypes';
import { playPageFlipSound } from '../utils/aiGenerator';

interface BookViewerProps {
  poema: Poema;
  generatedNotebook: GeneratedNotebook | null;
  availableNotebooks: GeneratedNotebook[];
  onOpenStudio: () => void;
  onSelectNotebook: (notebook: GeneratedNotebook) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  poema,
  generatedNotebook,
  availableNotebooks,
  onOpenStudio,
  onSelectNotebook
}) => {
  const hasOriginalPages = poema.notebookPages && poema.notebookPages.length > 0;
  
  // Fuente activa: generado por IA o facsímil original
  const [viewSource, setViewSource] = useState<'generated' | 'original'>(
    generatedNotebook ? 'generated' : 'original'
  );

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  
  // Seguimiento de carga y reintento de imágenes
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Sincronizar fuente si cambia el cuaderno generado
  useEffect(() => {
    if (generatedNotebook) {
      setViewSource('generated');
      setCurrentPage(0);
    }
  }, [generatedNotebook]);

  const isViewingGenerated = viewSource === 'generated' && generatedNotebook && generatedNotebook.plates.length > 0;
  
  const totalPages = isViewingGenerated
    ? generatedNotebook.plates.length
    : (hasOriginalPages ? poema.notebookPages.length : 0);

  const currentGeneratedPlate = isViewingGenerated ? generatedNotebook.plates[currentPage] : null;

  // Animación realista de paso de página 3D con audio de papel pergamino
  const turnToPage = useCallback((newPage: number, direction: 'next' | 'prev') => {
    if (isFlipping || newPage === currentPage) return;
    
    // Reproducir sonido sutil y táctil de hoja de papel girando
    playPageFlipSound();

    setFlipDirection(direction);
    setIsFlipping(true);

    // En el cenit del giro 3D (270ms) cambiamos el contenido base
    setTimeout(() => {
      setCurrentPage(newPage);
    }, 270);

    // Al completar el arco tridimensional (560ms) terminamos la transición
    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 560);
  }, [isFlipping, currentPage]);

  // Precarga predictiva en segundo plano de las láminas adyacentes
  useEffect(() => {
    if (!isViewingGenerated || !generatedNotebook) return;
    const indices = [currentPage, currentPage + 1, currentPage - 1, currentPage + 2];
    indices.forEach(idx => {
      if (idx >= 0 && idx < generatedNotebook.plates.length) {
        const url = generatedNotebook.plates[idx].imageUrl;
        if (!loadedImages[url]) {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [url]: true }));
          };
        }
      }
    });
  }, [currentPage, isViewingGenerated, generatedNotebook, loadedImages]);

  // Reintento automático inteligente ante cortes o demoras iniciales de red
  const handleImageError = (url: string) => {
    setTimeout(() => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [url]: true }));
        setFailedImages(prev => ({ ...prev, [url]: false }));
      };
      img.onerror = () => {
        setFailedImages(prev => ({ ...prev, [url]: true }));
      };
    }, 2000);
  };

  // Reintento manual si la imagen tardó o tuvo alguna interrupción de red
  const handleRetryPlate = (imageUrl: string) => {
    setFailedImages(prev => ({ ...prev, [imageUrl]: false }));
    setLoadedImages(prev => ({ ...prev, [imageUrl]: false }));
    const img = new Image();
    const refreshParam = `retry=${Date.now()}`;
    const refreshedUrl = imageUrl.includes('?') ? `${imageUrl}&${refreshParam}` : `${imageUrl}?${refreshParam}`;
    img.src = refreshedUrl;
    img.onload = () => {
      setLoadedImages(prev => ({ ...prev, [imageUrl]: true }));
    };
    img.onerror = () => {
      setFailedImages(prev => ({ ...prev, [imageUrl]: true }));
    };
  };

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      turnToPage(currentPage + 1, 'next');
    }
  }, [currentPage, totalPages, turnToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      turnToPage(currentPage - 1, 'prev');
    }
  }, [currentPage, turnToPage]);

  // Soporte de navegación por teclado (flechas ← y →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  const toggleZoom = () => {
    setZoomLevel(prev => (prev === 1 ? 1.25 : 1));
  };

  const handleDownloadPlate = () => {
    if (!currentGeneratedPlate) return;
    const a = document.createElement('a');
    a.href = currentGeneratedPlate.imageUrl;
    a.download = `${poema.slug}-lamina-${currentPage + 1}.jpg`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Desglosar versos para la página derecha con capitular dorada
  const formatPoeticPage = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText) return { firstLetter: 'A', firstLine: '', otherLines: [] };
    const firstLetter = cleanText.charAt(0);
    const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] ? lines[0].slice(1) : '';
    const otherLines = lines.slice(1);
    return { firstLetter, firstLine, otherLines };
  };

  // CASO 1: NO HAY NI CUADERNO ORIGINAL NI GENERADO AÚN
  if (!isViewingGenerated && !hasOriginalPages) {
    return (
      <div className="notebook-viewer-container">
        <div className="notebook-ai-hero-banner">
          <div className="ai-hero-icon-box">
            <Wand2 size={38} className="gold-icon-glow" />
          </div>
          <h3 className="ai-hero-title text-gold-gradient">
            Diseña el Cuaderno Poético de «{poema.title}»
          </h3>
          <p className="ai-hero-desc">
            Crea un libro abierto de páginas ilustradas para esta obra. Selecciona entre 5 estilos artísticos (óleo clásico, acuarela lírica, cine 35mm, grabado o arte cósmico), define la extensión de láminas y la IA pintará cada página en un libro interactivo.
          </p>

          <button 
            className="btn btn-primary btn-cta-studio"
            onClick={onOpenStudio}
          >
            <Sparkles size={18} />
            <span>Abrir Taller y Crear Libro con IA</span>
          </button>
        </div>

        {/* Guion y desglose escénico original */}
        {poema.scenes && poema.scenes.length > 0 && (
          <div className="notebook-canvas" style={{ minHeight: 'auto', padding: '2rem', marginTop: '2rem' }}>
            <div style={{ maxWidth: '760px', width: '100%', color: '#ede8dc' }}>
              <div className="section-subtitle" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Guion y Desglose Visual del Autor
              </div>
              {poema.scenes.map(s => (
                <div key={s.scene} className="scene-block">
                  <div className="scene-num">Escena {s.scene}</div>
                  <div className="scene-verse">{s.text}</div>
                  {s.prompt && (
                    <div className="scene-vision">
                      <strong>Visión cinematográfica:</strong> {s.prompt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Preparar texto de la página poética
  const plateText = currentGeneratedPlate ? currentGeneratedPlate.verseText : (poema.fullText || '');
  const { firstLetter, firstLine, otherLines } = formatPoeticPage(plateText);

  return (
    <div className="notebook-viewer-container">
      {/* BARRA SUPERIOR DE HERRAMIENTAS Y FUENTES */}
      <div className="notebook-topbar">
        {/* Selector de Manuscrito Original vs Cuaderno IA */}
        <div className="notebook-source-selector">
          {hasOriginalPages && (
            <button
              className={`btn-source-toggle ${viewSource === 'original' ? 'active' : ''}`}
              onClick={() => {
                setViewSource('original');
                setCurrentPage(0);
              }}
            >
              <BookOpen size={15} />
              <span>Manuscrito Facsimilar ({poema.notebookPages.length} págs)</span>
            </button>
          )}

          {generatedNotebook && (
            <button
              className={`btn-source-toggle ${viewSource === 'generated' ? 'active' : ''}`}
              onClick={() => {
                setViewSource('generated');
                setCurrentPage(0);
              }}
            >
              <Sparkles size={15} />
              <span>Libro Ilustrado IA: {generatedNotebook.styleName} ({generatedNotebook.plates.length} págs)</span>
            </button>
          )}
        </div>

        {/* Acciones Rápidas: Crear otra versión o seleccionar histórico */}
        <div className="notebook-topbar-actions">
          {availableNotebooks.length > 1 && (
            <div className="notebook-history-dropdown">
              <History size={14} style={{ color: 'var(--gold-primary)' }} />
              <select
                value={generatedNotebook?.id || ''}
                onChange={(e) => {
                  const found = availableNotebooks.find(nb => nb.id === e.target.value);
                  if (found) {
                    onSelectNotebook(found);
                    setViewSource('generated');
                    setCurrentPage(0);
                  }
                }}
                className="notebook-select-input"
              >
                {availableNotebooks.map((nb, i) => (
                  <option key={nb.id} value={nb.id}>
                    Edición #{availableNotebooks.length - i}: {nb.styleName} ({new Date(nb.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button 
            className="btn-create-another-notebook"
            onClick={onOpenStudio}
            title="Crear otra edición única con otro estilo"
          >
            <Palette size={15} />
            <span>Crear Otra Edición</span>
          </button>
        </div>
      </div>

      {/* CONTROLES PRINCIPALES DE NAVEGACIÓN */}
      <div className="notebook-controls">
        <button 
          className="btn-notebook-nav" 
          onClick={prevPage} 
          disabled={currentPage === 0 || isFlipping}
          title="Pasar a la hoja anterior (tecla ←)"
        >
          <ChevronLeft size={18} />
          <span>Hoja anterior</span>
        </button>

        <div className="notebook-page-indicator">
          <Bookmark size={14} style={{ color: 'var(--gold-primary)', marginRight: '6px' }} />
          <span>Página {currentPage + 1} de {totalPages}</span>
        </div>

        <div className="notebook-actions">
          {isViewingGenerated && (
            <button 
              className="btn-notebook-nav" 
              onClick={handleDownloadPlate}
              title="Descargar esta lámina ilustrada en alta resolución"
            >
              <Download size={16} />
              <span>Guardar Lámina</span>
            </button>
          )}

          <button 
            className="btn-notebook-nav" 
            onClick={toggleZoom}
            title={zoomLevel > 1 ? "Vista normal del libro" : "Acercar detalles de la página"}
          >
            {zoomLevel > 1 ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            <span>{zoomLevel > 1 ? "Normal" : "Ampliar"}</span>
          </button>

          <button 
            className="btn-notebook-nav" 
            onClick={nextPage} 
            disabled={currentPage === totalPages - 1 || isFlipping}
            title="Pasar a la siguiente hoja (tecla →)"
          >
            <span>Siguiente hoja</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ESCENARIO DEL LIBRO ABIERTO (REALISTIC FLIPBOOK) */}
      <div className="open-book-viewport">
        {/* Botón flotante izquierdo de paso de página */}
        <button
          className="book-page-turn-touch left-turn"
          onClick={prevPage}
          disabled={currentPage === 0 || isFlipping}
          aria-label="Página anterior"
        >
          <ChevronLeft size={36} />
        </button>

        {/* ESTRUCTURA DEL LIBRO ABIERTO */}
        <div 
          className={`open-book-spread ${isFlipping ? `flip-${flipDirection}` : ''}`}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {/* Canto de encuadernación en piel/tela exterior */}
          <div className="book-hardcover-border" />

          {/* HOJA VOLADORA 3D EN MOVIMIENTO DE PASO DE PÁGINA */}
          {isFlipping && (
            <div className={`book-turning-leaf turning-${flipDirection}`}>
              <div className="turning-leaf-face leaf-front">
                <div className="turning-parchment" />
                <div className="turning-shadow" />
                <div className="turning-specular-light" />
              </div>
              <div className="turning-leaf-face leaf-back">
                <div className="turning-parchment" />
                <div className="turning-shadow reverse" />
                <div className="turning-specular-light reverse" />
              </div>
            </div>
          )}

          {/* PÁGINA IZQUIERDA (VERSO): LÁMINA ILUSTRADA O MANUSCRITO ORIGINAL */}
          <div className={`book-leaf-page page-verso ${isFlipping && flipDirection === 'next' ? 'page-receiving-turn' : ''} ${isFlipping && flipDirection === 'prev' ? 'page-turning-out' : ''}`}>
            <div className="page-parchment-texture" />
            <div className="page-spine-shadow shadow-left" />

            <div className="page-content-wrapper">
              {/* Encabezado editorial */}
              <div className="book-page-top-label">
                <span className="collection-header">{poema.collection || 'Que diría el olvido del último recuerdo'}</span>
                <span className="page-number-folio">{currentPage * 2 + 1}</span>
              </div>

              {/* Contenido Visual */}
              {isViewingGenerated && currentGeneratedPlate ? (
                <div className="book-plate-paspartu">
                  <div className="book-art-frame">
                    {/* Indicador de carga artística estilo pergamino */}
                    {!loadedImages[currentGeneratedPlate.imageUrl] && !failedImages[currentGeneratedPlate.imageUrl] && (
                      <div className="art-canvas-loader">
                        <div className="loader-shimmer-bg" />
                        <div className="canvas-loader-inner">
                          <div className="canvas-loader-icon-glow">
                            <Palette size={34} className="gold-icon-glow spin-gentle" />
                          </div>
                          <span className="canvas-loader-title">Iluminando Lámina Artística</span>
                          <span className="canvas-loader-style">{generatedNotebook?.styleName}</span>
                          <div className="canvas-loader-progress-track">
                            <div className="canvas-loader-progress-bar" />
                          </div>
                          <span className="canvas-loader-hint">Secando acuarela y matices en alta definición...</span>
                        </div>
                      </div>
                    )}

                    {/* Estado de reintento si la red se demoró */}
                    {failedImages[currentGeneratedPlate.imageUrl] && (
                      <div className="art-canvas-error">
                        <Sparkles size={28} className="gold-icon-glow" />
                        <span className="error-title">Lámina en Espera</span>
                        <span className="error-desc">El lienzo está tomando más tiempo del habitual en secar.</span>
                        <button 
                          className="btn-retry-plate"
                          onClick={() => handleRetryPlate(currentGeneratedPlate.imageUrl)}
                        >
                          <History size={14} />
                          <span>Reintentar Pincelada</span>
                        </button>
                      </div>
                    )}

                    <img 
                      src={currentGeneratedPlate.imageUrl} 
                      alt={`Lámina ilustrada ${currentGeneratedPlate.plateNumber} de ${poema.title}`}
                      className={`book-plate-img ${loadedImages[currentGeneratedPlate.imageUrl] ? 'image-visible' : 'image-hidden'}`}
                      loading="eager"
                      onLoad={() => setLoadedImages(prev => ({ ...prev, [currentGeneratedPlate.imageUrl]: true }))}
                      onError={() => handleImageError(currentGeneratedPlate.imageUrl)}
                    />
                  </div>
                  <div className="book-plate-subcaption">
                    <span className="caption-edition">{generatedNotebook?.styleName}</span>
                    <span className="caption-title">«{poema.title}» — Lámina {currentGeneratedPlate.plateNumber}</span>
                  </div>
                </div>
              ) : (
                <div className="book-manuscript-frame">
                  <img 
                    src={poema.notebookPages[currentPage]} 
                    alt={`Manuscrito original ${currentPage + 1}`}
                    className="manuscript-img"
                    loading="eager"
                  />
                  <div className="manuscript-caption">
                    Manuscrito de puño y letra de Guillermo Baena Restrepo
                  </div>
                </div>
              )}

              {/* Pie de página decorativo */}
              <div className="book-page-bottom-label">
                <span className="leaf-ornament">✦</span>
              </div>
            </div>
          </div>

          {/* LOMO CENTRAL / PLIEGUE DEL LIBRO */}
          <div className="book-spine-binding">
            <div className="spine-deep-crease" />
            <div className="spine-stitches" />
          </div>

          {/* PÁGINA DERECHA (RECTO): VERSOS EN TIPOGRAFÍA POÉTICA */}
          <div className={`book-leaf-page page-recto ${isFlipping && flipDirection === 'next' ? 'page-turning-out' : ''} ${isFlipping && flipDirection === 'prev' ? 'page-receiving-turn' : ''}`}>
            <div className="page-parchment-texture" />
            <div className="page-spine-shadow shadow-right" />

            <div className="page-content-wrapper">
              {/* Encabezado editorial */}
              <div className="book-page-top-label">
                <span className="poem-header-title">{poema.title}</span>
                <span className="page-number-folio">{currentPage * 2 + 2}</span>
              </div>

              {/* Texto Lírico y Versos de la Página */}
              <div className="book-poetic-page-body">
                <div className="poem-stanza-card">
                  {/* Letra Capitular Ornamental y Primer Verso */}
                  <div className="dropcap-row">
                    <span className="ornamental-dropcap">{firstLetter}</span>
                    <p className="lead-verse-line">{firstLine}</p>
                  </div>

                  {/* Resto de versos de la página */}
                  <div className="remaining-verses-list">
                    {otherLines.map((line, idx) => (
                      <p key={idx} className="poetic-verse-line">{line}</p>
                    ))}
                  </div>

                  {/* Separador poético y firma del autor */}
                  <div className="poem-footer-block">
                    <div className="poetic-gold-divider">
                      <span>❦</span>
                    </div>
                    <div className="poet-sign">
                      Guillermo Baena Restrepo
                    </div>
                    {generatedNotebook?.userNotes && isViewingGenerated && (
                      <div className="author-notes-tribute">
                        Nota del lector: «{generatedNotebook.userNotes}»
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Pie de página editorial */}
              <div className="book-page-bottom-label">
                <span className="book-imprint">El Cosmos de Guille</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botón flotante derecho de paso de página */}
        <button
          className="book-page-turn-touch right-turn"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1 || isFlipping}
          aria-label="Página siguiente"
        >
          <ChevronRight size={36} />
        </button>
      </div>

      {/* TIRA DE MINIATURAS DEL LIBRO (CARRUSEL INFERIOR) */}
      <div className="notebook-thumbnails-strip">
        <div className="strip-title">Hojas del Cuaderno:</div>
        {isViewingGenerated && generatedNotebook
          ? generatedNotebook.plates.map((plate, idx) => (
              <button
                key={plate.id}
                onClick={() => {
                  if (idx !== currentPage) {
                    turnToPage(idx, idx > currentPage ? 'next' : 'prev');
                  }
                }}
                className={`thumb-btn ${currentPage === idx ? 'active' : ''}`}
                title={`Abrir Hoja ${idx + 1}`}
              >
                <img 
                  src={plate.imageUrl} 
                  alt={`Miniatura Hoja ${idx + 1}`} 
                />
                <span className="thumb-num">{idx + 1}</span>
              </button>
            ))
          : poema.notebookPages.map((pageUrl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (idx !== currentPage) {
                    turnToPage(idx, idx > currentPage ? 'next' : 'prev');
                  }
                }}
                className={`thumb-btn ${currentPage === idx ? 'active' : ''}`}
                title={`Abrir Hoja ${idx + 1}`}
              >
                <img 
                  src={pageUrl} 
                  alt={`Miniatura ${idx + 1}`} 
                />
                <span className="thumb-num">{idx + 1}</span>
              </button>
            ))}
      </div>
    </div>
  );
};
