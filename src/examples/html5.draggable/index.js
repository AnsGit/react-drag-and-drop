import './styles.css';

export default function Draggable() {
  return (
    <div
      className='plate'
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
    />
  );
}