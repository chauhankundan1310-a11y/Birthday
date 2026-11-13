import { useState } from 'react';
import { motion } from 'framer-motion';
import { Confetti } from './Confetti';
import { ART } from '../assets/index.js';

const CANDLES = [
  { left: '36%', color: '#E85D91' },
  { left: '50%', color: '#B9A5E8' },
  { left: '64%', color: '#FFD76A' },
];

export default function CakeCelebration({ name, relationship, onNext }) {
  const [wishMade, setWishMade] = useState(false);
  const isHer = ['Girlfriend', 'Wife'].includes(relationship);
  const cakeSrc = isHer ? ART.cakes.strawberry : ART.cakes.chocolate;

  return (
    <div className="cream-screen">
      {wishMade && <Confetti count={90} />}
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        You did it{name ? `, ${name}` : ''}! 🎉
      </motion.h1>
      <motion.p className="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        The first slice is always the sweetest one.
      </motion.p>

      <img
        src={ART.decorations.bunting}
        alt=""
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0.9 }}
      />

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={cakeSrc}
          alt="Birthday cake"
          style={{
            width: 'clamp(220px, 55vw, 280px)',
            filter: 'drop-shadow(0 14px 26px rgba(90,50,120,0.3))',
            display: 'block',
          }}
        />
        {/* CSS candle flames on top of the cake */}
        {!wishMade &&
          CANDLES.map((c, i) => (
            <span
              key={i}
              className="candle-flame"
              style={{
                left: c.left,
                top: '14%',
                width: '10px',
                height: '18px',
                animationDelay: `${i * 0.16}s`,
                background: `radial-gradient(circle at 50% 80%, #fff7cc 0%, ${c.color} 70%, #ff8c42 100%)`,
              }}
            />
          ))}
        {wishMade && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -14 }}
            style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', fontSize: '2rem' }}
          >
            💨
          </motion.span>
        )}
      </div>

      {!wishMade ? (
        <motion.button
          type="button"
          className="btn-pink"
          onClick={() => setWishMade(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '0.8rem' }}
        >
          🕯️ Make a wish
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}
        >
          <p className="sub" style={{ margin: 0, fontWeight: 600, color: '#e85d91' }}>
            Your wish is on its way to the stars ✨
          </p>
          <button type="button" className="btn-pink" onClick={onNext}>
            One last thing 💌
          </button>
        </motion.div>
      )}
    </div>
  );
}
