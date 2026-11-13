import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Fireworks, Confetti } from './Confetti';
import { ART } from '../assets/index.js';

const FLOATERS = [
  { left: '8%', emoji: '🎈', size: '2rem', dur: '9s', delay: '0s' },
  { left: '85%', emoji: '❤️', size: '1.6rem', dur: '8s', delay: '0.7s' },
  { left: '72%', emoji: '🎁', size: '1.8rem', dur: '10s', delay: '1.4s' },
  { left: '20%', emoji: '💗', size: '1.5rem', dur: '7.5s', delay: '2s' },
  { left: '55%', emoji: '⭐', size: '1.4rem', dur: '8.8s', delay: '0.4s' },
  { left: '40%', emoji: '🎈', size: '1.7rem', dur: '11s', delay: '1s' },
];

export default function Finale({ name, senderName, onReplay }) {
  const [round, setRound] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRound((r) => r + 1), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="final-screen">
      <Fireworks key={`fw-${round}`} count={10} />
      <Confetti key={`cf-${round}`} count={120} />

      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="float-heart"
          style={{ left: f.left, bottom: '-30px', fontSize: f.size, animationDuration: f.dur, animationDelay: f.delay }}
        >
          {f.emoji}
        </span>
      ))}

      <img
        src={ART.characters.teddyCrown}
        alt=""
        style={{ width: 'clamp(120px, 26vw, 170px)', marginBottom: '0.6rem' }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Happy Birthday{name ? `, ${name}` : ''}! 🎂
      </motion.h1>
      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {senderName
          ? `${senderName} made this little world just for you. Go celebrate — you deserve every bit of it!`
          : 'Go celebrate — you deserve every bit of it!'}
      </motion.p>
      <motion.button
        type="button"
        className="btn-replay"
        onClick={onReplay}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        🔄 Replay the surprise
      </motion.button>
    </div>
  );
}
