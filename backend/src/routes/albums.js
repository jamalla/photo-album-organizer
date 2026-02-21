import { Router } from 'express';
import { albumExists, listAlbums, upsertAlbum } from '../repositories/albumRepository.js';
import { replaceAlbumOrder } from '../repositories/albumOrderRepository.js';
import { upsertPhoto } from '../repositories/photoRepository.js';
import { scanPhotos } from '../services/photoScanner.js';
import { assertTopLevelAlbumKey, assertValidAlbumReorderKeys } from '../services/albumRules.js';
import { toAlbumTitle, toDateGroupKey } from '../services/dateGrouping.js';

const router = Router();

function validationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

router.get('/', (_req, res) => {
  const albums = listAlbums();
  res.json({ albums });
});

router.post('/generate', (req, res, next) => {
  try {
    const libraryPath = req.body?.libraryPath || process.env.PHOTO_LIBRARY_PATH || 'photos';
    const photos = scanPhotos(libraryPath);

    for (const photo of photos) {
      const albumKey = toDateGroupKey(photo.capturedAt, photo.fallbackAt);
      assertTopLevelAlbumKey(albumKey);
      upsertAlbum({ albumKey, title: toAlbumTitle(albumKey) });

      upsertPhoto({
        filePath: photo.filePath,
        fileName: photo.fileName,
        capturedAt: photo.capturedAt,
        fallbackAt: photo.fallbackAt,
        albumKey
      });
    }

    const albums = listAlbums();
    res.json({ imported: photos.length, albums });
  } catch (error) {
    next(error);
  }
});

router.post('/reorder', (req, res, next) => {
  try {
    const albumKeys = req.body?.albumKeys;
    assertValidAlbumReorderKeys(albumKeys);

    for (const albumKey of albumKeys) {
      if (!albumExists(albumKey)) {
        throw validationError(`Unknown album key: ${albumKey}`);
      }
    }

    replaceAlbumOrder(albumKeys);
    res.json({ albums: listAlbums() });
  } catch (error) {
    if (!error.status && error.message?.includes('albumKeys')) {
      error.status = 400;
    }
    next(error);
  }
});

export default router;
