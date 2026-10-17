import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const ContactForm = () => {
  const { setCursorState } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6d54206f-8a7a-4024-8657-4408a5fe42b2",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Sub-Routine Transmission (Portfolio)",
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
         setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="container py-20" style={{ marginBottom: '10vh' }}>
      <div className="glass" style={{ padding: '3.5rem', maxWidth: '900px', margin: '0 auto', background: 'rgba(15, 19, 28, 0.85)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ffffff' }}>Initiate <span className="text-neon" style={{fontWeight: '300', color: 'var(--color-neon-blue)'}}>Protocol</span></h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.75)', marginBottom: '1.5rem', fontSize: '1.15rem' }}>Open a secure channel for technical inquiries and architectural consultation.</p>
        
        {/* Social Links Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          <a 
            href="https://github.com/bunnyprivvv" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.2s ease',
              color: '#ffffff'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>GitHub Profile</div>
              <div style={{ fontWeight: '600', fontSize: '1rem' }}>github.com/bunnyprivvv</div>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/shagunduttsharma" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
            style={{
              background: 'rgba(0, 119, 181, 0.1)',
              border: '1px solid rgba(0, 119, 181, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.2s ease',
              color: '#ffffff'
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(0, 119, 181, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00a0dc' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>LinkedIn Profile</div>
              <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>shagunduttsharma</div>
            </div>
          </a>
        </div>

        {/* Encrypted Channel Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem', color: '#10B981', fontSize: '0.85rem', fontFamily: 'monospace' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981', animation: 'secure-pulse 1.8s infinite' }}></span>
          <span>Communication Security: Encrypted TLS Channel Active (Web3Forms API Protocol)</span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-8">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Identifier (Name)</label>
              <input 
                required
                name="name"
                type="text" 
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Comm-Link (Email)</label>
              <input 
                required
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>Transmission Data</label>
            <textarea 
              required
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical' }}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
            style={{ 
              padding: '1.2rem 2.5rem', 
              background: status === 'success' ? '#10B981' : status === 'error' ? '#EF4444' : 'var(--color-neon-blue)', 
              color: '#ffffff',
              borderRadius: '8px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              alignSelf: 'flex-start',
              border: 'none',
              boxShadow: status === 'success' ? '0 0 20px rgba(16, 185, 129, 0.4)' : status === 'error' ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
            }}
          >
            {status === 'idle' && 'Send Transmission'}
            {status === 'submitting' && 'Transmitting...'}
            {status === 'success' && 'Transmission Received!'}
            {status === 'error' && 'Transmission Failed!'}
          </button>
        </form>
      </div>
    </section>
  );
};

const inputStyle = {
  background: 'rgba(0, 0, 0, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  padding: '1rem',
  borderRadius: '8px',
  color: '#ffffff',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.3s ease'
};

export default ContactForm;
