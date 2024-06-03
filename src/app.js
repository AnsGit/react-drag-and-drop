import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './menu';
import { HTML5Draggable, CustomUseDrag } from './examples';
import './styles.scss';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />}>
            <Route index element={<HTML5Draggable />} />
            <Route path='/html5-draggable' element={<HTML5Draggable />} />
            <Route path='/custom-use-drag' element={<CustomUseDrag />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
