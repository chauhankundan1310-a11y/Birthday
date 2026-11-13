import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBirthday } from '../context/BirthdayContext.jsx';
import { getTheme, RELATIONSHIPS } from '../data/themes.js';
import { ANIMATIONS } from '../data/messages.js';
import ProgressBar from '../components/ProgressBar.jsx';
import PhotoUploader from '../components/PhotoUploader.jsx';
import MessageEditor from '../components/MessageEditor.jsx';
import { FaHeart, FaMusic, FaUpload } from 'react-icons/fa';

const STEPS = [
  { id: 'relationship', label: 'Relationship' },
  { id: 'details', label: 'Details' },
  { id: 'photos', label: 'Photos' },
  { id: 'music', label: 'Music' },
  { id: 'messages', label: 'Messages' },
  { id: 'animations', label: 'Animations' },
];

const RELATIONSHIP_EMOJIS = {
  Girlfriend: '👩‍❤️‍👨', Boyfriend: '👨‍❤️‍👩', Wife: '💍', Husband: '💍',
  'Best Friend': '🤝', Brother: '👦', Sister: '👧', Mother: '👩', Father: '👨',
  'Someone Special': '✨',
};

export default function CreateBirthday() {
  const { draft, update } = useBirthday();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const theme = getTheme(draft.themeId);

  const canContinue = () => {
    if (step === 0) return !!draft.relationship;
    if (step === 1) return !!draft.name.trim();
    return true;
  };

  const next = () => {
    const errs = {};
    if (step === 0 && !draft.relationship) errs.relationship = 'Please pick a relationship';
    if (step === 1 && !draft.name.trim()) errs.name = 'Name is required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const musicFile = draft.music?.file;

  return (
    <div
      className="theme-scope"
      style={{
        ['--theme-gradient']: theme.gradient,
        ['--accent']: theme.accent,
        ['--soft']: theme.soft,
        ['--card-bg']: 'rgba(255,255,255,0.65)',
        ['--theme-text']: '#4a2545',
        background: 'linear-gradient(180deg, #FFF9F1 0%, #FCE4EC 55%, #f6d7e4 100%)',
        color: '#4a2545',
      }}
    >
      <div className="wizard-wrap">
        <div className="wizard-head">
          <div>
            <div className="wizard-title">🎂 Create a Birthday Surprise</div>
            <small style={{ opacity: 0.75 }}>Step {step + 1} of {STEPS.length} — {STEPS[step].label}</small>
          </div>
          <a href="/" className="btn-ghost text-decoration-none" style={{ padding: '0.4rem 1.1rem', fontSize: '0.85rem' }}>✕ Cancel</a>
        </div>

        <ProgressBar steps={STEPS} current={step} />

        {/* STEP 1: Relationship */}
        {step === 0 && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '1.4rem' }}>Who are you celebrating? 💝</h2>
            <div className="option-grid">
              {RELATIONSHIPS.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`option-card ${draft.relationship === r ? 'selected' : ''}`}
                  onClick={() =>
                    update({
                      relationship: r,
                      themeId: ['Girlfriend', 'Wife'].includes(r) ? 'cute' : 'sky',
                    })
                  }
                >
                  <span className="opt-emoji">{RELATIONSHIP_EMOJIS[r] || '🎉'}</span>
                  <span className="opt-name">{r}</span>
                </button>
              ))}
            </div>
            {errors.relationship && <p style={{ color: '#ffb3c7', textAlign: 'center', marginTop: '1rem' }}>{errors.relationship}</p>}
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 1 && (
          <div className="form-card">
            <h2 style={{ textAlign: 'center', marginBottom: '1.4rem' }}>Personal details ✍️</h2>
            <div className="mb-3">
              <label className="form-label">Birthday person's name *</label>
              <input
                className="form-control"
                placeholder="e.g. Priya"
                value={draft.name}
                onChange={(e) => update({ name: e.target.value })}
                maxLength={60}
              />
              {errors.name && <small style={{ color: '#ffb3c7' }}>{errors.name}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Your name (sender)</label>
              <input
                className="form-control"
                placeholder="e.g. Rahul"
                value={draft.senderName}
                onChange={(e) => update({ senderName: e.target.value })}
                maxLength={60}
              />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Birthday date</label>
                <input
                  type="date"
                  className="form-control"
                  value={draft.date}
                  onChange={(e) => update({ date: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Custom heading</label>
                <input
                  className="form-control"
                  placeholder="e.g. To the best sister ever"
                  value={draft.heading}
                  onChange={(e) => update({ heading: e.target.value })}
                  maxLength={80}
                />
              </div>
            </div>
            <div className="mb-1">
              <label className="form-label">Short introduction</label>
              <textarea
                className="form-control"
                placeholder="A few sweet lines to welcome them…"
                value={draft.intro}
                onChange={(e) => update({ intro: e.target.value })}
                maxLength={400}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Photos */}
        {step === 2 && (
          <div className="form-card">
            <h2 style={{ textAlign: 'center', marginBottom: '0.6rem' }}>Add photos 📸</h2>
            <p style={{ textAlign: 'center', opacity: 0.75, fontSize: '0.9rem' }}>
              These become an animated memory slideshow. Optional but recommended!
            </p>
            <PhotoUploader
              photos={draft.photos}
              onChange={(photos) => update({ photos })}
            />
          </div>
        )}

        {/* STEP 4: Music */}
        {step === 3 && (
          <div className="form-card">
            <h2 style={{ textAlign: 'center', marginBottom: '1.2rem' }}><FaMusic style={{ marginRight: '0.5rem' }} />Background music</h2>
            <div className="d-flex flex-column gap-2">
              {[
                { id: 'none', label: '🔇 No music', desc: 'Silent surprise' },
                { id: 'melody', label: '🎵 Happy Birthday Melody', desc: 'Built-in cheerful tune (plays on tap)' },
                { id: 'upload', label: '📤 Upload your own song', desc: 'MP3 / WAV / M4A' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`preset-item ${draft.music?.type === opt.id ? 'selected' : ''}`}
                  style={{ textAlign: 'left' }}
                  onClick={() => update({ music: { type: opt.id, url: '', fileName: '', file: null } })}
                >
                  <b>{opt.label}</b>
                  <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>{opt.desc}</div>
                </button>
              ))}
            </div>

            {draft.music?.type === 'upload' && (
              <div className="upload-drop" style={{ marginTop: '1rem' }} onClick={() => document.getElementById('music-file-input')?.click()}>
                <FaUpload style={{ fontSize: '1.4rem', marginBottom: '0.4rem', opacity: 0.7 }} />
                <div style={{ fontWeight: 600 }}>
                  {musicFile ? `✓ ${musicFile.name}` : 'Choose an audio file'}
                </div>
                <input
                  id="music-file-input"
                  type="file"
                  accept="audio/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) update({ music: { type: 'upload', file: f, fileName: f.name, url: '', previewUrl: URL.createObjectURL(f) } });
                    e.target.value = '';
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Messages */}
        {step === 4 && (
          <div className="form-card" style={{ maxWidth: 720 }}>
            <h2 style={{ textAlign: 'center', marginBottom: '0.4rem' }}><FaHeart style={{ marginRight: '0.5rem' }} />Birthday messages</h2>
            <p style={{ textAlign: 'center', opacity: 0.75, fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Fill all 5 slots — each balloon in the game hides one message.
            </p>
            {draft.messages.map((slot, i) => (
              <MessageEditor
                key={i}
                index={i}
                slot={slot}
                onChange={(updated) => {
                  const messages = [...draft.messages];
                  messages[i] = updated;
                  update({ messages });
                }}
              />
            ))}
          </div>
        )}

        {/* STEP 6: Animations */}
        {step === 5 && (
          <div className="form-card" style={{ maxWidth: 720 }}>
            <h2 style={{ textAlign: 'center', marginBottom: '0.4rem' }}>Choose animations 🎆</h2>
            <p style={{ textAlign: 'center', opacity: 0.75, fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Toggle the effects you want in the surprise.
            </p>
            <div className="anim-list">
              {ANIMATIONS.map((a) => (
                <div key={a.id} className="anim-row">
                  <span className="anim-emoji">{a.icon}</span>
                  <div className="anim-info">
                    <b>{a.name}</b>
                    {a.mandatory && <span className="slot-badge" style={{ marginLeft: '0.5rem' }}>Required</span>}
                    <small>{a.description}</small>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={a.mandatory ? true : !!draft.animations?.[a.id]}
                      disabled={a.mandatory}
                      onChange={(e) => update({ animations: { ...draft.animations, [a.id]: e.target.checked } })}
                    />
                    <span className="slider" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="wizard-nav">
          <button type="button" className="btn-ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ opacity: step === 0 ? 0.4 : 1 }}>
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn-primary-accent" onClick={next} disabled={!canContinue()}>
              Continue →
            </button>
          ) : (
            <button type="button" className="btn-primary-accent" onClick={() => navigate('/preview')}>
              Preview Surprise 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
