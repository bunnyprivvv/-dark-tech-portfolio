import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import TerminalCLI from './TerminalCLI';

const Hero = () => {
  const { setCursorState, playSynthSound } = usePortfolio();

  return (
    <section className="container py-20 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', padding: '0.35rem 0.85rem', borderRadius: '20px', color: 'var(--color-neon-blue)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', fontFamily: 'monospace' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-neon-blue)', boxShadow: '0 0 8px var(--color-neon-blue)' }}></span>
          SYSTEM PROTOCOL &bull; AVAILABLE FOR ARCHITECTURAL CONSULTING
        </div>

        <h1 
          className="text-glow" 
          style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: '1.08', maxWidth: '900px', color: '#ffffff' }}
        >
          Hi, I'm <br/> <span className="text-neon" style={{ background: 'linear-gradient(135deg, #00F0FF 20%, #00C6FF 60%, #FF6B00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shagun Dutt Sharma</span>.
        </h1>
        
        <p className="mt-12" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.25rem', maxWidth: '750px', lineHeight: '1.65' }}>
          Full-Stack Developer & AI Engineer. Specializing in high-performance WebGL architectures, secure microservice backends, and intelligent AI systems.
        </p>
        
        {/* Primary CTAs & Social Links */}
        <div className="mt-12 flex gap-4 flex-wrap items-center">
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
              padding: '1rem 2.2rem', 
              background: 'linear-gradient(135deg, #00F0FF, #0077B6)', 
              color: '#080A10',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontSize: '1.05rem',
              transition: 'all 0.3s ease',
              border: 'none',
              boxShadow: '0 4px 25px rgba(0, 240, 255, 0.45)',
              cursor: 'pointer'
            }}
          >
            Explore Projects 🚀
          </button>
          
          <a
            href="https://github.com/bunnyprivvv"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ 
              padding: '1rem 1.8rem', 
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub Profile
          </a>

          <a
            href="https://www.linkedin.com/in/shagunduttsharma"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ 
              padding: '1rem 1.8rem', 
              background: 'linear-gradient(135deg, #0077b5, #00a0dc)', 
              color: '#ffffff',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '1rem',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(0, 119, 181, 0.35)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/></svg>
            LinkedIn Profile
          </a>
        </div>
        
        <TerminalCLI />
      </motion.div>
    </section>
  );
};

export default Hero;
