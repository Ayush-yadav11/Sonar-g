import React, { useEffect, useRef, useState } from 'react';

interface LocalSplineViewerProps {
  opacity?: number;
  enableOverlay?: boolean;
  className?: string;
}

export const LocalSplineViewer: React.FC<LocalSplineViewerProps> = ({ 
  opacity = 0.8, 
  enableOverlay = true,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Try to load Spline runtime from CDN and then load local file
    const loadSplineRuntime = async () => {
      try {
        // Dynamically import Spline runtime from CDN
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@splinetool/runtime@1.9.28/build/runtime.js';
        script.type = 'module';
        
        script.onload = async () => {
          try {
            // @ts-ignore - Spline runtime loaded globally
            const { Application } = window.SPLINE;
            const canvas = document.getElementById('spline-canvas') as HTMLCanvasElement;
            
            if (canvas && Application) {
              const app = new Application(canvas);
              await app.load('/liquid_gold.spline');
              setIsLoaded(true);
            } else {
              throw new Error('Canvas or Application not found');
            }
          } catch (error) {
            console.warn('Failed to load Spline scene:', error);
            setHasError(true);
          }
        };
        
        script.onerror = () => {
          console.warn('Failed to load Spline runtime');
          setHasError(true);
        };
        
        document.head.appendChild(script);
        
        // Cleanup
        return () => {
          document.head.removeChild(script);
        };
      } catch (error) {
        console.warn('Failed to setup Spline runtime:', error);
        setHasError(true);
      }
    };

    loadSplineRuntime();
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-app-accent-gold/10 via-app-background to-app-accent-gold/5 animate-pulse" />
      )}
      
      {/* Spline Canvas */}
      {!hasError && (
        <canvas 
          id="spline-canvas"
          className="w-full h-full transition-opacity duration-1000"
          style={{
            opacity: isLoaded ? opacity : 0,
            background: 'transparent'
          }}
        />
      )}
      
      {/* Fallback gradient background */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-app-background via-app-accent-gold/5 to-app-background" />
      )}
      
      {/* Overlay for better text readability */}
      {enableOverlay && (
        <div className="absolute inset-0 bg-background/10 dark:bg-background/30 pointer-events-none transition-colors duration-300" />
      )}
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};
