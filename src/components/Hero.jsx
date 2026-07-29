import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Left Column: Bio, Actions & Terminal */}
        <div style={{ minWidth: 0 }}>
          <h1 
            className="text-glow" 
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: '1' }}
          >
            Hi, I'm <br/> <span className="text-neon">Shagun</span>.
          </h1>
          <p className="mt-12" style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', lineHeight: '1.6' }}>
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
                color: '#ffffff',
                borderRadius: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                border: 'none',
                boxShadow: '0 0 15px var(--theme-glow)',
                cursor: 'pointer'
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
                border: '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
            >
              Initialize Contact
            </button>
          </div>
          
          <TerminalCLI />
        </div>

        {/* Right Column: Featured Interactive 3D Spline Pipeline Model Showcase Card */}
        <div 
          className="glass" 
          style={{ 
            borderRadius: '20px', 
            overflow: 'hidden', 
            padding: '1.5rem',
            border: '1px solid var(--color-glass-border)',
            background: 'var(--color-glass-bg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            minHeight: '480px'
          }}
        >
          {/* Top Status Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
              <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>3D PIPELINE MATRIX CORE</span>
            </div>
            <span>SPLINE 3D ENGINE</span>
          </div>

          {/* Interactive Spline 3D Viewport */}
          <div style={{ width: '100%', height: '380px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: 'rgba(0,0,0,0.03)' }}>
            <Suspense fallback={
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                <span>Loading 3D Interactive Pipeline...</span>
              </div>
            }>
              <Spline 
                scene="https://prod.spline.design/FkXfppfybo8wiC-r/scene.splinecode" 
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
          </div>

          {/* Footer Guide Banner */}
          <div style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--color-neon-blue)', fontWeight: '500', fontFamily: 'monospace' }}>
            🖱️ Interactive 3D Model • Click & Drag to Rotate / Hover to Inspect
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Hero;
