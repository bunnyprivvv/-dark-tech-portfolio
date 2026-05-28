import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
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
      <Hero />
      <Projects />
      <Services />
      <ContactForm />
    </motion.div>
  );
};

export default Home;
