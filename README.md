# Photo Album Organizer

A monorepo app for organizing photo albums with a Vite frontend and an Express + SQLite backend.

## Project Structure

- `frontend/` — UI built with Vite
- `backend/` — API server built with Express and SQLite (`better-sqlite3`)

## Prerequisites

- Node.js 18+
- npm 9+

## Install

From the repository root:

```bash
npm install
```

## Run

### Frontend only

```bash
npm run dev
# or
npm run dev:frontend
```

### Backend only

```bash
npm run dev:backend
```

## Build Frontend

```bash
npm run build
```

## Test

Run all tests:

```bash
npm test
```

Run by workspace:

```bash
npm run test:frontend
npm run test:backend
```

## Quality Checks

```bash
npm run check:quality
npm run check:all
```

## Notes

- Backend entrypoint: `backend/src/server.js`
- Frontend entrypoint: `frontend/src/main.js`
