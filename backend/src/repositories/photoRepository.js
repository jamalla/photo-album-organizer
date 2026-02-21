import { getDb } from '../db/init.js';

export function upsertPhoto(photo) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO photos (file_path, file_name, captured_at, fallback_at, album_key)
    VALUES (@filePath, @fileName, @capturedAt, @fallbackAt, @albumKey)
    ON CONFLICT(file_path) DO UPDATE SET
      file_name = excluded.file_name,
      captured_at = excluded.captured_at,
      fallback_at = excluded.fallback_at,
      album_key = excluded.album_key,
      updated_at = CURRENT_TIMESTAMP
  `);
  return stmt.run(photo);
}

export function listPhotosByAlbum(albumKey) {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, file_path AS filePath, file_name AS fileName, captured_at AS capturedAt, fallback_at AS fallbackAt
       FROM photos WHERE album_key = ? ORDER BY captured_at DESC, fallback_at DESC, id DESC`
    )
    .all(albumKey);
}

export function listAllPhotos() {
  const db = getDb();
  return db
    .prepare(
      `SELECT id, file_path AS filePath, file_name AS fileName, captured_at AS capturedAt, fallback_at AS fallbackAt, album_key AS albumKey
       FROM photos ORDER BY id DESC`
    )
    .all();
}
