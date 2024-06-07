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

const isIntersects = (aBounds, bBounds) => {
  if (aBounds.left > bBounds.right) return false;
  if (aBounds.right < bBounds.left) return false;
  if (aBounds.top > bBounds.bottom) return false;
  if (aBounds.bottom < bBounds.top) return false;

  return true;
};

const getDistanceBetweenCenters = (aBounds, bBounds) => {
  const aCenterX = aBounds.x + aBounds.width / 2;
  const aCenterY = aBounds.y + aBounds.height / 2;

  const bCenterX = bBounds.x + bBounds.width / 2;
  const bCenterY = bBounds.y + bBounds.height / 2;

  return Math.sqrt((aCenterX - bCenterX) ** 2 + (aCenterY - bCenterY) ** 2);
};

const getIntersectionIndex = (bounds, targetBoundsList) => {
  const targetBoundsListEntries = Object.entries(targetBoundsList);

  const result = targetBoundsListEntries
    .filter(([, targetBounds]) => {
      return isIntersects(bounds, targetBounds);
    })
    .sort(([, aBounds], [, bBounds]) => {
      const aDistance = getDistanceBetweenCenters(bounds, aBounds);
      const bDistance = getDistanceBetweenCenters(bounds, bBounds);

      return Math.sign(aDistance - bDistance);
    });

  if (!result.length) return -1;

  return Number(result[0][0]);
};

export {
  getElementPosition,
  getBounds,
  getElementCursorOffset,
  getExtendedData,
  getElementBoundedPosition,
  isIntersects,
  getDistanceBetweenCenters,
  getIntersectionIndex,
};
