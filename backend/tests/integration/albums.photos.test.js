import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resetDb } from '../../src/db/init.js';
import { upsertAlbum } from '../../src/repositories/albumRepository.js';
import { upsertPhoto } from '../../src/repositories/photoRepository.js';
import { createApp } from '../../src/server.js';

describe('album photos endpoint', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'photo-album-photos-test-'));
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

  it('returns album photos for existing album', async () => {
    const app = createApp();
    upsertAlbum({ albumKey: '2026-02', title: '2026-02' });
    upsertPhoto({
      filePath: '/tmp/a.jpg',
      fileName: 'a.jpg',
      capturedAt: '2026-02-01T00:00:00.000Z',
      fallbackAt: '2026-02-01T00:00:00.000Z',
      albumKey: '2026-02'
    });

    const response = await request(app).get('/api/photos/2026-02').expect(200);
    expect(response.body.albumKey).toBe('2026-02');
    expect(response.body.photos.length).toBe(1);
    expect(response.body.photos[0].fileName).toBe('a.jpg');
  });
});
