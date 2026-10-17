import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Bot, Box, Server, ShieldCheck, Laptop, Cpu, Radio, ChevronRight, Gauge } from 'lucide-react';

const trainCars = [
  {
    type: 'engine',
    code: 'LOCO_01',
    title: 'SHAGUN_CORE',
    subtitle: 'Autonomous Systems Engine',
    desc: 'Dual-core orchestrator driving reactive state loops and low-latency client pipelines.',
    specs: ['THRUST: 100% LOCAL', 'CLOCK: 60FPS LOCKED', 'POWER: OLLAMA+VITE'],
    icon: <Gauge size={28} />,
    color: '#00F0FF',
    accent: '#FF6B00',
  },
  {
    type: 'carriage',
    code: 'CAR_01',
    title: 'Agentic ReAct AI Pipelines',
    subtitle: 'Autonomous Tool-Calling Architecture',
    desc: 'Local and cloud agent chains executing planning, tool selection, multi-file code diffing, and automated QA loops.',
    specs: ['Ollama LLMs', 'DAG Planners', 'Memory Trees', 'CVE Auditing'],
    icon: <Bot size={28} />,
    color: '#00F0FF',
  },
  {
    type: 'carriage',
    code: 'CAR_02',
    title: '3D WebGL & Interactive Shaders',
    subtitle: 'Industrial Visual Configurator',
    desc: 'Translating conceptual CAD & industrial telemetry into high-performance Three.js scenes, particle systems, and Spline 3D pipelines.',
    specs: ['Three.js', 'Spline Runtime', 'GLSL Shaders', 'Mobile 60FPS'],
    icon: <Box size={28} />,
    color: '#FF6B00',
  },
  {
    type: 'carriage',
    code: 'CAR_03',
    title: 'Distributed Microservices & Go',
    subtitle: 'High-Concurrency Backends',
    desc: 'Fault-tolerant microservice nodes designed with Go and Node.js. Sub-15ms throughput across real-time data ingestion layers.',
    specs: ['Go (Golang)', 'Node.js Express', 'REST & gRPC', 'Cluster Resiliency'],
    icon: <Server size={28} />,
    color: '#00F0FF',
  },
  {
    type: 'carriage',
    code: 'CAR_04',
    title: 'Zero-Trust Protocols & Hardening',
    subtitle: 'Security & Integrity Gateway',
    desc: 'Strict Content Security Policies (CSP), tokenized Web3 communications, and cryptographic shielding mitigating intercept vectors.',
    specs: ['Hardened CSP', 'Anti-XSS/CSRF', 'Token Relays', 'TLS Gateway'],
    icon: <ShieldCheck size={28} />,
    color: '#FF6B00',
  },
  {
    type: 'carriage',
    code: 'CAR_05',
    title: 'Offline Desktop IDE Architecture',
    subtitle: 'Zero-Leak Developer Suites',
    desc: 'Complete offline developer platforms with local file watchers, terminal command execution, and live UI preview with zero external transmission.',
    specs: ['Zero Cloud Leak', 'AST Diff Synthesizer', 'Local WebSocket Bridge', 'Framer UI'],
    icon: <Laptop size={28} />,
    color: '#00F0FF',
  },
  {
    type: 'carriage',
    code: 'CAR_06',
    title: 'Low-Latency WebSockets & Telemetry',
    subtitle: 'Synchronized State Trees',
    desc: 'Bidirectional streaming channels pushing real-time medical risk scores, market sentiment feeds, and live node heartbeats.',
    specs: ['<15ms Sync', 'Socket.io & Native WS', 'Binary Packing', 'Auto-Reconnect'],
    icon: <Radio size={28} />,
    color: '#FF6B00',
  },
  {
    type: 'caboose',
    code: 'CABOOSE_END',
    title: 'QUANTUM TELEMETRY UNIT',
    subtitle: 'Continuous QA & Health Monitor',
    desc: 'End-of-train diagnostic beacon continuously pinging node health and structural integrity across the system.',
    specs: ['UPTIME: 99.98%', 'ZERO CODE DRIFT', 'STATUS: NOMINAL'],
    icon: <Cpu size={28} />,
    color: '#00F0FF',
  }
];

const ScrollSkillsTrain = () => {
  const containerRef = useRef(null);
  const { setCursorState, playSynthSound } = usePortfolio();

  // Scroll tracking across the sticky height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out the scroll translation for butter-smooth scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  });

  // Translate the train horizontally from right to left
  const trainX = useTransform(smoothProgress, [0, 1], ['2%', '-75%']);
  const trackGlow = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.8, 0.4]);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      style={{
        position: 'relative',
        height: '350vh', // Provides ample scroll distance to scrub the train
        background: '#080A10',
      }}
    >
      {/* Sticky container that stays locked on screen during scroll */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {/* Intro Header (inspired by Ollivere's graffiti train intro) */}
        <div className="container" style={{ marginBottom: '2rem', position: 'relative', zIndex: 12 }}>
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
            NEURAL FREIGHT // CONTINUOUS SKILLS CONVOY
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
              color: '#FFFFFF',
              maxWidth: '750px',
              fontWeight: 500,
              lineHeight: 1.25,
            }}>
              I've engineered an unusually versatile technical arsenal across <span style={{ color: 'var(--color-neon-blue)' }}>Autonomous AI</span>, <span style={{ color: '#FF6B00' }}>3D WebGL</span>, and distributed systems.
            </h2>

            <div style={{
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: 'var(--color-neon-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(0, 240, 255, 0.08)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(0, 240, 255, 0.25)',
            }}>
              <span>SCROLL TO MOVE TRAIN</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* The Rolling Convoy Window */}
        <div style={{ position: 'relative', width: '100%', overflow: 'visible', padding: '1rem 0' }}>
          <motion.div
            style={{
              x: trainX,
              display: 'flex',
              alignItems: 'flex-end',
              gap: '2.5rem',
              paddingLeft: '4vw',
              width: 'max-content',
              cursor: 'grab',
            }}
          >
            {trainCars.map((car, index) => (
              <TrainCarCard 
                key={index} 
                car={car} 
                setCursorState={setCursorState}
                playSynthSound={playSynthSound}
              />
            ))}
          </motion.div>

          {/* Glowing Cyber Rail Tracks */}
          <div style={{ position: 'relative', marginTop: '1.5rem', width: '100%', height: '36px' }}>
            {/* Top rail */}
            <motion.div 
              style={{
                height: '3px',
                background: 'linear-gradient(90deg, #00F0FF, #FF6B00, #00F0FF)',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)',
                opacity: trackGlow,
                width: '100%',
              }} 
            />
            
            {/* Rail Sleepers / Ties */}
            <div style={{
              height: '14px',
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 32px)',
              margin: '3px 0',
            }} />

            {/* Bottom rail */}
            <motion.div 
              style={{
                height: '3px',
                background: 'linear-gradient(90deg, #FF6B00, #00F0FF, #FF6B00)',
                boxShadow: '0 0 15px rgba(255, 107, 0, 0.8)',
                opacity: trackGlow,
                width: '100%',
              }} 
            />
          </div>
        </div>

        {/* Scroll Progress Meter along bottom of sticky section */}
        <div className="container" style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            CONVOY PROGRESS
          </span>
          <div style={{ flex: 1, height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div 
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00F0FF, #FF6B00)',
                scaleX: smoothProgress,
                transformOrigin: '0%',
              }}
            />
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-neon-blue)' }}>
            8 CARS CONNECTED
          </span>
        </div>
      </div>
    </section>
  );
};

const TrainCarCard = ({ car, setCursorState, playSynthSound }) => {
  const isEngine = car.type === 'engine';
  const isCaboose = car.type === 'caboose';

  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      onMouseEnter={() => {
        setCursorState('hover');
        playSynthSound('hover');
      }}
      onMouseLeave={() => setCursorState('default')}
      style={{
        width: isEngine ? '460px' : isCaboose ? '420px' : '400px',
        background: isEngine ? 'rgba(18, 24, 38, 0.95)' : 'rgba(13, 17, 26, 0.9)',
        border: `1.5px solid ${isEngine ? '#00F0FF' : isCaboose ? '#FF6B00' : 'rgba(0, 240, 255, 0.25)'}`,
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(20px)',
        boxShadow: isEngine 
          ? '0 15px 40px rgba(0, 240, 255, 0.2), inset 0 0 25px rgba(0, 240, 255, 0.05)'
          : '0 10px 30px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '340px',
      }}
    >
      {/* Coupler visual on sides */}
      <div style={{
        position: 'absolute',
        right: '-2.5rem',
        bottom: '30px',
        width: '2.5rem',
        height: '12px',
        background: 'linear-gradient(90deg, #00F0FF, rgba(0, 240, 255, 0.2))',
        boxShadow: '0 0 8px #00F0FF',
        display: isCaboose ? 'none' : 'block',
      }} />

      {/* Card Header & Code */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              color: car.color,
              background: 'rgba(0, 240, 255, 0.08)',
              padding: '0.6rem',
              borderRadius: '10px',
              border: `1px solid ${car.color}40`,
              display: 'flex',
              alignItems: 'center',
            }}>
              {car.icon}
            </div>
            <div>
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: car.color, letterSpacing: '0.1em' }}>
                {car.code}
              </span>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {car.subtitle}
              </div>
            </div>
          </div>

          {/* Engine indicator */}
          {isEngine && (
            <span style={{
              background: 'rgba(0, 240, 255, 0.2)',
              color: '#00F0FF',
              fontSize: '0.7rem',
              fontFamily: 'monospace',
              fontWeight: 700,
              padding: '0.3rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid #00F0FF',
            }}>
              LEAD LOCOMOTIVE
            </span>
          )}
        </div>

        <h3 style={{
          fontSize: '1.45rem',
          fontWeight: 600,
          color: '#FFFFFF',
          marginBottom: '0.8rem',
          lineHeight: 1.25,
        }}>
          {car.title}
        </h3>

        <p style={{
          fontSize: '0.92rem',
          color: 'rgba(255, 255, 255, 0.75)',
          lineHeight: 1.55,
          marginBottom: '1.5rem',
        }}>
          {car.desc}
        </p>
      </div>

      {/* Tech Specifications Grid */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '8px',
        padding: '0.8rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.5rem',
      }}>
        {car.specs.map((spec, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: car.color }} />
            {spec}
          </div>
        ))}
      </div>

      {/* Wheels underneath */}
      <div style={{
        position: 'absolute',
        bottom: '-12px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{ width: '24px', height: '12px', background: '#202838', borderRadius: '0 0 12px 12px', border: '1px solid #00F0FF' }} />
        <div style={{ width: '24px', height: '12px', background: '#202838', borderRadius: '0 0 12px 12px', border: '1px solid #00F0FF' }} />
        <div style={{ width: '24px', height: '12px', background: '#202838', borderRadius: '0 0 12px 12px', border: '1px solid #00F0FF' }} />
      </div>
    </motion.div>
  );
};

export default ScrollSkillsTrain;
