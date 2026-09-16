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
 * Algoritmo Editorial de Distribución Armónica.
 * El número de páginas lo define el tamaño y la cadencia natural de los versos,
 * asegurando que cada lámina tenga un texto legible, elegante y proporcionado
 * (ni saturado ni vacío) en la página derecha del libro abierto.
 */
export function segmentPoemHarmonically(fullText: string): string[] {
  if (!fullText || !fullText.trim()) {
    return ['Versos de Guillermo Baena Restrepo'];
  }

  // 1. Si el poema ya viene estructurado en estrofas naturales (separadas por línea en blanco)
  const naturalStanzas = fullText
    .split(/\n\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (naturalStanzas.length >= 2 && naturalStanzas.length <= 8) {
    const pages: string[] = [];
    for (const stanza of naturalStanzas) {
      const lines = stanza.split('\n').map(l => l.trim()).filter(Boolean);
      // Si una estrofa es muy extensa (> 7 versos), dividirla en mitades armónicas
      if (lines.length > 7) {
        const mid = Math.ceil(lines.length / 2);
        pages.push(lines.slice(0, mid).join('\n'));
        pages.push(lines.slice(mid).join('\n'));
      } else {
        pages.push(stanza);
      }
    }
    return pages;
  }

  // 2. Si el poema es continuo o tiene pocos saltos (ej. El Mendigo, Los Abuelos)
  const verses = fullText
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 0);

  if (verses.length <= 3) {
    return [verses.join('\n')];
  }

  // Tamaño armónico ideal de versos por página (entre 3 y 5 versos por hoja)
  let versesPerPage = 4;
  if (verses.length <= 7) {
    versesPerPage = 3;
  } else if (verses.length <= 13) {
    versesPerPage = 4; // Ej. 11 versos -> 3 páginas equilibradas (4 + 4 + 3)
  } else if (verses.length <= 24) {
    versesPerPage = 5;
  } else {
    versesPerPage = 6;
  }

  const pages: string[] = [];
  for (let i = 0; i < verses.length; i += versesPerPage) {
    const chunk = verses.slice(i, i + versesPerPage);
    // Si el último fragmento queda con un solo verso huérfano, fusionarlo con la página anterior
    if (chunk.length === 1 && pages.length > 0) {
      pages[pages.length - 1] += '\n' + chunk[0];
    } else {
      pages.push(chunk.join('\n'));
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
