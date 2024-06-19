import { useRef } from 'react';
import Draggable from 'react-draggable';
import BasicPlate from '../../../../../components/basic-plate';
import './styles.scss';

const Plate = ({ className = 'plate', children = null, ...restProps }) => {
  const ref = useRef(null);

  return (
    <Draggable nodeRef={ref} {...restProps} defaultClassName={className}>
      <BasicPlate ref={ref}>{children}</BasicPlate>
    </Draggable>
  );
};

export default Plate;
