import { describe, expect, it } from 'vitest';
import { renderAlbumListView } from '../../src/components/albumListView.js';

describe('album list view', () => {
  it('renders loading state', () => {
    const html = renderAlbumListView({ status: 'loading' });
    expect(html).toContain('Loading albums');
  });

  it('renders empty state', () => {
    const html = renderAlbumListView({ status: 'ready', albums: [] });
    expect(html).toContain('No albums yet');
  });

  it('renders album cards', () => {
    const html = renderAlbumListView({
      status: 'ready',
      albums: [{ albumKey: '2026-02', title: '2026-02', photoCount: 4 }]
    });
    expect(html).toContain('album-card');
    expect(html).toContain('2026-02');
    expect(html).toContain('4 photos');
  });
});
