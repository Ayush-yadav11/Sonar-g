import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, TrendingUp, Calendar, DollarSign, AlertCircle, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { goldPredictionAPI, type PredictionResponse, type ModelInfo } from '@/services/goldPredictionApi';

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

  const getChartData = (predictions: PredictionResponse | null) => {
    return predictions?.predictions?.map((price, index) => ({
      date: predictions.dates?.[index] || '',
      price: price,
      formattedDate: formatDate(predictions.dates?.[index] || '')
    })) || [];
  };

  const weekChartData = getChartData(weekPredictions);
  const customChartData = getChartData(customPredictions);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gold Price Prediction
        </h1>
        <p className="text-gray-600">
          AI-powered LSTM model for gold price forecasting
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Backend Connection:</span>
              <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
                {connectionStatus === 'checking' && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                {connectionStatus === 'connected' && '✓ Connected'}
                {connectionStatus === 'disconnected' && '✗ Disconnected'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={checkConnection}>
              <Settings className="h-4 w-4 mr-1" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Model Status */}
      {modelInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Model Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Model Type</p>
                <Badge variant="secondary">{modelInfo.model_type}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Accuracy</p>
                <Badge variant="default">{modelInfo.accuracy}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Window Size</p>
                <span className="font-semibold">{modelInfo.window_size} days</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={modelInfo.model_loaded ? "default" : "destructive"}>
                  {modelInfo.model_loaded ? "Ready" : "Not Loaded"}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">{modelInfo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Day Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Next Day Prediction
          </CardTitle>
          <CardDescription>
            Predict tomorrow's gold price using LSTM model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={fetchNextDayPrediction}
              disabled={loading.nextDay || connectionStatus !== 'connected'}
              className="w-full md:w-auto"
            >
              {loading.nextDay ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Get Next Day Prediction
                </>
              )}
            </Button>
            
            {nextDayPrediction && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">
                  Tomorrow's Predicted Price
                </h3>
                <p className="text-2xl font-bold text-green-900">
                  {formatPrice(nextDayPrediction)}
                </p>
                <p className="text-sm text-green-700">per ounce</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            7-Day Forecast
          </CardTitle>
          <CardDescription>
            Gold price predictions for the next week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={fetchWeekPredictions}
              disabled={loading.week || connectionStatus !== 'connected'}
              className="w-full md:w-auto"
            >
              {loading.week ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Forecast...
                </>
              ) : (
                'Get 7-Day Forecast'
              )}
            </Button>
            
            {weekPredictions && (
              <div className="space-y-4">
                {/* Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weekChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="formattedDate" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        domain={['dataMin - 10', 'dataMax + 10']}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatPrice(value), 'Price']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Predictions Table */}
                <div className="grid gap-2">
                  <h4 className="font-semibold mb-2">Daily Predictions</h4>
                  {weekPredictions.predictions?.map((price, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">
                        {formatDate(weekPredictions.dates?.[index] || '')}
                      </span>
                      <span className="font-bold text-orange-600">
                        {formatPrice(price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Custom Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Custom Forecast
          </CardTitle>
          <CardDescription>
            Predict gold prices for a custom number of days (1-30)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1 max-w-32">
                <Label htmlFor="customDays">Days to predict</Label>
                <Input
                  id="customDays"
                  type="number"
                  min={1}
                  max={30}
                  value={customDays}
                  onChange={(e) => setCustomDays(Number(e.target.value))}
                />
              </div>
              <Button 
                onClick={fetchCustomPredictions}
                disabled={loading.custom || connectionStatus !== 'connected' || customDays < 1 || customDays > 30}
              >
                {loading.custom ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  `Get ${customDays}-Day Forecast`
                )}
              </Button>
            </div>
            
            {customPredictions && (
              <div className="space-y-4">
                {/* Chart */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="formattedDate" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        domain={['dataMin - 10', 'dataMax + 10']}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatPrice(value), 'Price']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600">Highest</p>
                    <p className="font-bold text-blue-900">
                      {formatPrice(Math.max(...(customPredictions.predictions || [])))}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-600">Lowest</p>
                    <p className="font-bold text-red-900">
                      {formatPrice(Math.min(...(customPredictions.predictions || [])))}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600">Average</p>
                    <p className="font-bold text-green-900">
                      {formatPrice((customPredictions.predictions || []).reduce((a, b) => a + b, 0) / (customPredictions.predictions?.length || 1))}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600">Days</p>
                    <p className="font-bold text-purple-900">
                      {customPredictions.days_predicted || customDays}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>1. <strong>Connection Status:</strong> Ensure the backend is connected before making predictions</p>
            <p>2. <strong>Next Day Prediction:</strong> Get a single prediction for tomorrow's gold price</p>
            <p>3. <strong>7-Day Forecast:</strong> View predicted prices for the next week with interactive charts</p>
            <p>4. <strong>Custom Forecast:</strong> Choose any number of days (1-30) for predictions with detailed analytics</p>
            <p className="text-xs text-gray-500 mt-4">
              * Predictions are based on historical data and machine learning. Not financial advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoldPricePrediction;
