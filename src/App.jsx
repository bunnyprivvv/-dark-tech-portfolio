import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { PortfolioProvider } from './context/PortfolioContext';

import Cursor from './components/Cursor';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import ProjectDetail from './pages/ProjectDetail';
import Sandbox from './pages/Sandbox';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/sandbox/:id" element={<Sandbox />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <PortfolioProvider>
      <Router>
        {/* Custom cursor overlay */}
        <Cursor />
        
        {/* Navbar */}
        <Navbar />

        {/* 3D Scene Background */}
        <Scene />
        
        {/* Page Content */}
        <AnimatedRoutes />
      </Router>
    </PortfolioProvider>
  );
}

export default App;
