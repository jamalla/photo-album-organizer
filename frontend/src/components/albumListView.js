function renderEmpty() {
  return '<p class="album-state">No albums yet. Generate albums to get started.</p>';
}

function renderLoading() {
  return '<p class="album-state">Loading albums...</p>';
}

function renderError(message) {
  return `<p class="album-state album-state--error">${message}</p>`;
}

function renderAlbumCards(albums) {
  const cards = albums
    .map(
      (album, index) => `
      <li class="album-card" data-album-key="${album.albumKey}" draggable="true">
        <h2 class="album-card__title">${album.title}</h2>
        <p class="album-card__meta">${album.photoCount} photos</p>
        <button
          type="button"
          class="album-card__open"
          data-open-album="${album.albumKey}"
          aria-label="Open album ${album.title}"
        >Open</button>
        <div class="album-card__actions">
          <button
            type="button"
            class="album-card__move"
            data-action="move-up"
            data-album-key="${album.albumKey}"
            aria-label="Move ${album.title} up"
            ${index === 0 ? 'disabled' : ''}
          >↑</button>
          <button
            type="button"
            class="album-card__move"
            data-action="move-down"
            data-album-key="${album.albumKey}"
            aria-label="Move ${album.title} down"
            ${index === albums.length - 1 ? 'disabled' : ''}
          >↓</button>
        </div>
      </li>
    `
    )
    .join('');

  return `<ul class="album-list">${cards}</ul>`;
}

export function renderAlbumListView({ status, albums = [], errorMessage = '' }) {
  if (status === 'loading') {
    return renderLoading();
  }
  if (status === 'error') {
    return renderError(errorMessage || 'Unable to load albums.');
  }
  if (!albums.length) {
    return renderEmpty();
  }
  return renderAlbumCards(albums);
}
