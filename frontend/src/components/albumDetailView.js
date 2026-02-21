import { renderPhotoTile } from './photoTile.js';

function renderLoading() {
  return '<p class="album-state">Loading album photos...</p>';
}

function renderError(message) {
  return `<p class="album-state album-state--error">${message}</p>`;
}

function renderEmpty(albumTitle) {
  return `<p class="album-state">No photos in ${albumTitle} yet.</p>`;
}

function renderTiles(photos) {
  return `<section class="tile-grid">${photos.map((photo) => renderPhotoTile(photo)).join('')}</section>`;
}

export function renderAlbumDetailView({ status, albumTitle, photos = [], errorMessage = '' }) {
  const heading = `
    <div class="album-detail__header">
      <button type="button" class="album-detail__back" data-back-to-albums>Back</button>
      <h2 class="album-detail__title">${albumTitle}</h2>
    </div>
  `;

  if (status === 'loading') {
    return heading + renderLoading();
  }
  if (status === 'error') {
    return heading + renderError(errorMessage || 'Unable to load album photos.');
  }
  if (!photos.length) {
    return heading + renderEmpty(albumTitle);
  }
  return heading + renderTiles(photos);
}
