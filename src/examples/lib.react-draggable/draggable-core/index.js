import { useReducer, useRef } from 'react';
import Plate from './components/plate';
import BasicSlot from '../../../components/basic-slot';
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
      x: 150,
      y: 100,
    },
  },
  {
    pos: {
      x: 350,
      y: 100,
    },
  },
  {
    pos: {
      x: 550,
      y: 100,
    },
  },
];

const slots = [
  {
    pos: {
      x: 150,
      y: 300,
    },
  },
  {
    pos: {
      x: 350,
      y: 300,
    },
  },
  {
    pos: {
      x: 550,
      y: 300,
    },
  },
];

const initialState = {
  isDisabled: false,
  positions: plates.map(({ pos }) => ({ ...pos })),
  result: slots.map((slot) => null),
};

const LibReactDraggable = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const slotsRefs = useRef(slots.map(() => ({ current: null })));

  return (
    <div className='drag-container'>
      {/* Plates */}
      {plates.map(({ pos: initialPos }, i) => {
        const sIndex = state.result.indexOf(i);

        // const curPos = sIndex !== -1 ? slots[sIndex].pos : initialPos;
        const curPos = state.positions[i];

        const plateProps = {
          allowAnyClick: false, // true
          enableUserSelectHack: true,
          disabled: state.isDisabled,
          // grid: [100, 50],
          // handle: '.head',
          // cancel: '.body',
          // offsetParent: document.body,
          onMouseDown: (e) => {
            console.log('MOUSE DOWN:', e);
          },
          onStart: (e, data) => {
            console.log('DRAG START:', data);
          },
          onDrag: (e, data) => {
            console.log('DRAG MOVE:', data);
          },
          onStop: (e, data) => {
            console.log('DRAG STOP:', data);

            // dispatch({
            //   type: 'move',
            //   payload: {
            //     index: i,
            //     pos: { x: data.x, y: data.y },
            //   },
            // });

            dispatch({
              type: 'return',
              payload: { index: i, pos: initialPos },
            });
          },
          scale: 1,
          position: curPos,
          // nodeRef: React.Ref<typeof React.Component>,
        };

        return (
          <Plate key={`plate_${i}`} {...plateProps}>
            <div className='head'>{`Plate ${i}: head`}</div>
            <div className='body'>{`Plate ${i}: body`}</div>
          </Plate>
        );
      })}

      {/* Slots */}
      {slots.map(({ pos }, i) => {
        return (
          <BasicSlot
            ref={slotsRefs.current[i]}
            key={`slot_${i}`}
            style={{ left: pos.x, top: pos.y }}
          />
        );
      })}
    </div>
  );
};

export default LibReactDraggable;
