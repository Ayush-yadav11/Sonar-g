
import React, { useState, useEffect } from 'react';
import { Settings, Play, RotateCcw } from 'lucide-react';

interface WhatIfSimulatorProps {
  currentPrice: number;
}

interface SimulationResult {
  scenario: string;
  finalPrice: number;
  maxPrice: number;
  minPrice: number;
  volatility: number;
  roi: number;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ currentPrice }) => {
  const [parameters, setParameters] = useState({
    timeHorizon: 30, // days
    volatility: 0.15, // 15% annual volatility
    trendDirection: 0, // -1 bearish, 0 neutral, 1 bullish
    marketShock: 0, // percentage shock
    interestRate: 0.05 // 5% annual rate
  });

  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    
    // Simulate different scenarios
    const scenarios = [
      { name: 'Bull Market', trend: 0.1, vol: parameters.volatility * 0.8 },
      { name: 'Bear Market', trend: -0.08, vol: parameters.volatility * 1.2 },
      { name: 'Sideways Market', trend: 0.02, vol: parameters.volatility },
      { name: 'High Volatility', trend: parameters.trendDirection * 0.05, vol: parameters.volatility * 1.5 },
      { name: 'Market Crash', trend: -0.25, vol: parameters.volatility * 2 }
    ];

    setTimeout(() => {
      const simulationResults = scenarios.map(scenario => {
        const drift = scenario.trend;
        const vol = scenario.vol;
        const dt = 1 / 365; // daily steps
        const steps = parameters.timeHorizon;
        
        let price = currentPrice;
        let maxPrice = currentPrice;
        let minPrice = currentPrice;
        
        // Monte Carlo simulation
        for (let i = 0; i < steps; i++) {
          const random = (Math.random() - 0.5) * 2; // random walk
          const priceChange = price * (drift * dt + vol * Math.sqrt(dt) * random);
          price += priceChange;
          
          if (parameters.marketShock !== 0 && i === Math.floor(steps / 2)) {
            price *= (1 + parameters.marketShock / 100);
          }
          
          maxPrice = Math.max(maxPrice, price);
          minPrice = Math.min(minPrice, price);
        }
        
        const roi = ((price - currentPrice) / currentPrice) * 100;
        const volatility = vol * 100;
        
        return {
          scenario: scenario.name,
          finalPrice: price,
          maxPrice,
          minPrice,
          volatility,
          roi
        };
      });
      
      setResults(simulationResults);
      setIsRunning(false);
    }, 2000);
  };

  const resetSimulation = () => {
    setResults([]);
    setParameters({
      timeHorizon: 30,
      volatility: 0.15,
      trendDirection: 0,
      marketShock: 0,
      interestRate: 0.05
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
          <Settings size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">What-If Simulator</h3>
          <p className="text-slate-400 text-sm">Monte Carlo price simulations</p>
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Time Horizon (days)
            </label>
            <input
              type="range"
              min="1"
              max="365"
              value={parameters.timeHorizon}
              onChange={(e) => setParameters({...parameters, timeHorizon: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-slate-400 mt-1">{parameters.timeHorizon} days</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Volatility
            </label>
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.01"
              value={parameters.volatility}
              onChange={(e) => setParameters({...parameters, volatility: parseFloat(e.target.value)})}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-slate-400 mt-1">{(parameters.volatility * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Market Shock (%)
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={parameters.marketShock}
              onChange={(e) => setParameters({...parameters, marketShock: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-sm text-slate-400 mt-1">{parameters.marketShock}%</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Trend Direction
            </label>
            <select
              value={parameters.trendDirection}
              onChange={(e) => setParameters({...parameters, trendDirection: parseInt(e.target.value)})}
              className="w-full bg-slate-600 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value={-1}>Bearish</option>
              <option value={0}>Neutral</option>
              <option value={1}>Bullish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        >
          <Play size={16} />
          <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
        </button>
        <button
          onClick={resetSimulation}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Simulation Results</h4>
          {results.map((result, index) => (
            <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-white">{result.scenario}</h5>
                <div className={`text-sm font-semibold ${
                  result.roi >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(1)}% ROI
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-slate-400">Final Price</div>
                  <div className="text-white font-semibold">${result.finalPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-slate-400">Max Price</div>
                  <div className="text-green-400 font-semibold">${result.maxPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-slate-400">Min Price</div>
                  <div className="text-red-400 font-semibold">${result.minPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-slate-400">Volatility</div>
                  <div className="text-yellow-400 font-semibold">{result.volatility.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isRunning && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-slate-400">Running Monte Carlo simulation...</span>
        </div>
      )}
    </div>
  );
};
