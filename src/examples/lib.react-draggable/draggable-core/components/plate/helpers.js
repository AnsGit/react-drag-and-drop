const getElementPosition = (data) => {
  const parent = data.node.offsetParent;

  const { x: eX, y: eY } = data.node.getBoundingClientRect();
  const { x: pX, y: pY } = parent.getBoundingClientRect();

  return { x: eX - pX, y: eY - pY };
};

const getBounds = (data) => {
  return {
    element: data.node.getBoundingClientRect(),
    parent: data.node.offsetParent.getBoundingClientRect(),
  };
};

const getElementCursorOffset = (data) => {
  const position = getElementPosition(data);

  return { x: data.x - position.x, y: data.y - position.y };
};

const getExtendedData = (data, cursorOffset, bounds = null) => {
  const extendedData = {
    ...data,
    parent: data.node.offsetParent,
    cursorX: data.x,
    cursorY: data.y,
    lastX: data.lastX - cursorOffset.x,
    lastY: data.lastY - cursorOffset.y,
    x: data.x - cursorOffset.x,
    y: data.y - cursorOffset.y,
  };

  if (bounds !== null) {
    const position = { x: extendedData.x, y: extendedData.y };
    const { x, y } = getElementBoundedPosition(position, bounds);

    const lastPosition = { x: extendedData.lastX, y: extendedData.lastY };
    const { x: lX, y: lY } = getElementBoundedPosition(lastPosition, bounds);

    extendedData.x = x;
    extendedData.y = y;

    extendedData.lastX = lX;
    extendedData.lastY = lY;

    extendedData.deltaX = x - lX;
    extendedData.deltaY = y - lY;
  }

  return extendedData;
};

const getElementBoundedPosition = (position, bounds) => {
  let { x, y } = position;

  x = Math.max(0, x);
  x = Math.min(x, bounds.parent.width - bounds.element.width);

  y = Math.max(0, y);
  y = Math.min(y, bounds.parent.height - bounds.element.height);

  return { x, y };
};

export {
  getElementPosition,
  getBounds,
  getElementCursorOffset,
  getExtendedData,
  getElementBoundedPosition,
};
