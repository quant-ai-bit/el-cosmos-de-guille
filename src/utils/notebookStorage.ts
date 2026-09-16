import type { GeneratedNotebook } from '../data/notebookTypes';

const STORAGE_KEY = 'cosmos_guille_generated_notebooks_v1';

export function getAllNotebooks(): GeneratedNotebook[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GeneratedNotebook[];
  } catch (err) {
    console.error('Error al leer cuadernos de localStorage:', err);
    return [];
  }
}

export function getNotebooksForPoem(poemId: string): GeneratedNotebook[] {
  const all = getAllNotebooks();
  return all.filter(nb => nb.poemId === poemId);
}

export function getLatestNotebookForPoem(poemId: string): GeneratedNotebook | null {
  const list = getNotebooksForPoem(poemId);
  if (list.length === 0) return null;
  // Ordenar por fecha descendente
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
}

export function saveNotebook(notebook: GeneratedNotebook): void {
  try {
    const all = getAllNotebooks();
    // Reemplazar si ya existía el mismo id o añadir al inicio
    const filtered = all.filter(nb => nb.id !== notebook.id);
    filtered.unshift(notebook);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error al guardar cuaderno en localStorage:', err);
  }
}

export function deleteNotebook(notebookId: string): void {
  try {
    const all = getAllNotebooks();
    const updated = all.filter(nb => nb.id !== notebookId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error al eliminar cuaderno:', err);
  }
}
