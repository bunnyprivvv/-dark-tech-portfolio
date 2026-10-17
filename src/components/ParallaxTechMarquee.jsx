import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, Terminal, Zap, Shield, Layers, Globe, Radio, Code2 } from 'lucide-react';

const layer1 = [
  { name: 'React 19', tag: 'UI Architecture', icon: <Code2 size={16} />, color: '#00F0FF' },
  { name: 'Ollama AI', tag: 'Local LLM Inference', icon: <Cpu size={16} />, color: '#FF6B00' },
  { name: 'Three.js / WebGL', tag: '60FPS 3D Shaders', icon: <Layers size={16} />, color: '#00F0FF' },
  { name: 'Go (Golang)', tag: 'Low-Latency Microservices', icon: <Terminal size={16} />, color: '#00F0FF' },
];

const layer2 = [
  { name: 'WebSockets', tag: 'Real-Time State Telemetry', icon: <Radio size={16} />, color: '#FF6B00' },
  { name: 'Python / Uvicorn', tag: 'Diagnostic ML Engines', icon: <Zap size={16} />, color: '#00F0FF' },
  { name: 'Framer Motion', tag: 'Hardware Physics', icon: <Layers size={16} />, color: '#FF6B00' },
  { name: 'Zero-Trust CSP', tag: 'Cryptographic Hardening', icon: <Shield size={16} />, color: '#00F0FF' },
];

const layer3 = [
  { name: 'Node.js & Express', tag: 'Secure API Gateways', icon: <Globe size={16} />, color: '#00F0FF' },
  { name: 'Vite 8.0', tag: 'Bleeding-Edge Bundling', icon: <Zap size={16} />, color: '#FF6B00' },
  { name: 'Docker & Microclusters', tag: 'Fault-Tolerant Nodes', icon: <Shield size={16} />, color: '#00F0FF' },
  { name: 'Post-Quantum TLS', tag: 'Anti-Intercept Channels', icon: <Terminal size={16} />, color: '#FF6B00' },
];

const ParallaxTechMarquee = () => {
  const containerRef = useRef(null);
  const { setCursorState, playSynthSound } = usePortfolio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 3 distinct layers moving at different parallax speeds (inspired by Ollivere's client logo layers)
  const yFast = useTransform(smoothProgress, [0, 1], [60, -90]);
  const yMedium = useTransform(smoothProgress, [0, 1], [20, -50]);
  const ySlow = useTransform(smoothProgress, [0, 1], [-20, 40]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '8rem 2rem',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, transparent, rgba(13, 17, 26, 0.6) 50%, transparent)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Ollivere-style candid, punchy manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '850px', margin: '0 auto 4.5rem auto' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            background: 'rgba(0, 240, 255, 0.06)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            color: 'var(--color-neon-blue)',
            fontSize: '0.82rem',
            fontWeight: 600,
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-neon-blue)', boxShadow: '0 0 8px var(--color-neon-blue)' }} />
            LAYERED ARCHITECTURAL ECOSYSTEM
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: '1.35',
            fontWeight: 500,
            color: '#F3F4F6',
            letterSpacing: '-0.02em',
          }}>
            Building high-frequency digital experiences, reactive spaces, and intelligent machine systems with <span style={{ color: 'var(--color-neon-blue)' }}>zero nonsense</span> and uncompromising performance.
          </h2>
        </motion.div>

        {/* 3D-feel parallax floating matrix */}
        <motion.div style={{ opacity }} className="relative flex flex-col gap-6 items-center">
          {/* Layer 1 - High Parallax */}
          <motion.div 
            style={{ y: yFast, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%' }}
          >
            {layer1.map((item, idx) => (
              <TechPill key={idx} item={item} setCursorState={setCursorState} playSynthSound={playSynthSound} highlight />
            ))}
          </motion.div>

          {/* Layer 2 - Medium Parallax */}
          <motion.div 
            style={{ y: yMedium, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', width: '100%' }}
          >
            {layer2.map((item, idx) => (
              <TechPill key={idx} item={item} setCursorState={setCursorState} playSynthSound={playSynthSound} />
            ))}
          </motion.div>

          {/* Layer 3 - Subtle Parallax */}
          <motion.div 
            style={{ y: ySlow, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%' }}
          >
            {layer3.map((item, idx) => (
              <TechPill key={idx} item={item} setCursorState={setCursorState} playSynthSound={playSynthSound} />
            ))}
          </motion.div>
        </motion.div>

        <p style={{
          marginTop: '3.5rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.95rem',
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
        }}>
          [SCROLL VELOCITY SYNCS DEPTH ACCELERATION]
        </p>
      </div>
    </section>
  );
};

const TechPill = ({ item, setCursorState, playSynthSound, highlight = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      onMouseEnter={() => {
        setCursorState('hover');
        playSynthSound('hover');
      }}
      onMouseLeave={() => setCursorState('default')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.4rem',
        borderRadius: '12px',
        background: highlight ? 'rgba(16, 22, 36, 0.9)' : 'rgba(12, 16, 26, 0.75)',
        border: `1px solid ${highlight ? 'rgba(0, 240, 255, 0.35)' : 'rgba(255, 255, 255, 0.08)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow: highlight ? '0 8px 30px rgba(0, 240, 255, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
      }}
    >
      <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
        {item.icon}
      </span>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
          {item.name}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
          {item.tag}
        </div>
      </div>
    </motion.div>
  );
};

export default ParallaxTechMarquee;
