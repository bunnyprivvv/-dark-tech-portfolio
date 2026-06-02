import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { projectsDB } from '../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCursorState } = usePortfolio();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when loaded
    window.scrollTo(0, 0);
    
    // Simulate static network load
    setTimeout(() => {
      const foundProject = projectsDB.find(p => p.id === parseInt(id));
      if (foundProject) {
        setProject(foundProject);
      } else {
        console.error("Project ID not found in static database.");
      }
      setLoading(false);
    }, 400);

  }, [id]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-neon" style={{ fontSize: '1.5rem', animation: 'pulse 2s infinite' }}>Extracting Secured Data...</p>
      </div>
    );
  }

  if (!project || project.error) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Transmission Failed. Project unlocated.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', color: 'var(--color-neon-blue)' }}>Return to Hub</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        padding: '5rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <button 
        onClick={() => navigate('/')}
        onMouseEnter={() => setCursorState('hover')}
        onMouseLeave={() => setCursorState('default')}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--color-neon-blue)', 
          background: 'transparent',
          marginBottom: '3rem',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="glass" style={{ padding: '4rem', background: 'rgba(255, 255, 255, 0.03)', position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'var(--color-neon-blue)', fontSize: '1.2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {project.category}
          </p>
          <h1 className="text-glow" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem', lineHeight: '1' }}>
            {project.title}
          </h1>

          <button 
            onClick={() => {
              if (project.id === 1) {
                window.open("https://frontend-lake-nine-62.vercel.app", "_blank");
              } else if (project.id === 3) {
                window.open("https://aether-swarm-app.vercel.app", "_blank");
              } else {
                navigate('/sandbox/' + project.id);
              }
            }}
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
            style={{ 
              marginBottom: '3rem',
              padding: '1rem 2rem', 
              background: 'var(--color-neon-blue)', 
              color: 'var(--color-bg)',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
            }}
          >
            Launch Live Deployment
          </button>
          
          <p style={{ fontSize: '1.3rem', color: 'var(--color-text)', maxWidth: '800px', lineHeight: '1.6', marginBottom: '3rem' }}>
            {project.description}
          </p>

          {/* Real-World Business Utility Callout */}
          {project.realWorldUtility && (
            <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--color-neon-blue)', background: 'rgba(255,255,255,0.02)', marginBottom: '3.5rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--color-neon-blue)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: '600' }}>
                Real-World Business Impact & Solution
              </h4>
              <p style={{ fontSize: '1.15rem', color: 'var(--color-text)', lineHeight: '1.6', margin: 0 }}>
                {project.realWorldUtility}
              </p>
            </div>
          )}

          {/* Quantitative Performance Benchmarks Grid */}
          {project.metrics && (
            <div style={{ marginBottom: '3.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                Operational & Performance Benchmarks
              </h3>
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
                {project.metrics.map((metric, i) => (
                  <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0, 230, 255, 0.1)', background: 'rgba(0, 230, 255, 0.02)' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                      {metric.label}
                    </p>
                    <p style={{ color: 'var(--color-neon-blue)', fontSize: '1.8rem', fontWeight: '600', marginTop: '0.5rem', marginBottom: 0, fontFamily: 'var(--font-heading)', textShadow: '0 0 10px rgba(0,230,255,0.2)' }}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                Key Technical Features
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
                {project.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--color-neon-blue)', borderRadius: '50%' }} />
                    <span style={{ fontSize: '1.1rem' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                Architecture Stack
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {project.techStack.map((tech, i) => (
                  <span key={i} style={{ padding: '0.5rem 1rem', border: '1px solid var(--color-neon-blue)', color: 'var(--color-neon-blue)', borderRadius: '20px', fontSize: '0.9rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contextual Action Segment */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
              Interested in reviewing details or building custom versions?
            </h4>
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
              style={{
                padding: '1.2rem 2.5rem',
                background: 'rgba(0, 230, 255, 0.03)',
                border: '1px solid var(--color-neon-blue)',
                color: 'var(--color-neon-blue)',
                borderRadius: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                marginTop: '0.5rem',
              }}
            >
              {project.id === 1 && 'Initialize Protocol: Discuss AI Integration'}
              {project.id === 2 && 'Initialize Protocol: Review Cryptographic Security'}
              {project.id === 3 && 'Initialize Protocol: View 3D Performance Metrics'}
            </button>
          </div>

        </div>
      </div>
      
    </motion.div>
  );
};

export default ProjectDetail;
