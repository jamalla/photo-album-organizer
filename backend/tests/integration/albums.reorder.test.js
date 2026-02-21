import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resetDb } from '../../src/db/init.js';
import { upsertAlbum } from '../../src/repositories/albumRepository.js';
import { createApp } from '../../src/server.js';

describe('albums reorder endpoint', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'photo-album-reorder-test-'));
    const dbPath = path.join(tempDir, 'test.sqlite');
    process.env.DATABASE_PATH = dbPath;
  });

  afterEach(() => {
    resetDb();
    delete process.env.DATABASE_PATH;
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('persists album order updates', async () => {
    const app = createApp();
    upsertAlbum({ albumKey: '2026-01', title: '2026-01' });
    upsertAlbum({ albumKey: '2026-02', title: '2026-02' });

    const reorderResponse = await request(app)
      .post('/api/albums/reorder')
      .send({ albumKeys: ['2026-02', '2026-01'] })
      .expect(200);

    expect(reorderResponse.body.albums[0].albumKey).toBe('2026-02');

    const listResponse = await request(app).get('/api/albums').expect(200);
    expect(listResponse.body.albums.map((album) => album.albumKey)).toEqual(['2026-02', '2026-01']);
  });
});
