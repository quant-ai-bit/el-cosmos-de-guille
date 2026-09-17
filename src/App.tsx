import { useState, useEffect } from 'react';
import { 
  Play, 
  BookOpen, 
  Film, 
  FileText, 
  Sparkles, 
  Quote, 
  Volume2, 
  ChevronRight, 
  Headphones, 
  Wand2,
  Library,
  Layers
} from 'lucide-react';
import { POEMAS, AUTOR_INFO } from './data/poemas';
import type { Poema } from './data/poemas';
import type { GeneratedNotebook } from './data/notebookTypes';
import { getNotebooksForPoem, getLatestNotebookForPoem, getAllNotebooks } from './utils/notebookStorage';
import { Navbar } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { TextViewer } from './components/TextViewer';
import { BookViewer } from './components/BookViewer';
import { VideoPlayer } from './components/VideoPlayer';
import { NotebookStudio } from './components/NotebookStudio';
import { NotebookGallery } from './components/NotebookGallery';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'poem' | 'author' | 'gallery'>('home');
  const [selectedPoem, setSelectedPoem] = useState<Poema>(POEMAS[0]);
  const [activeMode, setActiveMode] = useState<'texto' | 'cuaderno' | 'video'>('texto');
  
  // Estado del Estudio Generativo de Cuadernos con IA
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [activeGeneratedNotebook, setActiveGeneratedNotebook] = useState<GeneratedNotebook | null>(() => 
    getLatestNotebookForPoem(POEMAS[0].id)
  );
  const [allNotebooksCount, setAllNotebooksCount] = useState<number>(0);

  // Estado del Reproductor de Audio Global Persistente
  const [audioPoem, setAudioPoem] = useState<Poema | null>(POEMAS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    getAllNotebooks().then((list) => {
      if (list) {
        setAllNotebooksCount(list.length);
      }
    });
  }, []);

  const handleOpenPoem = (poema: Poema, initialMode: 'texto' | 'cuaderno' | 'video' = 'texto') => {
    setSelectedPoem(poema);
    setActiveGeneratedNotebook(getLatestNotebookForPoem(poema.id));
    setActiveMode(initialMode);
    setCurrentView('poem');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNotebookFromGallery = (poema: Poema, notebook: GeneratedNotebook) => {
    setSelectedPoem(poema);
    setActiveGeneratedNotebook(notebook);
    setActiveMode('cuaderno');
    setCurrentView('poem');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAudio = (poema: Poema) => {
    if (audioPoem?.id === poema.id) {
      setIsPlayingAudio(!isPlayingAudio);
    } else {
      setAudioPoem(poema);
      setIsPlayingAudio(true);
    }
  };

  const handleNextAudio = () => {
    if (!audioPoem) return;
    const currentIndex = POEMAS.findIndex(p => p.id === audioPoem.id);
    const nextIndex = (currentIndex + 1) % POEMAS.length;
    setAudioPoem(POEMAS[nextIndex]);
    setIsPlayingAudio(true);
  };

  const handlePrevAudio = () => {
    if (!audioPoem) return;
    const currentIndex = POEMAS.findIndex(p => p.id === audioPoem.id);
    const prevIndex = (currentIndex - 1 + POEMAS.length) % POEMAS.length;
    setAudioPoem(POEMAS[prevIndex]);
    setIsPlayingAudio(true);
  };

  return (
    <div>
      <Navbar 
        currentView={currentView}
        onNavigateHome={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onNavigateGallery={() => { setCurrentView('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onNavigateAuthor={() => {
          if (currentView !== 'home') setCurrentView('home');
          setTimeout(() => {
            document.getElementById('autor-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      <main>
        {currentView === 'home' && (
          <div>
            {/* HERO SECTION DE LA PORTADA */}
            <section className="hero-section">
              <div className="site-container hero-grid">
                <div>
                  <div className="hero-badge">
                    <Sparkles size={14} />
                    <span>Colección Poética Destacada</span>
                  </div>

                  <h1 className="hero-title text-gold-gradient">
                    {AUTOR_INFO.poemarioPrincipal}
                  </h1>

                  <div className="hero-author">
                    Por {AUTOR_INFO.nombre}
                  </div>

                  <p className="hero-lead">
                    Adéntrate en una experiencia poética tridimensional: lee las letras en tipografía de colección, contempla los manuscritos originales en cuadernos gráficos facsímiles y revive cada verso a través de la declamación y las películas poéticas en video.
                  </p>

                  <div className="hero-actions">
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        document.getElementById('indice-poemas')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <BookOpen size={18} />
                      <span>Explorar Poemario</span>
                    </button>

                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setCurrentView('gallery');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <Library size={18} />
                      <span>Galería de Cuadernos ({allNotebooksCount})</span>
                    </button>

                    <button 
                      className="btn btn-outline"
                      onClick={() => handlePlayAudio(POEMAS[0])}
                    >
                      <Headphones size={18} />
                      <span>{isPlayingAudio ? "Pausar Declamación" : "Escuchar Voz de Guille"}</span>
                    </button>

                    <button 
                      className="btn btn-studio-sparkle"
                      onClick={() => {
                        handleOpenPoem(selectedPoem, 'cuaderno');
                        setIsStudioOpen(true);
                      }}
                    >
                      <Wand2 size={18} />
                      <span>Taller de Cuadernos IA</span>
                    </button>
                  </div>
                </div>

                {/* Portada Oficial */}
                <div className="book-cover-container">
                  <div className="book-cover-frame">
                    <img 
                      src={AUTOR_INFO.portadaUrl} 
                      alt={`Portada del libro ${AUTOR_INFO.poemarioPrincipal} de ${AUTOR_INFO.nombre}`}
                      className="book-cover-img"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* CUADRÍCULA / ÍNDICE DE POEMAS */}
            <section id="indice-poemas" className="poems-section">
              <div className="site-container">
                <div className="section-header">
                  <div className="section-subtitle">Tabla de Contenidos</div>
                  <h2 className="section-title">Poemas & Obras del Libro</h2>
                  <p className="section-desc">
                    Selecciona cualquier poema para disfrutarlo en sus tres formas: texto literario, cuaderno gráfico escaneado o video cinematográfico.
                  </p>
                </div>

                <div className="poems-grid">
                  {POEMAS.map((poema, index) => (
                    <article 
                      key={poema.id} 
                      className="poem-card"
                      onClick={() => handleOpenPoem(poema, 'texto')}
                    >
                      <div className="poem-card-header">
                        <span className="poem-index">Obra 0{index + 1}</span>
                        <div className="media-badges">
                          <span className="badge-tag">
                            <FileText size={11} />
                            Texto
                          </span>
                          {poema.hasNotebook && (
                            <span className="badge-tag has-notebook">
                              <BookOpen size={11} />
                              Cuaderno
                            </span>
                          )}
                          <span className="badge-tag has-video">
                            <Film size={11} />
                            Video
                          </span>
                        </div>
                      </div>

                      <h3 className="poem-card-title">{poema.title}</h3>
                      <div className="poem-card-subtitle">{poema.subtitle}</div>
                      <p className="poem-card-synopsis">{poema.synopsis}</p>

                      <div className="poem-card-footer" onClick={(e) => e.stopPropagation()}>
                        <button 
                          className="btn-open-poem"
                          onClick={() => handleOpenPoem(poema, 'texto')}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <span>Ver Poema Completo</span>
                          <ChevronRight size={16} />
                        </button>

                        <button 
                          className="btn-quick-play"
                          onClick={() => handlePlayAudio(poema)}
                          title={`Escuchar declamación de ${poema.title}`}
                        >
                          {audioPoem?.id === poema.id && isPlayingAudio ? (
                            <Volume2 size={16} />
                          ) : (
                            <Play size={15} style={{ marginLeft: 2 }} />
                          )}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* SECCIÓN BANNER GALERÍA COMUNITARIA */}
            <section className="gallery-banner-section">
              <div className="site-container">
                <div className="gallery-promo-box">
                  <div className="gallery-promo-content">
                    <div className="gallery-promo-badge">
                      <Sparkles size={14} />
                      <span>Biblioteca Digital & Descarga en PDF</span>
                    </div>
                    <h3 className="gallery-promo-title text-gold-gradient">
                      Libros de Arte Ilustrados en la Galería
                    </h3>
                    <p className="gallery-promo-desc">
                      Descubre todas las ediciones compuestas por los lectores con Google Imagen 3. Puedes hojear cada cuaderno en modo libro o descargarlo encuadernado en PDF de alta fidelidad editorial.
                    </p>
                    <div className="gallery-promo-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setCurrentView('gallery');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Library size={18} />
                        <span>Entrar a la Galería de Cuadernos</span>
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={() => {
                          handleOpenPoem(selectedPoem, 'cuaderno');
                          setIsStudioOpen(true);
                        }}
                      >
                        <Wand2 size={18} />
                        <span>Crear Nueva Edición</span>
                      </button>
                    </div>
                  </div>
                  <div className="gallery-promo-graphic">
                    <div className="gallery-stacked-card card-1">
                      <Layers size={32} style={{ color: 'var(--gold-primary)' }} />
                      <span>PDF Editorial</span>
                    </div>
                    <div className="gallery-stacked-card card-2">
                      <Sparkles size={28} style={{ color: 'var(--gold-light)' }} />
                      <span>Google Imagen 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN SOBRE EL POETA */}
            <section id="autor-section" className="author-section">
              <div className="site-container author-grid">
                <div className="author-photo-frame">
                  <img src={AUTOR_INFO.fotoAutorUrl} alt={AUTOR_INFO.nombre} />
                </div>

                <div>
                  <h2 className="author-name">{AUTOR_INFO.nombre}</h2>
                  <div className="author-tagline">Poeta, Pensador y Narrador de la Memoria</div>
                  
                  <p className="author-bio">
                    {AUTOR_INFO.biografia}
                  </p>

                  <div className="author-quote-box">
                    <Quote size={24} style={{ opacity: 0.35, marginBottom: '0.4rem' }} />
                    <p>{AUTOR_INFO.pensamiento}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VISTA DE LA GALERÍA DE CUADERNOS */}
        {currentView === 'gallery' && (
          <NotebookGallery 
            onOpenNotebook={handleOpenNotebookFromGallery}
            onOpenStudioForPoem={(p) => {
              setSelectedPoem(p);
              setIsStudioOpen(true);
            }}
          />
        )}

        {/* VISTA DETALLADA DEL POEMA (SELECTOR DE TRES MODOS) */}
        {currentView === 'poem' && (
          <div className="site-container poem-view-container">
            <div className="poem-breadcrumbs">
              <a onClick={() => setCurrentView('home')}>← Volver al Poemario</a>
              <span>/</span>
              <a onClick={() => setCurrentView('gallery')}>Galería de Cuadernos</a>
              <span>/</span>
              <span style={{ color: 'var(--gold-light)' }}>{selectedPoem.title}</span>
            </div>

            <div className="poem-header-banner">
              <h2 className="poem-main-title text-gold-gradient">{selectedPoem.title}</h2>
              <div className="poem-main-subtitle">{selectedPoem.subtitle}</div>
            </div>

            {/* Selector de los Tres Modos */}
            <div className="mode-tabs-wrapper">
              <div className="mode-tabs">
                <button 
                  className={`mode-tab-btn ${activeMode === 'texto' ? 'active' : ''}`}
                  onClick={() => setActiveMode('texto')}
                >
                  <FileText size={18} />
                  <span>Texto Poético</span>
                </button>

                <button 
                  className={`mode-tab-btn ${activeMode === 'cuaderno' ? 'active' : ''}`}
                  onClick={() => setActiveMode('cuaderno')}
                >
                  <BookOpen size={18} />
                  <span>
                    Cuaderno Gráfico {activeGeneratedNotebook ? `(IA: ${activeGeneratedNotebook.plates.length} lám)` : (selectedPoem.hasNotebook ? `(${selectedPoem.notebookPages.length} págs)` : '')}
                  </span>
                  {activeGeneratedNotebook && (
                    <span className="tab-sparkle-pill">
                      <Sparkles size={11} />
                      IA
                    </span>
                  )}
                </button>

                <button 
                  className={`mode-tab-btn ${activeMode === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveMode('video')}
                >
                  <Film size={18} />
                  <span>Película en Video</span>
                </button>
              </div>

              {/* Acceso directo al Taller IA */}
              <button
                className="btn-mode-quick-studio"
                onClick={() => setIsStudioOpen(true)}
                title="Abrir Taller de Creación con Inteligencia Artificial"
              >
                <Wand2 size={16} />
                <span>Diseñar Cuaderno con IA</span>
              </button>
            </div>

            {/* Contenido según el Modo Activo */}
            {activeMode === 'texto' && (
              <TextViewer 
                poema={selectedPoem}
                isPlaying={audioPoem?.id === selectedPoem.id && isPlayingAudio}
                onTogglePlay={() => handlePlayAudio(selectedPoem)}
              />
            )}

            {activeMode === 'cuaderno' && (
              <BookViewer 
                poema={selectedPoem}
                generatedNotebook={activeGeneratedNotebook}
                availableNotebooks={getNotebooksForPoem(selectedPoem.id)}
                onOpenStudio={() => setIsStudioOpen(true)}
                onSelectNotebook={(nb) => setActiveGeneratedNotebook(nb)}
              />
            )}

            {activeMode === 'video' && (
              <VideoPlayer poema={selectedPoem} />
            )}
          </div>
        )}
      </main>

      {/* MODAL DEL ESTUDIO GENERATIVO DE CUADERNOS POÉTICOS */}
      <NotebookStudio
        poema={selectedPoem}
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onNotebookCreated={(newNotebook) => {
          setActiveGeneratedNotebook(newNotebook);
          setActiveMode('cuaderno');
        }}
      />

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-brand">{AUTOR_INFO.sitioTitulo}</div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Guillermo Baena Restrepo • Obra Poética y Audiovisual. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* REPRODUCTOR DE AUDIO FLOTANTE PERSISTENTE */}
      {audioPoem && (
        <AudioPlayer
          currentPoem={audioPoem}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
          onNextPoem={handleNextAudio}
          onPrevPoem={handlePrevAudio}
          onClose={() => setIsPlayingAudio(false)}
        />
      )}
    </div>
  );
}

export default App;
