import React from 'react';
import SplineViewer from './SplineViewer';

const Scene = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <SplineViewer sceneUrl="https://prod.spline.design/FkXfppfybo8wiC-r/scene.splinecode" />
    </div>
  );
};

export default Scene;
