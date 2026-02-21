import express from 'express';
import { fileURLToPath } from 'node:url';
import { initDb } from './db/init.js';
import routes from './routes/index.js';

export function createApp() {
  initDb();

  const app = express();
  app.use(express.json());
  app.use('/api', routes);

  app.use((error, _req, res, _next) => {
    process.stderr.write(`${error.stack || error.message}\n`);
    const status = error.status || 500;
    const message = status >= 500 ? 'Internal server error' : error.message;
    res.status(status).json({ error: message });
  });

  return app;
}

const currentModulePath = fileURLToPath(import.meta.url);

if (process.argv[1] === currentModulePath) {
  const app = createApp();
  const port = process.env.API_PORT || 3001;

  app.listen(port, () => {
    process.stdout.write(`API listening on port ${port}\n`);
  });
}
