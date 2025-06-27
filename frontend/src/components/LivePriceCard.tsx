
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface LivePriceCardProps {
  currentPrice: number;
  priceChange: number;
  priceChangePercent: string;
  lastUpdate: Date;
}

export const LivePriceCard: React.FC<LivePriceCardProps> = ({
  currentPrice,
  priceChange,
  priceChangePercent,
  lastUpdate
}) => {
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-gradient-to-br from-slate-800/70 to-slate-700/70 backdrop-blur-sm rounded-xl border border-yellow-500/30 p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-yellow-400 mb-1">Live Gold Price</h2>
            <p className="text-slate-400 text-sm">Troy Ounce (USD)</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">LIVE</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline space-x-4">
            <span className="text-5xl font-bold text-white tabular-nums">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              isPositive 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="font-semibold tabular-nums">
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}
              </span>
              <span className="text-sm">
                ({isPositive ? '+' : ''}{priceChangePercent}%)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
            <span className="text-yellow-400 font-medium">
              24H Volume: $2.4B
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
