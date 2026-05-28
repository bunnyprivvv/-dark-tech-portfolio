import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const projectsDB = [
  { 
    id: 1, 
    title: 'VitalsVision AI', 
    category: 'Health AI Platform', 
    image: '/health_ai.png',
    description: 'A Secure Diagnostic Core integrating HemaScan and AudioTriage modules using bleeding-edge machine learning and predictive DigitalTwin UI modeling to assist medical professionals.',
    features: ['Real-time Risk Ring rendering', 'Medical PDF Export', 'HemaScan/AudioTriage Integration', 'Contextual AI Response Bot'],
    techStack: ['React', 'Node.js', 'Machine Learning API (Python)'] 
  },
  { 
    id: 2, 
    title: 'Quantum Nexus', 
    category: 'Web Application', 
    image: '/quantum.png',
    description: 'A high-performance quantum cryptography demonstrator platform running secure WebSockets across distributed global nodes.',
    features: ['High-Frequency WebSockets', 'End-to-End Encrypted Data Relays', 'Real-time Node Monitoring Console'],
    techStack: ['React', 'Socket.io', 'Go (Golang)'] 
  },
  { 
    id: 3, 
    title: 'Aero Dynamics', 
    category: '3D Interface', 
    image: '/aero.png',
    description: 'An advanced web-based 3D configurator designed for aerospace logistics, utilizing WebGL processing power to simulate aerodynamics.',
    features: ['Spline 3D Real-time Overlays', 'Physics Calculation Scripts', 'Interactive Aircraft Configuration Tool'],
    techStack: ['Three.js/Spline', 'Vite', 'React'] 
  },
  { 
    id: 4, 
    title: 'Cyber Pulse', 
    category: 'E-Commerce Solution', 
    image: '/cyber.png',
    description: 'A dark-mode-only tactical e-commerce platform blending high-end fashion with frictionless Web3 crypto transactions.',
    features: ['Web3 Wallet Authentication', 'Global Cart Synchronization', 'Dark-Tech Thematic Glass UI'],
    techStack: ['Next.js', 'Ethereum SDK', 'Vanilla CSS'] 
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projectsDB.map(p => ({ id: p.id, title: p.title, category: p.category, image: p.image })));
});

app.get('/api/projects/:id', (req, res) => {
  const project = projectsDB.find(p => p.id === parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received message from ${name} (${email}): ${message}`);
  res.json({ success: true, message: 'Transmission Successful' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
