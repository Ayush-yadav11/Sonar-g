// Test Alpha Vantage API directly
const API_KEY = '9H0B8RNADHV7XPXZ';
const BASE_URL = 'https://www.alphavantage.co/query';

export const testAlphaVantageDirectly = async () => {
  try {
    console.log('Testing Alpha Vantage API directly...');
    
    // Test the currency exchange rate endpoint for XAU/USD
    const url = new URL(BASE_URL);
    url.searchParams.append('function', 'CURRENCY_EXCHANGE_RATE');
    url.searchParams.append('from_currency', 'XAU');
    url.searchParams.append('to_currency', 'USD');
    url.searchParams.append('apikey', API_KEY);
    
    console.log('Making request to:', url.toString());
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    console.log('Raw response:', data);
    
    if (data['Error Message']) {
      console.error('API Error:', data['Error Message']);
      return null;
    }
    
    if (data['Note']) {
      console.warn('Rate limit:', data['Note']);
      return null;
    }
    
    if (data['Information']) {
      console.warn('API Info:', data['Information']);
      return null;
    }
    
    if (data['Realtime Currency Exchange Rate']) {
      const rate = data['Realtime Currency Exchange Rate'];
      console.log('✅ Success! Gold price:', rate['5. Exchange Rate']);
      console.log('Last refreshed:', rate['6. Last Refreshed']);
      return {
        price: parseFloat(rate['5. Exchange Rate']),
        lastRefreshed: rate['6. Last Refreshed']
      };
    } else {
      console.error('❌ Unexpected response structure:', data);
      return null;
    }
    
  } catch (error) {
    console.error('❌ Request failed:', error);
    return null;
  }
};

// Function to test from browser console
(window as any).testAlphaVantage = testAlphaVantageDirectly;
