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
  gold: '#FFB800',
  goldLight: '#FFD700',
  background: '#1a1a1a',
  text: '#ffffff',
  grid: '#333333',
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
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
          <p className="text-slate-300">{data.formattedDate}</p>
          <p className="text-gold-500 font-semibold">
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
    <div className="space-y-6 p-6 bg-slate-900 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Gold Price Prediction
        </h1>
        <p className="text-slate-400">
          AI-powered LSTM model for gold price forecasting
        </p>
      </div>

      {/* Connection Status */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-300">Backend Connection:</span>
              <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'} className="bg-slate-700">
                {connectionStatus === 'checking' && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                {connectionStatus === 'connected' && '✓ Connected'}
                {connectionStatus === 'disconnected' && '✗ Disconnected'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={checkConnection} className="border-slate-600 text-slate-300">
              <Settings className="h-4 w-4 mr-1" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Model Status */}
      {modelInfo && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-gold-500" />
              Model Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-400">Model Type</p>
                <Badge variant="secondary" className="bg-slate-700 text-gold-500">{modelInfo.model_type}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-400">Accuracy</p>
                <Badge variant="default" className="bg-green-900/50 text-green-400">{modelInfo.accuracy}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-400">Window Size</p>
                <span className="font-semibold text-white">{modelInfo.window_size} days</span>
              </div>
              <div>
                <p className="text-sm text-slate-400">Status</p>
                <Badge variant={modelInfo.model_loaded ? "default" : "destructive"} className={modelInfo.model_loaded ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"}>
                  {modelInfo.model_loaded ? "Ready" : "Not Loaded"}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">{modelInfo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-900 bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Predictions Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Day Prediction */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calendar className="h-5 w-5 text-gold-500" />
              Next Day Prediction
            </CardTitle>
            <CardDescription className="text-slate-400">
              Predicted gold price for tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6">
              {loading.nextDay ? (
                <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
              ) : nextDayPrediction ? (
                <>
                  <div className="text-4xl font-bold text-gold-500 mb-2">
                    {formatPrice(nextDayPrediction)}
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>+2.3%</span>
                  </div>
                </>
              ) : (
                <Button onClick={fetchNextDayPrediction} className="bg-gold-500 hover:bg-gold-600 text-slate-900">
                  Get Prediction
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Week Predictions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-gold-500" />
              Week Forecast
            </CardTitle>
            <CardDescription className="text-slate-400">
              7-day price prediction trend
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.week ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
              </div>
            ) : weekPredictions ? (
              <div className="h-[300px] w-full">
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
            ) : (
              <Button onClick={fetchWeekPredictions} className="w-full bg-gold-500 hover:bg-gold-600 text-slate-900">
                Get Week Forecast
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Custom Range Predictions */}
        <Card className="bg-slate-800 border-slate-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="h-5 w-5 text-gold-500" />
              Custom Range Forecast
            </CardTitle>
            <CardDescription className="text-slate-400">
              Predict gold prices for a custom number of days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="days" className="text-slate-300">Number of Days</Label>
                <Input
                  id="days"
                  type="number"
                  value={customDays}
                  onChange={(e) => setCustomDays(parseInt(e.target.value))}
                  min={1}
                  max={30}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button 
                onClick={fetchCustomPredictions}
                disabled={loading.custom}
                className="self-end bg-gold-500 hover:bg-gold-600 text-slate-900"
              >
                {loading.custom ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Get Forecast'
                )}
              </Button>
            </div>
            
            {customPredictions && (
              <div className="h-[400px] w-full">
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoldPricePrediction;
