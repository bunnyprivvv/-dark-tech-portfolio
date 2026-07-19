import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const Scene = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Keep it behind everything
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={<p style={{color: 'rgba(255,255,255,0.2)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Initializing 3D Pipeline Scene...</p>}>
        <Spline scene="https://prod.spline.design/FkXfppfybo8wiC-r/scene.splinecode" />
      </Suspense>
    </div>
  );
};

export default Scene;
