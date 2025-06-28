import React from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface LivePriceCardProps {
  currentPrice: number;
  priceChange: number;
  priceChangePercent: string;
  lastUpdate: Date | null;
}

export const LivePriceCard: React.FC<LivePriceCardProps> = ({
  currentPrice,
  priceChange,
  priceChangePercent,
  lastUpdate
}) => {
  const formatTime = (date: Date | null) => {
    if (!date) return 'Updating...';
    return date.toLocaleTimeString();
  };

  return (
    <div className="bg-app-theme-cream rounded-2xl p-6 shadow-sm relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-theme-warm" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-app-theme-yellow/20 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-theme-warm rounded-lg flex items-center justify-center">
              {priceChange >= 0 ? (
                <TrendingUp size={14} className="text-white" />
              ) : (
                <TrendingDown size={14} className="text-white" />
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-app-neutral-900">Live Gold Price</h3>
            <p className="text-sm text-app-neutral-600">Real-time market data</p>
          </div>
        </div>
      </div>

      {/* Price Display */}
      <div className="space-y-6">
        <div>
          <div className="text-4xl font-bold text-app-theme-orange-dark tracking-tight">
            ${currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center gap-2 mt-2 ${
            priceChange >= 0 ? 'text-success-DEFAULT' : 'text-destructive-DEFAULT'
          }`}>
            <span className="text-base font-medium">
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
            </span>
            <span className="text-sm font-medium opacity-80">
              ({priceChange >= 0 ? '+' : ''}{priceChangePercent}%)
            </span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-app-neutral-500 text-sm">
          <Clock size={14} />
          <span>Last updated: {formatTime(lastUpdate)}</span>
        </div>
      </div>
    </div>
  );
};
