import { useDrag } from '../../../../hooks';
import BasicPlate from '../../../../components/basic-plate';
import './styles.scss';

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

  console.log(restProps.style);

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
