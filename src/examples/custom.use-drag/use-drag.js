import { useState, useEffect, useRef } from 'react';

const body = document.querySelector('body');

const useDrag = ({
  containerRef,
  isDisabled = false,
  onStart = (e) => {},
  onMove = (e) => {},
  onEnd = (e) => {},
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);
  // const [position, setPosition] = useState({});

  if (isDisabled) return { isDragging, props: {} };

  const props = {};

  if (!isDragging) {
    const onStartEventListener = (e) => {
      ref.current = e.target;
      setIsDragging(true);
      console.log('START', e);
      onStart(e);
    };

    props.onTouchStart = onStartEventListener;
    props.onMouseDown = onStartEventListener;

    // return { isDragging, props };
  }

  const onMoveEventListener = (e) => {
    console.log('MOVE', e);
    onMove(e);
  };

  useEffect(() => {
    if (isDragging) {
      body.addEventListener('touchmove', onMoveEventListener);
      body.addEventListener('mousemove', onMoveEventListener);
    }

    return () => {
      body.removeEventListener('touchmove', onMoveEventListener);
      body.removeEventListener('mousemove', onMoveEventListener);
    };
  }, [isDragging]);

  if (isDragging) {
    const onEndEventListener = (e) => {
      body.removeEventListener('touchmove', onMoveEventListener);
      body.removeEventListener('mousemove', onMoveEventListener);

      ref.current = null;
      setIsDragging(false);
      console.log('END', e);
      onEnd(e);
    };

    props.onTouchEnd = onEndEventListener;
    props.onMouseUp = onEndEventListener;
  }

  return { isDragging, props };
};

export default useDrag;
