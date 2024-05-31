import { useRef } from 'react';
import Plate from './components/plate';
import './styles.css';

const CustomUseDrag = () => {
  const containerRef = useRef(null);

  return (
    <div className='drag-container' ref={containerRef}>
      <Plate containerRef={containerRef} />
    </div>
  );
};

export default CustomUseDrag;
