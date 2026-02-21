export function toDateGroupKey(capturedAt, fallbackAt) {
  const sourceDate = capturedAt || fallbackAt;
  const date = new Date(sourceDate);

  if (Number.isNaN(date.getTime())) {
    return 'unknown-date';
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function toAlbumTitle(groupKey) {
  if (groupKey === 'unknown-date') {
    return 'Unknown Date';
  }
  return groupKey;
}
