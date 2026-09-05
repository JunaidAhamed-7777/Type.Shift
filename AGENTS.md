# AGENTS.md — Type.Shift (Typing Speed Test)

## Commands
| Action | Command |
|--------|---------|
| Dev server | `npm start` |
| Production build | `npm run build` |
| Tests (watch) | `npm test` |
| Eject CRA | `npm run eject` |

## Architecture
- **Framework**: Create React App (react-scripts 5.0.1), React 19
- **Structure**: Single-page app in `src/App.js` (all components + logic), entry at `src/index.js`
- **Styling**: Plain CSS in `src/App.css`
- **Analytics**: `@vercel/analytics` (auto-enabled in production)
- **Deploy**: Vercel (auto-deploy from main branch)

## Key Conventions
- **DO NOT REMOVE COMMENTS** inside code — they are intentionally retained (per README)
- Paragraph data lives in `PARAGRAPHS` object in `App.js` (easy/medium/hard/code difficulties)
- Matrix rain effect on result screen (credited to javascriptacademy-stash/digital-rain)
- Tab key = restart shortcut
- No backend, no database, no auth (planned for future)

## Testing
- Uses `@testing-library/react` + Jest (via react-scripts)
- Run single test: `npm test -- --testNamePattern="<name>"`
- No separate test files; tests would go alongside components if added

## Gotchas
- `react-scripts` is deprecated but functional; no migration to Vite/Next yet
- Environment variables: `.env` and `.env.local` present (check before adding secrets)
- Public assets in `public/assets/` are book cover images referenced by paragraph data
- Code paragraphs have no images (intentional per comment in source)