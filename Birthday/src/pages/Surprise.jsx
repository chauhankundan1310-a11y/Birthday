import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SurpriseExperience from '../components/SurpriseExperience.jsx';
import { getBirthday } from '../services/birthdayService.js';
import { isFirebaseConfigured } from '../services/firebase.js';

export default function Surprise() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | missing | error

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isFirebaseConfigured) {
        setStatus('error');
        return;
      }
      try {
        const doc = await getBirthday(id);
        if (cancelled) return;
        if (!doc) setStatus('missing');
        else {
          setData(doc);
          setStatus('ready');
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setStatus('error');
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="nf-wrap">
        <div style={{ fontSize: '3rem' }}>🎂</div>
        <p>Unwrapping your surprise…</p>
      </div>
    );
  }

  if (status === 'missing') {
    return (
      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <h1 style={{ fontSize: '1.5rem' }}>This surprise doesn't exist</h1>
        <p style={{ opacity: 0.8 }}>The link may be wrong or the surprise was removed.</p>
        <Link to="/" className="btn-create text-decoration-none" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Make your own
        </Link>
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div className="nf-wrap">
        <div style={{ fontSize: '3rem' }}>😢</div>
        <h1 style={{ fontSize: '1.5rem' }}>Couldn't load the surprise</h1>
        <p style={{ opacity: 0.8, maxWidth: 420 }}>
          {!isFirebaseConfigured
            ? 'Firebase is not configured on this site yet.'
            : 'Something went wrong while fetching the birthday data. Please try again later.'}
        </p>
      </div>
    );
  }

  return <SurpriseExperience data={data} gateDate={data.date || null} />;
}
