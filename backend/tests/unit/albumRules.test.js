import { describe, expect, it } from 'vitest';
import { assertValidAlbumReorderKeys } from '../../src/services/albumRules.js';

describe('album reorder rules', () => {
  it('accepts valid top-level album key arrays', () => {
    expect(() => assertValidAlbumReorderKeys(['2026-01', '2026-02'])).not.toThrow();
  });

  it('rejects nested album keys', () => {
    expect(() => assertValidAlbumReorderKeys(['2026-01/child'])).toThrow('Nested album keys are not allowed');
  });

  it('rejects duplicate keys', () => {
    expect(() => assertValidAlbumReorderKeys(['2026-01', '2026-01'])).toThrow('albumKeys must not contain duplicates');
  });
});
