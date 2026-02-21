import { Router } from 'express';
import albumsRouter from './albums.js';
import photosRouter from './photos.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/albums', albumsRouter);
router.use('/photos', photosRouter);

export default router;
