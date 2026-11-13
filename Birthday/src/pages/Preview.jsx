import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaWhatsapp, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useBirthday } from '../context/BirthdayContext.jsx';
import SurpriseExperience from '../components/SurpriseExperience.jsx';
import { getTheme } from '../data/themes.js';
import { isFirebaseConfigured } from '../services/firebase.js';
import { saveBirthday, generateId } from '../services/birthdayService.js';
import { uploadPhoto, uploadAudio } from '../services/storageService.js';
import { resolveMessage } from '../data/messages.js';

export default function Preview() {
  const { draft, reset } = useBirthday();
  const navigate = useNavigate();
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null); // {id, url}
  const [copied, setCopied] = useState(false);
  const [ended, setEnded] = useState(false); // true when preview reaches last scene

  const theme = getTheme(draft.themeId);

  const previewData = useMemo(() => ({
    ...draft,
    photos: draft.photos.map((p) => ({ preview: p.preview, uploadedUrl: p.uploadedUrl })),
    music: {
      type: draft.music?.type === 'upload' && !draft.music?.url ? 'upload' : draft.music?.type,
      url: draft.music?.url || draft.music?.previewUrl || '',
      fileName: draft.music?.fileName || '',
    },
    messages: draft.messages.map((m) => ({ ...m, resolved: resolveMessage(m) })),
  }), [draft]);

  const publish = async () => {
    setError('');
    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Add your Firebase env vars (see .env.example) and restart.');
      return;
    }
    setPublishing(true);
    setProgress(0);
    try {
      const id = generateId();
      const totalSteps = draft.photos.length + (draft.music?.file ? 1 : 0) + 1;
      let done = 0;
      const tick = () => { done++; setProgress(Math.round((done / totalSteps) * 90)); };

      // Kick off audio upload in parallel with photos
      const audioPromise =
        draft.music?.type === 'upload' && draft.music?.file
          ? uploadAudio(id, draft.music.file).then((u) => { tick(); return u; })
          : Promise.resolve('');

      // Upload photos in parallel — much faster than sequential
      const photoUrls = await Promise.all(
        draft.photos.map(async (p, i) => {
          try {
            if (p.file) return await uploadPhoto(id, p.file, i);
            if (p.uploadedUrl) return p.uploadedUrl;
            return null;
          } finally {
            tick();
          }
        })
      );

      const musicUrl = await audioPromise;
      setProgress(95);

      const data = {
        relationship: draft.relationship,
        themeId: draft.themeId,
        name: draft.name,
        senderName: draft.senderName,
        date: draft.date,
        heading: draft.heading,
        intro: draft.intro,
        photos: photoUrls.filter(Boolean),
        music: {
          type: draft.music?.type || 'none',
          url: draft.music?.type === 'upload' ? musicUrl : '',
          fileName: draft.music?.fileName || '',
        },
        messages: draft.messages.map((m) => ({
          category: m.category,
          mode: m.mode,
          presetIndex: m.presetIndex,
          language: m.language,
          customText: m.customText,
        })),
        animations: draft.animations,
      };

      await saveBirthday(data, id);
      setProgress(100);
      setResult({ id, url: `${window.location.origin}/s/${id}` });
    } catch (e) {
      console.error(e);
      setError(e.message === 'FIREBASE_NOT_CONFIGURED'
        ? 'Firebase is not configured. Add your Firebase env vars and restart.'
        : `Publishing failed: ${e.message}`);
    } finally {
      setPublishing(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(result.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy — please copy the link manually.');
    }
  };

  const whatsappText = encodeURIComponent(
    `🎂 I made a birthday surprise for you! Open this link to see it: ${result?.url || ''}`
  );

  if (result) {
    return (
      <div
        className="theme-scope"
        style={{
          ['--theme-gradient']: theme.gradient,
          ['--accent']: theme.accent,
          ['--soft']: theme.soft,
          ['--card-bg']: theme.cardBg,
          ['--theme-text']: theme.text,
          background: theme.gradient,
          color: theme.text,
        }}
      >
        <div className="scene-wrap">
          <div className="scene-card publish-card">
            <div style={{ fontSize: '3.5rem' }}>🎉</div>
            <h1 className="big-title" style={{ fontSize: '2rem' }}>Your surprise is ready!</h1>
            <p className="scene-sub">
              Share this link with {draft.name || 'them'} — no login needed!
            </p>
            <div className="link-box">
              <input readOnly value={result.url} onFocus={(e) => e.target.select()} />
              <button type="button" className="btn-scene" onClick={copyLink} style={{ padding: '0.6rem 1.2rem' }}>
                {copied ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                className="btn-scene text-decoration-none"
                style={{ background: '#25D366', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                href={`https://wa.me/?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp /> Share on WhatsApp
              </a>
              <button type="button" className="btn-ghost" onClick={() => { reset(); navigate('/'); }}>
                Create another
              </button>
            </div>
            {error && <p style={{ color: '#ffb3c7', marginTop: '1rem' }}>{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SurpriseExperience
        data={previewData}
        preview
        topBar={<></>}
        gateDate={draft.date || null}
        onSceneIndex={(i, total) => setEnded(i >= total - 1)}
      />

      {/* tiny back-to-editor button */}
      <a
        href="/create"
        style={{
          position: 'fixed', top: '0.8rem', left: '0.8rem', zIndex: 60,
          background: 'rgba(15,8,30,0.75)', backdropFilter: 'blur(8px)',
          color: '#fff', borderRadius: '999px', padding: '0.4rem 0.95rem',
          fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        👁 Preview · ← Edit
      </a>

      {/* publish bar — appears only at the very end of the preview */}
      {ended && (
      <div style={{
        position: 'fixed', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 60, display: 'flex', alignItems: 'center', gap: '0.7rem',
        background: 'rgba(15,8,30,0.9)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px',
        padding: '0.55rem 1.1rem', maxWidth: 'calc(100vw - 1.5rem)',
      }}>
        {!isFirebaseConfigured && (
          <span style={{ color: '#ffd166', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
            <FaExclamationTriangle /> Firebase?
          </span>
        )}
        {publishing && (
          <div className="progress-upload" style={{ width: 90 }}>
            <div className="bar"><div style={{ width: `${progress}%` }} /></div>
          </div>
        )}
        {error && <span style={{ color: '#ffb3c7', fontSize: '0.75rem', maxWidth: 200 }}>{error}</span>}
        <button
          type="button"
          className="btn-scene"
          onClick={publish}
          disabled={publishing}
          style={{ padding: '0.5rem 1.4rem', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
        >
          {publishing ? `${progress}%` : '🚀 Generate Link'}
        </button>
      </div>
      )}
    </>
  );
}
