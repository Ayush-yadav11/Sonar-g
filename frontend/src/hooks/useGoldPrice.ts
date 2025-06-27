import { useState, useEffect, useCallback } from 'react';
import { getCurrentGoldPrice, subscribeToGoldPriceUpdates, GoldPriceData } from '@/services/metalsApi';

interface UseGoldPriceReturn {
  currentPrice: number;
  isLive: boolean;
  isLoading: boolean;
  lastUpdate: Date | null;
  priceHistory: Array<{
    time: string;
    price: number;
    timestamp: number;
  }>;
  toggleLive: () => void;
  refreshPrice: () => Promise<void>;
}

export const useGoldPrice = (initialPrice: number = 2085.50): UseGoldPriceReturn => {
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [priceHistory, setPriceHistory] = useState<Array<{
    time: string;
    price: number;
    timestamp: number;
  }>>([]);

  // Manual refresh function
  const refreshPrice = useCallback(async () => {
    setIsLoading(true);
    try {
      const priceData = await getCurrentGoldPrice();
      setCurrentPrice(priceData.current);
      setLastUpdate(new Date(priceData.timestamp));
      
      // Add to price history
      setPriceHistory(prev => {
        const newHistory = [...prev, {
          time: new Date(priceData.timestamp).toLocaleTimeString(),
          price: priceData.current,
          timestamp: priceData.timestamp
        }];
        return newHistory.slice(-50); // Keep last 50 points
      });
    } catch (error) {
      console.error('Failed to refresh gold price:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Toggle live updates
  const toggleLive = useCallback(() => {
    setIsLive(prev => !prev);
  }, []);

  // Set up live price updates
  useEffect(() => {
    if (!isLive) return;

    // Initial fetch
    refreshPrice();

    // Subscribe to updates (every 60 seconds to respect Alpha Vantage free tier limits)
    const unsubscribe = subscribeToGoldPriceUpdates((priceData: GoldPriceData) => {
      setCurrentPrice(priceData.current);
      setLastUpdate(new Date(priceData.timestamp));
      
      // Add to price history
      setPriceHistory(prev => {
        const newHistory = [...prev, {
          time: new Date(priceData.timestamp).toLocaleTimeString(),
          price: priceData.current,
          timestamp: priceData.timestamp
        }];
        return newHistory.slice(-50); // Keep last 50 points
      });
    }, 60000); // 60 seconds

    return unsubscribe;
  }, [isLive, refreshPrice]);

  return {
    currentPrice,
    isLive,
    isLoading,
    lastUpdate,
    priceHistory,
    toggleLive,
    refreshPrice
  };
};
