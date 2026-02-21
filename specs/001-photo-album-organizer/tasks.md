# Tasks: Photo Album Organizer

**Input**: Design documents from `/specs/001-photo-album-organizer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Automated tests are required by specification and constitution, so test tasks are included for each story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize a minimal Vite + vanilla frontend and lightweight Node API backend with SQLite metadata storage.

- [x] T001 Create monorepo app folders and root scripts in package.json
- [x] T002 Initialize Vite vanilla app shell in frontend/package.json
- [x] T003 [P] Add base HTML entry and app mount in frontend/index.html
- [x] T004 [P] Add baseline styles and tokens in frontend/src/styles/base.css
- [x] T005 Initialize backend runtime dependencies (express, better-sqlite3) in backend/package.json
- [x] T006 [P] Configure frontend and backend test runners in frontend/vitest.config.js
- [x] T007 [P] Configure backend test runner and integration harness in backend/vitest.config.js
- [x] T008 [P] Add local environment defaults in .env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build core data, API, and shared utilities required before user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create SQLite schema for photos, albums, and album_order in backend/db/schema.sql
- [x] T010 Implement DB initialization and migration runner in backend/src/db/init.js
- [x] T011 [P] Implement photo metadata repository in backend/src/repositories/photoRepository.js
- [x] T012 [P] Implement album repository in backend/src/repositories/albumRepository.js
- [x] T013 [P] Implement album order repository in backend/src/repositories/albumOrderRepository.js
- [x] T014 Implement API server bootstrap and middleware in backend/src/server.js
- [x] T015 [P] Implement photo metadata scanner (local files only, no upload) in backend/src/services/photoScanner.js
- [x] T016 [P] Implement date-grouping and fallback-date utility in backend/src/services/dateGrouping.js
- [x] T017 Implement API router wiring and global error handler in backend/src/routes/index.js
- [x] T018 Add frontend API client and request helpers in frontend/src/api/client.js
- [x] T019 Add reusable drag-drop utility scaffold in frontend/src/lib/dragDrop.js
- [x] T020 Add baseline constitution quality checks in .github/workflows/ci.yml

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Date-Based Album Organization (Priority: P1) 🎯 MVP

**Goal**: Organize photos into top-level albums grouped by date (with fallback rules) and show them on the main page.

**Independent Test**: Import mixed-date photos and verify top-level date albums are created correctly without nesting.

### Tests for User Story 1

- [x] T021 [P] [US1] Add unit tests for date grouping and fallback rules in backend/tests/unit/dateGrouping.test.js
- [x] T022 [P] [US1] Add integration test for album generation from metadata in backend/tests/integration/albums.generate.test.js
- [x] T023 [P] [US1] Add frontend integration test for album list rendering states in frontend/tests/integration/albumList.test.js

### Implementation for User Story 1

- [x] T024 [US1] Implement album generation endpoint in backend/src/routes/albums.js
- [x] T025 [US1] Implement album listing endpoint with date groups in backend/src/routes/albums.js
- [x] T026 [US1] Enforce top-level-only album rule in backend/src/services/albumRules.js
- [x] T027 [US1] Implement album list view bootstrap in frontend/src/main.js
- [x] T028 [US1] Implement album list component with loading/empty/error states in frontend/src/components/albumListView.js
- [x] T029 [US1] Add album-card styling for date groups in frontend/src/styles/albums.css
- [x] T030 [US1] Wire album API integration into UI state flow in frontend/src/api/albums.js

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Reorder Albums on Main Page (Priority: P2)

**Goal**: Let users reorder top-level albums by drag-and-drop and persist order.

**Independent Test**: Reorder albums via drag-and-drop and verify persisted order after refresh.

### Tests for User Story 2

- [x] T031 [P] [US2] Add integration test for reorder persistence API in backend/tests/integration/albums.reorder.test.js
- [x] T032 [P] [US2] Add frontend integration test for drag-drop reorder behavior in frontend/tests/integration/reorderAlbums.test.js
- [x] T033 [P] [US2] Add unit tests for reorder validation and non-nesting guard in backend/tests/unit/albumRules.test.js

### Implementation for User Story 2

- [x] T034 [US2] Implement album reorder endpoint in backend/src/routes/albums.js
- [x] T035 [US2] Persist and fetch album order positions in backend/src/repositories/albumOrderRepository.js
- [x] T036 [US2] Implement drag-and-drop reorder interaction in frontend/src/lib/dragDrop.js
- [x] T037 [US2] Wire reorder API + optimistic update flow in frontend/src/api/albums.js
- [x] T038 [US2] Apply persisted order restoration at app load in frontend/src/main.js
- [x] T039 [US2] Add accessible keyboard reorder controls in frontend/src/components/albumListView.js

**Checkpoint**: User Stories 1 and 2 are independently functional

---

## Phase 5: User Story 3 - Browse Photos in Tile Preview (Priority: P3)

**Goal**: Open albums and browse photos in a tile-like preview interface.

**Independent Test**: Open albums with/without photos and verify tile rendering and empty state behavior.

### Tests for User Story 3

- [x] T040 [P] [US3] Add integration test for album photo listing endpoint in backend/tests/integration/albums.photos.test.js
- [x] T041 [P] [US3] Add frontend integration test for tile rendering and empty state in frontend/tests/integration/albumTiles.test.js
- [x] T042 [P] [US3] Add unit test for thumbnail fallback behavior in frontend/tests/unit/photoTile.test.js

### Implementation for User Story 3

- [x] T043 [US3] Implement album photos endpoint in backend/src/routes/photos.js
- [x] T044 [US3] Implement album detail route/view wiring in frontend/src/main.js
- [x] T045 [US3] Implement tile-grid album detail component in frontend/src/components/albumDetailView.js
- [x] T046 [US3] Implement photo tile component with load/error states in frontend/src/components/photoTile.js
- [x] T047 [US3] Add tile layout and responsive sizing styles in frontend/src/styles/tiles.css
- [x] T048 [US3] Add empty-album state messaging in frontend/src/components/albumDetailView.js

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, performance, and documentation updates across stories.

- [x] T049 [P] Document local-only image handling and SQLite metadata behavior in specs/001-photo-album-organizer/quickstart.md
- [x] T050 Run performance checks for album load/reorder/tile render and record results in specs/001-photo-album-organizer/quickstart.md
- [x] T051 [P] Add final lint/test/static-check commands and thresholds in package.json
- [x] T052 Harden file path validation and metadata parsing safety in backend/src/services/photoScanner.js
- [x] T053 Validate end-to-end quickstart scenarios and update verification notes in specs/001-photo-album-organizer/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (Foundational)**: Depends on Setup completion and blocks all stories
- **Phase 3 (US1)**: Depends on Foundational completion
- **Phase 4 (US2)**: Depends on Foundational completion and uses US1 album list UI/API
- **Phase 5 (US3)**: Depends on Foundational completion and uses US1 album model/API
- **Phase 6 (Polish)**: Depends on completion of all targeted stories

### User Story Dependencies

- **US1 (P1)**: No story dependencies after foundational work
- **US2 (P2)**: Depends on US1 album listing and identifiers
- **US3 (P3)**: Depends on US1 album creation/list retrieval

### Within Each User Story

- Tests written first and initially failing
- Backend behavior before frontend wiring
- State handling (loading/success/empty/error) completed before checkpoint
- Story accepted independently before moving forward

---

## Parallel Execution Examples

### User Story 1

- Run T021, T022, and T023 together (different files in unit/integration/frontend test folders)
- Run T028 and T029 together after T027 (component and stylesheet files)

### User Story 2

- Run T031, T032, and T033 together (separate backend/frontend test files)
- Run T036 and T035 together after T034 (frontend drag logic and backend persistence)

### User Story 3

- Run T040, T041, and T042 together (separate test files)
- Run T045 and T047 together after T044 (component + styling in separate files)

---

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Setup and Foundational phases
2. Deliver Phase 3 (US1)
3. Validate independent test criteria for US1
4. Demo MVP date-grouped top-level albums

### Incremental Delivery

1. Add US1 for core organization value
2. Add US2 for personalized ordering
3. Add US3 for tile-based browsing
4. Finish polish and performance validation

### Team Parallel Strategy

1. One developer finalizes backend API/data tasks while another builds frontend views
2. Parallelize test writing inside each story before implementation starts
3. Integrate at story checkpoints to keep each story independently shippable
