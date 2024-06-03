import { useDrag } from '../../../../hooks';
import BasicPlate from '../../../../components/basic-plate';
import './styles.css';

const Plate = (props = {}) => {
  const {
    // Is plate draggable
    isDraggable = true,
    // Drag callbacks
    onDragStart = () => {},
    onDragMove = () => {},
    onDragEnd = () => {},
    ...restProps
  } = props;

  const subscription = useDrag({
    isDisabled: !isDraggable,
    onStart: onDragStart,
    onMove: onDragMove,
    onEnd: onDragEnd,
  });

  return (
    <BasicPlate
      isDragging={subscription.isDragging}
      {...subscription.props}
      {...restProps}
    />
  );
};

export default Plate;
