import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTheme } from '../data/themes';
import BalloonLayer from './BalloonLayer';
import MusicPlayer from './MusicPlayer';
import LightsOff from './LightsOff';
import CountdownGate from './CountdownGate';
import BirthdayWelcome from './BirthdayWelcome';
import CakeCelebration from './CakeCelebration';
import MessageEnvelopes from './MessageEnvelopes';
import EnvelopeScreen from './EnvelopeScreen';
import LetterScreen from './LetterScreen';
import GalleryScreen from './GalleryScreen';
import Finale from './Finale';

export default function SurpriseExperience({ data, preview = false, topBar = null, onSceneIndex = null, gateDate = null }) {
  const theme = getTheme(data.themeId);
  const [scene, setScene] = useState(0);
  const [gateDone, setGateDone] = useState(!gateDate);
  const next = () => setScene((s) => s + 1);
  const replay = () => setScene(0);

  const scenes = useMemo(() => {
    const a = data.animations || {};
    const letterText =
      data.intro ||
      (data.messages || []).find((m) => m.mode === 'custom' && m.customText)?.customText ||
      '';
    const list = [
      { id: 'lights', node: <LightsOff onLit={next} theme={theme} /> },
      {
        id: 'welcome',
        node: <BirthdayWelcome name={data.name} intro={data.intro} senderName={data.senderName} onNext={next} />,
      },
      { id: 'cake', node: <CakeCelebration name={data.name} relationship={data.relationship} onNext={next} /> },
    ];
    // message envelopes — mandatory
    list.push({
      id: 'envelopes',
      node: <MessageEnvelopes messages={data.messages} name={data.name} onComplete={next} />,
    });
    if (a.letter !== false) {
      list.push({ id: 'envelope', node: <EnvelopeScreen onNext={next} /> });
      list.push({
        id: 'letter',
        node: <LetterScreen letter={letterText} name={data.name} senderName={data.senderName} onNext={next} />,
      });
    }
    if (a.photos !== false) {
      list.push({ id: 'gallery', node: <GalleryScreen photos={data.photos} name={data.name} onNext={next} /> });
    }
    if (a.finale !== false) {
      list.push({ id: 'finale', node: <Finale name={data.name} senderName={data.senderName} onReplay={replay} /> });
    } else {
      list.push({
        id: 'end',
        node: (
          <div className="final-screen">
            <h1 className="serif">Happy Birthday{name ? `, ${data.name}` : ''}!</h1>
            <p className="sub">Hope your day is as wonderful as you are.</p>
          </div>
        ),
      });
    }
    return list;
  }, [data, theme]);

  const current = scenes[Math.min(scene, scenes.length - 1)];

  useEffect(() => {
    onSceneIndex?.(scene, scenes.length);
  }, [scene, scenes.length, onSceneIndex]);

  return (
    <div
      className="theme-scope surprise-root"
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
      {data.animations?.balloons !== false && <BalloonLayer />}
      <MusicPlayer music={data.music} />

      {preview && (
        topBar || (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(0,0,0,0.75)', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <span>👁 Preview mode</span>
            <a href="/create" className="btn-scene" style={{ padding: '0.3rem 1rem', fontSize: '0.8rem' }}>← Back to editor</a>
          </div>
        )
      )}

      {gateDate && !gateDone && (
        <CountdownGate date={gateDate} preview={preview} onDone={() => setGateDone(true)} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}
        >
          {gateDone ? current.node : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
