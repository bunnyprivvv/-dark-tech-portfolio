import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const QuantumNexus = () => {
  const dragContainerRef = useRef(null);
  
  return (
    <div style={{ padding: '4rem', color: '#00E6FF', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '3rem', textShadow: '0 0 20px rgba(0, 230, 255, 0.5)' }}>Quantum Node Nexus</h1>
      <p style={{color: 'rgba(255,255,255,0.5)'}}>Draggable Physics Simulator Online</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', flex: 1, marginTop: '2rem' }}>
        <div style={{ background: 'rgba(0, 230, 255, 0.05)', border: '1px solid rgba(0, 230, 255, 0.2)', padding: '2rem', borderRadius: '8px' }}>
          <h3>Global Live Nodes</h3>
          <ul style={{ listStyle: 'none', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1,2,3,4,5].map(i => (
               <motion.li 
                 key={i} 
                 drag 
                 dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
                 dragElastic={0.8}
                 whileHover={{ scale: 1.05 }}
                 whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing', boxShadow: '0 0 20px rgba(0, 230, 255, 0.8)' }}
                 style={{ padding: '1rem', background: 'rgba(0,0,0,0.8)', borderLeft: '3px solid #00E6FF', cursor: 'grab', position: 'relative' }}
               >
                 Drag Node Alpha-{i}
               </motion.li>
            ))}
          </ul>
        </div>
        
        <div ref={dragContainerRef} style={{ background: 'rgba(0, 230, 255, 0.01)', border: '1px dashed rgba(0, 230, 255, 0.1)', padding: '2rem', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
           <p style={{fontFamily: 'monospace', fontSize: '1.2rem', color: '#00E6FF', position: 'absolute', top: '2rem'}}>
             C:\SYSTEM{'>'} Establish physical links by grabbing and throwing nodes.
           </p>
           
           {[1,2,3].map(i => (
             <motion.div
               key={`target-${i}`}
               drag
               dragConstraints={dragContainerRef}
               style={{
                 width: '180px', height: '180px', borderRadius: '50%', border: '2px dashed rgba(0,230,255,0.2)',
                 position: 'absolute', top: `${10 + i*20}%`, left: `${20 + i*22}%`,
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: 'rgba(0,230,255,0.3)', fontSize: '0.9rem', cursor: 'grab',
                 boxShadow: 'inset 0 0 30px rgba(0,230,255,0.05)'
               }}
             >
               Networking Zone {i}
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
export default QuantumNexus;
