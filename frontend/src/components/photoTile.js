export function renderPhotoTile(photo) {
  if (photo.thumbnailUrl) {
    return `
      <article class="photo-tile" data-photo-id="${photo.id}">
        <img class="photo-tile__image" src="${photo.thumbnailUrl}" alt="${photo.fileName}" loading="lazy" />
        <p class="photo-tile__caption">${photo.fileName}</p>
      </article>
    `;
  }

  return `
    <article class="photo-tile" data-photo-id="${photo.id}">
      <div class="photo-tile__fallback" role="img" aria-label="Preview unavailable for ${photo.fileName}">
        ${photo.fileName.slice(0, 1).toUpperCase()}
      </div>
      <p class="photo-tile__caption">${photo.fileName}</p>
    </article>
  `;
}
