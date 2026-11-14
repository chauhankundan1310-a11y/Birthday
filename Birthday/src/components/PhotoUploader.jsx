import { useRef, useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_PHOTOS = 8;

export default function PhotoUploader({ photos, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [viewing, setViewing] = useState(null);

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    const room = MAX_PHOTOS - photos.length;
    const toAdd = files.slice(0, Math.max(0, room)).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      preview: URL.createObjectURL(f),
      uploadedUrl: null,
    }));
    onChange([...photos, ...toAdd]);
  };

  const remove = (id) => {
    const target = photos.find((p) => p.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div
        className={`upload-drop ${dragOver ? 'dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
      >
        <FaImage size={34} style={{ opacity: 0.7, marginBottom: '0.5rem' }} />
        <div style={{ fontWeight: 600 }}>Tap or drop photos here</div>
        <small style={{ opacity: 0.7 }}>JPG / PNG · up to {MAX_PHOTOS} photos · compressed automatically</small>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      {photos.length > 0 && (
        <div className="photo-grid">
          {photos.map((p) => (
            <div
              key={p.id}
              className="photo-tile"
              onClick={() => setViewing(p)}
              style={{ cursor: 'zoom-in' }}
            >
              <img src={p.preview} alt="memory" />
              <button
                type="button"
                className="remove-btn"
                onClick={(e) => { e.stopPropagation(); remove(p.id); }}
                aria-label="Remove photo"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {viewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewing(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(10,5,20,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem', cursor: 'zoom-out',
            }}
          >
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={viewing.preview}
              alt="memory preview"
              style={{
                maxWidth: 'min(92vw, 900px)',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '14px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            />
            <button
              type="button"
              onClick={() => setViewing(null)}
              aria-label="Close preview"
              style={{
                position: 'fixed', top: '1rem', right: '1rem',
                width: '42px', height: '42px', borderRadius: '50%',
                border: 'none', background: 'rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
