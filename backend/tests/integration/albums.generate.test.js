import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resetDb } from '../../src/db/init.js';
import { createApp } from '../../src/server.js';

describe('albums generation endpoint', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'photo-album-test-'));
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

  it('generates date albums from local photo files', async () => {
    const photosDir = path.join(tempDir, 'photos');
    fs.mkdirSync(photosDir, { recursive: true });
    fs.writeFileSync(path.join(photosDir, 'a.jpg'), 'x');
    fs.writeFileSync(path.join(photosDir, 'b.png'), 'y');

    const app = createApp();
    const generateResponse = await request(app)
      .post('/api/albums/generate')
      .send({ libraryPath: photosDir })
      .expect(200);

    expect(generateResponse.body.imported).toBe(2);
    expect(generateResponse.body.albums.length).toBeGreaterThan(0);

    const listResponse = await request(app).get('/api/albums').expect(200);
    expect(Array.isArray(listResponse.body.albums)).toBe(true);
    expect(listResponse.body.albums[0]).toHaveProperty('albumKey');
  });
});
