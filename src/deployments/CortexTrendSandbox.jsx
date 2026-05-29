import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Search, Zap, ShoppingBag, BarChart2,
  Globe, Star, ArrowRight, RefreshCw, CheckCircle,
  Flame, Target, DollarSign, Package, Megaphone,
  Lightbulb, Sparkles, Cpu, Layers, HelpCircle,
  Briefcase, ArrowUpRight, Clipboard, Sliders, 
  ChevronRight, User, AlertCircle, Key, Lock, Menu, X, ShieldAlert
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/* ─── Aesthetic Colors Palette ─── */
const C = {
  bg:         '#090514',
  bgGradient: 'linear-gradient(185deg, #05030c 0%, #100b21 100%)',
  surface:    'rgba(21, 15, 41, 0.5)',
  card:       'rgba(30, 20, 58, 0.65)',
  cardHover:  'rgba(45, 30, 85, 0.85)',
  border:     'rgba(167, 139, 250, 0.16)',
  borderHover: 'rgba(167, 139, 250, 0.38)',
  purple:     '#a78bfa',
  royal:      '#8b5cf6',
  emerald:    '#34d399',
  emeraldLt:  'rgba(52, 211, 153, 0.12)',
  gold:       '#fbbf24',
  goldLt:     'rgba(251, 191, 36, 0.12)',
  rose:       '#f87171',
  text:       '#e2d9f3',
  textMuted:  '#8a7baf',
  white:      '#ffffff',
};

/* ─── Region Configuration ─── */
const REGIONS = [
  { id: 'all', label: 'Global', flag: '🌐' },
  { id: 'us',  label: 'United States', flag: '🇺🇸', code: 'US' },
  { id: 'uk',  label: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
  { id: 'ca',  label: 'Canada', flag: '🇨🇦', code: 'CA' },
  { id: 'au',  label: 'Australia', flag: '🇦🇺', code: 'AU' },
  { id: 'eu',  label: 'Europe', flag: '🇪🇺', code: 'EU' }
];

/* ─── Sourced Products Dataset with Regional/Spy Data ─── */
const DYNAMIC_PRODUCTS = [
  {
    id: 1,
    name: 'Smart Glowing Anti-Lost Pet Collar',
    category: 'pets',
    emoji: '🐕',
    heatScore: 97,
    growth: '+312%',
    regions: ['us', 'ca', 'uk'],
    topRegion: '🇺🇸 United States',
    saturation: 'Moderate',
    sourcingCost: 3.20,
    retailPrice: 24.99,
    summary: 'High-visibility LED and Bluetooth tracking collar with smartphone sync. TikTok is currently overflowing with nighttime pet walk aesthetics.',
    bestSupplier: {
      name: 'Shenzhen PetGlow Tech Co.',
      rating: '4.9 ⭐ (Gold Supplier)',
      shipping: '5-7 days (YunExpress)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'My dog used to disappear in the dark... until I found this. Look at him glow! 🐕✨'",
      "💡 Pain Point: Over 80% of pet accidents happen at night. Keep your dog safe and visible from 500 yards away."
    ],
    competitors: [
      { store: 'BarkBoutique.co', revenue: '$14,200/mo', ads: 12 },
      { store: 'GlowPaws.shop', revenue: '$8,500/mo', ads: 6 }
    ]
  },
  {
    id: 2,
    name: 'Micro-Current Facial Toning Roller',
    category: 'beauty',
    emoji: '💆‍♀️',
    heatScore: 94,
    growth: '+248%',
    regions: ['us', 'uk', 'eu'],
    topRegion: '🇬🇧 United Kingdom',
    saturation: 'High',
    sourcingCost: 7.80,
    retailPrice: 49.99,
    summary: 'Low-voltage micro-current roller that stimulates facial muscles and contours skin. Popularized by morning routine beauty reels.',
    bestSupplier: {
      name: 'Yiwu GlowTech Beauty Ltd.',
      rating: '4.8 ⭐ (Premium Verified)',
      shipping: '6-9 days (AliExpress VIP)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'Get a professional facelift at home for under $50. Contour your jawline in 5 minutes! 💆‍♀️✨'",
      "💡 Comparison: Why spend $300 on clinic facial spas when you can get the exact same contour at home?"
    ],
    competitors: [
      { store: 'JawSculpt.net', revenue: '$38,500/mo', ads: 18 },
      { store: 'AuraGlowSkin.co', revenue: '$21,200/mo', ads: 9 }
    ]
  },
  {
    id: 3,
    name: 'Cozy Sunset Atmosphere Projector',
    category: 'home',
    emoji: '🌅',
    heatScore: 89,
    growth: '+185%',
    regions: ['us', 'ca', 'eu'],
    topRegion: '🇪🇺 Europe',
    saturation: 'High',
    sourcingCost: 2.10,
    retailPrice: 19.99,
    summary: 'Compact optical projection lamp casting a realistic warm sunset glow. Essential room aesthetic upgrade for content creators.',
    bestSupplier: {
      name: 'Guangzhou Aurora Optoelectronics',
      rating: '4.7 ⭐ (High-Volume OEM)',
      shipping: '5-8 days (CNE Express)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'Turn any boring wall into a golden hour sunset. Instant cozy room upgrade! 🌅💛'",
      "💡 Action: Stop filming with ugly overhead lights. This projection bulb does all the work for you."
    ],
    competitors: [
      { store: 'SunsetVibes.shop', revenue: '$9,100/mo', ads: 4 },
      { store: 'LuminaRooms.co', revenue: '$14,800/mo', ads: 8 }
    ]
  },
  {
    id: 4,
    name: 'Ultra-Thin Magnetic Wireless Power Bank',
    category: 'tech',
    emoji: '🔋',
    heatScore: 92,
    growth: '+198%',
    regions: ['us', 'ca', 'au'],
    topRegion: '🇨🇦 Canada',
    saturation: 'Low',
    sourcingCost: 9.50,
    retailPrice: 39.99,
    summary: 'Card-sized external MagSafe battery pack snapping magnetically onto phones for seamless on-the-go wireless charging.',
    bestSupplier: {
      name: 'Dongguan PowerVibe Technology',
      rating: '4.9 ⭐ (Verified OEM)',
      shipping: '4-7 days (FedEx Special)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'No cables. No bulk. Just snap and charge. The thinnest magnetic charger ever made. 🔋⚡'",
      "💡 Pain Point: Stop carrying brick-sized battery packs that weigh you down. Snap this card and go."
    ],
    competitors: [
      { store: 'SnapChargeTech.co', revenue: '$12,500/mo', ads: 5 },
      { store: 'MagSafeVolt.shop', revenue: '$6,200/mo', ads: 2 }
    ]
  },
  {
    id: 5,
    name: 'Portable Hydrogen Hydration Bottle',
    category: 'health',
    emoji: '🥤',
    heatScore: 98,
    growth: '+410%',
    regions: ['us', 'uk', 'ca', 'au', 'eu'],
    topRegion: '🇦🇺 Australia',
    saturation: 'Low',
    sourcingCost: 12.40,
    retailPrice: 69.99,
    summary: 'Electrolysis bottle infusing active molecular hydrogen into drinking water. Trending heavily in wellness and recovery channels.',
    bestSupplier: {
      name: 'Guangdong BioHydration Co.',
      rating: '4.9 ⭐ (Zendrop Verified)',
      shipping: '6-10 days (Zendrop Line)'
    },
    adHooks: [
      "🔥 TikTok Hook: 'Why is everyone drinking bubbly water out of glowing blue bottles? Here is the recovery science...'",
      "💡 Performance: Boost your cell hydration, accelerate athletic recovery, and fight fatigue with molecular hydrogen."
    ],
    competitors: [
      { store: 'HydrationTech.cc', revenue: '$78,400/mo', ads: 32 },
      { store: 'MolecularCell.co', revenue: '$42,100/mo', ads: 14 }
    ]
  }
];

const RADAR_POOL = [
  "Scanned 1,240 TikTok Ad posts with tag #dropshipping",
  "High breakout velocity detected: 'Hydrogen water recovery' (+410%)",
  "Synced API product pricing for 'LED Smart Pet Collars'",
  "AliExpress scraper synced: Yiwu beauty supplier stock updated",
  "Google Trends breakout signal identified in 'Wellness & Hydration'",
  "Facebook Ad library analyzer matched 42 winning ads in 'Pet Care'",
  "Amazon bestseller index flagged 'Micro-Current contour device' as #3",
  "Reddit commercial sentiment analyzer reports 89% net positive on 'Aesthetic Room Lamps'"
];

/* ═══════════════════════════════════════════
   🔐 PREMIUM ENTERPRISE LOGIN GATE
   ═══════════════════════════════════════════ */
const CortexLoginGate = ({ onLogin }) => {
  const [operatorId, setOperatorId] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [initialPlan, setInitialPlan] = useState('free');
  const [isLogging, setIsLogging] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [statusText, setStatusText] = useState('ENTERPRISE DECRYPTOR IDLE');

  const { playSynthSound, setCursorState } = usePortfolio();

  const handleCortexLogin = (e) => {
    e.preventDefault();
    if (!operatorId || !accessKey) return;
    
    setIsLogging(true);
    setStatusText('COMPILING ACCESS PRIVILEGES...');
    playSynthSound('click');

    setTimeout(() => {
      if (operatorId.toUpperCase().trim() === 'ENTREPRENEUR' && accessKey === 'PASSIVEINCOME') {
        setStatusText('DECRYPTION SUCCESSFUL. UPLINK ACTIVE!');
        playSynthSound('success');
        setTimeout(() => {
          onLogin({ username: operatorId.trim(), tier: initialPlan });
        }, 800);
      } else {
        setIsLogging(false);
        setStatusText('DECRYPTION REFUSED: CORRUPTED PASSKEY');
        playSynthSound('glitch');
      }
    }, 1500);
  };

  const triggerDemoLogin = (tier) => {
    setIsLogging(true);
    setStatusText(`INITIALIZING DIRECT DEMO: ${tier.toUpperCase()} SUITE...`);
    playSynthSound('click');
    setTimeout(() => {
      setStatusText('ACCESS GRANTED!');
      playSynthSound('success');
      setTimeout(() => {
        onLogin({ username: 'Demo_Operator', tier });
      }, 800);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative bg-[#06040b]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGgyMHYxSDB6IiBmaWxsPSJyZ2JhKDEzOSwgOTIsIDI0NiwgMC4wMykiLz4KPHBhdGggZD0iTTAgMGgxdjIwSDB6IiBmaWxsPSJyZ2JhKDEzOSwgOTIsIDI0NiwgMC4wMykiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-15%] w-[45%] h-[45%] bg-royal/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[35%] h-[35%] bg-emerald/5 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 24, padding: '36px 32px', backdropFilter: 'blur(20px)'
        }}>
          {/* Top Logo and Tagline */}
          <div className="flex flex-col items-center mb-6">
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(135deg, #8b5cf6, #34d399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.45)', marginBottom: 14
            }}>
              <Zap size={24} color="#fff" />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: C.white, tracking: '-0.02em', margin: 0 }}>
              CORTEX<span className="text-purple">TREND</span> AI
            </h1>
            <span style={{ fontSize: 10, color: C.textMuted, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: 4 }}>
              Autonomous Sourcing Decryptor
            </span>
          </div>

          {/* Status Display panel */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.2)', border: `1px solid ${C.border}`,
            padding: '10px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 10, color: C.purple, fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 20
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.purple, boxShadow: `0 0 8px ${C.purple}`, display: 'inline-block' }} />
            <span>{statusText}</span>
          </div>

          <form onSubmit={handleCortexLogin} className="space-y-4">
            <div>
              <label style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 5 }}>Operator ID</label>
              <input
                type="text" value={operatorId} onChange={(e) => setOperatorId(e.target.value)}
                placeholder="ENTREPRENEUR"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${C.border}`, color: C.white, fontSize: 13, outline: 'none'
                }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 5 }}>Secure Passkey</label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'} value={accessKey} onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="PASSIVEINCOME"
                  style={{
                    width: '100%', padding: '11px 14px 11px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${C.border}`, color: C.white, fontSize: 13, outline: 'none'
                  }}
                  required
                />
                <button
                  type="button" onClick={() => setShowKey(!showKey)}
                  style={{ position: 'absolute', right: 12, top: 12, border: 'none', background: 'transparent', color: C.textMuted, cursor: 'pointer' }}
                >
                  <Key size={13} />
                </button>
              </div>
            </div>

            {/* Plan selector block */}
            <div>
              <label style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>Initialize Subscription Tier</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'free', label: 'Free Plan' },
                  { id: 'pro',  label: 'Pro Plan' },
                  { id: 'enterprise', label: 'Enterprise' }
                ].map(p => (
                  <button
                    key={p.id} type="button" onClick={() => { playSynthSound('click'); setInitialPlan(p.id); }}
                    style={{
                      padding: '8px 4px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                      border: `1px solid ${initialPlan === p.id ? C.purple : C.border}`,
                      background: initialPlan === p.id ? 'rgba(167, 139, 250, 0.12)' : 'transparent',
                      color: initialPlan === p.id ? C.white : C.textMuted, cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit" disabled={isLogging}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg, #8b5cf6, #34d399)', color: '#fff',
                fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
                cursor: 'pointer', display: 'flex', items: 'center', justifyContent: 'center', gap: 6, marginTop: 12
              }}
            >
              Decrypt & Connect <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Demo Bypass Row */}
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${C.border}`, textAlign: 'center' }}>
            <span style={{ fontSize: 9, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 10 }}>Friction-free Demo Bypass</span>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => triggerDemoLogin('free')}
                style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}
              >
                Free Plan
              </button>
              <button
                onClick={() => triggerDemoLogin('pro')}
                style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: 'rgba(52,211,153,0.05)', color: C.emerald, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}
              >
                Pro Plan
              </button>
              <button
                onClick={() => triggerDemoLogin('enterprise')}
                style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${C.border}`, background: 'rgba(251,191,36,0.05)', color: C.gold, fontSize: 9, fontWeight: 700, cursor: 'pointer' }}
              >
                Enterprise Plan
              </button>
            </div>
            <span style={{ fontSize: 8, color: C.textMuted, display: 'block', marginTop: 8 }}>
              Default keys: <span className="text-white font-mono">ENTREPRENEUR</span> / <span className="text-white font-mono">PASSIVEINCOME</span>
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   👑 MAIN ENTERPRISE DASHBOARD
   ═══════════════════════════════════════════ */
export default function CortexTrendSandbox() {
  const { setCursorState, playSynthSound } = usePortfolio();

  /* ─── State Management ─── */
  const [session, setSession] = useState(null);
  const [activeView, setActiveView] = useState('products'); // products | radar | calculator | wizard
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  
  // Scraper Ticker state
  const [radarLogs, setRadarLogs] = useState([
    "[System] Autoscanning 124 global trend feeds...",
    "[TikTok Scraper] Analysed 14,212 ads under tag #dropshipping",
    "[Google Scraper] High search breakout detected: 'Hydrogen water recovery'",
    "[Shopify API] Real-time product sales data synced for 'Micro-Current Facial'"
  ]);

  // Simulated product options state
  const [sourcingId, setSourcingId] = useState(null);
  const [sourcingLoading, setSourcingLoading] = useState(false);
  const [sourcingResult, setSourcingResult] = useState(null);

  const [adCopyId, setAdCopyId] = useState(null);
  const [adCopyLoading, setAdCopyLoading] = useState(false);
  const [adCopyResult, setAdCopyResult] = useState(null);

  const [spyId, setSpyId] = useState(null);
  const [spyLoading, setSpyLoading] = useState(false);
  const [spyResult, setSpyResult] = useState(null);

  // Sourcing calculator state
  const [unitsSold, setUnitsSold] = useState(25);
  const [netProfit, setNetProfit] = useState(30);

  // Brand co-founder state
  const [wizardStep, setWizardStep] = useState(1);
  const [nicheInput, setNicheInput] = useState('pets');
  const [vibeInput, setVibeInput] = useState('playful');
  const [wizardLoading, setWizardLoading] = useState(false);
  const [wizardResult, setWizardResult] = useState(null);

  /* ─── Load Session from Local Storage ─── */
  useEffect(() => {
    const saved = localStorage.getItem('cortex_session');
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('cortex_session');
      }
    }
  }, []);

  /* ─── Scraper Ticker Auto-scroll ─── */
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = RADAR_POOL[Math.floor(Math.random() * RADAR_POOL.length)];
      const formattedLog = `[${new Date().toLocaleTimeString()}] ${randomLog}`;
      setRadarLogs(prev => [formattedLog, ...prev.slice(0, 4)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  /* ─── Plan level upgrades ─── */
  const handleUpgrade = (tier) => {
    playSynthSound('success');
    const updatedSession = { ...session, tier };
    setSession(updatedSession);
    localStorage.setItem('cortex_session', JSON.stringify(updatedSession));
  };

  const handleLogout = () => {
    playSynthSound('hover');
    setSession(null);
    localStorage.removeItem('cortex_session');
  };

  const handleLoginSuccess = (profile) => {
    setSession(profile);
    localStorage.setItem('cortex_session', JSON.stringify(profile));
  };

  /* ─── Scraper Synchronization ─── */
  const handleSyncScrapers = () => {
    playSynthSound('hover');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
      playSynthSound('success');
      setRadarLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ⚡ Fully updated all regional scrapers and ad spies!`,
        ...prev.slice(0, 4)
      ]);
    }, 1200);
  };

  /* ─── Competitor Store Spy Simulation ─── */
  const triggerCompetitorSpy = (product) => {
    playSynthSound('click');
    setSpyResult(null);
    setSpyId(product.id);
    setSpyLoading(true);

    setTimeout(() => {
      setSpyLoading(false);
      setSpyResult(product.competitors);
      playSynthSound('success');
    }, 1800);
  };

  /* ─── Sourcing Sourcing Sourcing ─── */
  const triggerSourcingSearch = (product) => {
    playSynthSound('click');
    setSourcingResult(null);
    setSourcingId(product.id);
    setSourcingLoading(true);

    setTimeout(() => {
      setSourcingLoading(false);
      setSourcingResult(product.bestSupplier);
      playSynthSound('success');
    }, 1600);
  };

  /* ─── Ad Angle generation ─── */
  const triggerAdGenerator = (product) => {
    playSynthSound('click');
    setAdCopyResult(null);
    setAdCopyId(product.id);
    setAdCopyLoading(true);

    setTimeout(() => {
      setAdCopyLoading(false);
      setAdCopyResult(product.adHooks);
      playSynthSound('success');
    }, 1200);
  };

  /* ─── Brand concept generation ─── */
  const generateBrandConcept = () => {
    playSynthSound('click');
    setWizardLoading(true);
    setWizardStep(3);

    setTimeout(() => {
      const names = {
        pets: {
          playful: { name: "BarkVibe 🐕", slogan: "Make your dog walks aesthetic & glow!", targeting: "Interests: Dog owners, TikTok dog parents, BarkBox fans. Age: 18-38" },
          premium: { name: "AeroPaw 👑", slogan: "Premium technical gear for modern canine lifestyle.", targeting: "Interests: Luxury pet supplies, designer dogs, organic pet food. Age: 25-50" }
        },
        beauty: {
          playful: { name: "GlowBurst 💖", slogan: "Get that radiant summer skin in under 5 minutes!", targeting: "Interests: Beauty hacks, GRWM TikTok, Sephora haulers. Age: 16-30" },
          premium: { name: "Lumina Skin Care 👑", slogan: "Clinical-grade face sculpting right in your boudoir.", targeting: "Interests: Luxury cosmetics, facial massage, skincare science. Age: 28-60" }
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
      setWizardStep(4);
      playSynthSound('success');
    }, 2500);
  };

  /* ─── Calculator Logic ─── */
  const dailyProfit = unitsSold * netProfit;
  const monthlyProfit = dailyProfit * 30;
  const annualProfit = dailyProfit * 365;

  const getHustleBadge = () => {
    if (monthlyProfit < 1200) return { label: '🌱 Starter Hustle', sub: 'Perfect side cash to cover groceries & monthly subscriptions.', color: C.purple };
    if (monthlyProfit >= 1200 && monthlyProfit < 4000) return { label: '🚀 Full-Time Path', sub: 'Replacing standard office wages with automated flows.', color: C.emerald };
    if (monthlyProfit >= 4000 && monthlyProfit < 10000) return { label: '💎 High-Growth Brand', sub: 'Excellent income level for custom private-label branding.', color: C.gold };
    return { label: '👑 E-Commerce Empire', sub: 'Fully scalable dropshipping empire generated autonomously!', color: C.rose };
  };

  const hustle = getHustleBadge();

  if (!session) {
    return <CortexLoginGate onLogin={handleLoginSuccess} />;
  }

  // Filter products by region and active category tab
  const filteredProducts = DYNAMIC_PRODUCTS.filter(p => {
    // Region matching
    const matchRegion = activeRegion === 'all' || p.regions.includes(activeRegion);
    // Niche matching
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchRegion && matchCategory;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bgGradient,
      fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
      color: C.text,
      display: 'flex',
      overflowX: 'hidden'
    }}>
      
      {/* 🌌 Left Sidebar Navigation (Desktop only) */}
      <aside style={{
        width: 270, flexShrink: 0, borderRight: `1px solid ${C.border}`,
        background: 'rgba(9, 5, 20, 0.75)', padding: '24px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', zIndex: 40, backdropFilter: 'blur(20px)'
      }} className="hidden lg:flex">
        
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg, #8b5cf6, #34d399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
            }}>
              <Zap size={16} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: 14, fontWeight: 900, color: C.white }}>CORTEX TREND</span>
              <div style={{ fontSize: 8, color: C.emerald, fontWeight: 700, background: C.emeraldLt, padding: '1px 5px', borderRadius: 4, display: 'inline-block', marginTop: 1 }}>API V5.1</div>
            </div>
          </div>

          {/* User profile card */}
          <div style={{
            background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(167, 139, 250, 0.15)', border: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <User size={16} color={C.purple} />
            </div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.white }}>{session.username}</div>
              {session.tier === 'free' && <span style={{ fontSize: 8, fontWeight: 850, color: C.textMuted, background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 2 }}>FREE OPERATOR</span>}
              {session.tier === 'pro' && <span style={{ fontSize: 8, fontWeight: 850, color: C.emerald, background: C.emeraldLt, border: `1px solid rgba(52,211,153,0.2)`, padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 2 }}>PRO PLAN</span>}
              {session.tier === 'enterprise' && <span style={{ fontSize: 8, fontWeight: 850, color: C.gold, background: C.goldLt, border: `1px solid rgba(251,191,36,0.25)`, padding: '2px 6px', borderRadius: 4, display: 'inline-block', marginTop: 2 }}>👑 ENTERPRISE</span>}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {[
              { id: 'products',   label: 'Winning Products', icon: <ShoppingBag size={15} />, locked: false },
              { id: 'radar',      label: 'Live Scraper Radar', icon: <Flame size={15} />, locked: false },
              { id: 'calculator', label: 'Profit Calculator', icon: <Sliders size={15} />, locked: session.tier === 'free' },
              { id: 'wizard',     label: 'AI Brand Wizard',   icon: <Sparkles size={15} />, locked: session.tier === 'free' || session.tier === 'pro' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { playSynthSound('hover'); setActiveView(item.id); }}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none',
                  background: activeView === item.id ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
                  color: activeView === item.id ? C.white : C.textMuted,
                  fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s', textAlign: 'left'
                }}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.locked && <Lock size={11} color={C.gold} />}
              </button>
            ))}
          </nav>
        </div>

        {/* Upgrade / Subscription Panel in Footer */}
        <div className="space-y-4 pt-6 border-t border-[rgba(255,255,255,0.05)]">
          {session.tier !== 'enterprise' ? (
            <div style={{
              background: 'rgba(251, 191, 36, 0.03)', border: `1px solid rgba(251,191,36,0.25)`,
              borderRadius: 14, padding: '12px 14px', textAlign: 'center'
            }}>
              <span style={{ fontSize: 9, color: C.gold, fontWeight: 800, letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Saas Plan Center</span>
              <p style={{ fontSize: 10, color: C.textMuted, lineHeight: 1.3, margin: '0 0 10px 0' }}>Unlock store spy, margin charts, and AI copy generators.</p>
              {session.tier === 'free' && (
                <button
                  onClick={() => handleUpgrade('pro')}
                  style={{
                    width: '100%', padding: '6px 10px', background: C.emerald, color: C.bg, border: 'none',
                    borderRadius: 6, fontSize: 10, fontWeight: 900, cursor: 'pointer'
                  }}
                >
                  Upgrade to Pro ($29)
                </button>
              )}
              {session.tier === 'pro' && (
                <button
                  onClick={() => handleUpgrade('enterprise')}
                  style={{
                    width: '100%', padding: '6px 10px', background: C.gold, color: C.bg, border: 'none',
                    borderRadius: 6, fontSize: 10, fontWeight: 900, cursor: 'pointer'
                  }}
                >
                  Upgrade to Enterprise ($79)
                </button>
              )}
            </div>
          ) : (
            <div style={{
              background: 'rgba(52, 211, 153, 0.03)', border: `1px solid rgba(52, 211, 153, 0.2)`,
              borderRadius: 14, padding: '12px 14px', textAlign: 'center'
            }}>
              <span style={{ fontSize: 9, color: C.emerald, fontWeight: 800, letterSpacing: '0.05em', display: 'block' }}>👑 VIP Enterprise Suite</span>
              <span style={{ fontSize: 10, color: C.textMuted, display: 'block', marginTop: 2 }}>Unlimited Access Engaged</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            style={{
              width: '100%', padding: '8px 12px', background: 'transparent', border: `1px solid ${C.border}`,
              borderRadius: 10, color: C.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            Disconnect Core
          </button>
        </div>
      </aside>

      {/* 📱 Mobile Slide-Out Drawer Panel Overlay */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileDrawerOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99999, backdropFilter: 'blur(4px)' }}
            className="lg:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, width: 280,
                background: C.bgGradient, borderRight: `1px solid ${C.border}`,
                padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-purple animate-pulse" />
                    <span style={{ fontSize: 13, fontWeight: 900 }}>CORTEX TREND</span>
                  </div>
                  <button onClick={() => setIsMobileDrawerOpen(false)} style={{ border: 'none', background: 'transparent', color: C.white, cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>

                {/* User profile */}
                <div style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14,
                  padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(167, 139, 250, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={14} color={C.purple} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.white }}>{session.username}</div>
                    {session.tier === 'free' && <span style={{ fontSize: 7, fontWeight: 800, color: C.textMuted }}>FREE OPERATOR</span>}
                    {session.tier === 'pro' && <span style={{ fontSize: 7, fontWeight: 800, color: C.emerald }}>PRO PLAN</span>}
                    {session.tier === 'enterprise' && <span style={{ fontSize: 7, fontWeight: 800, color: C.gold }}>👑 ENTERPRISE</span>}
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col gap-2">
                  {[
                    { id: 'products',   label: 'Winning Products', icon: <ShoppingBag size={14} />, locked: false },
                    { id: 'radar',      label: 'Live Scraper Radar', icon: <Flame size={14} />, locked: false },
                    { id: 'calculator', label: 'Profit Calculator', icon: <Sliders size={14} />, locked: session.tier === 'free' },
                    { id: 'wizard',     label: 'AI Brand Wizard',   icon: <Sparkles size={14} />, locked: session.tier === 'free' || session.tier === 'pro' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => { playSynthSound('hover'); setActiveView(item.id); setIsMobileDrawerOpen(false); }}
                      style={{
                        width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none',
                        background: activeView === item.id ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
                        color: activeView === item.id ? C.white : C.textMuted,
                        fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s', textAlign: 'left'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.locked && <Lock size={10} color={C.gold} />}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Drawer footer upgrades */}
              <div className="space-y-3 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                {session.tier !== 'enterprise' ? (
                  <div style={{
                    background: 'rgba(251, 191, 36, 0.03)', border: `1px solid rgba(251,191,36,0.25)`,
                    borderRadius: 12, padding: '10px 12px', textAlign: 'center'
                  }}>
                    {session.tier === 'free' ? (
                      <button
                        onClick={() => handleUpgrade('pro')}
                        style={{ width: '100%', padding: '5px 8px', background: C.emerald, color: C.bg, border: 'none', borderRadius: 6, fontSize: 9, fontWeight: 900, cursor: 'pointer' }}
                      >
                        Upgrade to Pro ($29)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpgrade('enterprise')}
                        style={{ width: '100%', padding: '5px 8px', background: C.gold, color: C.bg, border: 'none', borderRadius: 6, fontSize: 9, fontWeight: 900, cursor: 'pointer' }}
                      >
                        Upgrade to Enterprise ($79)
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ background: 'rgba(52, 211, 153, 0.03)', border: `1px solid rgba(52, 211, 153, 0.2)`, borderRadius: 12, padding: '10px', textCenter: 'center' }}>
                    <span style={{ fontSize: 9, color: C.emerald, fontWeight: 800, display: 'block', textAlign: 'center' }}>👑 VIP ENTERPRISE</span>
                  </div>
                )}

                <button
                  onClick={() => { setIsMobileDrawerOpen(false); handleLogout(); }}
                  style={{
                    width: '100%', padding: '8px 12px', background: 'transparent', border: `1px solid ${C.border}`,
                    borderRadius: 10, color: C.textMuted, fontSize: 10, fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Disconnect Core
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Main Interface workspace */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        
        {/* Header HUD with Mobile Burger toggle */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', borderBottom: `1px solid ${C.border}`, background: 'rgba(9, 5, 20, 0.45)', backdropFilter: 'blur(10px)'
        }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { playSynthSound('hover'); setIsMobileDrawerOpen(true); }}
              style={{ border: 'none', background: 'transparent', color: C.white, cursor: 'pointer' }}
              className="lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <span style={{ fontSize: 13, color: C.purple, fontWeight: 800, letterSpacing: '0.05em' }}>
                {activeView === 'products' && '📦 WINNING PRODUCTS FEED'}
                {activeView === 'radar' && '⚡ REAL-TIME SCRAPER RADAR'}
                {activeView === 'calculator' && '💰 PASSIVE FORECASTER MODULE'}
                {activeView === 'wizard' && '🧙 AI BRAND CO-FOUNDER'}
              </span>
              <span style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>
                System: Encrypted Session // Plan: {session.tier.toUpperCase()}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }} className="no-export">
            <button
              onClick={handleSyncScrapers}
              disabled={isRefreshing}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 50, border: `1px solid ${C.border}`,
                background: C.surface, color: C.text, fontSize: 10, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.3s'
              }}
              className="hover-effect"
            >
              <RefreshCw size={11} style={{ animation: isRefreshing ? 'spin 1.2s linear infinite' : 'none' }} />
              {isRefreshing ? 'Re-scanning feeds...' : 'Sync Scrapers'}
            </button>
          </div>
        </header>

        {/* 🌌 Workspace container panel (Modular Views) */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }} className="custom-scrollbar">

          {/* VIEW A: WINNING PRODUCTS */}
          {activeView === 'products' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* Regional selection bar plus Category tab filters */}
              <div className="space-y-4">
                
                {/* 1. Country target filters */}
                <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
                  <span style={{ fontSize: 10, color: C.textMuted, uppercase: true, fontWeight: 700, letterSpacing: '0.03em', display: 'block', marginBottom: 8 }}>
                    📍 Target Geographic Area (Real-Time Search volume breakout)
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {REGIONS.map(reg => {
                      const isLocked = reg.id !== 'all' && reg.id !== 'us' && session.tier === 'free';
                      return (
                        <button
                          key={reg.id}
                          onClick={() => {
                            if (isLocked) {
                              playSynthSound('glitch');
                              alert("PRO PLAN LOCKED: Geographic targeting (UK, CA, AU, EU) requires Pro Plan access. Upgrade inside side-drawer!");
                              return;
                            }
                            playSynthSound('click');
                            setActiveRegion(reg.id);
                          }}
                          style={{
                            padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                            border: `1px solid ${activeRegion === reg.id ? C.purple : C.border}`,
                            background: activeRegion === reg.id ? 'rgba(167, 139, 250, 0.12)' : C.surface,
                            color: activeRegion === reg.id ? C.white : C.textMuted,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
                          }}
                        >
                          <span>{reg.flag}</span>
                          <span>{reg.label}</span>
                          {isLocked && <Lock size={9} color={C.gold} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Niche category tab bar */}
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'all', label: 'All Categories' },
                      { id: 'pets', label: 'Pet Supplies' },
                      { id: 'beauty', label: 'Beauty & Wellness' },
                      { id: 'home', label: 'Home & Cozy' },
                      { id: 'tech', label: 'Technical Gadgets' }
                    ].map(n => (
                      <button
                        key={n.id}
                        onClick={() => { playSynthSound('hover'); setActiveCategory(n.id); }}
                        style={{
                          padding: '5px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                          border: `1px solid ${activeCategory === n.id ? C.purple : C.border}`,
                          background: activeCategory === n.id ? 'rgba(167, 139, 250, 0.08)' : 'transparent',
                          color: activeCategory === n.id ? C.white : C.textMuted,
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                  <span style={{ fontSize: 10, color: C.emerald, fontWeight: 800, fontFamily: 'monospace' }}>
                    {filteredProducts.length} Winning Products Located
                  </span>
                </div>

              </div>

              {/* Product Opportunities Cards Grid */}
              <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {filteredProducts.map((p, index) => {
                  const profitPerUnit = p.retailPrice - p.sourcingCost;
                  const marginPercent = Math.round((profitPerUnit / p.retailPrice) * 100);

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      style={{
                        background: C.card, border: `1px solid ${C.border}`,
                        borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column',
                        justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
                      }}
                    >
                      <div>
                        {/* Header Details */}
                        <div className="flex justify-between items-start mb-3">
                          <span style={{ fontSize: 24 }}>{p.emoji}</span>
                          <div className="text-right">
                            <span style={{
                              fontSize: 9, color: C.rose, fontWeight: 900,
                              background: 'rgba(248, 113, 113, 0.06)', border: `1px solid rgba(248, 113, 113, 0.2)`,
                              padding: '2px 6px', borderRadius: 4
                            }}>
                              🔥 HEAT: {p.heatScore}%
                            </span>
                            <div style={{ fontSize: 16, fontWeight: 800, color: C.white, marginTop: 4 }}>{p.growth}</div>
                            <span style={{ fontSize: 8, color: C.textMuted }}>Search volume signal</span>
                          </div>
                        </div>

                        {/* Title & Info */}
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: C.white, margin: '0 0 2px 0', lineHeight: 1.3 }}>{p.name}</h3>
                        
                        {/* Region & Saturation Badges */}
                        <div className="flex gap-2 flex-wrap mt-2 mb-3">
                          <span style={{ fontSize: 9, color: C.purple, fontWeight: 700, background: 'rgba(167,139,250,0.06)', padding: '1px 6px', border: `1px solid rgba(167,139,250,0.15)`, borderRadius: 4 }}>
                            📍 {p.topRegion}
                          </span>
                          <span style={{
                            fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4, border: '1px solid',
                            borderColor: p.saturation === 'Low' ? 'rgba(52,211,153,0.3)' : p.saturation === 'Moderate' ? 'rgba(251,191,36,0.3)' : 'rgba(248,113,113,0.3)',
                            background: p.saturation === 'Low' ? C.emeraldLt : p.saturation === 'Moderate' ? C.goldLt : 'rgba(248,113,113,0.06)',
                            color: p.saturation === 'Low' ? C.emerald : p.saturation === 'Moderate' ? C.gold : C.rose
                          }}>
                            🎯 Saturation: {p.saturation}
                          </span>
                        </div>

                        <p style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5, margin: '0 0 12px 0' }}>{p.summary}</p>

                        {/* Financial Matrix */}
                        <div style={{
                          background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`,
                          borderRadius: 12, padding: '10px 12px', marginBottom: 14,
                          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center'
                        }}>
                          <div>
                            <div style={{ fontSize: 9, color: C.textMuted }}>Supplier Cost</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.white }}>${p.sourcingCost.toFixed(2)}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: C.textMuted }}>Retail Target</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.emerald }}>${p.retailPrice.toFixed(2)}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: C.textMuted }}>Net Profit</div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.gold }}>{marginPercent}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic Spy/Sourcing Controls */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => triggerSourcingSearch(p)}
                            style={{
                              flex: 1, padding: '7px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                              border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)',
                              color: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3
                            }}
                          >
                            <Search size={11} /> Suppliers
                          </button>

                          <button
                            onClick={() => triggerAdGenerator(p)}
                            style={{
                              flex: 1, padding: '7px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                              border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.03)',
                              color: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3
                            }}
                          >
                            <Megaphone size={11} /> Ad Copies
                          </button>
                        </div>

                        {/* Competitor Store Spy trigger (Free Locked) */}
                        <button
                          onClick={() => {
                            if (session.tier === 'free') {
                              playSynthSound('glitch');
                              alert("PRO PLAN LOCKED: Competitor Store Spy tool is restricted under Free Tier. Upgrade inside side-drawer!");
                              return;
                            }
                            triggerCompetitorSpy(p);
                          }}
                          style={{
                            width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 10, fontWeight: 800,
                            border: `1px solid ${session.tier === 'free' ? C.border : 'rgba(52,211,153,0.3)'}`,
                            background: session.tier === 'free' ? 'rgba(0,0,0,0.1)' : 'rgba(52,211,153,0.04)',
                            color: session.tier === 'free' ? C.textMuted : C.emerald, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                          }}
                        >
                          <Zap size={11} /> {session.tier === 'free' ? '🔒 Spy Competitors (Pro)' : '⚡ Spy Competitor Stores'}
                        </button>

                        {/* Suppliers simulation */}
                        <AnimatePresence>
                          {sourcingId === p.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              style={{ background: 'rgba(52, 211, 153, 0.04)', border: `1px solid rgba(52, 211, 153, 0.15)`, borderRadius: 10, padding: 10, overflow: 'hidden', fontSize: 10 }}
                            >
                              {sourcingLoading ? (
                                <div className="flex items-center gap-2 text-emerald">
                                  <RefreshCw size={11} className="spin" /> Syncing AliExpress Logistics...
                                </div>
                              ) : sourcingResult ? (
                                <div>
                                  <div style={{ color: C.emerald, fontWeight: 800, marginBottom: 2 }}>✓ BEST SUPPLIER FOUND</div>
                                  <div style={{ color: C.white, fontWeight: 700 }}>{sourcingResult.name}</div>
                                  <div className="flex justify-between text-white/50 mt-1">
                                    <span>Rating: {sourcingResult.rating}</span>
                                    <span>Transit: {sourcingResult.shipping}</span>
                                  </div>
                                </div>
                              ) : null}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Ad copies simulation */}
                        <AnimatePresence>
                          {adCopyId === p.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              style={{ background: 'rgba(167, 139, 250, 0.04)', border: `1px solid rgba(167, 139, 250, 0.15)`, borderRadius: 10, padding: 10, overflow: 'hidden', fontSize: 10 }}
                            >
                              {adCopyLoading ? (
                                <div className="flex items-center gap-2 text-purple">
                                  <RefreshCw size={11} className="spin" /> Generating hooks...
                                </div>
                              ) : adCopyResult ? (
                                <div className="space-y-2">
                                  <div style={{ color: C.purple, fontWeight: 800 }}>★ HIGH-CONVERTING AD HOOKS</div>
                                  {adCopyResult.map((hook, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: 6, borderRadius: 6, borderLeft: `2px solid ${C.purple}` }}>{hook}</div>
                                  ))}
                                </div>
                              ) : null}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Competitor Shopify Spy simulation (PRO ONLY) */}
                        <AnimatePresence>
                          {spyId === p.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              style={{ background: 'rgba(52, 211, 153, 0.05)', border: `1px solid rgba(52, 211, 153, 0.25)`, borderRadius: 10, padding: 12, overflow: 'hidden', fontSize: 10 }}
                            >
                              {spyLoading ? (
                                <div className="flex items-center gap-2 text-emerald">
                                  <RefreshCw size={11} className="spin" /> Scraping active Shopify merchants...
                                </div>
                              ) : spyResult ? (
                                <div className="space-y-2">
                                  <div style={{ color: C.emerald, fontWeight: 800 }}>✓ ACTIVE COMPETITORS DISCOVERED</div>
                                  {spyResult.map((comp, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-black/30 p-2 rounded border border-[rgba(255,255,255,0.03)]">
                                      <div>
                                        <div style={{ color: C.white, fontWeight: 700 }}>{comp.store}</div>
                                        <span style={{ fontSize: 8, color: C.textMuted }}>Running: {comp.ads} Active ads</span>
                                      </div>
                                      <span style={{ color: C.gold, fontWeight: 800 }}>{comp.revenue}</span>
                                    </div>
                                  ))}
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

            </motion.div>
          )}

          {/* VIEW B: SCRAPER RADAR */}
          {activeView === 'radar' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20,
                padding: '24px 30px', backdropFilter: 'blur(16px)'
              }}>
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.emerald, boxShadow: `0 0 10px ${C.emerald}`, display: 'inline-block' }} />
                    <span style={{ fontSize: 12, fontWeight: 800, color: C.white }}>LIVE AUTONOMOUS RADAR DATA</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.emerald, fontWeight: 700 }}>Scrapers Active & Scraping TikTok Shop</span>
                </div>

                <div className="space-y-4">
                  {radarLogs.map((log, index) => (
                    <motion.div
                      key={log + index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      style={{
                        fontSize: 12, fontFamily: 'monospace',
                        color: index === 0 ? C.emerald : index === 1 ? C.purple : C.textMuted,
                        display: 'flex', gap: 8, alignItems: 'center'
                      }}
                    >
                      <span style={{ color: C.royal }}>▶</span> {log}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Informative Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Feeds Scanned Daily", val: "124+ sources", color: C.purple },
                  { label: "Daily search Signals", val: "4.8M indexes", color: C.emerald },
                  { label: "Scraper latency", val: "<15ms", color: C.gold }
                ].map(stat => (
                  <div key={stat.label} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: '16px 20px', borderRadius: 16 }}>
                    <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase' }}>{stat.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: stat.color, marginTop: 4 }}>{stat.val}</div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* VIEW C: CALCULATOR (PRO LOCKED) */}
          {activeView === 'calculator' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              
              {session.tier === 'free' ? (
                /* Locked overlay panel */
                <div style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24,
                  padding: '48px 32px', textAlign: 'center', maxWidth: 500, margin: '40px auto'
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: 'rgba(251,191,36,0.06)',
                    border: `1px solid rgba(251,191,36,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 18px auto'
                  }}>
                    <Lock size={24} color={C.gold} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: '0 0 6px 0' }}>Pro Feature Locked</h3>
                  <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, margin: '0 0 24px 0' }}>
                    The Sourcing & Net Profit Margin Forecaster is locked under your current Free Plan. Upgrade instantly to plan PRO inside side-drawer or click below.
                  </p>
                  <button
                    onClick={() => handleUpgrade('pro')}
                    style={{
                      padding: '10px 20px', background: C.emerald, color: C.bg, border: 'none',
                      borderRadius: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer'
                    }}
                  >
                    Simulate Pro Upgrade ($29)
                  </button>
                </div>
              ) : (
                /* Actual active calculator */
                <div style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24,
                  padding: '28px 30px', maxWidth: 640, margin: '0 auto', backdropFilter: 'blur(16px)'
                }}>
                  <div className="flex items-center gap-2 mb-6">
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
                      style={{
                        width: '100%', height: 6, borderRadius: 999, background: C.border,
                        outline: 'none', cursor: 'pointer', accentColor: C.emerald
                      }}
                    />
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
                      style={{
                        width: '100%', height: 6, borderRadius: 999, background: C.border,
                        outline: 'none', cursor: 'pointer', accentColor: C.gold
                      }}
                    />
                  </div>

                  {/* Outputs Panel */}
                  <div style={{
                    background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`,
                    borderRadius: 16, padding: 18, marginBottom: 16
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: C.textMuted }}>Daily Profit</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: C.white }}>${dailyProfit.toLocaleString()}</div>
                      </div>
                      <div style={{ borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 10, color: C.textMuted }}>Monthly Passive</div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: C.emerald }}>${monthlyProfit.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.textMuted }}>Annual Cash</div>
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

                  {/* Exporting button (ENTERPRISE ONLY) */}
                  <button
                    onClick={() => {
                      if (session.tier !== 'enterprise') {
                        playSynthSound('glitch');
                        alert("ENTERPRISE LOCKED: Exporting Sourcing Blueprint PDF requires Enterprise access. Upgrade inside side-drawer!");
                        return;
                      }
                      playSynthSound('success');
                      alert(`Sourcing Blueprint PDF generated successfully for operator ${session.username}! Download ready.`);
                    }}
                    style={{
                      width: '100%', padding: '11px', border: 'none', borderRadius: 10,
                      background: session.tier === 'enterprise' ? C.gold : 'rgba(255,255,255,0.03)',
                      color: session.tier === 'enterprise' ? C.bg : C.textMuted, fontSize: 11, fontWeight: 850,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                    }}
                  >
                    <Lock size={12} style={{ display: session.tier === 'enterprise' ? 'none' : 'inline' }} />
                    {session.tier === 'enterprise' ? '★ EXPORT DETAILED SOURCING BLUEPRINT' : '🔒 Export Sourcing Blueprint (Enterprise)'}
                  </button>

                </div>
              )}

            </motion.div>
          )}

          {/* VIEW D: WIZARD BRAND CO-FOUNDER (ENTERPRISE LOCKED) */}
          {activeView === 'wizard' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              
              {session.tier !== 'enterprise' ? (
                /* Locked overlay panel */
                <div style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24,
                  padding: '48px 32px', textAlign: 'center', maxWidth: 500, margin: '40px auto'
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: 'rgba(251,191,36,0.06)',
                    border: `1px solid rgba(251,191,36,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 18px auto'
                  }}>
                    <Lock size={24} color={C.gold} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: '0 0 6px 0' }}>Enterprise Feature Locked</h3>
                  <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, margin: '0 0 24px 0' }}>
                    The AI Co-Founder Brand and Ad Copy generator requires VIP Enterprise Tier access. Upgrade inside side-drawer or click below.
                  </p>
                  <button
                    onClick={() => handleUpgrade('enterprise')}
                    style={{
                      padding: '10px 20px', background: C.gold, color: C.bg, border: 'none',
                      borderRadius: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer'
                    }}
                  >
                    Simulate Enterprise Upgrade ($79)
                  </button>
                </div>
              ) : (
                /* Actual wizard generator page */
                <div style={{
                  background: C.surface, border: `1px solid ${C.border}`, borderRadius: 24,
                  padding: '28px 30px', maxWidth: 600, margin: '0 auto', backdropFilter: 'blur(16px)'
                }}>
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles size={18} color={C.purple} />
                    <span style={{ fontSize: 12, color: C.purple, fontWeight: 800, letterSpacing: '0.05em' }}>AI CO-FOUNDER SUITE</span>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: 0 }}>🧙 AI Niche & Brand Concept Generator</h2>
                  <p style={{ fontSize: 13, color: C.textMuted, margin: '2px 0 20px 0' }}>Launch an instant e-commerce brand concept matched to active trends</p>

                  <div style={{ position: 'relative', minHeight: 200 }}>
                    {wizardStep === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <span style={{ fontSize: 12, color: C.white, fontWeight: 700 }}>Step 1: Choose Your Dropshipping Niche</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                          {[
                            { id: 'pets', label: 'Pet Gadgets', emoji: '🐕' },
                            { id: 'beauty', label: 'Beauty & Contour', emoji: '💅' }
                          ].map(n => (
                            <button
                              key={n.id} onClick={() => { playSynthSound('click'); setNicheInput(n.id); }}
                              style={{
                                padding: '14px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
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
                          onClick={() => setWizardStep(2)}
                          style={{
                            alignSelf: 'flex-end', marginTop: 10, padding: '8px 16px', borderRadius: 8,
                            background: C.purple, border: 'none', color: C.bg, fontSize: 12, fontWeight: 950,
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
                            { id: 'premium', label: 'Modern & Premium', desc: 'Minimalist, luxury appeal' }
                          ].map(v => (
                            <button
                              key={v.id} onClick={() => { playSynthSound('click'); setVibeInput(v.id); }}
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
                            onClick={() => setWizardStep(1)}
                            style={{ padding: '8px 14px', borderRadius: 8, background: 'transparent', border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
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
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, textAlign: 'center' }}
                      >
                        <div style={{
                          width: 44, height: 44, borderRadius: '50%',
                          border: `3px solid rgba(139,92,246,0.15)`, borderTopColor: C.purple,
                          animation: 'spin 1s linear infinite', marginBottom: 16
                        }} />
                        <span style={{ fontSize: 13, color: C.purple, fontWeight: 800, display: 'block', animation: 'pulse 1.5s infinite' }}>
                          CortexTrend AI is Synthesizing Brand...
                        </span>
                      </motion.div>
                    )}

                    {wizardStep === 4 && wizardResult && (
                      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{
                          background: 'rgba(167, 139, 250, 0.04)', border: `1px solid rgba(167, 139, 250, 0.25)`,
                          borderRadius: 16, padding: '14px 16px'
                        }}>
                          <div className="flex justify-between items-center mb-1">
                            <span style={{ fontSize: 16, fontWeight: 900, color: C.white }}>{wizardResult.name}</span>
                            <span style={{ fontSize: 9, color: C.emerald, fontWeight: 800, background: C.emeraldLt, padding: '2px 8px', borderRadius: 6 }}>
                              Vibe: {wizardResult.vibe}
                            </span>
                          </div>
                          <div style={{ fontSize: 10, color: C.textMuted, fontStyle: 'italic', marginBottom: 12 }}>"{wizardResult.slogan}"</div>

                          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8, marginBottom: 8 }}>
                            <div style={{ fontSize: 8, color: C.purple, fontWeight: 800, letterSpacing: '0.02em', marginBottom: 2 }}>META / TIKTOK AUDIENCE TARGETING</div>
                            <div style={{ fontSize: 9, color: C.text }}>{wizardResult.targeting}</div>
                          </div>

                          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
                            <div style={{ fontSize: 8, color: C.purple, fontWeight: 800, letterSpacing: '0.02em', marginBottom: 4 }}>TIKTOK AD SCRIPT</div>
                            <div style={{
                              fontSize: 9, fontFamily: 'monospace', color: C.textMuted,
                              background: 'rgba(0,0,0,0.2)', padding: 8, borderRadius: 8, maxHeight: 60, overflowY: 'auto'
                            }}>
                              {wizardResult.adScript}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setWizardStep(1)}
                            style={{ flex: 1, padding: '8px 10px', borderRadius: 8, background: 'transparent', border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                          >
                            New Brand
                          </button>
                          <button
                            onClick={() => {
                              playSynthSound('success');
                              navigator.clipboard.writeText(`${wizardResult.name}\n${wizardResult.slogan}\n\nTargeting: ${wizardResult.targeting}\n\nScript: ${wizardResult.adScript}`);
                              alert("Brand details copied to clipboard!");
                            }}
                            style={{
                              flex: 1.3, padding: '8px 10px', borderRadius: 8,
                              background: C.emerald, border: 'none', color: C.bg, fontSize: 10, fontWeight: 900,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justify: 'center', gap: 3
                            }}
                          >
                            <Clipboard size={12} /> COPY BRAND DETAILS
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              )}

            </motion.div>
          )}

        </div>

      </div>

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
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(167, 139, 250, 0.3);
        }
      `}</style>
    </div>
  );
}
