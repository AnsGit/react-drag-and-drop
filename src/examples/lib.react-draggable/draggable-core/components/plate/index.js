import { cloneElement, Children, useState, useEffect, useRef } from 'react';
import { DraggableCore } from 'react-draggable';
import BasicPlate from '../../../../../components/basic-plate';
import {
  getElementCursorOffset,
  getBounds,
  getExtendedData,
  getScale,
} from './helpers';
import './styles.scss';

const Plate = ({
  className = 'plate',
  children = null,
  position: inititalPosition = {},
  scale = getScale(),
  getStyle = (x, y) => {
    return { transform: `translate(${x}px, ${y}px)` };
  },
  ...restProps
}) => {
  const ref = useRef(null);

  const drag = useRef({
    bounds: null,
    cursorOffset: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(inititalPosition);

  useEffect(() => setPosition(inititalPosition), [inititalPosition]);

  const renderPlate = () => (
    <DraggableCore
      nodeRef={ref}
      scale={scale}
      {...restProps}
      onMouseDown={(e) => {
        if (restProps.disabled) return;

        restProps.onMouseDown(e);
      }}
      onStart={(e, data) => {
        if (e?.touches?.length > 1) return false;

        drag.current.bounds = getBounds(data);
        drag.current.cursorOffset = getElementCursorOffset(data);

        setIsDragging(true);

        const extendedData = getExtendedData(
          data,
          drag.current.cursorOffset,
          drag.current.bounds
        );

        restProps.onStart(e, extendedData);
      }}
      onDrag={(e, data) => {
        const extendedData = getExtendedData(
          data,
          drag.current.cursorOffset,
          drag.current.bounds
        );

        restProps.onDrag(e, extendedData);

        const style = getStyle(extendedData.x, extendedData.y);

        for (const key in style) {
          data.node.style.setProperty(key, style[key]);
        }
      }}
      onStop={(e, data) => {
        const extendedData = getExtendedData(
          data,
          drag.current.cursorOffset,
          drag.current.bounds
        );

        setPosition({ x: extendedData.x, y: extendedData.y });
        setIsDragging(false);

        drag.current = {
          bounds: null,
          cursorOffset: null,
        };

        restProps.onStop(e, extendedData);
      }}
    >
      {cloneElement(Children.only(<BasicPlate>{children}</BasicPlate>), {
        ref: ref,
        style: { ...getStyle(position.x, position.y) },
        'data-is-dragging': isDragging,
      })}
    </DraggableCore>
  );

  return renderPlate();
};

export default Plate;
