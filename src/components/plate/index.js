import cn from 'classnames';
import './styles.css';

const Plate = ({ children, isDragging = false, ...props }) => {
  return (
    <div className={cn('plate', { dragging: isDragging })} {...props}>
      {children}
    </div>
  );
};

export default Plate;
