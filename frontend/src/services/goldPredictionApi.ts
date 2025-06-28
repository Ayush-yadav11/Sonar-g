import axios from 'axios';

// API configuration
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://sonar-g.onrender.com').replace(/\/+$/, '');

// Debug: Log the API base URL
console.log('🔧 API Base URL configured as:', API_BASE_URL);

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

interface ScenarioParams {
  interest_rate_change: number;
  inflation_change: number;
  dollar_strength_change: number;
  market_volatility: number;
  geopolitical_risk: number;
  days: number;
}

interface ScenarioPredictionResponse {
  success: boolean;
  base_predictions: number[];
  scenario_predictions: number[];
  dates: string[];
  currency: string;
  unit: string;
  model_type: string;
  days_predicted: number;
  scenario_params: ScenarioParams;
}

export class GoldPredictionAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async fetchWithCORS(url: string, options: RequestInit = {}): Promise<Response> {
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      if (response.status === 0) {
        throw new Error('CORS error: The server is not allowing cross-origin requests');
      }
      return response;
    } catch (error) {
      console.error('Network or CORS error:', error);
      throw error;
    }
  }

  async getNextDayPrediction(): Promise<PredictionResponse> {
    try {
      const response = await this.fetchWithCORS(`${this.baseURL}/api/predict/next`);
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
      const response = await this.fetchWithCORS(`${this.baseURL}/api/predict/week`);
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
      const response = await this.fetchWithCORS(`${this.baseURL}/api/predict/custom`, {
        method: 'POST',
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
      const response = await fetch(`${this.baseURL}/api/model/info`);
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
      const healthUrl = `${this.baseURL}/api/health`;
      console.log(`🔧 Making health check request to: ${healthUrl}`);
      
      const response = await this.fetchWithCORS(healthUrl);
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
        const testResponse = await fetch(`${this.baseURL}/api/test`);
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
      `${this.baseURL}/api/test`,
      `${this.baseURL}/api/health`,
      `${this.baseURL}/` // Try root endpoint
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

  async predictScenario(params: ScenarioParams): Promise<ScenarioPredictionResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/api/predict/scenario`, params);
      return response.data;
    } catch (error) {
      console.error('Error predicting scenario:', error);
      throw error;
    }
  }
}

export const goldPredictionAPI = new GoldPredictionAPI();
export default goldPredictionAPI;
