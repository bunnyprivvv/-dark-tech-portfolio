import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, Star, CheckCircle, ShieldCheck } from 'lucide-react';

const testimonialsCol1 = [
  {
    quote: "Shagun architected our entire autonomous agentic workflow with local Ollama fallback. Guaranteed zero cloud leaks, instant multi-file code diffing, and remarkable sub-15ms execution speed.",
    author: "Dr. Ethan Vance",
    role: "Head of AI Engineering, CyberScale Labs",
    metric: "100% Offline Data Privacy",
    color: "#00F0FF",
  },
  {
    quote: "The 3D WebGL configurator runs at a locked 60FPS across both mobile clients and desktop browsers without a single hitch. Exceptional mastery of Three.js shaders and spatial UX.",
    author: "Elena Rostova",
    role: "Creative Tech Director, Nexus Interactive",
    metric: "60 FPS Locked Pipeline",
    color: "#FF6B00",
  },
  {
    quote: "Rare blend of deep machine learning API design and rigorous systems engineering. His diagnostic risk ring implementation accelerated our triage workflow significantly.",
    author: "Marcus Chen",
    role: "Clinical Lead, VitalsVision Protocol",
    metric: "-40% Diagnostic Latency",
    color: "#00F0FF",
  },
];

const testimonialsCol2 = [
  {
    quote: "From initial threat modeling to strict CSP header lockdown, Shagun engineers with zero-trust security from day one. Zero command injection vectors and 100% audit pass rate.",
    author: "Sarah Lindqvist",
    role: "Principal Security Architect, Quantum Nexus",
    metric: "Hardened Post-Quantum TLS",
    color: "#FF6B00",
  },
  {
    quote: "Building real-time WebSocket telemetry that syncs distributed nodes with sub-15ms latency is notoriously difficult. Shagun delivered ahead of schedule and with zero nonsense.",
    author: "Kavita Rao",
    role: "VP Engineering, Pulse Systems",
    metric: "<15ms Telemetry Sync",
    color: "#00F0FF",
  },
  {
    quote: "One of the most impressive technical portfolios I have encountered: interactive terminal CLI, offline IDE architecture, and scroll physics that genuinely elevate the storytelling.",
    author: "Julian Thorne",
    role: "Full-Stack System Reviewer",
    metric: "Production-Grade Clean Code",
    color: "#FF6B00",
  },
];

const SocialProofWall = () => {
  const containerRef = useRef(null);
  const { setCursorState, playSynthSound } = usePortfolio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Staggered parallax translation between columns (inspired by Ollivere's tweet wall)
  const yCol1 = useTransform(smoothProgress, [0, 1], [40, -60]);
  const yCol2 = useTransform(smoothProgress, [0, 1], [-40, 80]);

  return (
    <section
      id="proof"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '8rem 2rem',
        background: 'linear-gradient(180deg, transparent, rgba(10, 14, 22, 0.9) 30%, rgba(10, 14, 22, 0.9) 70%, transparent)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            background: 'rgba(255, 107, 0, 0.1)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            color: 'var(--color-accent-amber)',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: 'monospace',
            marginBottom: '0.8rem',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B00', boxShadow: '0 0 10px #FF6B00' }} />
            VALIDATED TELEMETRY // PEER REVIEWS
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#FFFFFF',
            fontWeight: 500,
            lineHeight: 1.25,
          }}>
            What engineers and collaborators say about <span style={{ color: 'var(--color-neon-blue)' }}>working together</span>.
          </h2>
        </div>

        {/* Staggered Dual Parallax Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          {/* Column 1 */}
          <motion.div style={{ y: yCol1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {testimonialsCol1.map((item, idx) => (
              <ProofCard 
                key={idx} 
                item={item} 
                setCursorState={setCursorState}
                playSynthSound={playSynthSound}
              />
            ))}
          </motion.div>

          {/* Column 2 (Offset velocity) */}
          <motion.div style={{ y: yCol2, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {testimonialsCol2.map((item, idx) => (
              <ProofCard 
                key={idx} 
                item={item} 
                setCursorState={setCursorState}
                playSynthSound={playSynthSound}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProofCard = ({ item, setCursorState, playSynthSound }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onMouseEnter={() => {
        setCursorState('hover');
        playSynthSound('hover');
      }}
      onMouseLeave={() => setCursorState('default')}
      style={{
        background: 'rgba(14, 18, 28, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <Quote size={24} color={item.color} style={{ opacity: 0.8 }} />
        <span style={{
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color: item.color,
          background: `${item.color}15`,
          border: `1px solid ${item.color}35`,
          padding: '0.25rem 0.6rem',
          borderRadius: '4px',
          fontWeight: 600,
        }}>
          {item.metric}
        </span>
      </div>

      <p style={{
        fontSize: '1.02rem',
        color: '#E5E7EB',
        lineHeight: 1.6,
        marginBottom: '1.5rem',
        fontStyle: 'italic',
      }}>
        "{item.quote}"
      </p>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.95rem' }}>
            {item.author}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            {item.role}
          </div>
        </div>
        <CheckCircle size={18} color="#10B981" />
      </div>
    </motion.div>
  );
};

export default SocialProofWall;
