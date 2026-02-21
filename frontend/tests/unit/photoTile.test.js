import { describe, expect, it } from 'vitest';
import { renderPhotoTile } from '../../src/components/photoTile.js';

describe('photo tile fallback', () => {
  it('renders fallback preview when thumbnail URL is missing', () => {
    const html = renderPhotoTile({ id: 1, fileName: 'mountain.jpg', thumbnailUrl: null });
    expect(html).toContain('photo-tile__fallback');
    expect(html).toContain('mountain.jpg');
  });
});
