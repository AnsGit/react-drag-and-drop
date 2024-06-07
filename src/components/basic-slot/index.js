import { forwardRef } from 'react';
import cn from 'classnames';
import './styles.scss';

const BasicSlot = forwardRef(function (
  { children, isHovered = false, ...props },
  ref
) {
  const className = cn('slot', { hovered: isHovered });

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
});

export default BasicSlot;
