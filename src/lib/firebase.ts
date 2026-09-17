import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCPNr5-POCB2-7Wa8CzKvXTVuHth9zTNMY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'el-cosmos-de-guille.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'el-cosmos-de-guille',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'el-cosmos-de-guille.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '747616331958',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:747616331958:web:c62ae92376db9f23cf0e17'
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
