import os
from datetime import timedelta

class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'gold-prediction-secret-key'
    
    # API Configuration
    API_HOST = '0.0.0.0'
    API_PORT = 5000
    DEBUG = True
    
    # Model Configuration
    MODEL_PATH = os.path.join('models', 'gold_price_lstm_model.h5')
    SCALER_PATH = os.path.join('models', 'gold_price_scaler.pkl')
    DATA_PATH = os.path.join('data', 'last_60_prices.npy')
    
    # Prediction Configuration
    WINDOW_SIZE = 60
    MAX_PREDICTION_DAYS = 30
    
    # CORS Configuration
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173']
    
class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    
class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    API_HOST = '0.0.0.0'
    
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
