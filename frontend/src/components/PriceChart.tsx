
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

interface PriceChartProps {
  priceHistory: Array<{
    time: string;
    price: number;
    timestamp: number;
  }>;
  currentPrice: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({ priceHistory, currentPrice }) => {
  // Generate some mock historical data if priceHistory is empty
  const mockData = Array.from({ length: 20 }, (_, i) => ({
    time: new Date(Date.now() - (20 - i) * 60000).toLocaleTimeString(),
    price: 2080 + Math.sin(i * 0.5) * 10 + Math.random() * 5,
    timestamp: Date.now() - (20 - i) * 60000
  }));

  const data = priceHistory.length > 0 ? priceHistory : mockData;

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Price Chart</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded" />
            <span className="text-sm text-slate-400">Gold Price</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => value.split(':').slice(0, 2).join(':')}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#fbbf24"
              strokeWidth={2}
              fill="url(#goldGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
