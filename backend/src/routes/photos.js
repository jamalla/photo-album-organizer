import { Router } from 'express';
import { albumExists } from '../repositories/albumRepository.js';
import { listPhotosByAlbum } from '../repositories/photoRepository.js';
import { assertTopLevelAlbumKey } from '../services/albumRules.js';

const router = Router();

router.get('/:albumKey', (req, res, next) => {
  try {
    const { albumKey } = req.params;
    assertTopLevelAlbumKey(albumKey);

    if (!albumExists(albumKey)) {
      const error = new Error('Album not found');
      error.status = 404;
      throw error;
    }

    const photos = listPhotosByAlbum(albumKey).map((photo) => ({
      ...photo,
      thumbnailUrl: null
    }));

    res.json({ albumKey, photos });
  } catch (error) {
    if (!error.status && error.message?.includes('Nested album keys')) {
      error.status = 400;
    }
    next(error);
  }
});

export default router;
