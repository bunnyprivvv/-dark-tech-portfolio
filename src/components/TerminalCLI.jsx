import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const TerminalCLI = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    "SHAGUN_OS v1.0",
    "Type 'help' for commands.",
    ""
  ]);
  const navigate = useNavigate();
  const { setCursorState } = usePortfolio();

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let newHistory = [...history, `> ${cmd}`];
    
    switch(cmd) {
      case 'help':
        newHistory.push("Available Commands:");
        newHistory.push("  deploy health     - Launch VitalsVision AI");
        newHistory.push("  deploy quantum    - Launch Quantum Nexus");
        newHistory.push("  deploy aero       - Launch Aero Dynamics");
        newHistory.push("  deploy cyber      - Launch Cyber Pulse");
        newHistory.push("  clear             - Clear terminal");
        break;
      case 'deploy health':
        newHistory.push("Executing Link to External VitalsVision OS...");
        setTimeout(() => window.location.href = "http://localhost:5180", 1000);
        break;
      case 'deploy quantum':
        newHistory.push("Initializing Sandbox Environment...");
        setTimeout(() => navigate('/sandbox/2'), 1000);
        break;
      case 'deploy aero':
        newHistory.push("Initializing WebGL Core Sandbox...");
        setTimeout(() => navigate('/sandbox/3'), 1000);
        break;
      case 'deploy cyber':
        newHistory.push("Connecting Web3 Nodes...");
        setTimeout(() => navigate('/sandbox/4'), 1000);
        break;
      case 'clear':
        newHistory = [""];
        break;
      case '':
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
    }
    
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div 
      style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'rgba(0,0,0,0.5)',
        border: '1px solid var(--color-neon-blue)',
        borderRadius: '8px',
        fontFamily: 'monospace',
        color: '#00E6FF',
        height: '250px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'inset 0 0 20px rgba(0, 230, 255, 0.05)'
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {history.map((line, i) => (
          <span key={i} style={{ opacity: 0.8 }}>{line}</span>
        ))}
      </div>
      <form onSubmit={handleCommand} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <span>&gt;</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onMouseEnter={() => setCursorState('hover')}
          onMouseLeave={() => setCursorState('default')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontFamily: 'monospace',
            flex: 1,
            outline: 'none',
            fontSize: '1rem'
          }}
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default TerminalCLI;
