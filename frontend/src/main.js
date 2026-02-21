import './styles/base.css';
import './styles/albums.css';
import './styles/tiles.css';
import { fetchAlbumPhotos, fetchAlbums, generateAlbums, reorderAlbums } from './api/albums.js';
import { renderAlbumListView } from './components/albumListView.js';
import { renderAlbumDetailView } from './components/albumDetailView.js';
import { createDragDropController } from './lib/dragDrop.js';

const app = document.querySelector('#app');
let currentAlbums = [];
let infoMessage = '';

function renderHeader() {
  const info = infoMessage ? `<p class="album-state">${infoMessage}</p>` : '';
  return `<h1>Photo Album Organizer</h1>${info}`;
}

function applyOrderedAlbumKeys(albumKeys) {
  const indexMap = new Map(albumKeys.map((key, index) => [key, index]));
  currentAlbums = [...currentAlbums].sort((left, right) => {
    return (indexMap.get(left.albumKey) ?? Number.MAX_SAFE_INTEGER) -
      (indexMap.get(right.albumKey) ?? Number.MAX_SAFE_INTEGER);
  });
}

async function persistReorder(albumKeys) {
  const previousAlbums = [...currentAlbums];
  applyOrderedAlbumKeys(albumKeys);
  renderReady();

  try {
    const response = await reorderAlbums(albumKeys);
    currentAlbums = response.albums;
    infoMessage = 'Album order updated.';
  } catch (error) {
    currentAlbums = previousAlbums;
    infoMessage = `Reorder failed: ${error.message}`;
  }

  renderReady();
}

function attachKeyboardReorder() {
  const buttons = app?.querySelectorAll('[data-action][data-album-key]') || [];
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const albumKey = button.dataset.albumKey;
      const action = button.dataset.action;
      const currentIndex = currentAlbums.findIndex((album) => album.albumKey === albumKey);

      if (currentIndex === -1) {
        return;
      }

      const targetIndex = action === 'move-up' ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= currentAlbums.length) {
        return;
      }

      const ordered = [...currentAlbums];
      const [moved] = ordered.splice(currentIndex, 1);
      ordered.splice(targetIndex, 0, moved);
      await persistReorder(ordered.map((album) => album.albumKey));
    });
  });
}

function attachDragDropReorder() {
  const list = app?.querySelector('.album-list');
  if (!list) {
    return;
  }

  createDragDropController({
    container: list,
    draggableSelector: '.album-card',
    onReorder: persistReorder
  });
}

function renderReady() {
  if (!app) {
    return;
  }

  app.innerHTML = renderHeader() + renderAlbumListView({
    status: 'ready',
    albums: currentAlbums
  });

  attachDragDropReorder();
  attachKeyboardReorder();
  attachAlbumOpenHandlers();
}

function findAlbumTitle(albumKey) {
  return currentAlbums.find((album) => album.albumKey === albumKey)?.title || albumKey;
}

function attachBackHandler() {
  const button = app?.querySelector('[data-back-to-albums]');
  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    infoMessage = '';
    renderReady();
  });
}

async function renderAlbumDetail(albumKey) {
  if (!app) {
    return;
  }

  const albumTitle = findAlbumTitle(albumKey);
  app.innerHTML = renderHeader() + renderAlbumDetailView({
    status: 'loading',
    albumTitle
  });
  attachBackHandler();

  try {
    const response = await fetchAlbumPhotos(albumKey);
    app.innerHTML = renderHeader() + renderAlbumDetailView({
      status: 'ready',
      albumTitle,
      photos: response.photos
    });
    attachBackHandler();
  } catch (error) {
    app.innerHTML = renderHeader() + renderAlbumDetailView({
      status: 'error',
      albumTitle,
      errorMessage: error.message
    });
    attachBackHandler();
  }
}

function attachAlbumOpenHandlers() {
  const buttons = app?.querySelectorAll('[data-open-album]') || [];
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const albumKey = button.dataset.openAlbum;
      if (albumKey) {
        renderAlbumDetail(albumKey);
      }
    });
  });
}

async function renderAlbums() {
  if (!app) {
    return;
  }

  app.innerHTML = renderHeader() + renderAlbumListView({ status: 'loading' });

  try {
    let response = await fetchAlbums();

    if (!response.albums.length) {
      await generateAlbums();
      response = await fetchAlbums();
    }

    currentAlbums = response.albums;
    infoMessage = '';
    renderReady();
  } catch (error) {
    app.innerHTML = renderHeader() + renderAlbumListView({
      status: 'error',
      errorMessage: error.message
    });
  }
}

renderAlbums();
