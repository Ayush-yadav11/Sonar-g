import React, { useState, useEffect } from 'react';
import { LivePriceCard } from '@/components/LivePriceCard';
import { PriceChart } from '@/components/PriceChart';
import { PredictionPanel } from '@/components/PredictionPanel';
import { HistoricalData } from '@/components/HistoricalData';
import { MetricsCards } from '@/components/MetricsCards';
import { ScenarioAnalysis } from '@/components/ScenarioAnalysis';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { HighFrequencyData } from '@/components/HighFrequencyData';
import { SplineBackground } from '@/components/Background';
import GoldPricePrediction from '@/components/GoldPricePrediction';

interface IndexProps {
  isLive?: boolean;
  setIsLive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Index = ({ isLive: externalIsLive, setIsLive: externalSetIsLive }: IndexProps) => {
  const [currentPrice, setCurrentPrice] = useState(2085.50);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [priceHistory, setPriceHistory] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sync with external isLive state if provided
  useEffect(() => {
    if (externalIsLive !== undefined) {
      setIsLive(externalIsLive);
    }
  }, [externalIsLive]);

  // Update external state when local state changes
  useEffect(() => {
    if (externalSetIsLive) {
      externalSetIsLive(isLive);
    }
  }, [isLive, externalSetIsLive]);

  // Simulate real-time price updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 10; // ±$5 variation
      const newPrice = Math.max(2000, currentPrice + variation);
      setCurrentPrice(prev => Number((prev + (Math.random() - 0.5) * 8).toFixed(2)));
      setLastUpdate(new Date());
      
      // Update price history
      setPriceHistory(prev => {
        const newHistory = [...prev, {
          time: new Date().toLocaleTimeString(),
          price: newPrice,
          timestamp: Date.now()
        }];
        return newHistory.slice(-50); // Keep last 50 points
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive, currentPrice]);

  // Generate mock predictions
  useEffect(() => {
    const generatePredictions = () => {
      const basePredictions = [];
      let basePrice = currentPrice;
      
      for (let i = 1; i <= 24; i++) {
        const trend = Math.sin(i * 0.1) * 5; // Some trend pattern
        const random = (Math.random() - 0.5) * 15;
        const predictedPrice = basePrice + trend + random;
        const confidence = Math.max(0.6, 0.95 - (i * 0.01)); // Decreasing confidence over time
        
        basePredictions.push({
          hour: i,
          price: Number(predictedPrice.toFixed(2)),
          confidence: Number(confidence.toFixed(3)),
          timeLabel: new Date(Date.now() + i * 3600000).toLocaleTimeString()
        });
        
        basePrice = predictedPrice;
      }
      
      setPredictions(basePredictions);
    };

    generatePredictions();
  }, [currentPrice]);

  const priceChange = currentPrice - 2080; // Mock previous close
  const priceChangePercent = ((priceChange / 2080) * 100).toFixed(2);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'lstm-prediction', label: 'LSTM Prediction' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'simulator', label: 'What-If' },
    { id: 'hfd', label: 'High-Freq Data' }
  ];

  return (
    <div className="min-h-screen bg-app-background relative">
      {/* Spline 3D Background */}
      <SplineBackground />

      {/* Tab Navigation */}
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex space-x-1 bg-card/50 rounded-lg p-1 border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-app-accent-gold/20 text-app-accent-gold'
                  : 'text-app-text-secondary hover:text-app-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-8 space-y-6 relative z-10">
        {activeTab === 'dashboard' && (
          <>
            {/* Live Price Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LivePriceCard 
                  currentPrice={currentPrice}
                  priceChange={priceChange}
                  priceChangePercent={priceChangePercent}
                  lastUpdate={lastUpdate}
                />
              </div>
              <div>
                <MetricsCards currentPrice={currentPrice} predictions={predictions} />
              </div>
            </div>

            {/* Main Chart */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
              <PriceChart priceHistory={priceHistory} currentPrice={currentPrice} />
            </div>

            {/* Predictions and Historical Data */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PredictionPanel predictions={predictions} />
              <HistoricalData priceHistory={priceHistory} />
            </div>
          </>
        )}

        {activeTab === 'lstm-prediction' && (
          <GoldPricePrediction />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioAnalysis currentPrice={currentPrice} />
        )}

        {activeTab === 'simulator' && (
          <WhatIfSimulator currentPrice={currentPrice} />
        )}

        {activeTab === 'hfd' && (
          <HighFrequencyData currentPrice={currentPrice} />
        )}
      </div>
    </div>
  );
};

export default Index;
