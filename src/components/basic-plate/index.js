import cn from 'classnames';
import './styles.css';

const BasicPlate = ({ children, isDragging = false, ...props }) => {
  return (
    <div className={cn('plate', { dragging: isDragging })} {...props}>
      {children}
    </div>
  );
};

export default BasicPlate;
