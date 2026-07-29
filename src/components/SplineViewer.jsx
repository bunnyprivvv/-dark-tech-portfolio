import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

const SplineViewer = ({ sceneUrl = "https://prod.spline.design/FkXfppfybo8wiC-r/scene.splinecode", style, className }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let app = null;
    let isMounted = true;

    if (canvasRef.current) {
      app = new Application(canvasRef.current);
      app
        .load(sceneUrl)
        .then(() => {
          if (isMounted) {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.warn('Spline runtime load note:', err);
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
      if (app) {
        try {
          app.dispose();
        } catch (e) {}
      }
    };
  }, [sceneUrl]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px', ...style }} className={className}>
      {loading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.02)', color: 'var(--color-text-muted)', fontFamily: 'monospace', fontSize: '0.85rem', zIndex: 2 }}>
          <span>Initializing 3D Pipeline Scene...</span>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block', outline: 'none' }} 
      />
    </div>
  );
};

export default SplineViewer;
