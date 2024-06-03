export const DeviceType = {
  DESKTOP: 'desktop',
  TOUCH: 'touch',
  POINTER: 'pointer',
};

const MediaQuery = {
  [DeviceType.DESKTOP]: '(pointer: fine), (pointer: none)',
  [DeviceType.TOUCH]: '(pointer: coarse)',
  [DeviceType.POINTER]: '(pointer: fine) and (any-pointer: coarse)',
};

const getDeviceType = () => {
  const deviceType = [
    DeviceType.POINTER,
    DeviceType.TOUCH,
    DeviceType.DESKTOP,
  ].find((item) => {
    return window.matchMedia(MediaQuery[item]).matches;
  });

  if (!deviceType) {
    throw new Error('unknown device type');
  }

  return deviceType;
};

const zoomEventPageXY = (e) => {
  let zoom, correction;

  zoom = document.body.style.zoom;

  if (/^\s*\d+(\.\d+)?\s*$/.test(zoom)) {
    // is float
    correction = parseFloat(zoom);
  } else if (/^\s*\d+(\.\d+)?%\s*$/.test(zoom)) {
    // is percentage
    correction = parseInt(zoom) / 100;
  } else {
    correction = 1;
  }

  return {
    pageX: e.pageX / correction,
    pageY: e.pageY / correction,
  };
};

const eventPageXY = (e, isMobile = false) => {
  let _e = e;

  if (isMobile) {
    const touches = _e?.touches?.length ? _e.touches : _e.changedTouches;

    if (touches?.length) _e = touches[0];
  }

  return zoomEventPageXY(_e);
};

const eventTargetCursorXY = (e, isMobile) => {
  const { pageX, pageY } = eventPageXY(e, isMobile);
  const { x: tX, y: tY } = e.target.getBoundingClientRect();

  return { x: pageX - tX, y: pageY - tY };
};

const eventTargetPosition = (
  e,
  targetBounds,
  targetCursorXY,
  parentBounds,
  isMobile
) => {
  const { pageX, pageY } = eventPageXY(e, isMobile);
  const { x: tcX, y: tcY } = targetCursorXY;

  let left = pageX - tcX - parentBounds.x;

  left = Math.max(0, left);
  left = Math.min(left, parentBounds.width - targetBounds.width);

  let top = pageY - tcY - parentBounds.y;

  top = Math.max(0, top);
  top = Math.min(top, parentBounds.height - targetBounds.height);

  return { left, top };
};

export {
  getDeviceType,
  zoomEventPageXY,
  eventPageXY,
  eventTargetCursorXY,
  eventTargetPosition,
};
