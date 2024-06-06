import { forwardRef } from 'react';
import cn from 'classnames';
import './styles.scss';

const BasicPlate = forwardRef(function (
  { children, isDragging = false, ...props },
  ref
) {
  const className = cn('plate', { dragging: isDragging });

  return (
    <div ref={ref} className={className} {...props}>
      <div className='inner'>{children}</div>
    </div>
  );
});

export default BasicPlate;
