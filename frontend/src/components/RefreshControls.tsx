
import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface RefreshControlsProps {
  isLive: boolean;
  onToggleLive: () => void;
}

export const RefreshControls: React.FC<RefreshControlsProps> = ({ isLive, onToggleLive }) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggleLive}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isLive 
            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
            : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600/70'
        }`}
      >
        {isLive ? <Pause size={16} /> : <Play size={16} />}
        <span>{isLive ? 'Pause' : 'Resume'} Live</span>
      </button>
      
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 font-medium transition-all">
        <RefreshCw size={16} />
        <span>Refresh Data</span>
      </button>
    </div>
  );
};
