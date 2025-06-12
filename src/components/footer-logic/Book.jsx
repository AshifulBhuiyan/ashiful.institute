import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

export default function Book({
  id, title, icon, glow, link, left, bottom, rotate,
  onDropped,                       // new: parent sets this flag when dropped
}) {
  /* drag source */
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type : 'BOOK',
      item : { id, link, icon, rotate, glow },  // pass data to preview / drop
      collect : m => ({ isDragging : m.isDragging() }),
    }),
    [id, link, icon, rotate, glow],
  );

  /* hide native ghost */
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState : true });
  }, [preview]);

  /* style helpers */
  const glowClass = glow
    ? 'drop-shadow-[0_0_8px_rgba(255,255,0,0.9)] animate-pulse'
    : '';

  return (
    <div
      ref={drag}
      className={`
        absolute  w-[4vw] max-w-[64px] min-w-[42px] select-none cursor-grab
        transition-all duration-300 ease-out
        ${glowClass}
        ${onDropped ? 'opacity-0 scale-75' : isDragging ? 'opacity-30' : 'opacity-100'}
      `}
      style={{
        left,
        bottom,
        transform: `rotate(${rotate})`,
        pointerEvents : 'auto',
        touchAction   : 'none',
      }}
    >
      <img
        src={icon}
        alt={title}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
}
