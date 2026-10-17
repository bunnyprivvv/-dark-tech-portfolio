import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Code, Box, Palette } from 'lucide-react';

const servicesList = [
  { 
    id: 'Web', 
    title: 'Web Deployment', 
    icon: <Code size={40} />,
    description: 'Production-grade scalable client architectures built on Vite/React. Implements real-time node synchronization via optimized state trees and low-latency WebSocket channels.'
  },
  { 
    id: 'Dev', 
    title: 'Architectural Dev', 
    icon: <Box size={40} />,
    description: 'Security-first, fault-tolerant microservice infrastructures. Designed with hardened JWT/TLS gateway protocols, clean RESTful API standards, and highly reliable data layers.'
  },
  { 
    id: 'Graphic', 
    title: 'Graphic Rendering', 
    icon: <Palette size={40} />,
    description: 'Translating conceptual designs into industrial 3D visualizations. Utilizing performant WebGL shaders and custom Spline integrations optimized for 60FPS mobile rendering.'
  },
];

const Services = () => {
  const { setActiveService, setCursorState, playSynthSound } = usePortfolio();

  return (
    <section id="services" className="container py-20" style={{ marginTop: '6vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
          CAPACITIES & EXPERTISE
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', fontWeight: 500 }}>
          Operational <span className="text-neon" style={{ fontWeight: '300' }}>Capacities</span>
        </h2>
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="glass flex flex-col items-center gap-4 hover-effect"
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'rgba(14, 18, 28, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.16)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
              padding: '3rem 2rem',
              textAlign: 'center',
              borderRadius: '16px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(20, 28, 44, 0.95)';
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = 'var(--color-neon-blue)';
              e.currentTarget.style.boxShadow = '0 15px 35px var(--theme-glow)';
              setActiveService(service.id);
              setCursorState('hover');
              playSynthSound('hover');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(14, 18, 28, 0.85)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.16)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.5)';
              setActiveService(null);
              setCursorState('default');
            }}
            onClick={() => {
              playSynthSound('success');
            }}
          >
            <div style={{ color: 'var(--color-neon-blue)', marginBottom: '1rem', background: 'rgba(0, 240, 255, 0.08)', padding: '1rem', borderRadius: '50%', border: '1px solid rgba(0, 240, 255, 0.25)', display: 'inline-flex' }}>{service.icon}</div>
            <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', fontWeight: '600', marginBottom: '0.5rem' }}>{service.title}</h3>
            <p style={{ color: '#9CA3AF', fontSize: '1.02rem', lineHeight: '1.6' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
