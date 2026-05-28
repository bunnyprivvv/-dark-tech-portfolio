import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

import CortexTrendSandbox from '../deployments/CortexTrendSandbox';

const Sandbox = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCursorState } = usePortfolio();
  
  useEffect(() => {
    // Disable scrolling when in sandbox
    document.body.style.overflow = 'hidden';
    const oldBg = document.body.style.background;
    document.body.style.background = '#000';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.background = oldBg;
    };
  }, []);

  const renderSandbox = () => {
    switch(id) {
      case '2': return <CortexTrendSandbox />;
      default: return <div style={{color: 'red'}}>System Error: Deployment Corrupted</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999, // Overlay absolute everything!
        background: '#050505', // Pitch black sandbox base
      }}
    >
      <button 
        onClick={() => navigate('/')}
        onMouseEnter={() => setCursorState('hover')}
        onMouseLeave={() => setCursorState('default')}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 999999,
          background: 'rgba(0, 230, 255, 0.1)',
          border: '1px solid rgba(0, 230, 255, 0.3)',
          color: '#00E6FF',
          padding: '0.8rem 1.5rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-heading)',
          transition: 'all 0.3s ease'
        }}
        className="hover-effect"
      >
        <X size={18} /> Back to Home
      </button>

      {renderSandbox()}
    </motion.div>
  );
};

export default Sandbox;
