import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ART } from '../assets/index.js';

function getTarget(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return null;
  const now = new Date();
  if (d <= now) d.setFullYear(d.getFullYear() + 1);
  return d;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CountdownGate({ date, preview = false, onDone }) {
  const target = useMemo(() => getTarget(date), [date]);
  const [left, setLeft] = useState(null);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!target) {
      onDoneRef.current?.();
      return;
    }
    let finished = false;
    const tick = () => {
      if (finished) return;
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        finished = true;
        setDone(true);
        setLeft({ d: 0, h: 0, m: 0, s: 0 });
        setTimeout(() => onDoneRef.current?.(), 600);
        return;
      }
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);

  if (!target) return null;

  const units = [
    { v: left?.d ?? 0, l: 'Days' },
    { v: left?.h ?? 0, l: 'Hours' },
    { v: left?.m ?? 0, l: 'Mins' },
    { v: left?.s ?? 0, l: 'Secs' },
  ];

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'linear-gradient(165deg, #17132F 0%, #3a2a5e 50%, #7a4a72 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem 1.2rem', overflow: 'hidden',
      }}
    >
      <div className="star-field" style={{ position: 'absolute', inset: 0 }}>
        {[8, 20, 35, 55, 70, 85, 15, 45, 62, 90].map((x, i) => (
          <span key={i} className="star" style={{ left: `${x}%`, top: `${(i * 37) % 60}%`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      <motion.img
        src={ART.characters.teddyHeart}
        alt=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: 'clamp(110px, 26vw, 160px)', marginBottom: '1rem' }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="serif"
        style={{ color: '#FFF9F1', fontSize: 'clamp(1.6rem, 5.5vw, 2.4rem)', marginBottom: '0.4rem' }}
      >
        {done ? 'The wait is over! 🎉' : 'Something special is waiting…'}
      </motion.h1>
      <p style={{ color: '#B9A5E8', marginBottom: '1.8rem', fontSize: '0.95rem' }}>
        {done
          ? 'Get ready!'
          : `The surprise begins on ${target.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`}
      </p>

      {!done && (
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {units.map((u) => (
            <div
              key={u.l}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(185,165,232,0.35)',
                borderRadius: '16px',
                padding: '0.7rem 0.9rem',
                minWidth: '64px',
              }}
            >
              <div className="serif" style={{ fontSize: '1.7rem', color: '#FFD76A', lineHeight: 1 }}>
                {pad(u.v)}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#B9A5E8', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {u.l}
              </div>
            </div>
          ))}
        </div>
      )}

      {preview && !done && (
        <button
          type="button"
          className="btn-ghost"
          onClick={onDone}
          style={{ marginTop: '2rem', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
        >
          Skip timer — preview now ⏩
        </button>
      )}
    </div>
  );
}
