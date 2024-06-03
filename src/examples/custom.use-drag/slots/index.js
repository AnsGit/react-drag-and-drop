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
    case 'return': {
      const { index, pos: newPos } = payload;
      const sIndex = state.result.indexOf(index);

      const newState = {
        ...state,
        positions: state.positions.map((pos) => ({ ...pos })),
        result: [...state.result],
      };

      newState.positions[index] = { ...newPos };

      if (sIndex !== -1) newState.result[sIndex] = null;

      return newState;
    }
    default: {
      return state;
    }
  }
};

const plates = [
  {
    pos: {
      top: 100,
      left: 150,
    },
  },
  {
    pos: {
      top: 100,
      left: 350,
    },
  },
  {
    pos: {
      top: 100,
      left: 550,
    },
  },
];

const slots = [
  {
    pos: {
      top: 300,
      left: 150,
    },
  },
  {
    pos: {
      top: 300,
      left: 350,
    },
  },
  {
    pos: {
      top: 300,
      left: 550,
    },
  },
];

const initialState = {
  isDisabled: false,
  positions: plates.map(({ pos }) => ({ ...pos })),
  result: slots.map((slot) => null),
};

const CustomUseDragSlots = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='drag-container'>
      {plates.map(({ pos: initialPos }, i) => {
        // const sIndex = state.result.indexOf(i);

        // const curPos = sIndex !== -1 ? slots[sIndex].pos : initialPos;
        const curPos = state.positions[i];

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

            // Save current position
            dispatch({
              type: 'move',
              payload: { index: i, pos },
            });

            return () => {
              // Return plate to initial position
              dispatch({
                type: 'return',
                payload: { index: i, pos: initialPos },
              });
            };
          },
          style: curPos,
        };

        return <Plate key={`plate_${i}`} {...plateProps}>{`Plate ${i}`}</Plate>;
      })}
    </div>
  );
};

export default CustomUseDragSlots;
