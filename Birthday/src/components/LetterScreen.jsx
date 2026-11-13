import { motion } from 'framer-motion';
import { ART } from '../assets/index.js';

function highlight(text, name, sender) {
  if (!text) return null;
  const needles = [name, sender].filter(Boolean);
  if (!needles.length) return text;
  const regex = new RegExp(`(${needles.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(regex).map((s, i) =>
    needles.includes(s) ? <span key={i} className="hl">{s}</span> : <span key={i}>{s}</span>
  );
}

export default function LetterScreen({ letter, name, senderName, onNext }) {
  const text =
    letter ||
    `Happy Birthday${name ? `, ${name}` : ''}! Another year of you being absolutely wonderful. Thank you for every laugh, every memory and every little moment we've shared. I hope this year brings you everything you've been wishing for. — ${senderName || 'Someone who cares'}`;

  return (
    <div className="letter-screen">
      <img
        src={ART.characters.teddyHeart}
        alt=""
        style={{ position: 'absolute', right: '6%', top: '10%', width: '90px', opacity: 0.85 }}
      />
      <img
        src={ART.decorations.pinkBow}
        alt=""
        style={{ position: 'absolute', left: '7%', bottom: '12%', width: '80px', opacity: 0.85 }}
      />
      <span style={{ position: 'absolute', top: '16%', left: '15%', fontSize: '1.2rem' }}>⭐</span>
      <span style={{ position: 'absolute', top: '22%', right: '18%', fontSize: '1rem' }}>💗</span>
      <span style={{ position: 'absolute', bottom: '18%', right: '14%', fontSize: '1.1rem' }}>✨</span>

      <motion.div
        className="letter-card"
        initial={{ opacity: 0, y: 30, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2 }}
        transition={{ duration: 0.7 }}
      >
        <div style={{ textAlign: 'center', fontSize: '1.6rem', marginBottom: '0.4rem' }}>💌</div>
        <div className="letter-text">{highlight(text, name, senderName)}</div>
        {senderName && <div className="letter-sign">— {senderName}</div>}
      </motion.div>

      <motion.button
        type="button"
        className="btn-pink"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '1.6rem' }}
      >
        One last thing 🖼️
      </motion.button>
    </div>
  );
}
