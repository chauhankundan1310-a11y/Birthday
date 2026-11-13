const BALLOONS = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];

export default function BalloonLayer() {
  return (
    <div className="balloon-layer" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <span
          key={i}
          className="balloon"
          style={{
            left: `${6 + i * 12}%`,
            fontSize: `${2.2 + (i % 3) * 0.7}rem`,
            animationDuration: `${9 + i * 1.7}s`,
            animationDelay: `${i * 1.3}s`,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}
