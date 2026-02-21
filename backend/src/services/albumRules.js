export function assertTopLevelAlbumKey(albumKey) {
  if (typeof albumKey !== 'string' || albumKey.length === 0) {
    throw new Error('Album key is required');
  }

  if (albumKey.includes('/')) {
    throw new Error('Nested album keys are not allowed');
  }
}

export function assertValidAlbumReorderKeys(albumKeys) {
  if (!Array.isArray(albumKeys) || albumKeys.length === 0) {
    throw new Error('albumKeys must be a non-empty array');
  }

  const uniqueKeys = new Set();

  for (const albumKey of albumKeys) {
    assertTopLevelAlbumKey(albumKey);
    if (uniqueKeys.has(albumKey)) {
      throw new Error('albumKeys must not contain duplicates');
    }
    uniqueKeys.add(albumKey);
  }
}
