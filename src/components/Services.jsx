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
    <section className="container py-20" style={{ marginTop: '10vh' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>
        Operational <span className="text-neon" style={{ fontWeight: '300' }}>Capacities</span>
      </h2>
      <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="glass flex flex-col items-center gap-4 hover-effect"
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'var(--color-glass-bg)',
              border: '1px solid var(--color-glass-border)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              padding: '3rem 2rem',
              textAlign: 'center',
              borderRadius: '16px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.borderColor = 'var(--color-neon-blue)';
              e.currentTarget.style.boxShadow = '0 15px 35px var(--theme-glow)';
              setActiveService(service.id);
              setCursorState('hover');
              playSynthSound('hover');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-glass-bg)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.borderColor = 'var(--color-glass-border)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
              setActiveService(null);
              setCursorState('default');
            }}
            onClick={() => {
              playSynthSound('success');
            }}
          >
            <div style={{ color: 'var(--color-neon-blue)', marginBottom: '1rem', background: 'var(--color-neon-glow-06)', padding: '1rem', borderRadius: '50%', border: '1px solid var(--color-neon-glow-20)', display: 'inline-flex' }}>{service.icon}</div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-text)', fontWeight: '600', marginBottom: '0.5rem' }}>{service.title}</h3>
            <p style={{ color: '#374151', fontSize: '1.05rem', lineHeight: '1.6' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
