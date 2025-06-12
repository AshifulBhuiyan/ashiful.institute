import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Book from './Book.jsx';
import TableZone from './TableZone.jsx';
import DragPreviewLayer from './DragPreviewLayer.jsx';

/* ───────────────── helper: pick spaced positions ─────────────── */
function randomLeftPositions(count, minGapPct = 10) {
  const chosen = [];
  const tries  = 300;
  while (chosen.length < count && chosen.length < tries) {
    const c = Math.random() * 90 + 1;            // 1 – 91 %
    if (chosen.every(p => Math.abs(p - c) >= minGapPct)) {
      chosen.push(c);
    }
  }
  return chosen;
}

/* ───────────────── featured books (with glow) ────────────────── */
const BASE_BOOKS = [
  { id:'math',    title:'MathCodes',    icon:'/assets/books/mathcodes.svg',    link:'https://mathcodes.org/',   glow:true },
  { id:'gift',    title:'Gifted Center',icon:'/assets/books/giftedcenter.svg', link:'https://giftedcenter.org/',glow:true },
  { id:'about',   title:'About Us',     icon:'/assets/books/ai-book.svg',      link:'/about',       glow:true },
  { id:'contact', title:'Contact Us',   icon:'/assets/books/contact.svg',      link:'/contact',     glow:true },
];

/* scatter with 12 % gap */
const gapPct  = 12;
const leftArr = randomLeftPositions(BASE_BOOKS.length, gapPct);

const INITIAL_POS = BASE_BOOKS.map((b, i) => ({
  ...b,
  left  : `${leftArr[i]}%`,
  rotate: `${Math.random()*20 - 10}deg`,
}));

/* ───────────────── decorative rectangles ─────────────────────── */
const randomRects = Array.from({ length: 25 }, () => ({
  color : `hsl(${Math.random()*360},70%,65%)`,
  left  : `${Math.random()*90 + 1}%`,
  rotate: `${Math.random()*30 - 15}deg`,
}));

/* ───────────────── component ─────────────────────────────────── */
export default function InteractiveBookshelf() {
  const [books, setBooks] = useState(INITIAL_POS);

  const handleBookDrop = useCallback((id, link) => {
    setBooks(bs => bs.map(b => (b.id === id ? { ...b, dropped:true } : b)));
    setTimeout(() => window.open(link, '_blank'), 300);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative w-full min-h-[400px] bg-[url('/assets/footer/graphpaper.svg')] bg-repeat rounded-t-xl overflow-hidden">

        {/* decorative rectangles */}
        {randomRects.map((r, i) => (
          <svg key={i} viewBox="0 0 48 60"
               className="absolute opacity-40 pointer-events-none w-[clamp(42px,3vw,64px)] h-auto"
               style={{ left: r.left, bottom: 0, transform:`rotate(${r.rotate})` }}>
            <rect width="48" height="60" rx="4" ry="4" fill={r.color} />
          </svg>
        ))}

        {/* drop zone on the floor */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <TableZone onBookDrop={item => handleBookDrop(item.id, item.link)} />
        </div>

        {/* scattered, draggable books */}
        {books.map(b => (
          <Book
            key={b.id}
            {...b}
            onDropped={b.dropped}
            left={b.left}
            bottom="0px"
            rotate={b.rotate}
            className="w-[clamp(42px,7vw,64px)] h-auto"
          />
        ))}

        <DragPreviewLayer />
      </div>
    </DndProvider>
  );
}
