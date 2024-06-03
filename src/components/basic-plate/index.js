import cn from 'classnames';
import './styles.scss';

const BasicPlate = ({ children, isDragging = false, ...props }) => {
  const className = cn('plate', { dragging: isDragging });

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default BasicPlate;
