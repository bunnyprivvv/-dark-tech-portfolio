import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Search, Zap, ShoppingBag, BarChart2,
  Globe, Star, ArrowRight, RefreshCw, CheckCircle,
  Flame, Target, DollarSign, Package, Megaphone, Lightbulb
} from 'lucide-react';

/* ─── Palette ─── */
const C = {
  bg:       '#0f0b1e',
  surface:  '#17122b',
  card:     '#1e1838',
  border:   'rgba(139, 92, 246, 0.2)',
  purple:   '#8b5cf6',
  purpleLt: 'rgba(139, 92, 246, 0.12)',
  emerald:  '#10b981',
  emeraldLt:'rgba(16, 185, 129, 0.12)',
  rose:     '#f43f5e',
  amber:    '#f59e0b',
  sky:      '#38bdf8',
  text:     '#e2d9f3',
  muted:    '#7c6fa0',
  white:    '#ffffff',
};

/* ─── Heat badge ─── */
const heatLabel = (score) => {
  if (score >= 0.92) return { label: '🔥 Exploding',   color: C.rose   };
  if (score >= 0.84) return { label: '📈 Very Hot',    color: C.amber  };
  if (score >= 0.75) return { label: '✅ Growing',     color: C.emerald};
  return              { label: '🌱 Emerging',           color: C.sky    };
};

/* ─── Category config ─── */
const CATEGORIES = [
  { id: 'all',        label: 'All Trends',      icon: '🌐' },
  { id: 'products',   label: 'Hot Products',    icon: '📦' },
  { id: 'tech',       label: 'Technology',      icon: '⚡' },
  { id: 'health',     label: 'Health & Wellness',icon: '💚' },
  { id: 'finance',    label: 'Finance',         icon: '💰' },
];

/* ─── Trend dataset ─── */
const ALL_TRENDS = [
  {
    topic:       'AI-Powered Wearables',
    category:    'products',
    heat:        0.95,
    volumeShift: '+212%',
    summary:     'Smart rings, AI glasses & health trackers are flying off shelves. Dropshippers are seeing 3-5× margins.',
    opportunity: 'Source from AliExpress → sell on Shopify. Avg profit: $18–$40 per unit.',
    tags:        ['Dropshipping', 'High Margin', 'New Niche'],
    tagColor:    C.purple,
  },
  {
    topic:       'Generative AI Tools',
    category:    'tech',
    heat:        0.92,
    volumeShift: '+148%',
    summary:     'Businesses are actively searching for AI writing, image & automation tools. Demand is outpacing supply.',
    opportunity: 'Resell white-label AI SaaS tools or create prompt packs. Monthly recurring revenue model.',
    tags:        ['SaaS', 'Recurring Revenue', 'B2B'],
    tagColor:    C.amber,
  },
  {
    topic:       'Gut Health Supplements',
    category:    'health',
    heat:        0.88,
    volumeShift: '+97%',
    summary:     'Probiotic & prebiotic supplements are trending heavily on TikTok and Instagram Reels.',
    opportunity: 'Private label supplements have $15–$60 margins. Pair with influencer marketing for fast scaling.',
    tags:        ['Private Label', 'TikTok Trending', 'Repeat Buyers'],
    tagColor:    C.emerald,
  },
  {
    topic:       'Post-Quantum Cybersecurity',
    category:    'tech',
    heat:        0.84,
    volumeShift: '+89%',
    summary:     'Enterprises are scrambling to upgrade security before quantum computers break current encryption.',
    opportunity: 'B2B consulting & security audits are in high demand. $5k–$50k contracts per client.',
    tags:        ['B2B', 'Consulting', 'High Ticket'],
    tagColor:    C.rose,
  },
  {
    topic:       'Decentralised Finance Tools',
    category:    'finance',
    heat:        0.81,
    volumeShift: '+74%',
    summary:     'DeFi dashboards, portfolio trackers & crypto tax tools are seeing massive organic search growth.',
    opportunity: 'Build or resell SaaS tools in this niche. Subscribers pay $9–$49/month without blinking.',
    tags:        ['SaaS', 'Crypto Niche', 'Subscription'],
    tagColor:    C.sky,
  },
  {
    topic:       'Eco-Friendly Packaging',
    category:    'products',
    heat:        0.78,
    volumeShift: '+63%',
    summary:     'Consumers are actively choosing brands with sustainable packaging. Retailers are demanding it from suppliers.',
    opportunity: 'Wholesale eco packaging & resell to small businesses. High volume, repeat orders.',
    tags:        ['B2B', 'Wholesale', 'Growing Fast'],
    tagColor:    C.emerald,
  },
];

/* ─── Trend Card ─── */
const TrendCard = ({ trend, index }) => {
  const [expanded, setExpanded] = useState(false);
  const heat = heatLabel(trend.heat);
  const score = Math.round(trend.heat * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 20, overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Card top */}
      <div style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: C.white }}>{trend.topic}</h3>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {trend.tags.map(tag => (
                <span key={tag} style={{
                  padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                  background: `${trend.tagColor}20`, color: trend.tagColor,
                  border: `1px solid ${trend.tagColor}40`,
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right', marginLeft: 16, flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: heat.color }}>{heat.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.white, marginTop: 2 }}>{trend.volumeShift}</div>
            <div style={{ fontSize: 11, color: C.muted }}>search volume</div>
          </div>
        </div>

        {/* Popularity bar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: C.muted }}>Popularity Score</span>
            <span style={{ fontSize: 12, color: trend.tagColor, fontWeight: 700 }}>{score} / 100</span>
          </div>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ delay: index * 0.07 + 0.3, duration: 0.9, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${trend.tagColor}, ${trend.tagColor}88)` }}
            />
          </div>
        </div>

        <p style={{ margin: '0 0 16px', fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{trend.summary}</p>

        {/* Opportunity box */}
        <div style={{
          background: C.emeraldLt, border: `1px solid ${C.emerald}33`,
          borderRadius: 12, padding: '12px 14px',
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <Lightbulb size={15} color={C.emerald} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 11, color: C.emerald, fontWeight: 700, marginBottom: 3 }}>BUSINESS OPPORTUNITY</div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{trend.opportunity}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Stat pill ─── */
const Stat = ({ icon: Icon, value, label, color }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 16, padding: '18px 22px',
    display: 'flex', alignItems: 'center', gap: 14,
  }}>
    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={20} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.white }}>{value}</div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{label}</div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */
export default function CortexTrendSandbox() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isRefreshing, setIsRefreshing]     = useState(false);
  const [lastUpdated, setLastUpdated]       = useState('Just now');

  const filtered = activeCategory === 'all'
    ? ALL_TRENDS
    : ALL_TRENDS.filter(t => t.category === activeCategory);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.bg,
      fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
      color: C.text,
    }}>
      {/* ── Purple top glow ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 500, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 90% 55% at 50% -15%, rgba(139,92,246,0.18) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ════════ HERO ════════ */}
        <div style={{ padding: '52px 0 40px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
              background: C.purpleLt, border: `1px solid ${C.border}`, borderRadius: 999, padding: '6px 16px' }}>
              <Flame size={14} color={C.rose} />
              <span style={{ fontSize: 13, color: C.purple, fontWeight: 600 }}>Updated every 24 hours automatically</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: C.white, margin: '0 0 16px', lineHeight: 1.15 }}>
              Discover What People Are<br />
              <span style={{ background: 'linear-gradient(90deg, #8b5cf6, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Buying & Talking About
              </span>
            </h1>
            <p style={{ fontSize: 18, color: C.muted, margin: '0 auto 32px', maxWidth: 560, lineHeight: 1.7 }}>
              Real-time trend intelligence for dropshippers, founders, and marketers.
              Find your next winning product or business idea — updated daily.
            </p>

            {/* Who is this for pills */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
              {[
                { icon: <ShoppingBag size={13} />, label: 'Dropshippers'     },
                { icon: <Target size={13} />,      label: 'Business Founders'},
                { icon: <Megaphone size={13} />,   label: 'Marketers'        },
                { icon: <Package size={13} />,     label: 'Product Sellers'  },
              ].map(p => (
                <div key={p.label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 999, padding: '6px 14px',
                  fontSize: 13, color: C.muted, fontWeight: 500,
                }}>
                  {p.icon} {p.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ════════ STATS ROW ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}
        >
          <Stat icon={Globe}       value="124+"   label="Sources scanned daily"    color={C.purple}  />
          <Stat icon={TrendingUp}  value="4.8M"   label="Search signals analysed"  color={C.emerald} />
          <Stat icon={BarChart2}   value="< 15ms" label="Data refresh speed"        color={C.amber}   />
        </motion.div>

        {/* ════════ FILTER + REFRESH BAR ════════ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 16px', borderRadius: 10, border: `1px solid`,
                  borderColor: activeCategory === cat.id ? C.purple : C.border,
                  background: activeCategory === cat.id ? C.purpleLt : 'transparent',
                  color: activeCategory === cat.id ? C.white : C.muted,
                  fontSize: 13, fontWeight: 600,
                  transition: 'all 0.2s', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 18px', borderRadius: 10, border: `1px solid ${C.border}`,
              background: 'transparent', color: C.muted, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            {isRefreshing ? 'Refreshing…' : `Last updated: ${lastUpdated}`}
          </button>
        </div>

        {/* ════════ TREND CARDS ════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 18 }}
          >
            {filtered.map((trend, i) => (
              <TrendCard key={trend.topic} trend={trend} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ════════ HOW TO USE THIS ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ marginTop: 56 }}
        >
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.white, textAlign: 'center', marginBottom: 8 }}>
            How to Use These Trends
          </h2>
          <p style={{ textAlign: 'center', color: C.muted, fontSize: 15, marginBottom: 36 }}>
            Three simple ways to turn a trending topic into real income
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              {
                step: '01',
                icon: <Search size={22} color={C.purple} />,
                title: 'Spot the Trend',
                desc: 'Browse the daily trending list. Filter by what matters to you — products, tech, health, or finance.',
                color: C.purple,
              },
              {
                step: '02',
                icon: <Lightbulb size={22} color={C.amber} />,
                title: 'Read the Opportunity',
                desc: 'Each card explains exactly how this trend translates into a business move — in plain English.',
                color: C.amber,
              },
              {
                step: '03',
                icon: <DollarSign size={22} color={C.emerald} />,
                title: 'Act & Earn',
                desc: 'Source the product, launch the service, or run the ad campaign while the trend is still hot.',
                color: C.emerald,
              },
            ].map(s => (
              <div key={s.step} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: '28px 24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.icon}
                  </div>
                  <span style={{ fontSize: 12, color: C.muted, fontWeight: 700, letterSpacing: '0.1em' }}>STEP {s.step}</span>
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: 17, fontWeight: 700, color: C.white }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════════ CTA BANNER ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{
            marginTop: 48,
            background: 'linear-gradient(135deg, #1e1245, #0f1e14)',
            border: `1px solid rgba(139,92,246,0.3)`,
            borderRadius: 24, padding: '36px 40px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Zap size={16} color={C.amber} />
              <span style={{ fontSize: 12, color: C.amber, fontWeight: 700, letterSpacing: '0.08em' }}>GET DAILY ALERTS</span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: C.white }}>
              Never miss a trending opportunity
            </h3>
            <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>
              Get this report delivered to your inbox every morning — automatically.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
                color: C.white, fontSize: 14, outline: 'none', minWidth: 220,
              }}
            />
            <button style={{
              padding: '12px 22px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            }}>
              Subscribe Free <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}
