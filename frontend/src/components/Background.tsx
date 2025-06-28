import React from 'react';

interface SplineBackgroundProps {
  opacity?: number;
  enableOverlay?: boolean;
  className?: string;
}

export const SplineBackground: React.FC<SplineBackgroundProps> = ({ 
  opacity = 0.8, 
  enableOverlay = true,
  className = ''
}) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base layer with gradient layers */}
      <div className="absolute inset-0 bg-gradient-layers opacity-20" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-theme-soft opacity-30 animate-gradient" 
        style={{ 
          backgroundSize: '400% 400%',
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full bg-app-theme-yellow/10 animate-float blur-3xl"
          style={{ 
            top: '10%', 
            left: '20%',
            animationDelay: '-2s'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-app-theme-orange/10 animate-float blur-3xl"
          style={{ 
            top: '40%', 
            right: '15%',
            animationDelay: '-1s'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-app-theme-orange-dark/10 animate-float blur-3xl"
          style={{ 
            bottom: '10%', 
            left: '30%',
            animationDelay: '-3s'
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #FA812F 1px, transparent 1px),
                           linear-gradient(to bottom, #FA812F 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Light noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Vignette effect */}
      {enableOverlay && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-app-theme-cream/20" />
      )}
    </div>
  );
};
