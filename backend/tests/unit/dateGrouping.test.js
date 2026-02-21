import { describe, expect, it } from 'vitest';
import { toDateGroupKey } from '../../src/services/dateGrouping.js';

describe('date grouping', () => {
  it('returns year-month from captured date', () => {
    expect(toDateGroupKey('2026-02-10T10:00:00.000Z', '2026-01-01T00:00:00.000Z')).toBe('2026-02');
  });

  it('falls back to fallback date when captured date is missing', () => {
    expect(toDateGroupKey(null, '2025-12-20T12:00:00.000Z')).toBe('2025-12');
  });

  it('returns unknown-date when both values are invalid', () => {
    expect(toDateGroupKey('bad-date', 'still-bad')).toBe('unknown-date');
  });
});
