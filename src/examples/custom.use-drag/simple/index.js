import { useReducer } from 'react';
import Plate from '../components/plate';
import './styles.scss';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'disable': {
      return { ...state, isDisabled: true };
    }
    case 'enable': {
      return { ...state, isDisabled: false };
    }
    case 'move': {
      const { index, pos: newPos } = payload;

      const newState = {
        ...state,
        positions: state.positions.map((pos) => ({ ...pos })),
      };

      newState.positions[index] = { ...newPos };

      return newState;
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  isDisabled: false,
  positions: [
    {
      top: 100,
      left: 150,
    },
    {
      top: 100,
      left: 350,
    },
    {
      top: 100,
      left: 550,
    },
  ],
};

const CustomUseDragSimple = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='drag-container'>
      {state.positions.map((pos, i) => {
        const plateProps = {
          isDraggable: !state.isDisabled,
          onDragStart: (e, pos) => {
            // console.log('START', e, pos);
          },
          onDragMove: (e, pos) => {
            // console.log('MOVE', e, pos);
          },
          onDragEnd: (e, pos) => {
            // console.log('END', e, pos);

            dispatch({
              type: 'move',
              payload: { index: i, pos },
            });
          },
          style: pos,
        };

        return <Plate key={`plate_${i}`} {...plateProps}>{`Plate ${i}`}</Plate>;
      })}
    </div>
  );
};

export default CustomUseDragSimple;
