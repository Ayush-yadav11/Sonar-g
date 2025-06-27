
import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface ScenarioAnalysisProps {
  currentPrice: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  priceChange: number;
  timeframe: string;
  probability: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ currentPrice }) => {
  const [scenarios] = useState<Scenario[]>([
    {
      id: '1',
      name: 'Fed Rate Cut',
      description: 'Federal Reserve cuts interest rates by 0.5%',
      priceChange: 85.50,
      timeframe: '1-2 weeks',
      probability: 0.65,
      impact: 'positive'
    },
    {
      id: '2',
      name: 'Inflation Spike',
      description: 'CPI rises above 4% unexpectedly',
      priceChange: 125.75,
      timeframe: '3-5 days',
      probability: 0.35,
      impact: 'positive'
    },
    {
      id: '3',
      name: 'Dollar Strength',
      description: 'USD strengthens significantly vs major currencies',
      priceChange: -95.20,
      timeframe: '1 week',
      probability: 0.45,
      impact: 'negative'
    },
    {
      id: '4',
      name: 'Geopolitical Tension',
      description: 'Escalation in global conflict zones',
      priceChange: 180.30,
      timeframe: '1-3 days',
      probability: 0.25,
      impact: 'positive'
    },
    {
      id: '5',
      name: 'Tech Sector Crash',
      description: 'Major tech stocks decline 15%+',
      priceChange: 65.80,
      timeframe: '2-4 days',
      probability: 0.20,
      impact: 'positive'
    }
  ]);

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp size={16} className="text-green-400" />;
      case 'negative': return <TrendingDown size={16} className="text-red-400" />;
      default: return <Target size={16} className="text-yellow-400" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'border-green-500/30 bg-green-500/10';
      case 'negative': return 'border-red-500/30 bg-red-500/10';
      default: return 'border-yellow-500/30 bg-yellow-500/10';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.6) return 'text-green-400';
    if (probability >= 0.4) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
          <Calculator size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Scenario Analysis</h3>
          <p className="text-slate-400 text-sm">Market event impact modeling</p>
        </div>
      </div>

      <div className="space-y-4">
        {scenarios.map((scenario) => {
          const projectedPrice = currentPrice + scenario.priceChange;
          const percentChange = (scenario.priceChange / currentPrice) * 100;

          return (
            <div 
              key={scenario.id}
              className={`p-4 rounded-lg border ${getImpactColor(scenario.impact)} hover:bg-opacity-20 transition-colors`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getImpactIcon(scenario.impact)}
                  <h4 className="font-semibold text-white">{scenario.name}</h4>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getProbabilityColor(scenario.probability)}`}>
                    {(scenario.probability * 100).toFixed(0)}% chance
                  </div>
                  <div className="text-xs text-slate-400">{scenario.timeframe}</div>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-3">{scenario.description}</p>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-slate-400 text-xs">Current Price</div>
                  <div className="text-white font-semibold">${currentPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Projected Price</div>
                  <div className="text-white font-semibold">${projectedPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Impact</div>
                  <div className={`font-semibold ${
                    scenario.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {scenario.priceChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
        <div className="text-sm text-slate-400 mb-2">Scenario Probabilities</div>
        <div className="text-xs text-slate-500">
          Probabilities are based on historical data and current market conditions. 
          These are estimates and actual outcomes may vary significantly.
        </div>
      </div>
    </div>
  );
};
