import { jsPDF } from 'jspdf';
import type { GeneratedNotebook } from '../data/notebookTypes';
import type { Poema } from '../data/poemas';

/**
 * Convierte cualquier URL o imagen en un DataURL base64 para embeber en el PDF
 */
async function loadImageDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:')) {
    return url;
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 800;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No canvas 2D context'));
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

/**
 * Exporta un cuaderno poético completo a un documento PDF de calidad editorial
 */
export async function exportNotebookToPdf(
  notebook: GeneratedNotebook,
  poema: Poema,
  onProgress?: (percent: number, message: string) => void
): Promise<void> {
  onProgress?.(5, 'Iniciando maquetación del libro en PDF...');

  // Formato A4 vertical: 210 x 297 mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper para fondo cálido marfil de pergamino
  const applyPageParchment = () => {
    doc.setFillColor(252, 250, 245);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    // Marco exterior fino color oro viejo
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.6);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    // Marco interior sutil
    doc.setDrawColor(230, 215, 170);
    doc.setLineWidth(0.2);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
  };

  // 1. PORTADA EDITORIAL
  applyPageParchment();

  // Título principal
  doc.setTextColor(45, 30, 15);
  doc.setFont('times', 'bold');
  doc.setFontSize(28);
  const titleLines = doc.splitTextToSize(poema.title.toUpperCase(), pageWidth - 50);
  doc.text(titleLines, pageWidth / 2, 75, { align: 'center' });

  // Ornamento
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(18);
  doc.text('✦  ·  ✦  ·  ✦', pageWidth / 2, 95, { align: 'center' });

  // Autor
  doc.setTextColor(80, 60, 40);
  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.text('Guillermo Baena Restrepo', pageWidth / 2, 115, { align: 'center' });

  // Subtítulo
  doc.setTextColor(120, 100, 80);
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  doc.text('Obra Poética y Cuaderno de Arte Ilustrado', pageWidth / 2, 128, { align: 'center' });

  // Detalles de la edición
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.3);
  doc.line(pageWidth / 2 - 30, 145, pageWidth / 2 + 30, 145);

  doc.setFontSize(11);
  doc.setTextColor(110, 95, 75);
  doc.text(`Estilo Pictórico: ${notebook.styleName}`, pageWidth / 2, 160, { align: 'center' });
  doc.text(`Edición de ${notebook.plates.length} Láminas de Colección`, pageWidth / 2, 170, { align: 'center' });

  const dateStr = new Date(notebook.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  doc.setFontSize(10);
  doc.setTextColor(140, 125, 105);
  doc.text(`Generado: ${dateStr}`, pageWidth / 2, 182, { align: 'center' });

  // Pie de portada
  doc.setFontSize(9);
  doc.setTextColor(160, 145, 125);
  doc.text('EL COSMOS DE GUILLE  •  MEDELLÍN, COLOMBIA', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // 2. LÁMINAS ILUSTRADAS Y VERSOS
  const totalPlates = notebook.plates.length;

  for (let i = 0; i < totalPlates; i++) {
    const plate = notebook.plates[i];
    const progress = Math.round(15 + ((i + 1) / totalPlates) * 75);
    onProgress?.(progress, `Procesando lámina ${i + 1} de ${totalPlates}...`);

    doc.addPage();
    applyPageParchment();

    // Encabezado
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(140, 125, 105);
    doc.text(poema.title.toUpperCase(), 20, 20);
    doc.text(`LÁMINA ${plate.plateNumber} DE ${totalPlates}`, pageWidth - 20, 20, { align: 'right' });

    // Embeber Lámina Ilustrada
    try {
      const imgData = await loadImageDataUrl(plate.imageUrl);
      const imgSize = 120; // 120mm x 120mm
      const imgX = (pageWidth - imgSize) / 2;
      const imgY = 28;

      // Marco fino alrededor de la lámina
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.4);
      doc.rect(imgX - 1, imgY - 1, imgSize + 2, imgSize + 2);

      doc.addImage(imgData, 'JPEG', imgX, imgY, imgSize, imgSize);
    } catch (e) {
      console.warn(`No se pudo embeber la imagen de la lámina ${i + 1} en el PDF:`, e);
      doc.setTextColor(180, 50, 50);
      doc.setFontSize(11);
      doc.text('[Lámina en proceso de consolidación]', pageWidth / 2, 80, { align: 'center' });
    }

    // Separador ornamental entre lámina y texto
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(13);
    doc.text('✦', pageWidth / 2, 160, { align: 'center' });

    // Versos de la página
    doc.setFont('times', 'italic');
    doc.setFontSize(13);
    doc.setTextColor(40, 28, 18);

    const verseLines = plate.verseText.split('\n').map(l => l.trim()).filter(Boolean);
    let verseY = 172;
    const lineHeight = 7.5;

    verseLines.forEach((line) => {
      // Si la línea excede el ancho, partirla
      const wrapped = doc.splitTextToSize(line, pageWidth - 46);
      doc.text(wrapped, pageWidth / 2, verseY, { align: 'center' });
      verseY += wrapped.length * lineHeight;
    });

    // Pie de página con número de folio
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(150, 135, 115);
    doc.text(`— ${i + 1} —`, pageWidth / 2, pageHeight - 16, { align: 'center' });
  }

  // 3. COLOFÓN EDITORIAL
  onProgress?.(95, 'Compilando colofón y encuadernación digital...');
  doc.addPage();
  applyPageParchment();

  doc.setTextColor(80, 60, 40);
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.text('Colofón', pageWidth / 2, 100, { align: 'center' });

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(14);
  doc.text('✦  ·  ✦', pageWidth / 2, 110, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(90, 75, 60);

  const colophonParagraphs = [
    `Este cuaderno poético e ilustrado de la obra «${poema.title}»`,
    'fue concebido y compuesto dentro de la plataforma',
    'El Cosmos de Guille, en homenaje a la poesía y memoria',
    'de Guillermo Baena Restrepo.',
    '',
    `Estilo visual: ${notebook.styleName}.`,
    'Generado con tecnología de inteligencia artificial Google Imagen 3,',
    'respetando la cadencia y métrica original de los versos.'
  ];

  let colY = 125;
  colophonParagraphs.forEach(line => {
    if (line === '') {
      colY += 4;
    } else {
      doc.text(line, pageWidth / 2, colY, { align: 'center' });
      colY += 6.5;
    }
  });

  doc.setFontSize(9);
  doc.setTextColor(160, 145, 125);
  doc.text('Todos los derechos poéticos pertenecen a la familia Baena Restrepo.', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // Guardar archivo
  onProgress?.(100, '¡Descargando archivo PDF!');
  const cleanTitle = poema.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  doc.save(`${cleanTitle}-cuaderno-editorial.pdf`);
}
