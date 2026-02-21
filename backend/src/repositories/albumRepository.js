import { getDb } from '../db/init.js';

export function upsertAlbum({ albumKey, title }) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO albums (album_key, title)
    VALUES (?, ?)
    ON CONFLICT(album_key) DO UPDATE SET
      title = excluded.title,
      updated_at = CURRENT_TIMESTAMP
  `);
  return stmt.run(albumKey, title);
}

export function listAlbums() {
  const db = getDb();
  return db
    .prepare(
      `SELECT a.id, a.album_key AS albumKey, a.title,
              COALESCE(o.position, a.position) AS position,
              COUNT(p.id) AS photoCount
       FROM albums a
       LEFT JOIN album_order o ON o.album_key = a.album_key
       LEFT JOIN photos p ON p.album_key = a.album_key
       GROUP BY a.id, a.album_key, a.title, o.position, a.position
       ORDER BY position ASC, a.album_key ASC`
    )
    .all();
}

export function albumExists(albumKey) {
  const db = getDb();
  const row = db.prepare('SELECT 1 AS ok FROM albums WHERE album_key = ? LIMIT 1').get(albumKey);
  return Boolean(row);
}
