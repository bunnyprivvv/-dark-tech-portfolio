import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Search, Zap, ShoppingBag, BarChart2,
  Globe, Star, ArrowRight, RefreshCw, CheckCircle,
  Flame, Target, DollarSign, Package, Megaphone,
  Lightbulb, Sparkles, Cpu, Layers, HelpCircle,
  Briefcase, ArrowUpRight, HelpCircle as HelpIcon, Clipboard,
  Sliders, ChevronRight, User, AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/* ─── Palette ─── */
const C = {
  bg:         '#0b0816',
  bgGradient: 'linear-gradient(185deg, #07050e 0%, #120e24 100%)',
  surface:    'rgba(23, 17, 43, 0.45)',
  card:       'rgba(30, 24, 56, 0.65)',
  cardHover:  'rgba(43, 34, 80, 0.85)',
  border:     'rgba(167, 139, 250, 0.15)',
  borderHover: 'rgba(167, 139, 250, 0.35)',
  purple:     '#a78bfa',
  royal:      '#8b5cf6',
  emerald:    '#34d399',
  emeraldLt:  'rgba(52, 211, 153, 0.1)',
  gold:       '#fbbf24',
  goldLt:     'rgba(251, 191, 36, 0.1)',
  rose:       '#f87171',
  text:       '#e2d9f3',
  textMuted:  '#8a7baf',
  white:      '#ffffff',
};

/* ─── Product Dataset ─── */
const DYNAMIC_PRODUCTS = [
  {
    id: 1,
    name: 'Smart Glowing Anti-Lost Pet Collar',
    category: 'pets',
    categoryLabel: 'Pet Supplies',
    emoji: '🐕',
    heatScore: 97,
    growth: '+312%',
    sentiment: '94% Positive',
    sourcingCost: 3.20,
    retailPrice: 24.99,
    summary: 'A high-visibility LED and Bluetooth-syncing smart collar that lets pet parents track walks and keep dogs safe at night. TikTok feeds are exploding with nighttime pet walk aesthetics.',
    bestSupplier: {
      name: 'Shenzhen PetGlow Tech Co.',
      rating: '4.9 ⭐ (Gold Supplier)',
      shipping: '5-7 days (Zendrop / YunExpress)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'My dog used to disappear in the dark... until I found this. Look at him glow! 🐕✨'",
      "💡 Pain Point Angle: Over 80% of pet accidents happen at night. Keep your best friend safe and visible from 500 yards away.",
      "📦 Dropshipping Offer: Buy 1 Get 1 Free + Free Shipping tonight only. Add to cart!"
    ]
  },
  {
    id: 2,
    name: 'Micro-Current Facial Toning Roller',
    category: 'beauty',
    categoryLabel: 'Beauty & Skincare',
    emoji: '💆‍♀️',
    heatScore: 94,
    growth: '+248%',
    sentiment: '91% Positive',
    sourcingCost: 7.80,
    retailPrice: 49.99,
    summary: 'A portable anti-aging device using low-voltage electrical currents to stimulate skin cells and contour muscles. Popularized by celebrity skincare morning routines.',
    bestSupplier: {
      name: 'Yiwu GlowTech Beauty Ltd.',
      rating: '4.8 ⭐ (Premium Verified)',
      shipping: '6-9 days (AliExpress VIP Line)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'Get a professional facelift at home for under $50. No needles, no expensive clinic bills. 💆‍♀️✨'",
      "💡 Comparison Angle: Why spend $300+ on luxury facial spas when you can contour your jawline in 5 minutes at home?",
      "📦 Dropshipping Offer: Get 50% Off and our free Morning Skincare Guide with every purchase!"
    ]
  },
  {
    id: 3,
    name: 'Cozy Sunset Atmosphere Projector',
    category: 'home',
    categoryLabel: 'Home Decor & Lighting',
    emoji: '🌅',
    heatScore: 89,
    growth: '+185%',
    sentiment: '86% Positive',
    sourcingCost: 2.10,
    retailPrice: 19.99,
    summary: 'A compact optical lamp that projects a hyper-realistic sunset light onto walls, creating instant cozy ambiance. Absolute must-have for content creators and bedroom aesthetic makeovers.',
    bestSupplier: {
      name: 'Guangzhou Aurora Optoelectronics',
      rating: '4.7 ⭐ (High-Volume OEM)',
      shipping: '5-8 days (CNE Express)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'Turn any boring wall into a golden hour sunset. Instant cozy room upgrade! 🌅💛'",
      "💡 Influencer Angle: Want the perfect aesthetic background for your videos? This lamp does all the work for you.",
      "📦 Dropshipping Offer: Add to Cart now for Free Shipping + a Free Room Aesthetic Sticker Pack!"
    ]
  },
  {
    id: 4,
    name: 'Ultra-Thin Magnetic Wireless Power Bank',
    category: 'tech',
    categoryLabel: 'Tech Gadgets',
    emoji: '🔋',
    heatScore: 92,
    growth: '+198%',
    sentiment: '88% Positive',
    sourcingCost: 9.50,
    retailPrice: 39.99,
    summary: 'A pocket-sized 10,000mAh external battery that magnetically snaps onto the back of phones for seamless wireless charging. Extremely popular for travelers and daily commuters.',
    bestSupplier: {
      name: 'Dongguan PowerVibe Technology',
      rating: '4.9 ⭐ (Verified Supplier)',
      shipping: '4-7 days (Fast FedEx Special)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'No cables. No bulk. Just snap and charge. The thinnest magnetic charger ever made. 🔋⚡'",
      "💡 Action Angle: Stop carrying heavy brick chargers. Snap this card-sized power bank and double your battery life instantly.",
      "📦 Dropshipping Offer: Save 40% on our travel bundle today only. Ships in 24 hours!"
    ]
  },
  {
    id: 5,
    name: 'Portable Hydrogen Hydration Bottle',
    category: 'health',
    categoryLabel: 'Health & Wellness',
    emoji: '🥤',
    heatScore: 98,
    growth: '+410%',
    sentiment: '96% Positive',
    sourcingCost: 12.40,
    retailPrice: 69.99,
    summary: 'A smart water bottle that infuses high concentrations of molecular hydrogen gas into regular water. Heavily trending on athletic recovery and wellness podcast feeds.',
    bestSupplier: {
      name: 'Guangdong BioHydration Co.',
      rating: '4.9 ⭐ (ISO9001 Certified)',
      shipping: '6-10 days (Zendrop Line)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'Why is everyone drinking bubbly water out of blue glowing bottles? Here is the science behind the recovery hype...'",
      "💡 Health Angle: Boost hydration, accelerate athletic muscle recovery, and flush out free radicals with every sip.",
      "📦 Dropshipping Offer: Elite Athletes Bundle: Buy now and get a premium carry case free!"
    ]
  }
];

/* ─── Initial Live Radar Log Pool ─── */
const RADAR_LOGS_POOL = [
  "Scanned 1,240 TikTok Ad library posts with tag #dropshipping",
  "High breakout velocity detected: 'Hydrogen water recovery' (+410%)",
  "Synced API product pricing for 'LED Smart Pet Collars'",
  "AliExpress scraper synced: Yiwu beauty supplier stock updated",
  "Google Trends breakout signal identified in 'Wellness & Hydration'",
  "Facebook Ad library analyzer matched 42 winning ads in 'Pet Care'",
  "Amazon bestseller index flagged 'Micro-Current contour device' as #3",
  "Reddit commercial sentiment analyzer reports 89% net positive on 'Aesthetic Room Lamps'",
  "Shopify Store spy tool tracked 14 dropshippers making $10k+/mo with magnetic chargers",
  "Pinterest visual interest index reports 140% month-over-month increase in 'Sunset Bedroom Lights'"
];

export default function CortexTrendSandbox() {
  const { setCursorState, playSynthSound } = usePortfolio();

  /* ─── State Management ─── */
  const [activeCategory, setActiveCategory] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  
  // Live Radar Ticker State
  const [radarLogs, setRadarLogs] = useState([
    "[System] Autoscanning 124 global trend feeds...",
    "[TikTok Scraper] Analysed 14,212 ads under tag #dropshipping",
    "[Google Scraper] High search breakout detected: 'Hydrogen water recovery'",
    "[Shopify API] Real-time product sales data synced for 'Micro-Current Facial'",
    "[Sentiment AI] Positive NLP weight index for 'Aesthetic Projector Lamps' is now 86%",
    "[Data Sync] Database optimized and ready for active extraction"
  ]);

  // Sourcing Simulation State
  const [sourcingId, setSourcingId] = useState(null);
  const [sourcingLoading, setSourcingLoading] = useState(false);
  const [sourcingResult, setSourcingResult] = useState(null);

  // Ad Copy Generation State
  const [adCopyId, setAdCopyId] = useState(null);
  const [adCopyLoading, setAdCopyLoading] = useState(false);
  const [adCopyResult, setAdCopyResult] = useState(null);

  // Profit Calculator State
  const [unitsSold, setUnitsSold] = useState(25);
  const [netProfit, setNetProfit] = useState(30);

  // Brand Generator Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [nicheInput, setNicheInput] = useState('pets');
  const [vibeInput, setVibeInput] = useState('playful');
  const [wizardLoading, setWizardLoading] = useState(false);
  const [wizardResult, setWizardResult] = useState(null);

  /* ─── Auto-update Live Radar Logs ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = RADAR_LOGS_POOL[Math.floor(Math.random() * RADAR_LOGS_POOL.length)];
      const formattedLog = `[${new Date().toLocaleTimeString()}] ${randomLog}`;
      setRadarLogs(prev => [formattedLog, ...prev.slice(0, 5)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  /* ─── Trigger Refresh ─── */
  const handleRefresh = () => {
    playSynthSound('hover');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
      playSynthSound('success');
      // Add a fresh log
      setRadarLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ⚡ Fully updated all scrapers and API streams!`,
        ...prev.slice(0, 5)
      ]);
    }, 1200);
  };

  /* ─── Sourcing Search Simulation ─── */
  const triggerSourcingSearch = (product) => {
    playSynthSound('click');
    setSourcingResult(null);
    setSourcingId(product.id);
    setSourcingLoading(true);

    setTimeout(() => {
      setSourcingLoading(false);
      setSourcingResult(product.bestSupplier);
      playSynthSound('success');
    }, 1800);
  };

  /* ─── Ad Copy Generation Simulation ─── */
  const triggerAdGenerator = (product) => {
    playSynthSound('click');
    setAdCopyResult(null);
    setAdCopyId(product.id);
    setAdCopyLoading(true);

    setTimeout(() => {
      setAdCopyLoading(false);
      setAdCopyResult(product.adHooks);
      playSynthSound('success');
    }, 1500);
  };

  /* ─── AI Brand Wizard Generation ─── */
  const generateBrandConcept = () => {
    playSynthSound('click');
    setWizardLoading(true);
    setWizardStep(3); // Go to loading screen

    setTimeout(() => {
      // Mock Brand database based on inputs
      const names = {
        pets: {
          playful: { name: "BarkVibe 🐕", slogan: "Make your dog walks aesthetic & glow!", targeting: "Interests: Dog owners, TikTok dog parents, BarkBox fans. Age: 18-38" },
          premium: { name: "AeroPaw 👑", slogan: "Premium technical gear for modern canine lifestyle.", targeting: "Interests: Luxury pet supplies, designer dogs, organic pet food. Age: 25-50" },
          eco:     { name: "Pawsitive Earth 🌿", slogan: "Biodegradable, hyper-safe play essential for dogs.", targeting: "Interests: Sustainability, eco-living, rescue pets. Age: 20-45" },
          geek:    { name: "CyberCollar ⚡", slogan: "Next-gen tech collars for connected smart-pets.", targeting: "Interests: Gadgets, automation, dog tracking, smart-home. Age: 22-45" }
        },
        beauty: {
          playful: { name: "GlowBurst 💖", slogan: "Get that radiant summer skin in under 5 minutes!", targeting: "Interests: Beauty hacks, GRWM TikTok, Sephora haulers. Age: 16-30" },
          premium: { name: "Lumina Skin Care 👑", slogan: "Clinical-grade face sculpting right in your boudoir.", targeting: "Interests: Luxury cosmetics, facial massage, skincare science. Age: 28-60" },
          eco:     { name: "NectarGlow 🌿", slogan: "Organic micro-current toning powered by natural clean vibes.", targeting: "Interests: Natural beauty, vegan skincare, cruelty-free. Age: 22-45" },
          geek:    { name: "DermaFlux ⚡", slogan: "Precision bio-electric face sculpting tools.", targeting: "Interests: Skincare tech, high-tech gadgets, biohacking. Age: 24-50" }
        },
        home: {
          playful: { name: "VibeLamp Co. 🌅", slogan: "Instant serotonin for your bedroom walls.", targeting: "Interests: Cozy room vibes, Pinterest bedrooms, bedroom lighting. Age: 15-30" },
          premium: { name: "Sol Light Lab 👑", slogan: "Architectural lighting to recreate organic sunsets.", targeting: "Interests: Interior design, home remodeling, luxury lighting. Age: 26-55" },
          eco:     { name: "SolEco 🌿", slogan: "Zero-waste atmosphere projection with high efficiency bulbs.", targeting: "Interests: Sustainable design, clean home, solar energy. Age: 22-45" },
          geek:    { name: "SpectraSync ⚡", slogan: "Smart atmosphere lamps syncing to your smart home hubs.", targeting: "Interests: Smart home, home assistant, smart lighting. Age: 20-45" }
        },
        tech: {
          playful: { name: "SnapCharge 🔋", slogan: "The pocket size charger that magnetically clings to you.", targeting: "Interests: Tech hacks, travel hacks, backpackers, college gear. Age: 16-35" },
          premium: { name: "VoltCore 👑", slogan: "Technical magnetic battery solutions for high-flyers.", targeting: "Interests: Apple accessories, business travel, minimalist gear. Age: 25-50" },
          eco:     { name: "VoltGreen 🌿", slogan: "Recycled aluminum high-speed magnetic power bank.", targeting: "Interests: Green tech, sustainable gadgets, recycled electronics. Age: 20-45" },
          geek:    { name: "NexusSnap ⚡", slogan: "Inductive MagSafe telemetry cell for hyper-chargers.", targeting: "Interests: Inductive charging, tech specs, hardware hacking. Age: 18-40" }
        }
      };

      const selected = names[nicheInput]?.[vibeInput] || names.pets.playful;

      setWizardLoading(false);
      setWizardResult({
        name: selected.name,
        slogan: selected.slogan,
        targeting: selected.targeting,
        niche: nicheInput.charAt(0).toUpperCase() + nicheInput.slice(1),
        vibe: vibeInput.charAt(0).toUpperCase() + vibeInput.slice(1),
        adScript: `📣 AD SCRIPT FOR TIKTOK SHOP:\n"Wait! If you love ${nicheInput === 'pets' ? 'dogs' : nicheInput === 'beauty' ? 'glowing skin' : 'beautiful designs'}, you have to see this. Everyone on my FYP is obsessed with this product. It is literally changing my daily routine. Use the 50% discount in our bio before it sells out! 😱🔥"`
      });
      setWizardStep(4); // Go to results screen
      playSynthSound('success');
    }, 2500);
  };

  /* ─── Margin & Profit Calculations ─── */
  const dailyProfit = unitsSold * netProfit;
  const monthlyProfit = dailyProfit * 30;
  const annualProfit = dailyProfit * 365;

  const getHustleBadge = () => {
    if (monthlyProfit < 1200) return { label: '🌱 Starter Hustle', sub: 'Perfect side cash to cover coffee & monthly subscriptions.', color: C.purple };
    if (monthlyProfit >= 1200 && monthlyProfit < 4000) return { label: '🚀 Full-Time Path', sub: 'Replacing standard office wages with automated flows.', color: C.emerald };
    if (monthlyProfit >= 4000 && monthlyProfit < 10000) return { label: '💎 High-Growth Brand', sub: 'Excellent income level for custom private-label branding.', color: C.gold };
    return { label: '👑 E-Commerce Empire', sub: 'Fully scalable dropshipping empire generated autonomously!', color: C.rose };
  };

  const hustle = getHustleBadge();

  // Filter products by active category tab
  const filteredProducts = activeCategory === 'all'
    ? DYNAMIC_PRODUCTS
    : DYNAMIC_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bgGradient,
      fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
      color: C.text,
      padding: '0 0 100px 0',
      overflowX: 'hidden'
    }}>
      {/* 🌌 Premium Ambient Glows */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 450, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139, 92, 246, 0.22) 0%, rgba(52, 211, 153, 0.03) 70%, transparent 100%)'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1120, margin: '0 auto', padding: '0 20px' }}>
        
        {/* 🚀 Header & Navigation */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 0', marginBottom: '32px', borderBottom: `1px solid ${C.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #8b5cf6, #34d399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
            }}>
              <Zap size={18} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: 18, fontWeight: 900, color: C.white, tracking: '0.03em' }}>CORTEX TREND</span>
              <span style={{ fontSize: 13, color: C.emerald, marginLeft: 6, fontWeight: 700, background: C.emeraldLt, padding: '2px 8px', borderRadius: 6 }}>API V4</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 50, border: `1px solid ${C.border}`,
                background: C.surface, color: C.text, fontSize: 12, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              className="hover-effect"
            >
              <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1.2s linear infinite' : 'none' }} />
              {isRefreshing ? 'Re-scanning feeds...' : 'Sync Scrapers'}
            </button>
            <span style={{ fontSize: 11, color: C.textMuted }}>Last Refreshed: {lastUpdated}</span>
          </div>
        </header>

        {/* 🎯 Section 1: Hero & Main Hook */}
        <div style={{ textAlign: 'center', padding: '16px 0 36px', maxWidth: 740, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14,
            background: 'rgba(139, 92, 246, 0.08)', border: `1px solid rgba(139, 92, 246, 0.25)`,
            borderRadius: 50, padding: '4px 14px'
          }}>
            <Sparkles size={12} color={C.purple} />
            <span style={{ fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: '0.05em' }}>AUTOMATED INCOME DETECTOR</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 900, color: C.white, lineHeight: 1.15, margin: '0 0 12px' }}>
            Turn Viral Market Data Into <br/>
            <span style={{ background: 'linear-gradient(90deg, #a78bfa, #34d399, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Hands-Off Profit Pipelines
            </span>
          </h1>
          <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>
            CortexTrend scans global TikTok ads, Google breakout search algorithms, and merchant records 24/7. Find high-margin, winning products, calculate your returns, and instantly spin up brand hooks in one click.
          </p>
        </div>

        {/* 📊 Section 2: Live Radar Ticker & Data Stream */}
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20,
          padding: '16px 20px', marginBottom: '40px', backdropFilter: 'blur(16px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 10, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.emerald, boxShadow: `0 0 10px ${C.emerald}`, display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: C.white }}>LIVE AUTONOMOUS RADAR DATA</span>
            </div>
            <span style={{ fontSize: 11, color: C.emerald, fontWeight: 700 }}>Scrapers Active & Scraping TikTok Shop</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 110, overflowY: 'hidden' }}>
            <AnimatePresence>
              {radarLogs.map((log, index) => (
                <motion.div
                  key={log + index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 12, fontFamily: 'monospace',
                    color: index === 0 ? C.emerald : index === 1 ? C.purple : C.textMuted,
                    display: 'flex', gap: 8, alignItems: 'center'
                  }}
                >
                  <span style={{ color: C.royal }}>▶</span> {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* 📦 Section 3: Winning Product Opportunity Cards */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: C.white, margin: 0 }}>🔥 Winning Product Opportunities</h2>
              <p style={{ fontSize: 13, color: C.textMuted, margin: '2px 0 0' }}>Highest-selling global breakout products sourced from scrapers</p>
            </div>

            {/* Category selection */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Niches', icon: '🌐' },
                { id: 'pets', label: 'Pet Supplies', icon: '🐕' },
                { id: 'beauty', label: 'Beauty', icon: '💅' },
                { id: 'home', label: 'Home Decor', icon: '🏠' },
                { id: 'tech', label: 'Tech Gadgets', icon: '🔋' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { playSynthSound('hover'); setActiveCategory(cat.id); }}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  style={{
                    padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                    border: '1px solid',
                    borderColor: activeCategory === cat.id ? C.purple : C.border,
                    background: activeCategory === cat.id ? 'rgba(167, 139, 250, 0.12)' : C.surface,
                    color: activeCategory === cat.id ? C.white : C.textMuted,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.2s'
                  }}
                  className="hover-effect"
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Product Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filteredProducts.map((p, index) => {
              const profitPerUnit = p.retailPrice - p.sourcingCost;
              const marginPercent = Math.round((profitPerUnit / p.retailPrice) * 100);

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
                  }}
                >
                  <div>
                    {/* Header line */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <span style={{ fontSize: 26 }}>{p.emoji}</span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: 10, color: C.rose, fontWeight: 900,
                          background: 'rgba(248, 113, 113, 0.08)',
                          border: `1px solid rgba(248, 113, 113, 0.25)`,
                          padding: '3px 8px', borderRadius: 6
                        }}>
                          🔥 HEAT: {p.heatScore}%
                        </span>
                        <div style={{ fontSize: 18, fontWeight: 800, color: C.white, marginTop: 4 }}>{p.growth}</div>
                        <span style={{ fontSize: 10, color: C.textMuted }}>Search volume signal</span>
                      </div>
                    </div>

                    {/* Title & Info */}
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.white, margin: '0 0 4px 0', lineHeight: 1.3 }}>{p.name}</h3>
                    <span style={{ fontSize: 11, color: C.purple, fontWeight: 700, letterSpacing: '0.03em' }}>{p.categoryLabel}</span>

                    <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, margin: '8px 0 14px 0' }}>{p.summary}</p>

                    {/* Sourcing Cost & Selling Stats */}
                    <div style={{
                      background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`,
                      borderRadius: 12, padding: '12px 14px', marginBottom: 16,
                      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, textAlign: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: 10, color: C.textMuted }}>Supplier Cost</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>${p.sourcingCost.toFixed(2)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.textMuted }}>Suggested Sale</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: C.emerald }}>${p.retailPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.textMuted }}>Profit Margin</div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: C.gold }}>{marginPercent}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Drawer & Simulation Trigger */}
                  <div>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                      <button
                        onClick={() => triggerSourcingSearch(p)}
                        onMouseEnter={() => setCursorState('hover')}
                        onMouseLeave={() => setCursorState('default')}
                        style={{
                          flex: 1, padding: '8px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700,
                          border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.04)',
                          color: C.white, cursor: 'pointer', transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                        }}
                        className="hover-effect"
                      >
                        <Search size={12} /> Find Supplier
                      </button>
                      <button
                        onClick={() => triggerAdGenerator(p)}
                        onMouseEnter={() => setCursorState('hover')}
                        onMouseLeave={() => setCursorState('default')}
                        style={{
                          flex: 1, padding: '8px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700,
                          border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.04)',
                          color: C.white, cursor: 'pointer', transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                        }}
                        className="hover-effect"
                      >
                        <Megaphone size={12} /> Generate Ad Hooks
                      </button>
                    </div>

                    {/* Sourcing Search Details Area */}
                    <AnimatePresence>
                      {sourcingId === p.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{
                            background: 'rgba(52, 211, 153, 0.05)', border: `1px solid rgba(52, 211, 153, 0.2)`,
                            borderRadius: 12, padding: 12, marginTop: 8, overflow: 'hidden'
                          }}
                        >
                          {sourcingLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: C.emerald }}>
                              <RefreshCw size={12} className="spin" style={{ animation: 'spin 1.2s linear infinite' }} />
                              Scanning database for best supplier logistics...
                            </div>
                          ) : sourcingResult ? (
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: C.emerald, fontWeight: 800, marginBottom: 4 }}>
                                <CheckCircle size={10} /> BEST SUPPLIER FOUND
                              </div>
                              <div style={{ fontSize: 11, color: C.white, fontWeight: 700 }}>{sourcingResult.name}</div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textMuted, marginTop: 4 }}>
                                <span>Rating: {sourcingResult.rating}</span>
                                <span>Transit: {sourcingResult.shipping}</span>
                              </div>
                              <button
                                onClick={() => { playSynthSound('success'); alert(`Simulated AliExpress Import: product ${p.name} pushed to mock store!`); }}
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                                style={{
                                  width: '100%', marginTop: 8, padding: '5px 8px', border: 'none', borderRadius: 6,
                                  background: C.emerald, color: C.bg, fontSize: 9, fontWeight: 850,
                                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                                }}
                              >
                                <ArrowUpRight size={10} /> PUSH PRODUCT TO SHOPIFY
                              </button>
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Ad Copy Hooks Drawer Area */}
                    <AnimatePresence>
                      {adCopyId === p.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{
                            background: 'rgba(167, 139, 250, 0.05)', border: `1px solid rgba(167, 139, 250, 0.2)`,
                            borderRadius: 12, padding: 12, marginTop: 8, overflow: 'hidden'
                          }}
                        >
                          {adCopyLoading ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: C.purple }}>
                              <RefreshCw size={12} className="spin" style={{ animation: 'spin 1.2s linear infinite' }} />
                              Writing creative high-converting ad angles...
                            </div>
                          ) : adCopyResult ? (
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: C.purple, fontWeight: 800, marginBottom: 6 }}>
                                <Sparkles size={10} /> HIGH-CONVERTING AD COPIES
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {adCopyResult.map((hook, idx) => (
                                  <div key={idx} style={{
                                    fontSize: 10, color: C.text, lineHeight: 1.4,
                                    background: 'rgba(255,255,255,0.03)', padding: '5px 8px', borderRadius: 6,
                                    borderLeft: `2px solid ${C.purple}`
                                  }}>
                                    {hook}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 🛠️ Section 4: Tools Dashboard (Calculator & Brand Wizard side-by-side) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: '60px' }}>
          
          {/* 💰 Left Tool: Interactive Sourcing & Margin Calculator */}
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24,
            padding: '28px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            backdropFilter: 'blur(16px)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Sliders size={18} color={C.emerald} />
                <span style={{ fontSize: 12, color: C.emerald, fontWeight: 800, letterSpacing: '0.05em' }}>PASSIVE INCOME FORECASTER</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: 0 }}>💰 E-Com Sourcing & Profit Calculator</h2>
              <p style={{ fontSize: 13, color: C.textMuted, margin: '2px 0 20px 0' }}>Estimate your daily, monthly, and yearly margins in seconds</p>

              {/* Volume Slider */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: C.text }}>Units Sold per Day</span>
                  <span style={{ color: C.emerald, fontWeight: 800 }}>{unitsSold} orders</span>
                </div>
                <input
                  type="range" min="1" max="150" value={unitsSold}
                  onChange={(e) => { playSynthSound('hover'); setUnitsSold(parseInt(e.target.value)); }}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  style={{
                    width: '100%', height: 6, borderRadius: 999, background: C.border,
                    outline: 'none', cursor: 'pointer', accentColor: C.emerald
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textMuted, marginTop: 4 }}>
                  <span>1 unit</span>
                  <span>150 units / day</span>
                </div>
              </div>

              {/* Profit Slider */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: C.text }}>Net Profit margin per Unit</span>
                  <span style={{ color: C.gold, fontWeight: 800 }}>${netProfit} USD</span>
                </div>
                <input
                  type="range" min="5" max="100" value={netProfit}
                  onChange={(e) => { playSynthSound('hover'); setNetProfit(parseInt(e.target.value)); }}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  style={{
                    width: '100%', height: 6, borderRadius: 999, background: C.border,
                    outline: 'none', cursor: 'pointer', accentColor: C.gold
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.textMuted, marginTop: 4 }}>
                  <span>$5 margin</span>
                  <span>$100 margin / unit</span>
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            <div>
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 18, marginBottom: 16
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>Daily Cash flow</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.white }}>${dailyProfit.toLocaleString()}</div>
                  </div>
                  <div style={{ borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, color: C.textMuted }}>Monthly Passive</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: C.emerald }}>${monthlyProfit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>Annual Revenue</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.gold }}>${annualProfit.toLocaleString()}</div>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, background: hustle.color + '20',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Briefcase size={16} color={hustle.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: hustle.color }}>{hustle.label}</div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>{hustle.sub}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.textMuted }}>
                <AlertCircle size={12} color={C.purple} />
                <span>Simulated based on average Shopify dropshipping metrics.</span>
              </div>
            </div>
          </div>

          {/* 🧙 Right Tool: Step-by-Step AI Niche & Brand Generator Wizard */}
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24,
            padding: '28px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            backdropFilter: 'blur(16px)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Sparkles size={18} color={C.purple} />
                <span style={{ fontSize: 12, color: C.purple, fontWeight: 800, letterSpacing: '0.05em' }}>AI CO-FOUNDER SUITE</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: 0 }}>🧙 AI Niche & Brand Concept Generator</h2>
              <p style={{ fontSize: 13, color: C.textMuted, margin: '2px 0 20px 0' }}>Launch an instant e-commerce brand concept matched to active trends</p>

              {/* Wizard Steps Layout */}
              <div style={{ position: 'relative', minHeight: 180 }}>
                {wizardStep === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <span style={{ fontSize: 12, color: C.white, fontWeight: 700 }}>Step 1: Choose Your Dropshipping Niche</span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {[
                        { id: 'pets', label: 'Pet Gadgets', emoji: '🐕' },
                        { id: 'beauty', label: 'Beauty & Contour', emoji: '💅' },
                        { id: 'home', label: 'Sunset & Mood Lights', emoji: '🌅' },
                        { id: 'tech', label: 'Magnetic Power Tech', emoji: '🔋' }
                      ].map(n => (
                        <button
                          key={n.id}
                          onClick={() => { playSynthSound('click'); setNicheInput(n.id); }}
                          style={{
                            padding: '12px 14px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                            background: nicheInput === n.id ? 'rgba(167, 139, 250, 0.12)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${nicheInput === n.id ? C.purple : C.border}`,
                            color: C.white, fontSize: 12, fontWeight: 700, transition: 'all 0.2s'
                          }}
                        >
                          <span style={{ marginRight: 6 }}>{n.emoji}</span> {n.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { playSynthSound('success'); setWizardStep(2); }}
                      style={{
                        alignSelf: 'flex-end', marginTop: 10, padding: '8px 16px', borderRadius: 8,
                        background: C.purple, border: 'none', color: C.bg, fontSize: 12, fontWeight: 900,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
                      }}
                    >
                      Next Step <ChevronRight size={14} />
                    </button>
                  </motion.div>
                )}

                {wizardStep === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <span style={{ fontSize: 12, color: C.white, fontWeight: 700 }}>Step 2: Choose Your Brand Vibe</span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {[
                        { id: 'playful', label: 'Playful & Bold', desc: 'Gen-Z friendly, lots of color' },
                        { id: 'premium', label: 'Modern & Premium', desc: 'Minimalist, luxury appeal' },
                        { id: 'eco', label: 'Eco-Living & Soft', desc: 'Clean aesthetics, organic look' },
                        { id: 'geek', label: 'High-Tech Geek', desc: 'Spec sheets & sci-fi styling' }
                      ].map(v => (
                        <button
                          key={v.id}
                          onClick={() => { playSynthSound('click'); setVibeInput(v.id); }}
                          style={{
                            padding: '10px 12px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
                            background: vibeInput === v.id ? 'rgba(167, 139, 250, 0.12)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${vibeInput === v.id ? C.purple : C.border}`,
                            color: C.white, fontSize: 12, fontWeight: 700, transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ fontSize: 11, fontWeight: 800 }}>{v.label}</div>
                          <div style={{ fontSize: 9, color: C.textMuted, marginTop: 2, fontWeight: 400 }}>{v.desc}</div>
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                      <button
                        onClick={() => { playSynthSound('hover'); setWizardStep(1); }}
                        style={{
                          padding: '8px 14px', borderRadius: 8, background: 'transparent',
                          border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 12, fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Back
                      </button>
                      <button
                        onClick={generateBrandConcept}
                        style={{
                          padding: '8px 16px', borderRadius: 8,
                          background: 'linear-gradient(135deg, #8b5cf6, #34d399)', border: 'none',
                          color: C.white, fontSize: 12, fontWeight: 900,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                        }}
                      >
                        <Sparkles size={12} /> Deploy Brand Concept
                      </button>
                    </div>
                  </motion.div>
                )}

                {wizardStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      minHeight: 180, textAlign: 'center'
                    }}
                  >
                    <div style={{
                      width: 50, height: 50, borderRadius: '50%',
                      border: `3px solid rgba(139,92,246,0.15)`, borderTopColor: C.purple,
                      animation: 'spin 1s linear infinite', marginBottom: 16
                    }} />
                    <span style={{ fontSize: 13, color: C.purple, fontWeight: 800, display: 'block', animation: 'pulse 1.5s infinite' }}>
                      CortexTrend AI is Synthesizing Brand...
                    </span>
                    <span style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>
                      Analyzing competitor Meta ads, pricing targets, and trending slogans
                    </span>
                  </motion.div>
                )}

                {wizardStep === 4 && wizardResult && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{
                      background: 'rgba(167, 139, 250, 0.05)', border: `1px solid rgba(167, 139, 250, 0.25)`,
                      borderRadius: 16, padding: '14px 16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: C.white }}>{wizardResult.name}</span>
                        <span style={{ fontSize: 10, color: C.emerald, fontWeight: 800, background: C.emeraldLt, padding: '2px 8px', borderRadius: 6 }}>
                          Vibe: {wizardResult.vibe}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: C.textMuted, fontStyle: 'italic', marginBottom: 10 }}>"{wizardResult.slogan}"</div>

                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 9, color: C.purple, fontWeight: 800, letterSpacing: '0.02em', marginBottom: 2 }}>META / TIKTOK AUDIENCE TARGETING</div>
                        <div style={{ fontSize: 10, color: C.text }}>{wizardResult.targeting}</div>
                      </div>

                      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
                        <div style={{ fontSize: 9, color: C.purple, fontWeight: 800, letterSpacing: '0.02em', marginBottom: 4 }}>READY TIKTOK AD SCRIPT</div>
                        <div style={{
                          fontSize: 9, fontFamily: 'monospace', color: C.textMuted,
                          background: 'rgba(0,0,0,0.2)', padding: 6, borderRadius: 6, maxHeight: 60, overflowY: 'auto'
                        }}>
                          {wizardResult.adScript}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => { playSynthSound('click'); setWizardStep(1); }}
                        style={{
                          flex: 1, padding: '8px 10px', borderRadius: 8, background: 'transparent',
                          border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 11, fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Generate Another
                      </button>
                      <button
                        onClick={() => {
                          playSynthSound('success');
                          navigator.clipboard.writeText(`${wizardResult.name}\n${wizardResult.slogan}\n\nTargeting: ${wizardResult.targeting}\n\nScript: ${wizardResult.adScript}`);
                          alert("Brand assets copied to clipboard! Ready to launch your landing page.");
                        }}
                        style={{
                          flex: 1.3, padding: '8px 10px', borderRadius: 8,
                          background: C.emerald, border: 'none', color: C.bg, fontSize: 11, fontWeight: 850,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                        }}
                      >
                        <Clipboard size={12} /> COPY BRAND ASSETS
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Wizard footer indicators */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1, 2, 3, 4].map(s => (
                  <div key={s} style={{
                    width: 14, height: 4, borderRadius: 2,
                    background: wizardStep === s ? C.purple : C.border
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 10, color: C.textMuted }}>Powered by GPT-4 Trend Engine</span>
            </div>
          </div>
        </div>

        {/* 🛡️ Section 5: Subscription Form Block */}
        <div style={{
          background: 'linear-gradient(135deg, #171131 0%, #0d1a15 100%)',
          border: `1px solid rgba(139, 92, 246, 0.25)`, borderRadius: 28,
          padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 32, flexWrap: 'wrap', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Sparkles size={14} color={C.gold} />
              <span style={{ fontSize: 11, color: C.gold, fontWeight: 800, letterSpacing: '0.05em' }}>FREE DAILY RADAR ALERTS</span>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 850, color: C.white, margin: '0 0 4px 0' }}>
              Never miss a 10x dropshipping breakout
            </h3>
            <p style={{ fontSize: 13, color: C.textMuted, margin: 0, maxWidth: 480 }}>
              Get our daily, automated market intelligence digest with trending supplier links sent directly to your inbox every morning. 100% free.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                padding: '12px 18px', borderRadius: 14, background: 'rgba(0, 0, 0, 0.2)',
                border: `1px solid ${C.border}`, color: C.white, fontSize: 13, outline: 'none',
                minWidth: 240, transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = C.purple}
              onBlur={(e) => e.target.style.borderColor = C.border}
            />
            <button
              onClick={() => { playSynthSound('success'); alert("Subscribed! You will receive tomorrow morning's winning product report."); }}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
              style={{
                padding: '12px 24px', borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg, #8b5cf6, #34d399)',
                color: C.white, fontWeight: 800, fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8
              }}
              className="hover-effect"
            >
              Get Daily Trends <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Global CSS adjustments for animations */}
      <style>{`
        .spin {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        }
      `}</style>
    </div>
  );
}
