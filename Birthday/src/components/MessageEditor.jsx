import { MESSAGE_CATEGORIES, MESSAGE_LANGUAGES, MESSAGES, resolveMessage } from '../data/messages';

export default function MessageEditor({ slot, index, onChange }) {
  const presets = MESSAGES[slot.category]?.[slot.language || 'en'] || [];

  const set = (patch) => onChange({ ...slot, ...patch });

  return (
    <div className="msg-slot">
      <div className="msg-slot-head">
        <span className="slot-badge">Message {index + 1} of 5</span>
        <div className="mode-toggle">
          <button
            type="button"
            className={`mode-btn ${slot.mode === 'preset' ? 'active' : ''}`}
            onClick={() => set({ mode: 'preset' })}
          >
            Ready-made
          </button>
          <button
            type="button"
            className={`mode-btn ${slot.mode === 'custom' ? 'active' : ''}`}
            onClick={() => set({ mode: 'custom' })}
          >
            Custom
          </button>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-6 col-md-4">
          <select
            className="form-select"
            value={slot.category}
            onChange={(e) => set({ category: e.target.value, presetIndex: 0 })}
          >
            {MESSAGE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-4">
          <select
            className="form-select"
            value={slot.language}
            onChange={(e) => set({ language: e.target.value })}
          >
            {MESSAGE_LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
        {slot.mode === 'preset' && (
          <div className="col-12 col-md-4">
            <select
              className="form-select"
              value={slot.presetIndex ?? 0}
              onChange={(e) => set({ presetIndex: Number(e.target.value) })}
            >
              {presets.map((_, i) => (
                <option key={i} value={i}>Preset {i + 1}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {slot.mode === 'preset' ? (
        <div className="preset-list">
          {presets.map((msg, i) => (
            <button
              key={i}
              type="button"
              className={`preset-item ${slot.presetIndex === i ? 'selected' : ''}`}
              onClick={() => set({ presetIndex: i })}
            >
              {msg}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          className="form-control"
          placeholder="Write your own message…"
          value={slot.customText}
          onChange={(e) => set({ customText: e.target.value })}
          maxLength={500}
        />
      )}

      <div className="msg-preview-box">{resolveMessage(slot) || 'Preview will appear here…'}</div>
    </div>
  );
}
