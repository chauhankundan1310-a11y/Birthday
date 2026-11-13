import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveMessage } from '../data/messages';
import { Confetti } from './Confetti';
import { ART } from '../assets/index.js';

function EnvelopeCard({ index, slot, opened, onOpen }) {
  const message = resolveMessage(slot) || `Message ${index + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: index % 2 ? 2 : -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 200, damping: 20 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
    >
      <motion.img
        src={ART.envelope}
        alt="Sealed envelope"
        onClick={!opened ? onOpen : undefined}
        animate={opened ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] } : { y: [0, -6, 0] }}
        transition={opened ? { duration: 0.6 } : { duration: 2.4, repeat: Infinity }}
        style={{
          width: 'clamp(110px, 24vw, 150px)',
          cursor: opened ? 'default' : 'pointer',
          filter: 'drop-shadow(0 10px 20px rgba(60,20,60,0.3))',
        }}
        whileHover={!opened ? { scale: 1.07, rotate: -3 } : undefined}
        whileTap={!opened ? { scale: 0.92 } : undefined}
      />
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: opened ? '#2e9e5b' : 'rgba(255,255,255,0.8)' }}>
        {opened ? 'Opened ✓' : 'Tap to open'}
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            style={{
              width: '100%',
              maxWidth: 300,
              background: 'rgba(255,253,248,0.97)',
              color: '#6b3a5e',
              borderRadius: '14px',
              padding: '0.85rem 1rem',
              boxShadow: '0 12px 28px rgba(60,20,60,0.28)',
              border: '1px solid #f0d8e4',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Confetti count={30} />
            <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>💌</div>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.55, textAlign: 'center' }}>{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MessageEnvelopes({ messages, name, onComplete }) {
  const [opened, setOpened] = useState([]);
  const total = Math.min(5, messages?.length || 0);

  const open = (i) => {
    if (opened.includes(i)) return;
    const next = [...opened, i];
    setOpened(next);
    if (next.length >= total) {
      setTimeout(() => onComplete?.(), 2000);
    }
  };

  if (!total) return null;

  return (
    <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto', padding: '0 0.5rem' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
          marginBottom: '0.4rem',
        }}
      >
        You have {total} surprises{name ? `, ${name}` : ''}! 🎁
      </motion.h2>
      <p style={{ textAlign: 'center', opacity: 0.85, marginBottom: '1.6rem', fontSize: '0.95rem' }}>
        {opened.length >= total
          ? 'All envelopes opened — how sweet is that? 💕'
          : `Tap each envelope to open it · ${opened.length}/${total} opened`}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '1.6rem 1rem',
          justifyItems: 'center',
        }}
      >
        {messages.slice(0, 5).map((slot, i) => (
          <EnvelopeCard key={i} index={i} slot={slot} opened={opened.includes(i)} onOpen={() => open(i)} />
        ))}
      </div>
    </div>
  );
}
