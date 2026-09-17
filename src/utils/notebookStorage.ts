import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import type { GeneratedNotebook, GeneratedPlate } from '../data/notebookTypes';

const STORAGE_KEY = 'cosmos_guille_generated_notebooks_v1';
const FIRESTORE_COLLECTION = 'notebooks';

// Cache en memoria para acceso síncrono instantáneo sin parpadeos en la UI
let inMemoryCache: GeneratedNotebook[] | null = null;
const listeners: Array<(notebooks: GeneratedNotebook[]) => void> = [];

export function subscribeToNotebooks(callback: (notebooks: GeneratedNotebook[]) => void): () => void {
  listeners.push(callback);
  // Llamar inmediatamente con los datos actuales
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
      inMemoryCache = JSON.parse(raw) as GeneratedNotebook[];
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
    console.warn('No se pudo guardar en localStorage (posible límite de cuota por base64):', e);
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
      snapshot.forEach(docSnap => {
        cloudNotebooks.push(docSnap.data() as GeneratedNotebook);
      });
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
 * Sube una imagen base64 a Firebase Storage y retorna la URL pública persistente
 */
async function uploadPlateImageToStorage(
  notebookId: string, 
  plateNumber: number, 
  imageUrl: string
): Promise<string> {
  // Si ya es una URL web o no es base64, no requiere subida
  if (!imageUrl.startsWith('data:')) {
    return imageUrl;
  }

  try {
    const fileRef = ref(storage, `notebooks/${notebookId}/plate_${plateNumber}.jpg`);
    await uploadString(fileRef, imageUrl, 'data_url');
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (err) {
    console.warn(`No se pudo subir lámina ${plateNumber} a Cloud Storage, se conservará la imagen:`, err);
    return imageUrl;
  }
}

/**
 * Guarda un cuaderno tanto en local (inmediato) como en Firebase Cloud Firestore y Storage
 */
export async function saveNotebook(notebook: GeneratedNotebook): Promise<void> {
  // 1. Guardar de inmediato en caché local para respuesta instantánea en la interfaz
  const current = getCachedNotebooks();
  const updated = [notebook, ...current.filter(nb => nb.id !== notebook.id)];
  updateLocalCache(updated);

  // 2. Proceso en segundo plano para Cloud Storage y Firestore
  try {
    // Subir cada lámina a Firebase Storage si es base64
    const cloudPlates: GeneratedPlate[] = await Promise.all(
      notebook.plates.map(async (plate) => {
        const cloudUrl = await uploadPlateImageToStorage(notebook.id, plate.plateNumber, plate.imageUrl);
        return {
          ...plate,
          imageUrl: cloudUrl
        };
      })
    );

    const notebookToSave: GeneratedNotebook = {
      ...notebook,
      plates: cloudPlates
    };

    // Guardar en Firestore
    await setDoc(doc(db, FIRESTORE_COLLECTION, notebook.id), notebookToSave);

    // Actualizar la caché local con las URLs definitivas de Cloud Storage
    const finalCache = [notebookToSave, ...getCachedNotebooks().filter(nb => nb.id !== notebook.id)];
    updateLocalCache(finalCache);

    console.info(`Cuaderno «${notebook.poemTitle}» sincronizado exitosamente con Firebase.`);
  } catch (cloudErr) {
    console.warn('Aviso: El cuaderno se guardó localmente, pero falló la sincronización con la nube Firebase:', cloudErr);
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
    await deleteDoc(doc(db, FIRESTORE_COLLECTION, notebookId));
    console.info(`Cuaderno ${notebookId} eliminado de Firebase.`);
  } catch (err) {
    console.warn('No se pudo eliminar de Firestore:', err);
  }
}

// Inicializar la sincronización de fondo con Firestore al cargar el módulo
if (typeof window !== 'undefined') {
  getAllNotebooks().catch(() => {});
}
