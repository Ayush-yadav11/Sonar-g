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
      {/* Beautiful golden gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-app-accent-gold/10 via-app-background to-app-accent-gold/5"
        style={{ opacity }}
      />
      
      {/* Animated golden particles effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-app-accent-gold/5 to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-app-accent-gold/3 via-transparent to-app-accent-gold/3" />
      </div>
      
      {/* Overlay for better text readability */}
      {enableOverlay && (
        <div className="absolute inset-0 bg-background/10 dark:bg-background/30 pointer-events-none transition-colors duration-300" />
      )}
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20 pointer-events-none" />
    </div>
  );
};
