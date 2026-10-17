import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Shield, Cpu, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

const phases = [
  {
    step: '01',
    title: 'Architecture Deconstruction & Threat Modeling',
    subtitle: 'System Analysis & Spec Definition',
    desc: 'Dissecting state trees, throughput bottlenecks, security threat vectors, and data pathways before drafting production code.',
    deliverables: ['Zero-Trust Architecture Spec', 'Data Flow Diagrams', 'Threat & Vulnerability Model', 'API Schema Matrix'],
    badge: 'STAGE 1: BLUEPRINT',
    color: '#00F0FF',
    previewType: 'blueprint',
  },
  {
    step: '02',
    title: 'Autonomous ReAct Prototyping & Simulation',
    subtitle: 'Sandbox AI & Loop Verification',
    desc: 'Validating agent loops, tool-calling trees, and prompt DAGs in an isolated sandbox with mock token streams and continuous test assertions.',
    deliverables: ['ReAct Thought Stream Loops', 'Multi-File Diff Engine', 'Mock API Integration', 'Offline Ollama Bridge'],
    badge: 'STAGE 2: SANDBOX',
    color: '#FF6B00',
    previewType: 'terminal',
  },
  {
    step: '03',
    title: 'Production Hardening & Microservice Isolation',
    subtitle: 'Security & Microservice Orchestration',
    desc: 'Enforcing strict Content Security Policies (CSP), cryptographic intercept shielding, TLS gateways, and high-concurrency microservice nodes.',
    deliverables: ['Hardened CSP Meta Headers', 'End-to-End TLS & JWT', 'Microservice Fault Isolation', 'Automated CVE Mitigation'],
    badge: 'STAGE 3: HARDENING',
    color: '#00F0FF',
    previewType: 'security',
  },
  {
    step: '04',
    title: 'Continuous Benchmarking & Quantitative Diagnostics',
    subtitle: 'Performance Tuning & 60FPS Lock',
    desc: 'Stress testing concurrent WebSocket connections, optimizing WebGL shader draw calls for 60FPS on mobile, and locking in sub-15ms throughput.',
    deliverables: ['60FPS WebGL Frame Stability', '<15ms Telemetry Latency', 'Zero Token Leakage', 'Production Vercel Gateways'],
    badge: 'STAGE 4: PRODUCTION',
    color: '#FF6B00',
    previewType: 'metrics',
  },
];

const HowIWorkProcess = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { setCursorState, playSynthSound } = usePortfolio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Track active step based on progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.25) setActiveStep(0);
      else if (latest < 0.5) setActiveStep(1);
      else if (latest < 0.75) setActiveStep(2);
      else setActiveStep(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="pipeline"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '350vh', // Pinned scroll track
        background: '#090B10',
      }}
    >
      {/* Sticky Viewport */}
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
          padding: '2rem 0',
          zIndex: 10,
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section Heading (inspired by Ollivere's How I Work) */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              color: 'var(--color-neon-blue)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              marginBottom: '0.8rem',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }} />
              HOW I WORK // ENGINEERING PIPELINE
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
              color: '#FFFFFF',
              fontWeight: 500,
              lineHeight: 1.2,
            }}>
              Whatever the challenge, I follow the same <span style={{ color: 'var(--color-neon-blue)' }}>rigorous four-stage pipeline</span>.
            </h2>

            {/* Glowing Multi-Step Progress Tracker */}
            <div style={{ marginTop: '2rem', position: 'relative' }}>
              {/* Background Bar */}
              <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', position: 'relative' }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00F0FF, #FF6B00)',
                    scaleX: smoothProgress,
                    transformOrigin: '0%',
                    boxShadow: '0 0 12px rgba(0, 240, 255, 0.8)',
                  }}
                />
              </div>

              {/* 4 Step Markers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '0.9rem' }}>
                {phases.map((phase, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        playSynthSound('click');
                        setActiveStep(idx);
                      }}
                      onMouseEnter={() => setCursorState('hover')}
                      onMouseLeave={() => setCursorState('default')}
                      style={{
                        cursor: 'pointer',
                        color: isActive ? phase.color : 'var(--color-text-muted)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: isActive ? 700 : 500 }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: isActive ? phase.color : 'rgba(255,255,255,0.06)',
                          color: isActive ? '#000000' : 'rgba(255,255,255,0.5)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                        }}>
                          {phase.step}
                        </span>
                        <span className="hidden sm:inline" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Phase {phase.step}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Split View: Phase Narrative + Dynamic Visual Preview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}>
            {/* Left: Phase Narrative */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(15, 20, 32, 0.85)',
                border: `1.5px solid ${phases[activeStep].color}40`,
                borderRadius: '16px',
                padding: '2.2rem',
                backdropFilter: 'blur(20px)',
                boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${phases[activeStep].color}15`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{
                  background: `${phases[activeStep].color}18`,
                  color: phases[activeStep].color,
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.8rem',
                  borderRadius: '20px',
                  border: `1px solid ${phases[activeStep].color}40`,
                }}>
                  {phases[activeStep].badge}
                </span>

                <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  STEP {phases[activeStep].step} OF 04
                </span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF', fontWeight: 600, marginBottom: '0.6rem', lineHeight: 1.25 }}>
                {phases[activeStep].title}
              </h3>

              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {phases[activeStep].desc}
              </p>

              <div>
                <h4 style={{ fontSize: '0.85rem', color: phases[activeStep].color, fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '0.08em' }}>
                  Key Engineering Milestones:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                  {phases[activeStep].deliverables.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                      <CheckCircle2 size={16} color={phases[activeStep].color} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Dynamic Visual Preview that morphs per phase */}
            <motion.div
              key={`preview-${activeStep}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(10, 14, 22, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1.75rem',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {activeStep === 0 && <BlueprintPreview />}
              {activeStep === 1 && <TerminalPreview />}
              {activeStep === 2 && <SecurityPreview />}
              {activeStep === 3 && <MetricsPreview />}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-components for dynamic interactive previews

const BlueprintPreview = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '0.75rem', marginBottom: '1.2rem' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#00F0FF' }}>
        BLUEPRINT // TOPOLOGY_MATRIX.SVG
      </span>
      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
        NODES: 8 DISTRIBUTED
      </span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px dashed #00F0FF', borderRadius: '8px', padding: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.88rem', fontFamily: 'monospace' }}>[INGESTION_GATEWAY]</span>
        <span style={{ color: '#00F0FF', fontSize: '0.82rem', fontFamily: 'monospace' }}>WebSocket WSS://</span>
      </div>
      <div style={{ textAlign: 'center', color: '#00F0FF', fontSize: '0.8rem' }}>&darr; [Zero-Copy Binary Stream]</div>
      <div style={{ background: 'rgba(255, 107, 0, 0.05)', border: '1px dashed #FF6B00', borderRadius: '8px', padding: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.88rem', fontFamily: 'monospace' }}>[REACT_AGENT_CLUSTER]</span>
        <span style={{ color: '#FF6B00', fontSize: '0.82rem', fontFamily: 'monospace' }}>Ollama Local LLM</span>
      </div>
      <div style={{ textAlign: 'center', color: '#00F0FF', fontSize: '0.8rem' }}>&darr; [Atomic State Commits]</div>
      <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed #10B981', borderRadius: '8px', padding: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.88rem', fontFamily: 'monospace' }}>[SECURE_PERSISTENCE]</span>
        <span style={{ color: '#10B981', fontSize: '0.82rem', fontFamily: 'monospace' }}>Encrypted Key-Value</span>
      </div>
    </div>
  </div>
);

const TerminalPreview = () => (
  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
    <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
      <span style={{ marginLeft: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>agent_orchestrator.sh</span>
    </div>
    <div style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.4rem' }}>&gt; initializing ReAct execution plan...</div>
    <div style={{ color: '#00F0FF', marginBottom: '0.4rem' }}>[THOUGHT]: Analyze multi-file AST diff dependencies for ZeroGravity.</div>
    <div style={{ color: '#FF6B00', marginBottom: '0.4rem' }}>[ACTION]: invoke_tool("diff_synthesizer", target="src/App.jsx")</div>
    <div style={{ color: '#10B981', marginBottom: '0.4rem' }}>[OBSERVATION]: 0 syntax regressions. 100% test pass rate.</div>
    <div style={{ color: '#FFFFFF', marginTop: '0.8rem', background: 'rgba(0, 240, 255, 0.1)', padding: '0.4rem', borderRadius: '4px' }}>
      &gt; Plan Complete. Ready for production compilation.
    </div>
  </div>
);

const SecurityPreview = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#10B981' }}>
      <Shield size={20} />
      <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 600 }}>SECURITY AUDIT PROTOCOL: ENFORCED</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <AuditRow label="CSP Script Scope" status="Hardened" value="Whitelist Only" color="#10B981" />
      <AuditRow label="XSS/Injection Filter" status="Clean" value="Zero Vulnerabilities" color="#10B981" />
      <AuditRow label="Web3Forms Token Gate" status="Active" value="TLS AES-256" color="#00F0FF" />
      <AuditRow label="Local Code Privacy" status="Guaranteed" value="0 KB Cloud Leak" color="#FF6B00" />
    </div>
  </div>
);

const MetricsPreview = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem', color: '#00F0FF' }}>
      <Activity size={20} />
      <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 600 }}>LIVE DIAGNOSTIC BENCHMARKS</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>FRAME RATE</div>
        <div style={{ fontSize: '1.8rem', color: '#00F0FF', fontWeight: 700 }}>60 FPS</div>
        <div style={{ fontSize: '0.7rem', color: '#10B981' }}>Locked &bull; 0 Frame Drops</div>
      </div>
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 107, 0, 0.2)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>TELEMETRY SYNC</div>
        <div style={{ fontSize: '1.8rem', color: '#FF6B00', fontWeight: 700 }}>&lt;15ms</div>
        <div style={{ fontSize: '0.7rem', color: '#10B981' }}>Sub-millisecond WS Ping</div>
      </div>
    </div>
  </div>
);

const AuditRow = ({ label, status, value, color }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
    <span style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>{label}</span>
    <span style={{ fontSize: '0.78rem', color: color, fontFamily: 'monospace', fontWeight: 600 }}>{value}</span>
  </div>
);

export default HowIWorkProcess;
