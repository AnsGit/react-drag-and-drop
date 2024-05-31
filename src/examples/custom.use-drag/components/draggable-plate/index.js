import { useDrag } from '../../hooks';
import Plate from '../../../../components/plate';
import './styles.css';

const DraggablePlate = () => {
  const { isDragging, props } = useDrag({});

  return <Plate isDragging={isDragging} {...props} />;
};

export default DraggablePlate;
