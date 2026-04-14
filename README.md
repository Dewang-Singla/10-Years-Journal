# 10 Years Journal

10 Years Journal is a local-first Progressive Web App for documenting a fixed personal journey from April 28, 2026 through December 31, 2035.

It combines daily journaling, mood tracking, habits, timeline browsing, analytics, and end-of-journey reflections in a single offline-capable app.

## Project Overview

- Purpose: support a long-form, structured 10-year self-tracking journey.
- Data model: every day is represented by a date id and day number, with rich entry content.
- Storage model: all data is persisted in IndexedDB via Dexie. No backend API is used.
- Platform model: installable PWA with responsive desktop and mobile navigation.

## Key Features

### Daily Writing and Tracking
- Rich text journal editor (TipTap) with formatting and image URL embeds.
- Mood rating scale from 0 to 10 with emoji labels (Lost to Legendary).
- Structured entry content: todos, gratitude items, tags, memories, habit logs, highlights.
- Auto-save behavior through state updates and debounced persistence.

### Journey Mechanics
- Fixed date window validation for journal entries.
- Daily timing windows:
	- To-do add/delete is editable until 8:00 PM of that day.
	- To-do checkboxes (done/undone) remain toggleable from 8:00 PM until 12:00 PM next day.
	- Reflection sections (mood, journal, habits toggle, tags, gratitude, memories) are editable from 8:00 PM until 12:00 PM next day.
	- After 12:00 PM next day, the entry is read-only.
- Streak freeze system: up to 2 freezes in a rolling 30-day cycle.
- Reflection chamber locked until Dec 31, 2035.
- Reflection cadence: 100 journal days plus 1 reflection day, for 35 reflection days total.

### Milestones

| Day | Date |
| --- | --- |
| 505 | Sep 14, 2027 |
| 1010 | Jan 31, 2029 |
| 1515 | Jun 20, 2030 |
| 2020 | Nov 7, 2031 |
| 2525 | Mar 26, 2033 |
| 3030 | Aug 13, 2034 |
| 3535 | Dec 31, 2035 |

### Exploration and Insights
- Dashboard with progress, phase context, streak data, and quick actions.
- Calendar with mood-colored cells and monthly summaries.
- Timeline with filters (all, highlights, tags) and incremental loading.
- Search across journal text, tags, gratitude, and memories with result snippets.
- Stats tabs for overview, mood trends/distribution, habits, tags, and milestone status.

### Personalization and Safety
- Light/dark theme toggle.
- Optional local 4-digit PIN lock (hashed with Web Crypto SHA-256).
- Full JSON export/import and full local reset.
- Error boundary fallback UI.

### PWA and Offline
- Install prompts for supported browsers plus iOS guidance.
- Service worker registration with update prompt.
- Works offline because app data is local and storage-backed.

## Tech Stack

### Application
- React 19
- TypeScript 5
- React Router 7
- Zustand 5

### Persistence and Data
- Dexie 4 (IndexedDB wrapper)
- date-fns 4

### UI and Content
- Tailwind CSS 3
- Custom CSS variables and theme tokens
- TipTap 3 (rich text)
- Recharts 3 (charts)
- Lucide React (icons)

### Tooling
- Vite 7
- ESLint 9 + typescript-eslint
- PostCSS + Autoprefixer
- vite-plugin-pwa (Workbox)

## Architecture

```text
10-years-journal/
├── public/
├── scripts/
│   └── generate-icons.mjs
├── src/
│   ├── components/        # Shared UI components and app safety wrappers
│   ├── db/                # Dexie schema and TypeScript domain types
│   ├── hooks/             # Reserved for reusable hooks
│   ├── pages/             # Route-level screens
│   ├── storage/           # StorageAdapter + local IndexedDB implementation
│   ├── store/             # Zustand stores by concern
│   ├── utils/             # Date and journey utility functions
│   ├── App.tsx            # Layout, nav, route wiring, lock screen
│   ├── index.css          # Global tokens, theme variables, utility styles
│   └── main.tsx           # App bootstrap with router + error boundary
├── netlify.toml
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

### Route Surface
- /
- /entry
- /entry/:dateId
- /calendar
- /timeline
- /stats
- /search
- /reflection
- /settings

### Data Tables (IndexedDB)
- entries
- habits (soft-archived via deletedAt; historical logs preserved)
- reflections
- streakFreezes

## Setup and Run

### Prerequisites
- Node.js (current LTS recommended; Vite 7 works best on modern Node versions)
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Optional: Regenerate PWA Icons

```bash
node scripts/generate-icons.mjs
```

## Deployment

The project is configured for static deployment.

- Netlify build command: npm run build
- Publish directory: dist
- SPA redirect fallback: configured in netlify.toml

For installable PWA behavior in production, deploy over HTTPS.

## Design Philosophy (Inferred)

- Local-first privacy: journaling data stays on device by default.
- Long-horizon discipline: fixed journey dates and freeze constraints enforce commitment.
- Reflection over friction: rich authoring, fast navigation, and low-latency local storage.
- Resilience: offline-first behavior, JSON backup/restore, and explicit error fallback UI.

## Current Constraints

- No backend or cloud sync.
- Single-device persistence unless data is manually exported/imported.
- Fixed journey timeline and rules are encoded in application logic.

## Future Improvement Ideas

- Optional encrypted backups or passphrase-protected exports.
- Optional cross-device sync mode (while keeping local-first default).
- Stronger import validation and migration diagnostics for old backups.
- Expanded analytics (habit-to-mood correlation, retention cohorts, custom ranges).
- Automated tests for stores, storage adapters, and core date/journey rules.
- Accessibility pass (keyboard shortcuts, focus states, high-contrast tweaks).

## License

This repository is public on GitHub, but no open-source license is currently declared.
Without an explicit license file, the default is "all rights reserved."
