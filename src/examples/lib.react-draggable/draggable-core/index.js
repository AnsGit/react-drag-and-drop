import { useEffect, useReducer, useRef } from 'react';
import Plate from './components/plate';
import BasicSlot from '../../../components/basic-slot';
import { getIntersectionIndex } from './components/plate/helpers';
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
    case 'hover-slot': {
      const { index } = payload;

      const newState = { ...state, slotIndex: index };

      return newState;
    }
    case 'drag': {
      const { value } = payload;

      const newState = { ...state, isDragged: value };

      return newState;
    }
    case 'set-slot-plate': {
      const { sIndex, pIndex } = payload;

      const newState = { ...state, result: [...state.result] };

      newState.result[sIndex] = pIndex;

      return newState;
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
  isDragged: false,
  slotIndex: -1,
};

const LibReactDraggable = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dragContainerRef = useRef(null);

  const slotsData = useRef({
    refs: slots.map(() => ({ current: null })),
    bounds: slots.map(() => null),
  });

  useEffect(() => {
    const { refs, bounds } = slotsData.current;

    refs.forEach((ref, i) => {
      bounds[i] = ref.current.getBoundingClientRect();
    });
  }, []);

  console.log('RENDER:', state.result);

  return (
    <div ref={dragContainerRef} className='drag-container'>
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

            const bounds = data.node.getBoundingClientRect();

            const sIndex = getIntersectionIndex(
              bounds,
              slotsData.current.bounds
            );

            dispatch({
              type: 'hover-slot',
              payload: { index: sIndex },
            });

            dispatch({
              type: 'drag',
              payload: { value: true },
            });
          },
          onStop: (e, data) => {
            console.log('DRAG STOP:', data);

            if (!state.isDragged) return;

            const plateSlotIndex = state.result.indexOf(i);

            // Reset current plate slot
            if (![state.slotIndex, -1].includes(plateSlotIndex)) {
              dispatch({
                type: 'set-slot-plate',
                payload: {
                  sIndex: plateSlotIndex,
                  pIndex: null,
                },
              });
            }

            // If slot is hovered
            if (state.slotIndex !== -1) {
              // if slot is not filled with current plate
              if (state.result[state.slotIndex] !== i) {
                const slotPlateIndex = state.result[state.slotIndex];

                if (slotPlateIndex !== null) {
                  // Return slot's plate
                  dispatch({
                    type: 'move',
                    payload: {
                      index: slotPlateIndex,
                      pos: plates[slotPlateIndex].pos,
                    },
                  });
                }

                // Save current plate to slot
                dispatch({
                  type: 'set-slot-plate',
                  payload: {
                    sIndex: state.slotIndex,
                    pIndex: i,
                  },
                });
              }

              const slotPos = slots[state.slotIndex].pos;

              // Move current plate to slot
              dispatch({
                type: 'move',
                payload: { index: i, pos: slotPos },
              });
            } else {
              // Return current slot
              dispatch({
                type: 'move',
                payload: { index: i, pos: initialPos },
              });
            }

            // Clear slot hover
            dispatch({
              type: 'hover-slot',
              payload: { index: -1 },
            });

            // Clear drag status
            dispatch({
              type: 'drag',
              payload: { value: false },
            });
          },
          // scale: 1,
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
            ref={slotsData.current.refs[i]}
            key={`slot_${i}`}
            isHovered={i === state.slotIndex}
            style={{ left: pos.x, top: pos.y }}
          />
        );
      })}
    </div>
  );
};

export default LibReactDraggable;
