import { apiRequest } from './client.js';

export async function fetchAlbums() {
  return apiRequest('/api/albums');
}

export async function generateAlbums(libraryPath) {
  return apiRequest('/api/albums/generate', {
    method: 'POST',
    body: JSON.stringify({ libraryPath })
  });
}

export async function reorderAlbums(albumKeys) {
  return apiRequest('/api/albums/reorder', {
    method: 'POST',
    body: JSON.stringify({ albumKeys })
  });
}

export async function fetchAlbumPhotos(albumKey) {
  return apiRequest(`/api/photos/${encodeURIComponent(albumKey)}`);
}
