import cn from 'classnames';
import './styles.scss';

const BasicSlot = ({ children, isHovered = false, ...props }) => {
  const className = cn('slot', { hovered: isHovered });

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default BasicSlot;
