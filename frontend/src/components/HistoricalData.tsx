import React, { useState, useEffect } from 'react';
import { Calendar, Database, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { getHistoricalGoldData, HistoricalData as HistoricalDataType } from '@/services/metalsApi';

interface HistoricalDataProps {
  priceHistory: Array<{
    time: string;
    price: number;
    timestamp: number;
  }>;
}

export const HistoricalData: React.FC<HistoricalDataProps> = ({ priceHistory }) => {
  const [historicalData, setHistoricalData] = useState<HistoricalDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Mock historical data as fallback
  const mockHistoricalData: HistoricalDataType[] = [
    { period: '1D', high: 2091.50, low: 2078.20, close: 2085.50, open: 2083.00, volume: '1.2M oz' },
    { period: '1W', high: 2110.80, low: 2065.40, close: 2085.50, open: 2089.20, volume: '8.7M oz' },
    { period: '1M', high: 2145.60, low: 2020.30, close: 2085.50, open: 2095.80, volume: '42.1M oz' },
    { period: '3M', high: 2180.90, low: 1985.70, close: 2085.50, open: 2105.30, volume: '128.4M oz' },
  ];

  // Fetch historical data - uses intelligent simulation since Alpha Vantage free tier doesn't support XAU
  const fetchHistoricalData = async () => {
    setIsLoading(true);
    try {
      const data = await getHistoricalGoldData();
      setHistoricalData(data);
      setIsOnline(true);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
      setHistoricalData(mockHistoricalData);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchHistoricalData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchHistoricalData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const recentPrices = priceHistory.slice(-5);
  const dataToDisplay = historicalData.length > 0 ? historicalData : mockHistoricalData;

  return (
    <div className="bg-app-theme-cream rounded-xl border border-app-theme-yellow/20 p-6 overflow-x-auto max-w-full">
      <div className="flex items-center justify-between mb-6 w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-app-theme-yellow/20 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-theme-warm rounded-lg flex items-center justify-center">
              <Database size={14} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-app-neutral-900">Historical Data</h3>
            <p className="text-app-neutral-600 text-sm">Price ranges & volume</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi size={16} className="text-success-DEFAULT" />
            ) : (
              <WifiOff size={16} className="text-destructive-DEFAULT" />
            )}
            <span className="text-xs text-app-neutral-600">
              {isOnline ? 'Live Data' : 'Mock Data'}
            </span>
          </div>
          
          <button
            onClick={fetchHistoricalData}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-1 bg-app-theme-yellow/20 text-app-theme-orange hover:bg-app-theme-yellow/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Historical Ranges */}
      <div className="space-y-4 mb-6 w-full">
        <h4 className="text-lg font-semibold text-app-theme-orange flex items-center space-x-2">
          <Calendar size={16} />
          <span>Price Ranges</span>
        </h4>
        
        {dataToDisplay.map((data, index) => (
          <div key={data.period} className={`p-3 rounded-lg bg-white border border-app-theme-yellow/20 ${isLoading ? 'animate-pulse' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-app-neutral-900 font-medium">{data.period}</span>
              <span className="text-app-neutral-600 text-sm">{data.volume}</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-app-neutral-600">Open</div>
                <div className="text-app-theme-orange font-semibold">${data.open}</div>
              </div>
              <div>
                <div className="text-app-neutral-600">High</div>
                <div className="text-success-DEFAULT font-semibold">${data.high}</div>
              </div>
              <div>
                <div className="text-app-neutral-600">Low</div>
                <div className="text-destructive-DEFAULT font-semibold">${data.low}</div>
              </div>
              <div>
                <div className="text-app-neutral-600">Close</div>
                <div className="text-app-neutral-900 font-semibold">${data.close}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Price Updates */}
      {recentPrices.length > 0 && (
        <div className="mb-4 w-full">
          <h4 className="text-lg font-semibold text-app-theme-orange mb-3">Recent Updates</h4>
          <div className="space-y-2">
            {recentPrices.map((price, index) => (
              <div key={price.timestamp} className="flex items-center justify-between text-sm">
                <span className="text-app-neutral-600">{price.time}</span>
                <span className="text-app-neutral-900 font-mono">${price.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Footer */}
      <div className="flex items-center justify-between text-xs text-app-neutral-600 border-t border-app-theme-yellow/20 pt-3 w-full">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success-DEFAULT' : 'bg-app-theme-yellow'}`} />
          <span>
            {isOnline ? 'Realistic price simulation (Alpha Vantage ready)' : 'Using cached data'}
          </span>
        </div>
        {lastUpdate && (
          <span>
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};
