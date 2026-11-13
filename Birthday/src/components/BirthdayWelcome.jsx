import { motion } from 'framer-motion';
import { ART } from '../assets/index.js';
import { Confetti } from './Confetti';

const FLOATERS = [
  { left: '6%', top: '15%', emoji: '❤️', size: '1.4rem', dur: '8s', delay: '0s' },
  { left: '85%', top: '18%', emoji: '⭐', size: '1.3rem', dur: '9s', delay: '0.8s' },
  { left: '78%', top: '60%', emoji: '💗', size: '1.6rem', dur: '7.5s', delay: '1.6s' },
  { left: '12%', top: '62%', emoji: '🎈', size: '1.5rem', dur: '10s', delay: '2.2s' },
  { left: '50%', top: '10%', emoji: '✨', size: '1.2rem', dur: '8.5s', delay: '1s' },
];

export default function BirthdayWelcome({ name, intro, senderName, onNext }) {
  return (
    <div className="pastel-screen">
      <Confetti count={70} />
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: f.left, top: f.top, fontSize: f.size,
            animationDuration: f.dur, animationDelay: f.delay,
            animationName: 'heartFloatReverse',
          }}
        >
          {f.emoji}
        </span>
      ))}

      <motion.img
        src={ART.characters.teddyBalloons}
        alt="Teddy with balloons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: 'clamp(150px, 34vw, 210px)', marginBottom: '0.6rem', filter: 'drop-shadow(0 10px 22px rgba(160,60,110,0.3))' }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        Happy Birthday{name ? `, ${name}` : ''}! 🎂
      </motion.h1>
      <motion.p
        className="wish"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.8 }}
      >
        {intro ||
          (senderName
            ? `${senderName} has a little surprise planned just for you — are you ready?`
            : 'A little surprise has been planned just for you — are you ready?')}
      </motion.p>
      {senderName && (
        <motion.p
          className="wish"
          style={{ marginTop: '0.6rem', fontWeight: 600, color: '#e85d91' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          — with love, {senderName}
        </motion.p>
      )}
      <motion.button
        type="button"
        className="btn-pink"
        onClick={onNext}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{ marginTop: '1.6rem' }}
      >
        Let's celebrate 🎉
      </motion.button>
    </div>
  );
}
