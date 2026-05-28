import React from 'react';
import { motion } from 'framer-motion';

const CyberPulse = () => {
  return (
    <div style={{ padding: '4rem', color: '#fff', height: '100vh', overflowY: 'auto' }}>
      <style>{`
        @keyframes glitch {
          0% { text-shadow: 2px 0 red, -2px 0 blue; transform: translate(0); }
          20% { text-shadow: -2px 0 red, 2px 0 blue; transform: translate(-2px, 1px); }
          40% { text-shadow: 2px 0 red, -2px 0 blue; transform: translate(2px, -1px); }
          60% { text-shadow: -2px 0 red, 2px 0 blue; transform: translate(-1px, 2px); }
          80% { text-shadow: 2px 0 red, -2px 0 blue; transform: translate(1px, -2px); }
          100% { text-shadow: -2px 0 red, 2px 0 blue; transform: translate(0); }
        }
        .cyber-glitch:hover {
          animation: glitch 0.2s infinite;
        }
      `}</style>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className="cyber-glitch" style={{ fontSize: '4rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Cyber Pulse</h1>
        <button className="cyber-glitch" style={{padding: '1rem 2rem', background: 'transparent', border: '1px solid #00E6FF', color: '#00E6FF', borderRadius: '30px', fontSize: '1rem'}}>
          Target Mainnet
        </button>
      </div>
      <p style={{color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem', marginBottom: '4rem'}}>Decentralized Dark-Market Operations Protocol</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', paddingBottom: '4rem' }}>
         {[1,2,3,4,5,6,7,8].map(i => (
           <motion.div 
             key={i}
             whileHover={{ scale: 1.05 }}
             className="cyber-glitch"
             style={{ 
               height: '350px', 
               background: `linear-gradient(to bottom, rgba(255,255,255,0.01), rgba(0,230,255,0.05))`, 
               border: '1px solid rgba(0,230,255,0.2)', 
               display: 'flex', flexDirection: 'column', 
               justifyContent: 'flex-end', padding: '1.5rem', borderRadius: '12px',
               boxShadow: 'inset 0 0 20px rgba(0, 230, 255, 0.05)'
             }}
           >
              <div style={{flex: 1}} />
              <p style={{ color: '#00E6FF', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Holo-Chassis / Node-{i}</p>
              <p style={{ color: '#888', fontSize: '1rem' }}>0.0{i} ETH</p>
           </motion.div>
         ))}
      </div>
    </div>
  );
};
export default CyberPulse;
