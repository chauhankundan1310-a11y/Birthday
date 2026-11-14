import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

// Plays the "Happy Birthday" melody with WebAudio — no audio file needed.
function playMelody(ctx, destination) {
  const notes = [
    [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
    [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
    [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 2],
    [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2],
  ];
  const beat = 0.42;
  let t = ctx.currentTime + 0.05;
  const oscs = [];
  notes.forEach(([n, beats]) => {
    const freq = 440 * Math.pow(2, (n - 69) / 12);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + beats * beat);
    osc.connect(gain).connect(destination);
    osc.start(t);
    osc.stop(t + beats * beat + 0.05);
    oscs.push(osc);
    t += beats * beat;
  });
  return { oscs, duration: t - ctx.currentTime };
}

export default function MusicPlayer({ music }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const oscsRef = useRef([]);
  const melodyTimerRef = useRef(null);
  const autoStartedRef = useRef(false);

  const isMelody = music?.type === 'melody';
  const hasAudio = music?.type === 'upload' && music?.url;
  const enabled = isMelody || hasAudio;

  const stopMelody = () => {
    oscsRef.current.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
    oscsRef.current = [];
    clearTimeout(melodyTimerRef.current);
    try { ctxRef.current?.close?.(); } catch { /* noop */ }
    ctxRef.current = null;
  };

  const loopMelody = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const { oscs, duration } = playMelody(ctx, ctx.destination);
    oscsRef.current = oscs;
    melodyTimerRef.current = setTimeout(loopMelody, duration * 1000 + 150);
  };

  const start = () => {
    if (!enabled) return;
    if (isMelody) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = ctxRef.current || new AC();
      ctxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      setPlaying(true);
      clearTimeout(melodyTimerRef.current);
      loopMelody();
    } else {
      const a = audioRef.current;
      if (!a) return;
      a.currentTime = 0;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const stop = () => {
    if (isMelody) stopMelody();
    else audioRef.current?.pause();
    setPlaying(false);
  };

  // Auto-start on the first user interaction (e.g. "Turn on the lights" tap)
  useEffect(() => {
    if (!enabled || autoStartedRef.current) return;
    const tryStart = () => {
      if (autoStartedRef.current) return;
      autoStartedRef.current = true;
      start();
    };
    window.addEventListener('pointerdown', tryStart, { once: true });
    window.addEventListener('keydown', tryStart, { once: true });
    window.addEventListener('touchstart', tryStart, { once: true });
    return () => {
      window.removeEventListener('pointerdown', tryStart);
      window.removeEventListener('keydown', tryStart);
      window.removeEventListener('touchstart', tryStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, isMelody]);

  useEffect(() => {
    return () => {
      stopMelody();
      audioRef.current?.pause();
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="music-bar">
      {hasAudio && <audio ref={audioRef} src={music.url} preload="auto" loop />}
      <button type="button" className="music-btn" onClick={() => (playing ? stop() : start())} aria-label={playing ? 'Pause music' : 'Play music'}>
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <span className="music-name">
        <FaMusic style={{ marginRight: '0.4rem', opacity: 0.7 }} />
        {isMelody ? 'Happy Birthday Melody' : music.fileName || 'Birthday Song'}
        {playing && <span style={{ marginLeft: '0.4rem', color: '#7CFC9A' }}>♪ playing</span>}
      </span>
    </div>
  );
}
