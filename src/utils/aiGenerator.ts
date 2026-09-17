import type { NotebookStyle } from '../data/notebookTypes';

/**
 * Traduce y enriquece motivos poéticos clave en español a conceptos visuales en inglés
 */
function extractVisualKeywords(verseText: string): string {
  const lower = verseText.toLowerCase();
  const concepts: string[] = [];

  // Mapeo temático de imágenes poéticas de Guillermo Baena Restrepo
  if (lower.includes('vejez') || lower.includes('anciano') || lower.includes('abuelos') || lower.includes('edad')) {
    concepts.push('venerable dignified elderly figure with silver hair and weathered hands');
  }
  if (lower.includes('memoria') || lower.includes('recuerdo') || lower.includes('olvido') || lower.includes('pasado')) {
    concepts.push('symbolic echoes of passing time, floating clockwork, vintage mirrors, nostalgic relics');
  }
  if (lower.includes('cosmos') || lower.includes('astral') || lower.includes('molecular') || lower.includes('universo') || lower.includes('estrellas')) {
    concepts.push('celestial cosmic stardust, nebula drifting, deep space atmospheric perspective');
  }
  if (lower.includes('tiempo') || lower.includes('reloj') || lower.includes('dias') || lower.includes('invierno') || lower.includes('nieve')) {
    concepts.push('flowing sands of time, frosted winter chill, soft falling snow particles');
  }
  if (lower.includes('ojos') || lower.includes('mirada') || lower.includes('rostro') || lower.includes('frente')) {
    concepts.push('expressive human eyes, introspective gaze, poetic emotional depth');
  }
  if (lower.includes('manos') || lower.includes('dedos') || lower.includes('pluma') || lower.includes('cuaderno') || lower.includes('tintero')) {
    concepts.push('weathered artisan hands holding an antique quill and leather journal');
  }
  if (lower.includes('camino') || lower.includes('calle') || lower.includes('limosnero') || lower.includes('mendigo') || lower.includes('destierro')) {
    concepts.push('cobblestone pathway leading towards a glowing horizon at twilight, solitary wanderer');
  }
  if (lower.includes('luz') || lower.includes('sol') || lower.includes('atardecer') || lower.includes('crepusculo') || lower.includes('fe')) {
    concepts.push('ethereal shafts of golden sunlight breaking through clouds, divine illumination');
  }
  if (lower.includes('mar') || lower.includes('rio') || lower.includes('olas') || lower.includes('agua')) {
    concepts.push('calm reflective water shore, mist on the ocean horizon');
  }

  if (concepts.length === 0) {
    concepts.push('profound contemplative poetic scene, serene atmosphere of memory and transcendence');
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
  totalPlates: number = 5
): string {
  const visualMotifs = extractVisualKeywords(verseText);
  const cleanVerseSnippet = verseText.replace(/\s+/g, ' ').slice(0, 140);
  
  const parts: string[] = [
    style.visualPromptModifier,
    `Poetic illustration for the work "${poemTitle}", scene ${plateIndex} of ${totalPlates}`,
    `Visual theme: ${visualMotifs}`,
    `Inspiration from verses: "${cleanVerseSnippet}"`
  ];

  // Si el usuario incluyó una observación o directriz artística personalizada
  if (userNotes && userNotes.trim().length > 0) {
    parts.push(`User custom artistic direction: ${userNotes.trim()}`);
  }

  // Modificadores de máxima calidad y estética limpia
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
 * Genera imagen utilizando Google Imagen 3 (imagen-3.0-generate-002) vía Google AI Studio
 */
export async function generateImageWithGoogle(prompt: string, apiKey: string): Promise<string> {
  const cleanKey = apiKey.trim();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${cleanKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg',
        personGeneration: 'ALLOW_ADULT'
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Google Imagen Error: ${message}`);
  }

  const data = await response.json();
  const base64Bytes = data?.predictions?.[0]?.bytesBase64Encoded;
  const mimeType = data?.predictions?.[0]?.mimeType || 'image/jpeg';

  if (!base64Bytes) {
    throw new Error('Google Imagen no retornó bytes de imagen válidos');
  }

  return `data:${mimeType};base64,${base64Bytes}`;
}

/**
 * Sintetiza un sonido de paso de página realista usando Web Audio API
 * No requiere descargar archivos de audio externos y responde al instante
 */
export function playPageFlipSound(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const duration = 0.28;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Ruido blanco suave con decaimiento natural de fricción de papel
    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      const decay = Math.exp(-progress * 4.2);
      output[i] = (Math.random() * 2 - 1) * decay;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filtro pasa banda para emular el crujido aterciopelado del pergamino antiguo
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
 * Genera la URL de la imagen en alta resolución mediante Pollinations AI con semilla única
 */
export function generatePlateImageUrl(prompt: string, seed: number): string {
  const encoded = encodeURIComponent(prompt.trim());
  return `https://image.pollinations.ai/prompt/${encoded}?width=800&height=800&seed=${seed}&nologo=true`;
}

/**
 * Orquesta la generación inteligente: intenta primero con Google AI si hay clave válida,
 * o utiliza el generador artístico de alta definición con precalentamiento acelerado.
 */
export async function generatePlateImageSmart(
  prompt: string,
  seed: number,
  customApiKey?: string
): Promise<{ imageUrl: string; engine: 'google-imagen-3' | 'pollinations' }> {
  const apiKey = customApiKey !== undefined ? customApiKey.trim() : getGoogleApiKey();

  if (apiKey) {
    try {
      const googleImgData = await generateImageWithGoogle(prompt, apiKey);
      return {
        imageUrl: googleImgData,
        engine: 'google-imagen-3'
      };
    } catch (err) {
      console.warn('Fallo al invocar Google Imagen 3, recurriendo a motor alternativo:', err);
    }
  }

  // Motor artístico Pollinations con semilla única y precalentamiento rápido (4s max de espera para no bloquear)
  const fallbackUrl = generatePlateImageUrl(prompt, seed);
  await preloadImage(fallbackUrl, 4500);
  return {
    imageUrl: fallbackUrl,
    engine: 'pollinations'
  };
}

/**
 * Precarga una imagen en memoria con tiempo de espera configurable
 */
export function preloadImage(url: string, timeoutMs: number = 5000): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => {
      resolve();
    }, timeoutMs);

    img.onload = () => {
      clearTimeout(timer);
      resolve();
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve();
    };

    img.src = url;
  });
}
