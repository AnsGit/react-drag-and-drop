import { useState, useEffect, useRef } from 'react';
import {
  getDeviceType,
  eventTargetCursorXY,
  eventTargetPosition,
} from './helpers';

const body = document.body;
const isMobile = getDeviceType() === 'touch';

const useDrag = ({
  isDisabled = false,
  onStart = (e) => {},
  onMove = (e) => {},
  onEnd = (e) => {},
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const targetRef = useRef(null);
  const parentRef = useRef(null);

  const getEventTargetPosition = (e) => {
    return eventTargetPosition(
      e,
      targetRef.current.bounds,
      targetRef.current.cursor,
      parentRef.current.bounds,
      isMobile
    );
  };

  const setTargetPosition = (pos, transform = false) => {
    const { style } = targetRef.current.element;

    if (transform) {
      style.left = 0;
      style.top = 0;
      style.transform = `translate(${pos.left}px, ${pos.top}px)`;
      return;
    }

    style.left = `${pos.left}px`;
    style.top = `${pos.top}px`;
    style.transform = '';
  };

  const props = {};

  if (!isDragging && !isDisabled) {
    const onStartEventHandler = (e) => {
      // Disable multi-touch
      if (e?.touches?.length > 1) return;

      const element = e.currentTarget;

      targetRef.current = {
        element,
        bounds: element.getBoundingClientRect(),
        cursor: eventTargetCursorXY(e, isMobile),
      };

      const parent = e.currentTarget.parentElement;

      parentRef.current = {
        element: parent,
        bounds: parent.getBoundingClientRect(),
      };

      setIsDragging(true);

      const startPos = getEventTargetPosition(e);

      setTargetPosition(startPos, true);

      onStart(e, startPos);
    };

    props.onTouchStart = onStartEventHandler;
    props.onMouseDown = onStartEventHandler;

    // return { isDragging, props };
  }

  const onMoveEventHandler = (e) => {
    const newPos = getEventTargetPosition(e);

    setTargetPosition(newPos, true);

    onMove(e, newPos);
  };

  const onEndEventHandler = (e) => {
    const endPos = getEventTargetPosition(e);

    setTargetPosition(endPos);

    targetRef.current = null;
    parentRef.current = null;

    setTimeout(async () => {
      setIsDragging(false);

      const onEndAction = await onEnd(e, endPos);

      if (typeof onEndAction === 'function') {
        setTimeout(onEndAction);
      }
    });
  };

  useEffect(() => {
    if (isDragging) {
      body.addEventListener('touchmove', onMoveEventHandler);
      body.addEventListener('mousemove', onMoveEventHandler);

      body.addEventListener('touchend', onEndEventHandler);
      body.addEventListener('mouseup', onEndEventHandler);

      body.addEventListener('mouseleave', onEndEventHandler);
    }

    return () => {
      body.removeEventListener('touchmove', onMoveEventHandler);
      body.removeEventListener('mousemove', onMoveEventHandler);

      body.removeEventListener('touchend', onEndEventHandler);
      body.removeEventListener('mouseup', onEndEventHandler);

      body.removeEventListener('mouseleave', onEndEventHandler);
    };
  }, [isDragging]);

  return { isDragging, props };
};

export default useDrag;
