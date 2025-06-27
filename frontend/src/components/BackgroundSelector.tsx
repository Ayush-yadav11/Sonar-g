import React from 'react';

export const BackgroundSelector: React.FC = () => {
  const [backgroundType, setBackgroundType] = React.useState<'spline' | 'liquid'>('spline');

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-app-text-primary mb-3">Background Options</h3>
      <div className="flex gap-3">
        <button
          onClick={() => setBackgroundType('spline')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            backgroundType === 'spline'
              ? 'bg-app-accent-gold text-white'
              : 'bg-card border border-border text-app-text-secondary hover:text-app-text-primary'
          }`}
        >
          🎨 Spline 3D Background
        </button>
        <button
          onClick={() => setBackgroundType('liquid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            backgroundType === 'liquid'
              ? 'bg-app-accent-gold text-white'
              : 'bg-card border border-border text-app-text-secondary hover:text-app-text-primary'
          }`}
        >
          ✨ Liquid Gold Animation
        </button>
      </div>
      <p className="text-app-text-secondary text-sm mt-2">
        {backgroundType === 'spline' 
          ? 'Using interactive 3D Spline background with liquid gold effects'
          : 'Using CSS-animated liquid gold background effects'
        }
      </p>
    </div>
  );
};
