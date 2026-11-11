import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || '';
        setCursorType(type);
        setCursorText(text);
        return;
      }

      if (e.target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center dot in deep emerald */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-forest-900 shadow-sm"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'product' ? 0 : 5,
          height: cursorType === 'product' ? 0 : 5,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer follower in luxury gold */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center transition-colors duration-200 ${
          cursorType === 'product'
            ? 'bg-gold-500 text-forest-950 font-bold shadow-luxury-hover border border-gold-600'
            : cursorType === 'hover'
            ? 'border-2 border-forest-900 bg-gold-400/15'
            : 'border border-gold-600/70 bg-transparent'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorType === 'product' ? 68 : cursorType === 'hover' ? 44 : 26,
          height: cursorType === 'product' ? 68 : cursorType === 'hover' ? 44 : 26,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      >
        {cursorType === 'product' && (
          <span className="text-[10px] font-bold tracking-wider uppercase font-sans select-none text-forest-950">
            {cursorText || 'Specs'}
          </span>
        )}
      </motion.div>
    </>
  );
}
