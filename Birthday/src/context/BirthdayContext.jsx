/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { initialBirthday } from '../data/birthday';

const BirthdayContext = createContext(null);
const STORAGE_KEY = 'birthday-draft';

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialBirthday;
    const parsed = JSON.parse(raw);
    // File objects don't survive JSON serialization — strip them on load.
    const music = { ...initialBirthday.music, ...(parsed.music || {}) };
    delete music.file;
    return {
      ...initialBirthday,
      ...parsed,
      music,
      photos: Array.isArray(parsed.photos)
        ? parsed.photos.map((p) => ({ ...p, file: p.file instanceof File ? p.file : null }))
        : [],
      animations: { ...initialBirthday.animations, ...(parsed.animations || {}) },
      messages: Array.isArray(parsed.messages) && parsed.messages.length === 5
        ? parsed.messages
        : initialBirthday.messages,
    };
  } catch {
    return initialBirthday;
  }
}

export function BirthdayProvider({ children }) {
  const [draft, setDraft] = useState(loadDraft);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // storage full or unavailable — ignore
    }
  }, [draft]);

  const update = (patch) =>
    setDraft((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));

  const reset = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setDraft(initialBirthday);
  };

  return (
    <BirthdayContext.Provider value={{ draft, update, reset }}>
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthday() {
  const ctx = useContext(BirthdayContext);
  if (!ctx) throw new Error('useBirthday must be used inside BirthdayProvider');
  return ctx;
}
