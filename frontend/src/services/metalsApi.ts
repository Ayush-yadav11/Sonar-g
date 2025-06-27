// Alpha Vantage API configuration (FREE 500 requests/day)
// NOTE: Alpha Vantage FREE tier does not support XAU (gold) currency exchange rates
// This service now uses intelligent mock data with realistic price movements
const BASE_URL = 'https://www.alphavantage.co/query';
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo'; // Get free API key from alphavantage.co

// Simple caching to avoid excessive API calls
let priceCache: { data: GoldPriceData; timestamp: number } | null = null;
const CACHE_DURATION = 60000; // 1 minute cache

// Gold price simulation - provides realistic market movements
const GOLD_BASE_PRICE = 2085.50; // Base price in USD per troy ounce
let lastPrice = GOLD_BASE_PRICE;

export interface AlphaVantageResponse {
  'Realtime Currency Exchange Rate'?: {
    '1. From_Currency Code': string;
    '2. From_Currency Name': string;
    '3. To_Currency Code': string;
    '4. To_Currency Name': string;
    '5. Exchange Rate': string;
    '6. Last Refreshed': string;
    '7. Time Zone': string;
    '8. Bid Price': string;
    '9. Ask Price': string;
  };
  'Error Message'?: string;
  'Note'?: string;
  'Information'?: string;
}

export interface AlphaVantageTimeSeriesResponse {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Time Zone': string;
  };
  'Time Series (Daily)': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
}

export interface HistoricalRate {
  date: string;
  rates: {
    XAU: number;
  };
}

export interface GoldPriceData {
  current: number;
  timestamp: number;
  currency: string;
}

export interface HistoricalData {
  period: string;
  high: number;
  low: number;
  close: number;
  open: number;
  volume: string;
}

// Generate realistic gold price data
const generateRealisticGoldPrice = (): GoldPriceData => {
  // Market hours simulation (9:30 AM - 4:00 PM ET)
  const now = new Date();
  const hour = now.getHours();
  const isMarketHours = hour >= 9 && hour <= 16;
  
  // Higher volatility during market hours
  const volatility = isMarketHours ? 0.003 : 0.001; // 0.3% vs 0.1%
  
  // Generate realistic price movement (mean reversion with trend)
  const maxChange = lastPrice * volatility;
  const randomWalk = (Math.random() - 0.5) * maxChange;
  const meanReversion = (GOLD_BASE_PRICE - lastPrice) * 0.01; // 1% mean reversion
  
  const priceChange = randomWalk + meanReversion;
  lastPrice = Math.max(1800, Math.min(2300, lastPrice + priceChange)); // Reasonable bounds
  
  return {
    current: Number(lastPrice.toFixed(2)),
    timestamp: Date.now(),
    currency: 'USD'
  };
};

// Get current gold price - uses realistic simulation due to Alpha Vantage XAU limitation
export const getCurrentGoldPrice = async (): Promise<GoldPriceData> => {
  try {
    // Check cache first to avoid excessive calls
    if (priceCache && (Date.now() - priceCache.timestamp) < CACHE_DURATION) {
      console.log('Using cached gold price data');
      return priceCache.data;
    }

    console.log('Generating realistic gold price data (Alpha Vantage does not support XAU/USD for free tier)');
    
    // Alpha Vantage free tier doesn't support XAU currency
    // We'll use their API for other data if available, but generate gold prices
    const goldData = generateRealisticGoldPrice();
    
    // Try to verify API key is working with a test call (optional)
    if (API_KEY && API_KEY !== 'demo' && API_KEY !== 'YOUR_API_KEY_HERE') {
      try {
        // Test API connectivity with a simple query (just to verify the key works)
        const testUrl = new URL(BASE_URL);
        testUrl.searchParams.append('function', 'TIME_SERIES_INTRADAY');
        testUrl.searchParams.append('symbol', 'SPY'); // S&P 500 ETF as test
        testUrl.searchParams.append('interval', '5min');
        testUrl.searchParams.append('outputsize', 'compact');
        testUrl.searchParams.append('apikey', API_KEY);

        const testResponse = await fetch(testUrl.toString());
        if (testResponse.ok) {
          const testData = await testResponse.json();
          if (!testData['Error Message']) {
            console.log('✅ Alpha Vantage API key is working (verified with SPY test query)');
          }
        }
      } catch (error) {
        console.log('Alpha Vantage API test failed, but continuing with gold price simulation');
      }
    }

    console.log(`Generated realistic gold price: $${goldData.current}`);

    // Cache the result
    priceCache = { data: goldData, timestamp: Date.now() };
    
    return goldData;
  } catch (error) {
    console.error('Error in gold price service:', error);
    
    // If we have cached data, use it even if expired
    if (priceCache) {
      console.log('Using expired cache data due to error');
      return priceCache.data;
    }
    
    // Final fallback
    const fallbackData = generateRealisticGoldPrice();
    console.log(`Using fallback gold price: $${fallbackData.current}`);
    
    // Cache fallback data
    priceCache = { data: fallbackData, timestamp: Date.now() };
    
    return fallbackData;
  }
};

// Get historical gold prices using Alpha Vantage
export const getHistoricalGoldData = async (): Promise<HistoricalData[]> => {
  try {
    // Get current price first
    const currentPriceData = await getCurrentGoldPrice();
    const currentPrice = currentPriceData.current;

    // Create realistic historical data based on current price
    const periods = [
      { period: '1D', days: 1, volatility: 0.005 }, // 0.5% daily volatility
      { period: '1W', days: 7, volatility: 0.015 }, // 1.5% weekly volatility
      { period: '1M', days: 30, volatility: 0.03 }, // 3% monthly volatility
      { period: '3M', days: 90, volatility: 0.05 }  // 5% quarterly volatility
    ];

    const historicalData: HistoricalData[] = [];

    for (const { period, days, volatility } of periods) {
      try {
        // Create realistic OHLC data based on current price and volatility
        const maxChange = currentPrice * volatility;
        const priceVariation = (Math.random() - 0.5) * maxChange;
        
        const close = currentPrice + priceVariation;
        const open = close + (Math.random() - 0.5) * maxChange * 0.5;
        const high = Math.max(open, close) + Math.random() * maxChange * 0.3;
        const low = Math.min(open, close) - Math.random() * maxChange * 0.3;

        // Simulate volume based on period
        const baseVolume = 1200000; // 1.2M oz base
        const volumeMultiplier = Math.sqrt(days); // Scale by period
        const volume = `${(baseVolume * volumeMultiplier / 1000000).toFixed(1)}M oz`;

        historicalData.push({
          period,
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
          open: Number(open.toFixed(2)),
          volume
        });

      } catch (error) {
        console.error(`Error creating ${period} data:`, error);
        // Add fallback data for this period
        const fallbackPrices = {
          '1D': { high: 2091.50, low: 2078.20, close: 2085.50, open: 2083.00 },
          '1W': { high: 2110.80, low: 2065.40, close: 2085.50, open: 2089.20 },
          '1M': { high: 2145.60, low: 2020.30, close: 2085.50, open: 2095.80 },
          '3M': { high: 2180.90, low: 1985.70, close: 2085.50, open: 2105.30 }
        };
        
        const fallback = fallbackPrices[period as keyof typeof fallbackPrices];
        historicalData.push({
          period,
          ...fallback,
          volume: '1.2M oz'
        });
      }
    }

    return historicalData;

  } catch (error) {
    console.error('Error fetching historical gold data:', error);
    // Return mock data as complete fallback
    return [
      { period: '1D', high: 2091.50, low: 2078.20, close: 2085.50, open: 2083.00, volume: '1.2M oz' },
      { period: '1W', high: 2110.80, low: 2065.40, close: 2085.50, open: 2089.20, volume: '8.7M oz' },
      { period: '1M', high: 2145.60, low: 2020.30, close: 2085.50, open: 2095.80, volume: '42.1M oz' },
      { period: '3M', high: 2180.90, low: 1985.70, close: 2085.50, open: 2105.30, volume: '128.4M oz' },
    ];
  }
};

// Get real-time price updates with realistic simulation
export const subscribeToGoldPriceUpdates = (
  callback: (price: GoldPriceData) => void,
  intervalMs: number = 30000 // 30 seconds for realistic updates
): () => void => {
  let attempts = 0;
  const maxAttempts = 3;

  const interval = setInterval(async () => {
    try {
      const priceData = await getCurrentGoldPrice();
      callback(priceData);
      attempts = 0; // Reset attempts on success
    } catch (error) {
      attempts++;
      console.error(`Error in gold price update subscription (attempt ${attempts}):`, error);
      
      // If we've failed multiple times, continue with increased interval
      if (attempts >= maxAttempts) {
        console.warn('Multiple failures, but continuing with realistic price simulation');
        attempts = 0; // Reset for next cycle
      }
    }
  }, intervalMs);

  // Return cleanup function
  return () => clearInterval(interval);
};
