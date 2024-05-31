import { useDrag } from '../../hooks';
import Plate from '../../../../components/plate';
import './styles.css';

const CustomPlate = (props = {}) => {
  const { containerRef, isDraggable = false, ...restProps } = props;
  const subscription = useDrag({ containerRef, isDisabled: isDraggable });

  return (
    <Plate
      isDragging={subscription.isDragging}
      {...subscription.props}
      {...restProps}
    />
  );
};

export default CustomPlate;
