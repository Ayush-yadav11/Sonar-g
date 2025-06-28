import React from 'react';
import { TrendingUp, Target, Activity } from 'lucide-react';

interface MetricsCardsProps {
  currentPrice: number;
  predictions: Array<{
    hour: number;
    price: number;
    confidence: number;
  }>;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ currentPrice, predictions }) => {
  const next24hPrediction = predictions.find(p => p.hour === 24);
  const avgConfidence = predictions.length > 0 
    ? predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length 
    : 0;

  const metrics = [
    {
      title: '24H Prediction',
      value: next24hPrediction ? `$${next24hPrediction.price.toFixed(2)}` : 'Loading...',
      change: next24hPrediction ? ((next24hPrediction.price - currentPrice) / currentPrice * 100).toFixed(2) : '0',
      icon: Target,
    },
    {
      title: 'Avg Confidence',
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      change: '+2.3',
      icon: Activity,
    },
    {
      title: '24H High',
      value: `$${(currentPrice + 15.5).toFixed(2)}`,
      change: '+0.8',
      icon: TrendingUp,
    }
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div 
          key={metric.title} 
          className="bg-app-theme-cream rounded-xl border border-app-theme-yellow/20 p-4 h-[120px] relative overflow-hidden"
        >
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-theme-warm" />
          
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-app-theme-yellow/20 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-theme-warm rounded-lg flex items-center justify-center">
                <metric.icon size={14} className="text-white" />
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              parseFloat(metric.change) >= 0 
                ? 'bg-success-DEFAULT/20 text-success-DEFAULT' 
                : 'bg-destructive-DEFAULT/20 text-destructive-DEFAULT'
            }`}>
              {parseFloat(metric.change) >= 0 ? '+' : ''}{metric.change}%
            </div>
          </div>
          
          <div>
            <div className="text-app-neutral-600 text-sm mb-1">{metric.title}</div>
            <div className="text-app-theme-orange-dark text-xl font-bold">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
