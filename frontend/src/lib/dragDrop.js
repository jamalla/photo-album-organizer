export function createDragDropController({
  container,
  draggableSelector,
  onReorder
}) {
  if (!container) {
    throw new Error('Missing drag-drop container');
  }

  let draggedElement = null;

  function getItems() {
    return [...container.querySelectorAll(draggableSelector)];
  }

  container.addEventListener('dragstart', (event) => {
    const target = event.target.closest(draggableSelector);
    if (!target) {
      return;
    }
    draggedElement = target;
    event.dataTransfer.effectAllowed = 'move';
  });

  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const target = event.target.closest(draggableSelector);
    if (!target || !draggedElement || target === draggedElement) {
      return;
    }
    const bounds = target.getBoundingClientRect();
    const shouldInsertAfter = event.clientY > bounds.top + bounds.height / 2;
    if (shouldInsertAfter) {
      target.after(draggedElement);
    } else {
      target.before(draggedElement);
    }
  });

  container.addEventListener('drop', async (event) => {
    event.preventDefault();
    if (!draggedElement || !onReorder) {
      return;
    }

    const orderedIds = getItems().map((element) => element.dataset.albumKey).filter(Boolean);
    await onReorder(orderedIds);
    draggedElement = null;
  });

  container.addEventListener('dragend', () => {
    draggedElement = null;
  });
}
