import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

const COLLECTION = 'birthdays';

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 20);
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function saveBirthday(data, id = generateId()) {
  if (!isFirebaseConfigured) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }
  await setDoc(doc(db, COLLECTION, id), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return id;
}

export async function getBirthday(id) {
  if (!isFirebaseConfigured) {
    throw new Error('FIREBASE_NOT_CONFIGURED');
  }
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
