import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const TiltCard = ({ children, onClick, bgImage, ...props }) => {
  const ref = useRef(null);
  const { setCursorState } = usePortfolio();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setCursorState('default');
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setCursorState('hover');
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        position: 'relative',
        cursor: 'none',
        ...props.style
      }}
      className={props.className}
    >
      <div 
        style={{
           width: '100%', height: '100%', 
           background: bgImage.startsWith('rgba') ? bgImage : `url(${bgImage}) center/cover no-repeat`,
           transform: "translateZ(40px)", // Popping effect!
           display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
           borderRadius: 'inherit',
           position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', borderRadius: 'inherit' }} />
        <div style={{ transform: "translateZ(60px)", zIndex: 1 }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default TiltCard;
