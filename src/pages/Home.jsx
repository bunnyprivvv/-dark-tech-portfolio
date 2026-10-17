import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ParallaxTechMarquee from '../components/ParallaxTechMarquee';
import ScrollSkillsTrain from '../components/ScrollSkillsTrain';
import Projects from '../components/Projects';
import HowIWorkProcess from '../components/HowIWorkProcess';
import Services from '../components/Services';
import SocialProofWall from '../components/SocialProofWall';
import ReactiveCyberEye from '../components/ReactiveCyberEye';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'relative',
        zIndex: 1, // Ensures page content sits above the fixed 3D Scene
      }}
    >
      {/* 1. Hero Section with Cyber Badge, Typography & Terminal CLI */}
      <Hero />

      {/* 2. Layered Parallax Floating Tech Matrix (inspired by Ollivere intro & floating logo layers) */}
      <ParallaxTechMarquee />

      {/* 3. Horizontal Pinned Skills Train / Neural Convoy (inspired by Ollivere skills train) */}
      <ScrollSkillsTrain />

      {/* 4. Featured Projects Showcase */}
      <Projects />

      {/* 5. Sticky How I Work / Engineering Pipeline with Progress Meter (inspired by Ollivere process) */}
      <HowIWorkProcess />

      {/* 6. Operational Capacities / Services */}
      <Services />

      {/* 7. Staggered Social Proof & Testimonial Wall (inspired by Ollivere tweet wall) */}
      <SocialProofWall />

      {/* 8. Interactive Cursor-Tracking Cyber Eye Mascot (inspired by Ollivere eye mascot) */}
      <ReactiveCyberEye />

      {/* 9. Secure Contact & Transmission Gateway */}
      <ContactForm />
    </motion.div>
  );
};

export default Home;
