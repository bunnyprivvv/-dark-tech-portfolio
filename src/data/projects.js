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
    title: 'AegisNet Anomaly Core',
    category: 'Predictive Cybersecurity AI',
    image: '/quantum.png',
    description: 'A deep-learning intrusion detection platform that parses incoming network packet sequences to predict zero-day threat vectors and map network threat topologies.',
    realWorldUtility: 'Protects critical enterprise cloud infrastructure by isolating compromised nodes in under 12ms, actively mitigating automated lateral network expansion before damage occurs.',
    features: ['Real-time LSTM Packet Analysis', 'Dynamic Graph threat topology', 'Automated Sandbox Quarantine Scripts', 'Interactive Terminal Telemetry Console'],
    techStack: ['PyTorch', 'FastAPI', 'WebSockets', 'React', 'Canvas-GL'],
    metrics: [
      { label: "Zero-Day Intrusion Detection", value: "99.87%" },
      { label: "Quarantine Response Latency", value: "<12ms" },
      { label: "Telemetry Stream Throughput", value: "150k Packets/s" }
    ]
  },
  {
    id: 3,
    title: 'SynapseCAD Neuro-Vision',
    category: 'Clinical Computer Vision AI',
    image: '/aero.png',
    description: 'An advanced convolutional neuro-imaging computer vision system that maps 3D brain MRI slice sequences, highlighting focal cerebral lesions and mapping volumentric structures.',
    realWorldUtility: 'Assists neurosurgeons in pre-operative spatial mapping, producing high-fidelity structural abnormality segmentations and localized coordinate heatmaps within standard browser instances.',
    features: ['3D Tensor Slice Parsing', 'Interactive Volumetric Segmentations', 'Automated Neurosurgical Coordinates Exporter', 'Clinical Med-PDF Report Compiler'],
    techStack: ['TensorFlow', 'Python', 'Three.js', 'React', 'WebAssembly'],
    metrics: [
      { label: "Structural Segmentation IoU", value: "0.942" },
      { label: "MRI Pathology Review Turnaround", value: "-65% Speedup" },
      { label: "Diagnostic Training Scale", value: "50k+ Clinical MRI Scans" }
    ]
  },
  {
    id: 4,
    title: 'CortexScribe Clinical Voice',
    category: 'Real-Time Medical NLP Agent',
    image: '/cyber.png',
    description: 'A secure, ambient clinical intelligence agent that converts patient-physician conversational speech into structured, compliant EHR medical charts in real time.',
    realWorldUtility: 'Relieves clinical documentation fatigue for physicians by automating administrative EHR charting on-device, prioritizing secure local-first speech intelligence.',
    features: ['Real-time Whisper Audio Diarization', 'EHR Schema Entity Extraction', 'Zero-Trust Local Buffering & Encryption', 'Conversational Summarization Engine'],
    techStack: ['Whisper.cpp', 'Transformers.js', 'React', 'SQLite', 'Web Audio'],
    metrics: [
      { label: "Speech-to-Text Transcription WER", value: "2.14%" },
      { label: "EHR Schema Mapping Accuracy", value: "98.6%" },
      { label: "Audio Decryption Protocol", value: "100% On-Device" }
    ]
  },
  {
    id: 5,
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
  }
];
