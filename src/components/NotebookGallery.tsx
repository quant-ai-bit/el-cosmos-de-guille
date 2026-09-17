import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  FileDown, 
  Palette, 
  Calendar, 
  Search, 
  Wand2, 
  Layers, 
  Loader2
} from 'lucide-react';
import type { GeneratedNotebook } from '../data/notebookTypes';
import { NOTEBOOK_STYLES } from '../data/notebookTypes';
import { POEMAS } from '../data/poemas';
import type { Poema } from '../data/poemas';
import { getAllNotebooks, subscribeToNotebooks } from '../utils/notebookStorage';
import { exportNotebookToPdf } from '../utils/pdfExporter';

interface NotebookGalleryProps {
  onOpenNotebook: (poema: Poema, notebook: GeneratedNotebook) => void;
  onOpenStudioForPoem: (poema: Poema) => void;
}

export const NotebookGallery: React.FC<NotebookGalleryProps> = ({
  onOpenNotebook,
  onOpenStudioForPoem
}) => {
  const [notebooks, setNotebooks] = useState<GeneratedNotebook[]>([]);
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exportingId, setExportingId] = useState<string | null>(null);

  useEffect(() => {
    // Suscribirse a cambios en la colección de cuadernos
    const unsubscribe = subscribeToNotebooks((list) => {
      setNotebooks(list);
    });

    // Cargar también desde la nube Firestore
    getAllNotebooks().then((cloudList) => {
      if (cloudList && cloudList.length > 0) {
        setNotebooks(cloudList);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleExportPdf = async (notebook: GeneratedNotebook, e: React.MouseEvent) => {
    e.stopPropagation();
    const poema = POEMAS.find(p => p.id === notebook.poemId) || ({
      id: notebook.poemId,
      title: notebook.poemTitle,
      subtitle: '',
      synopsis: '',
      collection: '',
      year: '',
      slug: notebook.poemTitle.toLowerCase().replace(/\s+/g, '-'),
      fullText: notebook.plates.map(p => p.verseText).join('\n\n'),
      hasNotebook: true,
      hasVideo: false,
      audioUrl: '',
      vidsUrl: '',
      notebookPages: []
    } as Poema);

    setExportingId(notebook.id);
    try {
      await exportNotebookToPdf(notebook, poema);
    } catch (err) {
      console.error('Error al exportar PDF:', err);
      alert('Hubo un inconveniente al generar el PDF. Por favor reintenta.');
    } finally {
      setExportingId(null);
    }
  };

  const filteredNotebooks = notebooks.filter(nb => {
    const matchesStyle = selectedStyleFilter === 'all' || nb.styleId === selectedStyleFilter;
    const matchesSearch = searchQuery.trim() === '' || 
      nb.poemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nb.styleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (nb.userNotes && nb.userNotes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStyle && matchesSearch;
  });

  return (
    <div className="gallery-view-container site-container">
      {/* ENCABEZADO DE LA GALERÍA */}
      <div className="gallery-header">
        <div className="gallery-badge">
          <Sparkles size={15} />
          <span>Biblioteca Comunitaria • Nube Persistente</span>
        </div>
        <h1 className="gallery-title text-gold-gradient">
          Galería de Cuadernos Poéticos Ilustrados
        </h1>
        <p className="gallery-subtitle">
          Ediciones de arte generadas e iluminadas mediante Google Imagen 3 sobre la obra poética de Guillermo Baena Restrepo. Cada cuaderno es un libro abierto disponible para lectura inmersiva y descarga en PDF editorial.
        </p>
      </div>

      {/* BARRA DE FILTROS Y BÚSQUEDA */}
      <div className="gallery-filters-bar">
        {/* Barra de búsqueda */}
        <div className="gallery-search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text"
            className="gallery-search-input"
            placeholder="Buscar por poema, estilo o tema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filtro por estilo */}
        <div className="gallery-style-pills">
          <button 
            className={`gallery-pill ${selectedStyleFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStyleFilter('all')}
          >
            Todos ({notebooks.length})
          </button>
          {NOTEBOOK_STYLES.map(style => {
            const count = notebooks.filter(nb => nb.styleId === style.id).length;
            return (
              <button 
                key={style.id}
                className={`gallery-pill ${selectedStyleFilter === style.id ? 'active' : ''}`}
                onClick={() => setSelectedStyleFilter(style.id)}
              >
                <span>{style.name.split('&')[0]}</span>
                {count > 0 && <span className="pill-count">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* LISTADO DE CUADERNOS O ESTADO VACÍO */}
      {filteredNotebooks.length === 0 ? (
        <div className="gallery-empty-card">
          <div className="empty-icon-halo">
            <BookOpen size={42} className="gold-icon-glow" />
          </div>
          <h3 className="empty-title">Aún no hay cuadernos en esta categoría</h3>
          <p className="empty-desc">
            Sé el primero en encuadernar una edición ilustrada con inteligencia artificial. Elige cualquier poema de la colección y dale vida visual con óleo, acuarela, cine o arte cósmico.
          </p>
          <button 
            className="btn btn-primary btn-empty-cta"
            onClick={() => onOpenStudioForPoem(POEMAS[0])}
          >
            <Wand2 size={16} />
            <span>Diseñar el Primer Cuaderno</span>
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredNotebooks.map(notebook => {
            const poemaMatch = POEMAS.find(p => p.id === notebook.poemId) || POEMAS[0];
            const coverPlate = notebook.plates[0];
            const formattedDate = new Date(notebook.createdAt).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <div 
                key={notebook.id}
                className="gallery-card"
                onClick={() => onOpenNotebook(poemaMatch, notebook)}
              >
                {/* Portada / Portadilla de la lámina */}
                <div className="gallery-card-cover">
                  {coverPlate ? (
                    <img 
                      src={coverPlate.imageUrl} 
                      alt={`Portada de ${notebook.poemTitle}`}
                      className="gallery-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="gallery-card-placeholder">
                      <BookOpen size={36} />
                    </div>
                  )}

                  {/* Gradiente y badges superpuestos */}
                  <div className="gallery-card-badge-top">
                    <span className="style-badge-tag-floating">
                      <Palette size={12} />
                      <span>{notebook.styleName.split('&')[0]}</span>
                    </span>
                  </div>

                  <div className="gallery-card-plates-count">
                    <Layers size={13} />
                    <span>{notebook.plates.length} láminas</span>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="gallery-card-body">
                  <div className="gallery-card-meta">
                    <span className="card-meta-date">
                      <Calendar size={12} />
                      <span>{formattedDate}</span>
                    </span>
                  </div>

                  <h3 className="gallery-card-title">
                    «{notebook.poemTitle}»
                  </h3>

                  {notebook.userNotes && (
                    <p className="gallery-card-notes">
                      «{notebook.userNotes}»
                    </p>
                  )}

                  {/* Extracto del primer verso */}
                  {coverPlate && (
                    <p className="gallery-card-verse-snippet">
                      {coverPlate.verseText.replace(/\n+/g, ' ').slice(0, 95)}...
                    </p>
                  )}

                  {/* Acciones de la tarjeta */}
                  <div className="gallery-card-footer">
                    <button 
                      className="btn-card-read"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenNotebook(poemaMatch, notebook);
                      }}
                    >
                      <BookOpen size={14} />
                      <span>Leer Libro</span>
                    </button>

                    <button 
                      className="btn-card-pdf"
                      onClick={(e) => handleExportPdf(notebook, e)}
                      disabled={exportingId === notebook.id}
                      title="Descargar libro maquetado en PDF"
                    >
                      {exportingId === notebook.id ? (
                        <Loader2 size={14} className="spin-loader" />
                      ) : (
                        <FileDown size={14} />
                      )}
                      <span>{exportingId === notebook.id ? 'PDF...' : 'PDF'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
