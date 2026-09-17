import React, { useState, useCallback } from 'react';
import { 
  Sparkles, 
  X, 
  Palette, 
  MessageSquare, 
  Check, 
  Loader2, 
  ArrowRight,
  BookOpen,
  Wand2,
  Bookmark
} from 'lucide-react';
import type { Poema } from '../data/poemas';
import { NOTEBOOK_STYLES, segmentPoemHarmonically } from '../data/notebookTypes';
import type { NotebookStyle, GeneratedNotebook, GeneratedPlate } from '../data/notebookTypes';
import { 
  buildPlatePrompt, 
  generatePlateImageSmart, 
  getGoogleApiKey 
} from '../utils/aiGenerator';
import { saveNotebook } from '../utils/notebookStorage';

interface NotebookStudioProps {
  poema: Poema;
  isOpen: boolean;
  onClose: () => void;
  onNotebookCreated: (notebook: GeneratedNotebook) => void;
}

export const NotebookStudio: React.FC<NotebookStudioProps> = ({
  poema,
  isOpen,
  onClose,
  onNotebookCreated
}) => {
  const [selectedStyle, setSelectedStyle] = useState<NotebookStyle>(NOTEBOOK_STYLES[0]);
  const [userNotes, setUserNotes] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [previewPlates, setPreviewPlates] = useState<GeneratedPlate[]>([]);

  // El número de páginas lo define el tamaño y la distribución armónica del texto
  const poemSegments = segmentPoemHarmonically(poema.fullText);

  const handleStartGeneration = useCallback(async () => {
    setIsGenerating(true);
    setProgressPercent(5);
    setStatusMessage('Componiendo la edición poética y distribuyendo versos...');
    setPreviewPlates([]);

    const baseSeed = Math.floor(Math.random() * 899999) + 100000;
    const total = poemSegments.length;
    const apiKey = getGoogleApiKey();

    try {
      const plateDefinitions = poemSegments.map((verse, i) => {
        const plateNumber = i + 1;
        const plateSeed = baseSeed + i * 17;
        const prompt = buildPlatePrompt(
          verse,
          poema.title,
          selectedStyle,
          userNotes,
          plateNumber,
          total
        );
        return { verse, plateNumber, plateSeed, prompt, index: i };
      });

      let completedCount = 0;
      const results: GeneratedPlate[] = new Array(total);

      // Disparar las peticiones en paralelo con desfase elegante de 250ms
      const promises = plateDefinitions.map(async (def, i) => {
        await new Promise(res => setTimeout(res, i * 250));
        
        const { imageUrl } = await generatePlateImageSmart(def.prompt, def.plateSeed, apiKey);
        
        const plate: GeneratedPlate = {
          id: `plate-${Date.now()}-${def.index}`,
          plateNumber: def.plateNumber,
          totalPlates: total,
          verseText: def.verse,
          promptUsed: def.prompt,
          imageUrl,
          seed: def.plateSeed,
          timestamp: Date.now()
        };

        results[def.index] = plate;
        completedCount++;
        setProgressPercent(Math.round((completedCount / total) * 85) + 12);
        setStatusMessage(`Página ${completedCount} de ${total} lista: "${def.verse.slice(0, 36).replace(/\n/g, ' ')}..."`);
        setPreviewPlates(results.filter(Boolean));
        return plate;
      });

      const allPlates = await Promise.all(promises);

      setProgressPercent(100);
      setStatusMessage('¡Páginas completadas! Encuadernando el libro de colección...');

      // Crear el cuaderno consolidado
      const newNotebook: GeneratedNotebook = {
        id: `nb-${poema.id}-${Date.now()}`,
        poemId: poema.id,
        poemTitle: poema.title,
        styleId: selectedStyle.id,
        styleName: selectedStyle.name,
        userNotes: userNotes.trim() ? userNotes.trim() : undefined,
        plates: allPlates,
        createdAt: new Date().toISOString(),
        seed: baseSeed
      };

      // Guardar en almacenamiento local
      saveNotebook(newNotebook);

      setTimeout(() => {
        setIsGenerating(false);
        onNotebookCreated(newNotebook);
        onClose();
      }, 700);

    } catch (err) {
      console.error('Error durante la generación del cuaderno:', err);
      setIsGenerating(false);
      setStatusMessage('Ocurrió un inconveniente al generar. Puedes reintentar.');
    }
  }, [poemSegments, poema, selectedStyle, userNotes, onNotebookCreated, onClose]);

  if (!isOpen) return null;

  return (
    <div className="studio-modal-overlay" onClick={() => !isGenerating && onClose()}>
      <div 
        className="studio-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ENCABEZADO */}
        <div className="studio-modal-header">
          <div className="studio-badge">
            <Sparkles size={14} />
            <span>Taller Editorial de Cuadernos Poéticos</span>
          </div>

          <button 
            className="btn-modal-close" 
            onClick={onClose}
            disabled={isGenerating}
            title="Cerrar estudio"
          >
            <X size={20} />
          </button>
        </div>

        <div className="studio-modal-title-row">
          <h2 className="studio-modal-title text-gold-gradient">
            Crear Libro Ilustrado: {poema.title}
          </h2>
          <p className="studio-modal-desc">
            Cada edición se compone de páginas abiertas con lámina ilustrada a la izquierda y verso clásico a la derecha. El número de páginas se calcula armónicamente según la métrica y extensión de la obra.
          </p>
        </div>

        {/* CONTENIDO DEL FORMULARIO O PROCESO DE GENERACIÓN */}
        {!isGenerating ? (
          <div className="studio-modal-body">
            
            {/* DISTRIBUCIÓN ARMÓNICA EDITORIAL */}
            <div className="harmonic-edition-banner">
              <div className="harmonic-icon-tag">
                <Bookmark size={15} style={{ color: 'var(--gold-primary)' }} />
              </div>
              <div className="harmonic-text">
                Composición Armónica: <strong>{poemSegments.length} páginas dobles</strong> distribuidas según el ritmo natural de los versos.
              </div>
            </div>

            {/* PASO 1: SELECCIÓN DE ESTILO ARTÍSTICO */}
            <div className="studio-section">
              <div className="studio-section-label">
                <Palette size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>1. Estilo pictórico para las láminas</span>
              </div>

              <div className="styles-grid">
                {NOTEBOOK_STYLES.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <div
                      key={style.id}
                      className={`style-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedStyle(style)}
                      style={{
                        borderColor: isSelected ? style.color : 'rgba(212, 175, 55, 0.15)'
                      }}
                    >
                      <div className="style-card-header">
                        <span 
                          className="style-badge-tag"
                          style={{ borderColor: style.color, color: style.color }}
                        >
                          {style.badge}
                        </span>
                        {isSelected && (
                          <span className="style-check-icon" style={{ background: style.color }}>
                            <Check size={13} color="#000" />
                          </span>
                        )}
                      </div>

                      <div className="style-card-name" style={{ color: isSelected ? style.color : 'var(--text-main)' }}>
                        {style.name}
                      </div>

                      <div className="style-card-tagline">{style.tagline}</div>
                      <p className="style-card-desc">{style.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PASO 2: OBSERVACIÓN O INDICACIÓN LIBRE DEL USUARIO */}
            <div className="studio-section">
              <div className="studio-section-label">
                <MessageSquare size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>2. Indicación artística o matiz de color (opcional)</span>
              </div>
              
              <div className="studio-notes-wrapper">
                <textarea
                  className="studio-notes-textarea"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Ej: Deseo tonos dorados de atardecer, presencia de lluvia suave, atmósfera de silencio andino o detalles de luz tenue..."
                  rows={3}
                  maxLength={300}
                />
                <div className="studio-notes-hint">
                  Esta indicación se sumará a los versos del poema para que la IA interprete las láminas a tu gusto ({userNotes.length}/300 car.).
                </div>
              </div>
            </div>

            {/* VISTA PREVIA DE PÁGINAS ARMÓNICAS */}
            <div className="studio-section">
              <div className="studio-section-label">
                <BookOpen size={16} style={{ color: 'var(--gold-primary)' }} />
                <span>Estructura de las {poemSegments.length} páginas del libro</span>
              </div>

              <div className="verses-preview-list">
                {poemSegments.map((segment, idx) => (
                  <div key={idx} className="verse-preview-item">
                    <span className="verse-preview-num">Pág {idx + 1}</span>
                    <span className="verse-preview-text">«{segment.replace(/\n+/g, ' ').slice(0, 115)}...»</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="studio-actions-footer">
              <button 
                className="btn btn-outline" 
                onClick={onClose}
              >
                Cancelar
              </button>

              <button 
                className="btn btn-primary btn-generate-notebook"
                onClick={handleStartGeneration}
              >
                <Wand2 size={18} />
                <span>Generar Libro Ilustrado ({poemSegments.length} págs)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* ESTADO DE GENERACIÓN EN PROCESO */
          <div className="studio-generating-container">
            <div className="generating-header">
              <div className="generating-icon-pulse">
                <Sparkles size={36} className="sparkle-anim" />
              </div>
              <h3 className="generating-title">
                Ilustrando las Páginas de «{poema.title}»
              </h3>
              <p className="generating-style-info">
                Estilo: <strong>{selectedStyle.name}</strong> • Edición de {poemSegments.length} páginas
              </p>
            </div>

            {/* Barra de Progreso */}
            <div className="progress-bar-wrapper">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <div className="progress-details-row">
              <div className="progress-status-text">
                <Loader2 size={15} className="spin-loader" />
                <span>{statusMessage}</span>
              </div>
              <div className="progress-percentage">{progressPercent}%</div>
            </div>

            {/* Vista Previa en Vivo de Láminas Creadas */}
            {previewPlates.length > 0 && (
              <div className="generating-previews-area">
                <div className="previews-title">
                  Páginas ilustradas ({previewPlates.length} de {poemSegments.length}):
                </div>
                <div className="previews-strip">
                  {previewPlates.map((plate) => (
                    <div key={plate.id} className="preview-mini-card">
                      <img src={plate.imageUrl} alt={`Página ${plate.plateNumber}`} />
                      <div className="preview-mini-badge">Pág {plate.plateNumber}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
