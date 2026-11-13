import { useRef, useState } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';

const MAX_PHOTOS = 8;

export default function PhotoUploader({ photos, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

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
            <div key={p.id} className="photo-tile">
              <img src={p.preview} alt="memory" />
              <button type="button" className="remove-btn" onClick={() => remove(p.id)} aria-label="Remove photo">
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
