import { getDb } from '../db/init.js';

export function replaceAlbumOrder(albumKeys) {
  const db = getDb();
  const transaction = db.transaction((keys) => {
    db.prepare('DELETE FROM album_order').run();
    const insert = db.prepare('INSERT INTO album_order (album_key, position) VALUES (?, ?)');
    keys.forEach((albumKey, index) => {
      insert.run(albumKey, index);
    });
  });

  transaction(albumKeys);
}

export function listAlbumOrder() {
  const db = getDb();
  return db
    .prepare('SELECT album_key AS albumKey, position FROM album_order ORDER BY position ASC')
    .all();
}
