import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [activeService, setActiveService] = useState(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'drag', etc.
  const [systemTheme, setSystemTheme] = useState('neon-blue'); // 'neon-blue' or 'neon-red'

  // Web Audio Synth Core for Futuristic UI Sounds (Zero-Weight, Zero-Asset Chimes)
  const playSynthSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'glitch') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.22);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.22);
        
        const fm = ctx.createOscillator();
        const fmGain = ctx.createGain();
        fm.frequency.setValueAtTime(40, now);
        fmGain.gain.setValueAtTime(120, now);
        fm.connect(fmGain);
        fmGain.connect(osc.frequency);
        
        fm.start(now);
        fm.stop(now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by user interaction gesture policy:", e);
    }
  };

  const toggleSystemTheme = () => {
    const nextTheme = systemTheme === 'neon-blue' ? 'neon-red' : 'neon-blue';
    setSystemTheme(nextTheme);
    playSynthSound('glitch');
    
    // Update global CSS root variable values dynamically
    const root = document.documentElement;
    if (nextTheme === 'neon-red') {
      root.style.setProperty('--color-neon-blue', '#FF2A54'); // Cyber Emergency Red
      root.style.setProperty('--theme-glow', 'rgba(255, 42, 84, 0.4)');
    } else {
      root.style.setProperty('--color-neon-blue', '#00E6FF'); // Cyber Classic Blue
      root.style.setProperty('--theme-glow', 'rgba(0, 230, 255, 0.3)');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        activeService,
        setActiveService,
        cursorState,
        setCursorState,
        systemTheme,
        toggleSystemTheme,
        playSynthSound
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
