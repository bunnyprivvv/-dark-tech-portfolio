import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import TiltCard from './TiltCard';
import { useNavigate } from 'react-router-dom';
import { projectsDB } from '../data/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCursorState } = usePortfolio();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate static network load
    setTimeout(() => {
      setProjects(projectsDB);
      setLoading(false);
    }, 600);
  }, []);

  return (
    <section id="projects" className="container py-20" style={{ marginTop: '10vh' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '4rem' }}>
        Recent <span className="text-neon" style={{ fontWeight: '300' }}>Projects</span>
      </h2>
      
      {loading ? (
        <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
          <p className="text-neon" style={{ fontSize: '1.2rem', animation: 'pulse 2s infinite' }}>Establishing Secure Link... Fetching Projects</p>
        </div>
      ) : (
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {projects.map((proj) => (
            <TiltCard 
              key={proj.id} 
              onClick={() => navigate(`/project/${proj.id}`)}
              className="glass"
              bgImage={proj.image}
              style={{ 
                minHeight: '400px', 
                padding: '2rem',
                margin: '1rem',
                transition: 'opacity 0.4s ease'
              }}
            >
              <div style={{ background: 'rgba(5, 5, 5, 0.85)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: 'var(--color-neon-blue)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {proj.category}
                </p>
                <h3 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '500' }}>{proj.title}</h3>
                
                {/* Technical Stack Quick Scan Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                  {proj.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', border: '1px solid rgba(0, 230, 255, 0.25)', color: 'var(--color-neon-blue)', borderRadius: '4px', background: 'rgba(0, 230, 255, 0.03)' }}>
                      #{tech}
                    </span>
                  ))}
                  {proj.techStack.length > 3 && (
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', color: 'var(--color-text-muted)' }}>
                      +{proj.techStack.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      )}
      
      {/* Adding a quick inline style for the pulse animation if it doesn't exist */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
