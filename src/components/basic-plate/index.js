import cn from 'classnames';
import './styles.scss';

const BasicPlate = ({ children, isDragging = false, ...props }) => {
  const className = cn('plate', { dragging: isDragging });

  return (
    <div className={className} {...props}>
      <div className='inner'>{children}</div>
    </div>
  );
};

export default BasicPlate;
