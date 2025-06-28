import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, TrendingUp, Calendar, DollarSign, AlertCircle, Settings, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { goldPredictionAPI, type PredictionResponse, type ModelInfo } from '@/services/goldPredictionApi';

// Custom chart theme
const chartTheme = {
  gold: '#F3C623',
  goldLight: '#FFB22C',
  background: '#FEF3E2',
  text: '#171717',
  grid: '#E5E5E5',
};

const GoldPricePrediction: React.FC = () => {
  const [nextDayPrediction, setNextDayPrediction] = useState<number | null>(null);
  const [weekPredictions, setWeekPredictions] = useState<PredictionResponse | null>(null);
  const [customPredictions, setCustomPredictions] = useState<PredictionResponse | null>(null);
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [loading, setLoading] = useState<{[key: string]: boolean}>({});
  const [error, setError] = useState<string | null>(null);
  const [customDays, setCustomDays] = useState<number>(14);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    checkConnection();
    fetchModelInfo();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    try {
      const isConnected = await goldPredictionAPI.testConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
    } catch {
      setConnectionStatus('disconnected');
    }
  };

  const fetchModelInfo = async () => {
    try {
      const data = await goldPredictionAPI.getModelInfo();
      setModelInfo(data);
    } catch (err) {
      setError('Failed to fetch model information');
    }
  };

  const fetchNextDayPrediction = async () => {
    setLoading(prev => ({ ...prev, nextDay: true }));
    setError(null);
    
    try {
      const data = await goldPredictionAPI.getNextDayPrediction();
      setNextDayPrediction(data.prediction || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
    } finally {
      setLoading(prev => ({ ...prev, nextDay: false }));
    }
  };

  const fetchWeekPredictions = async () => {
    setLoading(prev => ({ ...prev, week: true }));
    setError(null);
    
    try {
      const data = await goldPredictionAPI.getWeekPredictions();
      setWeekPredictions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get predictions');
    } finally {
      setLoading(prev => ({ ...prev, week: false }));
    }
  };

  const fetchCustomPredictions = async () => {
    setLoading(prev => ({ ...prev, custom: true }));
    setError(null);
    
    try {
      const data = await goldPredictionAPI.getCustomPredictions(customDays);
      setCustomPredictions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get predictions');
    } finally {
      setLoading(prev => ({ ...prev, custom: false }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-app-theme-cream border border-app-theme-yellow p-3 rounded-lg shadow-lg">
          <p className="text-app-neutral-600">{data.formattedDate}</p>
          <p className="text-app-theme-orange-dark font-semibold">
            {formatPrice(data.price)}
          </p>
        </div>
      );
    }
    return null;
  };

  const getChartData = (predictions: PredictionResponse | null) => {
    if (!predictions?.predictions || !predictions.dates) return [];
    
    const basePrice = predictions.predictions[0];
    return predictions.predictions.map((price, index) => ({
      date: predictions.dates?.[index] || '',
      price: price,
      formattedDate: formatDate(predictions.dates?.[index] || ''),
      change: ((price - basePrice) / basePrice) * 100
    }));
  };

  const weekChartData = getChartData(weekPredictions);
  const customChartData = getChartData(customPredictions);

  return (
    <div className="space-y-6 p-6 bg-app-theme-cream min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-app-neutral-900 mb-2">
          Gold Price Prediction
        </h1>
        <p className="text-app-neutral-600">
          AI-powered LSTM model for gold price forecasting
        </p>
      </div>

      {/* Connection Status */}
      <Card className="bg-white border-app-theme-yellow/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-app-neutral-600">Backend Connection:</span>
              <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'} className={connectionStatus === 'connected' ? "bg-app-theme-yellow text-app-neutral-900" : ""}>
                {connectionStatus === 'checking' && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                {connectionStatus === 'connected' && '✓ Connected'}
                {connectionStatus === 'disconnected' && '✗ Disconnected'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={checkConnection} className="border-app-theme-yellow text-app-neutral-600 hover:bg-app-theme-cream">
              <Settings className="h-4 w-4 mr-1" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Model Status */}
      {modelInfo && (
        <Card className="bg-white border-app-theme-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-app-neutral-900">
              <TrendingUp className="h-5 w-5 text-app-theme-orange" />
              Model Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-app-neutral-600">Model Type</p>
                <Badge variant="secondary" className="bg-app-theme-cream text-app-theme-orange-dark">{modelInfo.model_type}</Badge>
              </div>
              <div>
                <p className="text-sm text-app-neutral-600">Accuracy</p>
                <Badge variant="default" className="bg-green-100 text-green-700">{modelInfo.accuracy}</Badge>
              </div>
              <div>
                <p className="text-sm text-app-neutral-600">Window Size</p>
                <span className="font-semibold text-app-neutral-900">{modelInfo.window_size} days</span>
              </div>
              <div>
                <p className="text-sm text-app-neutral-600">Status</p>
                <Badge variant={modelInfo.model_loaded ? "default" : "destructive"} className={modelInfo.model_loaded ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  {modelInfo.model_loaded ? "Ready" : "Not Loaded"}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-app-neutral-600 mt-4">{modelInfo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Predictions Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Day Prediction */}
        <Card className="bg-white border-app-theme-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-app-neutral-900">
              <Calendar className="h-5 w-5 text-app-theme-orange" />
              Next Day Prediction
            </CardTitle>
            <CardDescription className="text-app-neutral-600">
              Predicted gold price for tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6">
              {loading.nextDay ? (
                <Loader2 className="h-8 w-8 animate-spin text-app-theme-orange" />
              ) : nextDayPrediction ? (
                <>
                  <div className="text-4xl font-bold text-app-theme-orange-dark mb-2">
                    {formatPrice(nextDayPrediction)}
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>+2.3%</span>
                  </div>
                </>
              ) : (
                <Button onClick={fetchNextDayPrediction} className="bg-app-theme-yellow hover:bg-app-theme-orange text-app-neutral-900">
                  Get Prediction
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Week Predictions */}
        <Card className="bg-white border-app-theme-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-app-neutral-900">
              <TrendingUp className="h-5 w-5 text-app-theme-orange" />
              Week Forecast
            </CardTitle>
            <CardDescription className="text-app-neutral-600">
              7-day price prediction trend
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.week ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-app-theme-orange" />
              </div>
            ) : weekPredictions ? (
              <>
                <div className="h-[300px] w-full mb-4">
                  <ResponsiveContainer>
                    <LineChart data={weekChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                      <XAxis 
                        dataKey="formattedDate" 
                        stroke={chartTheme.text}
                        tick={{ fill: chartTheme.text }}
                      />
                      <YAxis 
                        stroke={chartTheme.text}
                        tick={{ fill: chartTheme.text }}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={chartTheme.gold}
                        strokeWidth={2}
                        dot={{ fill: chartTheme.gold, r: 4 }}
                        activeDot={{ r: 6, fill: chartTheme.goldLight }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <Button 
                  onClick={fetchWeekPredictions} 
                  className="w-full bg-app-theme-yellow hover:bg-app-theme-orange text-app-neutral-900"
                >
                  Refresh Forecast
                </Button>
              </>
            ) : (
              <Button onClick={fetchWeekPredictions} className="w-full bg-app-theme-yellow hover:bg-app-theme-orange text-app-neutral-900">
                Get Week Forecast
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Custom Range Predictions */}
        <Card className="bg-white border-app-theme-yellow/20 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-app-neutral-900">
              <Settings className="h-5 w-5 text-app-theme-orange" />
              Custom Range Forecast
            </CardTitle>
            <CardDescription className="text-app-neutral-600">
              Predict gold prices for a custom number of days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="days" className="text-app-neutral-600">Number of Days</Label>
                <Input
                  id="days"
                  type="number"
                  value={customDays}
                  onChange={(e) => setCustomDays(parseInt(e.target.value))}
                  min={1}
                  max={30}
                  className="bg-app-theme-cream border-app-theme-yellow/20 text-app-neutral-900 focus:ring-app-theme-yellow"
                />
              </div>
              <Button 
                onClick={fetchCustomPredictions}
                disabled={loading.custom}
                className="self-end bg-app-theme-yellow hover:bg-app-theme-orange text-app-neutral-900"
              >
                {loading.custom ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Predicting...
                  </>
                ) : (
                  'Get Forecast'
                )}
              </Button>
            </div>
            
            {customPredictions && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-app-theme-cream rounded-lg p-4">
                    <p className="text-sm text-app-neutral-600 mb-1">Highest Price</p>
                    <p className="text-lg font-bold text-app-theme-orange-dark">
                      {formatPrice(Math.max(...customPredictions.predictions))}
                    </p>
                  </div>
                  <div className="bg-app-theme-cream rounded-lg p-4">
                    <p className="text-sm text-app-neutral-600 mb-1">Lowest Price</p>
                    <p className="text-lg font-bold text-app-theme-orange-dark">
                      {formatPrice(Math.min(...customPredictions.predictions))}
                    </p>
                  </div>
                  <div className="bg-app-theme-cream rounded-lg p-4">
                    <p className="text-sm text-app-neutral-600 mb-1">Average Price</p>
                    <p className="text-lg font-bold text-app-theme-orange-dark">
                      {formatPrice(customPredictions.predictions.reduce((a, b) => a + b, 0) / customPredictions.predictions.length)}
                    </p>
                  </div>
                  <div className="bg-app-theme-cream rounded-lg p-4">
                    <p className="text-sm text-app-neutral-600 mb-1">Price Change</p>
                    <p className={`text-lg font-bold ${
                      customPredictions.predictions[customPredictions.predictions.length - 1] > customPredictions.predictions[0]
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {((customPredictions.predictions[customPredictions.predictions.length - 1] - customPredictions.predictions[0]) / customPredictions.predictions[0] * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="h-[400px] w-full mb-4">
                  <ResponsiveContainer>
                    <LineChart data={customChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                      <XAxis 
                        dataKey="formattedDate" 
                        stroke={chartTheme.text}
                        tick={{ fill: chartTheme.text }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        stroke={chartTheme.text}
                        tick={{ fill: chartTheme.text }}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={chartTheme.gold}
                        strokeWidth={2}
                        dot={{ fill: chartTheme.gold, r: 4 }}
                        activeDot={{ r: 6, fill: chartTheme.goldLight }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <Button 
                  onClick={fetchCustomPredictions} 
                  className="w-full bg-app-theme-yellow hover:bg-app-theme-orange text-app-neutral-900"
                >
                  Refresh Forecast
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoldPricePrediction;
