import type { NotebookStyle } from '../data/notebookTypes';

/**
 * Traduce y enriquece motivos poéticos clave en español a conceptos visuales en inglés
 */
/**
 * Traduce y enriquece motivos poéticos clave en español a conceptos visuales en inglés
 */
function extractVisualKeywords(verseText: string): string {
  const lower = verseText.toLowerCase();
  const concepts: string[] = [];

  // 1. Motivos de «El Espejo» (reflejos, alcoba, cristal, marco, secretos, lágrimas)
  if (lower.includes('espejo') || lower.includes('cristal') || lower.includes('reflejo') || lower.includes('azogue') || lower.includes('marco')) {
    concepts.push('ornate vintage baroque mirror with carved dark mahogany and antique iron frame, delicate reflections of light and soul, poetic mystery');
  }
  if (lower.includes('alcoba') || lower.includes('cuarto') || lower.includes('pared') || lower.includes('pita') || lower.includes('puntilla') || lower.includes('habitacion')) {
    concepts.push('intimate dimly lit vintage bedroom alcove, antique mirror hanging on rustic textured wall with warm golden ambient lamplight');
  }
  if (lower.includes('sensualidad') || lower.includes('erotismo') || lower.includes('voluptuosidad') || lower.includes('lujuria') || lower.includes('cuerpo') || lower.includes('senos') || lower.includes('desnuda') || lower.includes('comisura')) {
    concepts.push('tasteful classical fine art figurative silhouette, soft chiaroscuro lighting, romantic artistic curves, warm golden shadows, poetic elegance');
  }
  if (lower.includes('llanto') || lower.includes('lagrimas') || lower.includes('lloras') || lower.includes('tristeza') || lower.includes('empañan') || lower.includes('dolor') || lower.includes('ausencia') || lower.includes('legania') || lower.includes('lejanía')) {
    concepts.push('single tear rolling down cheek, misted fogged mirror glass, soft rain droplets outside vintage window, emotional melancholic depth');
  }
  if (lower.includes('palacio') || lower.includes('monarquia') || lower.includes('monarquías') || lower.includes('salones') || lower.includes('burguesas') || lower.includes('anticuario') || lower.includes('empeño') || lower.includes('reyes') || lower.includes('artesanas') || lower.includes('cincel')) {
    concepts.push('grand historical palace hall, royal artisan workshop with chisels and woodcarvings, dusty antique curiosity shop with vintage treasures');
  }
  if (lower.includes('mañana') || lower.includes('tarde') || lower.includes('noche') || lower.includes('sombras') || lower.includes('opacidad') || lower.includes('luz') || lower.includes('sol') || lower.includes('abres la puerta') || lower.includes('apagas la luz')) {
    concepts.push('dramatic contrast between golden morning sunlight and deep nocturnal blue shadow, chiaroscuro atmosphere, candlelit serenity');
  }

  // 2. Motivos de «Los Abuelos» y la infancia
  if (lower.includes('nietos') || lower.includes('abuelos') || lower.includes('cometa') || lower.includes('canicas') || lower.includes('juegos') || lower.includes('pelota') || lower.includes('infantil') || lower.includes('árbol')) {
    concepts.push('loving elderly grandparents with small cheerful grandchildren, flying a colorful kite in a sunlit meadow, family warmth and generational joy');
  }

  // 3. Motivos de «El Mendigo» y «El Limosnero»
  if (lower.includes('mendigo') || lower.includes('limosnero') || lower.includes('exilio') || lower.includes('desierto') || lower.includes('calle') || lower.includes('descalzo') || lower.includes('pan') || lower.includes('cigarro')) {
    concepts.push('humble solitary wanderer with worn dark coat, walking misty cobblestone street at dawn, holding a crust of bread, quiet poetic dignity');
  }

  // 4. Motivos de «La Vejez»
  if (lower.includes('vejez') || lower.includes('anciano') || lower.includes('arrugas') || lower.includes('canas') || lower.includes('nieve') || lower.includes('invierno') || lower.includes('edad')) {
    concepts.push('venerable dignified elderly figure with silver-white hair and weathered hands, deep lines of wisdom, solemn golden hour lighting');
  }

  // 5. Motivos de «La Memoria»
  if (lower.includes('memoria') || lower.includes('recuerdo') || lower.includes('olvido') || lower.includes('pasado') || lower.includes('reloj') || lower.includes('tiempo')) {
    concepts.push('flowing hourglass sand, nostalgic vintage library, floating clockwork, antique leatherbound books, echoes of time');
  }

  // 6. Motivos de «Más Allá» y cósmicos
  if (lower.includes('cosmos') || lower.includes('astral') || lower.includes('molecular') || lower.includes('universo') || lower.includes('estrellas') || lower.includes('infinito') || lower.includes('espiritu') || lower.includes('alma') || lower.includes('fe')) {
    concepts.push('celestial cosmic stardust, luminous ethereal nebula drifting, deep space atmospheric perspective, soul ascending towards light');
  }

  if (lower.includes('ojos') || lower.includes('mirada') || lower.includes('rostro') || lower.includes('frente') || lower.includes('párpados')) {
    concepts.push('expressive human eyes, introspective gaze, poetic emotional depth');
  }
  if (lower.includes('manos') || lower.includes('dedos') || lower.includes('pluma') || lower.includes('cuaderno') || lower.includes('tintero')) {
    concepts.push('weathered artisan hands holding an antique quill and leather journal');
  }
  if (lower.includes('mar') || lower.includes('rio') || lower.includes('olas') || lower.includes('agua')) {
    concepts.push('calm reflective water shore, mist on the ocean horizon');
  }

  if (concepts.length === 0) {
    concepts.push('profound contemplative fine art poetic scene, serene atmosphere of memory, beauty and transcendence');
  }

  return concepts.join(', ');
}

/**
 * Construye el prompt único e irrepetible para la lámina del cuaderno
 */
export function buildPlatePrompt(
  verseText: string,
  poemTitle: string,
  style: NotebookStyle,
  userNotes?: string,
  plateIndex: number = 1,
  totalPlates: number = 5,
  scenePrompt?: string
): string {
  const visualMotifs = extractVisualKeywords(verseText);
  const cleanVerseSnippet = verseText.replace(/\s+/g, ' ').slice(0, 160);
  
  const parts: string[] = [
    style.visualPromptModifier
  ];

  if (scenePrompt && scenePrompt.trim().length > 0) {
    parts.push(`Scene composition: ${scenePrompt.trim()}`);
  } else {
    parts.push(`Visual theme: ${visualMotifs}`);
  }

  parts.push(`Poetic inspiration from "${poemTitle}", scene ${plateIndex} of ${totalPlates}: "${cleanVerseSnippet}"`);

  if (userNotes && userNotes.trim().length > 0) {
    parts.push(`User custom artistic direction: ${userNotes.trim()}`);
  }

  parts.push('fine art masterpiece, evocative literary visual, aesthetic composition, highly detailed, 8k resolution, no words, no text, no watermark, no signatures, no frame');

  return parts.join('. ');
}

const STORAGE_KEY_GOOGLE_API = 'guille_google_api_key';

/**
 * Obtiene la API Key de Google configurada por el usuario o desde variables de entorno
 */
export function getGoogleApiKey(): string {
  try {
    const fromStorage = localStorage.getItem(STORAGE_KEY_GOOGLE_API);
    if (fromStorage && fromStorage.trim().length > 0) {
      return fromStorage.trim();
    }
  } catch {
    // Modo SSR o entorno restringido
  }
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
}

/**
 * Guarda o borra la API Key de Google en el navegador
 */
export function setGoogleApiKey(key: string): void {
  try {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEY_GOOGLE_API, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_GOOGLE_API);
    }
  } catch (e) {
    console.warn('No se pudo guardar la clave en localStorage', e);
  }
}

/**
 * Genera imagen utilizando Google Gemini 3.1 Flash Image si está disponible y con cuota
 */
export async function generateImageWithGoogle(prompt: string, apiKey: string): Promise<string> {
  const cleanKey = apiKey.trim();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${cleanKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: `Generate a museum fine art illustration: ${prompt}` }]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Google Gemini Image Error: ${message}`);
  }

  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part?.inlineData?.data) {
      const mime = part.inlineData.mimeType || 'image/jpeg';
      return `data:${mime};base64,${part.inlineData.data}`;
    }
  }

  throw new Error('Google Gemini no retornó datos de imagen válidos');
}

// Singleton AudioContext para evitar fugas de memoria
let sharedAudioCtx: AudioContext | null = null;
let sharedNoiseBuffer: AudioBuffer | null = null;

/**
 * Sintetiza un sonido de paso de página realista usando Web Audio API con un AudioContext reutilizable.
 */
export function playPageFlipSound(): void {
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioCtxClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }
    const ctx = sharedAudioCtx;
    const duration = 0.28;

    if (!sharedNoiseBuffer || sharedNoiseBuffer.sampleRate !== ctx.sampleRate) {
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const progress = i / bufferSize;
        const decay = Math.exp(-progress * 4.2);
        output[i] = (Math.random() * 2 - 1) * decay;
      }
      sharedNoiseBuffer = buffer;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = sharedNoiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + duration);
    filter.Q.value = 1.8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + duration);
  } catch {
    // Ignorar si el navegador restringe el audio en segundo plano
  }
}

/**
 * Genera la URL de la imagen en alta definición coherente con el poema utilizando Inteligencia Artificial real
 */
export function generatePlateImageUrl(prompt: string, seed: number, styleId?: string): string {
  let enrichedPrompt = prompt;
  if (styleId === 'grabado-madera') {
    enrichedPrompt = `antique woodcut etching engraving illustration, cross-hatching line art, black and white sepia ink, ${prompt}`;
  } else if (styleId === 'acuarela-lirica') {
    enrichedPrompt = `delicate fine art watercolor and sepia ink wash on raw cotton paper, soft wet-on-wet watercolor blooming edges, ${prompt}`;
  } else if (styleId === 'oleo-barroco') {
    enrichedPrompt = `classical baroque oil painting, dramatic chiaroscuro, Rembrandt lighting, rich impasto canvas texture, ${prompt}`;
  } else if (styleId === 'cine-vintage') {
    enrichedPrompt = `cinematic 35mm film still, warm golden hour twilight, vintage analog film grain, ${prompt}`;
  } else if (styleId === 'cosmico-mistico') {
    enrichedPrompt = `surreal cosmic fine art, celestial stardust nebulae, mystical spiritual glowing atmosphere, ${prompt}`;
  }

  const cleanPrompt = enrichedPrompt
    .replace(/[^\w\s,.-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const encoded = encodeURIComponent(cleanPrompt.slice(0, 420));
  return `https://image.pollinations.ai/prompt/${encoded}?width=800&height=800&seed=${seed}&nologo=true`;
}

/**
 * Genera la lámina utilizando Google Gemini Image si hay clave con cuota disponible,
 * o el motor de Inteligencia Artificial Pollinations (Flux/SANA) coherente con el poema.
 */
export async function generatePlateImage(
  prompt: string,
  seed?: number,
  customApiKey?: string,
  styleId?: string
): Promise<{ imageUrl: string; engine: string }> {
  const apiKey = customApiKey !== undefined ? customApiKey.trim() : getGoogleApiKey();
  const safeSeed = seed || Math.floor(Math.random() * 899999) + 100000;

  // 1. Si el usuario ingresó una clave de Google con cuota activa
  if (apiKey && apiKey.length > 10) {
    try {
      const googleImg = await generateImageWithGoogle(prompt, apiKey);
      return {
        imageUrl: googleImg,
        engine: 'gemini-3.1-flash-image'
      };
    } catch (err) {
      console.warn('Google Gemini no disponible para generación directa de imagen, utilizando motor visual:', err);
    }
  }

  // 2. Generación con IA generativa real coherente con el poema
  const aiUrl = generatePlateImageUrl(prompt, safeSeed, styleId);

  return {
    imageUrl: aiUrl,
    engine: 'pollinations-ai'
  };
}

/**
 * Alias de compatibilidad hacia generatePlateImage
 */
export const generatePlateImageSmart = generatePlateImage;
