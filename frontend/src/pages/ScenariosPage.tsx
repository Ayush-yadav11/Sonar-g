import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SplineBackground } from '@/components/Background';
import { ScenarioAnalysis } from '@/components/ScenarioAnalysis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Coins, 
  DollarSign, 
  LineChart, 
  Loader, 
  PieChart, 
  Shield, 
  TrendingDown, 
  TrendingUp, 
  Zap 
} from 'lucide-react';

const ScenariosPage = () => {
  const [currentPrice, setCurrentPrice] = useState(2085.50);
  
  return (
    <div className="min-h-screen pt-24">
      <SplineBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-app-text-primary mb-6">Scenario Analysis</h1>
          
          <Card className="mb-8 border-app-accent-gold/20">
            <CardHeader>
              <CardTitle className="text-xl text-app-accent-gold">Market Scenarios Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="market" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="market">Market Events</TabsTrigger>
                  <TabsTrigger value="economic">Economic Factors</TabsTrigger>
                  <TabsTrigger value="custom">Custom Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="market" className="space-y-6">
                  <ScenarioAnalysis currentPrice={currentPrice} />
                </TabsContent>
                
                <TabsContent value="economic" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-app-accent-gold/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-app-text-primary flex items-center gap-2">
                          <TrendingUp className="text-green-500" /> Inflation Impact
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Simulate the effect of various inflation rates on gold prices:</p>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <Button variant="outline" size="sm">Low (2-3%)</Button>
                          <Button variant="outline" size="sm">Medium (4-6%)</Button>
                          <Button variant="outline" size="sm">High (7%+)</Button>
                        </div>
                        <div className="bg-card/50 p-4 rounded-md border border-border">
                          <p className="text-sm text-app-text-secondary">Select an inflation scenario to view projected gold price impact</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-app-text-primary flex items-center gap-2">
                          <DollarSign className="text-app-accent-gold" /> Currency Strength
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Analyze gold price relationship with USD strength:</p>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <Button variant="outline" size="sm">Strong USD</Button>
                          <Button variant="outline" size="sm">Neutral</Button>
                          <Button variant="outline" size="sm">Weak USD</Button>
                        </div>
                        <div className="bg-card/50 p-4 rounded-md border border-border">
                          <p className="text-sm text-app-text-secondary">Select a currency scenario to view projected gold price impact</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-app-text-primary flex items-center gap-2">
                          <Briefcase className="text-blue-500" /> Interest Rates
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Forecast gold prices based on interest rate changes:</p>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <Button variant="outline" size="sm">Rate Cut</Button>
                          <Button variant="outline" size="sm">No Change</Button>
                          <Button variant="outline" size="sm">Rate Hike</Button>
                        </div>
                        <div className="bg-card/50 p-4 rounded-md border border-border">
                          <p className="text-sm text-app-text-secondary">Select an interest rate scenario to view projected gold price impact</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-app-accent-gold/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-app-text-primary flex items-center gap-2">
                          <LineChart className="text-purple-500" /> Stock Market Correlation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Gold performance during stock market conditions:</p>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <Button variant="outline" size="sm">Bull Market</Button>
                          <Button variant="outline" size="sm">Sideways</Button>
                          <Button variant="outline" size="sm">Bear Market</Button>
                        </div>
                        <div className="bg-card/50 p-4 rounded-md border border-border">
                          <p className="text-sm text-app-text-secondary">Select a stock market scenario to view projected gold price impact</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="space-y-6">
                  <Card className="border-app-accent-gold/20">
                    <CardHeader>
                      <CardTitle className="text-lg text-app-text-primary">Custom Scenario Builder</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-6">Create your own market scenario by adjusting the parameters below:</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-app-text-primary">Economic Factors</h3>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Inflation Rate (%)</label>
                            <input type="range" min="0" max="15" step="0.5" className="w-full" />
                            <div className="flex justify-between text-xs text-app-text-secondary">
                              <span>0%</span>
                              <span>7.5%</span>
                              <span>15%</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">USD Index</label>
                            <input type="range" min="80" max="120" step="1" className="w-full" />
                            <div className="flex justify-between text-xs text-app-text-secondary">
                              <span>80 (Weak)</span>
                              <span>100</span>
                              <span>120 (Strong)</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Interest Rate (%)</label>
                            <input type="range" min="0" max="10" step="0.25" className="w-full" />
                            <div className="flex justify-between text-xs text-app-text-secondary">
                              <span>0%</span>
                              <span>5%</span>
                              <span>10%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium text-app-text-primary">Market Conditions</h3>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Stock Market Performance</label>
                            <input type="range" min="-30" max="30" step="1" className="w-full" />
                            <div className="flex justify-between text-xs text-app-text-secondary">
                              <span>-30% (Bear)</span>
                              <span>0%</span>
                              <span>+30% (Bull)</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Geopolitical Risk Level</label>
                            <input type="range" min="0" max="10" step="1" className="w-full" />
                            <div className="flex justify-between text-xs text-app-text-secondary">
                              <span>Low</span>
                              <span>Medium</span>
                              <span>High</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Time Horizon (Months)</label>
                            <input type="range" min="1" max="24" step="1" className="w-full" />
                            <div className="flex justify-between text-xs text-app-text-secondary">
                              <span>1</span>
                              <span>12</span>
                              <span>24</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <Button className="bg-app-accent-gold hover:bg-app-accent-hover text-white">
                          <Zap className="mr-2 h-4 w-4" />
                          Run Custom Simulation
                        </Button>
                      </div>
                      
                      <div className="mt-6 bg-card/50 p-4 rounded-md border border-border">
                        <div className="flex items-center justify-center">
                          <Loader className="animate-spin h-5 w-5 mr-2 text-app-accent-gold" />
                          <span className="text-sm text-app-text-secondary">Adjust parameters and run simulation to view results</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-app-accent-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-app-accent-gold">Scenario Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our scenario analysis provides insights into how gold prices might react to various market 
                  conditions and economic events. While gold is traditionally seen as a safe-haven asset, 
                  its price is influenced by multiple factors that can sometimes produce counterintuitive results.
                </p>
                <p>
                  Key insights from our analysis:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Gold typically performs well during high inflation environments</li>
                  <li>There's often an inverse relationship between gold prices and USD strength</li>
                  <li>Lower interest rates generally benefit gold prices</li>
                  <li>Stock market crashes can trigger flight-to-safety buying of gold</li>
                  <li>Geopolitical tensions and uncertainty usually support higher gold prices</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-app-accent-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-app-accent-gold">Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-app-accent-gold mr-2" />
                      <h3 className="font-medium text-app-text-primary">Inflation Protection</h3>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                      <div className="bg-app-accent-gold h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-app-text-secondary">High effectiveness (85%)</p>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                      <h3 className="font-medium text-app-text-primary">Market Crash Hedge</h3>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                      <div className="bg-app-accent-gold h-1.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <p className="text-xs text-app-text-secondary">Good effectiveness (72%)</p>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                      <h3 className="font-medium text-app-text-primary">Currency Devaluation</h3>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                      <div className="bg-app-accent-gold h-1.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <p className="text-xs text-app-text-secondary">Excellent protection (90%)</p>
                  </div>
                  
                  <div className="border border-border rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <PieChart className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="font-medium text-app-text-primary">Portfolio Diversifier</h3>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
                      <div className="bg-app-accent-gold h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-xs text-app-text-secondary">Strong diversifier (80%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenariosPage;
