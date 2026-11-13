import { useState } from 'react';
import { motion } from 'framer-motion';
import { ART } from '../assets/index.js';

export default function EnvelopeScreen({ onNext }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="envelope-screen">
      <img
        src={ART.decorations.flowerBouquet}
        alt=""
        style={{ position: 'absolute', left: '6%', bottom: '8%', width: '110px', opacity: 0.9 }}
      />
      <img
        src={ART.decorations.heartStarStickers}
        alt=""
        style={{ position: 'absolute', right: '7%', top: '12%', width: '130px', opacity: 0.9 }}
      />

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        There's something for you
      </motion.h1>
      <motion.p className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        A tiny birthday surprise, made just for you.
      </motion.p>

      <motion.img
        src={ART.envelope}
        alt="Heart seal envelope"
        className={opened ? 'envelope-open-anim' : ''}
        style={{
          width: 'clamp(220px, 55vw, 280px)',
          marginBottom: '1.4rem',
          filter: 'drop-shadow(0 16px 30px rgba(160,60,110,0.35))',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />

      {!opened ? (
        <motion.button
          type="button"
          className="btn-pink"
          onClick={() => setOpened(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          💌 Open your surprise
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: '#fffdf8',
            position: 'relative',
            zIndex: 2,
            borderRadius: '16px',
            padding: '1.2rem 1.6rem',
            maxWidth: '400px',
            boxShadow: '0 14px 34px rgba(160,60,110,0.25)',
            border: '1px solid #f0d8e4',
          }}
        >
          <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>💝</div>
          <p style={{ margin: 0, color: '#8a2f57', fontWeight: 600, lineHeight: 1.6 }}>
            You found it! There's a little letter inside — just for you.
          </p>
          <button type="button" className="btn-pink" onClick={onNext} style={{ marginTop: '1rem' }}>
            Read it 💌
          </button>
        </motion.div>
      )}
    </div>
  );
}
