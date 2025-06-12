import { useRef } from 'react';
import { useDrop } from 'react-dnd';
/*  ↓ via SVGR (Astro’s Vite pipeline) – NOT from /public/   */
import TableSvg  from '../../../public/assets/footer/table.svg?react';

/* tune to match your SVG */
const TABLE_W  = 300;   // rendered width
const TOP_Y    = 0;     // distance from top of SVG to tabletop
const TOP_H    = 60;    // height of usable tabletop area

export default function TableZone({ onBookDrop }) {
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept : 'BOOK',
    drop   : item => onBookDrop?.(item),
    collect: m => ({ isOver: m.isOver() }),
  }));
  drop(ref);

  return (
    <div className="relative flex justify-center select-none">
      {/* ── table graphic; colour follows the active theme variable ── */}
      <TableSvg
  width={TABLE_W}
  /* table inherits border colour, lamp stand uses --lamp-clr below */
 className="w-[20vw] max-w-[700px] text-[var(--color-border)]"
  style={{ '--lamp-clr': 'var(--color-primary)' }}   // 👈 independent colour
/>

      {/* ── invisible drop target over the tabletop ── */}
      <div
        ref={ref}
        style={{ position:'absolute', top:TOP_Y, width:3*TABLE_W, height:3*TOP_H }}
        className={isOver ? 'ring-4 ring-primary/5 rounded-md w-[5vw] ' : ''}
      />
    </div>
  );
}
