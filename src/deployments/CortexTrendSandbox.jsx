import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Zap, RefreshCw, Send, CheckCircle,
  AlertCircle, BarChart2, Globe, Cpu, Heart, Lock, ChevronRight,
  Copy, Check, Wifi, Activity, Layers, Star, ArrowUpRight
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Palette tokens — completely different from
   the portfolio's cyan/black aesthetic
───────────────────────────────────────────── */
const C = {
  bg:         '#0f0b1e',
  surface:    '#17122b',
  card:       '#1e1838',
  border:     'rgba(139, 92, 246, 0.2)',
  borderHov:  'rgba(139, 92, 246, 0.5)',
  purple:     '#8b5cf6',
  purpleGlow: 'rgba(139, 92, 246, 0.15)',
  emerald:    '#10b981',
  emeraldGlow:'rgba(16, 185, 129, 0.15)',
  rose:       '#f43f5e',
  amber:      '#f59e0b',
  sky:        '#38bdf8',
  text:       '#e2d9f3',
  muted:      '#7c6fa0',
  white:      '#fff',
};

/* ─── tiny reusable styled-tag ─── */
const Badge = ({ color, children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 10px', borderRadius: 999,
    fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
    background: `${color}22`, color, border: `1px solid ${color}55`,
  }}>{children}</span>
);

/* ─── icon → category badge ─── */
const categoryMeta = {
  Technology:     { icon: '⚡', color: C.purple },
  Cybersecurity:  { icon: '🔒', color: C.rose },
  Biomedical:     { icon: '🧬', color: C.emerald },
  Infrastructure: { icon: '🏗️', color: C.amber },
  Finance:        { icon: '💰', color: C.sky },
  AI:             { icon: '🤖', color: C.purple },
};

/* ─── Trend card ─── */
const TrendCard = ({ trend, delay }) => {
  const meta = categoryMeta[trend.category] || { icon: '📊', color: C.purple };
  const score = Math.round(trend.sentimentScore * 100);
  const barW   = `${score}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 16, padding: '20px 22px',
        display: 'flex', flexDirection: 'column', gap: 12,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* faint purple orb behind */}
      <div style={{
        position: 'absolute', right: -30, top: -30,
        width: 120, height: 120, borderRadius: '50%',
        background: `radial-gradient(circle, ${meta.color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.white, lineHeight: 1.3 }}>
            {meta.icon} {trend.topic}
          </span>
          <Badge color={meta.color}>{trend.category}</Badge>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          color: C.emerald, fontWeight: 700, fontSize: 14,
        }}>
          <TrendingUp size={14} />
          {trend.volumeShift}
        </div>
      </div>

      {/* Sentiment bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: C.muted, letterSpacing: '0.04em' }}>SENTIMENT SCORE</span>
          <span style={{ fontSize: 12, color: meta.color, fontWeight: 700 }}>{score}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: barW }}
            transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
            style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${meta.color}, ${meta.color}aa)` }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: C.muted }}>Reliability</span>
        <span style={{ fontSize: 12, color: C.emerald, fontWeight: 600 }}>{trend.reliabilityIndex}</span>
      </div>
    </motion.div>
  );
};

/* ─── Stat tile ─── */
const StatTile = ({ icon: Icon, label, value, color }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: '16px 20px',
    display: 'flex', alignItems: 'center', gap: 14,
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon size={18} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 2, letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: C.white }}>{value}</div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const CortexTrendSandbox = () => {
  const [apiKey, setApiKey]         = useState('');
  const [copied, setCopied]         = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('GET /api/v1/trends');
  const [isSending, setIsSending]   = useState(false);
  const [trends, setTrends]         = useState(null);
  const [rateLeft, setRateLeft]     = useState(5);
  const [toast, setToast]           = useState(null);
  const [tab, setTab]               = useState('playground'); // playground | docs

  const mockTrends = [
    { topic: "Generative AI Agents",            category: "Technology",     sentimentScore: 0.92, volumeShift: "+148%", reliabilityIndex: "98.7%" },
    { topic: "Post-Quantum Cryptography",        category: "Cybersecurity",  sentimentScore: 0.84, volumeShift: "+89%",  reliabilityIndex: "96.4%" },
    { topic: "Volumetric Medical CV",            category: "Biomedical",     sentimentScore: 0.95, volumeShift: "+212%", reliabilityIndex: "99.1%" },
    { topic: "Decentralised GPU Compute Pools",  category: "Infrastructure", sentimentScore: 0.78, volumeShift: "+63%",  reliabilityIndex: "92.5%" },
  ];

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleGenerateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const key = 'ct_live_' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
      setApiKey(key);
      setIsGenerating(false);
      showToast('API key generated! You have 5 free requests.', 'success');
    }, 1200);
  };

  const handleCopy = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSendRequest = () => {
    if (!apiKey) { showToast('Please generate an API key first.', 'error'); return; }
    if (rateLeft <= 0) { showToast('Rate limit hit — 0 requests left. Upgrade to Pro ↗', 'error'); return; }
    setIsSending(true);
    setTimeout(() => {
      setTrends(mockTrends);
      setRateLeft(p => p - 1);
      setIsSending(false);
      showToast('200 OK — Trend data fetched successfully!', 'success');
    }, 1100);
  };

  /* ── endpoints for docs tab ── */
  const endpoints = [
    { method: 'GET', path: '/api/v1/trends',    desc: 'Fetch top trending topics with sentiment scores.' },
    { method: 'GET', path: '/api/v1/sentiment', desc: 'Get a weighted sentiment index for a given keyword.' },
    { method: 'GET', path: '/api/v1/categories',desc: 'List all tracked topic categories.' },
    { method: 'POST',path: '/api/v1/subscribe', desc: 'Register a webhook for real-time trend alerts.' },
  ];

  const methodColor = { GET: C.emerald, POST: C.amber, DELETE: C.rose };

  /* ── layout ── */
  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.text,
      fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
      overflowY: 'auto',
    }}>
      {/* ── gradient top wash ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 400,
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.22) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px' }}>

        {/* ═══════════ HEADER ═══════════ */}
        <div style={{ padding: '40px 0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Activity size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 22, color: C.white }}>CortexTrend AI</span>
              <Badge color={C.emerald}>LIVE SANDBOX</Badge>
            </div>
            <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>
              Autonomous Market Intelligence & Real-Time Trend Analytics Platform
            </p>
          </div>

          {/* Request meter */}
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: '12px 20px', textAlign: 'center', minWidth: 120,
          }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: rateLeft > 0 ? C.purple : C.rose }}>
              {rateLeft} / 5
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Free Requests Left</div>
          </div>
        </div>

        {/* ═══════════ TABS ═══════════ */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: C.surface, borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {['playground', 'docs'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '8px 22px', borderRadius: 9, border: 'none',
                background: tab === t ? C.purple : 'transparent',
                color: tab === t ? '#fff' : C.muted,
                fontWeight: 600, fontSize: 13,
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >{t}</button>
          ))}
        </div>

        {/* ═══════════ PLAYGROUND TAB ═══════════ */}
        {tab === 'playground' && (
          <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24 }}>

            {/* ── Left panel ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* API Key card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <Lock size={16} color={C.purple} />
                  <span style={{ fontWeight: 700, color: C.white, fontSize: 15 }}>Your API Key</span>
                </div>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 18, lineHeight: 1.6 }}>
                  Generate a sandbox key to authenticate your requests. No sign-up needed.
                </p>

                {apiKey ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: C.purpleGlow, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                  }}>
                    <code style={{ flex: 1, fontSize: 12, color: C.purple, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {apiKey}
                    </code>
                    <button onClick={handleCopy} style={{ background: 'none', border: 'none', padding: 4, color: copied ? C.emerald : C.muted }}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                ) : (
                  <div style={{
                    height: 44, borderRadius: 10, marginBottom: 16,
                    background: 'rgba(255,255,255,0.04)', border: `1px dashed ${C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: C.muted, fontSize: 13,
                  }}>No key generated yet</div>
                )}

                <button
                  onClick={handleGenerateKey}
                  disabled={isGenerating}
                  style={{
                    width: '100%', padding: '11px 0', borderRadius: 11, border: 'none',
                    background: `linear-gradient(135deg, #8b5cf6, #6d28d9)`,
                    color: '#fff', fontWeight: 700, fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    opacity: isGenerating ? 0.6 : 1, transition: 'opacity 0.2s',
                  }}
                >
                  <RefreshCw size={14} className={isGenerating ? 'spin' : ''} />
                  {isGenerating ? 'Generating…' : apiKey ? 'Regenerate Key' : 'Generate Free Key'}
                </button>
              </motion.div>

              {/* Request builder card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <Send size={16} color={C.purple} />
                  <span style={{ fontWeight: 700, color: C.white, fontSize: 15 }}>Make a Request</span>
                </div>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 18, lineHeight: 1.6 }}>
                  Pick an endpoint and fire off a live query.
                </p>

                {/* Endpoint pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {['GET /api/v1/trends', 'GET /api/v1/sentiment'].map(ep => (
                    <button
                      key={ep}
                      onClick={() => setSelectedEndpoint(ep)}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid`,
                        borderColor: selectedEndpoint === ep ? C.purple : C.border,
                        background: selectedEndpoint === ep ? C.purpleGlow : 'transparent',
                        color: selectedEndpoint === ep ? C.white : C.muted,
                        textAlign: 'left', fontSize: 13, fontFamily: 'monospace',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span>
                        <span style={{ color: C.emerald, fontWeight: 700, marginRight: 8 }}>GET</span>
                        {ep.replace('GET ', '')}
                      </span>
                      {selectedEndpoint === ep && <CheckCircle size={14} color={C.purple} />}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSendRequest}
                  disabled={isSending}
                  style={{
                    width: '100%', padding: '12px 0', borderRadius: 11, border: 'none',
                    background: isSending ? 'rgba(16,185,129,0.1)' : `linear-gradient(135deg, #10b981, #059669)`,
                    color: isSending ? C.emerald : '#fff', fontWeight: 700, fontSize: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    border: isSending ? `1px solid ${C.emerald}55` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {isSending
                    ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> Fetching data…</>
                    : <><Zap size={14} /> Run Request</>
                  }
                </button>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <StatTile icon={Globe}    label="Nodes Scraped"     value="124 sources" color={C.purple} />
                <StatTile icon={BarChart2} label="Tokens Analysed"   value="4.85M"       color={C.emerald} />
                <StatTile icon={Cpu}      label="Avg Latency"        value="< 15ms"      color={C.amber} />
              </motion.div>
            </div>

            {/* ── Right panel: Results ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Response header */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                  background: C.card, border: `1px solid ${C.border}`,
                  borderRadius: 20, padding: '18px 24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Wifi size={18} color={trends ? C.emerald : C.muted} />
                  <span style={{ fontWeight: 700, color: C.white }}>Live Response</span>
                  {trends && <Badge color={C.emerald}>200 OK</Badge>}
                </div>
                <span style={{ fontSize: 12, color: C.muted }}>
                  {trends ? `${new Date().toLocaleTimeString()}` : 'No data yet — run a request'}
                </span>
              </motion.div>

              {/* Trend cards grid */}
              <AnimatePresence mode="wait">
                {trends ? (
                  <motion.div
                    key="trends"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
                  >
                    {trends.map((t, i) => <TrendCard key={t.topic} trend={t} delay={i * 0.08} />)}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{
                      flex: 1, background: C.card, border: `1px dashed ${C.border}`,
                      borderRadius: 20, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 14,
                      padding: 60, textAlign: 'center',
                    }}
                  >
                    <div style={{
                      width: 64, height: 64, borderRadius: 18,
                      background: C.purpleGlow, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <TrendingUp size={28} color={C.purple} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 17, color: C.white, margin: '0 0 6px' }}>
                        No results yet
                      </p>
                      <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>
                        Generate a key, pick an endpoint, and click <strong style={{ color: C.white }}>Run Request</strong>.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Raw JSON accordion */}
              {trends && (
                <motion.details
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    background: '#0d0a1a', border: `1px solid ${C.border}`,
                    borderRadius: 16, overflow: 'hidden',
                  }}
                >
                  <summary style={{
                    padding: '14px 20px', cursor: 'pointer', color: C.muted,
                    fontSize: 13, fontWeight: 600, listStyle: 'none',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Layers size={14} /> View raw JSON response
                  </summary>
                  <pre style={{
                    margin: 0, padding: '16px 20px',
                    color: '#a78bfa', fontSize: 12, lineHeight: 1.7,
                    overflowX: 'auto',
                  }}>
                    {JSON.stringify({ status: 200, data: trends, meta: { timestamp: new Date().toISOString(), nodesScraped: 124 } }, null, 2)}
                  </pre>
                </motion.details>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ DOCS TAB ═══════════ */}
        {tab === 'docs' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}
          >
            {/* Sidebar nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {['Authentication', 'Endpoints', 'Rate Limits', 'Pricing'].map(s => (
                <div key={s} style={{
                  padding: '10px 14px', borderRadius: 10,
                  color: s === 'Endpoints' ? C.purple : C.muted,
                  background: s === 'Endpoints' ? C.purpleGlow : 'transparent',
                  fontSize: 13, fontWeight: 600, cursor: 'default',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <ChevronRight size={13} /> {s}
                </div>
              ))}
            </div>

            {/* Docs content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Auth section */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28 }}>
                <h2 style={{ margin: '0 0 12px', color: C.white, fontSize: 18, fontWeight: 700 }}>🔑 Authentication</h2>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, margin: '0 0 16px' }}>
                  All requests must include your API key in the <code style={{ color: C.purple, background: C.purpleGlow, padding: '1px 6px', borderRadius: 4 }}>x-api-key</code> header.
                </p>
                <pre style={{ background: '#0d0a1a', borderRadius: 12, padding: 16, margin: 0, fontSize: 13, color: '#a78bfa', lineHeight: 1.7 }}>
{`curl https://api.cortextrend.ai/v1/trends \\
  -H "x-api-key: ct_live_xxxxxxxxxxxxxxxx"`}
                </pre>
              </div>

              {/* Endpoints section */}
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 28 }}>
                <h2 style={{ margin: '0 0 18px', color: C.white, fontSize: 18, fontWeight: 700 }}>📡 Endpoints</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {endpoints.map(ep => (
                    <div key={ep.path} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '14px 18px', background: C.surface, borderRadius: 12,
                      border: `1px solid ${C.border}`,
                    }}>
                      <Badge color={methodColor[ep.method] || C.purple}>{ep.method}</Badge>
                      <code style={{ color: C.white, fontSize: 13, flex: 1 }}>{ep.path}</code>
                      <span style={{ color: C.muted, fontSize: 13 }}>{ep.desc}</span>
                      <ArrowUpRight size={14} color={C.muted} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { name: 'Free',       price: '$0',    reqs: '100 req/day',  color: C.muted   },
                  { name: 'Pro',        price: '$29',   reqs: '10k req/day',  color: C.purple  },
                  { name: 'Enterprise', price: 'Custom',reqs: 'Unlimited',    color: C.emerald },
                ].map(plan => (
                  <div key={plan.name} style={{
                    background: plan.name === 'Pro' ? `linear-gradient(135deg, #1e1838, #2d1f5e)` : C.card,
                    border: `1px solid ${plan.name === 'Pro' ? C.purple : C.border}`,
                    borderRadius: 18, padding: '22px 20px', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 13, color: plan.color, fontWeight: 700, marginBottom: 8 }}>{plan.name}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: C.white, marginBottom: 6 }}>{plan.price}</div>
                    {plan.price !== 'Custom' && <div style={{ fontSize: 11, color: C.muted }}>/month</div>}
                    <div style={{ marginTop: 14, fontSize: 13, color: C.muted }}>{plan.reqs}</div>
                    {plan.name === 'Pro' && <Badge color={C.purple} style={{ marginTop: 12 }}>Most Popular</Badge>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ═══════════ TOAST ═══════════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0,  x: '-50%' }}
            exit={{ opacity: 0, y: 30, x: '-50%' }}
            style={{
              position: 'fixed', bottom: 32, left: '50%',
              background: toast.type === 'error' ? '#1a0a10' : '#0a1a10',
              border: `1px solid ${toast.type === 'error' ? C.rose : C.emerald}55`,
              borderRadius: 14, padding: '13px 22px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: `0 8px 40px ${toast.type === 'error' ? 'rgba(244,63,94,0.25)' : 'rgba(16,185,129,0.25)'}`,
              zIndex: 99999999,
              color: toast.type === 'error' ? C.rose : C.emerald,
              fontWeight: 600, fontSize: 14,
            }}
          >
            {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* spin keyframes */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default CortexTrendSandbox;
