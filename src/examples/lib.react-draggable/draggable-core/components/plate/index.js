import { useState, useEffect, useRef } from 'react';
import { DraggableCore } from 'react-draggable';
import BasicPlate from '../../../../../components/basic-plate';
import './styles.scss';

const Plate = ({
  className = 'plate',
  children = null,
  position = {},
  ...restProps
}) => {
  const { left, top } = position;

  const ref = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(left);
  const [y, setY] = useState(top);

  useEffect(() => {
    // setX(position.left);
    // setY(position.top);
    setX(left);
    setY(top);
  }, [position]);

  const transform = `translate(${x}px, ${y}px)`;

  return (
    <DraggableCore
      nodeRef={ref}
      {...restProps}
      onMouseDown={(e) => {
        if (restProps.disabled) return;

        restProps.onMouseDown(e);
      }}
      onStart={(e, data) => {
        if (e?.touches?.length > 1) return false;

        setIsDragging(true);

        restProps.onStart(e, data);
      }}
      onDrag={(e, data) => {
        // data.node.style.transform = `translate(${data.x}px, ${data.y}px)`;
        restProps.onDrag(e, data);

        setX(data.x);
        setY(data.y);
      }}
      onStop={(e, data) => {
        setIsDragging(false);

        restProps.onStop(e, data);
      }}
    >
      <BasicPlate ref={ref} style={{ transform }} isDragging={isDragging}>
        {children}
      </BasicPlate>
    </DraggableCore>
  );
};

export default Plate;
