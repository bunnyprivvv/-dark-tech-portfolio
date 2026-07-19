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
      <div className="glass" style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Initiate <span className="text-neon" style={{fontWeight: '300'}}>Protocol</span></h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Open a secure channel for technical inquiries and architectural consultation.</p>
        
        {/* Encrypted Channel Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '3.5rem', color: '#10B981', fontSize: '0.9rem', fontFamily: 'monospace' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981', animation: 'secure-pulse 1.8s infinite' }}></span>
          <span>Communication Security: Encrypted TLS Channel Active (Web3Forms API Protocol)</span>
          
          <style>{`
            @keyframes secure-pulse {
              0% { opacity: 0.4; transform: scale(0.9); }
              50% { opacity: 1; transform: scale(1.1); }
              100% { opacity: 0.4; transform: scale(0.9); }
            }
          `}</style>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-8">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Identifier</label>
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
              <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Comm-Link (Email)</label>
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
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Transmission Data</label>
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
              cursor: status === 'submitting' ? 'not-allowed' : 'none'
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
  background: 'var(--color-input-bg)',
  border: '1px solid var(--color-input-border)',
  padding: '1rem',
  borderRadius: '8px',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.3s ease'
};

export default ContactForm;
