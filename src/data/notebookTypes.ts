export interface NotebookStyle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  color: string;
  visualPromptModifier: string;
  accentGradient: string;
}

export interface GeneratedPlate {
  id: string;
  plateNumber: number;
  totalPlates: number;
  verseText: string;
  promptUsed: string;
  imageUrl: string;
  seed: number;
  timestamp: number;
}

export interface GeneratedNotebook {
  id: string;
  poemId: string;
  poemTitle: string;
  styleId: string;
  styleName: string;
  userNotes?: string;
  plates: GeneratedPlate[];
  createdAt: string;
  seed: number;
}

export const NOTEBOOK_STYLES: NotebookStyle[] = [
  {
    id: 'oleo-barroco',
    name: 'Óleo Barroco & Claroscuro',
    tagline: 'Textura clásica de museo y sombras doradas',
    description: 'Pintura al óleo profunda con claroscuro dramático, iluminación cálida de Rembrandt y Caravaggio, pinceladas empastadas y pátina de lienzo antiguo.',
    badge: '🏛️ Clásico de Museo',
    color: '#d4af37',
    visualPromptModifier: 'Masterpiece classical oil painting, rich impasto canvas texture, dramatic chiaroscuro lighting, deep warm amber tones, Rembrandt lighting, solemn fine art museum piece, timeless poetic dignity',
    accentGradient: 'linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(20,18,25,0.9) 100%)'
  },
  {
    id: 'acuarela-lirica',
    name: 'Acuarela Lírica & Tinta',
    tagline: 'Pinceladas translúcidas y poesía botánica',
    description: 'Suaves lavados de acuarela sobre papel de algodón húmedo, salpicaduras poéticas y sutiles trazos de tinta china sepia con atmósfera etérea.',
    badge: '🖌️ Bellas Artes',
    color: '#8ec5fc',
    visualPromptModifier: 'Delicate fine art watercolor and sepia ink wash on textured raw cotton paper, soft wet-on-wet watercolor blooming edges, evocative poetic minimalism, gentle atmospheric bleed, museum archival print',
    accentGradient: 'linear-gradient(135deg, rgba(142,197,252,0.25) 0%, rgba(20,18,25,0.9) 100%)'
  },
  {
    id: 'cine-vintage',
    name: 'Fotografía 35mm Vintage',
    tagline: 'Grano analógico y luz de hora dorada',
    description: 'Fotografía cinematográfica analógica de 35mm, tonos cálidos nostálgicos, luz crepuscular de atardecer, profundidad de campo suave y poesía visual.',
    badge: '📷 Cinematográfico',
    color: '#f6ad55',
    visualPromptModifier: 'Cinematic 35mm vintage film still, Kodak Portra 400 aesthetic, organic film grain, warm nostalgic twilight golden hour glow, shallow depth of field, poetic contemplative atmosphere, 8k resolution',
    accentGradient: 'linear-gradient(135deg, rgba(246,173,85,0.25) 0%, rgba(20,18,25,0.9) 100%)'
  },
  {
    id: 'grabado-madera',
    name: 'Grabado en Madera / Xilografía',
    tagline: 'Líneas medievales y facsímil histórico',
    description: 'Ilustración artesanal estilo xilografía y linograbado clásico, trazos grabados con tinta sepia profunda sobre papel pergamino marfil envejecido.',
    badge: '🪵 Facsímil Antiguo',
    color: '#c4a482',
    visualPromptModifier: 'Antique vintage woodcut engraving illustration, intricate cross-hatching line art, vintage storybook etching on aged warm ivory parchment paper, handcrafted medieval woodblock print',
    accentGradient: 'linear-gradient(135deg, rgba(196,164,130,0.25) 0%, rgba(20,18,25,0.9) 100%)'
  },
  {
    id: 'cosmico-mistico',
    name: 'Arte Cósmico & Simbólico',
    tagline: 'Polvo estelar, memoria y trascendencia',
    description: 'Composición cósmica surrealista, nebulosas de polvo estelar dorado, figuras etéreas en el infinito y geometrías sutiles que abrazan el misterio.',
    badge: '🌌 Cósmico & Espiritual',
    color: '#c084fc',
    visualPromptModifier: 'Surreal cosmic poetry artwork, ethereal golden stardust nebulae, deep celestial space, mystical symbolic dreamscape, transcendental spiritual contemplation, luminous atmospheric glow',
    accentGradient: 'linear-gradient(135deg, rgba(192,132,252,0.25) 0%, rgba(20,18,25,0.9) 100%)'
  }
];

/**
 * Algoritmo Editorial de Distribución Armónica y Cierre de Ideas Poéticas.
 * Garantiza que el texto de cada página termine en punto (.) y nunca a la mitad de una idea,
 * manteniendo una cadencia armónica, proporcionada y elegante (3 a 7 versos por hoja).
 */
export function segmentPoemHarmonically(fullText: string): string[] {
  if (!fullText || !fullText.trim()) {
    return ['Versos de Guillermo Baena Restrepo.'];
  }

  // Comprobar si un texto termina en punto o cierre de idea gramatical
  const endsWithPeriod = (t: string) => {
    const clean = t.trim();
    return /[.!?…»"]$/.test(clean) || clean.endsWith('."') || clean.endsWith('.)');
  };

  // 1. Extraer los versos no vacíos del texto
  const rawLines = fullText
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  if (rawLines.length === 0) {
    return ['Versos de Guillermo Baena Restrepo.'];
  }

  // Si todo el poema es muy breve (<= 4 versos)
  if (rawLines.length <= 4) {
    let single = rawLines.join('\n');
    if (!endsWithPeriod(single)) single += '.';
    return [single];
  }

  // 2. Agrupar versos en Unidades Semánticas / Ideas Completas
  // Una unidad se acumula hasta encontrar un verso que termine en '.' (o '!', '?', '...')
  const thoughtUnits: string[][] = [];
  let currentUnit: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    currentUnit.push(line);

    // Si termina en punto o es el último verso del poema
    if (endsWithPeriod(line) || i === rawLines.length - 1) {
      thoughtUnits.push(currentUnit);
      currentUnit = [];
    }
  }

  if (currentUnit.length > 0) {
    if (thoughtUnits.length > 0) {
      thoughtUnits[thoughtUnits.length - 1].push(...currentUnit);
    } else {
      thoughtUnits.push(currentUnit);
    }
  }

  // 2.1 Si alguna unidad semántica supera los 7 versos porque el texto original
  // no incluyó puntos intermedios (ej. oraciones continuas puntuadas sólo con comas),
  // se divide armónicamente en bloques equilibrados asegurando que cada corte culmine en punto.
  for (let i = 0; i < thoughtUnits.length; i++) {
    const unit = thoughtUnits[i];
    if (unit.length > 7) {
      const subUnits: string[][] = [];
      let sub: string[] = [];
      const targetSize = unit.length <= 10 ? Math.ceil(unit.length / 2) : 4;

      for (let j = 0; j < unit.length; j++) {
        let line = unit[j];
        if (sub.length >= targetSize - 1 && j < unit.length - 1) {
          if (/[,;:]$/.test(line)) {
            line = line.slice(0, -1) + '.';
          } else if (!endsWithPeriod(line)) {
            line = line + '.';
          }
          sub.push(line);
          subUnits.push(sub);
          sub = [];
        } else {
          sub.push(line);
        }
      }
      if (sub.length > 0) {
        subUnits.push(sub);
      }
      thoughtUnits.splice(i, 1, ...subUnits);
      i += subUnits.length - 1;
    }
  }

  // 3. Empaquetar las Unidades Semánticas en Páginas Armónicas
  // Cada página contendrá una o más ideas completas, garantizando SIEMPRE que termine en punto.
  const pages: string[] = [];
  let currentPageLines: string[] = [];

  for (let i = 0; i < thoughtUnits.length; i++) {
    const unit = thoughtUnits[i];
    const unitLineCount = unit.length;
    const currentLineCount = currentPageLines.length;

    if (currentLineCount === 0) {
      currentPageLines.push(...unit);
      continue;
    }

    const combinedLineCount = currentLineCount + unitLineCount;
    const currentChars = currentPageLines.join(' ').length;
    const unitChars = unit.join(' ').length;

    const fitsHarmoniously = (
      combinedLineCount <= 6 && (currentChars + unitChars) <= 420
    ) || (
      currentLineCount <= 2 && combinedLineCount <= 7
    );

    if (fitsHarmoniously) {
      currentPageLines.push(...unit);
    } else {
      let pageText = currentPageLines.join('\n');
      if (!endsWithPeriod(pageText)) pageText += '.';
      pages.push(pageText);
      currentPageLines = [...unit];
    }
  }

  // Cerrar la última página garantizando el punto final
  if (currentPageLines.length > 0) {
    let lastPageText = currentPageLines.join('\n');
    if (!endsWithPeriod(lastPageText)) lastPageText += '.';

    // Evitar que el último folio quede con un solo verso desolado si la anterior tiene espacio
    if (currentPageLines.length === 1 && pages.length > 0) {
      const prevPageLines = pages[pages.length - 1].split('\n');
      if (prevPageLines.length <= 5) {
        pages[pages.length - 1] += '\n' + lastPageText;
      } else {
        pages.push(lastPageText);
      }
    } else {
      pages.push(lastPageText);
    }
  }

  return pages;
}

/**
 * Función compatible que delega a la segmentación armónica natural
 */
export function segmentPoemIntoPlates(fullText: string, _targetPlatesCount?: number): string[] {
  return segmentPoemHarmonically(fullText);
}

