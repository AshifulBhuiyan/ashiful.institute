import { useDragLayer } from 'react-dnd';

export default function DragPreviewLayer() {
  const { isDragging, item, offset } = useDragLayer(m => ({
    isDragging : m.isDragging(),
    item       : m.getItem(),
    offset     : m.getSourceClientOffset(),
  }));

  if (!isDragging || !offset || !item) return null;

  const style = {
    position      : 'fixed',
    pointerEvents : 'none',
    width         : 48,
    height        : 60,
    left          : offset.x ,
    top           : offset.y ,
    transform     : `rotate(${item.rotate})`,
    transition    : 'left .0s ease-out, top .0s ease-out',
    zIndex        : 1000,
    filter        : item.glow
      ? 'drop-shadow(0 0 8px rgba(255,255,0,0.9))'
      : 'none',
  };

  return <img src={item.icon} alt="" style={style} />;
}
