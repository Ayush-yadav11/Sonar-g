import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SplineBackground } from '@/components/Background';
import { HistoricalData } from '@/components/HistoricalData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HistoricalDataPage = () => {
  // Generate mock price history data
  const [priceHistory, setPriceHistory] = useState<Array<{time: string; price: number; timestamp: number}>>([]);
  
  useEffect(() => {
    // Generate some sample historical data
    const generateHistoricalData = () => {
      const data = [];
      const now = new Date();
      const basePrice = 2100;
      
      for (let i = 365; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Add some randomness with a slight upward trend
        const volatility = Math.random() * 50 - 25; // Random value between -25 and 25
        const trendFactor = (365 - i) * 0.5; // Slight upward trend
        const price = basePrice + volatility + trendFactor;
        
        data.push({
          time: date.toISOString().split('T')[0],
          price: parseFloat(price.toFixed(2)),
          timestamp: date.getTime()
        });
      }
      
      return data;
    };
    
    setPriceHistory(generateHistoricalData());
  }, []);

  return (
    <div className="min-h-screen bg-app-background relative">
      <SplineBackground />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-app-text-primary mb-6">Historical Gold Prices</h1>
          
          <Card className="mb-8 border-app-accent-gold/20">
            <CardHeader>
              <CardTitle className="text-xl text-app-accent-gold">Long-Term Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gold" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="gold">Gold</TabsTrigger>
                  <TabsTrigger value="silver">Silver</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gold" className="space-y-6">
                  <div className="h-[500px] overflow-x-auto max-w-full w-full">
                    <HistoricalData priceHistory={priceHistory} />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 pt-2">
                    <Card className="border-app-accent-gold/20">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">YTD Change</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-app-accent-gold">+12.3%</p>
                        <p className="text-xs text-app-text-secondary mt-1">Since January 1, 2025</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">5-Year High</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-app-accent-gold">$2,431.50</p>
                        <p className="text-xs text-app-text-secondary mt-1">March 12, 2025</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">5-Year Low</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-app-accent-gold">$1,673.30</p>
                        <p className="text-xs text-app-text-secondary mt-1">September 28, 2022</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="silver" className="space-y-6">
                  <div className="h-[500px] flex items-center justify-center">
                    <p className="text-app-text-secondary">Silver price historical data chart coming soon...</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 pt-2">
                    <Card className="border-app-accent-gold/20">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">YTD Change</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-app-accent-gold">+8.7%</p>
                        <p className="text-xs text-app-text-secondary mt-1">Since January 1, 2025</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">5-Year High</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-app-accent-gold">$31.45</p>
                        <p className="text-xs text-app-text-secondary mt-1">February 2, 2024</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">5-Year Low</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-app-accent-gold">$12.01</p>
                        <p className="text-xs text-app-text-secondary mt-1">March 19, 2020</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-app-accent-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-app-accent-gold">Market Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Gold has shown remarkable resilience over the past five years, with prices steadily climbing 
                  despite periods of volatility in global markets. The precious metal continues to serve as a 
                  safe-haven asset during times of economic uncertainty.
                </p>
                <p>
                  Key factors influencing gold prices include global inflation rates, central bank policies, 
                  geopolitical tensions, and currency fluctuations. The long-term trend remains bullish, with 
                  technical indicators suggesting continued strength in the gold market.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-app-accent-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-app-accent-gold">Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Gold price correlations with other assets (2020-2025):
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>USD Index</span>
                    <span className="text-red-500">-0.82 (Strong negative)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>S&P 500</span>
                    <span className="text-red-500">-0.34 (Moderate negative)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>US 10Y Treasury Yield</span>
                    <span className="text-red-500">-0.76 (Strong negative)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bitcoin</span>
                    <span className="text-green-500">+0.21 (Weak positive)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Silver</span>
                    <span className="text-green-500">+0.87 (Strong positive)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataPage;
