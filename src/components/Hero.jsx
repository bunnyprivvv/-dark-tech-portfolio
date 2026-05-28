import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import TerminalCLI from './TerminalCLI';

const Hero = () => {
  const { setCursorState, systemTheme, toggleSystemTheme, playSynthSound } = usePortfolio();

  return (
    <section className="container py-20 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
      >
        <h1 
          className="text-glow" 
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1', maxWidth: '900px' }}
        >
          Hi, I'm <br/> <span className="text-neon">Shagun</span>.
        </h1>
        <p className="mt-12" style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', maxWidth: '700px', lineHeight: '1.6' }}>
          Full-Stack Developer & AI Engineer. Specializing in the intersection of high-performance architecture and intelligent machine systems to solve complex industrial and medical challenges.
        </p>
        
        <div className="mt-12 flex gap-4 flex-wrap">
          <button
            onClick={() => {
              playSynthSound('click');
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => {
              setCursorState('hover');
              playSynthSound('hover');
            }}
            onMouseLeave={() => setCursorState('default')}
            style={{ 
              padding: '1.2rem 2.5rem', 
              background: 'var(--color-neon-blue)', 
              color: 'var(--color-bg)',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 0 15px var(--theme-glow)'
            }}
          >
            Recent Projects
          </button>
          
          <button
            onClick={() => {
              playSynthSound('click');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => {
              setCursorState('hover');
              playSynthSound('hover');
            }}
            onMouseLeave={() => setCursorState('default')}
            className="glass"
            style={{ 
              padding: '1.2rem 2.5rem', 
              color: 'var(--color-text)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '500',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            Initialize Contact
          </button>

          {/* System Override Theme Toggler */}
          <button
            onClick={toggleSystemTheme}
            onMouseEnter={() => {
              setCursorState('hover');
              playSynthSound('hover');
            }}
            onMouseLeave={() => setCursorState('default')}
            className="glass"
            style={{ 
              padding: '1.2rem 2.5rem', 
              color: systemTheme === 'neon-red' ? '#00E6FF' : '#FF2A54',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: systemTheme === 'neon-red' ? '1px solid #00E6FF' : '1px solid #FF2A54',
              boxShadow: systemTheme === 'neon-red' ? '0 0 15px rgba(0, 230, 255, 0.15)' : '0 0 15px rgba(255, 42, 84, 0.15)',
              background: 'rgba(0,0,0,0.4)',
              cursor: 'none'
            }}
          >
            {systemTheme === 'neon-blue' ? '⚠️ SYSTEM OVERRIDE' : '🟢 RESTORE MATRIX'}
          </button>
        </div>
        
        <TerminalCLI />
        
      </motion.div>
    </section>
  );
};

export default Hero;
