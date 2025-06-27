
import React from 'react';
import { Brain, TrendingUp } from 'lucide-react';

interface PredictionPanelProps {
  predictions: Array<{
    hour: number;
    price: number;
    confidence: number;
    timeLabel: string;
  }>;
}

export const PredictionPanel: React.FC<PredictionPanelProps> = ({ predictions }) => {
  const nextHourPredictions = predictions.slice(0, 8);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Brain size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">AI Predictions</h3>
          <p className="text-slate-400 text-sm">Next 8 hours forecast</p>
        </div>
      </div>

      <div className="space-y-3">
        {nextHourPredictions.map((prediction, index) => (
          <div 
            key={prediction.hour}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-sm text-slate-400 w-16">
                +{prediction.hour}h
              </div>
              <div>
                <div className="text-white font-semibold">
                  ${prediction.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-slate-400">
                  {prediction.timeLabel}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  prediction.confidence > 0.8 ? 'text-green-400' :
                  prediction.confidence > 0.7 ? 'text-yellow-400' : 'text-orange-400'
                }`}>
                  {(prediction.confidence * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-slate-400">confidence</div>
              </div>
              
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    prediction.confidence > 0.8 ? 'bg-green-400' :
                    prediction.confidence > 0.7 ? 'bg-yellow-400' : 'bg-orange-400'
                  }`}
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp size={16} className="text-purple-400" />
          <span className="text-purple-400 font-medium text-sm">Model Accuracy</span>
        </div>
        <div className="text-white text-sm">
          24h accuracy: <span className="font-bold text-green-400">87.3%</span>
        </div>
        <div className="text-slate-400 text-xs mt-1">
          Based on 10,000+ historical data points
        </div>
      </div>
    </div>
  );
};
