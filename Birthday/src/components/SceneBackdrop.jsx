export default function SceneBackdrop({ top, bottom, stars = false, children }) {
  return (
    <div className="scene-backdrop" aria-hidden="true">
      {top && <img className="bg-piece bg-top" src={top} alt="" />}
      {bottom && <img className="bg-piece bg-bottom" src={bottom} alt="" />}
      <div className="bg-scrim" />
      {stars && <StarField />}
      {children}
    </div>
  );
}

const STAR_POSITIONS = [
  [8, 12], [18, 30], [30, 8], [45, 18], [58, 10], [72, 22],
  [85, 12], [92, 32], [12, 45], [28, 55], [65, 48], [82, 58], [50, 35], [38, 40],
];

export function StarField() {
  return (
    <div className="star-field">
      {STAR_POSITIONS.map(([x, y], i) => (
        <span
          key={i}
          className="star"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </div>
  );
}
