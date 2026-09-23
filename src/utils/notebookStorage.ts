import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { GeneratedNotebook, GeneratedPlate } from '../data/notebookTypes';
import { generatePlateImageUrl } from './aiGenerator';

const STORAGE_KEY = 'cosmos_guille_generated_notebooks_v1';
const FIRESTORE_COLLECTION = 'notebooks';

// Cache en memoria para acceso síncrono instantáneo sin parpadeos en la UI
let inMemoryCache: GeneratedNotebook[] | null = null;
const listeners: Array<(notebooks: GeneratedNotebook[]) => void> = [];

/**
 * Actualiza láminas antiguas que usaban picsum.photos hacia imágenes reales de IA coherentes con el poema
 */
function upgradeLegacyNotebook(nb: GeneratedNotebook): GeneratedNotebook {
  let changed = false;
  const upgradedPlates = nb.plates.map(plate => {
    if (plate.imageUrl && plate.imageUrl.includes('picsum.photos')) {
      changed = true;
      const promptToUse = plate.promptUsed || plate.verseText || nb.poemTitle;
      return {
        ...plate,
        imageUrl: generatePlateImageUrl(promptToUse, plate.seed, nb.styleId)
      };
    }
    return plate;
  });
  return changed ? { ...nb, plates: upgradedPlates } : nb;
}

export function subscribeToNotebooks(callback: (notebooks: GeneratedNotebook[]) => void): () => void {
  listeners.push(callback);
  callback(getCachedNotebooks());
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners(notebooks: GeneratedNotebook[]) {
  listeners.forEach(cb => {
    try {
      cb(notebooks);
    } catch (e) {
      console.error('Error en listener de cuadernos:', e);
    }
  });
}

/**
 * Obtiene los cuadernos desde la caché local o localStorage (síncrono)
 */
export function getCachedNotebooks(): GeneratedNotebook[] {
  if (inMemoryCache !== null) {
    return inMemoryCache;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GeneratedNotebook[];
      inMemoryCache = parsed.map(upgradeLegacyNotebook);
      return inMemoryCache;
    }
  } catch (err) {
    console.error('Error al leer caché local de cuadernos:', err);
  }
  inMemoryCache = [];
  return inMemoryCache;
}

/**
 * Guarda los cuadernos en la caché local y localStorage
 */
function updateLocalCache(notebooks: GeneratedNotebook[]) {
  inMemoryCache = notebooks;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notebooks));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage:', e);
  }
  notifyListeners(notebooks);
}

/**
 * Carga todos los cuadernos desde Firestore con fallback automático a la caché local
 */
export async function getAllNotebooks(): Promise<GeneratedNotebook[]> {
  try {
    const q = query(collection(db, FIRESTORE_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const cloudNotebooks: GeneratedNotebook[] = [];
      
      for (const docSnap of snapshot.docs) {
        const nbData = docSnap.data() as GeneratedNotebook;
        
        // Si las láminas están almacenadas en la subcolección 'plates' (arquitectura 100% Spark gratuita)
        if (!nbData.plates || nbData.plates.length === 0) {
          try {
            const platesQuery = query(
              collection(db, FIRESTORE_COLLECTION, docSnap.id, 'plates'),
              orderBy('plateNumber', 'asc')
            );
            const platesSnap = await getDocs(platesQuery);
            const loadedPlates: GeneratedPlate[] = [];
            platesSnap.forEach(pDoc => {
              loadedPlates.push(pDoc.data() as GeneratedPlate);
            });
            nbData.plates = loadedPlates;
          } catch (platesErr) {
            console.warn(`Error al leer subcolección de láminas para ${docSnap.id}:`, platesErr);
          }
        }

        cloudNotebooks.push(nbData);
      }

      // Sincronizar caché local
      updateLocalCache(cloudNotebooks);
      return cloudNotebooks;
    }
  } catch (err) {
    console.warn('Aviso: No se pudo conectar con Firestore, usando almacenamiento local:', err);
  }

  // Fallback a caché local
  return getCachedNotebooks();
}

/**
 * Obtiene los cuadernos de un poema específico
 */
export function getNotebooksForPoem(poemId: string): GeneratedNotebook[] {
  const all = getCachedNotebooks();
  return all.filter(nb => nb.poemId === poemId);
}

/**
 * Obtiene el cuaderno más reciente para un poema (síncrono)
 */
export function getLatestNotebookForPoem(poemId: string): GeneratedNotebook | null {
  const list = getNotebooksForPoem(poemId);
  if (list.length === 0) return null;
  return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
}

/**
 * Guarda un cuaderno de manera 100% gratuita y sin tarjeta en Cloud Firestore:
 * - Guarda el documento principal del cuaderno.
 * - Guarda cada lámina ilustrada como un documento independiente en la subcolección 'plates'
 *   (para respetar holgadamente el límite de 1MB por documento de Firestore).
 */
export async function saveNotebook(notebook: GeneratedNotebook): Promise<void> {
  // 1. Guardar de inmediato en caché local para respuesta instantánea en la interfaz
  const current = getCachedNotebooks();
  const updated = [notebook, ...current.filter(nb => nb.id !== notebook.id)];
  updateLocalCache(updated);

  // 2. Sincronización en segundo plano con Cloud Firestore
  try {
    // A. Guardar metadatos del cuaderno en el documento raíz
    const parentDocRef = doc(db, FIRESTORE_COLLECTION, notebook.id);
    const metadataToSave = {
      id: notebook.id,
      poemId: notebook.poemId,
      poemTitle: notebook.poemTitle,
      styleId: notebook.styleId,
      styleName: notebook.styleName,
      userNotes: notebook.userNotes || null,
      createdAt: notebook.createdAt,
      seed: notebook.seed,
      totalPlates: notebook.plates.length
    };
    await setDoc(parentDocRef, metadataToSave);

    // B. Guardar cada lámina en la subcolección 'plates' (cada una con su propio documento de hasta 1MB)
    const platesPromises = notebook.plates.map((plate) => {
      const plateDocRef = doc(db, FIRESTORE_COLLECTION, notebook.id, 'plates', `plate_${plate.plateNumber}`);
      return setDoc(plateDocRef, plate);
    });
    await Promise.all(platesPromises);

    console.info(`Cuaderno «${notebook.poemTitle}» y sus ${notebook.plates.length} láminas sincronizados con Cloud Firestore.`);
  } catch (cloudErr) {
    console.warn('Aviso: El cuaderno se guardó localmente, pero falló la sincronización con Firestore:', cloudErr);
  }
}

/**
 * Elimina un cuaderno tanto de Firestore como de la memoria local
 */
export async function deleteNotebook(notebookId: string): Promise<void> {
  // 1. Eliminar de la caché local
  const current = getCachedNotebooks();
  const filtered = current.filter(nb => nb.id !== notebookId);
  updateLocalCache(filtered);

  // 2. Eliminar de Firestore
  try {
    const parentDocRef = doc(db, FIRESTORE_COLLECTION, notebookId);
    const platesQuery = collection(db, FIRESTORE_COLLECTION, notebookId, 'plates');
    const platesSnap = await getDocs(platesQuery);
    const deletePromises = platesSnap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
    await deleteDoc(parentDocRef);
    console.info(`Cuaderno ${notebookId} eliminado de Firebase.`);
  } catch (err) {
    console.warn('No se pudo eliminar de Firestore:', err);
  }
}

// Inicializar la sincronización de fondo con Firestore al cargar el módulo
if (typeof window !== 'undefined') {
  getAllNotebooks().catch(() => {});
}
