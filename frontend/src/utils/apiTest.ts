import { getCurrentGoldPrice } from '../services/metalsApi';


export const testAlphaVantageAPI = async () => {
  console.log('=== Testing Alpha Vantage API ===');
  
  try {
    const result = await getCurrentGoldPrice();
    console.log('✅ API Test Successful:', result);
    return result;
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    throw error;
  }
};

