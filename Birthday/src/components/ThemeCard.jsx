export default function ThemeCard({ theme, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`option-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(theme.id)}
      style={{ background: selected ? theme.soft : 'var(--card-bg)' }}
    >
      <span className="opt-emoji">{theme.emoji}</span>
      <span className="opt-name">{theme.name}</span>
      <span className="opt-desc">{theme.description}</span>
    </button>
  );
}
