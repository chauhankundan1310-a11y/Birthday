import { useMemo } from 'react';

const COLORS = ['#ff5c8a', '#ffd166', '#06d6a0', '#b388ff', '#4cc9f0', '#ff8fab', '#f72585'];

// Deterministic pseudo-random so renders stay pure.
function rand(i, salt) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function Confetti({ count = 80 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(i, 1) * 100,
        delay: rand(i, 2) * 2,
        duration: 2.5 + rand(i, 3) * 2.5,
        color: COLORS[i % COLORS.length],
        rotate: rand(i, 4) * 360,
      })),
    [count]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 6 }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function Fireworks({ count = 12 }) {
  const bursts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 10 + rand(i, 5) * 80,
        y: 10 + rand(i, 6) * 50,
        dx: (rand(i, 7) - 0.5) * 300,
        dy: -(100 + rand(i, 8) * 200),
        color: COLORS[i % COLORS.length],
        delay: rand(i, 9) * 1.5,
      })),
    [count]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
      {bursts.map((b) => (
        <span
          key={b.id}
          className="firework"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: b.color,
            color: b.color,
            boxShadow: `0 0 12px ${b.color}`,
            animationDelay: `${b.delay}s`,
            ['--dx']: `${b.dx}px`,
            ['--dy']: `${b.dy}px`,
          }}
        />
      ))}
    </div>
  );
}
