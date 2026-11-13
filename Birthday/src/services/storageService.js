import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

const MAX_DIMENSION = 1400;
const QUALITY = 0.78;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

// Compresses an image via canvas before upload. Returns a JPEG Blob.
export async function compressImage(file) {
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Compression failed'))),
      'image/jpeg',
      QUALITY
    );
  });
}

export async function uploadPhoto(id, file, index) {
  if (!isFirebaseConfigured) throw new Error('FIREBASE_NOT_CONFIGURED');
  const blob = await compressImage(file);
  const path = `birthdays/${id}/photos/${index}-${Date.now()}.jpg`;
  const r = ref(storage, path);
  await uploadBytes(r, blob, { contentType: 'image/jpeg' });
  return getDownloadURL(r);
}

export async function uploadAudio(id, file) {
  if (!isFirebaseConfigured) throw new Error('FIREBASE_NOT_CONFIGURED');
  const ext = (file.name.split('.').pop() || 'mp3').toLowerCase();
  const path = `birthdays/${id}/audio/song.${ext}`;
  const r = ref(storage, path);
  await uploadBytes(r, file, { contentType: file.type || 'audio/mpeg' });
  return getDownloadURL(r);
}
