const getElementPosition = (data, host) => {
  const parent = data.node.offsetParent;

  const { x: eX, y: eY } = data.node.getBoundingClientRect();
  const { x: hX, y: hY } = (host || parent).getBoundingClientRect();

  return { x: eX - hX, y: eY - hY };
};

const getBounds = (data, host) => {
  return {
    element: data.node.getBoundingClientRect(),
    host: (host || data.node.offsetParent).getBoundingClientRect(),
  };
};

const getElementCursorOffset = (data, host) => {
  const position = getElementPosition(data, host);

  return { x: data.x - position.x, y: data.y - position.y };
};

const getExtendedData = (data, cursorOffset, bounds = null) => {
  const extendedData = {
    ...data,
    host: data.node.offsetParent,
    cursorX: data.x,
    cursorY: data.y,
    innerCursorX: cursorOffset.x,
    innerCursorY: cursorOffset.y,
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
  x = Math.min(x, bounds.host.width - bounds.element.width);

  y = Math.max(0, y);
  y = Math.min(y, bounds.host.height - bounds.element.height);

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

const getScale = () => {
  const zoom = document.body.style.zoom;

  if (/^\s*\d+(\.\d+)?\s*$/.test(zoom)) {
    // is float
    return parseFloat(zoom);
  }

  if (/^\s*\d+(\.\d+)?%\s*$/.test(zoom)) {
    // is percentage
    return parseInt(zoom) / 100;
  }

  return 1;
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
  getScale,
};
