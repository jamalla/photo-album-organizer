# Quickstart: Photo Album Organizer

## Overview

This application organizes local photos into top-level date-based albums, supports album reordering by drag-and-drop on the main page, and shows album photos in a tile preview view.

## Local Data Behavior

- Photos are read from a local folder path only; images are not uploaded anywhere.
- Metadata (albums, ordering, photo records) is stored in local SQLite at `backend/db/photo_albums.sqlite` by default.
- Date grouping uses `capturedAt` when available, otherwise falls back to file modification timestamp.
- Nested albums are disallowed by business rules and validation.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment file:

   ```bash
   copy .env.example .env
   ```

3. Place sample photos in a local folder (default: `./photos`).

## Run

1. Start backend API:

   ```bash
   npm run dev:backend
   ```

2. In a second terminal, start frontend:

   ```bash
   npm run dev:frontend
   ```

3. Open the Vite URL shown in terminal (typically `http://localhost:5173`).

## End-to-End Validation Scenarios

### Scenario 1: Date-based album generation

1. Ensure local photos exist in the configured folder.
2. Open app main page.
3. Verify albums appear grouped by date key (for example `2026-02`).
4. Verify albums remain top-level (no nested structures).

Expected: album cards display grouped titles and photo counts.

### Scenario 2: Reorder albums and persist

1. Drag an album card to a new position.
2. Refresh the page.
3. Verify album order is preserved.
4. Verify keyboard reorder buttons (`↑`/`↓`) also persist order.

Expected: reordered sequence is retained after reload.

### Scenario 3: Tile preview inside an album

1. Click `Open` on an album card.
2. Verify tile layout appears for photos.
3. Open an empty album and verify empty-state message.

Expected: populated albums show tiles; empty albums show explicit empty state.

## Performance Checks

### Check targets

- Album load endpoint (`GET /api/albums`) p95 < 200ms with local dev dataset.
- Reorder endpoint (`POST /api/albums/reorder`) p95 < 150ms.
- Album photos endpoint (`GET /api/photos/:albumKey`) p95 < 200ms.
- Frontend tile view render should complete without blocking interactions for expected album sizes.

### Verification commands

```bash
npm run check:tests
npm run check:build
```

### Recorded results (local run: 2026-02-21)

- Functional test suites: pass.
   - Frontend: 4 test files, 7 tests passing.
   - Backend: 5 test files, 9 tests passing.
- Frontend production build: pass (`vite build` completed in ~222ms).
- API route latency spot-check (20 iterations, synthetic local dataset of 200 photos):
   - `GET /api/albums`: avg 3.65ms, p95 4.10ms
   - `POST /api/albums/reorder`: avg 12.35ms, p95 13.44ms
   - `GET /api/photos/:albumKey`: avg 3.57ms, p95 5.41ms
- Tile preview render spot-check (500 photos, component render function):
   - `renderAlbumDetailView`: ~1ms in local run
- Tile preview rendering and empty-state behavior: pass in integration tests.

## Quality Gates

- Run full quality checks:

  ```bash
  npm run check:quality
  ```

- Optional security audit:

  ```bash
  npm run check:security
  ```

## Notes

- `npm audit` may report third-party vulnerabilities from transitive dependencies; address according to project policy and risk tolerance.
- For reproducible results, keep test data folder local and avoid symlinks in source photo paths.
- `photoScanner` hardening now enforces: existing-directory input, null-byte rejection, symlink skip, max-file-size cap (25MB), max scan count (10,000), and path containment checks.
