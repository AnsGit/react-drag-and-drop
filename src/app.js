import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './menu';
import { Draggable } from './examples';
import './styles.css';

export default function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />}>
            <Route path='/draggable' element={<Draggable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
