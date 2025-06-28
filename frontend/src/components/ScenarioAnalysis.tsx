import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Target, LineChart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { GoldPredictionAPI } from '../services/goldPredictionApi';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Create an instance of the API class
const goldPredictionApi = new GoldPredictionAPI();

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

interface CustomScenario {
  interest_rate_change: number;
  inflation_change: number;
  dollar_strength_change: number;
  market_volatility: number;
  geopolitical_risk: number;
  days: number;
}

export const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ currentPrice }) => {
  const [predefinedScenarios] = useState<Scenario[]>([
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

  const [customScenario, setCustomScenario] = useState<CustomScenario>({
    interest_rate_change: 0,
    inflation_change: 0,
    dollar_strength_change: 0,
    market_volatility: 50,
    geopolitical_risk: 50,
    days: 7
  });

  const [simulationResults, setSimulationResults] = useState<{
    dates: string[];
    base_predictions: number[];
    scenario_predictions: number[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCustomScenarioChange = (field: keyof CustomScenario, value: number) => {
    setCustomScenario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const runCustomSimulation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await goldPredictionApi.predictScenario(customScenario);
      setSimulationResults({
        dates: result.dates,
        base_predictions: result.base_predictions,
        scenario_predictions: result.scenario_predictions
      });
    } catch (err) {
      setError('Failed to run simulation. Please try again.');
      console.error('Simulation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="bg-app-theme-cream rounded-xl border border-app-theme-yellow/20 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-app-theme-yellow/20 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-theme-warm rounded-lg flex items-center justify-center">
            <Calculator size={14} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-app-neutral-900">Scenario Analysis</h3>
          <p className="text-app-neutral-600 text-sm">Market event impact modeling</p>
        </div>
      </div>

      <Tabs defaultValue="predefined" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="predefined">Predefined Scenarios</TabsTrigger>
          <TabsTrigger value="custom">Custom Scenario</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined">
          <div className="space-y-4">
            {predefinedScenarios.map((scenario) => {
              const projectedPrice = currentPrice + scenario.priceChange;
              const percentChange = (scenario.priceChange / currentPrice) * 100;

              return (
                <div 
                  key={scenario.id}
                  className={`p-4 rounded-lg border ${
                    scenario.impact === 'positive' 
                      ? 'border-success-DEFAULT/30 bg-success-DEFAULT/10' 
                      : scenario.impact === 'negative'
                      ? 'border-destructive-DEFAULT/30 bg-destructive-DEFAULT/10'
                      : 'border-app-theme-yellow/30 bg-app-theme-yellow/10'
                  } hover:bg-opacity-20 transition-colors`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getImpactIcon(scenario.impact)}
                      <h4 className="font-semibold text-app-neutral-900">{scenario.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        scenario.probability >= 0.6 ? 'text-success-DEFAULT' :
                        scenario.probability >= 0.4 ? 'text-app-theme-orange' :
                        'text-destructive-DEFAULT'
                      }`}>
                        {(scenario.probability * 100).toFixed(0)}% chance
                      </div>
                      <div className="text-xs text-app-neutral-600">{scenario.timeframe}</div>
                    </div>
                  </div>

                  <p className="text-app-neutral-700 text-sm mb-3">{scenario.description}</p>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-app-neutral-600 text-xs">Current Price</div>
                      <div className="text-app-neutral-900 font-semibold">${currentPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-app-neutral-600 text-xs">Projected Price</div>
                      <div className="text-app-neutral-900 font-semibold">${projectedPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-app-neutral-600 text-xs">Impact</div>
                      <div className={`font-semibold ${
                        scenario.priceChange >= 0 ? 'text-success-DEFAULT' : 'text-destructive-DEFAULT'
                      }`}>
                        {scenario.priceChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card className="bg-white border border-app-theme-yellow/20 p-4">
            <div className="space-y-6">
              <div>
                <label className="text-sm text-app-neutral-700 mb-2 block">Interest Rate Change (%)</label>
                <Input
                  type="number"
                  value={customScenario.interest_rate_change}
                  onChange={(e) => handleCustomScenarioChange('interest_rate_change', parseFloat(e.target.value))}
                  min="-5"
                  max="5"
                  step="0.25"
                  className="border-app-theme-yellow/20 focus:border-app-theme-yellow"
                />
              </div>

              <div>
                <label className="text-sm text-app-neutral-700 mb-2 block">Inflation Change (%)</label>
                <Input
                  type="number"
                  value={customScenario.inflation_change}
                  onChange={(e) => handleCustomScenarioChange('inflation_change', parseFloat(e.target.value))}
                  min="-5"
                  max="10"
                  step="0.25"
                  className="border-app-theme-yellow/20 focus:border-app-theme-yellow"
                />
              </div>

              <div>
                <label className="text-sm text-app-neutral-700 mb-2 block">Dollar Strength Change (%)</label>
                <Input
                  type="number"
                  value={customScenario.dollar_strength_change}
                  onChange={(e) => handleCustomScenarioChange('dollar_strength_change', parseFloat(e.target.value))}
                  min="-20"
                  max="20"
                  step="1"
                  className="border-app-theme-yellow/20 focus:border-app-theme-yellow"
                />
              </div>

              <div>
                <label className="text-sm text-app-neutral-700 mb-2 block">Market Volatility (0-100)</label>
                <Slider
                  value={[customScenario.market_volatility]}
                  onValueChange={(value) => handleCustomScenarioChange('market_volatility', value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full border-app-theme-yellow/20 focus:border-app-theme-yellow"
                />
              </div>

              <div>
                <label className="text-sm text-app-neutral-700 mb-2 block">Geopolitical Risk (0-100)</label>
                <Slider
                  value={[customScenario.geopolitical_risk]}
                  onValueChange={(value) => handleCustomScenarioChange('geopolitical_risk', value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full border-app-theme-yellow/20 focus:border-app-theme-yellow"
                />
              </div>

              <div>
                <label className="text-sm text-app-neutral-700 mb-2 block">Prediction Days</label>
                <Input
                  type="number"
                  value={customScenario.days}
                  onChange={(e) => handleCustomScenarioChange('days', parseInt(e.target.value))}
                  min="1"
                  max="30"
                  className="border-app-theme-yellow/20 focus:border-app-theme-yellow"
                />
              </div>

              <Button 
                onClick={runCustomSimulation} 
                disabled={isLoading}
                className="w-full bg-app-theme-yellow hover:bg-app-theme-orange text-app-neutral-900"
              >
                {isLoading ? 'Running Simulation...' : 'Run Custom Simulation'}
              </Button>

              {error && (
                <div className="text-destructive-DEFAULT text-sm mt-2">{error}</div>
              )}

              {simulationResults && (
                <div className="mt-6">
                  <h4 className="text-app-neutral-900 font-semibold mb-4">Simulation Results</h4>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer>
                      <RechartsLineChart data={simulationResults.dates.map((date, i) => ({
                        date,
                        base: simulationResults.base_predictions[i],
                        scenario: simulationResults.scenario_predictions[i]
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                        <XAxis dataKey="date" stroke="#171717" />
                        <YAxis stroke="#171717" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="base" 
                          stroke="#F3C623" 
                          name="Base Prediction" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="scenario" 
                          stroke="#FA812F" 
                          name="Scenario Prediction" 
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 p-4 bg-white rounded-lg border border-app-theme-yellow/20">
        <div className="text-sm text-app-neutral-700 mb-2">Scenario Analysis Notes</div>
        <div className="text-xs text-app-neutral-600">
          Predictions are based on historical data, current market conditions, and scenario parameters.
          The model takes into account various economic factors and their correlations with gold prices.
          These are estimates and actual outcomes may vary significantly.
        </div>
      </div>
    </div>
  );
};
