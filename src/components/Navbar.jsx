import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar = () => {
  const { setCursorState, playSynthSound } = usePortfolio();

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(15, 19, 28, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.9rem 2rem',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a 
          href="/"
          onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
          onMouseLeave={() => setCursorState('default')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.4rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-neon-blue)', boxShadow: '0 0 10px var(--color-neon-blue)' }}></span>
          SHAGUN<span style={{ color: 'var(--color-neon-blue)' }}>_OS</span>
        </a>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              playSynthSound('click');
              document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
          >
            Skills Convoy
          </a>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              playSynthSound('click');
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
          >
            Projects
          </a>

          <a
            href="#pipeline"
            onClick={(e) => {
              e.preventDefault();
              playSynthSound('click');
              document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
          >
            Pipeline
          </a>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              playSynthSound('click');
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
          >
            Capacities
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playSynthSound('click');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
            onMouseLeave={() => setCursorState('default')}
            style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
          >
            Contact
          </a>

          {/* Social Links: GitHub & LinkedIn */}
          <div style={{ display: 'flex', gap: '0.6rem', marginLeft: '0.5rem' }}>
            <a
              href="https://github.com/bunnyprivvv"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
              onMouseLeave={() => setCursorState('default')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/shagunduttsharma"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => { setCursorState('hover'); playSynthSound('hover'); }}
              onMouseLeave={() => setCursorState('default')}
              style={{
                background: 'linear-gradient(135deg, #0077b5, #00a0dc)',
                color: '#ffffff',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(0, 119, 181, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/></svg>
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
