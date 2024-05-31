import { useDrag } from '../../hooks';
import BasicPlate from '../../../../components/basic-plate';
import './styles.css';

const Plate = (props = {}) => {
  const { containerRef, isDraggable = false, ...restProps } = props;
  const subscription = useDrag({ containerRef, isDisabled: isDraggable });

  return (
    <BasicPlate
      isDragging={subscription.isDragging}
      {...subscription.props}
      {...restProps}
    />
  );
};

export default Plate;
