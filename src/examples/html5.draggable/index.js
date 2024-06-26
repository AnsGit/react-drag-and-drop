import BasicPlate from '../../components/basic-plate';
import './styles.scss';

const HTML5Draggable = () => {
  return (
    <BasicPlate
      draggable
      onDragStart={(e, element) => {
        console.log('onDragStart', e, element);

        setTimeout(function () {
          e.target.style.visibility = 'hidden';
        });
      }}
      onDrag={(e) => {
        console.log('onDrag', e);
      }}
      onDragEnd={(e) => {
        console.log('onDragEnd', e);
        e.target.style.visibility = 'visible';
      }}
      onDragOver={(e) => {
        console.log('onDragOver', e);
      }}
      onDragLeave={(e) => {
        console.log('onDragLeave', e);
      }}
      onDrop={(e, element) => {
        console.log('onDrop', e, element);
      }}
    >
      Plate
    </BasicPlate>
  );
};

export default HTML5Draggable;
