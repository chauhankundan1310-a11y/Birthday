# Birthday Surprise Maker 🎂

Create personalized, interactive birthday surprise websites and share them via a unique link. Built with React + Vite + Firebase.

## Features

- 7-step creation wizard: relationship, theme, details, photos, music, messages, animations
- 7 visual themes, photo uploads (auto-compressed), background music (built-in melody or upload)
- 5 message slots with ready-made presets in English / Hindi / Hinglish across 6 categories, or custom text
- Interactive recipient experience: gift box, floating balloons, letter-by-letter text reveal, **balloon shooting game** (mandatory), photo slideshow, love letter, blow-the-candles cake, fireworks finale
- Unique shareable links (`/s/:id`) — recipients need no account
- Firebase Firestore + Storage backend, Firestore/Storage security rules included

## Setup

```bash
npm install
npm run dev
```

## Firebase configuration (required for publishing)

1. Create a project at https://console.firebase.google.com
2. Add a **Web app** and copy the config values
3. Create `.env` from `.env.example` and fill in:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Enable **Firestore** and **Storage** in the Firebase console.
5. Deploy the included rules:

```
firebase deploy --only firestore:rules,storage
```

(`firestore.rules` and `storage.rules` are in this repo — public read, create-only writes.)

Without Firebase configured, the wizard and preview still work locally — only "Generate Link" is disabled.

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/create` | Creation wizard |
| `/preview` | Live preview + publish |
| `/s/:id` | Public surprise page |

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint
- `npm run preview` — preview production build
