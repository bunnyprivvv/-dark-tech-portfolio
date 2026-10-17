import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const ReactiveCyberEye = () => {
  const { setCursorState, playSynthSound } = usePortfolio();
  const eyeRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [scannerText, setScannerText] = useState('AI CORE SENTINEL // ACTIVE MONITORING');

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      const maxRadius = 24; // Maximum travel radius for pupil
      const clampedDist = Math.min(distance, 300);
      const angle = Math.atan2(deltaY, deltaX);

      const moveRadius = (clampedDist / 300) * maxRadius;
      setPupilOffset({
        x: Math.cos(angle) * moveRadius,
        y: Math.sin(angle) * moveRadius,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Periodic random synthetic blink
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    playSynthSound('success');
    setScannerText('AUTHENTICATED // READY FOR TRANSMISSION');
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
      setTimeout(() => setScannerText('AI CORE SENTINEL // ACTIVE MONITORING'), 3000);
    }, 200);
  };

  return (
    <div style={{ textAlign: 'center', margin: '4rem auto 2rem auto', position: 'relative' }}>
      {/* Interactive Mascot Scanner Container */}
      <div
        ref={eyeRef}
        onClick={handleClick}
        onMouseEnter={() => {
          setCursorState('hover');
          playSynthSound('hover');
        }}
        onMouseLeave={() => setCursorState('default')}
        style={{
          width: '140px',
          height: '140px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {/* Outer Rotating Cyber Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px dashed rgba(0, 240, 255, 0.35)',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
          }}
        />

        {/* Counter-rotating degree ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: '1px dotted rgba(255, 107, 0, 0.4)',
          }}
        />

        {/* Sclera / Eye Socket */}
        <div
          style={{
            width: '90px',
            height: isBlinking ? '4px' : '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #101726 0%, #080A10 100%)',
            border: '2px solid #00F0FF',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'height 0.12s ease-in-out',
          }}
        >
          {/* Tracking Iris & Pupil */}
          {!isBlinking && (
            <motion.div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FF6B00 0%, #00F0FF 70%, #090B10 100%)',
                boxShadow: '0 0 16px rgba(0, 240, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                x: pupilOffset.x,
                y: pupilOffset.y,
                transition: { type: 'spring', stiffness: 220, damping: 20 },
              }}
            >
              {/* Pupil Center & Reticle */}
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#080A10',
                  border: '1.5px solid #00F0FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 6px #FFFFFF' }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Reactive Telemetry readout under eye */}
      <div style={{
        marginTop: '1.2rem',
        fontFamily: 'monospace',
        fontSize: '0.82rem',
        color: 'var(--color-neon-blue)',
        letterSpacing: '0.08em',
      }}>
        {scannerText}
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginTop: '0.2rem' }}>
        [CURSOR-TRACKING RETICLE &bull; CLICK TO RE-CALIBRATE]
      </div>
    </div>
  );
};

export default ReactiveCyberEye;
