import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(moduleDir, '..', '..');
const defaultDbPath = path.resolve(backendRoot, 'db', 'photo_albums.sqlite');
const schemaPath = path.resolve(backendRoot, 'db', 'schema.sql');

let db;
let activeDbPath;

function resolveDbPath() {
  return process.env.DATABASE_PATH
    ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
    : defaultDbPath;
}

export function initDb() {
  const dbPath = resolveDbPath();

  if (db && activeDbPath === dbPath) {
    return db;
  }

  if (db && activeDbPath !== dbPath) {
    db.close();
    db = null;
  }

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  activeDbPath = dbPath;

  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  return db;
}

export function getDb() {
  if (!db) {
    return initDb();
  }
  return db;
}

export function resetDb() {
  if (db) {
    db.close();
  }
  db = null;
  activeDbPath = null;
}
