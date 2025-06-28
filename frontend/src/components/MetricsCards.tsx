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
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Avg Confidence',
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      change: '+2.3',
      icon: Activity,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: '24H High',
      value: `$${(currentPrice + 15.5).toFixed(2)}`,
      change: '+0.8',
      icon: TrendingUp,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={metric.title} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-4 h-[120px]">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-8 h-8 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
              <metric.icon size={16} className="text-white" />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              parseFloat(metric.change) >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {parseFloat(metric.change) >= 0 ? '+' : ''}{metric.change}%
            </div>
          </div>
          
          <div>
            <div className="text-slate-400 text-sm mb-1">{metric.title}</div>
            <div className="text-white text-xl font-bold">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
