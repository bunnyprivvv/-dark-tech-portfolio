import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Key, Shield, Zap, RefreshCw, Send, CheckCircle2, AlertTriangle, Layers, DollarSign, Database } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const CortexTrendSandbox = () => {
  const { setCursorState, playSynthSound } = usePortfolio();
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Endpoint selection
  const [selectedEndpoint, setSelectedEndpoint] = useState('GET /api/v1/trends');
  const [requestBody, setRequestBody] = useState('{\n  "category": "all",\n  "sentimentFilter": "positive"\n}');
  
  // Terminal logs & output
  const [terminalLogs, setTerminalLogs] = useState([
    { id: 1, type: 'info', text: 'CORTEXTREND_API_DAEMON: v1.0.8 ONLINE' },
    { id: 2, type: 'info', text: 'Ready for client authorization. Awaiting x-api-key...' }
  ]);
  const [apiResponse, setApiResponse] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [rateLimit, setRateLimit] = useState(5); // 5 free remaining
  
  // Dynamic trending datasets
  const mockTrends = {
    trends: [
      { topic: "Generative AI Agents", category: "Technology", sentimentScore: 0.92, volumeShift: "+148%", reliabilityIndex: "98.7%" },
      { topic: "Post-Quantum Cryptography", category: "Cybersecurity", sentimentScore: 0.84, volumeShift: "+89%", reliabilityIndex: "96.4%" },
      { topic: "Volumetric Medical Computer Vision", category: "Biomedical", sentimentScore: 0.95, volumeShift: "+212%", reliabilityIndex: "99.1%" },
      { topic: "Decentralized GPU Compute Pools", category: "Infrastructure", sentimentScore: 0.78, volumeShift: "+63%", reliabilityIndex: "92.5%" }
    ],
    metadata: {
      scanTimestamp: new Date().toISOString(),
      activeNodesScraped: 124,
      totalAnalysedTokens: 4850900,
      systemStatus: "NOMINAL"
    }
  };

  const handleGenerateKey = () => {
    setIsGenerating(true);
    playSynthSound('click');
    setTerminalLogs(prev => [...prev, { id: Date.now(), type: 'process', text: 'INITIALIZING AUTOGENERATION CIPHER...' }]);
    
    setTimeout(() => {
      const generated = 'ct_live_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
      setApiKey(generated);
      setIsGenerating(false);
      playSynthSound('success');
      setTerminalLogs(prev => [
        ...prev, 
        { id: Date.now() + 1, type: 'success', text: `TOKEN CREATED: ${generated.substring(0, 12)}...` },
        { id: Date.now() + 2, type: 'info', text: 'Client authenticated. Rate Limit initialized: 5 requests/min.' }
      ]);
    }, 1200);
  };

  const handleSendRequest = () => {
    if (!apiKey) {
      playSynthSound('glitch');
      setTerminalLogs(prev => [...prev, { id: Date.now(), type: 'error', text: 'FATAL: AUTHORIZATION FAILED. MISSING X-API-KEY HEADER.' }]);
      return;
    }
    
    if (rateLimit <= 0) {
      playSynthSound('glitch');
      setTerminalLogs(prev => [...prev, { id: Date.now(), type: 'error', text: 'RATE_LIMIT_EXCEEDED: Subscribe to Pro or Enterprise for unrestricted pipeline bandwidth.' }]);
      return;
    }
    
    setIsSending(true);
    playSynthSound('click');
    setTerminalLogs(prev => [...prev, { id: Date.now(), type: 'process', text: `TRANSMITTING ${selectedEndpoint} ENVELOPE...` }]);
    
    setTimeout(() => {
      setRateLimit(prev => prev - 1);
      setApiResponse(mockTrends);
      setIsSending(false);
      playSynthSound('success');
      setTerminalLogs(prev => [
        ...prev,
        { id: Date.now() + 1, type: 'success', text: 'STATUS_CODE: 200 OK. Dynamic database segment mapped successfully.' },
        { id: Date.now() + 2, type: 'info', text: `Bandwidth Rate Limit status: ${rateLimit - 1} / 5 allocations remaining.` }
      ]);
    }, 1000);
  };

  return (
    <div style={{ padding: '4rem', color: '#00E6FF', height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'auto', background: 'radial-gradient(circle at center, rgba(0, 230, 255, 0.03) 0%, #000 80%)' }}>
      
      {/* 1. Header segment */}
      <div style={{ borderBottom: '1px solid rgba(0,230,255,0.1)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', textShadow: '0 0 20px rgba(0, 230, 255, 0.4)', margin: 0 }}>CortexTrend <span style={{fontWeight: '300', color: '#fff'}}>Developer Hub</span></h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>Autonomous Market Intelligence & Real-Time Trend Analytics API</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Left Side: Developer Key Console & Endpoint config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          
          {/* Key Manager Panel */}
          <div style={{ background: 'rgba(0, 230, 255, 0.02)', border: '1px solid rgba(0, 230, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(0,230,255,0.1)', padding: '0.6rem', borderRadius: '6px' }}>
                <Key size={20} />
              </div>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.3rem' }}>Authorization Gate</h3>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Generate a sandbox authentication token to sign diagnostic headers and run live requests against the Trend Core.
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                readOnly
                value={apiKey || 'NO_TOKEN_ACTIVATED'}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.6)',
                  border: '1px solid rgba(0,230,255,0.2)',
                  color: apiKey ? '#00E6FF' : 'rgba(255,255,255,0.2)',
                  padding: '0.8rem 1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}
              />
              <button
                onClick={handleGenerateKey}
                disabled={isGenerating}
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: isGenerating ? 'rgba(255,255,255,0.05)' : 'var(--color-neon-blue)',
                  color: 'var(--color-bg)',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  cursor: 'none'
                }}
              >
                <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
                {isGenerating ? 'GENERATING...' : 'ACTIVATE'}
              </button>
            </div>
          </div>

          {/* Request Composer */}
          <div style={{ background: 'rgba(0, 230, 255, 0.02)', border: '1px solid rgba(0, 230, 255, 0.15)', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(0,230,255,0.1)', padding: '0.6rem', borderRadius: '6px' }}>
                <Layers size={20} />
              </div>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.3rem' }}>Request Composer</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '0.5rem', fontFamily: 'monospace' }}>API Endpoint Route</label>
                <select
                  value={selectedEndpoint}
                  onChange={(e) => {
                    setSelectedEndpoint(e.target.value);
                    playSynthSound('hover');
                  }}
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,230,255,0.2)',
                    color: '#fff',
                    padding: '0.8rem 1rem',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                >
                  <option value="GET /api/v1/trends">GET /api/v1/trends (Retrieve Active Scrapes)</option>
                  <option value="GET /api/v1/sentiment">GET /api/v1/sentiment (Calculate Sentiment Indices)</option>
                </select>
              </div>

              {selectedEndpoint.startsWith('POST') && (
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '0.5rem', fontFamily: 'monospace' }}>JSON Payload Body</label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    style={{
                      width: '100%',
                      height: '80px',
                      background: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,230,255,0.2)',
                      color: '#00E6FF',
                      padding: '0.8rem',
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      resize: 'none',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              <button
                onClick={handleSendRequest}
                disabled={isSending}
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: isSending ? 'rgba(255,255,255,0.05)' : 'rgba(0, 230, 255, 0.05)',
                  border: '1px solid var(--color-neon-blue)',
                  color: 'var(--color-neon-blue)',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.3s ease',
                  cursor: 'none',
                  boxShadow: '0 0 15px rgba(0,230,255,0.08)'
                }}
              >
                <Send size={16} />
                {isSending ? 'EXECUTING QUERIES...' : 'EXECUTE API REQUEST'}
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Interactive Live API Console Log & JSON Response */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
          
          {/* Terminal Console Log */}
          <div style={{ flex: 1.2, background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#121212', padding: '0.8rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Terminal size={16} className="text-white/40" />
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Diagnostics Output Core</span>
            </div>
            
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }} className="custom-scrollbar">
              {terminalLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: '1.4' }}>
                  <span style={{
                    color: log.type === 'error' ? '#FF2A54' : log.type === 'success' ? '#00E6FF' : log.type === 'process' ? '#E9D5FF' : 'rgba(255,255,255,0.3)',
                    fontWeight: 'bold'
                  }}>
                    {log.type === 'error' ? '[-] ' : log.type === 'success' ? '[+] ' : log.type === 'process' ? '[~] ' : '[i] '}
                  </span>
                  <span style={{
                    color: log.type === 'error' ? '#FF2A54' : log.type === 'success' ? '#fff' : log.type === 'process' ? 'rgba(0, 230, 255, 0.7)' : 'rgba(255,255,255,0.5)'
                  }}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* JSON Payload Response */}
          <div style={{ flex: 1.8, background: '#0a0a0a', border: '1px solid rgba(0, 230, 255, 0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ background: '#121212', padding: '0.8rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justify: 'between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Database size={16} className="text-cyan-biomed" />
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#00E6FF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Response JSON payload</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>Application/JSON</span>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.8rem', background: '#030303', color: '#fff' }} className="custom-scrollbar">
              {apiResponse ? (
                <pre style={{ margin: 0, color: '#A5F3FC', lineHeight: '1.5' }}>{JSON.stringify(apiResponse, null, 2)}</pre>
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.15)', flexDirection: 'column', gap: '0.5rem' }}>
                  <Zap size={24} />
                  <span>Execute a valid client query to draw telemetry packets.</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CortexTrendSandbox;
