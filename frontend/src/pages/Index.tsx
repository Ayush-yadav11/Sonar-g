import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LivePriceCard } from '@/components/LivePriceCard';
import { MetricsCards } from '@/components/MetricsCards';
import { PriceChart } from '@/components/PriceChart';
import GoldPricePrediction from '@/components/GoldPricePrediction';
import { ScenarioAnalysis } from '@/components/ScenarioAnalysis';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { HighFrequencyData } from '@/components/HighFrequencyData';
import { SplineBackground } from '@/components/Background';
import { useGoldPrice } from '@/hooks/useGoldPrice';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentPrice } = useGoldPrice();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [priceHistory, setPriceHistory] = useState<Array<{time: string; price: number; timestamp: number}>>([]);
  const [predictions, setPredictions] = useState([]);

  // Update lastUpdate when currentPrice changes
  useEffect(() => {
    setLastUpdate(new Date());
  }, [currentPrice]);

  // Generate mock predictions
  useEffect(() => {
    const generatePredictions = () => {
      const basePredictions = [];
      let basePrice = currentPrice;
      
      for (let i = 1; i <= 24; i++) {
        const trend = Math.sin(i * 0.1) * 5;
        const random = (Math.random() - 0.5) * 15;
        const predictedPrice = basePrice + trend + random;
        const confidence = Math.max(0.6, 0.95 - (i * 0.01));
        
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

  // Calculate price changes
  const priceChange = currentPrice - 2080; // Mock previous close
  const priceChangePercent = ((priceChange / 2080) * 100).toFixed(2);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'lstm-prediction', label: 'ML Model Prediction' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'simulator', label: 'What-If' },
    { id: 'hfd', label: 'High-Freq Data' }
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-orange-400/20 to-red-500/20"></div>
        <div className="absolute inset-0 animate-wave-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-600/10 transform rotate-12"></div>
        </div>
        <div className="absolute inset-0 animate-wave-medium">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-600/10 to-red-700/10 transform -rotate-12"></div>
        </div>
        <div className="absolute inset-0 animate-wave-fast">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 via-orange-700/5 to-red-800/5"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <SplineBackground />
        
        {/* Tab Navigation */}
        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex space-x-1 bg-card/50 backdrop-blur-sm rounded-lg p-1 border border-border">
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

        {/* Content */}
        <div className="container mx-auto px-6 pb-8 space-y-6 relative z-10">
          {activeTab === 'dashboard' && (
            <>
              {/* Live Price Card */}
              <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
                <CardContent className="p-6">
                  <LivePriceCard 
                    currentPrice={currentPrice}
                    priceChange={priceChange}
                    priceChangePercent={priceChangePercent}
                    lastUpdate={lastUpdate}
                  />
                </CardContent>
              </Card>

              {/* Metrics Cards */}
              <div className="backdrop-blur-sm">
                <MetricsCards 
                  currentPrice={currentPrice}
                  predictions={predictions}
                />
              </div>

              {/* Price Chart */}
              <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
                <CardContent className="p-6">
                  <PriceChart 
                    priceHistory={priceHistory}
                    currentPrice={currentPrice}
                  />
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'lstm-prediction' && (
            <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
              <CardContent className="p-6">
                <GoldPricePrediction />
              </CardContent>
            </Card>
          )}

          {activeTab === 'scenarios' && (
            <div className="backdrop-blur-sm">
              <ScenarioAnalysis currentPrice={currentPrice} />
            </div>
          )}

          {activeTab === 'simulator' && (
            <div className="backdrop-blur-sm">
              <WhatIfSimulator currentPrice={currentPrice} />
            </div>
          )}

          {activeTab === 'hfd' && (
            <div className="backdrop-blur-sm">
              <HighFrequencyData currentPrice={currentPrice} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
