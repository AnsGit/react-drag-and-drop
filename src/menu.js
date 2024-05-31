import { Outlet } from 'react-router-dom';
import './styles.css';

export default function Menu() {
  return (
    <div className='menu'>
      <div className='links'>
        <a className='link' href='./draggable'>
          HTML5 Draggable
        </a>
      </div>
      <div className='scene'>
        <Outlet />
      </div>
    </div>
  );
}
