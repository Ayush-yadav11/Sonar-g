// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.50.219:5000/';

export interface PredictionResponse {
  success: boolean;
  prediction?: number;
  predictions?: number[];
  dates?: string[];
  currency: string;
  unit: string;
  model_type: string;
  days_predicted?: number;
  error?: string;
}

export interface ModelInfo {
  success: boolean;
  model_type: string;
  window_size: number;
  model_loaded: boolean;
  scaler_loaded: boolean;
  data_loaded: boolean;
  last_training_date: string;
  accuracy: string;
  description: string;
}

export interface HealthCheck {
  status: string;
  timestamp: string;
  model_loaded: boolean;
}

class GoldPredictionAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async getNextDayPrediction(): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${this.baseURL}/predict/next`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get prediction');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching next day prediction:', error);
      throw error;
    }
  }

  async getWeekPredictions(): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${this.baseURL}/predict/week`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get predictions');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching week predictions:', error);
      throw error;
    }
  }

  async getCustomPredictions(days: number): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${this.baseURL}/predict/custom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ days }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get predictions');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching custom predictions:', error);
      throw error;
    }
  }

  async getModelInfo(): Promise<ModelInfo> {
    try {
      const response = await fetch(`${this.baseURL}/model/info`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get model info');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching model info:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<HealthCheck> {
    try {
      console.log(`Making health check request to: ${this.baseURL}/health`);
      const response = await fetch(`${this.baseURL}/health`);
      
      console.log(`Health check response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Health check failed with status ${response.status}:`, errorText);
        throw new Error(`Health check failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Health check successful:', data);
      return data;
    } catch (error) {
      console.error('Error performing health check:', error);
      throw error;
    }
  }

  // Test connection to the API
  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing connection to backend...');
      
      // First try a simple test endpoint
      try {
        const testResponse = await fetch(`${this.baseURL}/test`);
        if (testResponse.ok) {
          console.log('Test endpoint successful');
          return true;
        }
      } catch (e) {
        console.log('Test endpoint failed, trying health check...');
      }
      
      // If test fails, try health check
      await this.healthCheck();
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Check if the backend is accessible
  async checkBackendStatus(): Promise<{
    accessible: boolean;
    endpoints: string[];
    error?: string;
  }> {
    const endpoints = [
      `${this.baseURL}/test`,
      `${this.baseURL}/health`,
      `${this.baseURL.replace('/api', '')}/` // Try root endpoint
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint);
        if (response.ok) {
          return {
            accessible: true,
            endpoints: [endpoint]
          };
        }
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error);
      }
    }
    
    return {
      accessible: false,
      endpoints: endpoints,
      error: 'No accessible endpoints found'
    };
  }
}

export const goldPredictionAPI = new GoldPredictionAPI();
export default goldPredictionAPI;
