
import React, { useState, useEffect } from 'react';
import { Activity, Zap, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface HighFrequencyDataProps {
  currentPrice: number;
}

interface TickData {
  time: string;
  price: number;
  volume: number;
  bid: number;
  ask: number;
  spread: number;
  timestamp: number;
}

export const HighFrequencyData: React.FC<HighFrequencyDataProps> = ({ currentPrice }) => {
  const [tickData, setTickData] = useState<TickData[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [updateFrequency, setUpdateFrequency] = useState(1000); // milliseconds

  // Generate high-frequency tick data
  useEffect(() => {
    if (!isLive) return;

    const generateTick = () => {
      const now = new Date();
      const spread = 0.5 + Math.random() * 1.5; // $0.5-2.0 spread
      const bid = currentPrice - (spread / 2);
      const ask = currentPrice + (spread / 2);
      const volume = Math.floor(Math.random() * 1000) + 100;
      
      const newTick: TickData = {
        time: now.toLocaleTimeString([], { hour12: false, second: '2-digit' }),
        price: Number((currentPrice + (Math.random() - 0.5) * 2).toFixed(2)),
        volume,
        bid: Number(bid.toFixed(2)),
        ask: Number(ask.toFixed(2)),
        spread: Number(spread.toFixed(2)),
        timestamp: now.getTime()
      };

      setTickData(prev => {
        const updated = [...prev, newTick].slice(-100); // Keep last 100 ticks
        return updated;
      });
    };

    const interval = setInterval(generateTick, updateFrequency);
    return () => clearInterval(interval);
  }, [currentPrice, isLive, updateFrequency]);

  const averageSpread = tickData.length > 0 
    ? tickData.slice(-20).reduce((acc, tick) => acc + tick.spread, 0) / Math.min(20, tickData.length)
    : 0;

  const averageVolume = tickData.length > 0
    ? tickData.slice(-20).reduce((acc, tick) => acc + tick.volume, 0) / Math.min(20, tickData.length)
    : 0;

  const priceChange = tickData.length > 1 
    ? tickData[tickData.length - 1].price - tickData[tickData.length - 2].price
    : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3">
          <p className="text-yellow-400 font-medium">{label}</p>
          <p className="text-white">
            Price: <span className="font-bold">${payload[0].value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">High-Frequency Data</h3>
            <p className="text-slate-400 text-sm">Real-time tick data & order book</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm text-slate-400">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Frequency Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Update Frequency
        </label>
        <select
          value={updateFrequency}
          onChange={(e) => setUpdateFrequency(parseInt(e.target.value))}
          className="bg-slate-600 text-white rounded-lg px-3 py-2 text-sm"
        >
          <option value={100}>100ms (Ultra High)</option>
          <option value={500}>500ms (High)</option>
          <option value={1000}>1s (Medium)</option>
          <option value={5000}>5s (Low)</option>
        </select>
      </div>

      {/* Market Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity size={14} className="text-emerald-400" />
            <span className="text-xs text-slate-400">Last Price</span>
          </div>
          <div className="text-lg font-bold text-white">
            ${tickData.length > 0 ? tickData[tickData.length - 1].price.toFixed(2) : currentPrice.toFixed(2)}
          </div>
          <div className={`text-xs ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock size={14} className="text-blue-400" />
            <span className="text-xs text-slate-400">Avg Spread</span>
          </div>
          <div className="text-lg font-bold text-white">${averageSpread.toFixed(2)}</div>
          <div className="text-xs text-slate-400">Last 20 ticks</div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Activity size={14} className="text-purple-400" />
            <span className="text-xs text-slate-400">Avg Volume</span>
          </div>
          <div className="text-lg font-bold text-white">{Math.round(averageVolume)}</div>
          <div className="text-xs text-slate-400">oz/tick</div>
        </div>

        <div className="bg-slate-700/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-xs text-slate-400">Ticks</span>
          </div>
          <div className="text-lg font-bold text-white">{tickData.length}</div>
          <div className="text-xs text-slate-400">Total captured</div>
        </div>
      </div>

      {/* Tick Chart */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Tick Chart (Last 50)</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tickData.slice(-50)}>
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => value.split(':').slice(1).join(':')}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                domain={['dataMin - 1', 'dataMax + 1']}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Book Simulation */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Order Book (Latest)</h4>
        {tickData.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-green-400 font-medium mb-2">Bids</div>
              <div className="space-y-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const lastTick = tickData[tickData.length - 1];
                  const price = lastTick.bid - (i * 0.25);
                  const size = Math.floor(Math.random() * 500) + 100;
                  return (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-green-400">${price.toFixed(2)}</span>
                      <span className="text-slate-400">{size}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-sm text-red-400 font-medium mb-2">Asks</div>
              <div className="space-y-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const lastTick = tickData[tickData.length - 1];
                  const price = lastTick.ask + (i * 0.25);
                  const size = Math.floor(Math.random() * 500) + 100;
                  return (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-red-400">${price.toFixed(2)}</span>
                      <span className="text-slate-400">{size}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
