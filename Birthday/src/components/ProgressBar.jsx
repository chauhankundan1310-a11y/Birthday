export default function ProgressBar({ steps, current }) {
  return (
    <div className="progress-steps">
      {steps.map((s, i) => (
        <div key={s.id} className="progress-step" title={s.label}>
          <div style={{ width: i <= current ? '100%' : '0%' }} />
        </div>
      ))}
    </div>
  );
}
