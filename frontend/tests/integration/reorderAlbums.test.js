import { describe, expect, it, vi } from 'vitest';
import { createDragDropController } from '../../src/lib/dragDrop.js';

function withDataTransfer(event) {
  Object.defineProperty(event, 'dataTransfer', {
    value: { effectAllowed: '' },
    configurable: true
  });
  return event;
}

describe('drag-drop album reorder', () => {
  it('calls reorder callback with new sequence after drop', async () => {
    document.body.innerHTML = `
      <ul class="album-list">
        <li class="album-card" data-album-key="2026-01" draggable="true">A</li>
        <li class="album-card" data-album-key="2026-02" draggable="true">B</li>
      </ul>
    `;

    const container = document.querySelector('.album-list');
    const second = container.querySelector('[data-album-key="2026-02"]');
    second.getBoundingClientRect = () => ({ top: 0, height: 20 });

    const onReorder = vi.fn(async () => {});

    createDragDropController({
      container,
      draggableSelector: '.album-card',
      onReorder
    });

    const first = container.querySelector('[data-album-key="2026-01"]');
    first.dispatchEvent(withDataTransfer(new Event('dragstart', { bubbles: true }))); 

    const dragOver = new Event('dragover', { bubbles: true, cancelable: true });
    Object.defineProperty(dragOver, 'clientY', { value: 50, configurable: true });
    second.dispatchEvent(dragOver);

    second.dispatchEvent(new Event('drop', { bubbles: true, cancelable: true }));

    await Promise.resolve();

    expect(onReorder).toHaveBeenCalledTimes(1);
    expect(onReorder).toHaveBeenCalledWith(['2026-02', '2026-01']);
  });
});
