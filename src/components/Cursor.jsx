import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { usePortfolio } from '../context/PortfolioContext';

const Cursor = () => {
  const { x, y } = useMousePosition();
  const { cursorState } = usePortfolio();

  // Offset cursor to center it exactly on the pointer tip
  const size = cursorState === 'hover' ? 40 : 20;

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: cursorState === 'hover' ? 'var(--color-neon-glow-20)' : 'var(--color-neon-blue)',
        border: cursorState === 'hover' ? '1px solid var(--color-neon-blue)' : 'none',
        pointerEvents: 'none', // Critical so it doesn't block clicks!
        zIndex: 9999999, // Must be above sandbox overlay (99999)
        // Centering calculation using translate
        x: x - size / 2,
        y: y - size / 2,
      }}
      animate={{
        width: size,
        height: size,
      }}
      transition={{
        type: 'spring',
        stiffness: 800,
        damping: 35,
        mass: 0.08,
      }}
    />
  );
};

export default Cursor;
