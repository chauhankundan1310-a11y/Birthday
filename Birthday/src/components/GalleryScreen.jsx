import { motion } from 'framer-motion';
import { ART } from '../assets/index.js';

const CAPTIONS = ['us', 'forever', 'best days', 'always', 'memories', 'laughs', 'late nights', 'cherish'];

function photoSrc(p) {
  return p?.uploadedUrl || p?.preview || (typeof p === 'string' ? p : null);
}

export default function GalleryScreen({ photos, name, onNext }) {
  const hasPhotos = photos?.filter(photoSrc).length > 0;

  return (
    <div className="gallery-screen">
      <img
        src={ART.characters.teddyHeart}
        alt=""
        style={{ width: '80px', marginBottom: '0.6rem', opacity: 0.9 }}
      />
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        Some moments are worth keeping forever.
      </motion.h1>
      <motion.p className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Here's to all the laughs, clicks, late-night talks and little moments.
        {name ? ` ${name}, you make them all better.` : ''}
      </motion.p>

      {hasPhotos ? (
        <div className="gallery-row">
          {photos.filter(photoSrc).slice(0, 8).map((p, i) => (
            <motion.div
              key={i}
              className="polaroid-rot"
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
            >
              <img src={photoSrc(p)} alt={`memory ${i + 1}`} />
              <div className="cap">{CAPTIONS[i % CAPTIONS.length]}</div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="polaroid-rot"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <img src={ART.gallery} alt="Memories" style={{ width: '100%', maxWidth: '320px', height: 'auto', objectFit: 'contain' }} />
          <div className="cap">every moment with you 💗</div>
        </motion.div>
      )}

      <motion.button
        type="button"
        className="btn-pink"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: '1.8rem' }}
      >
        One last thing 🎉
      </motion.button>
    </div>
  );
}
