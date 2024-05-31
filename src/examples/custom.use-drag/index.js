import { useRef } from 'react';
import CustomPlate from './components/custom-plate';
import './styles.css';

const CustomUseDrag = () => {
  const ref = useRef(null);

  return (
    <div className='drag-container' ref={ref}>
      <CustomPlate containerRef={ref} />
    </div>
  );
};

export default CustomUseDrag;
