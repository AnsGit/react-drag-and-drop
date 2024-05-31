import { Outlet } from 'react-router-dom';
import './styles.css';

const Menu = () => {
  return (
    <div className='menu'>
      <div className='links'>
        <a className='link' href='./html5-draggable'>
          HTML5 Draggable
        </a>
        <a className='link' href='./custom-use-drag'>
          Custom useDrag
        </a>
      </div>
      <div className='scene'>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
