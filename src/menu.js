import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import './styles.scss';

const items = [
  { href: 'html5-draggable', title: 'HTML5: Draggable' },
  { href: 'custom-use-drag-simple', title: 'Custom: useDrag: Simple' },
  { href: 'custom-use-drag-slots', title: 'Custom: useDrag: Slots' },
  { href: 'lib-react-draggable', title: 'Lib: react-draggable' },
];

const Menu = () => {
  return (
    <div className='menu'>
      <div className='links'>
        {items.map(({ href, title }) => {
          const classname = cn('link', {
            active: location.href.includes(href),
          });

          return (
            <a key={href} className={classname} href={href}>
              {title}
            </a>
          );
        })}
      </div>
      <div className='scene'>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
