import { useState } from 'react';
import { motion } from 'framer-motion';
import { ART } from '../assets/index.js';
import { StarField } from './SceneBackdrop.jsx';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47) % 100,
  size: 3 + (i % 4) * 2,
  dur: 7 + (i % 5) * 2.2,
  delay: (i % 7) * 0.9,
}));

export default function LightsOff({ onLit, theme }) {
  const [flash, setFlash] = useState(false);

  const turnOn = () => {
    if (flash) return;
    setFlash(true);
    setTimeout(onLit, 750);
  };

  return (
    <>
      {flash && <div className="light-flash" style={{ opacity: 1, animation: 'flashFade 0.75s ease forwards' }} />}
      <div
        className="lights-off"
        style={theme ? { background: `${theme.gradient}, radial-gradient(ellipse at 50% 120%, rgba(0,0,0,0.35), transparent 70%)` } : undefined}
      >
        <StarField />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              bottom: '-10px',
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Shhh... The room is waiting for you.
        </motion.h1>
        <motion.p
          className="sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Someone left the lights off on purpose.
        </motion.p>
        <motion.button
          type="button"
          className="btn-glow"
          onClick={turnOn}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          ✨ Turn on the lights
        </motion.button>
        <img
          src={ART.characters.teddyHeart}
          alt=""
          style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(140px, 30vw, 210px)',
            opacity: 0.95,
            filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.5))',
          }}
        />
      </div>
      <style>{`@keyframes flashFade { to { opacity: 0; } }`}</style>
    </>
  );
}
