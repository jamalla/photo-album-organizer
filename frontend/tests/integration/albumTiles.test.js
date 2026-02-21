import { describe, expect, it } from 'vitest';
import { renderAlbumDetailView } from '../../src/components/albumDetailView.js';

describe('album detail tile view', () => {
  it('renders tile layout when photos exist', () => {
    const html = renderAlbumDetailView({
      status: 'ready',
      albumTitle: '2026-02',
      photos: [
        { id: 1, fileName: 'a.jpg', thumbnailUrl: null },
        { id: 2, fileName: 'b.jpg', thumbnailUrl: null }
      ]
    });

    expect(html).toContain('tile-grid');
    expect(html).toContain('a.jpg');
    expect(html).toContain('b.jpg');
  });

  it('renders explicit empty state when no photos exist', () => {
    const html = renderAlbumDetailView({ status: 'ready', albumTitle: '2026-02', photos: [] });
    expect(html).toContain('No photos in 2026-02 yet');
  });
});
