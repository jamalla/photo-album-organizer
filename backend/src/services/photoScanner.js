import fs from 'node:fs';
import path from 'node:path';

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const MAX_FILES = 10000;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

function isSubPath(parentPath, childPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function collectFiles(folderPath, files = []) {
  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return files;
  }

  for (const entry of fs.readdirSync(folderPath, { withFileTypes: true })) {
    if (files.length >= MAX_FILES) {
      break;
    }

    const fullPath = path.join(folderPath, entry.name);

    if (entry.isSymbolicLink()) {
      continue;
    }

    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

export function scanPhotos(basePath) {
  if (typeof basePath !== 'string' || !basePath.trim()) {
    throw new Error('libraryPath must be a non-empty string');
  }

  if (basePath.includes('\u0000')) {
    throw new Error('libraryPath contains invalid null byte');
  }

  const absoluteBasePath = path.resolve(process.cwd(), basePath);
  const realBasePath = fs.realpathSync.native(absoluteBasePath);

  if (!fs.existsSync(realBasePath) || !fs.statSync(realBasePath).isDirectory()) {
    throw new Error('libraryPath must resolve to an existing directory');
  }

  const files = collectFiles(absoluteBasePath);

  const photos = [];

  for (const filePath of files) {
    let realFilePath;
    try {
      realFilePath = fs.realpathSync.native(filePath);
    } catch {
      continue;
    }

    if (!isSubPath(realBasePath, realFilePath)) {
      continue;
    }

    let stats;
    try {
      stats = fs.statSync(realFilePath);
    } catch {
      continue;
    }

    if (!stats.isFile() || stats.size > MAX_FILE_BYTES) {
      continue;
    }

    photos.push({
      filePath: realFilePath,
      fileName: path.basename(realFilePath),
      capturedAt: null,
      fallbackAt: stats.mtime.toISOString()
    });
  }

  return photos;
}
