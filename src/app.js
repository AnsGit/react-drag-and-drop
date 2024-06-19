import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './menu';
import {
  HTML5Draggable,
  CustomUseDragSimple,
  CustomUseDragSlots,
  LibReactDraggable,
  LibReactDraggableCore,
} from './examples';
import './styles.scss';

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />}>
            <Route index element={<HTML5Draggable />} />
            <Route path='/html5-draggable' element={<HTML5Draggable />} />
            <Route
              path='/custom-use-drag-simple'
              element={<CustomUseDragSimple />}
            />
            <Route
              path='/custom-use-drag-slots'
              element={<CustomUseDragSlots />}
            />
            <Route
              path='/lib-react-draggable'
              element={<LibReactDraggable />}
            />
            <Route
              path='/lib-react-draggable-core'
              element={<LibReactDraggableCore />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
