import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer.jsx';
import { ART } from '../assets/index.js';

const FLOATERS = [
  { left: '6%', emoji: '❤️', size: '1.5rem', dur: '9s', delay: '0s' },
  { left: '88%', emoji: '🎈', size: '1.8rem', dur: '10s', delay: '1s' },
  { left: '15%', emoji: '⭐', size: '1.3rem', dur: '8s', delay: '0.5s' },
  { left: '80%', emoji: '💗', size: '1.4rem', dur: '9.5s', delay: '1.8s' },
  { left: '45%', emoji: '✨', size: '1.2rem', dur: '8.5s', delay: '2.4s' },
];

export default function Home() {
  return (
    <div className="landing">
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="float-heart"
          style={{ left: f.left, bottom: '-30px', fontSize: f.size, animationDuration: f.dur, animationDelay: f.delay }}
        >
          {f.emoji}
        </span>
      ))}

      <section className="hero" style={{ paddingTop: '7rem' }}>
        <motion.img
          src={ART.characters.teddyBalloons}
          alt="Teddy with balloons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: 'clamp(160px, 36vw, 230px)', marginBottom: '1rem', filter: 'drop-shadow(0 14px 30px rgba(0,0,0,0.35))' }}
        />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
          Happy Birthday!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{ maxWidth: 460, margin: '0 auto 2rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}
        >
          Create a magical, personalized birthday surprise with photos, music,
          hidden messages and fun surprises — then share it with one link.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Link to="/create" className="btn-glow text-decoration-none" style={{ display: 'inline-block', fontSize: '1.05rem' }}>
            🎉 Create a Surprise
          </Link>
        </motion.div>
      </section>

      <img
        src={ART.decorations.heartBalloons}
        alt=""
        style={{ position: 'absolute', right: '5%', bottom: '8%', width: 'clamp(90px, 18vw, 140px)', opacity: 0.9 }}
      />
      <img
        src={ART.gifts.pinkGiftBox}
        alt=""
        style={{ position: 'absolute', left: '5%', bottom: '10%', width: 'clamp(80px, 16vw, 120px)', opacity: 0.9 }}
      />

      <Footer />
    </div>
  );
}
