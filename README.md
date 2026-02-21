# Photo Album Organizer

A monorepo app for organizing photo albums with a Vite frontend and an Express + SQLite backend.

## Built With Help From

This project was built with help from **spcify** and **GitHub Copilot**.

## Build Journey (What We Did)

1. Defined the project scope and delivery plan with the `specs/` workflow.
2. Implemented a monorepo structure with separate `frontend` (Vite) and `backend` (Express + SQLite) workspaces.
3. Built backend APIs for album generation, listing photos, and album reordering.
4. Built frontend views for album listing, album details, photo tiles, and drag-and-drop ordering.
5. Added unit and integration tests for both frontend and backend workflows.
6. Added CI support (`.github/workflows/ci.yml`) and project-level quality scripts.
7. Initialized Git tracking, pushed the project to GitHub, and updated branch naming to `main`.
8. Prepared deployment guidance for hosting backend on Render and frontend on a static host.

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
