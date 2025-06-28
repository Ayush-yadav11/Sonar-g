import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WhatIfSimulator } from '@/components/WhatIfSimulator';
import { ScenarioAnalysis } from '@/components/ScenarioAnalysis';
import RuralLendingRisk from '@/components/RuralLendingRisk';
import { HistoricalData } from '@/components/HistoricalData';
import { useGoldPrice } from '@/hooks/useGoldPrice';
import { SplineBackground } from '@/components/Background';

const HistoricalDataPage = () => {
  const { currentPrice } = useGoldPrice();
  const [activeTab, setActiveTab] = useState('historical');
  const [priceHistory, setPriceHistory] = useState<Array<{time: string; price: number; timestamp: number}>>([]);

  const tabs = [
    { id: 'historical', label: 'Historical Data' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'simulator', label: 'What-If' },
    { id: 'rural', label: 'Rural Lending' }
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
          {activeTab === 'historical' && (
            <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
              <CardHeader>
                <CardTitle className="text-xl text-app-accent-gold">Long-Term Market Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] overflow-x-auto max-w-full w-full">
                  <HistoricalData priceHistory={priceHistory} />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 pt-6">
                  <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">YTD Change</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-app-accent-gold">+12.3%</p>
                      <p className="text-xs text-app-text-secondary mt-1">Since January 1, 2025</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">5-Year High</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-app-accent-gold">$2,431.50</p>
                      <p className="text-xs text-app-text-secondary mt-1">March 12, 2025</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-app-accent-gold/20 backdrop-blur-sm bg-card/90">
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">5-Year Low</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-app-accent-gold">$1,673.30</p>
                      <p className="text-xs text-app-text-secondary mt-1">September 28, 2022</p>
                    </CardContent>
                  </Card>
                </div>
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

          {activeTab === 'rural' && (
            <div className="backdrop-blur-sm">
              <RuralLendingRisk />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataPage;
