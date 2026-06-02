export const projectsDB = [
  { 
    id: 1, 
    title: 'VitalsVision AI', 
    category: 'Health AI Platform', 
    image: '/health_ai.png',
    description: 'A Secure Diagnostic Core integrating HemaScan and AudioTriage modules using bleeding-edge machine learning and predictive DigitalTwin UI modeling to assist medical professionals.',
    realWorldUtility: 'Empowers clinical practitioners with automated diagnostic assistance, drastically accelerating blood pathology reviews and prioritizing emergency triage in high-stress medical environments.',
    features: ['Real-time Risk Ring rendering', 'Medical PDF Export', 'HemaScan/AudioTriage Integration', 'Contextual AI Response Bot'],
    techStack: ['React', 'Node.js', 'Machine Learning', 'Uvicorn'],
    metrics: [
      { label: "HemaScan Diagnostic Accuracy", value: "98.4%" },
      { label: "Triage Evaluation Latency", value: "-40% Reduction" },
      { label: "Dataset Training Scale", value: "10M+ Data Points" }
    ]
  },
  {
    id: 2,
    title: 'CortexTrend AI',
    category: 'Autonomous Market Intelligence API',
    image: '/health_ai.png',
    description: 'An autonomous, fully scheduled data intelligence pipeline that aggregates global search, social, and network trends, analyzes real-time sentiment, and exposes monetized endpoints.',
    realWorldUtility: 'Eliminates thousands in data infrastructure costs for startups and trading systems by delivering structured, AI-processed social and commercial trends on a recurring automated API feed.',
    features: ['Autonomous 24h Cron Scheduler', 'Multi-Source Social Scraper', 'NLP Sentiment Weight Analyzer', 'Developer Token Authorization Gate'],
    techStack: ['Node.js', 'Express', 'Cheerio Scraper', 'Natural NLP', 'RapidAPI'],
    metrics: [
      { label: "Background Cron Job Success", value: "99.98% Uptime" },
      { label: "Sentiment Index Scoring Latency", value: "<15ms" },
      { label: "Monthly Recurring Revenue", value: "$1,480/mo (Simulated)" }
    ]
  },
  {
    id: 3,
    title: 'AetherSwarm AI',
    category: 'Autonomous Agentic Orchestrator',
    image: '/health_ai.png', // Fallback display image
    description: 'A premium, high-fidelity agentic orchestration control center simulating real-time planning, code diff synthesis, security auditing, and QA test matrices across autonomous agent channels.',
    realWorldUtility: 'Showcases production-grade multi-agent execution workflows, reducing structural token waste, mitigating command injection vulnerabilities, and accelerating software design cycles.',
    features: ['Typewriter Thought Streams', 'Vector SVG Node Graph', 'Dynamic IDE Code Diff Viewer', 'Low-Latency Web Audio Synthesizer', 'Telemetry Diagnostic Dashboard'],
    techStack: ['React', 'Vite', 'Vanilla CSS', 'Web Audio API', 'Framer Motion'],
    metrics: [
      { label: "Simulated Token Ingestion", value: "4.8k tokens/s" },
      { label: "Auditor CVE Mitigation Rate", value: "100% Hardened" },
      { label: "Node Vector Sync Latency", value: "<1.2ms" }
    ]
  }
];

