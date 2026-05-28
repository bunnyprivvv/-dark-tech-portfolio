import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SpinningCore = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 2]} />
      <meshStandardMaterial color="#00E6FF" wireframe wireframeLinewidth={2} />
    </mesh>
  );
};

const AeroDynamics = () => {
  return (
    <div style={{ padding: '4rem', color: '#D8B4E2', height: '100vh', background: 'radial-gradient(circle at center, rgba(0, 230, 255, 0.05) 0%, #000 70%)' }}>
      <h1 style={{ fontSize: '3rem', color: '#fff' }}>SynapseCAD <span style={{ color: '#00E6FF' }}>Neuro-Vision AI</span></h1>
      <p style={{color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem'}}>3D MRI Volumetric Segmentation & Spatial Reconstruction Simulator</p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', height: 'calc(100vh - 12rem)' }}>
         <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(0, 230, 255, 0.2)', zIndex: 10 }}>
            <h3 style={{color: '#fff'}}>Focal Lesion Map Accuracy</h3>
            <div style={{ marginTop: '2rem', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <motion.div animate={{width: ['10%', '98%']}} transition={{duration: 1.5, ease: 'easeOut'}} style={{width: '98%', height: '100%', background: '#00E6FF', borderRadius: '2px', boxShadow: '0 0 10px #00E6FF'}}/>
            </div>
            <p style={{marginTop: '0.5rem', color: '#aaa', fontSize: '0.9rem'}}>98.4% Diagnostic Certainty</p>
            
            <h3 style={{color: '#fff', marginTop: '3rem'}}>Volumetric Segmentation IoU</h3>
            <div style={{ marginTop: '2rem', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <motion.div animate={{width: ['10%', '94.2%']}} transition={{duration: 1.8, ease: 'easeOut'}} style={{width: '94.2%', height: '100%', background: '#fff', borderRadius: '2px', boxShadow: '0 0 10px #fff'}}/>
            </div>
            <p style={{marginTop: '0.5rem', color: '#aaa', fontSize: '0.9rem'}}>0.942 Intersection over Union</p>
         </div>
         
         {/* Live 3D Canvas Injection */}
         <div style={{ flex: 3, border: '1px dashed rgba(0, 230, 255, 0.4)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} color="#fff" intensity={2} />
                <SpinningCore />
                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={4} />
              </Canvas>
            </div>
            <p style={{fontSize: '1rem', color: 'rgba(0, 230, 255, 0.5)', letterSpacing: '0.2em', zIndex: 5, pointerEvents: 'none', position: 'absolute', bottom: '2rem'}}>Use mouse to rotate 3D Synaptic Brain Structure Map</p>
         </div>
      </div>
    </div>
  );
}
export default AeroDynamics;
